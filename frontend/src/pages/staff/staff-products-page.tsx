import { usePublicProducts } from "@/api/queries";
import { DataTable } from "@/components/dashboard/data-table";
import { formatCurrency } from "@/lib/utils";

export const StaffProductsPage = () => {
  const { data: products = [] } = usePublicProducts();
  return <DataTable columns={["Product", "Price", "Branch", "Status"]} rows={products.map((product) => [product.model, formatCurrency(product.price), product.branchId.code, product.stockStatus])} />;
};
