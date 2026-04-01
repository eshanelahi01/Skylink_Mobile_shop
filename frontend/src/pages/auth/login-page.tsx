import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";

export const LoginPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fffdf9_0%,#faf6ef_56%,#f5ecdf_100%)] p-4">
      <div className="w-full max-w-xl rounded-[32px] border border-black/[0.08] bg-white p-7 text-ink shadow-premium">
        <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">Skylink access</div>
        <h1 className="mt-3 text-[2rem] font-semibold tracking-tight text-ink">Choose a demo role</h1>
        <p className="mt-3 text-sm leading-6 text-[#2e241b]">Pick a role to explore the dashboard, products, and branch operations.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <button onClick={() => { loginAsDemo("admin"); navigate("/admin"); }} className="rounded-[24px] border border-black/[0.08] bg-[#fcf7ef] p-5 text-left transition hover:border-accent/30 hover:bg-white">
            <div className="text-[1.05rem] font-semibold text-ink">Admin</div>
            <div className="mt-2 text-sm leading-6 text-[#2e241b]">Overview, settings, reports, and cross-branch control.</div>
          </button>
          <button onClick={() => { loginAsDemo("staff"); navigate("/staff"); }} className="rounded-[24px] border border-black/[0.08] bg-white p-5 text-left transition hover:border-accent/30 hover:bg-[#fcf7ef]">
            <div className="text-[1.05rem] font-semibold text-ink">Staff</div>
            <div className="mt-2 text-sm leading-6 text-[#2e241b]">Branch products, sales, purchases, and inquiry handling.</div>
          </button>
        </div>
      </div>
    </div>
  );
};


