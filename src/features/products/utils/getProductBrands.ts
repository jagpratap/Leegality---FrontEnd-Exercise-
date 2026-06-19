import type { Product } from '../api/productsApi.types'

export function getProductBrands(products: Product[]): string[] {
  const brands = products
    .map((product) => product.brand)
    .filter((brand): brand is string => Boolean(brand?.trim()))

  return Array.from(new Set(brands)).sort((firstBrand, secondBrand) =>
    firstBrand.localeCompare(secondBrand),
  )
}