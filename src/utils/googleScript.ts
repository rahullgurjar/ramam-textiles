/**
 * Google Apps Script Webhook Integration
 * Endpoint: https://script.google.com/macros/s/AKfycbyVKY1Ngb3tAY9rY463syrZ2gh_zWq5ZRUYjXQsucx-b8tXRJKg7VV3KY39b5u-taUa/exec
 * 
 * Automatically captures customer inquiries, bulk order quotes, and contact forms
 * directly into the linked Google Sheets document.
 */

export const GOOGLE_SCRIPT_URL =
  (typeof window !== 'undefined' && (window as any).GOOGLE_SCRIPT_URL) ||
  'https://script.google.com/macros/s/AKfycbyVKY1Ngb3tAY9rY463syrZ2gh_zWq5ZRUYjXQsucx-b8tXRJKg7VV3KY39b5u-taUa/exec';

export async function submitToGoogleSheet(data: Record<string, any>): Promise<boolean> {
  try {
    const payload = {
      ...data,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    // Google Apps Script accepts text/plain to avoid preflight CORS restrictions in browsers
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (err) {
    console.warn('Google Apps Script submission notice:', err);
    return false;
  }
}
