console.log('Starting backend server...')

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

console.log('Loading environment...')
dotenv.config()
console.log('Environment loaded')

import { connectDB } from './config/database.js'
console.log('Database module imported')

import authRoutes from './routes/auth.js'
console.log('Auth routes imported')

import { errorHandler } from './middleware/errorHandler.js'
console.log('Error handler imported')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' })
})

// Error handling middleware
app.use(errorHandler)

// Connect to database and start server
async function startServer() {
  try {
    console.log('Starting server...')
    console.log('DB Config:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    })
    
    await connectDB()
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`)
      console.log(`✓ Client should connect to http://localhost:5173`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    console.error('Full error:', JSON.stringify(error, null, 2))
    process.exit(1)
  }
}

startServer().catch((error) => {
  console.error('Uncaught error in startServer:', error)
  if (error instanceof Error) {
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
  }
  console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)))
  process.exit(1)
})
