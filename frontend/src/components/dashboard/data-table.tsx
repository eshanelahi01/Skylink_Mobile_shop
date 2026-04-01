import { cn } from "@/lib/utils";

export const DataTable = ({ columns, rows }: { columns: string[]; rows: Array<Array<string | number>> }) => (
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            {columns.map((column) => <th key={column} className="px-5 py-4 font-medium">{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={cn("border-t border-slate-100", index % 2 === 0 ? "bg-white" : "bg-slate-50/50")}>
              {row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`} className="px-5 py-4 text-slate-700">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
