import { DataTable } from "@/components/dashboard/data-table";

export const AdminListPage = ({ title }: { title: string }) => (
  <div className="space-y-6">
    <div>
      <div className="text-sm text-slate-500">Operational module</div>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
    </div>
    <DataTable columns={["Name", "Branch", "Status", "Updated"]} rows={[["iPhone 15 Pro Max", "SL3", "Approved", "Today"], ["Branch Sales Record", "SL10", "Synced", "Today"], ["Homepage Section", "Global", "Live", "Today"]]} />
  </div>
);
