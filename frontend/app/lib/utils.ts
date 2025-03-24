import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Returns the base URL for API requests based on the current environment
 */
export function getBackendUrl(): string {
  const apiPath = "/api/v1";
  const prodApiUrl = "https://tasker-api.simar.work";
  const fallBackLocalUrl = "http://127.0.0.1:8000"

  // Adds API path to URL if needed
  const withApiPath = (url: string) => url.endsWith(apiPath) ? url : url + apiPath;

  // Client-side detection
  if (typeof window !== "undefined") {
    // Check if we're in development using hostname
    const isDev = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const baseUrl = isDev ? fallBackLocalUrl : prodApiUrl;
    return withApiPath(baseUrl)
  }

  // Server-side detection
  const isServerDev = process.env.NODE_ENV === "development" || process.env.MODE === "d";
  const baseUrl = isServerDev
    ? (process.env.BACKEND_URL || fallBackLocalUrl)
    : (process.env.BACKEND_URL || prodApiUrl);

  return withApiPath(baseUrl);
}

/**
 * Makes an HTTP request.
 *
 * @param endpoint - The relative path of the endpoint.
 * @param options - Optional request configuration. No need to pass credentials and Content-Type headers.
 * @returns A promise resolving to the response.
 */
export function makeRequest(endpoint: string, options?: RequestOptions): Promise<Response> {
  const BASE_URL = getBackendUrl();
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
