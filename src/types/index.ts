/**
 * Central type definitions for the entire application
 */

// User and Auth types
export interface User {
  id: string
  username: string
  email: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  register: (username: string, email: string, password: string, passwordConfirm: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

// Persona and Chat types
export interface Persona {
  id: number
  name: string
  tag: string
  description: string
  systemPrompt: string
  profileImage: string | null
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  ts: number
  isError?: boolean
}

// Component Props types
export interface ChatAreaProps {
  activePersona: Persona
  messages: Message[]
  loading: boolean
  input: string
  setInput: (input: string) => void
  onSendMessage: () => void
  onClearChat: () => void
  model: string
}

export interface PersonaModalProps {
  persona: Persona | null
  onClose: () => void
  onSave: (persona: Persona) => void
}

export interface SidebarProps {
  apiKey: string
  setApiKey: (key: string) => void
  showKey: boolean
  setShowKey: (show: boolean) => void
  model: string
  setModel: (model: string) => void
  temp: number
  setTemp: (temp: number) => void
  personas: Persona[]
  activePersona: Persona
  switchPersona: (persona: Persona) => void
  deletePersona: (id: number) => void
  onAddPersona: (persona: Persona | null) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  user?: User | null
  onLogout?: () => void
}

export interface ToastProps {
  msg: string
  type: 'info' | 'success' | 'error' | 'warning'
  onClose: () => void
}

export interface LoginProps {
  onSwitchToRegister: () => void
}

export interface RegisterProps {
  onSwitchToLogin: () => void
}

// API response types
export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export interface OpenRouterError {
  error?: {
    message: string
  }
}

// Auth view types
export type AuthView = 'login' | 'register'

// Toast type
export type ToastType = 'info' | 'success' | 'error' | 'warning'

export interface ToastState {
  msg: string
  type: ToastType
}
