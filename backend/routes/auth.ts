import { Router, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { createError } from '../middleware/errorHandler.js'
import { verifyToken, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, passwordConfirm } = req.body

    // Validation
    if (!username || !email || !password) {
      throw createError(400, 'All fields are required')
    }

    if (password !== passwordConfirm) {
      throw createError(400, 'Passwords do not match')
    }

    // Check if username or email already exists
    const existingUsername = await User.findOne({
      where: { username }
    })

    const existingEmail = await User.findOne({
      where: { email }
    })

    if (existingUsername || existingEmail) {
      throw createError(400, 'Username or email already exists')
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    })

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    })
  } catch (error) {
    next(error)
  }
})

// Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      throw createError(400, 'Email and password are required')
    }

    // Find user
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw createError(401, 'Invalid email or password')
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw createError(401, 'Invalid email or password')
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    })
  } catch (error) {
    next(error)
  }
})

// Get current user
router.get('/me', verifyToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email']
    })
    if (!user) {
      throw createError(404, 'User not found')
    }
    res.json({ success: true, user })
  } catch (error) {
    next(error)
  }
})

// Logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ success: true, message: 'Logged out successfully' })
})

export default router
