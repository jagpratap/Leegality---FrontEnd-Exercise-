import { apiGet } from '../../../shared/api/apiClient'
import type {
  GetProductsByCategoryParams,
  GetProductsParams,
  Product,
  ProductCategory,
  ProductCategoryDto,
  ProductsResponse,
} from './productsApi.types'

export const productsApi = {
  getProducts(params: GetProductsParams = {}) {
    return apiGet<ProductsResponse>('/products', {
      query: {
        limit: params.limit,
        skip: params.skip,
      },
    })
  },

  getProductById(productId: number | string) {
    return apiGet<Product>(`/products/${productId}`)
  },

  async getCategories() {
    const categories = await apiGet<ProductCategoryDto[]>('/products/categories')

    return categories.map(normalizeProductCategory)
  },

  getProductsByCategory(params: GetProductsByCategoryParams) {
    return apiGet<ProductsResponse>(
      `/products/category/${params.categorySlug}`,
      {
        query: {
          limit: params.limit,
          skip: params.skip,
        },
      },
    )
  },
}

function normalizeProductCategory(category: ProductCategoryDto): ProductCategory {
  if (typeof category === 'string') {
    return {
      slug: category,
      name: formatCategoryName(category),
    }
  }

  return {
    slug: category.slug,
    name: category.name,
  }
}

function formatCategoryName(categorySlug: string): string {
  return categorySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
