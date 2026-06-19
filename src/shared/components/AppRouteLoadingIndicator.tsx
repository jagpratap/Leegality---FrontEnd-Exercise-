import { useNavigation } from 'react-router-dom'

export function AppRouteLoadingIndicator() {
  const navigation = useNavigation()

  if (navigation.state === 'idle') {
    return null
  }

  return (
    <div className="app-route-loading" role="status" aria-live="polite">
      Loading...
    </div>
  )
}