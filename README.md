# Skylink Mobile Shop

## A) Shandar-inspired UX analysis

Shandar's strongest pattern is inventory-first retail: category-led browsing, quick visual scanning, dense but practical stock presentation, and a clear path from listing to contact. The weak point in that pattern is that local mobile-store layouts often feel crowded or mechanically stacked.

Skylink reinterprets that pattern by keeping the same business logic while upgrading the execution:
- product-led discovery remains the center of the storefront
- filters and branch visibility stay practical for real buyers
- card hierarchy is cleaner, more spacious, and more premium
- trust signals are elevated through PTA, battery health, branch, and condition tags
- CTA flow is sharper: browse -> product detail -> WhatsApp/reserve/contact

## B) Premium UI direction

Skylink's visual system is built around graphite, pearl white, soft silver, and restrained blue glow. The storefront uses cinematic product framing, dark-luxury surfaces, and cleaner Apple-like spacing. The dashboard keeps the same premium identity instead of falling into a generic admin template.

Design principles:
- large editorial typography with disciplined whitespace
- premium dark surfaces with controlled glass effects
- conversion-focused product cards with compact trust metadata
- sticky product and filter behavior for real shopping utility
- branch-backed authenticity throughout the public site

## Information architecture

Public:
- `/`
- `/shop`
- `/product/:slug`
- `/about`
- `/branches`
- `/contact`
- `/login`

Staff:
- `/staff`
- `/staff/products`
- `/staff/products/new`
- `/staff/sales`
- `/staff/purchases`
- `/staff/inquiries`
- `/staff/settings`

Admin:
- `/admin`
- `/admin/products`
- `/admin/sales`
- `/admin/purchases`
- `/admin/branches`
- `/admin/staff`
- `/admin/inquiries`
- `/admin/site-settings`
- `/admin/reports`

## MongoDB schema plan

Implemented models:
- `User`
- `Branch`
- `Product`
- `Sale`
- `Purchase`
- `ActivityLog`
- `SiteSettings`
- `Inquiry`
- `RefreshToken`

Key architectural rules:
- every staff user belongs to exactly one branch
- staff writes are branch-scoped
- admin has cross-branch visibility
- site/business details live in editable settings instead of hardcoded public content
- staff-created products can remain pending until admin approval

## API routes

Auth:
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Public/site:
- `GET /api/branches`
- `GET /api/site/settings`
- `GET /api/products/public`
- `GET /api/products/homepage-feed`
- `GET /api/products/public/:slug`
- `POST /api/inquiries`

Protected:
- `GET /api/dashboard/overview`
- `GET /api/products`
- `POST /api/products`
- `PATCH /api/products/:id`
- `PATCH /api/products/:id/approve`
- `GET /api/sales`
- `POST /api/sales`
- `GET /api/purchases`
- `POST /api/purchases`
- `GET /api/inquiries`
- `PUT /api/site/settings`
- `GET /api/reports/export`

## Folder structure

```text
skylink mobile shop/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seeds/
      services/
      utils/
      validators/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    public/
    src/
      api/
      app/
      components/
        dashboard/
        forms/
        public/
        ui/
      features/
        auth/
        dashboard/
      layouts/
      lib/
      pages/
        admin/
        auth/
        public/
        staff/
      styles/
      main.tsx
    .env.example
    index.html
    package.json
    postcss.config.js
    tailwind.config.js
    tsconfig.json
    vite.config.ts
  README.md
```

## Setup

### Backend
1. Copy `backend/.env.example` to `backend/.env`
2. Install dependencies with `npm install`
3. Start MongoDB locally
4. Run `npm run seed`
5. Run `npm run dev`

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env`
2. Install dependencies with `npm install`
3. Run `npm run dev`

## Demo credentials

Seeded backend users:
- Admin: `admin@skylink.local` / `Password123!`
- Staff SL3: `staff.sl3@skylink.local` / `Password123!`
- Staff SL10: `staff.sl10@skylink.local` / `Password123!`

Frontend demo-role quick access:
- Login page offers one-click `admin` and `staff` demo sessions

## Notes

- The frontend includes resilient fallback sample data so the UI can be explored before the API is running.
- Public business details are treated as seed data and can be edited through settings later.
- The structure is ready for future modules such as reservations, repairs, installment plans, and order workflows.
