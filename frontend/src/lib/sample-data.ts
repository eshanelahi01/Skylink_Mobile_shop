import { Branch, Product, SiteSettings } from "./types";

export const sampleBranches: Branch[] = [
  {
    _id: "branch-1",
    name: "Sky Links-3",
    code: "SL3",
    address: "18-A, LG Floor, Singapore Plaza, Saddar, Rawalpindi",
    phone: "0331-5375616",
    whatsapp: "0331-5375616",
    managerName: "Ch. Nauman",
    inventoryCount: 22,
    performance: { revenue: 2450000, sales: 14 }
  },
  {
    _id: "branch-2",
    name: "Sky Links Bank Road",
    code: "SL10",
    address: "Shop No. 10, First Floor, Singapore Plaza, Bank Road, Saddar, Rawalpindi",
    phone: "0300-5555036",
    whatsapp: "0322-5528855",
    managerName: "Branch Manager",
    inventoryCount: 25,
    performance: { revenue: 3120000, sales: 19 }
  }
];

export const sampleProducts: Product[] = [
  {
    _id: "p1",
    title: "iPhone 17 Pro Max 512GB",
    slug: "iphone-17-pro-max-512gb-deep-blue",
    brand: "Apple",
    model: "iPhone 17 Pro Max",
    storage: "512GB",
    color: "Deep Blue",
    condition: "new",
    batteryHealth: 100,
    ptaStatus: "pta",
    price: 624999,
    costPrice: 579000,
    description: "Latest flagship finish with pro camera control, branch-backed verification, and premium same-day availability.",
    images: [
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png"
    ],
    branchId: sampleBranches[0],
    stockStatus: "available",
    quantity: 1,
    isFeatured: true,
    approvalStatus: "approved",
    accessories: ["Cable", "Inspection card"],
    features: ["A19 Pro", "PTA approved", "Premium branch support"]
  },
  {
    _id: "p2",
    title: "iPhone 17 Pro 256GB",
    slug: "iphone-17-pro-256gb-cosmic-orange",
    brand: "Apple",
    model: "iPhone 17 Pro",
    storage: "256GB",
    color: "Cosmic Orange",
    condition: "new",
    batteryHealth: 100,
    ptaStatus: "pta",
    price: 564999,
    costPrice: 521000,
    description: "New-generation Pro model with strong resale appeal and showroom-ready condition.",
    images: [
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png"
    ],
    branchId: sampleBranches[1],
    stockStatus: "available",
    quantity: 1,
    isFeatured: true,
    approvalStatus: "approved",
    accessories: ["Cable"],
    features: ["A19 Pro", "Pro camera system", "Factory-fresh condition"]
  },
  {
    _id: "p3",
    title: "iPhone 16 Pro Max 256GB",
    slug: "iphone-16-pro-max-256gb-desert-titanium",
    brand: "Apple",
    model: "iPhone 16 Pro Max",
    storage: "256GB",
    color: "Desert Titanium",
    condition: "used-excellent",
    batteryHealth: 92,
    ptaStatus: "pta",
    price: 419999,
    costPrice: 389000,
    description: "Premium cosmetic grade with strong battery health and clear PTA-ready positioning.",
    images: [
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121032-iphone-16-pro-max.png"
    ],
    branchId: sampleBranches[0],
    stockStatus: "available",
    quantity: 1,
    isFeatured: true,
    approvalStatus: "approved",
    accessories: ["Cable", "Box"],
    features: ["Battery health 92%", "PTA approved", "Branch pickup available"]
  },
  {
    _id: "p4",
    title: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max-256gb-natural-titanium",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    storage: "256GB",
    color: "Natural Titanium",
    condition: "new",
    batteryHealth: 100,
    ptaStatus: "pta",
    price: 429999,
    costPrice: 389000,
    description: "Flagship titanium finish, professionally verified, and ready for same-day branch support.",
    images: [
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-15-pro-max.png",
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-15-pro-max.png"
    ],
    branchId: sampleBranches[0],
    stockStatus: "available",
    quantity: 1,
    isFeatured: true,
    approvalStatus: "approved",
    accessories: ["Cable", "Inspection card"],
    features: ["A17 Pro", "Battery health checked", "PTA approved"]
  },
  {
    _id: "p5",
    title: "iPhone 14 Pro Max 256GB",
    slug: "iphone-14-pro-max-256gb-deep-purple",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    storage: "256GB",
    color: "Deep Purple",
    condition: "used-excellent",
    batteryHealth: 88,
    ptaStatus: "non-pta",
    price: 309999,
    costPrice: 279000,
    description: "Premium cosmetic grade with battery health transparency and branch-backed confidence.",
    images: [
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111846_sp875-sp876-iphone14-pro-promax.png"
    ],
    branchId: sampleBranches[1],
    stockStatus: "available",
    quantity: 1,
    isFeatured: false,
    approvalStatus: "approved",
    accessories: ["Cable"],
    features: ["Dynamic Island", "Camera tested", "Battery health 88%"]
  },
  {
    _id: "p6",
    title: "iPhone 13 Pro Max 256GB",
    slug: "iphone-13-pro-max-256gb-sierra-blue",
    brand: "Apple",
    model: "iPhone 13 Pro Max",
    storage: "256GB",
    color: "Sierra Blue",
    condition: "used-excellent",
    batteryHealth: 87,
    ptaStatus: "pta",
    price: 249999,
    costPrice: 224000,
    description: "High-demand Pro Max option with strong battery health and clean grading for confident buying.",
    images: [
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111870_iphone13-pro-max-colors-480.png"
    ],
    branchId: sampleBranches[1],
    stockStatus: "available",
    quantity: 1,
    isFeatured: false,
    approvalStatus: "approved",
    accessories: ["Cable", "Case"],
    features: ["ProMotion", "Battery health 87%", "PTA approved"]
  },
  {
    _id: "p7",
    title: "iPhone 13 128GB",
    slug: "iphone-13-128gb-starlight",
    brand: "Apple",
    model: "iPhone 13",
    storage: "128GB",
    color: "Starlight",
    condition: "used-good",
    batteryHealth: 90,
    ptaStatus: "pta",
    price: 184999,
    costPrice: 161000,
    description: "A practical flagship pick with honest grading and strong value retention.",
    images: [
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111872_iphone13-colors-480.png"
    ],
    branchId: sampleBranches[0],
    stockStatus: "reserved",
    quantity: 1,
    isFeatured: false,
    approvalStatus: "approved",
    accessories: ["Cable", "Case"],
    features: ["True Tone", "Face ID", "Battery health 90%"]
  },
  {
    _id: "p8",
    title: "iPhone 12 Pro Max 128GB",
    slug: "iphone-12-pro-max-128gb-pacific-blue",
    brand: "Apple",
    model: "iPhone 12 Pro Max",
    storage: "128GB",
    color: "Pacific Blue",
    condition: "used-good",
    batteryHealth: 83,
    ptaStatus: "non-pta",
    price: 169999,
    costPrice: 151000,
    description: "A budget-friendly Pro Max choice with clear condition notes and practical daily performance.",
    images: [
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111875_iphone12pro-ios14.png"
    ],
    branchId: sampleBranches[0],
    stockStatus: "available",
    quantity: 1,
    isFeatured: false,
    approvalStatus: "approved",
    accessories: ["Cable"],
    features: ["Large display", "Battery health 83%", "Affordable Pro Max option"]
  }
];

export const sampleSettings: SiteSettings = {
  brandName: "Skylink Mobile Shop",
  supportPhones: ["0331-5375616", "0300-5555036", "0322-5528855"],
  supportWhatsApp: "0331-5375616",
  addresses: sampleBranches.map((branch) => branch.address),
  socialLinks: { instagram: "https://instagram.com/sky_link_4" },
  heroContent: {
    eyebrow: "Premium Apple Devices in Rawalpindi",
    title: "Curated iPhone inventory with real branch-backed trust.",
    subtitle: "Modern inventory browsing, transparent device condition, and fast WhatsApp support across Singapore Plaza branches.",
    primaryCta: "Browse Inventory",
    secondaryCta: "Contact Skylink"
  },
  homepageSections: {
    trustHighlights: ["Physical multi-branch presence", "Battery health transparency", "PTA and condition clarity"],
    financeBlocks: ["Trade-in support", "Warranty guidance", "Device verification process"]
  }
};


