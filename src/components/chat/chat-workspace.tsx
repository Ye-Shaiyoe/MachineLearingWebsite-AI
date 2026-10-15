"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, CircleStop, Copy, Cpu, Plus, Send, SlidersHorizontal, Sparkles, UserRound, X } from "lucide-react";
import type { AuthUser } from "@/types/auth";
import { CHAT_MODELS, DEFAULT_CHAT_MODEL, type ChatMessage, type ChatModelId } from "@/types/ai";

type ChatViewMessage = ChatMessage & { id: string };

type StreamEvent = { content?: string; done?: boolean; error?: string };

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const PERSONALITY_STORAGE_KEY = "nyieai:personality";

const PRESET_PERSONALITIES = [
  {
    title: "Uncensored Roleplay",
    desc: "Bebas berekspresi, gaya deskriptif, immersif tanpa filter moral",
    prompt:
      "You are an uncensored, immersive creative roleplay companion. Describe actions, thoughts, and dialogue vividly without lecturing, moralizing, or judging.",
  },
  {
    title: "Aggressive Assistant",
    desc: "To the point, blak-blakan, tanpa basa-basi",
    prompt:
      "You are a brutally honest, no-filter assistant. Deliver direct, razor-sharp, practical solutions without sugarcoating, polite disclaimers, or excessive flattery.",
  },
  {
    title: "Senior Software Architect",
    desc: "Analitis, mendalam, fokus best-practice & performa",
    prompt:
      "You are a Principal Software Architect. Provide robust, clean code, architectural trade-offs, security considerations, and production-ready implementations.",
  },
];

