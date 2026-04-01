import { SectionHeading } from "@/components/public/section-heading";

export const AboutPage = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <SectionHeading eyebrow="About Skylink" title="Skylink focuses on iPhones." body="Clear listings, branch support, and a cleaner buying flow for Apple customers." />
    <div className="mt-8 grid gap-4 lg:grid-cols-3">
      {[
        "Curated iPhone stock with condition and battery details.",
        "Simple product browsing built for faster comparison.",
        "Branch-backed support before pickup or purchase."
      ].map((item) => <div key={item} className="rounded-[24px] border border-black/[0.08] bg-white p-5 text-sm leading-6 text-[#2e241b] shadow-premium">{item}</div>)}
    </div>
  </section>
);


