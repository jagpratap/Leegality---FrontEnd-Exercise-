import { useProductFilters } from '../../hooks/useProductFilters'

type ProductPaginationProps = {
  currentPage: number
  totalPages: number
}

export function ProductPagination({
  currentPage,
  totalPages,
}: ProductPaginationProps) {
  const { setFilter } = useProductFilters()

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  function goToPage(page: number) {
    setFilter('page', page)
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="product-pagination" aria-label="Product pagination">
      <button
        className="product-pagination__button"
        type="button"
        disabled={!canGoPrevious}
        onClick={() => {
          goToPage(currentPage - 1)
        }}
      >
        Previous
      </button>

      <span className="product-pagination__status">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="product-pagination__button"
        type="button"
        disabled={!canGoNext}
        onClick={() => {
          goToPage(currentPage + 1)
        }}
      >
        Next
      </button>
    </nav>
  )
}