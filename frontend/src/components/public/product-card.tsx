import { Link } from "react-router-dom";
import type { Product } from "@/lib/types";
import { formatCurrency, getOptimizedImageUrl, productImageFallback } from "@/lib/utils";

export const ProductCard = ({ product, compact = false }: { product: Product; compact?: boolean }) => (
  <Link
    to={`/product/${product.slug}`}
    className={`group overflow-hidden border border-black/[0.08] bg-white shadow-premium transition hover:-translate-y-1 hover:border-accent/30 ${compact ? "rounded-[20px]" : "rounded-[24px]"}`}
  >
    <div className={`overflow-hidden bg-gradient-to-b from-[#fdf4e7] to-transparent ${compact ? "aspect-[4/2.7]" : "aspect-[4/4.25]"}`}>
      <img
        src={getOptimizedImageUrl(product.images[0], compact ? 520 : 640)}
        alt={product.title || product.model}
        loading="lazy"
        decoding="async"
        sizes={compact ? "(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 92vw" : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 92vw"}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = productImageFallback;
        }}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className={compact ? "space-y-2 p-3" : "space-y-3 p-4"}>
      <div className={`flex flex-wrap ${compact ? "gap-1.5 text-[10px]" : "gap-2 text-[11px]"}`}>
        <span className={`rounded-full border border-accent/20 bg-accent/10 text-accent ${compact ? "px-2.5 py-1" : "px-3 py-1"}`}>{product.ptaStatus?.toUpperCase() || "STATUS"}</span>
        <span className={`rounded-full border border-black/[0.08] text-[#2e241b] ${compact ? "px-2.5 py-1" : "px-3 py-1"}`}>{product.condition || "Condition pending"}</span>
      </div>
      <div>
        <div className={compact ? "text-[0.94rem] font-semibold leading-5 text-ink" : "text-[1.02rem] font-semibold text-ink"}>{product.model}</div>
        <div className={compact ? "text-[12px] leading-5 text-[#2e241b]" : "text-sm text-[#2e241b]"}>{product.storage || "Storage"} / {product.color || "Color"}</div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className={compact ? "text-[9px] uppercase tracking-[0.2em] text-[#3d3024]" : "text-[10px] uppercase tracking-[0.24em] text-[#3d3024]"}>Price</div>
          <div className={compact ? "text-[1rem] font-semibold text-ink" : "text-[1.15rem] font-semibold text-ink"}>{formatCurrency(product.price)}</div>
        </div>
        <div className={compact ? "text-[12px] font-medium text-accent" : "text-sm font-medium text-accent"}>View Details</div>
      </div>
    </div>
  </Link>
);
