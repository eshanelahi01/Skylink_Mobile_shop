import { ProductForm } from "@/components/forms/product-form";

export const StaffNewProductPage = () => (
  <div className="space-y-6">
    <div>
      <div className="text-sm text-slate-500">Branch product workflow</div>
      <h1 className="text-3xl font-semibold tracking-tight">Add New Product</h1>
    </div>
    <ProductForm />
  </div>
);
