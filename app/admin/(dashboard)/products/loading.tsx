export default function ProductsLoading() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-28 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
          ))}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <div className="h-10 w-72 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
        <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              {["Product", "Code", "Category", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-black dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
                  </div>
                </td>
                <td className="px-4 py-3"><div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-strokedark" /></td>
                <td className="hidden px-4 py-3 md:table-cell"><div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-strokedark" /></td>
                <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-strokedark" /></td>
                <td className="px-4 py-3 text-right"><div className="ml-auto h-7 w-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        <div className="h-9 w-36 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
      </div>
    </div>
  );
}
