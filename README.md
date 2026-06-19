# Product Listing Application

A simple Amazon-style product listing and detail page application built with Vite, React, TypeScript, and React Router.

The application consumes the public DummyJSON Products API and implements product listing, product details, filters, URL-based filter state, debounced text inputs, and API-based pagination.

---

## Features

* Product listing page
* Product detail page
* Product cards with image, title, price, and rating
* Product detail view with image, title, price, rating, description, brand, and category
* Category filter
* Brand filter
* Price range filter
* Search filter
* Clear filters
* URL-based filter state
* Debounced search and price inputs
* API-based pagination using `limit` and `skip`
* Loading and error handling through React Router route loaders
* Filters remain available in the URL when navigating between listing and detail pages

---

## Tech Stack

* Vite
* React
* TypeScript
* React Router DOM
* CSS
* Native Fetch API

No additional API libraries such as Axios are used.

---

## API Used

The app uses the DummyJSON Products API.

Used endpoints:

```txt
GET /products
GET /products/categories
GET /products/category/{category}
GET /products/{id}
```

Pagination is handled using:

```txt
limit
skip
```

Example:

```txt
/products?limit=12&skip=24
```

---

## Application Routes

```txt
/                  Product Listing Page
/product/:productId Product Detail Page
```

---

## Project Structure

```txt
src/
├─ app/
│  ├─ layouts/
│  │  ├─ AppLayout.tsx
│  │  └─ AppLayout.css
│  │
│  ├─ App.tsx
│  ├─ router.tsx
│  └─ routes.tsx
│
├─ features/
│  └─ products/
│     ├─ api/
│     │  ├─ productsApi.ts
│     │  └─ productsApi.types.ts
│     │
│     ├─ components/
│     │  ├─ detail/
│     │  │  ├─ ProductDetailView.tsx
│     │  │  └─ ProductDetail.css
│     │  │
│     │  ├─ filters/
│     │  │  ├─ ProductFiltersPanel.tsx
│     │  │  ├─ ProductSearchFilter.tsx
│     │  │  ├─ ProductCategoryFilter.tsx
│     │  │  ├─ ProductPriceFilter.tsx
│     │  │  ├─ ProductBrandFilter.tsx
│     │  │  ├─ ProductClearFilters.tsx
│     │  │  └─ ProductFilters.css
│     │  │
│     │  └─ listing/
│     │     ├─ ProductListingHeader.tsx
│     │     ├─ ProductGrid.tsx
│     │     ├─ ProductCard.tsx
│     │     ├─ ProductPagination.tsx
│     │     ├─ ProductEmptyState.tsx
│     │     └─ ProductListing.css
│     │
│     ├─ hooks/
│     │  └─ useProductFilters.ts
│     │
│     ├─ layouts/
│     │  ├─ ProductListingLayout.tsx
│     │  └─ ProductListingLayout.css
│     │
│     ├─ pages/
│     │  ├─ ProductsPage.tsx
│     │  └─ ProductDetailPage.tsx
│     │
│     ├─ routes/
│     │  ├─ productsLoader.ts
│     │  ├─ productDetailLoader.ts
│     │  └─ productsShouldRevalidate.ts
│     │
│     └─ utils/
│        ├─ filterProducts.ts
│        └─ getProductBrands.ts
│
├─ shared/
│  ├─ api/
│  │  ├─ apiClient.ts
│  │  └─ buildApiUrl.ts
│  │
│  ├─ components/
│  │  ├─ AppErrorBoundary.tsx
│  │  ├─ AppLoadingFallback.tsx
│  │  ├─ AppRouteLoadingIndicator.tsx
│  │  └─ AppFeedback.css
│  │
│  └─ hooks/
│     ├─ useUrlFilters.ts
│     └─ useDebouncedCallback.ts
│
├─ styles/
│  └─ index.css
│
├─ main.tsx
└─ vite-env.d.ts
```

---

## Folder Structure Decisions

The project follows a feature-based structure.

### `app/`

Contains application-level setup only:

* router creation
* route configuration
* root layout
* app shell wiring

Product-specific logic is not placed inside `app/`.

### `features/products/`

Contains everything related to the products feature:

* product API methods
* product types
* product route loaders
* product pages
* product layouts
* product filters
* product listing components
* product detail components
* product-specific utilities

### `shared/`

Contains reusable non-product-specific logic:

* generic API client
* generic URL filter hook
* generic debounce hook
* shared loading and error components

---

## Setup Instructions

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Environment Variables

The app uses DummyJSON as the default API base URL.

Optional `.env` file:

```env
VITE_DUMMYJSON_BASE_URL=https://dummyjson.com
```

If the variable is not provided, the app falls back to:

```txt
https://dummyjson.com
```

---

## API Layer

The API layer is intentionally simple.

It uses:

* native `fetch`
* a small `apiGet` helper
* a small `buildApiUrl` helper
* typed product API methods

