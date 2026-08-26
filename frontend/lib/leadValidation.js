/**
 * Shared public-form validation for enquire, contact, brochure, and career.
 * Blocks fake/test junk and vulgar language before it is submitted.
 */

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BLOCKED_NAMES = new Set([
  "test",
  "test user",
  "testuser",
  "testing",
  "tester",
  "dummy",
  "dummy user",
  "sample",
  "sample user",
  "demo",
  "demo user",
  "fake",
  "fake user",
  "asdf",
  "asdf asdf",
  "qwerty",
  "abc",
  "abc abc",
  "xxxx",
  "xxxxx",
  "user",
  "user name",
  "your name",
  "full name",
  "name",
  "n a",
  "na",
  "none",
  "null",
  "undefined",
  "john doe",
  "jane doe",
  "foo bar",
]);

const BLOCKED_NAME_TOKENS = new Set([
  "test",
  "testing",
  "tester",
  "dummy",
  "sample",
  "demo",
  "fake",
  "asdf",
  "qwerty",
  "xxx",
  "xxxx",
]);

const BLOCKED_EMAIL_LOCALS = new Set([
  "test",
  "testing",
  "tester",
  "testuser",
  "dummy",
  "sample",
  "demo",
  "fake",
  "asdf",
  "qwerty",
  "abc",
  "noreply",
  "no-reply",
  "donotreply",
  "user",
  "username",
  "email",
  "mail",
  "admin",
  "xyz",
  "xxx",
]);

const BLOCKED_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "test.in",
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
]);

const BLOCKED_PHONES = new Set([
  "9876543210",
  "9876543211",
  "9123456789",
  "9988776655",
  "9000000000",
  "9999999999",
  "8888888888",
  "7777777777",
  "6666666666",
  "1234567890",
  "0123456789",
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444",
  "5555555555",
  "0000000000",
  "9898989898",
  "9090909090",
  "9812345678",
]);

/** Whole-word profanity / slur list (English + common Hinglish). */
const VULGAR_WORDS = new Set([
  "fuck",
  "fucker",
  "fucking",
  "fck",
  "fuk",
  "fuq",
  "shit",
  "shitty",
  "bullshit",
  "bitch",
  "bitches",
  "bastard",
  "asshole",
  "arsehole",
  "dickhead",
  "cock",
  "cocksucker",
  "pussy",
  "cunt",
  "slut",
  "whore",
  "porn",
  "porno",
  "xxx",
  "sex",
  "nude",
  "nudes",
  "boobs",
  "tits",
  "penis",
  "vagina",
  "nigger",
  "nigga",
  "faggot",
  "retard",
  "retarded",
  "motherfucker",
  "wtf",
  "stfu",
  "madarchod",
  "madharchod",
  "maderchod",
  "bhenchod",
  "behenchod",
  "chutiya",
  "chutiye",
  "chutia",
  "gandu",
  "gaandu",
  "harami",
  "randi",
  "bhosdike",
  "bhosdi",
  "bhosda",
  "lund",
  "lauda",
  "lawda",
  "loda",
  "chod",
  "chodu",
  "gaand",
  "jhaat",
  "jhat",
]);

const VULGAR_MESSAGE = "Please use appropriate language";
const NAME_MAX = 60;
const EMAIL_MAX = 80;
const PHONE_MAX = 16;
const MESSAGE_MAX = 500;

function normalizeName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function normalizeIndianPhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length >= 12) {
    digits = digits.slice(-10);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}

function isSequentialDigits(digits) {
  if (digits.length !== 10) return false;
  let asc = true;
  let desc = true;
  for (let i = 1; i < digits.length; i += 1) {
    const prev = Number(digits[i - 1]);
    const curr = Number(digits[i]);
    if ((prev + 1) % 10 !== curr) asc = false;
    if ((prev + 9) % 10 !== curr) desc = false;
  }
  return asc || desc;
}

function squashRepeats(value) {
  return String(value || "").replace(/(.)\1+/g, "$1");
}

function normalizeForProfanity(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/@/g, "a")
    .replace(/0/g, "o")
    .replace(/[1!]/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function containsVulgarLanguage(text) {
  const normalized = normalizeForProfanity(text);
  if (!normalized) return false;

  const words = normalized.split(" ");
  for (const word of words) {
    if (VULGAR_WORDS.has(word) || VULGAR_WORDS.has(squashRepeats(word))) {
      return true;
    }
  }

  const collapsed = words.join("");
  if (VULGAR_WORDS.has(collapsed) || VULGAR_WORDS.has(squashRepeats(collapsed))) {
    return true;
  }

  let buffer = "";
  for (const word of words) {
    if (word.length === 1) {
      buffer += word;
      continue;
    }
    if (buffer && (VULGAR_WORDS.has(buffer) || VULGAR_WORDS.has(squashRepeats(buffer)))) {
      return true;
    }
    buffer = "";
  }
  return Boolean(buffer) && (VULGAR_WORDS.has(buffer) || VULGAR_WORDS.has(squashRepeats(buffer)));
}

export function sanitizeLeadName(value) {
  return String(value || "")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, NAME_MAX);
}

