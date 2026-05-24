export default function DashboardLoading() {
  return (
    <div>
      <div className="mb-1 h-7 w-36 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-stroke bg-white p-4 dark:border-strokedark dark:bg-blacksection">
            <div className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
            <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-stroke bg-white p-4 dark:border-strokedark dark:bg-blacksection">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="h-4 w-14 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        </div>
        <div className="flex gap-3">
          <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-strokedark" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-strokedark" />
        </div>
      </div>
    </div>
  );
}
