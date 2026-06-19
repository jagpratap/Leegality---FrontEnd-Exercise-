import type { Product } from '../../api/productsApi.types'
import { ProductCard } from './ProductCard'
import './ProductListing.css'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}