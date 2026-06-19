import type { Product } from '../api/productsApi.types'
import type { ProductFilters } from '../hooks/useProductFilters'

type PriceRange = {
  minPrice: number | null
  maxPrice: number | null
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  return products.filter((product) => {
    const matchesSearch = matchesProductSearch(product, filters.search)
    const matchesCategory = matchesProductCategory(product, filters.category)
    const matchesPriceRange = matchesProductPriceRange(product, {
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    })
    const matchesBrand = matchesProductBrand(product, filters.brands)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriceRange &&
      matchesBrand
    )
  })
}

function matchesProductSearch(product: Product, search: string): boolean {
  const normalizedSearch = search.trim().toLowerCase()

  if (!normalizedSearch) {
    return true
  }

  return (
    product.title.toLowerCase().includes(normalizedSearch) ||
    product.description.toLowerCase().includes(normalizedSearch) ||
    product.category.toLowerCase().includes(normalizedSearch) ||
    product.brand?.toLowerCase().includes(normalizedSearch) === true
  )
}

function matchesProductCategory(
  product: Product,
  selectedCategory: string,
): boolean {
  if (!selectedCategory) {
    return true
  }

  return product.category === selectedCategory
}

function matchesProductPriceRange(
  product: Product,
  priceRange: PriceRange,
): boolean {
  const { minPrice, maxPrice } = priceRange

  const matchesMinPrice = minPrice === null || product.price >= minPrice
  const matchesMaxPrice = maxPrice === null || product.price <= maxPrice

  return matchesMinPrice && matchesMaxPrice
}

function matchesProductBrand(
  product: Product,
  selectedBrands: string[],
): boolean {
  if (selectedBrands.length === 0) {
    return true
  }

  if (!product.brand) {
    return false
  }

  return selectedBrands.includes(product.brand)
}