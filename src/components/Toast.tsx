import { useEffect } from 'react'

interface ToastProps {
  msg: string
  type: string
  onClose: () => void
}

export function Toast({ msg, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800)
    return () => clearTimeout(t)
  }, [onClose])
  return <div className={`toast ${type}`}>{msg}</div>
}
