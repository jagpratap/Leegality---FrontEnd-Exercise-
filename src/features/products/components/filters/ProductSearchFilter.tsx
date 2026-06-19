type ProductSearchFilterProps = {
  value: string
  onChange: (value: string) => void
}

export function ProductSearchFilter({
  value,
  onChange,
}: ProductSearchFilterProps) {
  return (
    <div className="product-filter">
      <label className="product-filter__label" htmlFor="product-search">
        Search
      </label>

      <input
        id="product-search"
        className="product-filter__input"
        type="search"
        value={value}
        placeholder="Search products..."
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </div>
  )
}