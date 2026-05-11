/**
 * API service utilities with type safety
 */

import type { Message } from './types/index'
import { OPENROUTER_API_URL, MAX_TOKENS } from './constants'

export interface ChatRequestPayload {
  model: string
  messages: Array<{
    role: 'system' | 'user' | 'assistant'
    content: string
  }>
  temperature: number
  max_tokens: number
}

export interface ChatResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export interface ChatError {
  error?: {
    message: string
    type?: string
    code?: string
  }
}

/**
 * Send chat message to OpenRouter API
 */
export async function sendChatMessage(
  apiKey: string,
  payload: ChatRequestPayload
): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'AI Roleplay'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as ChatError
    const errorMessage = errorData?.error?.message || `HTTP ${response.status}`
    throw new Error(errorMessage)
  }

  const data = (await response.json()) as ChatResponse
  const reply = data.choices?.[0]?.message?.content || '...'
  return reply
}

/**
 * Build OpenRouter API payload
 */
export function buildChatPayload(
  model: string,
  messages: Message[],
  systemPrompt: string,
  temperature: number
): ChatRequestPayload {
  return {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }))
    ],
    temperature,
    max_tokens: MAX_TOKENS
  }
}

/**
 * Format API error for display
 */
export function formatApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Terjadi kesalahan tidak diketahui'
}

/**
 * Validate API response
 */
export function isValidChatResponse(data: unknown): data is ChatResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'choices' in data &&
    Array.isArray((data as Record<string, unknown>).choices) &&
    (data as Record<string, unknown>).choices.length > 0
  )
}
