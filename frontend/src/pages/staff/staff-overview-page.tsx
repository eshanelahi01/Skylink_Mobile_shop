import { useDashboardOverview } from "@/api/queries";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { DataTable } from "@/components/dashboard/data-table";

export const StaffOverviewPage = () => {
  const { data } = useDashboardOverview();
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard tone="light" label="Branch Revenue" value={data.kpis.totalRevenue} />
        <KpiCard tone="light" label="Branch Purchases" value={data.kpis.totalPurchases} />
        <KpiCard tone="light" label="Branch Inventory Value" value={data.kpis.totalInventoryValue} />
      </div>
      <DataTable columns={["Activity", "Actor", "Time"]} rows={data.activity.map((item) => [item.actionType, item.actorUserId?.name || "System", new Date(item.createdAt).toLocaleString()])} />
    </div>
  );
};
