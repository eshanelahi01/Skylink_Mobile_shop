import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBranches, useSiteSettings } from "@/api/queries";
import { SectionHeading } from "@/components/public/section-heading";

export const ContactPage = () => {
  const { data: branches } = useBranches();
  const { data: settings } = useSiteSettings();
  const { register, handleSubmit } = useForm({ defaultValues: { name: "", phone: "", message: "" } });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact" title="Ask about any iPhone in stock." body="Share the model, storage, color, or branch you need and Skylink can follow up quickly." />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 rounded-[30px] border border-black/[0.08] bg-white p-6 text-[#2e241b] shadow-premium">
          <div className="rounded-[22px] border border-accent/20 bg-accent/10 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">WhatsApp</div>
            <div className="mt-2 text-[1rem] font-semibold text-ink">{settings?.supportWhatsApp || "Contact branch directly"}</div>
          </div>
          {branches?.map((branch) => (
            <div key={branch._id} className="rounded-[22px] border border-black/[0.08] bg-[#fcf7ef] p-4 text-sm leading-6">
              <div className="font-medium text-ink">{branch.name}</div>
              <div className="mt-1">{branch.address}</div>
              <div className="mt-1">Phone: {branch.phone}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(() => toast.success("Inquiry captured"))} className="rounded-[30px] border border-black/[0.08] bg-white p-6 shadow-premium">
          <div className="grid gap-4">
            <input {...register("name")} placeholder="Your name" className="w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-[#3d3024]" />
            <input {...register("phone")} placeholder="Phone / WhatsApp" className="w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-[#3d3024]" />
            <textarea {...register("message")} placeholder="Tell Skylink which iPhone you need" rows={6} className="w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-[#3d3024]" />
            <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">Send inquiry</button>
          </div>
        </form>
      </div>
    </section>
  );
};


