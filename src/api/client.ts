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

export async function apiGet<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError('API base URL is not configured (VITE_API_BASE_URL)', 0)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    let body: ApiErrorBody | undefined
    try {
      body = (await response.json()) as ApiErrorBody
    } catch {
      body = undefined
    }
    throw new ApiError(getErrorMessage(body, response.statusText), response.status)
  }

  return (await response.json()) as T
}
