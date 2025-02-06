import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Makes an HTTP request to the specified endpoint.
 */
export function makeRequest(endpoint: string, options?: RequestInit): Promise<Response> {
  const BASE_URL = "http://127.0.0.1:8000/api/v1";
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const URL = `${BASE_URL}${normalizedEndpoint}`;

  return fetch(URL, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });
}
