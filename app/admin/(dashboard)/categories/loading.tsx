export default function CategoriesLoading() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-28 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              {["Name", "Type", "Slug", "Sub / Products", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-black dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3"><div className="h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-strokedark" /></td>
                <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-strokedark" /></td>
                <td className="hidden px-4 py-3 md:table-cell"><div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-strokedark" /></td>
                <td className="px-4 py-3"><div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-strokedark" /></td>
                <td className="px-4 py-3 text-right"><div className="ml-auto h-7 w-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
