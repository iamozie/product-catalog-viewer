import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
          {product.category}
        </span>
        <h3 className="line-clamp-2 font-semibold text-slate-900 dark:text-white">
          {product.title}
        </h3>
        <p className="mt-auto text-lg font-bold text-slate-900 dark:text-white">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
}