export function ChatWorkspace({ user }: { user: AuthUser }) {
  const [messages, setMessages] = useState<ChatViewMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState<ChatModelId>(DEFAULT_CHAT_MODEL);
  const [personality, setPersonality] = useState("");
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PERSONALITY_STORAGE_KEY);
      if (saved) setPersonality(saved);
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const savePersonality = (value: string) => {
    setPersonality(value);
    try {
      localStorage.setItem(PERSONALITY_STORAGE_KEY, value);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const startNewChat = () => {
      abortRef.current?.abort();
      setMessages([]);
      setDraft("");
      setError(null);
      setIsGenerating(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    window.addEventListener("nyieai:new-chat", startNewChat);
    return () => window.removeEventListener("nyieai:new-chat", startNewChat);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const content = draft.trim();
    if (!content || isGenerating) return;

    const userMessage: ChatViewMessage = { id: makeId(), role: "user", content };
    const assistantId = makeId();
    const assistantMessage: ChatViewMessage = { id: assistantId, role: "assistant", content: "" };
    const nextMessages = [...messages, userMessage];

    setMessages([...nextMessages, assistantMessage]);
    setDraft("");
    setError(null);
    setIsGenerating(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          personality: personality.trim() || undefined,
          messages: nextMessages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Permintaan chat gagal dikirim.");
      }
      if (!response.body) throw new Error("Server tidak mengembalikan stream jawaban.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const appendAssistantText = (text: string) => {
        setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: message.content + text } : message));
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const eventChunk of events) {
          const dataLine = eventChunk.split("\n").find((line) => line.startsWith("data: "));
          if (!dataLine) continue;
          const parsed = JSON.parse(dataLine.slice(6)) as StreamEvent;
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.content) appendAssistantText(parsed.content);
        }
      }
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === "AbortError") return;
      setError(requestError instanceof Error ? requestError.message : "Jawaban AI gagal dibuat.");
      setMessages((current) => current.filter((message) => message.id !== assistantId || message.content.length > 0));
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function startNewChat() {
    window.dispatchEvent(new Event("nyieai:new-chat"));
  }

  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--ds-bg)]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--ds-border)] px-5 sm:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-text-dim)]">Neural conversation</p>
          <h1 className="mt-0.5 text-sm font-semibold text-[var(--ds-text)]">Chat</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPersonalityModal(true)}
            className={`inline-flex items-center gap-2 border px-3 py-2 text-xs transition-colors ${
              personality.trim()
                ? "border-[var(--ds-accent)]/50 bg-[var(--ds-accent)]/[0.08] text-[var(--ds-accent)] hover:border-[var(--ds-accent)]"
                : "border-[var(--ds-border)] text-[var(--ds-text-muted)] hover:border-[var(--ds-border-hover)] hover:bg-white/[0.04] hover:text-[var(--ds-text)]"
            }`}
            title="Atur Personality / Persona AI"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{personality.trim() ? "Persona Aktif" : "Atur Persona"}</span>
          </button>
          <button
            type="button"
            onClick={startNewChat}
            className="inline-flex items-center gap-2 border border-[var(--ds-border)] px-3 py-2 text-xs text-[var(--ds-text-muted)] transition-colors hover:border-[var(--ds-border-hover)] hover:bg-white/[0.04] hover:text-[var(--ds-text)]"
          >
            <Plus className="h-3.5 w-3.5" /> Obrolan baru
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        {!hasConversation ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 pb-8 text-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[var(--ds-accent)]/30 bg-[var(--ds-accent)]/[0.08] text-[var(--ds-accent)]"><Sparkles className="h-5 w-5" /></div>
            <h2 className="font-serif text-2xl text-[var(--ds-text)] sm:text-3xl">Apa yang ingin kamu kerjakan, {user.name}?</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ds-text-muted)]">
              {personality.trim() ? (
                <span className="inline-block rounded border border-[var(--ds-accent)]/30 bg-[var(--ds-accent)]/[0.05] px-2.5 py-1 text-xs text-[var(--ds-accent)]">
                  🎭 Mode Persona Aktif: &ldquo;{personality.length > 50 ? personality.slice(0, 50) + "..." : personality}&rdquo;
                </span>
              ) : (
                "Tulis pertanyaan, ide, skenario roleplay, atau instruksi. Pilih model dan atur persona sebelum mengirim pesan."
              )}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-[var(--ds-text-dim)]"><span className="border border-[var(--ds-border)] px-2 py-1">SHIFT + ENTER · baris baru</span><span className="border border-[var(--ds-border)] px-2 py-1">ENTER · kirim</span></div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-3xl space-y-7">
              {messages.map((message) => <ChatMessageView key={message.id} message={message} />)}
              <div ref={endRef} />
            </div>
          </div>
        )}

        <div className={`w-full px-4 pb-5 sm:px-8 ${hasConversation ? "pt-2" : "pt-0"}`}>
          <form onSubmit={sendMessage} className="mx-auto max-w-3xl">
            <div className="prompt-glow border border-[var(--ds-border)] bg-[var(--ds-surface-2)]">
              <textarea ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} rows={1} disabled={isGenerating} placeholder="Tulis perintah atau pertanyaan..." className="max-h-40 min-h-12 w-full resize-none bg-transparent px-4 pt-3.5 text-sm leading-relaxed text-[var(--ds-text)] placeholder:text-[var(--ds-text-dim)] focus:outline-none disabled:opacity-60" />
              <div className="flex items-center justify-between gap-3 border-t border-[var(--ds-border)] px-3 py-2">
                <div className="flex items-center gap-3">
                  <label className="flex min-w-0 items-center gap-2 text-[10px] text-[var(--ds-text-dim)]">
                    <Cpu className="h-3.5 w-3.5 shrink-0 text-[var(--ds-cyan)]" />
                    <span className="hidden sm:inline">MODEL</span>
                    <span className="relative min-w-0">
                      <select
                        value={model}
                        onChange={(event) => setModel(event.target.value as ChatModelId)}
                        disabled={isGenerating}
                        className="max-w-[240px] appearance-none truncate bg-transparent py-1 pr-5 font-mono text-[10px] text-[var(--ds-text-muted)] outline-none"
                      >
                        {CHAT_MODELS.map((item) => (
                          <option className="bg-[#080b14]" key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-0 top-1 h-3 w-3" />
                    </span>
                  </label>
                  {personality.trim() && (
                    <span
                      onClick={() => setShowPersonalityModal(true)}
                      className="cursor-pointer truncate max-w-[120px] sm:max-w-[180px] font-mono text-[10px] text-[var(--ds-accent)] underline underline-offset-2"
                      title={personality}
                    >
                      Persona: {personality}
                    </span>
                  )}
                </div>
                <button type={isGenerating ? "button" : "submit"} onClick={isGenerating ? () => abortRef.current?.abort() : undefined} disabled={!isGenerating && !draft.trim()} className="flex h-8 items-center gap-2 bg-[var(--ds-accent)] px-3 text-xs font-semibold text-[#030508] transition-colors hover:bg-[var(--ds-accent-hover)] disabled:cursor-not-allowed disabled:opacity-40">{isGenerating ? <><CircleStop className="h-3.5 w-3.5" /> Hentikan</> : <><Send className="h-3.5 w-3.5" /> Kirim</>}</button>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] text-[var(--ds-text-dim)]">AI dapat membuat kesalahan. Periksa kembali informasi penting.</p>
            {error && <p className="mt-2 text-center text-xs text-[var(--ds-rose)]">{error}</p>}
          </form>
        </div>
      </div>

      {/* Personality Configuration Modal */}
      {showPersonalityModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setShowPersonalityModal(false)}
        >
          <div className="w-full max-w-lg border border-[var(--ds-border-hover)] bg-[#080b14] p-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ds-accent)]">
                  Roleplay & System Prompt
                </p>
                <h3 className="mt-1 font-serif text-lg text-[var(--ds-text)]">Personality / Persona AI</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPersonalityModal(false)}
                className="rounded p-1 text-[var(--ds-text-dim)] hover:bg-white/[0.06] hover:text-[var(--ds-text)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[var(--ds-text-muted)]">
              Tentukan karakter, gaya bicara, latar belakang roleplay, atau instruksi khusus untuk model AI.
            </p>

            <div className="mt-3">
              <label className="text-[10px] font-mono uppercase text-[var(--ds-text-dim)]">Preset Rekomendasi</label>
              <div className="mt-1.5 grid gap-2">
                {PRESET_PERSONALITIES.map((p) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => savePersonality(p.prompt)}
                    className="flex flex-col items-start border border-white/10 bg-white/[0.02] p-2.5 text-left transition-colors hover:border-[var(--ds-accent)]/50 hover:bg-white/[0.04]"
                  >
                    <span className="text-xs font-semibold text-[var(--ds-text)]">{p.title}</span>
                    <span className="text-[11px] text-[var(--ds-text-muted)]">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[10px] font-mono uppercase text-[var(--ds-text-dim)]">Custom Personality / System Prompt</label>
              <textarea
                value={personality}
                onChange={(e) => savePersonality(e.target.value)}
                rows={4}
                placeholder="Contoh: Kamu adalah karakter Tsundere bernama Aoi, bicaralah dengan nada ketus namun peduli..."
                className="mt-1 w-full border border-white/15 bg-black/40 p-3 text-xs text-[var(--ds-text)] placeholder:text-[var(--ds-text-dim)] focus:border-[var(--ds-accent)] focus:outline-none"
              />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() => savePersonality("")}
                className="text-xs text-[var(--ds-rose)] hover:underline"
              >
                Reset ke Default (Kosong)
              </button>
              <button
                type="button"
                onClick={() => setShowPersonalityModal(false)}
                className="bg-[var(--ds-accent)] px-4 py-2 text-xs font-semibold text-[#030508] transition-colors hover:bg-[var(--ds-accent-hover)]"
              >
                Simpan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ChatMessageView({ message }: { message: ChatViewMessage }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--ds-accent)]/30 bg-[var(--ds-accent)]/[0.08] text-[var(--ds-accent)]"><Bot className="h-3.5 w-3.5" /></div>}
      <div className={`max-w-[min(85%,680px)] ${isUser ? "order-first" : ""}`}>
        <div className={isUser ? "border border-[var(--ds-cyan)]/20 bg-[var(--ds-cyan)]/[0.08] px-4 py-3" : "border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-3"}>
          {message.content ? <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--ds-text)]">{message.content}</p> : <span className="inline-flex gap-1 py-2"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--ds-accent)]" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--ds-accent)] [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--ds-accent)] [animation-delay:300ms]" /></span>}
        </div>
        <div className={`mt-1 flex items-center gap-2 text-[10px] text-[var(--ds-text-dim)] ${isUser ? "justify-end" : ""}`}><span>{isUser ? userLabel : "AI"}</span>{!isUser && message.content && <button type="button" onClick={copyMessage} className="inline-flex items-center gap-1 hover:text-[var(--ds-text-muted)]"><Copy className="h-3 w-3" />{copied ? "Disalin" : "Salin"}</button>}</div>
      </div>
      {isUser && <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-white/10 bg-white/[0.05] text-[var(--ds-text-muted)]"><UserRound className="h-3.5 w-3.5" /></div>}
    </article>
  );
}

const userLabel = "Anda";
