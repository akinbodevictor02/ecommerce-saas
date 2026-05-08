import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import RevenueChart from "@/components/RevenueChart";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default async function AdminPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "asc" },
  });

  // 📊 Prepare chart data
  const chartData = orders.map((order) => {
    const items = JSON.parse(order.items);

    const revenue = items.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    return {
      date: new Date(order.createdAt).toLocaleDateString(),
      revenue,
    };
  });

  const totalRevenue = chartData.reduce(
    (sum, d) => sum + d.revenue,
    0
  );

  return (
    <PageTransition>
      <div className="p-6 space-y-6">
  <div>
    <h1 className="text-3xl font-bold tracking-tight">
      Admin Dashboard
    </h1>
    <p className="text-gray-500">
      Monitor your store performance
    </p>
  </div>

  {/* STATS */}
  <div className="grid md:grid-cols-2 gap-6">
    <div className="glass p-6">
      <p className="text-gray-400 text-sm">Total Orders</p>
      <h2 className="text-3xl font-bold mt-1">
        {orders.length}
      </h2>
    </div>

    <div className="glass p-6">
      <p className="text-gray-400 text-sm">Revenue</p>
      <h2 className="text-3xl font-bold mt-1">
        {formatPrice(totalRevenue)}
      </h2>
    </div>
  </div>

  {/* CHART */}
  <div className="glass p-6">
    <h2 className="font-semibold mb-4">
      Revenue Over Time
    </h2>
    <RevenueChart data={chartData} />
  </div>

  {/* LINKS */}
  <div className="grid gap-4">
    <a className="card p-5 hover:scale-[1.02] transition" href="/admin/products">
      Manage Products →
    </a>

    <a className="card p-5 hover:scale-[1.02] transition" href="/admin/orders">
      Manage Orders →
    </a>
  </div>

</div>
    </PageTransition>
  );
}