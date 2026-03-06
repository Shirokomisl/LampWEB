const nodemailer = require("nodemailer");
const dns = require("dns").promises;

const { getClientIp } = require("./contactSecurityService");

const MIN_SUBMIT_DELAY_MS = Number(process.env.CONTACT_MIN_SUBMIT_DELAY_MS || 2500);
const MAX_SUBMIT_AGE_MS = Number(process.env.CONTACT_MAX_SUBMIT_AGE_MS || 2 * 60 * 60 * 1000);
const MIN_MESSAGE_LENGTH = Number(process.env.CONTACT_MIN_MESSAGE_LENGTH || 5);
const RECAPTCHA_VERIFY_TIMEOUT_MS = Number(process.env.RECAPTCHA_VERIFY_TIMEOUT_MS || 10000);
const SMTP_CONNECTION_TIMEOUT_MS = Number(process.env.CONTACT_SMTP_CONNECTION_TIMEOUT_MS || 10000);
const SMTP_GREETING_TIMEOUT_MS = Number(process.env.CONTACT_SMTP_GREETING_TIMEOUT_MS || 10000);
const SMTP_SOCKET_TIMEOUT_MS = Number(process.env.CONTACT_SMTP_SOCKET_TIMEOUT_MS || 15000);
const SMTP_SEND_TIMEOUT_MS = Number(process.env.CONTACT_SMTP_SEND_TIMEOUT_MS || 20000);
const SMTP_FORCE_IPV4 = String(process.env.CONTACT_SMTP_FORCE_IPV4 || "true") === "true";

let smtpTransporter = null;
let smtpTransporterCacheKey = "";

const withTimeout = (promise, timeoutMs, timeoutCode) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const timeoutError = new Error(timeoutCode);
      timeoutError.code = timeoutCode;
      reject(timeoutError);
    }, timeoutMs);

    promise
      .then((result) => resolve(result))
      .catch((error) => reject(error))
      .finally(() => clearTimeout(timer));
  });

const normalizeSingleLine = (value, maxLength) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);

const normalizeMultiline = (value, maxLength) =>
  String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);

const isValidName = (nameValue) => /^[\p{L}\d .,'-]{2,80}$/u.test(nameValue);
const isValidPhone = (phoneValue) => /^[+\d\s().-]{7,30}$/.test(phoneValue);
const isCaptchaEnabled = () => process.env.CONTACT_CAPTCHA_ENABLED !== "false";
const getRecaptchaSecretKey = () =>
  String(
    process.env.RECAPTCHA_SECRET_KEY ||
      ""
  ).trim();

const validateContactSubmission = (formData) => {
  const websiteField = normalizeSingleLine(formData.website, 256);

  if (websiteField) {
    return { ok: false, code: "spam_detected" };
  }

  const formStartedAt = Number(formData.formStartedAt);

  if (!Number.isFinite(formStartedAt)) {
    return { ok: false, code: "spam_detected" };
  }

  const elapsedMs = Date.now() - formStartedAt;

  if (elapsedMs < MIN_SUBMIT_DELAY_MS || elapsedMs > MAX_SUBMIT_AGE_MS) {
    return { ok: false, code: "spam_detected" };
  }

  const name = normalizeSingleLine(formData.name, 80);
  const phone = normalizeSingleLine(formData.phone, 30);
  const message = normalizeMultiline(formData.message, 2000);
  const formOrigin = normalizeSingleLine(formData.formOrigin, 40);

  if (!name) {
    return { ok: false, code: "invalid_name" };
  }

  if (!phone) {
    return { ok: false, code: "invalid_phone" };
  }

  if (!message) {
    return { ok: false, code: "invalid_message" };
  }

  if (!isValidName(name)) {
    return { ok: false, code: "invalid_name" };
  }

  if (!isValidPhone(phone)) {
    return { ok: false, code: "invalid_phone" };
  }

  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { ok: false, code: "invalid_phone" };
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return { ok: false, code: "invalid_message" };
  }

  return {
    ok: true,
    payload: {
      name,
      phone,
      message,
      formOrigin: formOrigin || "site-form"
    }
  };
};

const verifyRecaptchaToken = async (tokenValue, clientIp) => {
  if (!isCaptchaEnabled()) {
    return { ok: true };
  }

  const recaptchaSecretKey = getRecaptchaSecretKey();

  if (!recaptchaSecretKey) {
    console.warn("[contact:captcha] reCAPTCHA secret is missing", {
      cwd: process.cwd(),
      captchaEnabled: isCaptchaEnabled(),
      hasSiteKey: Boolean(process.env.RECAPTCHA_SITE_KEY),
      hasSecretKey: Boolean(process.env.RECAPTCHA_SECRET_KEY)
    });
    return { ok: false, code: "captcha_not_configured" };
  }

  const token = normalizeSingleLine(tokenValue, 4096);

  if (!token) {
    return { ok: false, code: "captcha_failed" };
  }

  const requestBody = new URLSearchParams({
    secret: recaptchaSecretKey,
    response: token
  });

  if (clientIp) {
    requestBody.set("remoteip", clientIp);
  }

  try {
    const requestPromise = fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestBody
    });
    const response = await withTimeout(
      requestPromise,
      RECAPTCHA_VERIFY_TIMEOUT_MS,
      "recaptcha_timeout"
    );

    if (!response.ok) {
      console.warn("[contact:captcha] reCAPTCHA verify HTTP error", {
        status: response.status
      });
      return { ok: false, code: "captcha_failed" };
    }

    const result = await response.json();

    if (!result.success) {
      const errorCodes = Array.isArray(result["error-codes"]) ? result["error-codes"] : [];

      if (
        errorCodes.includes("invalid-input-secret") ||
        errorCodes.includes("missing-input-secret")
      ) {
        console.warn("[contact:captcha] reCAPTCHA secret rejected by Google", {
          cwd: process.cwd(),
          hasSiteKey: Boolean(process.env.RECAPTCHA_SITE_KEY),
          hasSecretKey: Boolean(process.env.RECAPTCHA_SECRET_KEY),
          errorCodes
        });
        return { ok: false, code: "captcha_not_configured" };
      }

      return { ok: false, code: "captcha_failed" };
    }

    return { ok: true };
  } catch (error) {
    if (error && error.code === "recaptcha_timeout") {
      console.warn("[contact:captcha] reCAPTCHA verify timeout");
    } else {
      console.warn("[contact:captcha] reCAPTCHA verify failed", {
        message: error?.message || "unknown_error"
      });
    }
    return { ok: false, code: "captcha_failed" };
  }
};

