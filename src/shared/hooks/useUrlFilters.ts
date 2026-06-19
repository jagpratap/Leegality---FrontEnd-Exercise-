import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

type FilterKey<TFilters> = Extract<keyof TFilters, string>

export type UrlFilterFieldConfig<TFilters, TKey extends FilterKey<TFilters>> = {
  defaultValue: TFilters[TKey]

  parse: (params: URLSearchParams) => TFilters[TKey]

  serialize: (value: TFilters[TKey], params: URLSearchParams) => void

  canSet?: (value: TFilters[TKey], currentFilters: TFilters) => boolean

  isEqual?: (currentValue: TFilters[TKey], nextValue: TFilters[TKey]) => boolean

  resetOnChange?: FilterKey<TFilters>[]
}

export type UrlFiltersConfig<TFilters> = {
  [TKey in FilterKey<TFilters>]: UrlFilterFieldConfig<TFilters, TKey>
}

type UseUrlFiltersOptions<TFilters> = {
  fields: UrlFiltersConfig<TFilters>
}

export function useUrlFilters<TFilters extends Record<string, unknown>>({
  fields,
}: UseUrlFiltersOptions<TFilters>) {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    return parseFiltersFromParams(fields, searchParams)
  }, [fields, searchParams])

  const setFilter = useCallback(
    <TKey extends FilterKey<TFilters>>(
      key: TKey,
      value: TFilters[TKey],
    ) => {
      const field = fields[key]

      if (!field.canSet?.(value, filters) && field.canSet) {
        return
      }

      const isSameValue = field.isEqual
        ? field.isEqual(filters[key], value)
        : areValuesEqual(filters[key], value)

      if (isSameValue) {
        return
      }

      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams)

        field.serialize(value, nextParams)

        field.resetOnChange?.forEach((resetKey) => {
          const resetField = fields[resetKey]
          resetField.serialize(resetField.defaultValue, nextParams)
        })

        return nextParams
      })
    },
    [fields, filters, setSearchParams],
  )

  const setFilters = useCallback(
    (nextValues: Partial<TFilters>) => {
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams)
        const currentFilters = parseFiltersFromParams(fields, currentParams)

        const keysToReset = new Set<FilterKey<TFilters>>()

        Object.entries(nextValues).forEach(([rawKey, rawValue]) => {
          const key = rawKey as FilterKey<TFilters>
          const value = rawValue as TFilters[typeof key]
          const field = fields[key]

          if (!field) {
            return
          }

          if (field.canSet && !field.canSet(value, currentFilters)) {
            return
          }

          const isSameValue = field.isEqual
            ? field.isEqual(currentFilters[key], value)
            : areValuesEqual(currentFilters[key], value)

          if (isSameValue) {
            return
          }

          field.serialize(value, nextParams)

          field.resetOnChange?.forEach((resetKey) => {
            keysToReset.add(resetKey)
          })
        })

        keysToReset.forEach((resetKey) => {
          const resetField = fields[resetKey]
          resetField.serialize(resetField.defaultValue, nextParams)
        })

        return nextParams
      })
    },
    [fields, setSearchParams],
  )

  const clearFilter = useCallback(
    <TKey extends FilterKey<TFilters>>(key: TKey) => {
      const field = fields[key]

      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams)

        field.serialize(field.defaultValue, nextParams)

        field.resetOnChange?.forEach((resetKey) => {
          const resetField = fields[resetKey]
          resetField.serialize(resetField.defaultValue, nextParams)
        })

        return nextParams
      })
    },
    [fields, setSearchParams],
  )

  const clearFilters = useCallback(() => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)

      Object.values(fields).forEach((rawField) => {
        const field = rawField as UrlFilterFieldConfig<TFilters, FilterKey<TFilters>>

        field.serialize(field.defaultValue, nextParams)
      })

      return nextParams
    })
  }, [fields, setSearchParams])

  return {
    filters,
    setFilter,
    setFilters,
    clearFilter,
    clearFilters,
    searchParams,
  }
}

function parseFiltersFromParams<TFilters extends Record<string, unknown>>(
  fields: UrlFiltersConfig<TFilters>,
  params: URLSearchParams,
): TFilters {
  const filters = {} as TFilters

  Object.entries(fields).forEach(([rawKey, rawField]) => {
    const key = rawKey as FilterKey<TFilters>
    const field = rawField as UrlFilterFieldConfig<TFilters, typeof key>

    try {
      filters[key] = field.parse(params)
    } catch {
      filters[key] = field.defaultValue
    }
  })

  return filters
}

function areValuesEqual<TValue>(currentValue: TValue, nextValue: TValue) {
  if (Array.isArray(currentValue) && Array.isArray(nextValue)) {
    if (currentValue.length !== nextValue.length) {
      return false
    }

    return currentValue.every((value, index) => value === nextValue[index])
  }

  return Object.is(currentValue, nextValue)
}