import { formatCurrency } from "@/lib/utils";

export const KpiCard = ({ label, value, tone = "dark" }: { label: string; value: number; tone?: "dark" | "light" }) => (
  <div className={tone === "dark" ? "rounded-[28px] border border-[#eadfce] bg-white p-5 text-ink shadow-premium" : "rounded-[28px] border border-slate-200 bg-white p-5"}>
    <div className={tone === "dark" ? "text-sm text-[#2e241b]" : "text-sm text-slate-500"}>{label}</div>
    <div className="mt-3 text-[1.8rem] font-semibold tracking-tight text-ink">{formatCurrency(value)}</div>
  </div>
);


