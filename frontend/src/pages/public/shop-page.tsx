import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { usePublicProducts } from "@/api/queries";
import { ProductCard } from "@/components/public/product-card";
import type { Product } from "@/lib/types";

const isIphoneProduct = (product: Product) =>
  product.brand.toLowerCase().includes("apple") || product.model.toLowerCase().includes("iphone");

const collections = [
  { id: "all", label: "All iPhones" },
  { id: "pro", label: "Pro Series" },
  { id: "standard", label: "Standard" },
  { id: "preowned", label: "Pre-Owned" },
  { id: "pta", label: "PTA Ready" }
] as const;

const matchesCollection = (product: Product, collection: string) => {
  const model = product.model.toLowerCase();
  const ptaStatus = product.ptaStatus.toLowerCase();

  if (collection === "pro") {
    return model.includes("pro");
  }

  if (collection === "standard") {
    return !model.includes("pro") && !model.includes("max") && !model.includes("se");
  }

  if (collection === "preowned") {
    return product.condition !== "new";
  }

  if (collection === "pta") {
    return !ptaStatus.includes("non") && ptaStatus.includes("pta");
  }

  return true;
};

const getProductCategory = (product: Product) => {
  if (product.series?.trim()) {
    return product.series.trim();
  }

  const match = product.model.match(/iphone\s*(\d+|se)/i);

  if (!match) {
    return "Other iPhones";
  }

  const seriesKey = match[1].toUpperCase();
  return seriesKey === "SE" ? "iPhone SE" : `iPhone ${seriesKey} Series`;
};

const compareCategories = (left: string, right: string) => {
  const leftMatch = left.match(/iPhone\s+(\d+)/i);
  const rightMatch = right.match(/iPhone\s+(\d+)/i);

  if (leftMatch && rightMatch) {
    return Number(rightMatch[1]) - Number(leftMatch[1]);
  }

  if (left.includes("SE")) {
    return 1;
  }

  if (right.includes("SE")) {
    return -1;
  }

  return left.localeCompare(right);
};

const stockPriority: Record<string, number> = {
  available: 0,
  reserved: 1,
  sold: 2,
  hidden: 3
};

