import { useState, useCallback } from "react";
import { api, handleApiError } from "@/lib/api";
import { LoadingState } from "@/types";

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

// Generic hook for API calls
export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<any>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setLoading("loading");
        setError(null);

        const response = await apiCall(...args);
        const result = response.data;

        setData(result);
        setLoading("success");

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        setLoading("error");

        if (options.onError) {
          options.onError(errorMessage);
        }

        return null;
      }
    },
    [apiCall, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading("idle");
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Specialized hooks for common operations
export function useGetJobs() {
  return useApi((params?: Record<string, any>) => api.get("/jobs", params));
}

export function useGetJob() {
  return useApi((id: string) => api.get(`/jobs/${id}`));
}

export function useCreateJob() {
  return useApi((jobData: any) => api.post("/jobs", jobData));
}

export function useUpdateJob() {
  return useApi((id: string, jobData: any) => api.put(`/jobs/${id}`, jobData));
}

export function useDeleteJob() {
  return useApi((id: string) => api.delete(`/jobs/${id}`));
}

export function useGetProfile() {
  return useApi(() => api.get("/profile"));
}

export function useUpdateProfile() {
  return useApi((profileData: any) => api.put("/profile", profileData));
}

export function useSearchJobs() {
  return useApi(
    (searchParams: {
      query?: string;
      location?: string;
      type?: string;
      salary?: number;
      page?: number;
      limit?: number;
    }) => api.get("/jobs/search", searchParams)
  );
}

// Hook for handling multiple API calls
export function useApiQueue() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const executeQueue = useCallback(
    async (apiCalls: Array<() => Promise<any>>) => {
      setIsLoading(true);
      setErrors([]);

      const results: any[] = [];
      const errorList: string[] = [];

      for (const apiCall of apiCalls) {
        try {
          const result = await apiCall();
          results.push(result);
        } catch (error) {
          const errorMessage = handleApiError(error);
          errorList.push(errorMessage);
        }
      }

      setErrors(errorList);
      setIsLoading(false);

      return { results, errors: errorList };
    },
    []
  );

  return {
    isLoading,
    errors,
    executeQueue,
  };
}
