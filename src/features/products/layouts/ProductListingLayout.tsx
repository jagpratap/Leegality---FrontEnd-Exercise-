import type { ReactNode } from 'react'

import './ProductListingLayout.css'

type ProductListingLayoutProps = {
  filters: ReactNode
  children: ReactNode
}

export function ProductListingLayout({
  filters,
  children,
}: ProductListingLayoutProps) {
  return (
    <main className="product-listing-layout">
      <aside className="product-listing-layout__filters">
        {filters}
      </aside>

      <section className="product-listing-layout__content">
        {children}
      </section>
    </main>
  )
}