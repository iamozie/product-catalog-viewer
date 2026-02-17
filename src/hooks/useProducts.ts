import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProductsStore } from "../store/productsStore";
import { filterProducts } from "../utils/filterProducts";

export function useProducts() {
  const products = useProductsStore(
    useShallow((state) =>
      filterProducts(state.products, state.selectedCategory, state.searchQuery)
    )
  );
  const loading = useProductsStore((state) => state.loading);
  const error = useProductsStore((state) => state.error);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error };
}
