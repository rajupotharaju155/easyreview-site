import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackRoute } from '../../lib/analytics'

export function RouteTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    trackRoute(pathname)
  }, [pathname])

  return null
}
