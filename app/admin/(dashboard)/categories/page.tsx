import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Categories | Admin" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ type: "asc" }, { parentId: "asc" }, { name: "asc" }],
    include: { parent: true, _count: { select: { children: true, products: true } } },
  });

  const parents = categories.filter((c) => !c.parentId);
  const children = categories.filter((c) => c.parentId);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Categories</h1>
          <p className="text-sm text-waterloo">{categories.length} total</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho"
        >
          + New Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Name</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Type</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Slug</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Sub / Products</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {parents.map((cat) => (
              <tr key={cat.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3 font-medium text-black dark:text-white">{cat.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.type === "INSTRUMENT" ? "bg-primary/10 text-primary" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"}`}>
                    {cat.type}
                  </span>
                </td>
                <td className="hidden px-4 py-3 font-mono text-xs text-waterloo md:table-cell">{cat.slug}</td>
                <td className="px-4 py-3 text-xs text-waterloo">
                  {cat._count.children} sub · {cat._count.products} products
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/categories/${cat.id}`}
                    className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {children.map((cat) => (
              <tr key={cat.id} className="border-b border-stroke bg-gray-50/50 last:border-0 dark:border-strokedark dark:bg-black/20">
                <td className="px-4 py-2 text-waterloo">
                  <span className="mr-2 text-xs">↳</span>{cat.name}
                </td>
                <td className="px-4 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.type === "INSTRUMENT" ? "bg-primary/10 text-primary" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"}`}>
                    {cat.type}
                  </span>
                </td>
                <td className="hidden px-4 py-2 font-mono text-xs text-waterloo md:table-cell">{cat.slug}</td>
                <td className="px-4 py-2 text-xs text-waterloo">— · {cat._count.products} products</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/categories/${cat.id}`}
                    className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
