import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
}

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'

  console.error(`[${statusCode}] ${message}`)

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err })
  })
}

export function createError(statusCode: number, message: string): AppError {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  return error
}
