import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

interface ParsedVariation {
  name: string;
  catalogNumber?: string;
}

interface ParsedProduct {
  productCode: string;
  name: string;
  description: string;
  shortDescription: string | null;
  instrumentCategoryName: string;
  surgeryCategoryName: string;
  sourceSection: string;
  variations: ParsedVariation[];
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// New format: header row contains "Product Name" in column 0
// Columns: Product Name | Variations (sizes) | Instrument Category | Surgery Type | # of Variants | Catalog #(s) | Source Section
function parseNewFormat(rows: any[][]): ParsedProduct[] {
  const products: ParsedProduct[] = [];

  const headerIdx = rows.findIndex(
    (r) => r && String(r[0] ?? "").trim().toLowerCase() === "product name",
  );
  const dataRows = headerIdx >= 0 ? rows.slice(headerIdx + 1) : rows.slice(1);

  for (const row of dataRows) {
    if (!row || row.length === 0) continue;

    const name = String(row[0] ?? "").trim();
    if (!name) continue;

    const variationsRaw = String(row[1] ?? "").trim();
    const instrumentCategory = String(row[2] ?? "").trim();
    const surgeryType = String(row[3] ?? "").trim();
    const catalogsRaw = String(row[5] ?? "").trim();
    const sourceSection = String(row[6] ?? "").trim();

    // Catalog numbers: one per semicolon-separated group
    const catalogNumbers = catalogsRaw
      ? catalogsRaw.split(";").map((s) => s.trim()).filter(Boolean)
      : [];

    // Variations: split by ";" into groups, then each group by "," into individual names.
    // All variations in a group share that group's catalog number.
    // e.g. "18 cm, 7\"; 20 cm, 8\"" + "01-100-18; 01-100-20" →
    //   [{name:"18 cm", cat:"01-100-18"}, {name:"7\"", cat:"01-100-18"},
    //    {name:"20 cm", cat:"01-100-20"}, {name:"8\"", cat:"01-100-20"}]
    const variations: ParsedVariation[] = [];
    if (variationsRaw) {
      const groups = variationsRaw.split(";").map((g) => g.trim()).filter(Boolean);
      groups.forEach((group, groupIdx) => {
        const names = group.split(",").map((n) => n.trim()).filter(Boolean);
        const catalogNumber = catalogNumbers[groupIdx] ?? undefined;
        for (const varName of names) {
          variations.push({ name: varName, catalogNumber });
        }
      });
    }

    // Product code = all catalog numbers joined; fall back to slugified name
    const productCode =
      catalogNumbers.length > 0
        ? catalogNumbers.join("; ")
        : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);

    // Description: each field on its own line as "Column Name: value"
    const descParts: string[] = [`Product Name: ${name}`];
    if (sourceSection) descParts.push(`Source Section: ${sourceSection}`);
    if (catalogsRaw) descParts.push(`Catalog #(s): ${catalogsRaw}`);
    const description = descParts.join("\n");

    products.push({
      productCode,
      name,
      description,
      shortDescription: null,
      instrumentCategoryName: instrumentCategory,
      surgeryCategoryName: surgeryType,
      sourceSection,
      variations,
    });
  }

  return products;
}

// Legacy format: col0 = "Cat #" header; category rows have empty col0, col2 starts with "#"
function parseLegacyFormat(rows: any[][]): ParsedProduct[] {
  const products: ParsedProduct[] = [];
  let currentCategory = "";

  for (const row of rows) {
    if (!row || row.length === 0) continue;

    const col0 = row[0];
    const col1 = row[1];
    const col2 = row[2];

    if (col0 === "Cat #") continue;

    if (!col0 && col1 && col2 && String(col2).trim().startsWith("#")) {
      currentCategory = String(col1).trim().replace(/\s+/g, " ").replace(/,\s*$/, "");
      continue;
    }

    if (col0 && typeof col0 === "string" && col0.trim()) {
      const productCode = col0.trim();
      const name = col1 ? String(col1).trim().replace(/\s+/g, " ") : "";
      const shortDescription = col2 ? String(col2).trim() : null;

      if (!name) continue;

      products.push({
        productCode,
        name,
        description: name + (shortDescription ? ` — ${shortDescription}` : ""),
        shortDescription,
        instrumentCategoryName: currentCategory,
        surgeryCategoryName: "",
        sourceSection: "",
        variations: [],
      });
    }
  }

  return products;
}

