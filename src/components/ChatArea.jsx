import { useRef, useEffect } from 'react'

const MODELS = [
  { value: 'x-ai/grok-4.1-fast', label: 'Grok-4.1 Fast' },
  { value: 'x-ai/grok-3', label: 'Grok-3' },
  { value: 'x-ai/grok-3-mini', label: 'Grok-3 Mini' },
  { value: 'x-ai/grok-2-1212', label: 'Grok-2' },
  { value: 'x-ai/grok-beta', label: 'Grok Beta' },
]

export function ChatArea({
  activePersona,
  messages,
  loading,
  input,
  setInput,
  onSendMessage,
  onClearChat,
  model
}) {
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  const initials = name => name.slice(0, 2).toUpperCase()

  return (
    <div className="main">
      <div className="chat-header">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {activePersona.profileImage && (
            <img
              src={activePersona.profileImage}
              alt={activePersona.name}
              style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border2)' }}
            />
          )}
          <div>
            <div className="chat-title">{activePersona.name}</div>
            <div className="chat-subtitle">{activePersona.tag || 'AI Character'} · {MODELS.find(m => m.value === model)?.label}</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn danger" onClick={onClearChat}>🗑 Hapus Chat</button>
        </div>
      </div>

      <div className="messages-area">
        {messages.length === 0 && !loading ? (
          <div className="empty-state">
            <div className="empty-icon">✦</div>
            <div className="empty-title">Mulai percakapan dengan {activePersona.name}</div>
            <div className="empty-sub">{activePersona.description}</div>
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.role === 'user' ? 'user' : 'ai'}`}>
                <div className={`avatar ${m.role === 'user' ? 'user-av' : 'ai-av'}`}>
                  {m.role === 'assistant' && activePersona.profileImage ? (
                    <img src={activePersona.profileImage} alt={activePersona.name} />
                  ) : (
                    m.role === 'user' ? 'U' : initials(activePersona.name)
                  )}
                </div>
                <div>
                  <div className="bubble" style={m.isError ? { color: 'var(--danger)' } : {}}>
                    {m.content}
                  </div>
                  <div className="bubble-meta">
                    {m.role === 'assistant' ? activePersona.name : 'Kamu'} ·{' '}
                    {new Date(m.ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message ai">
                <div className="avatar ai-av">
                  {activePersona.profileImage ? (
                    <img src={activePersona.profileImage} alt={activePersona.name} />
                  ) : (
                    initials(activePersona.name)
                  )}
                </div>
                <div className="bubble">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <textarea
          ref={textareaRef}
          className="msg-textarea"
          value={input}
          onChange={e => {
            setInput(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
          }}
          onKeyDown={handleKey}
          placeholder={`Kirim pesan ke ${activePersona.name}... (Enter untuk kirim)`}
          rows={1}
        />
        <button className="send-btn" onClick={onSendMessage} disabled={loading || !input.trim()}>
          ➤
        </button>
      </div>
    </div>
  )
}
