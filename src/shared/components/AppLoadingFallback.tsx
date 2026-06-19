import './AppFeedback.css'

export function AppLoadingFallback() {
  return (
    <main className="app-feedback">
      <div className="app-feedback__card">
        <p className="app-feedback__eyebrow">Please wait</p>
        <h1 className="app-feedback__title">Loading store...</h1>
      </div>
    </main>
  )
}