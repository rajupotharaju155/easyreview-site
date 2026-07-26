import type { ApiErrorBody } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function getErrorMessage(body: ApiErrorBody | undefined, fallback: string): string {
  if (!body?.message) return fallback
  return Array.isArray(body.message) ? body.message.join(', ') : body.message
}

function ensureBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new ApiError('API base URL is not configured (VITE_API_BASE_URL)', 0)
  }
  return API_BASE_URL
}

async function parseError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined
  try {
    body = (await response.json()) as ApiErrorBody
  } catch {
    body = undefined
  }
  return new ApiError(getErrorMessage(body, response.statusText), response.status)
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${ensureBaseUrl()}${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw await parseError(response)
  }

  return (await response.json()) as T
}

export async function apiPost<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${ensureBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw await parseError(response)
  }

  return (await response.json()) as T
}
