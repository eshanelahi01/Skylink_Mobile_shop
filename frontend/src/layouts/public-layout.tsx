import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Headphones, MapPin, Menu, ShieldCheck, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Inventory" },
  { to: "/branches", label: "Branches" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export const PublicLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-ink">
      <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-grid opacity-90" />
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[30px] border border-black/[0.08] bg-white/92 px-4 py-3 shadow-[0_22px_50px_rgba(72,46,12,0.10)] backdrop-blur-xl sm:px-5 lg:px-6">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-accent/15 bg-[linear-gradient(135deg,#fffdf8,#f7ead5)] shadow-glass">
                  <Smartphone className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-extrabold uppercase tracking-[0.28em] text-[#23170f]">Skylink</div>
                  <div className="text-[11px] font-medium tracking-[0.12em] text-[#7a6552]">Premium iPhone Store</div>
                </div>
              </Link>

              <nav className="hidden lg:flex lg:items-center lg:rounded-full lg:border lg:border-black/[0.07] lg:bg-[#fffaf3] lg:p-1.5">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-full px-4 py-2 text-[14px] font-semibold text-[#4b3a2c] transition hover:text-ink",
                        isActive && "bg-white text-ink shadow-[0_8px_20px_rgba(37,24,9,0.08)]"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <Link to="/contact" className="rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#2f2419] transition hover:border-accent/35 hover:text-ink">
                  Contact Store
                </Link>
                <Link to="/shop" className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_14px_28px_rgba(183,122,31,0.24)] transition hover:bg-bronze">
                  Browse Stock
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink transition hover:border-accent/35 lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {mobileOpen ? (
              <div className="mt-4 border-t border-black/[0.06] pt-4 lg:hidden">
                <nav className="grid gap-2">
                  {links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "rounded-2xl px-4 py-3 text-sm font-semibold text-[#4b3a2c] transition hover:bg-[#fff7ec] hover:text-ink",
                          isActive && "bg-[#fff7ec] text-ink"
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-4 grid gap-3 sm:hidden">
                  <Link to="/contact" className="rounded-full border border-black/[0.08] bg-white px-4 py-3 text-center text-sm font-semibold text-[#2f2419] transition hover:border-accent/35 hover:text-ink">
                    Contact Store
                  </Link>
                  <Link to="/shop" className="rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-bronze">
                    Browse Stock
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-black/[0.06] bg-[#f8f2e7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_0.8fr_1fr] lg:px-8">
          <div>
            <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.26em] text-[#2f2419]">Skylink</div>
            <p className="max-w-sm text-[15px] leading-7 text-[#2f2419]">Premium iPhone stock, clear product details, and branch-backed pickup from Singapore Plaza, Rawalpindi.</p>
          </div>
          <div className="space-y-3 text-[15px] text-[#2f2419]">
            <div className="flex items-center gap-2 text-ink"><MapPin className="h-4 w-4 text-accent" /> Singapore Plaza branches</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Clear PTA and condition details</div>
            <div className="flex items-center gap-2"><Headphones className="h-4 w-4 text-accent" /> Fast WhatsApp support</div>
          </div>
          <div className="space-y-2 text-[15px] text-[#2f2419]">
            <div className="font-medium text-ink">Quick Links</div>
            {links.map((link) => <Link key={link.to} to={link.to} className="block hover:text-ink">{link.label}</Link>)}
          </div>
          <div className="rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-premium">
            <div className="mb-2 flex items-center gap-2 text-ink"><Smartphone className="h-4 w-4 text-accent" /> Need a specific iPhone?</div>
            <p className="text-[15px] leading-7 text-[#2f2419]">Browse the listing, then contact Skylink to confirm branch stock before you visit.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
