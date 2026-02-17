import { useCallback, useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function Filters() {
  const {
    categories,
    selectedCategory,
    searchQuery,
    setCategory,
    setSearchQuery,
    clearFilters,
  } = useProductsStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  }, []);

  const hasFilters = selectedCategory || searchQuery;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search products..."
            value={localSearch}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            aria-label="Search products by name"
          />
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden
          >
            &#128269;
          </span>
        </div>
        <select
          value={selectedCategory ?? ""}
          onChange={(e) => setCategory(e.target.value || null)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            clearFilters();
            setLocalSearch("");
          }}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
