import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  await connectDB();

  const products = await Product.find({}).sort({ name: 1 }).lean();

  // Gather all category IDs
  const allCatIds = [
    ...new Set(
      products.flatMap((p: any) => (p.categoryIds ?? []).map((id: any) => id.toString())),
    ),
  ];
  const categories =
    allCatIds.length > 0
      ? await Category.find({ _id: { $in: allCatIds } }).lean()
      : [];
  const catMap = new Map(categories.map((c: any) => [c._id.toString(), c]));

  // Build rows
  const header = [
    "Product Name",
    "Variations (sizes)",
    "Instrument Category",
    "Surgery Type",
    "# of Variants",
    "Catalog #(s)",
    "Source Section",
  ];

  const rows = (products as any[]).map((p) => {
    const cats = (p.categoryIds ?? [])
      .map((id: any) => catMap.get(id.toString()))
      .filter(Boolean);

    const instrumentCat = (cats as any[]).find((c) => c.type === "INSTRUMENT" && !c.parentId);
    const surgeryCat = (cats as any[]).find((c) => c.type === "SURGERY" && !c.parentId);

    const variations: any[] = p.variations ?? [];
    const variationNames = variations.map((v: any) => v.name).join("; ");
    const catalogNumbers = variations
      .map((v: any) => v.catalogNumber ?? "")
      .filter(Boolean)
      .join("; ");

    const sourceSection = instrumentCat?.name?.toUpperCase() ?? "";

    return [
      p.name,
      variationNames,
      instrumentCat?.name ?? "",
      surgeryCat?.name ?? "",
      variations.length,
      catalogNumbers || p.productCode,
      sourceSection,
    ];
  });

  const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);

  // Column widths
  ws["!cols"] = [
    { wch: 45 },
    { wch: 30 },
    { wch: 25 },
    { wch: 25 },
    { wch: 12 },
    { wch: 30 },
    { wch: 25 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="products-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
