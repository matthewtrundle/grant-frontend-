/**
 * API Client for Grant Automation Backend
 * Client-side only - for use in React components
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "APIError";
  }
}

/**
 * Make an authenticated API request (Client-side)
 * Use with Clerk's useAuth() hook:
 *
 * const { getToken } = useAuth();
 * const token = await getToken();
 * const result = await apiRequest('/endpoint', token, { method: 'POST', ... });
 */
export async function apiRequest<T>(
  endpoint: string,
  token: string | null,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(response.status, response.statusText, errorData);
  }

  return response.json();
}
