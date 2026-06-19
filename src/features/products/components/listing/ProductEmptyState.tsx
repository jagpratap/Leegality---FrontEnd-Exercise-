type ProductEmptyStateProps = {
  onClearFilters: () => void
}

export function ProductEmptyState({ onClearFilters }: ProductEmptyStateProps) {
  return (
    <div className="product-empty-state">
      <h3 className="product-empty-state__title">No products found</h3>

      <p className="product-empty-state__description">
        Try changing or clearing your filters.
      </p>

      <button
        className="product-empty-state__button"
        type="button"
        onClick={onClearFilters}
      >
        Clear filters
      </button>
    </div>
  )
}