export const ShopPage = () => {
  const { data: products = [] } = usePublicProducts();
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState<(typeof collections)[number]["id"]>("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const inventoryProducts = useMemo(
    () =>
      products
        .filter(isIphoneProduct)
        .filter((product) => !["hidden", "sold"].includes(product.stockStatus)),
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      inventoryProducts
        .filter((product) => `${product.model} ${product.storage} ${product.color}`.toLowerCase().includes(search.toLowerCase()))
        .filter((product) => matchesCollection(product, activeCollection)),
    [activeCollection, inventoryProducts, search]
  );

  const categories = useMemo(
    () => Array.from(new Set(filteredProducts.map(getProductCategory))).sort(compareCategories),
    [filteredProducts]
  );

  const selectedCategory = categories.includes(activeCategory) ? activeCategory : "all";

  const groupedProducts = useMemo(() => {
    const visibleProducts = selectedCategory === "all"
      ? filteredProducts
      : filteredProducts.filter((product) => getProductCategory(product) === selectedCategory);
    const grouped = new Map<string, Product[]>();

    visibleProducts
      .slice()
      .sort((left, right) =>
        Number(right.isFeatured) - Number(left.isFeatured)
        || (stockPriority[left.stockStatus] ?? 99) - (stockPriority[right.stockStatus] ?? 99)
        || right.price - left.price
      )
      .forEach((product) => {
        const category = getProductCategory(product);
        const items = grouped.get(category) || [];
        items.push(product);
        grouped.set(category, items);
      });

    return (selectedCategory === "all" ? categories : [selectedCategory])
      .map((category) => ({
        category,
        products: grouped.get(category) || []
      }))
      .filter((group) => group.products.length > 0);
  }, [categories, filteredProducts, selectedCategory]);

  const inventorySummary = useMemo(
    () => ({
      total: inventoryProducts.length,
      available: inventoryProducts.filter((product) => product.stockStatus === "available").length,
      reserved: inventoryProducts.filter((product) => product.stockStatus === "reserved").length
    }),
    [inventoryProducts]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Inventory</div>
            <h1 className="mt-2 font-serif text-[1.85rem] leading-tight text-ink sm:text-[2.2rem]">Browse category-wise iPhone stock.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2e241b]">Inventory is now grouped by iPhone series so customers can scan the right category faster before they contact the store.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#2e241b]">
            <div className="rounded-full border border-black/[0.08] bg-white px-4 py-2.5">{inventorySummary.total} listed</div>
            <div className="rounded-full border border-black/[0.08] bg-white px-4 py-2.5">{inventorySummary.available} available</div>
            <div className="rounded-full border border-black/[0.08] bg-white px-4 py-2.5">{inventorySummary.reserved} reserved</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-black/[0.08] bg-white p-4 shadow-premium">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="overflow-x-auto">
              <div className="flex min-w-max items-center gap-3">
                <div className="pr-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Quick Filters</div>
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => setActiveCollection(collection.id)}
                    className={`rounded-full border px-4 py-2.5 text-sm transition ${activeCollection === collection.id ? "border-accent/40 bg-accent/10 text-ink" : "border-black/[0.08] bg-[#fcf9f4] text-[#2e241b] hover:border-accent/30 hover:text-ink"}`}
                  >
                    {collection.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search iPhone model or color"
                className="w-full rounded-full border border-black/[0.08] bg-[#fcf9f4] py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-[#6b5a49] focus:border-accent/40"
              />
            </div>
          </div>
        </div>

        {categories.length ? (
          <div className="mt-6 rounded-[28px] border border-black/[0.08] bg-white p-4 shadow-premium">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Inventory Categories</div>
                <div className="mt-1 text-sm text-[#2e241b]">Choose a series or keep browsing all categories.</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`rounded-full border px-4 py-2 text-sm transition ${selectedCategory === "all" ? "border-accent/40 bg-accent/10 text-ink" : "border-black/[0.08] bg-[#fcf9f4] text-[#2e241b] hover:border-accent/30 hover:text-ink"}`}
                >
                  All Categories
                </button>
                {categories.map((category) => {
                  const count = filteredProducts.filter((product) => getProductCategory(product) === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${selectedCategory === category ? "border-accent/40 bg-accent/10 text-ink" : "border-black/[0.08] bg-[#fcf9f4] text-[#2e241b] hover:border-accent/30 hover:text-ink"}`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {groupedProducts.length ? (
          <div className="mt-6 space-y-8">
            {groupedProducts.map((group) => (
              <div key={group.category} className="rounded-[30px] border border-black/[0.08] bg-white p-5 shadow-premium sm:p-6">
                <div className="flex flex-col gap-3 border-b border-black/[0.06] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Category</div>
                    <h2 className="mt-2 text-[1.35rem] font-semibold text-ink">{group.category}</h2>
                  </div>
                  <div className="text-sm text-[#2e241b]">{group.products.length} product{group.products.length === 1 ? "" : "s"} in this category</div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {group.products.map((product) => <ProductCard key={product._id} product={product} compact />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[30px] border border-dashed border-black/[0.12] bg-white p-8 text-center shadow-premium">
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">No Matches</div>
            <h2 className="mt-2 text-[1.45rem] font-semibold text-ink">No iPhones matched this filter.</h2>
            <p className="mt-3 text-sm leading-6 text-[#2e241b]">Try another category, clear the search term, or contact Skylink for current branch stock.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCollection("all");
                  setActiveCategory("all");
                }}
                className="rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/35"
              >
                Reset Filters
              </button>
              <Link to="/contact" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-bronze">
                Contact Skylink
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
          {[
            ["Reserve first", "Confirm stock before you visit."],
            ["PTA clear", "See PTA status directly in the listing."],
            ["Fast reply", "Get help on WhatsApp or phone."]
          ].map(([title, body]) => (
            <div key={title} className="rounded-[22px] border border-black/[0.08] bg-white p-4 shadow-premium">
              <div className="text-sm font-semibold text-ink">{title}</div>
              <div className="mt-1.5 text-sm leading-6 text-[#2e241b]">{body}</div>
            </div>
          ))}
        </div>

        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Need a specific iPhone category? Contact Skylink
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
