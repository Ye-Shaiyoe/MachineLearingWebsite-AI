import { useState } from 'react'

const MODELS = [
  { value: 'x-ai/grok-4.1-fast', label: 'Grok-4.1 Fast' },
  { value: 'x-ai/grok-3', label: 'Grok-3' },
  { value: 'x-ai/grok-3-mini', label: 'Grok-3 Mini' },
  { value: 'x-ai/grok-2-1212', label: 'Grok-2' },
  { value: 'x-ai/grok-beta', label: 'Grok Beta' },
]

export function Sidebar({
  apiKey,
  setApiKey,
  showKey,
  setShowKey,
  model,
  setModel,
  temp,
  setTemp,
  personas,
  activePersona,
  switchPersona,
  deletePersona,
  onAddPersona,
  sidebarOpen,
  setSidebarOpen
}) {
  const apiOk = apiKey.length > 10

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          Roleplay AI
          <span>Powered by OpenRouter · Grok</span>
        </div>
      </div>

      {/* API KEY */}
      <div className="sidebar-section">
        <div className="section-label">OpenRouter API Key</div>
        <div className="api-input-wrap">
          <input
            className="api-input"
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-or-..."
          />
          <button className="eye-btn" onClick={() => setShowKey(v => !v)}>
            {showKey ? '🙈' : '👁'}
          </button>
        </div>
        <div className="api-status">
          <span className={`dot ${apiOk ? 'ok' : 'no'}`} />
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>
            {apiOk ? 'Key tersimpan' : 'Belum ada key'}
          </span>
        </div>
      </div>

      {/* MODEL */}
      <div className="sidebar-section">
        <div className="section-label">Model</div>
        <select className="model-select" value={model} onChange={e => setModel(e.target.value)}>
          {MODELS.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <div style={{ marginTop: 14 }}>
          <div className="section-label">Kreativitas (Temperature)</div>
          <div className="slider-wrap">
            <input
              type="range" min="0" max="1" step="0.1"
              value={temp} onChange={e => setTemp(parseFloat(e.target.value))}
            />
            <span className="slider-val">{temp.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* PERSONAS */}
      <div style={{ padding: '12px 20px 8px', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label">Pilih Persona</div>
      </div>
      <div className="personality-scroll">
        {personas.map(p => (
          <div
            key={p.id}
            className={`persona-card ${activePersona.id === p.id ? 'active' : ''}`}
            onClick={() => {
              switchPersona(p)
              setSidebarOpen(false)
            }}
          >
            {p.profileImage && <img src={p.profileImage} alt={p.name} className="persona-image-thumb" />}
            <div className="persona-card-content">
              <button
                className="persona-delete"
                onClick={e => { e.stopPropagation(); deletePersona(p.id) }}
                title="Hapus persona"
              >✕</button>
              <div className="persona-name">{p.name}</div>
              <div className="persona-desc">{p.description}</div>
              {p.tag && <span className="persona-badge">{p.tag}</span>}
              {activePersona.id === p.id && (
                <button
                  style={{ display: 'block', background: 'none', border: 'none', color: 'var(--accent2)', fontSize: 11, cursor: 'pointer', marginTop: 6, padding: 0, fontFamily: 'DM Sans, sans-serif' }}
                  onClick={e => { e.stopPropagation(); onAddPersona(p) }}
                >
                  ✏ Edit persona ini
                </button>
              )}
            </div>
          </div>
        ))}
        <button className="add-persona-btn" onClick={() => onAddPersona(null)}>
          + Buat Persona Baru
        </button>
      </div>
    </div>
  )
}
