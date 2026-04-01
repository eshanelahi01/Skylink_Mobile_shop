import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import { Branch } from "../models/Branch.js";
import { Product } from "../models/Product.js";
import { Purchase } from "../models/Purchase.js";
import { Sale } from "../models/Sale.js";
import { SiteSettings } from "../models/SiteSettings.js";
import { User } from "../models/User.js";
import { slugify } from "../utils/slugify.js";

const branchSeeds = [
  {
    name: "Sky Links-3",
    code: "SL3",
    address: "18-A, LG Floor, Singapore Plaza, Saddar, Rawalpindi",
    phone: "0331-5375616",
    whatsapp: "0331-5375616",
    mapLink: "https://maps.google.com",
    managerName: "Ch. Nauman",
    status: "active"
  },
  {
    name: "Sky Links Bank Road",
    code: "SL10",
    address: "Shop No. 10, First Floor, Singapore Plaza, Bank Road, Saddar, Rawalpindi",
    phone: "0300-5555036",
    whatsapp: "0322-5528855",
    mapLink: "https://maps.google.com",
    managerName: "Branch Manager",
    status: "active"
  }
];

const iphoneCatalog = [
  ["iPhone 15 Pro Max", "256GB", "Natural Titanium", 429999, 389000, 92],
  ["iPhone 15 Pro", "128GB", "Black Titanium", 359999, 328000, 97],
  ["iPhone 14 Pro Max", "256GB", "Deep Purple", 309999, 279000, 88],
  ["iPhone 14", "128GB", "Midnight", 224999, 201000, 93],
  ["iPhone 13 Pro", "256GB", "Sierra Blue", 239999, 213000, 86],
  ["iPhone 13", "128GB", "Starlight", 184999, 161000, 90]
];

const run = async () => {
  await connectDb();

  await Promise.all([
    Branch.deleteMany({}),
    User.deleteMany({}),
    Product.deleteMany({}),
    Sale.deleteMany({}),
    Purchase.deleteMany({}),
    SiteSettings.deleteMany({})
  ]);

  const branches = await Branch.insertMany(branchSeeds);
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const [admin, staffA, staffB] = await User.insertMany([
    { name: "Skylink Admin", email: "admin@skylink.local", passwordHash, role: "admin" },
    { name: "Nauman Branch Staff", email: "staff.sl3@skylink.local", passwordHash, role: "staff", branchId: branches[0]._id },
    { name: "Bank Road Staff", email: "staff.sl10@skylink.local", passwordHash, role: "staff", branchId: branches[1]._id }
  ]);

  const products = iphoneCatalog.map((item, index) => {
    const branch = branches[index % branches.length];
    const staff = index % 2 === 0 ? staffA : staffB;
    const [title, storage, color, price, costPrice, batteryHealth] = item;
    return {
      title,
      slug: slugify(`${title}-${storage}-${color}`),
      brand: "Apple",
      model: title,
      series: title.includes("15") ? "iPhone 15" : "iPhone",
      storage,
      color,
      condition: index < 2 ? "new" : "used-excellent",
      batteryHealth,
      ptaStatus: index % 3 === 0 ? "pta" : "non-pta",
      price,
      costPrice,
      sku: `SKU-${1000 + index}`,
      imeiOptionalMasked: `35******${1000 + index}`,
      description: "Professionally checked premium device with cosmetic grading and branch-backed support.",
      features: ["Face ID", "True Tone display", "Battery health checked", "Physical store support"],
      accessories: ["Charging cable", "Device inspection sheet"],
      images: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
      ],
      branchId: branch._id,
      addedByUserId: staff._id,
      stockStatus: "available",
      quantity: 1,
      isFeatured: index < 4,
      isPublished: true,
      approvalStatus: "approved"
    };
  });

  const insertedProducts = await Product.insertMany(products);

  await Purchase.insertMany(
    insertedProducts.slice(0, 4).map((product, index) => ({
      productId: product._id,
      branchId: product.branchId,
      staffUserId: index % 2 === 0 ? staffA._id : staffB._id,
      vendorName: "Premium Devices Wholesale",
      purchasePrice: product.costPrice,
      quantity: 1,
      notes: "Seeded opening inventory"
    }))
  );

  await Sale.insertMany([
    { productId: insertedProducts[2]._id, branchId: insertedProducts[2].branchId, staffUserId: staffA._id, salePrice: 314999, customerNameOptional: "Walk-in customer", paymentMethod: "bank-transfer" },
    { productId: insertedProducts[3]._id, branchId: insertedProducts[3].branchId, staffUserId: staffB._id, salePrice: 229999, customerNameOptional: "Instagram lead", paymentMethod: "cash" }
  ]);

  await SiteSettings.create({
    brandName: "Skylink Mobile Shop",
    supportPhones: ["0331-5375616", "0300-5555036", "0322-5528855"],
    supportWhatsApp: "0331-5375616",
    addresses: branchSeeds.map((branch) => branch.address),
    socialLinks: { instagram: "https://instagram.com/sky_link_4" },
    heroContent: {
      eyebrow: "Premium Apple Devices in Rawalpindi",
      title: "Curated iPhone inventory with real branch-backed trust.",
      subtitle: "Explore premium devices, verified condition grades, and fast WhatsApp support across Skylink branches.",
      primaryCta: "Browse Inventory",
      secondaryCta: "Contact Skylink"
    },
    seoDefaults: {
      title: "Skylink Mobile Shop",
      description: "Premium iPhones and flagship phones from Skylink Mobile Shop in Singapore Plaza, Saddar, Rawalpindi."
    },
    homepageSections: {
      moderationEnabled: true,
      trustHighlights: ["Multi-branch physical retailer", "Battery health checked", "PTA & condition transparency"],
      financeBlocks: ["Trade-in guidance", "Warranty options", "PTA advisory"]
    }
  });

  console.log("Seed complete");
  await mongoose.connection.close();
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
