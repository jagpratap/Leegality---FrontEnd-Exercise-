type ProductClearFiltersProps = {
  onClear: () => void
}

export function ProductClearFilters({ onClear }: ProductClearFiltersProps) {
  return (
    <button
      className="product-filters__clear-button"
      type="button"
      onClick={onClear}
    >
      Clear
    </button>
  )
}