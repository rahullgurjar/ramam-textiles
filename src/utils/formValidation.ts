/**
 * RAMAM TEXTILES: ADVANCED FORM VALIDATION & FAKE DETAILS DETECTOR
 * 
 * Protects forms from:
 * 1. Fake, dummy, and test names (e.g. "test", "asdf", "John123", "none")
 * 2. Disposable / temporary email inboxes (e.g. mailinator, tempmail, yopmail)
 * 3. Fake email addresses (e.g. test@test.com, asdf@gmail.com, abc@xyz.com)
 * 4. Fake / invalid phone numbers (e.g. 0000000000, 1234567890, 9999999999)
 * 5. Gibberish & keyboard mash text (e.g. "asdfghjk", "qwertzui")
 * 6. Dummy company / placeholder addresses
 * 7. Automated spam bots (via honeypot detection)
 */

// Known disposable / temporary email domains (case-insensitive)
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'temp-mail.org', '10minutemail.com',
  'guerrillamail.com', 'yopmail.com', 'trashmail.com', 'dispostable.com',
  'sharklasers.com', 'getairmail.com', 'throwawaymail.com', 'fakemailgenerator.com',
  'generator.email', 'burnermail.io', 'mohmal.com', 'crazymailing.com',
  'mytemp.email', 'fakeinbox.com', 'maildrop.cc', 'inboxkitten.com',
  'nada.ltd', 'getnada.com', 'emailondeck.com', 'tempinbox.com',
  'trashmail.net', 'tempmail.net', 'temporary-mail.net', 'temp-mail.io',
  'dropmail.me', 'armyspy.com', 'cuvox.de', 'dayrep.com', 'fleckens.hu',
  'gustr.com', 'jourrapide.com', 'rhyta.com', 'superrito.com', 'teleworm.us',
  'einrot.com', 'spamgourmet.com', 'spambox.us', 'mytempemail.com',
  'discard.email', 'discardmail.com', 'spamavert.com', 'zoemail.org',
  'test.com', 'example.com', 'example.org', 'example.net', 'fake.com',
  'sample.com', 'asdf.com', 'xyz.com', '123.com', 'temp.com', 'mock.com',
  'domain.com', 'invalid.com', 'dummy.com', 'testmail.com', 'foobar.com'
]);

// Dummy test names or words that indicate placeholder/fake input
const FAKE_NAME_KEYWORDS = new Set([
  'test', 'testing', 'tester', 'testuser', 'asdf', 'asdfgh', 'qwerty',
  'admin', 'administrator', 'user', 'demo', 'dummy', 'sample', 'fake',
  'nobody', 'none', 'null', 'undefined', 'xyz', 'abc', 'aaaa', 'bbbb',
  '1234', '12345', 'foo', 'bar', 'foobar', 'unknown', 'no name', 'noname',
  'na', 'n/a', 'anonymous', 'guest', 'fakename', 'someone', 'whatever',
  'random', 'testname', 'placeholder', 'blank', 'default', 'nil'
]);

// Dummy test usernames in email (e.g. test@..., asdf@...)
const FAKE_EMAIL_USERS = new Set([
  'test', 'testing', 'tester', 'admin', 'fake', 'dummy', 'asdf',
  'asdfgh', 'qwerty', 'nobody', 'noemail', 'user', 'sample', 'temp',
  'demo', 'trial', '1234', '12345', 'abcdef', 'null', 'none', 'void',
  'spam', 'abc', 'xyz', 'aaa', 'bbb', 'info123'
]);

// Common fake / sequential phone number patterns (digits only)
const FAKE_PHONE_PATTERNS = [
  /^0+$/,                // 0000000000
  /^1+$/,                // 1111111111
  /^2+$/,                // 2222222222
  /^3+$/,                // 3333333333
  /^4+$/,                // 4444444444
  /^5+$/,                // 5555555555
  /^6+$/,                // 6666666666
  /^7+$/,                // 7777777777
  /^8+$/,                // 8888888888
  /^9+$/,                // 9999999999
  /^1234567890$/,
  /^0123456789$/,
  /^9876543210$/,
  /^0987654321$/,
  /^12345678$/,
  /^123456789$/,
  /^123456$/,
  /^12345$/,
  /^123123123$/,
  /^1234123412$/,
  /^9876598765$/,
  /^0000123456$/
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  field?: string;
}

/**
 * Checks if a string looks like repetitive gibberish or keyboard mash
 */
