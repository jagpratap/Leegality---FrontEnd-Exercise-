import type { ShouldRevalidateFunctionArgs } from 'react-router-dom'

const PAGE_PARAM = 'page'

export function productsShouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  const isSamePath = currentUrl.pathname === nextUrl.pathname

  if (!isSamePath) {
    return defaultShouldRevalidate
  }

  const currentPage = currentUrl.searchParams.get(PAGE_PARAM)
  const nextPage = nextUrl.searchParams.get(PAGE_PARAM)

  if (currentPage !== nextPage) {
    return true
  }

  if (currentUrl.search !== nextUrl.search) {
    return false
  }

  return defaultShouldRevalidate
}