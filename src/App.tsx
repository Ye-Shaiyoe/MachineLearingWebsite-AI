import { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { PersonaModal } from './components/PersonaModal'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { Toast } from './components/Toast'
import './index.css'

interface Persona {
  id: number
  name: string
  tag: string
  description: string
  systemPrompt: string
  profileImage: string | null
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  ts: number
  isError?: boolean
}

type AuthView = 'login' | 'register'

const DEFAULT_PERSONAS: Persona[] = [
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

export default function App() {
  const { isAuthenticated, loading: authLoading, user, logout } = useAuth()
  const [authView, setAuthView] = useState<AuthView>('login')

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('or_apikey') || '')
  const [showKey, setShowKey] = useState(false)
  const [model, setModel] = useState('x-ai/grok-3-mini')
  const [personas, setPersonas] = useState<Persona[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('personas')) || DEFAULT_PERSONAS
    } catch {
      return DEFAULT_PERSONAS
    }
  })
  const [activePersona, setActivePersona] = useState<Persona>(personas[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [temp, setTemp] = useState(0.8)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('or_apikey', apiKey)
  }, [apiKey])

  useEffect(() => {
    localStorage.setItem('personas', JSON.stringify(personas))
  }, [personas])

  const showToast = (msg: string, type: string = 'info') => {
    setToast({ msg, type })
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    if (!apiKey.trim()) {
      showToast('Masukkan OpenRouter API Key dulu!', 'error')
      return
    }

    const userMsg: Message = { role: 'user', content: input.trim(), ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Roleplay'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: activePersona.systemPrompt },
            ...history
          ],
          temperature: temp,
          max_tokens: 800
        })
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || '...'
      setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: Date.now() }])
    } catch (e) {
      const error = e as Error
      showToast('Error: ' + error.message, 'error')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠ Gagal mendapatkan respons: ${error.message}`,
        ts: Date.now(),
        isError: true
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    showToast('Percakapan dihapus', 'success')
  }

  const savePersona = (p: Persona) => {
    if (editingPersona) {
      setPersonas(prev => prev.map(x => x.id === p.id ? p : x))
      if (activePersona.id === p.id) setActivePersona(p)
      showToast('Persona diperbarui!', 'success')
    } else {
      setPersonas(prev => [...prev, p])
      showToast('Persona baru ditambahkan!', 'success')
    }
    setShowModal(false)
    setEditingPersona(null)
  }

  const deletePersona = (id: number) => {
    if (personas.length <= 1) {
      showToast('Minimal satu persona harus ada', 'error')
      return
    }
    const newList = personas.filter(p => p.id !== id)
    setPersonas(newList)
    if (activePersona.id === id) {
      setActivePersona(newList[0])
      setMessages([])
    }
    showToast('Persona dihapus', 'info')
  }

  const switchPersona = (p: Persona) => {
    setActivePersona(p)
    setMessages([])
    showToast(`Berganti ke ${p.name}`, 'success')
  }

  const handleAddPersona = (p: Persona) => {
    setEditingPersona(p)
    setShowModal(true)
  }

  const handleLogout = async () => {
    await logout()
  }

  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%)'
      }}>
        <div style={{ fontSize: 24, color: 'var(--text2)' }}>Memuat...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthView('login')} />
    )
  }

  return (
    <>
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 39, background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        apiKey={apiKey}
        setApiKey={setApiKey}
        showKey={showKey}
        setShowKey={setShowKey}
        model={model}
        setModel={setModel}
        temp={temp}
        setTemp={setTemp}
        personas={personas}
        activePersona={activePersona}
        switchPersona={switchPersona}
        deletePersona={deletePersona}
        onAddPersona={handleAddPersona}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />

      <ChatArea
        activePersona={activePersona}
        messages={messages}
        loading={loading}
        input={input}
        setInput={setInput}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
        model={model}
      />

      {showModal && (
        <PersonaModal
          persona={editingPersona}
          onClose={() => {
            setShowModal(false)
            setEditingPersona(null)
          }}
          onSave={savePersona}
        />
      )}

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
