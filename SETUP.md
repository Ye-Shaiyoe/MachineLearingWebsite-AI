# 🚀 Setup & Deployment Guide

## Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MySQL Server ([Download](https://dev.mysql.com/downloads/mysql/))
- OpenRouter API Key ([Get it here](https://openrouter.ai/))

### Step 1: Clone & Install
```bash
# Install dependencies
npm install
```

### Step 2: Setup Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your MySQL configuration:
# - DB_HOST: MySQL server host (default: localhost)
# - DB_PORT: MySQL port (default: 3306)
# - DB_USER: MySQL username (default: root)
# - DB_PASSWORD: Your MySQL password
# - DB_NAME: Database name (default: ai_roleplay)
# - JWT_SECRET: Change to a secure random string
# - OpenRouter API: Get from OpenRouter dashboard
```

### Step 3: Run Development
```bash
# Start both frontend (port 5173) and backend (port 5000)
npm run dev

# OR run separately in different terminals:
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

### Step 4: Access the App
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api/health

---

## Production Build

### Frontend Build
```bash
npm run build
```
This creates optimized files in `dist/` folder

### Backend Build
```bash
npm run build:backend
```

### Start Production Server
```bash
npm start
```

---

## MySQL Setup

### Local MySQL Installation
```bash
# Windows: Download from https://dev.mysql.com/downloads/mysql/
# macOS: brew install mysql
# Linux: sudo apt-get install mysql-server

# Start MySQL service
# Windows: MySQL runs as a service by default
# macOS: brew services start mysql
# Linux: sudo service mysql start

# Verify installation
mysql --version

# Connect to MySQL (default user is 'root')
mysql -u root -p

# Create database and user (if needed)
mysql> CREATE DATABASE ai_roleplay;
mysql> CREATE USER 'ai_user'@'localhost' IDENTIFIED BY 'secure_password';
mysql> GRANT ALL PRIVILEGES ON ai_roleplay.* TO 'ai_user'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

### Update .env File
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root              # or 'ai_user' if you created custom user
DB_PASSWORD=password      # your MySQL password
DB_NAME=ai_roleplay       # database name
```

### Cloud MySQL (Recommended for Production)
- **AWS RDS MySQL**: https://aws.amazon.com/rds/mysql/
- **Google Cloud SQL**: https://cloud.google.com/sql/docs/mysql
- **Azure Database for MySQL**: https://azure.microsoft.com/en-us/products/mysql/
- **DigitalOcean Managed Database**: https://www.digitalocean.com/products/managed-databases/
- **PlanetScale** (MySQL-compatible): https://planetscale.com/

---

## Getting OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up / Login
3. Go to API Keys section
4. Create new API key
5. Copy it to somewhere safe
6. In the app, paste it in the "OpenRouter API Key" field

---

## Troubleshooting

### ❌ "Cannot find module 'express'"
```bash
npm install
```

### ❌ "MySQL connection failed"
- Check if MySQL is running
- Verify database credentials in `.env` (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD)
- Ensure database `ai_roleplay` exists (Sequelize will create it if not)
- Test connection: `mysql -u root -p -h localhost`

### ❌ "CORS error"
- Make sure backend is running on port 5000
- Check `CLIENT_URL` in backend `.env`

### ❌ "API Key error from OpenRouter"
- Verify API key is correct
- Check if account has credits
- Ensure model name is valid

### ❌ "Port already in use"
```bash
# Change port in .env or vite.config.ts
# Frontend: vite.config.ts server.port
# Backend: .env PORT=3000
```

---

## Project Structure

```
ai-roleplay/
├── 📁 backend/          # Express server
│   ├── config/          # Database config
│   ├── middleware/      # Auth middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   └── server.ts        # Main server
│
├── 📁 src/              # React frontend
│   ├── api/             # API clients
│   ├── components/      # React components
│   ├── contexts/        # Context API
│   ├── styles/          # CSS files
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
│
├── 📄 index.html        # HTML template
├── 📄 package.json      # Dependencies
├── 📄 tsconfig.json     # TypeScript config
├── 📄 vite.config.ts    # Vite config
└── 📄 .env              # Environment vars
```

---

## Key Features

✅ **Authentication**
- Register with email/username/password
- Login with JWT tokens
- Secure password hashing

✅ **AI Chat Interface**
- Select different AI personalities
- Customize system prompts
- Real-time chat interface

✅ **Persona Management**
- Create custom AI personas
- Upload profile images
- Edit/delete personas

✅ **Settings**
- Choose AI model
- Adjust creativity (temperature)
- Manage OpenRouter API key

---

## Database Models

### User Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Or in TypeScript/Sequelize:
```typescript
{
  id: INTEGER (primary key, auto-increment),
  username: STRING (unique, required),
  email: STRING (unique, required),
  password: STRING (hashed, required),
  createdAt: DATE,
  updatedAt: DATE
}
```

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/auth/logout` | ✅ | Logout user |
| GET | `/api/health` | ❌ | Health check |

---

## Environment Variables Reference

```env
# Backend
PORT                 # Server port (default: 5000)
NODE_ENV            # development or production
JWT_SECRET          # JWT signing secret (CHANGE IN PRODUCTION)
CLIENT_URL          # Frontend URL (for CORS)

# MySQL Database
DB_HOST             # MySQL server host (default: localhost)
DB_PORT             # MySQL port (default: 3306)
DB_USER             # MySQL username (default: root)
DB_PASSWORD         # MySQL password
DB_NAME             # Database name (default: ai_roleplay)

# Frontend
VITE_API_URL        # Backend API base URL (http://localhost:5000/api)
```

---

## Security Checklist (Before Production)

- [ ] Change `JWT_SECRET` to strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only
- [ ] Setup MySQL with strong password auth
- [ ] Enable CORS only for your domain
- [ ] Setup rate limiting
- [ ] Monitor API usage
- [ ] Regular backups of MySQL database
- [ ] Use environment variables, never hardcode secrets

---

## Deployment Options

### Vercel (Frontend)
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy
4. Update `VITE_API_URL` to backend URL

### Render / Railway / Fly.io (Backend + MySQL)
1. Setup MySQL database (AWS RDS, PlanetScale, or provider's managed DB)
2. Add environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, etc.)
3. Deploy
4. Update `CLIENT_URL` to frontend URL

### Manual VPS Deployment
1. Install Node.js and MySQL on your server
2. Clone repository
3. Setup `.env` with production values
4. Run `npm install && npm run build:backend && npm run build`
5. Use PM2 to manage process: `pm2 start dist/backend/server.js`

### Docker
See docker-compose.yml (create if needed)

---

## Performance Tips

- Enable gzip compression
- Cache static assets
- Use CDN for images
- Optimize AI model choice (prefer mini/fast models)
- Implement message pagination

---

Need help? Check issues or create a discussion! 🎉
