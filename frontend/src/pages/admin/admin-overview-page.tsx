import { useDashboardOverview } from "@/api/queries";
import { DataTable } from "@/components/dashboard/data-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";

export const AdminOverviewPage = () => {
  const { data } = useDashboardOverview();
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard tone="light" label="Inventory Value" value={data.kpis.totalInventoryValue} />
        <KpiCard tone="light" label="Revenue" value={data.kpis.totalRevenue} />
        <KpiCard tone="light" label="Purchases" value={data.kpis.totalPurchases} />
        <KpiCard tone="light" label="Sold Value" value={data.kpis.productsSold * 100000} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart data={data.charts.revenueTrend} dataKey="revenue" fill="#4ea8ff" />
        <RevenueChart data={data.charts.purchaseTrend} dataKey="spend" fill="#1f2937" />
      </div>
      <DataTable columns={["Branch", "Revenue", "Sales"]} rows={data.charts.branchPerformance.map((item) => [item.branchName, item.revenue, item.sales])} />
    </div>
  );
};
