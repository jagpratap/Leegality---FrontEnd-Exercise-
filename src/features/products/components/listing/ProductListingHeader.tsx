type ProductListingHeaderProps = {
  visibleProductsCount: number
  totalProductsCount: number
  currentPage: number
  totalPages: number
}

export function ProductListingHeader({
  visibleProductsCount,
  totalProductsCount,
  currentPage,
  totalPages,
}: ProductListingHeaderProps) {
  return (
    <div className="product-listing-header">
      <div>
        <h2 className="product-listing-header__title">Products</h2>

        <p className="product-listing-header__summary">
          Showing {visibleProductsCount} products on page {currentPage} of{' '}
          {totalPages}
        </p>
      </div>

      <p className="product-listing-header__total">
        {totalProductsCount} total products
      </p>
    </div>
  )
}