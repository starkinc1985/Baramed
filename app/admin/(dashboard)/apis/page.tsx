import { Metadata } from "next";

import { adminApiRegistry } from "@/lib/admin/api-registry";

export const metadata: Metadata = {
  title: "APIs | Admin",
};

export default function AdminApisPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">APIs</h1>
      <p className="mb-6 text-sm text-waterloo">
        Registered HTTP routes for this app. Add new entries in{" "}
        <code className="rounded bg-gray-200 px-1 text-xs dark:bg-strokedark">
          lib/admin/api-registry.ts
        </code>
        .
      </p>
      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">
                Method
              </th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">
                Path
              </th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {adminApiRegistry.map((row) => (
              <tr
                key={`${row.method}-${row.path}`}
                className="border-b border-stroke last:border-0 dark:border-strokedark"
              >
                <td className="px-4 py-2.5 font-mono text-primary">{row.method}</td>
                <td className="px-4 py-2.5 font-mono text-black dark:text-white">
                  {row.path}
                </td>
                <td className="px-4 py-2.5 text-waterloo">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-waterloo">
        To try authenticated admin APIs in the browser, log in and use the session cookie, or
        use curl with{" "}
        <code className="rounded bg-gray-200 px-1 dark:bg-strokedark">baramed_admin_token</code>{" "}
        from your browser dev tools.
      </p>
    </div>
  );
}
