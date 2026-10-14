// Test fake details detector against realistic spam & fake test inputs
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'temp-mail.org', '10minutemail.com',
  'guerrillamail.com', 'yopmail.com', 'trashmail.com', 'dispostable.com',
  'test.com', 'example.com', 'fake.com', 'asdf.com', 'xyz.com', '123.com'
]);

const FAKE_NAME_KEYWORDS = new Set([
  'test', 'testing', 'tester', 'asdf', 'qwerty', 'admin', 'user', 'demo',
  'dummy', 'fake', 'nobody', 'none', 'null', 'xyz', 'abc', 'aaaa'
]);

const FAKE_EMAIL_USERS = new Set([
  'test', 'testing', 'tester', 'admin', 'fake', 'dummy', 'asdf', 'qwerty', 'nobody', 'user', 'abc', 'xyz'
]);

function isGibberish(str) {
  const clean = str.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean.length < 3) return false;
  if (/^(.)\1{2,}$/.test(clean)) return true;
  const mashTokens = ['asdf', 'qwer', 'zxcv', 'hjkl', 'tyui', 'ghjk', 'dfgh', '12345'];
  for (const token of mashTokens) {
    if (clean.includes(token)) return true;
  }
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(clean)) return true;
  return false;
}

function validateLead({ name, email, phone, company, address, botHoneypot }) {
  if (botHoneypot && botHoneypot.trim()) {
    return { isValid: false, reason: 'Bot Honeypot Triggered' };
  }

  if (name) {
    const cleanName = name.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (name.trim().length < 2) return { isValid: false, reason: 'Name too short' };
    if (/\d/.test(name)) return { isValid: false, reason: 'Numbers in name' };
    if (FAKE_NAME_KEYWORDS.has(cleanName)) return { isValid: false, reason: 'Placeholder dummy name' };
    if (isGibberish(name)) return { isValid: false, reason: 'Keyboard mash name' };
  }

  if (email) {
    const parts = email.trim().toLowerCase().split('@');
    if (parts.length !== 2) return { isValid: false, reason: 'Invalid email syntax' };
    const [user, domain] = parts;
    if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return { isValid: false, reason: 'Disposable email domain' };
    if (FAKE_EMAIL_USERS.has(user.replace(/[^a-z0-9]/g, ''))) return { isValid: false, reason: 'Test/dummy email prefix' };
    if (isGibberish(user)) return { isValid: false, reason: 'Gibberish email username' };
  }

  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) return { isValid: false, reason: 'Invalid phone length' };
    if (/^(.)\1+$/.test(digits)) return { isValid: false, reason: 'Repeating digits in phone' };
    if (['1234567890', '0123456789', '9876543210'].includes(digits)) return { isValid: false, reason: 'Sequential dummy phone' };
  }

  if (address && isGibberish(address)) {
    return { isValid: false, reason: 'Gibberish address' };
  }

  return { isValid: true };
}

const testCases = [
  { name: 'test', email: 'test@gmail.com', phone: '9876543210' },
  { name: 'John Doe', email: 'mail@mailinator.com', phone: '9876543210' },
  { name: 'John Doe', email: 'john@boutique.fr', phone: '0000000000' },
  { name: 'John Doe', email: 'john@boutique.fr', phone: '1234567890' },
  { name: 'John Doe', email: 'asdf@gmail.com', phone: '+33 6 12 34 56 78' },
  { name: 'asdfghjk', email: 'valid@brand.com', phone: '+1 415 555 2000' },
  { name: 'John Doe', email: 'valid@brand.com', phone: '+91 9876543210', botHoneypot: 'bot-spam' },
  { name: 'John123', email: 'john@brand.com', phone: '+1 415 555 2000' },
  { name: 'Élise Laurent', email: 'elise@maisonceleste.fr', phone: '+33 6 12 34 56 78', address: '14 Rue de Rivoli, Paris' }
];

testCases.forEach((t, i) => {
  const res = validateLead(t);
  console.log('Case ' + (i + 1) + ' (' + (t.name || '') + ' / ' + (t.email || '') + '): ' + (res.isValid ? ' ACCEPTED' : ' BLOCKED: ' + res.reason));
});
