import { buildApiUrl, type QueryParams } from './buildApiUrl'

type ApiGetOptions = {
  query?: QueryParams
}

export async function apiGet<TResponse>(
  endpoint: string,
  options: ApiGetOptions = {},
): Promise<TResponse> {
  const url = buildApiUrl(endpoint, options.query)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}