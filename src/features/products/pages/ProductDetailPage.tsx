import { useLoaderData } from 'react-router-dom'

import type { Product } from '../api/productsApi.types'
import { ProductDetailView } from '../components/detail/ProductDetailView'

type ProductDetailLoaderData = {
  product: Product
}

export function ProductDetailPage() {
  const { product } = useLoaderData() as ProductDetailLoaderData

  return <ProductDetailView product={product} />
}