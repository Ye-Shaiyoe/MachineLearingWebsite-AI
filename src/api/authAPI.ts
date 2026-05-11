import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

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

export const authAPI = {
  register: async (username: string, email: string, password: string, passwordConfirm: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      username,
      email,
      password,
      passwordConfirm
    })
    return data
  },

  login: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    return data
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout')
    return data
  },

  getCurrentUser: async () => {
    const { data } = await api.get<{ success: boolean; user: User }>('/auth/me')
    return data.user
  }
}

export default api
