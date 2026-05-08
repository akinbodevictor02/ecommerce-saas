"use client";

import PageTransition from "@/components/PageTransition";

export default function CustomersPage() {
  return (
    <PageTransition>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Customers
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and monitor customer activity
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Total Customers
            </p>

            <h2 className="text-3xl font-bold mt-2">
              1,284
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Returning
            </p>

            <h2 className="text-3xl font-bold mt-2">
              824
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              New This Month
            </p>

            <h2 className="text-3xl font-bold mt-2">
              138
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Retention Rate
            </p>

            <h2 className="text-3xl font-bold mt-2">
              68%
            </h2>
          </div>

        </div>

        {/* TABLE */}
        <div className="card p-6 overflow-x-auto">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Recent Customers
            </h2>

            <button className="btn-primary">
              Export
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Email
                </th>

                <th className="text-left py-3">
                  Orders
                </th>

                <th className="text-left py-3">
                  Spent
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">

              <tr>
                <td className="py-4">
                  John Doe
                </td>

                <td className="py-4 text-gray-400">
                  john@example.com
                </td>

                <td className="py-4">
                  12
                </td>

                <td className="py-4">
                  $2,420
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  Sarah Wilson
                </td>

                <td className="py-4 text-gray-400">
                  sarah@example.com
                </td>

                <td className="py-4">
                  8
                </td>

                <td className="py-4">
                  $1,280
                </td>
              </tr>

            </tbody>
          </table>

        </div>

      </div>
    </PageTransition>
  );
}