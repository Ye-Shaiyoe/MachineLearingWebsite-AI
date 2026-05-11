# AI Roleplay Chat with Auth

Modern React + TypeScript + Vite application untuk chat dengan AI character yang bisa dikustomisasi, dilengkapi dengan sistem autentikasi lengkap.

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Axios

**Backend:**
- Express.js
- MySQL with Sequelize ORM
- JWT Authentication
- bcrypt untuk password hashing

## Setup

### Prerequisites
- Node.js v18+
- MySQL (lokal atau cloud service seperti AWS RDS, PlanetScale)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env` di root folder:
```env
# Backend
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-change-in-production
CLIENT_URL=http://localhost:5173

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=ai_roleplay

# Frontend API
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

**Option A: Run both frontend dan backend sekaligus (recommended)**
```bash
npm run dev
```

**Option B: Run terpisah**

Terminal 1 - Frontend:
```bash
npm run dev:frontend
```

Terminal 2 - Backend:
```bash
npm run dev:backend
```

Frontend akan jalan di `http://localhost:5173`
Backend akan jalan di `http://localhost:5000`

### 4. Build untuk Production
```bash
npm run build
npm run build:backend
```

### 5. Start Production
```bash
npm start
```

## Features

✨ **Authentication**
- Register & Login system
- JWT-based sessions
- Secure password hashing dengan bcrypt
- Persistent login state

✨ **AI Chat**
- Customize AI personality/personas
- Chat dengan multiple AI characters
- Gunakan OpenRouter API untuk LLM calls
- Adjustable temperature untuk creativity level

✨ **Personas Management**
- Create custom personas
- Edit existing personas
- Upload profile images
- Delete personas

## Struktur Project

```
├── backend/
│   ├── config/
│   │   └── database.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   └── User.ts
│   ├── routes/
│   │   └── auth.ts
│   └── server.ts
│
├── src/
│   ├── api/
│   │   └── authAPI.ts
│   ├── components/
│   │   ├── ChatArea.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PersonaModal.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Toast.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── styles/
│   │   └── auth.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user

## Penggunaan

1. **Register/Login**: Buat akun atau login untuk mulai
2. **Setup API Key**: Masukkan OpenRouter API key Anda
3. **Choose Model**: Pilih AI model yang ingin digunakan
4. **Select Persona**: Pilih atau buat AI personality yang unik
5. **Chat**: Mulai ngobrol dengan AI!

## Important Notes

⚠️ **Sebelum Deploy ke Production:**
- Change `JWT_SECRET` ke value yang lebih aman
- Set `NODE_ENV=production`
- Gunakan HTTPS
- Update `CLIENT_URL` ke production URL
- Setup proper MySQL (gunakan AWS RDS, PlanetScale, atau server dedicated)
- Setup environment variables dengan proper

## License

MIT
npm run build
```

Output ada di folder `dist/`

## Features

✅ Multiple AI personas dengan customizable personality  
✅ Upload foto profile untuk setiap karakter  
✅ Real-time chat dengan OpenRouter API  
✅ Adjustable temperature/creativity  
✅ Local storage untuk API key dan personas  
✅ Dark theme UI  
✅ Responsive design (mobile friendly)

## Project Structure

```
src/
├── App.jsx              # Main app component
├── main.jsx             # Entry point
├── index.css            # Styles
└── components/
    ├── Sidebar.jsx      # Settings & personas panel
    ├── ChatArea.jsx     # Chat messages & input
    ├── PersonaModal.jsx # Create/edit personas
    └── Toast.jsx        # Notifications
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **OpenRouter API** - AI models (Grok)
- **Babel** - JSX transpilation

## API Key

Kamu perlu OpenRouter API key untuk pakai app ini. Dapet di: https://openrouter.ai/keys

Paste key di field "OpenRouter API Key" di sidebar sebelum mulai chat.

## Models Available

- Grok-4.1 Fast
- Grok-3
- Grok-3 Mini
- Grok-2
- Grok Beta

Pilih model favorite di dropdown di sidebar.

## Tips

- Grok-3 Mini = fast & cheap tapi accuracy sedang
- Grok-4.1 Fast = balance terbaik
- Grok-3 = lebih akurat tapi sedikit lambat
- Temperature 0.3 = consistent responses
- Temperature 0.8 = creative responses
- Temperature 1.0 = very random

Enjoy! 🎭
