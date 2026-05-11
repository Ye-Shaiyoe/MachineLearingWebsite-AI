import axios, { AxiosInstance } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

// Add token to requests - BEFORE any requests are made
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    console.log('Adding token to request:', config.url)
    config.headers.Authorization = `Bearer ${token}`
  } else {
    console.log('No token found in localStorage for:', config.url)
  }
  return config
}, (error) => {
  console.error('Request interceptor error:', error)
  return Promise.reject(error)
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - clearing token')
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

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
