import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

import type {
  Product,
  ProductCategory,
} from '../api/productsApi.types'
import { ProductFiltersPanel } from '../components/filters/ProductFiltersPanel'
import { ProductEmptyState } from '../components/listing/ProductEmptyState'
import { ProductGrid } from '../components/listing/ProductGrid'
import { ProductListingHeader } from '../components/listing/ProductListingHeader'
import { ProductPagination } from '../components/listing/ProductPagination'
import { useProductFilters } from '../hooks/useProductFilters'
import { ProductListingLayout } from '../layouts/ProductListingLayout'
import { filterProducts } from '../utils/filterProducts'
import { getProductBrands } from '../utils/getProductBrands'

type ProductsLoaderData = {
  products: Product[]
  total: number
  limit: number
  skip: number
  currentPage: number
  categories: ProductCategory[]
}

export function ProductsPage() {
  const { products, total, limit, currentPage, categories } =
    useLoaderData() as ProductsLoaderData

  const { filters, clearFilters } = useProductFilters()

  const brands = useMemo(() => {
    return getProductBrands(products)
  }, [products])

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters)
  }, [products, filters])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <ProductListingLayout
      filters={
        <ProductFiltersPanel
          categories={categories}
          brands={brands}
        />
      }
    >
      <div className="product-listing">
        <ProductListingHeader
          visibleProductsCount={filteredProducts.length}
          totalProductsCount={total}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <ProductEmptyState onClearFilters={clearFilters} />
        )}

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </ProductListingLayout>
  )
}