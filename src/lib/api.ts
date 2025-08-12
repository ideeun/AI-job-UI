import { ApiResponse } from "@/types";

// Конфигурация API
const API_BASE_URL =
  (typeof window !== "undefined" && (window as any).env?.NEXT_PUBLIC_API_URL) ||
  "http://localhost:3001/api";

// Классы ошибок
export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

// HTTP client configuration
interface RequestConfig extends RequestInit {
  timeout?: number;
}

// Enhanced fetch with timeout and error handling
const fetchWithConfig = async (
  url: string,
  config: RequestConfig = {}
): Promise<Response> => {
  const { timeout = 10000, ...requestConfig } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...requestConfig,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408);
    }
    throw error;
  }
};

// API Client class
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestConfig = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetchWithConfig(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        error instanceof Error ? error.message : "Unknown error occurred",
        0
      );
    }
  }

  // HTTP Methods
  async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params)}`
      : endpoint;
    return this.request<T>(url, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Default API client instance
export const apiClient = new ApiClient();

// Convenience functions for common operations
export const api = {
  get: <T>(endpoint: string, params?: Record<string, any>) =>
    apiClient.get<T>(endpoint, params),

  post: <T>(endpoint: string, data?: any) => apiClient.post<T>(endpoint, data),

  put: <T>(endpoint: string, data?: any) => apiClient.put<T>(endpoint, data),

  patch: <T>(endpoint: string, data?: any) =>
    apiClient.patch<T>(endpoint, data),

  delete: <T>(endpoint: string) => apiClient.delete<T>(endpoint),
};

// Helper function for handling API errors
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

export default api;
