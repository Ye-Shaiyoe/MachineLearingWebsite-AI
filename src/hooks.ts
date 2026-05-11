/**
 * Custom React hooks with TypeScript support
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Persona, Message, ToastState, ToastType } from './types/index'

/**
 * Hook untuk mengelola state Toast
 */
export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((msg: string, type: ToastType = 'info') => {
    setToast({ msg, type })
  }, [])

  const closeToast = useCallback(() => {
    setToast(null)
  }, [])

  return { toast, showToast, closeToast }
}

/**
 * Hook untuk auto-scroll ke pesan terbaru
 */
export function useAutoScroll<T extends HTMLElement>(
  dependency: unknown[]
): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, dependency)

  return ref
}

/**
 * Hook untuk debounce nilai
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(T)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook untuk local storage dengan type safety
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      console.error(`Error reading localStorage key "${key}":`)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error(`Error setting localStorage key "${key}":`)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook untuk toggle state boolean
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setValueDirectly = useCallback((newValue: boolean) => {
    setValue(newValue)
  }, [])

  return [value, toggle, setValueDirectly]
}

/**
 * Hook untuk previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/**
 * Hook untuk async state management
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setData(null)
    setError(null)
    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error as E)
      setStatus('error')
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, data, error }
}

/**
 * Hook untuk debounce callback
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedCallback as T
}

/**
 * Hook untuk detect click outside
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [callback])

  return ref
}
