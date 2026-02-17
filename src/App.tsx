import { useState } from "react";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types/product";

function App() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Layout>
      <Filters />
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        onProductSelect={setSelectedProduct}
      />
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Layout>
  );
}

export default App;
