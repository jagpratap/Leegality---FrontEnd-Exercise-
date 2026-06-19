import { useState } from 'react'

import { useDebouncedCallback } from '../../../../shared/hooks/useDebouncedCallback'
import type { ProductCategory } from '../../api/productsApi.types'
import { useProductFilters } from '../../hooks/useProductFilters'
import { ProductBrandFilter } from './ProductBrandFilter'
import { ProductCategoryFilter } from './ProductCategoryFilter'
import { ProductClearFilters } from './ProductClearFilters'
import './ProductFilters.css'
import { ProductPriceFilter } from './ProductPriceFilter'
import { ProductSearchFilter } from './ProductSearchFilter'

const FILTER_INPUT_DEBOUNCE_DELAY_IN_MS = 400

type ProductFiltersPanelProps = {
  categories: ProductCategory[]
  brands: string[]
}

export function ProductFiltersPanel({
  categories,
  brands,
}: ProductFiltersPanelProps) {
  const { filters, setFilter, clearFilter, clearFilters } = useProductFilters()

  const [searchInput, setSearchInput] = useState(filters.search)
  const [minPriceInput, setMinPriceInput] = useState(
    formatPriceInput(filters.minPrice),
  )
  const [maxPriceInput, setMaxPriceInput] = useState(
    formatPriceInput(filters.maxPrice),
  )

  const commitSearchFilter = useDebouncedCallback((value: string) => {
    const normalizedValue = value.trim()

    if (!normalizedValue) {
      clearFilter('search')
      return
    }

    setFilter('search', normalizedValue)
  }, FILTER_INPUT_DEBOUNCE_DELAY_IN_MS)

  const commitMinPriceFilter = useDebouncedCallback((value: string) => {
    commitPriceFilter({
      value,
      filterKey: 'minPrice',
      setFilter,
      clearFilter,
    })
  }, FILTER_INPUT_DEBOUNCE_DELAY_IN_MS)

  const commitMaxPriceFilter = useDebouncedCallback((value: string) => {
    commitPriceFilter({
      value,
      filterKey: 'maxPrice',
      setFilter,
      clearFilter,
    })
  }, FILTER_INPUT_DEBOUNCE_DELAY_IN_MS)

  function handleSearchChange(value: string) {
    setSearchInput(value)
    commitSearchFilter(value)
  }

  function handleMinPriceChange(value: string) {
    setMinPriceInput(value)
    commitMinPriceFilter(value)
  }

  function handleMaxPriceChange(value: string) {
    setMaxPriceInput(value)
    commitMaxPriceFilter(value)
  }

  function handleClearFilters() {
    clearFilters()

    setSearchInput('')
    setMinPriceInput('')
    setMaxPriceInput('')
  }

  return (
    <div className="product-filters">
      <div className="product-filters__header">
        <h2 className="product-filters__title">Filters</h2>

        <ProductClearFilters onClear={handleClearFilters} />
      </div>

      <ProductSearchFilter
        value={searchInput}
        onChange={handleSearchChange}
      />

      <ProductCategoryFilter categories={categories} />

      <ProductPriceFilter
        minPriceValue={minPriceInput}
        maxPriceValue={maxPriceInput}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
      />

      <ProductBrandFilter brands={brands} />
    </div>
  )
}

type PriceFilterKey = 'minPrice' | 'maxPrice'

type CommitPriceFilterOptions = {
  value: string
  filterKey: PriceFilterKey
  setFilter: ReturnType<typeof useProductFilters>['setFilter']
  clearFilter: ReturnType<typeof useProductFilters>['clearFilter']
}

function commitPriceFilter({
  value,
  filterKey,
  setFilter,
  clearFilter,
}: CommitPriceFilterOptions) {
  const normalizedValue = value.trim()

  if (!normalizedValue) {
    clearFilter(filterKey)
    return
  }

  const parsedValue = Number(normalizedValue)

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return
  }

  setFilter(filterKey, parsedValue)
}

function formatPriceInput(value: number | null) {
  return value === null ? '' : String(value)
}