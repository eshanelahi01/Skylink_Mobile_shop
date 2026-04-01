import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Store
} from "lucide-react";
import { useBranches, usePublicProducts, useSiteSettings } from "@/api/queries";
import { ProductCard } from "@/components/public/product-card";
import type { Product } from "@/lib/types";
import { getOptimizedImageUrl, productImageFallback } from "@/lib/utils";

const isIphoneProduct = (product: Product) =>
  product.brand.toLowerCase().includes("apple") || product.model.toLowerCase().includes("iphone");

const toWhatsAppHref = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return undefined;
  }

  if (digits.startsWith("92")) {
    return `https://wa.me/${digits}`;
  }

  if (digits.startsWith("0")) {
    return `https://wa.me/92${digits.slice(1)}`;
  }

  return `https://wa.me/${digits}`;
};

export const HomePage = () => {
  const { data: settings } = useSiteSettings();
  const { data: branches = [] } = useBranches();
  const { data: products = [] } = usePublicProducts();

  const iphoneProducts = products.filter(isIphoneProduct);
  const featuredProducts = iphoneProducts.filter((product) => product.isFeatured);
  const listingProducts = Array.from(new Map([...featuredProducts, ...iphoneProducts].map((product) => [product._id, product])).values()).slice(0, 8);
  const spotlight = listingProducts[0];
  const spotlightSummary = spotlight?.description?.split(".").filter(Boolean).slice(0, 1).join(".");
  const whatsappHref = toWhatsAppHref(settings?.supportWhatsApp ?? branches[0]?.whatsapp);
  const branchCount = branches.length || 2;

  const serviceHighlights = [
    {
      title: "Reserve first",
      description: "Confirm stock before visiting.",
      icon: Store
    },
    {
      title: "Check PTA",
      description: "See PTA status at a glance.",
      icon: ShieldCheck
    },
    {
      title: "WhatsApp help",
      description: "Ask about color, storage, or branch stock.",
      icon: MessageCircle
    }
  ];

  return (
    <div className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="relative overflow-hidden rounded-[30px] border border-black/[0.08] bg-white px-5 py-6 shadow-premium sm:px-6 sm:py-7 lg:px-7 lg:py-8">
          <div className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_right,rgba(183,122,31,0.12),transparent_42%)]" />
          <img
            src="/hero-iphones.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 bottom-0 z-0 w-[68%] max-w-[500px] opacity-[0.18] sm:right-0 sm:opacity-30 lg:w-[48%] lg:opacity-90"
          />
          <div className="relative z-10 max-w-xl lg:max-w-[48%]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Skylink iPhones</div>
            <h1 className="mt-3 max-w-lg font-serif text-[1.7rem] leading-tight tracking-tight text-ink sm:text-[2rem] lg:text-[2.35rem]">
              Find the right iPhone faster.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#2e241b]">
              Browse current iPhone stock, compare models quickly, and contact Skylink when you are ready to reserve.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bronze">
                Browse iPhones
                <ArrowRight className="h-4 w-4" />
              </Link>
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent/40 hover:bg-ember">
                  <MessageCircle className="h-4 w-4 text-accent" />
                  WhatsApp
                </a>
              ) : (
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent/40 hover:bg-ember">
                  <PhoneCall className="h-4 w-4 text-accent" />
                  Contact Skylink
                </Link>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-[#2e241b]">
              <span className="rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5">PTA status</span>
              <span className="rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5">Branch pickup</span>
              <span className="rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5">WhatsApp support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {listingProducts.map((product) => <ProductCard key={product._id} product={product} compact />)}
        </div>

        {spotlight ? (
          <div className="mt-8 rounded-[30px] border border-black/[0.08] bg-white p-5 shadow-premium sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Featured iPhone</div>
                <div className="mt-2 text-[1.35rem] font-semibold text-ink sm:text-[1.5rem]">{spotlight.model}</div>
                <div className="mt-2 text-sm leading-6 text-[#2e241b]">{spotlightSummary ? `${spotlightSummary}.` : "Current stock with clear core details and branch support."}</div>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[#2e241b]">
                  <span className="rounded-full border border-black/[0.08] px-3 py-1.5">{spotlight.storage}</span>
                  <span className="rounded-full border border-black/[0.08] px-3 py-1.5">{spotlight.color}</span>
                  <span className="rounded-full border border-black/[0.08] px-3 py-1.5">{spotlight.branchId?.code || "Branch stock"}</span>
                </div>
                <Link to={`/product/${spotlight.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Open product
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="rounded-[24px] border border-black/[0.08] bg-[#fcf7ef] p-4">
                <img
                  src={getOptimizedImageUrl(spotlight.images[0], 760)}
                  alt={spotlight.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 28vw, 92vw"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = productImageFallback;
                  }}
                  className="aspect-[4/3.35] w-full rounded-[20px] object-cover"
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {serviceHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[22px] border border-black/[0.08] bg-white p-4 shadow-premium">
                <div className="w-fit rounded-[16px] border border-accent/20 bg-accent/10 p-2.5 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">{item.title}</div>
                <div className="mt-1.5 text-sm leading-6 text-[#2e241b]">{item.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[32px] border border-black/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(251,245,236,0.96)),radial-gradient(circle_at_top_right,rgba(183,122,31,0.15),transparent_32%),#f8f0e2] p-6 shadow-halo sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Store Support</div>
              <h2 className="mt-3 max-w-2xl font-serif text-[1.55rem] leading-tight text-ink sm:text-[1.9rem]">Need a specific iPhone?</h2>
              <div className="mt-3 max-w-xl text-sm leading-6 text-[#2e241b]">Browse online, then contact Skylink to confirm branch stock before you come in.</div>
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[#2e241b]">
                <span className="rounded-full border border-black/[0.08] px-3 py-1.5">{branchCount} branches</span>
                <span className="rounded-full border border-black/[0.08] px-3 py-1.5">Rawalpindi pickup</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-bronze">
                View all iPhones
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/branches" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-6 py-3 text-sm font-medium text-ink transition hover:border-accent/40 hover:bg-ember">
                <MapPin className="h-4 w-4 text-accent" />
                Visit branches
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
