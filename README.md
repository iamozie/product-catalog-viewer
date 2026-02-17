## Product Catalog Viewer

A responsive React + TypeScript application for browsing a product catalog, filtering items, and managing a shopping cart. Built with Vite, Tailwind CSS, and Zustand for lightweight state management.

### Features

- **Product listing**: Browse a grid of products with images, titles, prices, categories, and ratings.
- **Product filters**: Filter by category and search by product name using `Filters` and `filterProducts`.
- **Product details modal**: Click a product card to open a detailed view with description, rating, and mock customer reviews.
- **Shopping cart**: Add items to the cart from the product detail modal and see a running cart summary (item count and total).
- **Persistent cart state**: Cart contents are stored via `zustand` with persistence (`product-catalog-cart` key), so your cart survives page reloads.
- **Modern UI**: Tailwind CSS-based layout with light/dark friendly colors and accessible focus states.

### Tech Stack

- **React 19** with **TypeScript**
- **Vite** for fast dev/build tooling
- **Zustand** for global state and cart management
- **Tailwind CSS 4** for styling

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** (comes with Node) or another package manager

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The dev server URL will be printed in the terminal (typically `http://localhost:5173`).

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

## Project Structure (key files)

- **`src/App.tsx`**: Entry UI that wires together layout, filters, product grid, and product detail modal.
- **`src/components/Layout.tsx`**: Page shell with header and `CartSummary`.
- **`src/components/ProductCard.tsx`**: Card UI for each product in the grid.
- **`src/components/ProductDetail.tsx`**: Modal with full product details, mock reviews, and "Add to Cart".
- **`src/hooks/useProducts.ts`**: Custom hook that fetches products and applies filters.
- **`src/store/cartStore.ts`**: Zustand store that manages cart items, quantities, counts, and totals with persistence.
- **`src/utils/filterProducts.ts`**: Utility for combining category and search filters.

## State Management

- **Products**: Managed by `useProductsStore` (in `src/store/productsStore.ts`), which handles fetching, loading, and error state.
- **Cart**: Managed by `useCartStore` (in `src/store/cartStore.ts`) with actions for adding/removing items and updating quantities, plus derived selectors for `itemCount` and `total`.

## Running Lint

Run ESLint on the project:

```bash
npm run lint
```

## Customization Ideas

- **API integration**: Point the products store to a real API (e.g. a fake store API or your backend).
- **More filters**: Add price range, rating, or sort options.
- **Routing**: Introduce product detail routes using `react-router-dom` instead of (or in addition to) the modal pattern.

## License

Add your preferred license information here (e.g. MIT).
