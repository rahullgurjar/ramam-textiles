/**
 * RAMAM TEXTILES: SECURITY & INPUT SANITIZATION ENGINE
 * 
 * Protects against:
 * 1. CSV / Spreadsheet Formula Injection (CWE-1236)
 *    Attackers injecting `=CMD|...`, `=IMPORTXML(...)`, `=IMAGE(...)`, `+`, `-`, `@`
 *    into form inputs to execute formulas or exfiltrate data in Google Sheets.
 * 2. Cross-Site Scripting (XSS) (CWE-79)
 *    Attackers injecting `<script>`, `javascript:`, or malicious HTML event handlers.
 * 3. Payload-bombing / Buffer Exhaustion
 *    Attackers submitting gigabyte-sized strings to overload memory.
 */

/**
 * Neutralizes Spreadsheet / CSV Formula Injection.
 * In Google Sheets and Excel, any cell starting with `=, +, -, @, \t, \r, %`
 * is evaluated as an active formula or command.
 * Prepending a single tick (`'`) forces Google Sheets to treat the value
 * as plain text without executing formulas.
 */
export function sanitizeSpreadsheetFormula(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  if (str.length === 0) return '';

  // Check for dangerous formula trigger prefixes
  const firstChar = str.charAt(0);
  if (['=', '+', '-', '@', '\t', '\r', '%', '|'].includes(firstChar)) {
    // Prefix with single apostrophe to escape formula interpretation in spreadsheets
    return `'${str}`;
  }

  return str;
}

/**
 * Strips dangerous HTML tags, javascript: protocols, and event handlers
 * from user input to prevent Cross-Site Scripting (XSS).
 */
export function sanitizeHtml(val: unknown): string {
  if (val === null || val === undefined) return '';
  let str = String(val);

  // 1. Remove dangerous script and frame tags
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  str = str.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  str = str.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  str = str.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');

  // 2. Strip javascript: and vbscript: URIs
  str = str.replace(/javascript\s*:/gi, '');
  str = str.replace(/vbscript\s*:/gi, '');
  str = str.replace(/data\s*:\s*text\/html/gi, '');

  // 3. Strip inline event handlers (e.g. onerror=, onload=, onclick=)
  str = str.replace(/\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // 4. Strip leftover HTML tags while keeping text content
  str = str.replace(/<[^>]+>/g, '');

  return str.trim();
}

/**
 * Clamps string length to prevent memory exhaustion / DoS attacks.
 */
export function clampLength(str: string, maxLength: number): string {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) : str;
}

/**
 * Master input sanitizer: Strips XSS, neutralizes spreadsheet formulas,
 * and clamps length to a safe ceiling.
 */
export function sanitizeInput(val: unknown, maxLength = 2000): string {
  if (val === null || val === undefined) return '';
  const htmlCleaned = sanitizeHtml(val);
  const clamped = clampLength(htmlCleaned, maxLength);
  return sanitizeSpreadsheetFormula(clamped);
}

/**
 * Deeply sanitizes an entire form payload object before transmission.
 */
export function sanitizeFormPayload<T extends Record<string, any>>(data: T): T {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Apply field-specific max lengths
      let maxLen = 2000;
      if (key === 'fullName' || key === 'name' || key === 'contactName') maxLen = 100;
      if (key === 'email') maxLen = 150;
      if (key === 'phone' || key === 'mobile') maxLen = 30;
      if (key === 'companyName' || key === 'company' || key === 'brand') maxLen = 120;
      if (key === 'country') maxLen = 80;
      if (key === 'notes' || key === 'message' || key === 'address') maxLen = 3000;

      result[key] = sanitizeInput(value, maxLen);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => {
        if (typeof item === 'string') return sanitizeInput(item, 500);
        if (typeof item === 'object' && item !== null) return sanitizeFormPayload(item);
        return item;
      });
    } else if (typeof value === 'object' && value !== null) {
      result[key] = sanitizeFormPayload(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
