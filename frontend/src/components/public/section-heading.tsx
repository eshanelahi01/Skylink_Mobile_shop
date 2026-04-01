import { cn } from "@/lib/utils";

export const SectionHeading = ({ eyebrow, title, body, className }: { eyebrow?: string; title: string; body?: string; className?: string }) => (
  <div className={cn("max-w-3xl", className)}>
    {eyebrow ? <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">{eyebrow}</div> : null}
    <h2 className="text-[1.6rem] font-semibold tracking-tight text-ink sm:text-[1.95rem]">{title}</h2>
    {body ? <p className="mt-3 text-sm leading-6 text-[#2e241b]">{body}</p> : null}
  </div>
);


