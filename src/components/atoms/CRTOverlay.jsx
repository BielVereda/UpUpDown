import { useAppStore } from '@/store/useAppStore'

export default function CRTOverlay() {
  const crt = useAppStore((s) => s.crt)
  if (!crt) return null
  return <div className="crt-overlay" aria-hidden="true" />
}
