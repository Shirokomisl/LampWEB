const crypto = require("crypto");

const CSRF_SECRET =
  process.env.CONTACT_CSRF_SECRET ||
  process.env.SESSION_SECRET ||
  crypto.randomBytes(32).toString("hex");

const CSRF_MAX_AGE_MS = Number(process.env.CONTACT_CSRF_MAX_AGE_MS || 2 * 60 * 60 * 1000);

const getClientIp = (req) => {
  const forwardedHeader = req.headers["x-forwarded-for"];
  const forwardedIp = Array.isArray(forwardedHeader)
    ? forwardedHeader[0]
    : typeof forwardedHeader === "string"
      ? forwardedHeader.split(",")[0]
      : "";

  return (forwardedIp || req.ip || "").trim();
};

const buildRequestFingerprint = (req) => {
  const clientIp = getClientIp(req);
  const userAgent = String(req.get("user-agent") || "");
  return crypto.createHash("sha256").update(`${clientIp}|${userAgent}`).digest("hex");
};

const signTokenPayload = (payloadText) =>
  crypto.createHmac("sha256", CSRF_SECRET).update(payloadText).digest("hex");

const createCsrfToken = (req) => {
  const issuedAt = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const fingerprint = buildRequestFingerprint(req);
  const payload = `${issuedAt}.${nonce}.${fingerprint}`;
  const signature = signTokenPayload(payload);

  return `${issuedAt}.${nonce}.${signature}`;
};

const constantTimeEqual = (leftValue, rightValue) => {
  const leftBuffer = Buffer.from(leftValue);
  const rightBuffer = Buffer.from(rightValue);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const verifyCsrfToken = (req, tokenValue) => {
  if (typeof tokenValue !== "string" || tokenValue.length < 32) {
    return false;
  }

  const tokenParts = tokenValue.split(".");

  if (tokenParts.length !== 3) {
    return false;
  }

  const [issuedAtRaw, nonce, providedSignature] = tokenParts;
  const issuedAt = Number(issuedAtRaw);

  if (!Number.isFinite(issuedAt) || !nonce || !providedSignature) {
    return false;
  }

  const tokenAgeMs = Date.now() - issuedAt;

  if (tokenAgeMs < 0 || tokenAgeMs > CSRF_MAX_AGE_MS) {
    return false;
  }

  const fingerprint = buildRequestFingerprint(req);
  const signedPayload = `${issuedAtRaw}.${nonce}.${fingerprint}`;
  const expectedSignature = signTokenPayload(signedPayload);

  return constantTimeEqual(providedSignature, expectedSignature);
};

module.exports = {
  createCsrfToken,
  verifyCsrfToken,
  getClientIp
};
