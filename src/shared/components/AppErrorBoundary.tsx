import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from 'react-router-dom'

import './AppFeedback.css'

export function AppErrorBoundary() {
  const error = useRouteError()

  let title = 'Unable to load page'
  let message = 'Something went wrong. Please try again.'

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message =
      typeof error.data === 'string'
        ? error.data
        : 'The requested page could not be loaded.'
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <main className="app-feedback">
      <div className="app-feedback__card">
        <p className="app-feedback__eyebrow">Error</p>

        <h1 className="app-feedback__title">{title}</h1>

        <p className="app-feedback__description">{message}</p>

        <Link className="app-feedback__link" to="/">
          Back to products
        </Link>
      </div>
    </main>
  )
}