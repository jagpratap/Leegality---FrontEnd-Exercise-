import type { LoaderFunctionArgs } from 'react-router-dom'

import { productsApi } from '../api/productsApi'

const PRODUCTS_PAGE_SIZE = 12
const DEFAULT_PAGE = 1

export async function productsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = parsePageParam(url.searchParams.get('page'))
  const skip = (page - 1) * PRODUCTS_PAGE_SIZE

  const [productsResponse, categories] = await Promise.all([
    productsApi.getProducts({
      limit: PRODUCTS_PAGE_SIZE,
      skip,
    }),
    productsApi.getCategories(),
  ])

  return {
    products: productsResponse.products,
    total: productsResponse.total,
    limit: productsResponse.limit,
    skip: productsResponse.skip,
    currentPage: page,
    categories,
  }
}

function parsePageParam(value: string | null): number {
  if (!value) {
    return DEFAULT_PAGE
  }

  const parsedValue = Number(value)

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return DEFAULT_PAGE
  }

  return parsedValue
}