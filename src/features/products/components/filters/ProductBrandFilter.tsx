import { useProductFilters } from '../../hooks/useProductFilters'

type ProductBrandFilterProps = {
  brands: string[]
}

export function ProductBrandFilter({ brands }: ProductBrandFilterProps) {
  const { filters, setFilter } = useProductFilters()

  function toggleBrand(brand: string) {
    const isSelected = filters.brands.includes(brand)

    const nextBrands = isSelected
      ? filters.brands.filter((selectedBrand) => selectedBrand !== brand)
      : [...filters.brands, brand]

    setFilter('brands', nextBrands)
  }

  return (
    <div className="product-filter">
      <p className="product-filter__label">Brand</p>

      <div className="product-filter__checkbox-list">
        {brands.length === 0 ? (
          <p className="product-filter__empty">No brands available</p>
        ) : (
          brands.map((brand) => (
            <label className="product-filter__checkbox" key={brand}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => {
                  toggleBrand(brand)
                }}
              />

              <span>{brand}</span>
            </label>
          ))
        )}
      </div>
    </div>
  )
}