const nodemailer = require("nodemailer");

const { getClientIp } = require("./contactSecurityService");

const MIN_SUBMIT_DELAY_MS = Number(process.env.CONTACT_MIN_SUBMIT_DELAY_MS || 2500);
const MAX_SUBMIT_AGE_MS = Number(process.env.CONTACT_MAX_SUBMIT_AGE_MS || 2 * 60 * 60 * 1000);

const CONTACT_CAPTCHA_ENABLED = process.env.CONTACT_CAPTCHA_ENABLED !== "false";
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

let smtpTransporter = null;

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

  if (!name || !phone || !message) {
    return { ok: false, code: "invalid_data" };
  }

  if (!isValidName(name) || !isValidPhone(phone)) {
    return { ok: false, code: "invalid_data" };
  }

  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 10 || phoneDigits.length > 15 || message.length < 10) {
    return { ok: false, code: "invalid_data" };
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

const verifyTurnstileToken = async (tokenValue, clientIp) => {
  if (!CONTACT_CAPTCHA_ENABLED) {
    return { ok: true };
  }

  if (!TURNSTILE_SECRET_KEY) {
    return { ok: false, code: "captcha_not_configured" };
  }

  const token = normalizeSingleLine(tokenValue, 4096);

  if (!token) {
    return { ok: false, code: "captcha_failed" };
  }

  const requestBody = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY,
    response: token
  });

  if (clientIp) {
    requestBody.set("remoteip", clientIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestBody
    });

    if (!response.ok) {
      return { ok: false, code: "captcha_failed" };
    }

    const result = await response.json();

    if (!result.success) {
      return { ok: false, code: "captcha_failed" };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, code: "captcha_failed" };
  }
};

const getSmtpTransporter = () => {
  if (smtpTransporter) {
    return smtpTransporter;
  }

  const host = process.env.CONTACT_SMTP_HOST;
  const port = Number(process.env.CONTACT_SMTP_PORT || 587);
  const secure = String(process.env.CONTACT_SMTP_SECURE || "false") === "true";
  const user = process.env.CONTACT_SMTP_USER;
  const pass = process.env.CONTACT_SMTP_PASS;

  if (!host || !Number.isFinite(port) || !user || !pass) {
    return null;
  }

  smtpTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });

  return smtpTransporter;
};

const sendContactNotification = async ({ payload, sourcePath, req }) => {
  const transporter = getSmtpTransporter();
  const toEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const fromEmail = process.env.CONTACT_SMTP_FROM || process.env.CONTACT_SMTP_USER;

  if (!transporter || !toEmail || !fromEmail) {
    return { ok: false, code: "smtp_not_configured" };
  }

  const clientIp = getClientIp(req) || "unknown";
  const userAgent = String(req.get("user-agent") || "unknown");
  const submittedAt = new Date().toISOString();

  const mailResult = await transporter.sendMail({
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

  return { ok: true, messageId: mailResult.messageId };
};

const processContactSubmission = async ({ req, sourcePath, formData }) => {
  const validationResult = validateContactSubmission(formData);

  if (!validationResult.ok) {
    return validationResult;
  }

  const captchaResult = await verifyTurnstileToken(
    formData["cf-turnstile-response"],
    getClientIp(req)
  );

  if (!captchaResult.ok) {
    return captchaResult;
  }

  try {
    const deliveryResult = await sendContactNotification({
      payload: validationResult.payload,
      sourcePath,
      req
    });

    if (!deliveryResult.ok) {
      return deliveryResult;
    }
  } catch (error) {
    return { ok: false, code: "delivery_failed" };
  }

  return { ok: true, code: "sent" };
};

module.exports = {
  processContactSubmission
};
