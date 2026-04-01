import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    logo: { type: String, default: "" },
    supportPhones: [{ type: String }],
    supportWhatsApp: { type: String, default: "" },
    addresses: [{ type: String }],
    socialLinks: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" }
    },
    heroContent: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      primaryCta: { type: String, default: "" },
      secondaryCta: { type: String, default: "" }
    },
    seoDefaults: {
      title: { type: String, default: "" },
      description: { type: String, default: "" }
    },
    homepageSections: {
      moderationEnabled: { type: Boolean, default: true },
      trustHighlights: [{ type: String }],
      financeBlocks: [{ type: String }]
    }
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);
