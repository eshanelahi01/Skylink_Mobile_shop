import { Link, useParams } from "react-router-dom";
import { BatteryCharging, MapPin, MessageCircle, Shield } from "lucide-react";
import { useProductDetail } from "@/api/queries";
import { ProductCard } from "@/components/public/product-card";
import { formatCurrency, getOptimizedImageUrl, productImageFallback } from "@/lib/utils";

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

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data } = useProductDetail(slug);
  const product = data?.product;
  const whatsappHref = toWhatsAppHref(product?.branchId?.whatsapp);

  if (!product) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Home / Apple / iPhones / {product.model}</div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_390px]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-black/[0.08] bg-white p-4 shadow-premium">
            <img
              src={getOptimizedImageUrl(product.images[0], 960)}
              alt={product.title || product.model}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1024px) 60vw, 92vw"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = productImageFallback;
              }}
              className="w-full rounded-[26px] object-cover"
            />
          </div>
          <div className="rounded-[30px] border border-black/[0.08] bg-white p-5 shadow-premium">
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">More iPhones</div>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {data?.similar?.map((item) => <ProductCard key={item._id} product={item} />)}
            </div>
          </div>
        </div>
        <div className="rounded-[30px] border border-black/[0.08] bg-white p-5 shadow-premium lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-3 flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-accent">{product.ptaStatus?.toUpperCase() || "STATUS"}</span>
            <span className="rounded-full border border-black/[0.08] px-3 py-1 text-[#2e241b]">{product.condition || "Condition pending"}</span>
            <span className="rounded-full border border-black/[0.08] px-3 py-1 text-[#2e241b]">{product.branchId?.code || "Branch stock"}</span>
          </div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-ink sm:text-[2rem]">{product.model}</h1>
          <p className="mt-3 text-sm leading-6 text-[#2e241b]">{product.description}</p>
          <div className="mt-5 text-[1.55rem] font-semibold text-ink sm:text-[1.7rem]">{formatCurrency(product.price)}</div>
          <div className="mt-5 grid gap-3 text-sm leading-6 text-[#2e241b]">
            {typeof product.batteryHealth === "number" ? <div className="flex items-center gap-2"><BatteryCharging className="h-4 w-4 text-accent" /> Battery health: {product.batteryHealth}%</div> : null}
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> PTA status: {product.ptaStatus}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Available at {product.branchId?.name || "Skylink branch"}</div>
            {product.accessories?.length ? <div>Accessories: {product.accessories.join(", ")}</div> : null}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            {whatsappHref ? <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Inquiry</a> : null}
            <Link to="/contact" className="rounded-full border border-black/[0.08] bg-white px-5 py-3 text-center text-sm font-medium text-ink">{whatsappHref ? "Reserve / Request" : "Contact Skylink"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
