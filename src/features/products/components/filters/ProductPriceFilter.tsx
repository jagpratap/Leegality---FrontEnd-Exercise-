type ProductPriceFilterProps = {
  minPriceValue: string
  maxPriceValue: string
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
}

export function ProductPriceFilter({
  minPriceValue,
  maxPriceValue,
  onMinPriceChange,
  onMaxPriceChange,
}: ProductPriceFilterProps) {
  return (
    <div className="product-filter">
      <p className="product-filter__label">Price Range</p>

      <div className="product-filter__price-grid">
        <label className="product-filter__field">
          <span className="product-filter__field-label">Min</span>

          <input
            className="product-filter__input"
            type="number"
            min="0"
            value={minPriceValue}
            placeholder="0"
            onChange={(event) => {
              onMinPriceChange(event.target.value)
            }}
          />
        </label>

        <label className="product-filter__field">
          <span className="product-filter__field-label">Max</span>

          <input
            className="product-filter__input"
            type="number"
            min="0"
            value={maxPriceValue}
            placeholder="1000"
            onChange={(event) => {
              onMaxPriceChange(event.target.value)
            }}
          />
        </label>
      </div>
    </div>
  )
}