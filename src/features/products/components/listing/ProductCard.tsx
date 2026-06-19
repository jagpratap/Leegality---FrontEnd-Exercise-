import { Link, useLocation } from 'react-router-dom'

import type { Product } from '../../api/productsApi.types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const location = useLocation()

  return (
    <article className="product-card">
      <Link
        className="product-card__link"
        to={`/product/${product.id}`}
        state={{
          from: `${location.pathname}${location.search}`,
        }}
      >
        <div className="product-card__image-wrap">
          <img
            className="product-card__image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-card__content">
          <h3 className="product-card__title">{product.title}</h3>

          <p className="product-card__price">${product.price}</p>

          <p className="product-card__rating">
            Rating: {product.rating.toFixed(1)}
          </p>
        </div>
      </Link>
    </article>
  )
}