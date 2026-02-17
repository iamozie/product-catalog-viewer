import type { ReactNode } from "react";
import CartSummary from "./CartSummary";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Product Catalog
          </h1>
          <CartSummary />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
