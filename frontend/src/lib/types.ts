export type Branch = {
  _id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  whatsapp: string;
  managerName: string;
  inventoryCount?: number;
  performance?: { revenue: number; sales: number };
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  series?: string;
  storage: string;
  color: string;
  condition: string;
  batteryHealth?: number;
  ptaStatus: string;
  price: number;
  costPrice: number;
  description: string;
  images: string[];
  branchId: Branch;
  stockStatus: string;
  quantity: number;
  isFeatured: boolean;
  approvalStatus: string;
  accessories?: string[];
  features?: string[];
};

export type SiteSettings = {
  brandName: string;
  supportPhones: string[];
  supportWhatsApp: string;
  addresses: string[];
  socialLinks?: { instagram?: string };
  heroContent?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  homepageSections?: {
    trustHighlights?: string[];
    financeBlocks?: string[];
  };
};

export type DashboardOverview = {
  kpis: {
    totalInventoryValue: number;
    productsInStock: number;
    productsSold: number;
    totalRevenue: number;
    totalPurchases: number;
  };
  charts: {
    revenueTrend: { _id: string; revenue: number }[];
    purchaseTrend: { _id: string; spend: number }[];
    branchPerformance: { branchName: string; revenue: number; sales: number }[];
  };
  activity: Array<{ _id: string; actionType: string; createdAt: string; actorUserId?: { name: string } }>;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
