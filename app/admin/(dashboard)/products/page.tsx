import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ImportButton from "./ImportButton";

export const metadata: Metadata = { title: "Products | Admin" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      categories: { include: { category: { include: { parent: true } } } },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Products</h1>
          <p className="text-sm text-waterloo">{products.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <ImportButton />
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho"
          >
            + New Product
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Product</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Code</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Category</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const thumb = p.images[0]?.url;
              const cats = p.categories.map((pc) => pc.category);
              const topCat = cats.find((c) => c.parentId === null);
              return (
                <tr key={p.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-strokedark">
                        {thumb ? (
                          <Image src={thumb} alt={p.name} width={40} height={40} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-waterloo">—</div>
                        )}
                      </div>
                      <span className="font-medium text-black dark:text-white line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-waterloo">{p.productCode}</td>
                  <td className="hidden px-4 py-3 text-xs text-waterloo md:table-cell">{topCat?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.featured && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Featured</span>
                      )}
                      {p.inStock ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">In Stock</span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">Out of Stock</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="text-primary hover:underline">Add one</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