function isGibberish(str: string): boolean {
  const clean = str.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean.length < 3) return false;

  // Single character repeated 3+ times (e.g. "aaa", "xxxx")
  if (/^(.)\1{2,}$/.test(clean)) return true;

  // Known keyboard mash sequences
  const mashTokens = ['asdf', 'qwer', 'zxcv', 'hjkl', 'tyui', 'ghjk', 'dfgh', '12345'];
  for (const token of mashTokens) {
    if (clean.includes(token)) return true;
  }

  // 5+ consecutive consonants with no vowels (e.g. "bcdfgh")
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(clean)) return true;

  return false;
}

/**
 * Validates a Contact Name
 */
export function validateContactName(name: string): ValidationResult {
  const trimmed = (name || '').trim();

  if (!trimmed) {
    return { isValid: false, error: 'Please enter your full name.', field: 'name' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.', field: 'name' };
  }

  if (trimmed.length > 70) {
    return { isValid: false, error: 'Name is unusually long. Please enter a valid name.', field: 'name' };
  }

  // Digits inside name (e.g. "John123")
  if (/\d/.test(trimmed)) {
    return { isValid: false, error: 'Names cannot contain numbers. Please enter your real name.', field: 'name' };
  }

  // Check for XSS or script injection
  if (/<script\b|<iframe\b|<object\b|<embed\b|javascript:|data:\s*text\/html|on\w+\s*=/i.test(trimmed)) {
    return { isValid: false, error: 'HTML markup and script tags are not permitted.', field: 'name' };
  }

  // Check for dummy keywords
  const normalized = trimmed.toLowerCase().replace(/[^a-z]/g, '');
  if (FAKE_NAME_KEYWORDS.has(normalized)) {
    return { isValid: false, error: 'Please enter a real contact name (not a test placeholder).', field: 'name' };
  }

  if (isGibberish(trimmed)) {
    return { isValid: false, error: 'Please enter a valid, recognizable name.', field: 'name' };
  }

  return { isValid: true };
}

/**
 * Validates an Email Address (syntax, disposable domains, and dummy prefixes)
 */
export function validateEmailAddress(email: string): ValidationResult {
  const trimmed = (email || '').trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, error: 'Please enter your email address.', field: 'email' };
  }

  // Standard RFC compliant email regex
  const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email format (e.g. name@company.com).', field: 'email' };
  }

  const [username, domain] = trimmed.split('@');
  if (!username || !domain) {
    return { isValid: false, error: 'Please enter a complete email address.', field: 'email' };
  }

  // Check for known disposable/temporary domains
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: 'Temporary or disposable emails are not accepted. Please use your official business or personal email.',
      field: 'email'
    };
  }

  // Check for fake username
  const cleanUsername = username.replace(/[^a-z0-9]/g, '');
  if (FAKE_EMAIL_USERS.has(cleanUsername)) {
    return {
      isValid: false,
      error: 'Please provide an active business or personal email, not a test address.',
      field: 'email'
    };
  }

  // Check for single character username like a@gmail.com
  if (cleanUsername.length < 2) {
    return {
      isValid: false,
      error: 'The email username is too short to be valid.',
      field: 'email'
    };
  }

  // Check if username is keyboard mash
  if (isGibberish(cleanUsername)) {
    return {
      isValid: false,
      error: 'The email address appears to be random characters. Please provide your real email.',
      field: 'email'
    };
  }

  // TLD check (must have at least 2 characters for TLD)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2) {
    return { isValid: false, error: 'Please enter an email with a valid domain extension.', field: 'email' };
  }

  return { isValid: true };
}

/**
 * Validates a Phone / WhatsApp Number
 */
export function validatePhoneNumber(phone: string, countryCode = ''): ValidationResult {
  const trimmed = (phone || '').trim();

  if (!trimmed) {
    return { isValid: false, error: 'Please enter your phone or WhatsApp number.', field: 'phone' };
  }

  // Clean to only digits
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 7) {
    return { isValid: false, error: 'Phone number is too short. Please include full digits (7-15 digits).', field: 'phone' };
  }

  if (digits.length > 15) {
    return { isValid: false, error: 'Phone number is too long (maximum 15 digits according to international standards).', field: 'phone' };
  }

  // Check against known dummy/test patterns
  for (const pattern of FAKE_PHONE_PATTERNS) {
    if (pattern.test(digits)) {
      return { isValid: false, error: 'Please enter your genuine phone number, not a repeating or sequence test number.', field: 'phone' };
    }
  }

  // Hollywood fake 555 numbers check
  if (digits.includes('55501') || digits.includes('5550199')) {
    return { isValid: false, error: 'Please provide a real active telephone number.', field: 'phone' };
  }

  // India specific check (+91): exactly 10 digits starting with 6, 7, 8, or 9
  if (countryCode === '+91' || countryCode === '91') {
    if (digits.length === 10) {
      if (!/^[6-9]/.test(digits)) {
        return { isValid: false, error: 'Indian mobile numbers must start with 6, 7, 8, or 9.', field: 'phone' };
      }
    }
  }

  return { isValid: true };
}

