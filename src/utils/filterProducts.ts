import type { Product } from "../types/product";

export function filterProducts(
  products: Product[],
  category: string | null,
  searchQuery: string
): Product[] {
  return products.filter((p) => {
    const matchCategory = !category || p.category === category;
    const matchSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
}
