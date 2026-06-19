import type { ProductCategory } from '../../api/productsApi.types'
import { useProductFilters } from '../../hooks/useProductFilters'

type ProductCategoryFilterProps = {
  categories: ProductCategory[]
}

export function ProductCategoryFilter({
  categories,
}: ProductCategoryFilterProps) {
  const { filters, setFilter, clearFilter } = useProductFilters()

  return (
    <div className="product-filter">
      <label className="product-filter__label" htmlFor="product-category">
        Category
      </label>

      <select
        id="product-category"
        className="product-filter__input"
        value={filters.category}
        onChange={(event) => {
          const value = event.target.value

          if (!value) {
            clearFilter('category')
            return
          }

          setFilter('category', value)
        }}
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}