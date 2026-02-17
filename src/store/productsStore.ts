import { create } from "zustand";
import type { Product } from "../types/product";
import { fetchProducts as apiFetchProducts, fetchCategories } from "../api/products";

interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const [products, categories] = await Promise.all([
        apiFetchProducts(),
        fetchCategories(),
      ]);
      const cats = categories.length > 0 ? categories : [...new Set(products.map((p) => p.category))];
      set({ products, categories: cats, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load products",
      });
    }
  },

  setCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearFilters: () => set({ selectedCategory: null, searchQuery: "" }),
}));
