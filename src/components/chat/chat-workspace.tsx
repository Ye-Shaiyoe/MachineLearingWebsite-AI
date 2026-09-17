"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, CircleStop, Copy, Cpu, Plus, Send, Sparkles, UserRound } from "lucide-react";
import type { AuthUser } from "@/types/auth";
import { CHAT_MODELS, DEFAULT_CHAT_MODEL, type ChatMessage, type ChatModelId } from "@/types/ai";

type ChatViewMessage = ChatMessage & { id: string };

type StreamEvent = { content?: string; done?: boolean; error?: string };

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ChatWorkspace({ user }: { user: AuthUser }) {
  const [messages, setMessages] = useState<ChatViewMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState<ChatModelId>(DEFAULT_CHAT_MODEL);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasConversation = messages.length > 0;

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
        <button type="button" onClick={startNewChat} className="inline-flex items-center gap-2 border border-[var(--ds-border)] px-3 py-2 text-xs text-[var(--ds-text-muted)] transition-colors hover:border-[var(--ds-border-hover)] hover:bg-white/[0.04] hover:text-[var(--ds-text)]"><Plus className="h-3.5 w-3.5" /> Obrolan baru</button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        {!hasConversation ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 pb-8 text-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[var(--ds-accent)]/30 bg-[var(--ds-accent)]/[0.08] text-[var(--ds-accent)]"><Sparkles className="h-5 w-5" /></div>
            <h2 className="font-serif text-2xl text-[var(--ds-text)] sm:text-3xl">Apa yang ingin kamu kerjakan, {user.name}?</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ds-text-muted)]">Tulis pertanyaan, ide, atau instruksi. Pilih model yang sesuai sebelum mengirim pesan.</p>
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
                <label className="flex min-w-0 items-center gap-2 text-[10px] text-[var(--ds-text-dim)]"><Cpu className="h-3.5 w-3.5 shrink-0 text-[var(--ds-cyan)]" /><span className="hidden sm:inline">MODEL</span><span className="relative min-w-0"><select value={model} onChange={(event) => setModel(event.target.value as ChatModelId)} disabled={isGenerating} className="max-w-[220px] appearance-none truncate bg-transparent py-1 pr-5 font-mono text-[10px] text-[var(--ds-text-muted)] outline-none"><option className="bg-[#080b14]" value={CHAT_MODELS[0]}>{CHAT_MODELS[0]}</option>{CHAT_MODELS.slice(1).map((item) => <option className="bg-[#080b14]" key={item} value={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 top-1 h-3 w-3" /></span></label>
                <button type={isGenerating ? "button" : "submit"} onClick={isGenerating ? () => abortRef.current?.abort() : undefined} disabled={!isGenerating && !draft.trim()} className="flex h-8 items-center gap-2 bg-[var(--ds-accent)] px-3 text-xs font-semibold text-[#030508] transition-colors hover:bg-[var(--ds-accent-hover)] disabled:cursor-not-allowed disabled:opacity-40">{isGenerating ? <><CircleStop className="h-3.5 w-3.5" /> Hentikan</> : <><Send className="h-3.5 w-3.5" /> Kirim</>}</button>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] text-[var(--ds-text-dim)]">AI dapat membuat kesalahan. Periksa kembali informasi penting.</p>
            {error && <p className="mt-2 text-center text-xs text-[var(--ds-rose)]">{error}</p>}
          </form>
        </div>
      </div>
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
