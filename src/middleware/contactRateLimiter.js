const { buildContactRedirectUrl, resolveSafeSourcePath } = require("../services/contactFormService");
const { getClientIp } = require("../services/contactSecurityService");

const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS || 8);

const ipBuckets = new Map();

const cleanupStaleBuckets = (now) => {
  for (const [bucketKey, timestamps] of ipBuckets.entries()) {
    const freshTimestamps = timestamps.filter(
      (timestamp) => now - timestamp <= RATE_LIMIT_WINDOW_MS
    );

    if (freshTimestamps.length === 0) {
      ipBuckets.delete(bucketKey);
      continue;
    }

    ipBuckets.set(bucketKey, freshTimestamps);
  }
};

const contactRateLimiter = (req, res, next) => {
  const now = Date.now();
  const bucketKey = getClientIp(req) || "unknown";
  const sourcePath = resolveSafeSourcePath(req.body.sourcePath);

  if (ipBuckets.size > 5000) {
    cleanupStaleBuckets(now);
  }

  const currentBucket = ipBuckets.get(bucketKey) || [];
  const freshBucket = currentBucket.filter((timestamp) => now - timestamp <= RATE_LIMIT_WINDOW_MS);

  if (freshBucket.length >= RATE_LIMIT_MAX_REQUESTS) {
    return res.redirect(303, buildContactRedirectUrl(sourcePath, "error", "rate_limited"));
  }

  freshBucket.push(now);
  ipBuckets.set(bucketKey, freshBucket);
  return next();
};

module.exports = {
  contactRateLimiter
};
