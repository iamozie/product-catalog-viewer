import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function CartSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.total());

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Cart: ${itemCount} items`}
      >
        <span aria-hidden>🛒</span>
        <span className="font-medium text-slate-900 dark:text-white">
          Cart ({itemCount})
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-800">
            <div className="border-b border-slate-200 p-4 dark:border-slate-600">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Cart Summary
              </h3>
            </div>
            <div className="max-h-64 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 last:border-0 dark:border-slate-700"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.quantity} × ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label={`Remove ${item.product.title} from cart`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-slate-200 p-4 dark:border-slate-600">
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