const resolveSmtpHost = async (host) => {
  if (!SMTP_FORCE_IPV4) {
    return { host, servername: null };
  }

  try {
    const ipv4List = await dns.resolve4(host);
    if (Array.isArray(ipv4List) && ipv4List.length > 0) {
      return { host: ipv4List[0], servername: host };
    }
  } catch (error) {
    console.warn("[contact:smtp] IPv4 resolve failed, fallback to original host", {
      host,
      message: error?.message || "unknown_error"
    });
  }

  return { host, servername: null };
};

const getSmtpTransporter = async () => {
  const host = process.env.CONTACT_SMTP_HOST;
  const port = Number(process.env.CONTACT_SMTP_PORT || 587);
  const secure = String(process.env.CONTACT_SMTP_SECURE || "false") === "true";
  const user = process.env.CONTACT_SMTP_USER;
  const pass = process.env.CONTACT_SMTP_PASS;
  const fromEmail = process.env.CONTACT_SMTP_FROM || process.env.CONTACT_SMTP_USER;

  const cacheKey = [
    host,
    port,
    secure,
    user,
    pass ? "has-pass" : "no-pass",
    fromEmail,
    SMTP_FORCE_IPV4 ? "ipv4" : "any"
  ].join("|");

  if (smtpTransporter && smtpTransporterCacheKey === cacheKey) {
    return smtpTransporter;
  }

  if (!host || !Number.isFinite(port) || !user || !pass) {
    return null;
  }

  const resolvedSmtp = await resolveSmtpHost(host);
  const tlsOptions = resolvedSmtp.servername ? { servername: resolvedSmtp.servername } : undefined;

  smtpTransporter = nodemailer.createTransport({
    host: resolvedSmtp.host,
    port,
    secure,
    connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
    greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
    socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
    tls: tlsOptions,
    auth: {
      user,
      pass
    }
  });
  smtpTransporterCacheKey = cacheKey;

  return smtpTransporter;
};

const sendContactNotification = async ({ payload, sourcePath, req }) => {
  const transporter = await getSmtpTransporter();
  const toEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const fromEmail = process.env.CONTACT_SMTP_FROM || process.env.CONTACT_SMTP_USER;

  if (!transporter || !toEmail || !fromEmail) {
    return { ok: false, code: "smtp_not_configured" };
  }

  const clientIp = getClientIp(req) || "unknown";
  const userAgent = String(req.get("user-agent") || "unknown");
  const submittedAt = new Date().toISOString();

  const sendPromise = transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: `[GEOMETRIA] Новая заявка (${payload.formOrigin})`,
    text: [
      "Новая заявка с сайта GEOMETRIA",
      `Источник формы: ${payload.formOrigin}`,
      `Страница: ${sourcePath}`,
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      "Сообщение:",
      payload.message,
      "",
      `IP: ${clientIp}`,
      `User-Agent: ${userAgent}`,
      `Время (UTC): ${submittedAt}`
    ].join("\n")
  });
  const mailResult = await withTimeout(sendPromise, SMTP_SEND_TIMEOUT_MS, "smtp_send_timeout");

  return { ok: true, messageId: mailResult.messageId };
};

const processContactSubmission = async ({ req, sourcePath, formData }) => {
  const startedAt = Date.now();
  const validationResult = validateContactSubmission(formData);

  if (!validationResult.ok) {
    console.warn("[contact-submit] validation failed", {
      code: validationResult.code,
      sourcePath
    });
    return validationResult;
  }

  const captchaResult = await verifyRecaptchaToken(
    formData["g-recaptcha-response"],
    getClientIp(req)
  );

  if (!captchaResult.ok) {
    console.warn("[contact-submit] captcha failed", {
      code: captchaResult.code,
      sourcePath
    });
    return captchaResult;
  }

  try {
    const deliveryResult = await sendContactNotification({
      payload: validationResult.payload,
      sourcePath,
      req
    });

    if (!deliveryResult.ok) {
      console.warn("[contact-submit] delivery failed", {
        code: deliveryResult.code,
        sourcePath
      });
      return deliveryResult;
    }
  } catch (error) {
    const smtpNetworkErrorCodes = new Set([
      "ETIMEDOUT",
      "ESOCKET",
      "ECONNECTION",
      "ECONNREFUSED",
      "ENETUNREACH",
      "EHOSTUNREACH",
      "smtp_send_timeout"
    ]);
    const mappedCode = smtpNetworkErrorCodes.has(error?.code)
      ? "smtp_unreachable"
      : "delivery_failed";

    console.error("[contact-submit] delivery exception", {
      code: error?.code || mappedCode,
      message: error?.message || "unknown_error",
      sourcePath
    });
    return { ok: false, code: mappedCode };
  }

  console.info("[contact-submit] sent", {
    sourcePath,
    elapsedMs: Date.now() - startedAt
  });
  return { ok: true, code: "sent" };
};

module.exports = {
  processContactSubmission
};
