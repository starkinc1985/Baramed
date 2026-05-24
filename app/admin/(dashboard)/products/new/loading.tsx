export default function NewProductLoading() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 h-5 w-36 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
                <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
              </div>
              <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
              <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
            </div>
          </div>
        ))}
        <div className="flex gap-3">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
          <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
        </div>
      </div>
    </div>
  );
}
