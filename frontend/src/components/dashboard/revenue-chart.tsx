import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const RevenueChart = ({ data, dataKey, fill }: { data: Array<Record<string, string | number>>; dataKey: string; fill: string }) => (
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 text-lg font-semibold">Performance Trend</div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="_id" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey={dataKey} radius={[12, 12, 0, 0]} fill={fill} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
