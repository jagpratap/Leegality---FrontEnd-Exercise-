export const API_BASE_URL = 'https://dummyjson.com'

type QueryValue = string | number | boolean | null | undefined

export type QueryParams = Record<string, QueryValue>

export function buildApiUrl(endpoint: string, query?: QueryParams): string {
  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`

  const url = new URL(`${API_BASE_URL}${normalizedEndpoint}`)

  if (!query) {
    return url.toString()
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    url.searchParams.set(key, String(value))
  })

  return url.toString()
}