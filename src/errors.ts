/**
 * Error handling utilities with type safety
 */

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super('AUTH_ERROR', message, 401)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super('AUTHORIZATION_ERROR', message, 403)
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super('NOT_FOUND', message, 404)
    this.name = 'NotFoundError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error') {
    super('NETWORK_ERROR', message)
    this.name = 'NetworkError'
  }
}

/**
 * Type guard untuk AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/**
 * Type guard untuk Error
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error
}

/**
 * Handle API errors dengan type safety
 */
export function handleApiError(error: unknown): AppError {
  if (isAppError(error)) {
    return error
  }

  if (isError(error)) {
    return new AppError('UNKNOWN_ERROR', error.message)
  }

  if (typeof error === 'string') {
    return new AppError('UNKNOWN_ERROR', error)
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return new AppError('UNKNOWN_ERROR', String(error.message))
  }

  return new AppError('UNKNOWN_ERROR', 'Terjadi kesalahan tidak diketahui')
}

/**
 * Safe error message retrieval
 */
export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message
  }

  if (isError(error)) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'Terjadi kesalahan tidak diketahui'
}

/**
 * Log error dengan context
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): void {
  const message = getErrorMessage(error)
  console.error(`[${context}]`, message, additionalInfo || '')
}