function parseExcel(buffer: Buffer): ParsedProduct[] {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });

  // Detect format by looking for "product name" header
  const isNewFormat = rows.some(
    (r) => r && String(r[0] ?? "").trim().toLowerCase() === "product name",
  );

  return isNewFormat ? parseNewFormat(rows) : parseLegacyFormat(rows);
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      return NextResponse.json({ error: "File must be .xlsx or .xls" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const parsed = parseExcel(buffer);

    if (parsed.length === 0) {
      return NextResponse.json({ error: "No products found in file" }, { status: 400 });
    }

    await connectDB();

    // Collect unique instrument and surgery category names
    const uniqueInstrumentCats = [
      ...new Set(parsed.map((p) => p.instrumentCategoryName).filter(Boolean)),
    ];
    const uniqueSurgeryCats = [
      ...new Set(parsed.map((p) => p.surgeryCategoryName).filter(Boolean)),
    ];

    // Create missing instrument categories
    const existingInstrument = await Category.find({ type: "INSTRUMENT" }).select("slug").lean();
    const existingInstrumentSlugs = new Set(existingInstrument.map((c: any) => c.slug));
    const newInstrumentDocs = uniqueInstrumentCats
      .map((name) => ({ name, slug: toSlug(name) }))
      .filter(({ slug }) => slug && !existingInstrumentSlugs.has(slug))
      .map(({ name, slug }) => ({ type: "INSTRUMENT" as const, name, slug }));
    if (newInstrumentDocs.length > 0) {
      await Category.insertMany(newInstrumentDocs, { ordered: false }).catch(() => {});
    }

    // Create missing surgery categories
    const existingSurgery = await Category.find({ type: "SURGERY" }).select("slug").lean();
    const existingSurgerySlugs = new Set(existingSurgery.map((c: any) => c.slug));
    const newSurgeryDocs = uniqueSurgeryCats
      .map((name) => ({ name, slug: toSlug(name) }))
      .filter(({ slug }) => slug && !existingSurgerySlugs.has(slug))
      .map(({ name, slug }) => ({ type: "SURGERY" as const, name, slug }));
    if (newSurgeryDocs.length > 0) {
      await Category.insertMany(newSurgeryDocs, { ordered: false }).catch(() => {});
    }

    // Build slug → _id maps
    const allInstrument = await Category.find({ type: "INSTRUMENT" }).select("_id slug").lean();
    const instrumentSlugToId = new Map(allInstrument.map((c: any) => [c.slug, c._id]));

    const allSurgery = await Category.find({ type: "SURGERY" }).select("_id slug").lean();
    const surgerySlugToId = new Map(allSurgery.map((c: any) => [c.slug, c._id]));

    // ── Duplicate check 1: within the file itself (by normalised name) ──
    const seenNames = new Set<string>();
    const deduped: typeof parsed = [];
    let inFileDuplicates = 0;
    for (const p of parsed) {
      const key = p.name.toLowerCase().trim();
      if (seenNames.has(key)) {
        inFileDuplicates++;
      } else {
        seenNames.add(key);
        deduped.push(p);
      }
    }

    // ── Duplicate check 2: against DB by product code AND by name ──
    const existingProducts = await Product.find({}).select("productCode name").lean();
    const existingCodes = new Set(existingProducts.map((p: any) => p.productCode));
    const existingNames = new Set(
      existingProducts.map((p: any) => (p.name as string).toLowerCase().trim()),
    );

    const dbDuplicates: string[] = [];
    const newProducts = deduped.filter((p) => {
      const codeMatch = existingCodes.has(p.productCode);
      const nameMatch = existingNames.has(p.name.toLowerCase().trim());
      if (codeMatch || nameMatch) {
        dbDuplicates.push(p.name);
        return false;
      }
      return true;
    });

    const categoriesCreated = newInstrumentDocs.length + newSurgeryDocs.length;

    if (newProducts.length === 0) {
      return NextResponse.json({
        imported: 0,
        skipped: parsed.length,
        inFileDuplicates,
        dbDuplicates: dbDuplicates.length,
        categoriesCreated,
        total: parsed.length,
      });
    }

    const docs = newProducts.map((p) => {
      const catIds: any[] = [];
      const instId = instrumentSlugToId.get(toSlug(p.instrumentCategoryName));
      if (instId) catIds.push(instId);
      const surgId = surgerySlugToId.get(toSlug(p.surgeryCategoryName));
      if (surgId) catIds.push(surgId);

      return {
        name: p.name,
        productCode: p.productCode,
        description: p.description,
        shortDescription: p.shortDescription,
        featured: false,
        inStock: true,
        categoryIds: catIds,
        variations: p.variations,
      };
    });

    await Product.insertMany(docs, { ordered: false }).catch(() => {});

    return NextResponse.json({
      imported: newProducts.length,
      skipped: parsed.length - newProducts.length,
      inFileDuplicates,
      dbDuplicates: dbDuplicates.length,
      categoriesCreated,
      total: parsed.length,
    });
  } catch (e) {
    console.error("Instrument import error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Import failed" },
      { status: 500 },
    );
  }
}
