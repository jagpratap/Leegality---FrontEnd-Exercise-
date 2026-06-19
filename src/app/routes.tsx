import type { RouteObject } from 'react-router-dom'

import { AppLayout } from './layouts/AppLayout'
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage'
import { ProductsPage } from '../features/products/pages/ProductsPage'
import { productDetailLoader } from '../features/products/routes/productDetailLoader'
import { productsLoader } from '../features/products/routes/productsLoader'
import { AppErrorBoundary } from '../shared/components/AppErrorBoundary'
import { productsShouldRevalidate } from '../features/products/routes/productsShouldRevalidate'
import { AppLoadingFallback } from '../shared/components/AppLoadingFallback'

export const appRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    HydrateFallback: AppLoadingFallback,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        path: '/',
        element: <ProductsPage />,
        loader: productsLoader,
        shouldRevalidate: productsShouldRevalidate,
      },
      {
        path: '/product/:productId',
        element: <ProductDetailPage />,
        loader: productDetailLoader,
      },
    ],
  },
]