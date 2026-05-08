import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import SalesChart from "@/components/SalesChart";
import AnalyticsChart from "@/components/AnalyticsChart";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import AdminAnalytics from "@/components/AdminAnalytics";
import FunnelAnalytics from "@/components/FunnelAnalytics";
import ProductFunnel from "@/components/ProductFunnel";
import DashboardUI from "@/components/DashboardUI";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  const events = await prisma.event.findMany();
  const products = await prisma.product.findMany();

  let totalRevenue = 0;

  const map: Record<
    string,
    { date: string; orders: number; revenue: number }
  > = {};

  orders.forEach((order) => {
    try {
      const items = JSON.parse(order.items);

      const orderTotal = items.reduce(
        (sum: number, item: any) =>
          sum + item.price * item.quantity,
        0
      );

      totalRevenue += orderTotal;

      const date = new Date(order.createdAt)
        .toISOString()
        .split("T")[0];

      if (!map[date]) {
        map[date] = { date, orders: 0, revenue: 0 };
      }

      map[date].orders++;
      map[date].revenue += orderTotal;
    } catch {}
  });

  const chartData = Object.values(map);

  const salesChartData = chartData.map((item) => ({
    date: item.date,
    total: item.revenue,
  }));

  // Funnel
  const views = events.filter((e) => e.type === "view").length;
  const carts = events.filter((e) => e.type === "add_to_cart").length;
  const purchases = events.filter((e) => e.type === "purchase").length;

  const viewToCart =
    views > 0 ? ((carts / views) * 100).toFixed(1) : "0";

  const cartToPurchase =
    carts > 0 ? ((purchases / carts) * 100).toFixed(1) : "0";

  const conversionRate =
    views > 0 ? ((purchases / views) * 100).toFixed(1) : "0";

  // Product Funnel
  const productMap: any = {};

  products.forEach((p) => {
    productMap[p.id] = {
      name: p.name,
      views: 0,
      carts: 0,
      purchases: 0,
    };
  });

  events.forEach((e) => {
    if (!e.productId || !productMap[e.productId]) return;

    if (e.type === "view") productMap[e.productId].views++;
    if (e.type === "add_to_cart") productMap[e.productId].carts++;
    if (e.type === "purchase") productMap[e.productId].purchases++;
  });

  const productFunnel = Object.entries(productMap).map(
    ([id, data]: any) => ({
      id,
      ...data,
      conversion:
        data.views > 0
          ? ((data.purchases / data.views) * 100).toFixed(1)
          : "0",
    })
  );

  // Retention
  const users = new Set(events.map((e) => e.userId).filter(Boolean));
  const totalUsers = users.size;

  const userEventCount: Record<string, number> = {};

  events.forEach((e) => {
    if (!e.userId) return;
    userEventCount[e.userId] =
      (userEventCount[e.userId] || 0) + 1;
  });

  const returningUsers = Object.values(userEventCount).filter(
    (c) => c > 1
  ).length;

  const retentionRate =
    totalUsers > 0
      ? ((returningUsers / totalUsers) * 100).toFixed(1)
      : "0";

  // CAC / LTV
  const totalAdSpend = 50000;

  const cac =
    totalUsers > 0
      ? (totalAdSpend / totalUsers).toFixed(2)
      : "0";

  const avgLTV =
    totalUsers > 0
      ? (totalRevenue / totalUsers).toFixed(2)
      : "0";

  const ltvToCac =
    parseFloat(cac) > 0
      ? (parseFloat(avgLTV) / parseFloat(cac)).toFixed(2)
      : "0";

  return (
  <PageTransition>
   <DashboardUI
    totalRevenue={totalRevenue}
    orders={orders}
    views={views}
    conversionRate={conversionRate}
    salesChartData={salesChartData}
    totalAdSpend={totalAdSpend}
    cac={cac}
    avgLTV={avgLTV}
    ltvToCac={ltvToCac}
    session={session}
   />
  </PageTransition>
);
}