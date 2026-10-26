/**
 * RAMAM TEXTILES: SECURE GOOGLE SHEETS WEBHOOK INTEGRATION
 * 
 * Features:
 * 1. Automatic Input Sanitization (Strips XSS and neutralizes formula injection)
 * 2. Rate Limiting Protection (Prevents automated spam floods & quota exhaustion)
 * 3. Secure Fallback & Environment Resolution
 * 4. Protected Storage (Restricts runtime URL tampering in production)
 */

import { sanitizeFormPayload } from './securitySanitizer';
import { checkRateLimit, recordRateLimitEvent, RateLimitCheckResult } from './rateLimiter';

const DEFAULT_GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz5j4RS8gNobRrHVb0l9hsJylHisj9MjJFpJzIx7pu4r3z0x7D7Dl8DORT_pI2y3g7X/exec';

/**
 * Validates whether a URL looks like an authentic Google Apps Script web app endpoint.
 */
function isValidGoogleScriptUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('https://script.google.com/macros/s/') && url.endsWith('/exec');
}

/**
 * Returns the active Google Apps Script Web App URL with resolution priority:
 * 1. Vite environment variable (VITE_GOOGLE_SCRIPT_URL)
 * 2. Local storage override (ENABLED ONLY IN LOCAL DEV ENVIRONMENT to prevent production hijacking)
 * 3. Default fallback endpoint
 */
export function getGoogleScriptUrl(): string {
  // Only allow localStorage overrides in local development mode
  if (typeof window !== 'undefined' && (import.meta as any)?.env?.DEV) {
    try {
      const localOverride = localStorage.getItem('RAMAM_GOOGLE_SCRIPT_URL');
      if (localOverride && isValidGoogleScriptUrl(localOverride.trim())) {
        return localOverride.trim();
      }
    } catch {
      // Storage access disabled / private browsing
    }
  }

  const envUrl = (import.meta as any)?.env?.VITE_GOOGLE_SCRIPT_URL;
  if (envUrl && typeof envUrl === 'string' && isValidGoogleScriptUrl(envUrl.trim())) {
    return envUrl.trim();
  }

  return DEFAULT_GOOGLE_SCRIPT_URL;
}

export const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();

/**
 * Checks if the current client is allowed to submit a form under active rate limits.
 */
export function checkSubmissionRateLimit(): RateLimitCheckResult {
  return checkRateLimit('form_submission');
}

export interface SubmissionResponse {
  success: boolean;
  rateLimited?: boolean;
  error?: string;
}

/**
 * Submits sanitized form data to the connected Google Spreadsheet.
 * Automatically enforces rate limits and sanitizes against XSS and Formula Injection.
 */
export async function submitToGoogleSheet(data: Record<string, any>): Promise<SubmissionResponse> {
  // 1. Rate Limit Check
  const rateLimitStatus = checkRateLimit('form_submission');
  if (!rateLimitStatus.allowed) {
    return {
      success: false,
      rateLimited: true,
      error: rateLimitStatus.reason || 'Please wait before submitting another inquiry.'
    };
  }

  const url = getGoogleScriptUrl();

  try {
    // 2. Security Sanitization (XSS and Formula Injection neutralization)
    const sanitizedData = sanitizeFormPayload(data);

    const payload = {
      ...sanitizedData,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      submittedAtIso: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href.split('#')[0] : '',
    };

    // 3. Register submission event in rate limiter
    recordRateLimitEvent('form_submission');

    // 4. Transmission
    // Google Apps Script accepts text/plain to avoid preflight CORS restrictions in browsers
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // 5. Auto-sync lead into internal Atelier CRM storage
    try {
      const { recordLeadAsOrder } = await import('./crmStorage');
      recordLeadAsOrder(data);
    } catch (e) {
      // Non-blocking for external submission
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: 'Inquiry transmission encountered a network issue. Please check your connection.'
    };
  }
}
