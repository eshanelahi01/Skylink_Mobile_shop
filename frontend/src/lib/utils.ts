import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const productImageFallback = "/hero-iphones.png";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);

export const getOptimizedImageUrl = (src: string, width = 800) => {
  if (!src) {
    return productImageFallback;
  }

  try {
    const url = new URL(src);

    if (url.hostname.includes("images.unsplash.com")) {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", "72");
    }

    return url.toString();
  } catch {
    return src || productImageFallback;
  }
};
