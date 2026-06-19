import { useLocation, useNavigate } from 'react-router-dom'

import type { Product } from '../../api/productsApi.types'
import './ProductDetail.css'

type ProductDetailViewProps = {
  product: Product
}

type ProductDetailLocationState = {
  from?: string
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const locationState = location.state as ProductDetailLocationState | null

  function handleBack() {
    if (locationState?.from) {
      navigate(locationState.from)
      return
    }

    navigate('/')
  }

  return (
    <main className="product-detail">
      <button
        className="product-detail__back-button"
        type="button"
        onClick={handleBack}
      >
        ← Back to products
      </button>

      <article className="product-detail__card">
        <div className="product-detail__image-wrap">
          <img
            className="product-detail__image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-detail__content">
          <p className="product-detail__category">{product.category}</p>

          <h2 className="product-detail__title">{product.title}</h2>

          <p className="product-detail__price">${product.price}</p>

          <p className="product-detail__rating">
            Rating: {product.rating.toFixed(1)}
          </p>

          <p className="product-detail__description">
            {product.description}
          </p>

          <dl className="product-detail__meta">
            <div className="product-detail__meta-row">
              <dt>Brand</dt>
              <dd>{product.brand ?? 'Unknown'}</dd>
            </div>

            <div className="product-detail__meta-row">
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  )
}