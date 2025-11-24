import { API_URL, API_KEY } from '@env';

import { useAuthStore } from '../store/authStore';

interface ApiOptions extends RequestInit {
  query?: Record<string, string | string[] | undefined>;
}

// Build query string with support for repeated keys
function buildQueryString(query?: ApiOptions['query']): string {
  if (!query) return '';
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, v);
    } else {
      params.append(key, value);
    }
  }
  
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

// Safely parse JSON; return raw text when not JSON
function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { query, headers, ...rest } = options;
  const token = useAuthStore.getState().token;

  const method = (rest.method || 'GET').toUpperCase();
  const isBodyRequest = ['POST', 'PUT', 'PATCH'].includes(method);

  const queryString = buildQueryString(query);
  const url = `${API_URL}${path}${queryString}`;

  const baseHeaders: Record<string, string> = {
    'X-API-KEY': API_KEY,
    ...(isBodyRequest ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, {
    headers: { ...baseHeaders, ...(headers as Record<string, string>) },
    ...rest,
  });

  let text: string;
  try {
    text = await response.text();
  } catch {
    throw new Error('Failed to read response body');
  }

  const data = safeParse(text);

  if (!response.ok) {
    const message = typeof data === 'string' ? data : JSON.stringify(data);
    throw new Error(`API error ${response.status}: ${message}`);
  }

  return data as T;
}

export default apiFetch;
