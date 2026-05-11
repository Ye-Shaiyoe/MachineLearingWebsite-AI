import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createError } from './errorHandler.js'

export interface AuthRequest extends Request {
  userId?: string
}

export function verifyToken(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      throw createError(401, 'No token provided')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    req.userId = decoded.id
    next()
  } catch (error) {
    next(createError(401, 'Invalid or expired token'))
  }
}
