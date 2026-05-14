import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

interface ParsedProduct {
  productCode: string;
  name: string;
  description: string;
  shortDescription: string | null;
  categoryName: string;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseExcel(buffer: Buffer): ParsedProduct[] {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });

  const products: ParsedProduct[] = [];
  let currentCategory = "";

  for (const row of rows) {
    if (!row || row.length === 0) continue;

    const col0 = row[0];
    const col1 = row[1];
    const col2 = row[2];

    // Skip main header row
    if (col0 === "Cat #") continue;

    // Subcategory header: null col0, text col1, col2 starts with "#"
    if (!col0 && col1 && col2 && String(col2).trim().startsWith("#")) {
      currentCategory = String(col1)
        .trim()
        .replace(/\s+/g, " ")
        .replace(/,\s*$/, "");
      continue;
    }

    // Product row: non-empty string in col0
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
        categoryName: currentCategory,
      });
    }
  }

  return products;
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

    // 1. Collect unique category names and create missing ones
    const uniqueCategoryNames = [
      ...new Set(parsed.map((p) => p.categoryName).filter(Boolean)),
    ];

    const existingCategories = await prisma.category.findMany({
      where: { type: "INSTRUMENT" },
      select: { id: true, slug: true },
    });
    const existingSlugs = new Set(existingCategories.map((c) => c.slug));

    const newCats = uniqueCategoryNames
      .map((name) => ({ name, slug: toSlug(name) }))
      .filter(({ slug }) => slug && !existingSlugs.has(slug));

    if (newCats.length > 0) {
      await prisma.category.createMany({
        data: newCats.map(({ name, slug }) => ({
          type: "INSTRUMENT" as const,
          name,
          slug,
        })),
        skipDuplicates: true,
      });
    }

    // 2. Build slug → id map for all INSTRUMENT categories
    const allCategories = await prisma.category.findMany({
      where: { type: "INSTRUMENT" },
      select: { id: true, slug: true },
    });
    const slugToId = new Map(allCategories.map((c) => [c.slug, c.id]));

    // 3. Filter out already-existing product codes
    const existingProducts = await prisma.product.findMany({
      select: { productCode: true },
    });
    const existingCodes = new Set(existingProducts.map((p) => p.productCode));
    const newProducts = parsed.filter((p) => !existingCodes.has(p.productCode));

    if (newProducts.length === 0) {
      return NextResponse.json({
        imported: 0,
        skipped: parsed.length,
        categoriesCreated: newCats.length,
        total: parsed.length,
      });
    }

    // 4. Bulk create products
    await prisma.product.createMany({
      data: newProducts.map((p) => ({
        name: p.name,
        productCode: p.productCode,
        description: p.description,
        shortDescription: p.shortDescription,
        featured: false,
        inStock: true,
      })),
      skipDuplicates: true,
    });

    // 5. Fetch IDs of newly created products
    const createdProducts = await prisma.product.findMany({
      where: { productCode: { in: newProducts.map((p) => p.productCode) } },
      select: { id: true, productCode: true },
    });
    const codeToId = new Map(createdProducts.map((p) => [p.productCode, p.id]));

    // 6. Bulk create category relations
    const relations = newProducts
      .map((p) => ({
        productId: codeToId.get(p.productCode),
        categoryId: slugToId.get(toSlug(p.categoryName)),
      }))
      .filter((r): r is { productId: string; categoryId: string } =>
        Boolean(r.productId && r.categoryId)
      );

    if (relations.length > 0) {
      await prisma.productCategory.createMany({
        data: relations,
        skipDuplicates: true,
      });
    }

    return NextResponse.json({
      imported: newProducts.length,
      skipped: parsed.length - newProducts.length,
      categoriesCreated: newCats.length,
      total: parsed.length,
    });
  } catch (e) {
    console.error("Instrument import error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Import failed" },
      { status: 500 }
    );
  }
}
