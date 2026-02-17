import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onProductSelect: (product: Product) => void;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="aspect-square bg-slate-200 dark:bg-slate-600" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-600" />
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-600" />
            <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-600" />
            <div className="h-5 w-1/3 rounded bg-slate-200 dark:bg-slate-600" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductGrid({
  products,
  loading,
  error,
  onProductSelect,
}: ProductGridProps) {
  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <p className="font-medium text-red-800 dark:text-red-200">{error}</p>
        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 dark:text-slate-300">
          No products match your filters. Try adjusting your search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  );
}
