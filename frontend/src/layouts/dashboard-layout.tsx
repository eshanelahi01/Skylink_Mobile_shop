import { Link, NavLink, Outlet } from "react-router-dom";
import { Building2, ChartNoAxesCombined, LogOut, Package, Receipt, Settings, Users } from "lucide-react";
import { useAuth } from "@/features/auth/auth-context";
import { cn } from "@/lib/utils";

const adminLinks = [
  { to: "/admin", label: "Overview", icon: ChartNoAxesCombined },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/sales", label: "Sales", icon: Receipt },
  { to: "/admin/purchases", label: "Purchases", icon: Receipt },
  { to: "/admin/branches", label: "Branches", icon: Building2 },
  { to: "/admin/staff", label: "Staff", icon: Users },
  { to: "/admin/inquiries", label: "Inquiries", icon: Users },
  { to: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { to: "/admin/reports", label: "Reports", icon: ChartNoAxesCombined }
];

const staffLinks = [
  { to: "/staff", label: "Overview", icon: ChartNoAxesCombined },
  { to: "/staff/products", label: "Products", icon: Package },
  { to: "/staff/products/new", label: "Add Product", icon: Package },
  { to: "/staff/sales", label: "Sales", icon: Receipt },
  { to: "/staff/purchases", label: "Purchases", icon: Receipt },
  { to: "/staff/inquiries", label: "Inquiries", icon: Users },
  { to: "/staff/settings", label: "Settings", icon: Settings }
];

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const links = user?.role === "staff" ? staffLinks : adminLinks;

  return (
    <div className="min-h-screen bg-[#faf6ef] text-slate-900 lg:grid lg:grid-cols-[290px_1fr]">
      <aside className="border-r border-[#eadfce] bg-[#fffaf2] px-5 py-6 text-ink">
        <Link to="/" className="mb-10 block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">Skylink Command</Link>
        <div className="mb-8 rounded-[26px] border border-[#eadfce] bg-white p-5 shadow-premium">
          <div className="text-sm text-[#2e241b]">Signed in as</div>
          <div className="mt-2 text-[1.05rem] font-semibold text-ink">{user?.name}</div>
          <div className="text-sm text-[#2e241b]">{user?.role}</div>
        </div>
        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/admin" || to === "/staff"} className={({ isActive }) => cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[#2e241b] transition hover:border hover:border-[#eadfce] hover:bg-white hover:text-ink", isActive && "border border-accent/20 bg-accent/10 text-ink") }>
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-10 flex items-center gap-2 text-sm text-[#2e241b] hover:text-ink"><LogOut className="h-4 w-4" /> Sign out</button>
      </aside>
      <main className="min-w-0">
        <div className="border-b border-[#eadfce] bg-white/85 px-5 py-5 backdrop-blur sm:px-8">
          <div className="text-sm text-[#2e241b]">Premium retail operations</div>
          <div className="text-[1.75rem] font-semibold tracking-tight text-ink">Skylink Dashboard</div>
        </div>
        <div className="p-5 sm:p-8"><Outlet /></div>
      </main>
    </div>
  );
};


