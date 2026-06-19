export type Product = {
  id: number
  title: string
  price: number
  rating: number
  thumbnail: string
  description: string
  brand?: string
  category: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductCategoryDto =
  | {
      slug: string
      name: string
      url: string
    }
  | string

export type ProductCategory = {
  slug: string
  name: string
}

export type PaginationParams = {
  limit?: number
  skip?: number
}

export type GetProductsParams = PaginationParams

export type GetProductsByCategoryParams = PaginationParams & {
  categorySlug: string
}