export function sanitizeLeadPhone(value) {
  return String(value || "")
    .replace(/[^\d+\s-]/g, "")
    .slice(0, PHONE_MAX);
}

export function sanitizeLeadEmail(value) {
  return String(value || "")
    .replace(/\s/g, "")
    .slice(0, EMAIL_MAX);
}

export function sanitizeLeadMessage(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .slice(0, MESSAGE_MAX);
}

export function validateLeadName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > NAME_MAX) return `Name cannot exceed ${NAME_MAX} characters`;
  if (!NAME_REGEX.test(trimmed)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes";
  }
  if (containsVulgarLanguage(trimmed)) return VULGAR_MESSAGE;
  const normalized = normalizeName(trimmed);
  if (BLOCKED_NAMES.has(normalized) || normalized.split(" ").some((t) => BLOCKED_NAME_TOKENS.has(t))) {
    return "Please enter a valid name";
  }
  if (/^(.)\1+$/i.test(trimmed.replace(/\s/g, ""))) {
    return "Please enter a valid name";
  }
  return "";
}

export function validateLeadEmail(email) {
  const trimmed = String(email || "").trim().toLowerCase();
  if (!trimmed) return "Email is required";
  if (trimmed.length > EMAIL_MAX) return "Please enter a valid email address";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address";
  if (containsVulgarLanguage(trimmed.split("@")[0])) return VULGAR_MESSAGE;

  const [localRaw, domain] = trimmed.split("@");
  const local = (localRaw || "").split("+")[0];
  const localBase = local.replace(/[._-]/g, "");

  if (
    BLOCKED_EMAIL_LOCALS.has(local) ||
    BLOCKED_EMAIL_LOCALS.has(localBase) ||
    /^test(\d+)?$/.test(local) ||
    /^test(\d+)?$/.test(localBase) ||
    local.includes("dummy") ||
    local.includes("sample") ||
    local.includes("fakeuser") ||
    local === "fake"
  ) {
    return "Please enter a valid email address";
  }

  if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return "Please enter a valid email address";
  }

  return "";
}

export function validateLeadPhone(phone) {
  if (!String(phone || "").trim()) return "Phone number is required";

  const cleaned = normalizeIndianPhone(phone);
  if (!/^\d+$/.test(cleaned)) {
    return "Enter a valid 10-digit mobile number";
  }
  if (cleaned.length !== 10) {
    return "Phone number must be exactly 10 digits";
  }
  if (!/^[6-9]/.test(cleaned)) {
    return "Phone number must start with 6, 7, 8, or 9";
  }
  if (/^(\d)\1{9}$/.test(cleaned) || isSequentialDigits(cleaned) || BLOCKED_PHONES.has(cleaned)) {
    return "Please enter a valid phone number";
  }
  return "";
}

export function validateLeadMessage(message, { required = false } = {}) {
  const trimmed = String(message || "").trim();
  if (!trimmed) return required ? "Message is required" : "";
  if (trimmed.length < 3) return "Message is too short";
  if (trimmed.length > MESSAGE_MAX) return `Message cannot exceed ${MESSAGE_MAX} characters`;
  if (containsVulgarLanguage(trimmed)) return VULGAR_MESSAGE;
  if (/(https?:\/\/|www\.)/i.test(trimmed)) {
    return "Links are not allowed in this field";
  }
  return "";
}

/**
 * @returns {{ name: string, email: string, phone: string, message: string, project: string, isValid: boolean, firstError: string }}
 */
export function validateLeadFields({
  name,
  email,
  phone,
  message,
  project,
  requireMessage = false,
  requireProject = false,
} = {}) {
  const errors = {
    name: validateLeadName(name),
    email: validateLeadEmail(email),
    phone: validateLeadPhone(phone),
    message:
      requireMessage || String(message || "").trim()
        ? validateLeadMessage(message, { required: requireMessage })
        : "",
    project: requireProject && !String(project || "").trim() ? "Please select a project" : "",
  };
  const firstError =
    errors.name || errors.email || errors.phone || errors.message || errors.project || "";
  return {
    ...errors,
    isValid: !firstError,
    firstError,
  };
}

/** Server-style rejection message, or empty string if the payload is acceptable. */
export function rejectLeadReason(fields) {
  return validateLeadFields(fields).firstError;
}
