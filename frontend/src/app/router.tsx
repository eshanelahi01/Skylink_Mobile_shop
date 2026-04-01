import { Navigate, createBrowserRouter } from "react-router-dom";
import { ScrollToTopLayout } from "@/app/scroll-to-top-layout";
import { PublicLayout } from "@/layouts/public-layout";
import { HomePage } from "@/pages/public/home-page";
import { ShopPage } from "@/pages/public/shop-page";
import { ProductDetailPage } from "@/pages/public/product-detail-page";
import { AboutPage } from "@/pages/public/about-page";
import { BranchesPage } from "@/pages/public/branches-page";
import { ContactPage } from "@/pages/public/contact-page";

export const router = createBrowserRouter([
  {
    element: <ScrollToTopLayout />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "shop", element: <ShopPage /> },
          { path: "product/:slug", element: <ProductDetailPage /> },
          { path: "about", element: <AboutPage /> },
          { path: "branches", element: <BranchesPage /> },
          { path: "contact", element: <ContactPage /> }
        ]
      },
      { path: "/login", element: <Navigate to="/" replace /> },
      { path: "/admin/*", element: <Navigate to="/" replace /> },
      { path: "/staff/*", element: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
