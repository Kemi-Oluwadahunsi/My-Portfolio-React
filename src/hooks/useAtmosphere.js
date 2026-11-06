import { useSyncExternalStore } from 'react'
import useTheme from './useTheme'

const motionQuery = typeof window === 'undefined' ? null : window.matchMedia('(prefers-reduced-motion: reduce)')
const getReducedMotion = () => motionQuery?.matches ?? true
const getServerReducedMotion = () => true
function subscribeToMotion(callback) {
  motionQuery?.addEventListener('change', callback)
  return () => motionQuery?.removeEventListener('change', callback)
}

export default function useAtmosphere() {
  const { theme, resolvedMode } = useTheme()
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, getServerReducedMotion)
  return {
    enabled: theme === 'deep-current' && resolvedMode === 'dark' && !reducedMotion,
    backgroundEnabled: !reducedMotion,
    reducedMotion,
    color: getComputedStyle(document.documentElement).getPropertyValue('--color-cursor').trim(),
  }
}
