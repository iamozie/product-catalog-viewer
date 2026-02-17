import { useEffect } from "react";
import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

const MOCK_REVIEWS = [
  { author: "Sarah M.", text: "Great quality and fast shipping. Very satisfied!", rating: 5 },
  { author: "John D.", text: "Exactly as described. Would buy again.", rating: 4 },
];

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6 p-6 sm:flex-row">
          <div className="flex-shrink-0 sm:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="aspect-square w-full rounded-lg object-contain bg-slate-100 p-4 dark:bg-slate-700"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex items-start justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {product.category}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <h2
              id="product-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {product.title}
            </h2>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span aria-label={`Rating: ${product.rating.rate} out of 5`}>
                ★ {product.rating.rate}
              </span>
              <span>({product.rating.count} reviews)</span>
            </div>
            <p className="mt-4 flex-1 text-slate-600 dark:text-slate-300">
              {product.description}
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Recent reviews
              </h3>
              {MOCK_REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-700/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {r.author}
                    </span>
                    <span className="text-amber-500">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
