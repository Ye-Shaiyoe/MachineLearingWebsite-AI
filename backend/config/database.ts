import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'ai_roleplay',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

export async function connectDB() {
  try {
    await sequelize.authenticate()
    console.log('✓ Database connected')
    
    // Import models after sequelize is created to avoid circular imports
    await import('../models/User.js')
    
    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ alter: true })
    console.log('✓ Database models synced')
  } catch (error) {
    console.error('✗ Database connection failed:', error)
    process.exit(1)
  }
}

