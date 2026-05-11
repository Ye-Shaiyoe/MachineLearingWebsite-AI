/**
 * Utility functions with TypeScript type safety
 */

import type { Persona } from './types/index'
import { DEFAULT_PERSONAS } from './constants'

/**
 * Load personas from localStorage with fallback to defaults
 */
export function loadPersonas(): Persona[] {
  try {
    const stored = localStorage.getItem('personas')
    if (!stored) return DEFAULT_PERSONAS
    return JSON.parse(stored) as Persona[]
  } catch {
    console.error('Failed to load personas from localStorage')
    return DEFAULT_PERSONAS
  }
}

/**
 * Save personas to localStorage
 */
export function savePersonas(personas: Persona[]): void {
  try {
    localStorage.setItem('personas', JSON.stringify(personas))
  } catch {
    console.error('Failed to save personas to localStorage')
  }
}

/**
 * Load API key from localStorage
 */
export function loadApiKey(): string {
  try {
    return localStorage.getItem('or_apikey') || ''
  } catch {
    console.error('Failed to load API key from localStorage')
    return ''
  }
}

/**
 * Save API key to localStorage
 */
export function saveApiKey(key: string): void {
  try {
    localStorage.setItem('or_apikey', key)
  } catch {
    console.error('Failed to save API key to localStorage')
  }
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6
}

/**
 * Format error message from API response
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return 'Terjadi kesalahan'
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Format timestamp to readable time
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Check if API key is valid (minimum length check)
 */
export function isValidApiKey(apiKey: string): boolean {
  return apiKey.trim().length > 10
}

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}
