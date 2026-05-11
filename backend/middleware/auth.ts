import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createError } from './errorHandler.js'

export interface AuthRequest extends Request {
  userId?: string
}

export function verifyToken(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    
    console.log('Token verification attempt:')
    console.log('  Cookie token:', req.cookies.token ? 'exists' : 'none')
    console.log('  Auth header:', req.headers.authorization ? 'exists' : 'none')
    console.log('  Token to verify:', token ? `${token.substring(0, 20)}...` : 'none')
    
    if (!token) {
      throw createError(401, 'No token provided')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    console.log('  ✓ Token verified, userId:', decoded.id)
    req.userId = decoded.id
    next()
  } catch (error) {
    console.log('  ✗ Token verification failed:', (error as Error).message)
    next(createError(401, 'Invalid or expired token'))
  }
}