/**
 * Validates Company / Brand name if provided
 */
export function validateCompanyName(company: string): ValidationResult {
  const trimmed = (company || '').trim();
  if (!trimmed) return { isValid: true }; // Company is often optional

  if (trimmed.length > 80) {
    return { isValid: false, error: 'Company name is unusually long.', field: 'company' };
  }

  // Check for XSS or script injection
  if (/<script\b|<iframe\b|<object\b|<embed\b|javascript:|data:\s*text\/html|on\w+\s*=/i.test(trimmed)) {
    return { isValid: false, error: 'HTML markup and script tags are not permitted.', field: 'company' };
  }

  const normalized = trimmed.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (FAKE_NAME_KEYWORDS.has(normalized)) {
    return { isValid: false, error: 'Please provide your genuine boutique or brand name.', field: 'company' };
  }

  if (isGibberish(trimmed)) {
    return { isValid: false, error: 'Please enter a valid company or studio name.', field: 'company' };
  }

  return { isValid: true };
}

/**
 * Validates Shipping Address or Inquiry Message
 */
export function validateDetailedText(text: string, fieldLabel = 'Address', minLength = 6): ValidationResult {
  const trimmed = (text || '').trim();

  if (!trimmed) {
    return { isValid: false, error: `Please enter your ${fieldLabel.toLowerCase()}.`, field: fieldLabel.toLowerCase() };
  }

  if (trimmed.length < minLength) {
    return { isValid: false, error: `${fieldLabel} is too brief. Please provide complete details.`, field: fieldLabel.toLowerCase() };
  }

  // Check for XSS or script injection
  if (/<script\b|<iframe\b|<object\b|<embed\b|javascript:|data:\s*text\/html|on\w+\s*=/i.test(trimmed)) {
    return { isValid: false, error: `HTML markup and script tags are not permitted in ${fieldLabel.toLowerCase()}.`, field: fieldLabel.toLowerCase() };
  }

  if (isGibberish(trimmed)) {
    return { isValid: false, error: `Please enter a genuine ${fieldLabel.toLowerCase()} (random characters detected).`, field: fieldLabel.toLowerCase() };
  }

  return { isValid: true };
}

/**
 * Master validator for complete forms
 */
export function validateComprehensiveLead(data: {
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  company?: string;
  address?: string;
  message?: string;
  botHoneypot?: string;
}): ValidationResult {
  // 1. Honeypot check (instant bot catch)
  if (data.botHoneypot && data.botHoneypot.trim().length > 0) {
    return {
      isValid: false,
      error: 'Automated submission detected. Please submit manually as a human.',
      field: 'honeypot'
    };
  }

  // 2. Name check
  if (data.name !== undefined) {
    const nameRes = validateContactName(data.name);
    if (!nameRes.isValid) return nameRes;
  }

  // 3. Email check
  if (data.email !== undefined) {
    const emailRes = validateEmailAddress(data.email);
    if (!emailRes.isValid) return emailRes;
  }

  // 4. Phone check
  if (data.phone !== undefined) {
    const phoneRes = validatePhoneNumber(data.phone, data.countryCode);
    if (!phoneRes.isValid) return phoneRes;
  }

  // 5. Company check
  if (data.company !== undefined && data.company.trim().length > 0) {
    const compRes = validateCompanyName(data.company);
    if (!compRes.isValid) return compRes;
  }

  // 6. Address check
  if (data.address !== undefined) {
    const addrRes = validateDetailedText(data.address, 'Shipping Address', 8);
    if (!addrRes.isValid) return addrRes;
  }

  // 7. Message check
  if (data.message !== undefined && data.message.trim().length > 0) {
    const msgRes = validateDetailedText(data.message, 'Inquiry Message', 6);
    if (!msgRes.isValid) return msgRes;
  }

  return { isValid: true };
}
