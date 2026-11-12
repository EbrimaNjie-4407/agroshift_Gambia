/**
 * AgroShift Gambia — API Service Layer
 * Interfaces directly with the Python FastAPI backend.
 * Uses VITE_API_URL for remote HTTPS deployment, falling back to relative '/api' for local Vite proxy.
 */

import { EvaluationRequest, EvaluationResponse, FieldData } from '../types/agroshift';

// Determine backend base URL:
// If VITE_API_URL is configured (e.g. https://api.agroshift-gambia.org), target it directly.
// If unset, use empty string so requests hit relative /api endpoints (proxied locally by Vite).
const ENV_API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
export const API_BASE_URL = ENV_API_URL ? ENV_API_URL.replace(/\/+$/, '') : '';

export class ApiError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // 25-second timeout to handle Render cold-starts gracefully
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          errorDetail = typeof errorJson.detail === 'string'
            ? errorJson.detail
            : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Response wasn't JSON
      }
      throw new ApiError(errorDetail, response.status);
    }

    return await response.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) {
      throw err;
    }
    if (err.name === 'AbortError') {
      throw new ApiError(
        `Connection timed out connecting to ${url}. Render instance may be spinning up (cold start). Please retry in 10-15 seconds.`,
        408
      );
    }
    // Network failure / DNS / CORS block
    throw new ApiError(
      `Unable to connect to AgroShift backend at ${url}. ${err.message || 'Network request failed (possibly CORS or cold start).' }`,
      0
    );
  }
}

export const agroShiftApi = {
  /**
   * Health check endpoint
   * GET /health
   */
  async checkHealth(): Promise<{ status: string }> {
    return request<{ status: string }>('/health');
  },

  /**
   * Fetch precomputed field features and metadata
   * GET /api/v2/fields/{field_id}
   */
  async getField(fieldId: string = 'field-001'): Promise<FieldData> {
    return request<FieldData>(`/api/v2/fields/${encodeURIComponent(fieldId)}`);
  },

  /**
   * Fetch static cached fallback in case live evaluation is offline
   * GET /api/v2/fallback/{field_id}
   */
  async getFallback(fieldId: string = 'field-001'): Promise<FieldData> {
    return request<FieldData>(`/api/v2/fallback/${encodeURIComponent(fieldId)}`);
  },

  /**
   * Run decision-engine evaluation with farmer inputs
   * POST /api/v2/evaluate
   */
  async evaluateField(payload: EvaluationRequest): Promise<EvaluationResponse> {
    return request<EvaluationResponse>('/api/v2/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
