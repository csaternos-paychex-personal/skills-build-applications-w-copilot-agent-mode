const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export async function fetchResource(endpoint) {
  const url = endpoint.startsWith('http') ? endpoint : `${apiOrigin}${endpoint}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Unable to load ${endpoint}`)
  return responseItems(await response.json())
}