import { useState } from 'react'

export function PersonaModal({ onSave, onClose, editing }) {
  const [name, setName] = useState(editing?.name || '')
  const [tag, setTag] = useState(editing?.tag || '')
  const [desc, setDesc] = useState(editing?.description || '')
  const [prompt, setPrompt] = useState(editing?.systemPrompt || '')
  const [profileImage, setProfileImage] = useState(editing?.profileImage || null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        setProfileImage(evt.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
  }

  const save = () => {
    if (!name.trim() || !prompt.trim()) return
    onSave({ id: editing?.id || Date.now(), name, tag, description: desc, systemPrompt: prompt, profileImage })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{editing ? 'Edit Persona' : 'Buat Persona Baru'}</div>
        <div className="field">
          <label>Nama Karakter</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Luna, Sensei, etc." />
        </div>
        <div className="field">
          <label>Tag / Label</label>
          <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Contoh: Sahabat, Mentor, dll." />
        </div>
        <div className="field">
          <label>Deskripsi Singkat</label>
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Gambaran singkat tentang karakter ini..." />
        </div>
        <div className="field">
          <label>Foto Profile Karakter</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%' }} />
            </div>
            {profileImage && (
              <button
                type="button"
                onClick={removeImage}
                style={{
                  background: 'var(--danger)',
                  border: 'none',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: "'DM Sans', sans-serif",
                  flexShrink: 0
                }}
              >
                Hapus
              </button>
            )}
          </div>
          {profileImage && (
            <div style={{ marginTop: '10px' }}>
              <img src={profileImage} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
            </div>
          )}
        </div>
        <div className="field">
          <label>System Prompt (Kepribadian)</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Instruksi kepribadian untuk AI. Contoh: Kamu adalah Luna, seorang detektif misterius yang berbicara dengan singkat dan selalu curiga..."
            rows={5}
          />
        </div>
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Batal</button>
          <button className="btn-primary" onClick={save} disabled={!name.trim() || !prompt.trim()}>
            {editing ? 'Simpan' : 'Tambah Persona'}
          </button>
        </div>
      </div>
    </div>
  )
}
