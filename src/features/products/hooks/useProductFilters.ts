import { useMemo } from 'react'

import {
  useUrlFilters,
  type UrlFiltersConfig,
} from '../../../shared/hooks/useUrlFilters'

export type ProductFilters = {
  search: string
  category: string
  minPrice: number | null
  maxPrice: number | null
  brands: string[]
  page: number
}

const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  search: '',
  category: '',
  minPrice: null,
  maxPrice: null,
  brands: [],
  page: 1,
}

const PRODUCT_FILTER_PARAMS = {
  search: 'q',
  category: 'category',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  brands: 'brand',
  page: 'page',
} as const

export function useProductFilters() {
  const fields = useMemo<UrlFiltersConfig<ProductFilters>>(
    () => ({
      search: {
        defaultValue: DEFAULT_PRODUCT_FILTERS.search,
        parse: parseStringParam(PRODUCT_FILTER_PARAMS.search),
        serialize: serializeStringParam(PRODUCT_FILTER_PARAMS.search),
        canSet: (value) => typeof value === 'string',
        resetOnChange: ['page'],
      },

      category: {
        defaultValue: DEFAULT_PRODUCT_FILTERS.category,
        parse: parseStringParam(PRODUCT_FILTER_PARAMS.category),
        serialize: serializeStringParam(PRODUCT_FILTER_PARAMS.category),
        canSet: (value) => typeof value === 'string',
        resetOnChange: ['page'],
      },

      minPrice: {
        defaultValue: DEFAULT_PRODUCT_FILTERS.minPrice,
        parse: parseNullableNumberParam(PRODUCT_FILTER_PARAMS.minPrice),
        serialize: serializeNullableNumberParam(PRODUCT_FILTER_PARAMS.minPrice),
        canSet: (value) => value === null || value >= 0,
        resetOnChange: ['page'],
      },

      maxPrice: {
        defaultValue: DEFAULT_PRODUCT_FILTERS.maxPrice,
        parse: parseNullableNumberParam(PRODUCT_FILTER_PARAMS.maxPrice),
        serialize: serializeNullableNumberParam(PRODUCT_FILTER_PARAMS.maxPrice),
        canSet: (value) => value === null || value >= 0,
        resetOnChange: ['page'],
      },

      brands: {
        defaultValue: DEFAULT_PRODUCT_FILTERS.brands,
        parse: parseArrayParam(PRODUCT_FILTER_PARAMS.brands),
        serialize: serializeArrayParam(PRODUCT_FILTER_PARAMS.brands),
        canSet: (value) => Array.isArray(value),
        isEqual: areStringArraysEqual,
        resetOnChange: ['page'],
      },

      page: {
        defaultValue: DEFAULT_PRODUCT_FILTERS.page,
        parse: parsePositiveNumberParam(PRODUCT_FILTER_PARAMS.page, 1),
        serialize: serializePageParam(PRODUCT_FILTER_PARAMS.page),
        canSet: (value) => Number.isInteger(value) && value >= 1,
      },
    }),
    [],
  )

  return useUrlFilters<ProductFilters>({
    fields,
  })
}

function parseStringParam(paramName: string) {
  return (params: URLSearchParams) => {
    return params.get(paramName)?.trim() ?? ''
  }
}

function serializeStringParam(paramName: string) {
  return (value: string, params: URLSearchParams) => {
    const normalizedValue = value.trim()

    if (!normalizedValue) {
      params.delete(paramName)
      return
    }

    params.set(paramName, normalizedValue)
  }
}

function parseNullableNumberParam(paramName: string) {
  return (params: URLSearchParams) => {
    const value = params.get(paramName)

    if (!value) {
      return null
    }

    const parsedValue = Number(value)

    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
      return null
    }

    return parsedValue
  }
}

function serializeNullableNumberParam(paramName: string) {
  return (value: number | null, params: URLSearchParams) => {
    if (value === null || !Number.isFinite(value)) {
      params.delete(paramName)
      return
    }

    params.set(paramName, String(value))
  }
}

function parsePositiveNumberParam(paramName: string, fallbackValue: number) {
  return (params: URLSearchParams) => {
    const value = params.get(paramName)

    if (!value) {
      return fallbackValue
    }

    const parsedValue = Number(value)

    if (!Number.isInteger(parsedValue) || parsedValue < 1) {
      return fallbackValue
    }

    return parsedValue
  }
}

function serializePageParam(paramName: string) {
  return (value: number, params: URLSearchParams) => {
    if (value <= 1) {
      params.delete(paramName)
      return
    }

    params.set(paramName, String(value))
  }
}

function parseArrayParam(paramName: string) {
  return (params: URLSearchParams) => {
    return params
      .getAll(paramName)
      .map((value) => value.trim())
      .filter(Boolean)
  }
}

function serializeArrayParam(paramName: string) {
  return (values: string[], params: URLSearchParams) => {
    params.delete(paramName)

    values.forEach((value) => {
      const normalizedValue = value.trim()

      if (normalizedValue) {
        params.append(paramName, normalizedValue)
      }
    })
  }
}

function areStringArraysEqual(currentValues: string[], nextValues: string[]) {
  if (currentValues.length !== nextValues.length) {
    return false
  }

  return currentValues.every((value, index) => value === nextValues[index])
}