No Axios or external request library is used.

Example API responsibilities:

```txt
productsApi.getProducts()
productsApi.getCategories()
productsApi.getProductsByCategory()
productsApi.getProductById()
```

The API layer only handles fetching data. It does not handle UI state, filter state, or rendering logic.

---

## Routing

The app uses React Router DOM Data Router APIs.

Product list data is fetched using a route loader.

Product detail data is also fetched using a route loader.

Route-level error handling is handled through an error boundary.

Route transition loading is shown through a route loading indicator.

---

## Filtering

Filters are stored in the URL search params.

Example URL:

```txt
/?q=phone&category=smartphones&brand=Apple&minPrice=100&maxPrice=1000&page=2
```

The filter system is split into two layers:

### Generic filter hook

```txt
shared/hooks/useUrlFilters.ts
```

This hook is reusable and does not know anything about products.

It supports:

* parsing values from URL search params
* serializing values back to the URL
* default values
* guards before setting values
* clearing one filter
* clearing all filters
* resetting dependent fields such as page

### Product filter hook

```txt
features/products/hooks/useProductFilters.ts
```

This hook defines the actual product-specific filter fields:

* search
* category
* min price
* max price
* brands
* page

---

## Debouncing

Debouncing is used only where typing can trigger frequent updates.

Debounced filters:

* search input
* minimum price input
* maximum price input

Instant filters:

* category select
* brand checkbox
* clear filters
* pagination

This avoids updating the URL and recalculating filters on every keystroke.

---

## Pagination

Pagination uses the DummyJSON API with `limit` and `skip`.

The listing loader reads the current `page` value from the URL and converts it into API pagination params.

Example:

```txt
page = 3
limit = 12
skip = 24
```

The loader fetches:

```txt
/products?limit=12&skip=24
```

---

## Important Tradeoff

This implementation uses API-based pagination and client-side filtering.

That means filters are applied only to the products available on the currently fetched page.

For example, if the API returns 12 products for page 1 and a matching brand exists only on page 4, the brand filter may not show that product while the user is on page 1.

This tradeoff was chosen because the assessment allows API pagination using `limit` and `skip`, while some filters such as brand and price are easier to apply client-side with the available API.

In a production application, filtering and pagination should ideally happen together on the backend.

---

## Revalidation Strategy

Changing the page should refetch products from the API.

Changing filters should not refetch products.

Reason:

* page changes affect API `limit` and `skip`
* filter changes are handled client-side on the current fetched page

So the route uses `shouldRevalidate` to allow API refetching only when the `page` search param changes.

---

## Product Listing Page

The product listing page contains:

* full-width header
* left-side filter panel
* right-side product grid
* pagination at the bottom

The filter panel is independently scrollable.

The product listing area is independently scrollable.

Each product card displays:

* product image
* product title
* price
* rating

Clicking a product card navigates to:

```txt
/product/:productId
```

---

## Product Detail Page

The product detail page displays:

* product image
* product title
* price
* rating
* description
* brand
* category

A back button returns the user to the product listing page.

The previous filter URL is preserved when navigating from listing to detail.

---

## Assumptions Made

* DummyJSON is the only API source.
* Only GET APIs are required.
* Product creation, update, and deletion are not required.
* Search is implemented as an additional useful filter.
* Product cards use `thumbnail` as the main image.
* Detail page also uses `thumbnail` as the primary image.
* Product `brand` may be missing for some products, so it is treated as optional.
* Filters are stored in the URL to preserve state across navigation.
* Server-side pagination is used through `limit` and `skip`.
* Client-side filters apply only to the currently fetched page.
* No heavy UI libraries are used.
* Styling is done with plain CSS.

---

## Improvements If Given More Time

* Move filtering to the backend if the API supports search, category, brand, price range, and pagination together.
* Improve the current server-pagination/client-filtering tradeoff so filters apply globally, not only on the fetched page.
* Add sorting by price, rating, and title.
* Add better loading skeletons for product cards and the detail page.
* Add responsive mobile layout with a filter drawer.
* Add stronger accessibility states for filters, pagination, and product cards.
* Add image gallery support on the product detail page.
* Add better empty states for category-specific and search-specific no-result cases.
* Add retry actions for failed API requests.
* Add stricter runtime validation for API responses.
* Add deployment instructions after hosting the app.

---

## Known Limitation

Because the app uses API pagination with client-side filtering, the filters are limited to the products fetched for the current page.

A production-ready version should solve this by either:

1. moving filtering to the backend, or
2. fetching the full product dataset before filtering and paginating on the client.

---

## Submission

Add the following before submitting:

```txt
GitHub Repository: https://github.com/jagpratap/Leegality---FrontEnd-Exercise-
Demo Link: https://jagpratap.github.io/Leegality---FrontEnd-Exercise-/
```
