# AI Roleplay Chat

Modern React + Vite application untuk chat dengan AI character yang bisa dikustomisasi.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Server akan jalan di `http://localhost:5173`

### 3. Build untuk production
```bash
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
