/**
 * RAMAM TEXTILES: CLIENT-SIDE RATE LIMITER & SPAM COOLDOWN
 * 
 * Protects webhooks and APIs from:
 * 1. Rapid multi-click / accidental duplicate submissions
 * 2. Automated browser scripts / fast submission loops
 * 3. Daily quota exhaustion on Google Apps Script / email alerts
 */

interface RateLimitConfig {
  cooldownSeconds: number; // Minimum gap between submissions
  maxPerWindow: number;    // Maximum submissions allowed within the time window
  windowSeconds: number;   // Window size in seconds
}

const DEFAULT_CONFIG: RateLimitConfig = {
  cooldownSeconds: 10,     // 10 seconds between consecutive submissions
  maxPerWindow: 5,         // Max 5 submissions per 10 minutes
  windowSeconds: 600       // 10 minutes (600s)
};

const STORAGE_PREFIX = 'rt_rl_';

function getTimestamps(action: string): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${action}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTimestamps(action: string, timestamps: number[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${action}`, JSON.stringify(timestamps));
  } catch {
    // Ignore storage quota errors
  }
}

export interface RateLimitCheckResult {
  allowed: boolean;
  waitSeconds?: number;
  reason?: string;
}

/**
 * Checks whether an action (e.g. 'form_submission') is currently allowed under rate limits.
 */
export function checkRateLimit(
  action = 'form_submission',
  config = DEFAULT_CONFIG
): RateLimitCheckResult {
  const now = Date.now();
  const rawTimestamps = getTimestamps(action);

  // 1. Filter out timestamps older than windowSeconds
  const windowStart = now - config.windowSeconds * 1000;
  const activeTimestamps = rawTimestamps.filter(t => t > windowStart);

  // 2. Check Cooldown (gap since last submission)
  if (activeTimestamps.length > 0) {
    const lastTimestamp = activeTimestamps[activeTimestamps.length - 1];
    const elapsedSeconds = Math.floor((now - lastTimestamp) / 1000);
    if (elapsedSeconds < config.cooldownSeconds) {
      const waitSeconds = config.cooldownSeconds - elapsedSeconds;
      return {
        allowed: false,
        waitSeconds,
        reason: `Please wait ${waitSeconds} second${waitSeconds === 1 ? '' : 's'} before submitting another inquiry.`
      };
    }
  }

  // 3. Check Window Quota
  if (activeTimestamps.length >= config.maxPerWindow) {
    const oldestInWindow = activeTimestamps[0];
    const resetSeconds = Math.ceil((oldestInWindow + config.windowSeconds * 1000 - now) / 1000);
    return {
      allowed: false,
      waitSeconds: Math.max(1, resetSeconds),
      reason: `Submission limit reached (maximum ${config.maxPerWindow} inquiries per 10 minutes). Please try again in ${Math.ceil(resetSeconds / 60)} minute(s).`
    };
  }

  return { allowed: true };
}

/**
 * Records a successful action timestamp.
 */
export function recordRateLimitEvent(
  action = 'form_submission',
  config = DEFAULT_CONFIG
): void {
  const now = Date.now();
  const rawTimestamps = getTimestamps(action);
  const windowStart = now - config.windowSeconds * 1000;
  const activeTimestamps = rawTimestamps.filter(t => t > windowStart);
  activeTimestamps.push(now);
  saveTimestamps(action, activeTimestamps);
}

/**
 * Resets rate limit for a specific action.
 */
export function resetRateLimit(action = 'form_submission'): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${action}`);
  } catch {}
}
