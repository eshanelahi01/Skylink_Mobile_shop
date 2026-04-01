import { useBranches } from "@/api/queries";
import { SectionHeading } from "@/components/public/section-heading";

export const BranchesPage = () => {
  const { data: branches } = useBranches();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Branches" title="Visit the branch handling your iPhone." body="Each branch card shows address, contact, and live inventory count." />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {branches?.map((branch) => (
          <div key={branch._id} className="rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-premium">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-accent">{branch.code}</div>
                <div className="mt-2 text-[1.25rem] font-semibold text-ink">{branch.name}</div>
              </div>
              <div className="rounded-full border border-black/[0.08] px-3 py-1 text-[11px] text-[#2e241b]">{branch.inventoryCount} devices</div>
            </div>
            <div className="mt-4 space-y-2 text-sm leading-6 text-[#2e241b]">
              <div>{branch.address}</div>
              <div>Phone: {branch.phone}</div>
              <div>WhatsApp: {branch.whatsapp}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


