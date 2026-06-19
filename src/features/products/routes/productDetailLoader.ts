import type { LoaderFunctionArgs } from 'react-router-dom'

import { productsApi } from '../api/productsApi'

export async function productDetailLoader({ params }: LoaderFunctionArgs) {
  const productId = params.productId

  if (!productId) {
    throw new Error('Product id is required.')
  }

  const product = await productsApi.getProductById(productId)

  return {
    product,
  }
}