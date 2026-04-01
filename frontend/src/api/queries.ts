import { useQuery } from "@tanstack/react-query";
import { api } from "./client";
import { sampleBranches, sampleProducts, sampleSettings } from "@/lib/sample-data";
import type { Branch, DashboardOverview, PaginatedResponse, Product, SiteSettings } from "@/lib/types";

const sampleProductsBySlug = new Map(sampleProducts.map((product) => [product.slug, product]));
const publicProductsFallback = import.meta.env.DEV ? sampleProducts : [];
const homepageFeedFallback = {
  featured: publicProductsFallback,
  latest: publicProductsFallback,
  arrivals: publicProductsFallback
};

const enrichProduct = (product: Product) => {
  const sample = sampleProductsBySlug.get(product.slug);

  return {
    ...product,
    title: product.title || sample?.title || product.model,
    series: product.series || sample?.series || "",
    description: product.description || sample?.description || "",
    images: product.images?.length ? product.images : sample?.images || [],
    features: product.features?.length ? product.features : sample?.features || [],
    accessories: product.accessories?.length ? product.accessories : sample?.accessories || [],
    isFeatured: Boolean(product.isFeatured || sample?.isFeatured)
  };
};

const enrichProducts = (products: Product[] | undefined) =>
  Array.isArray(products) ? products.map(enrichProduct) : [];

const productDetailFallback = (slug?: string) => {
  if (import.meta.env.DEV) {
    const product = sampleProducts.find((item) => item.slug === slug) || sampleProducts[0];
    return { product, similar: sampleProducts.slice(1), recentlyViewed: sampleProducts };
  }

  return { product: undefined, similar: [], recentlyViewed: [] };
};

const withFallback = async <T,>(request: () => Promise<T>, fallback: T) => {
  try {
    return await request();
  } catch {
    return fallback;
  }
};

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site-settings"],
    queryFn: () =>
      withFallback(async () => {
        const { data } = await api.get<SiteSettings>("/site/settings");
        return data || sampleSettings;
      }, sampleSettings)
  });

export const useBranches = () =>
  useQuery({
    queryKey: ["branches"],
    queryFn: () =>
      withFallback(async () => {
        const { data } = await api.get<Branch[]>("/branches");
        return Array.isArray(data) ? data : sampleBranches;
      }, sampleBranches)
  });

export const usePublicProducts = () =>
  useQuery({
    queryKey: ["public-products"],
    queryFn: () =>
      withFallback(async () => {
        const { data } = await api.get<PaginatedResponse<Product>>("/products/public");

        if (!Array.isArray(data.items)) {
          throw new Error("Invalid products response");
        }

        return enrichProducts(data.items);
      }, publicProductsFallback)
  });

export const useHomepageFeed = () =>
  useQuery({
    queryKey: ["homepage-feed"],
    queryFn: () =>
      withFallback(async () => {
        const { data } = await api.get<{ featured: Product[]; latest: Product[]; arrivals: Product[] }>("/products/homepage-feed");
        return {
          featured: enrichProducts(data.featured),
          latest: enrichProducts(data.latest),
          arrivals: enrichProducts(data.arrivals)
        };
      }, homepageFeedFallback)
  });

export const useProductDetail = (slug?: string) =>
  useQuery({
    enabled: Boolean(slug),
    queryKey: ["product", slug],
    queryFn: () =>
      withFallback(async () => {
        const { data } = await api.get<{ product: Product; similar: Product[]; recentlyViewed: Product[] }>(`/products/public/${slug}`);

        if (!data?.product) {
          throw new Error("Invalid product response");
        }

        return {
          product: enrichProduct(data.product),
          similar: enrichProducts(data.similar),
          recentlyViewed: enrichProducts(data.recentlyViewed)
        };
      }, productDetailFallback(slug))
  });

export const useDashboardOverview = () =>
  useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      try {
        const { data } = await api.get<DashboardOverview>("/dashboard/overview");
        return data;
      } catch {
        return {
          kpis: {
            totalInventoryValue: 8640000,
            productsInStock: 39,
            productsSold: 27,
            totalRevenue: 5570000,
            totalPurchases: 3880000
          },
          charts: {
            revenueTrend: [{ _id: "2026-01", revenue: 1200000 }, { _id: "2026-02", revenue: 1860000 }, { _id: "2026-03", revenue: 2510000 }],
            purchaseTrend: [{ _id: "2026-01", spend: 980000 }, { _id: "2026-02", spend: 1240000 }, { _id: "2026-03", spend: 1660000 }],
            branchPerformance: [{ branchName: "Sky Links-3", revenue: 2450000, sales: 14 }, { branchName: "Sky Links Bank Road", revenue: 3120000, sales: 19 }]
          },
          activity: [
            { _id: "a1", actionType: "product.created", createdAt: new Date().toISOString(), actorUserId: { name: "Nauman Branch Staff" } },
            { _id: "a2", actionType: "sale.created", createdAt: new Date().toISOString(), actorUserId: { name: "Bank Road Staff" } }
          ]
        };
      }
    }
  });
