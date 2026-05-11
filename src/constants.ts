/**
 * Application constants and configuration
 */

import type { Persona } from './index'

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Model Configuration
export const MODELS = [
  { value: 'x-ai/grok-4.1-fast', label: 'Grok-4.1 Fast' },
  { value: 'x-ai/grok-3', label: 'Grok-3' },
  { value: 'x-ai/grok-3-mini', label: 'Grok-3 Mini' },
  { value: 'x-ai/grok-2-1212', label: 'Grok-2' },
  { value: 'x-ai/grok-beta', label: 'Grok Beta' },
] as const

export const DEFAULT_MODEL = 'x-ai/grok-3-mini'

// Temperature settings
export const DEFAULT_TEMPERATURE = 0.8
export const MIN_TEMPERATURE = 0
export const MAX_TEMPERATURE = 1
export const TEMPERATURE_STEP = 0.1

// Chat Configuration
export const MAX_TOKENS = 800
export const MESSAGES_TIMEOUT = 2800 // milliseconds

// Local Storage Keys
export const STORAGE_KEYS = {
  API_KEY: 'or_apikey',
  PERSONAS: 'personas',
  AUTH_TOKEN: 'token',
  THEME: 'theme'
} as const

// Default Personas
export const DEFAULT_PERSONAS: Persona[] = [
  {
    id: 1,
    name: 'Arya',
    tag: 'Sahabat Akrab',
    description: 'Teman ngobrol yang asik, santai, dan suka bercanda. Pakai bahasa gaul sehari-hari.',
    systemPrompt: 'Kamu adalah Arya, sahabat dekat user yang asik dan santai. Kamu suka bercanda, pakai bahasa gaul, dan selalu supportif. Sering pakai kata \'wkwk\', \'bro\', \'gils\', dsb. Hindari jadi terlalu formal.',
    profileImage: null
  },
  {
    id: 2,
    name: 'Professor Elara',
    tag: 'Mentor Bijak',
    description: 'Akademisi berpengalaman yang elegan, penuh pengetahuan, dan suka filosofi mendalam.',
    systemPrompt: 'Kamu adalah Professor Elara, seorang akademisi berpengalaman yang elegan dan berwibawa. Kamu berbicara dengan terstruktur, kaya akan analogi dan referensi intelektual. Kamu menghargai pertanyaan mendalam dan selalu memberikan perspektif yang luas.',
    profileImage: null
  },
  {
    id: 3,
    name: 'Kai',
    tag: 'Rival Serius',
    description: 'Rival yang selalu menantang dan kompetitif, tapi sebenarnya peduli.',
    systemPrompt: 'Kamu adalah Kai, rival user yang kompetitif dan sedikit sombong, tapi sebenarnya peduli. Kamu sering menantang pendapat user, suka debat, tapi selalu fair. Kamu mengakui keunggulan orang lain walau dengan enggan.',
    profileImage: null
  }
]

// Error Messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Masukkan OpenRouter API Key dulu!',
  API_KEY_INVALID: 'API Key tidak valid',
  FETCH_ERROR: 'Gagal mendapatkan respons',
  NETWORK_ERROR: 'Error jaringan',
  PERSONA_REQUIRED: 'Minimal satu persona harus ada',
  INVALID_CREDENTIALS: 'Email atau password salah'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  PERSONA_ADDED: 'Persona baru ditambahkan!',
  PERSONA_UPDATED: 'Persona diperbarui!',
  PERSONA_DELETED: 'Persona dihapus',
  CHAT_CLEARED: 'Percakapan dihapus',
  LOGGED_OUT: 'Berhasil logout'
} as const
