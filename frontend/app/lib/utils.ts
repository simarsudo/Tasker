import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Makes an HTTP request.
 *
 * @param endpoint - The relative path of the endpoint.
 * @param options - Optional request configuration. No need to pass credentials and Content-Type headers.
 * @returns A promise resolving to the response.
 */
export function makeRequest(endpoint: string, options?: RequestOptions): Promise<Response> {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api/v1";
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
