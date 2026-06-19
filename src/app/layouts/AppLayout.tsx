import { Outlet } from 'react-router-dom'

import { AppRouteLoadingIndicator } from '../../shared/components/AppRouteLoadingIndicator'
import './AppLayout.css'

export function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-layout__header">
        <div className="app-layout__header-inner">
          <h1 className="app-layout__brand">Product Store</h1>
        </div>
      </header>

      <AppRouteLoadingIndicator />

      <Outlet />
    </div>
  )
}