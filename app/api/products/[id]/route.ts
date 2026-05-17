import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mapMongoProductToUiProduct } from "@/lib/mappers/product";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  await connectDB();

  const product = await Product.findById(params.id).lean();
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const categories = (product as any).categoryIds?.length
    ? await Category.find({ _id: { $in: (product as any).categoryIds } }).lean()
    : [];

  return NextResponse.json({ product: mapMongoProductToUiProduct(product, categories as any) });
}
