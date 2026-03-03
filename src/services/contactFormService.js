const { createCsrfToken } = require("./contactSecurityService");

const MIN_SUBMIT_DELAY_MS = Number(process.env.CONTACT_MIN_SUBMIT_DELAY_MS || 2500);

const isCaptchaEnabled = () =>
  process.env.CONTACT_CAPTCHA_ENABLED !== "false" && Boolean(process.env.TURNSTILE_SITE_KEY);

const normalizePath = (pathValue) => {
  if (typeof pathValue !== "string") {
    return "";
  }

  const withoutProtocol = pathValue.replace(/^[a-z]+:\/\//i, "");
  const slashIndex = withoutProtocol.indexOf("/");
  const safeValue = slashIndex >= 0 ? withoutProtocol.slice(slashIndex) : pathValue;

  return safeValue.split("#")[0].split("?")[0].trim();
};

const isAllowedSourcePath = (pathValue) =>
  /^\/$/.test(pathValue) ||
  /^\/contacts$/.test(pathValue) ||
  /^\/catalog\/product\/[a-z0-9-]+$/.test(pathValue);

const resolveSafeSourcePath = (pathValue) => {
  const normalizedPath = normalizePath(pathValue);

  if (!normalizedPath.startsWith("/") || normalizedPath.startsWith("//")) {
    return "/contacts";
  }

  return isAllowedSourcePath(normalizedPath) ? normalizedPath : "/contacts";
};

const buildContactRedirectUrl = (sourcePath, status, code) => {
  const targetPath = resolveSafeSourcePath(sourcePath);
  const query = new URLSearchParams({
    contactStatus: status,
    contactCode: code
  });

  return `${targetPath}?${query.toString()}#contact-point`;
};

const feedbackMap = {
  sent: {
    type: "success",
    text: "Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время."
  },
  invalid_data: {
    type: "error",
    text: "Проверьте корректность полей формы и попробуйте снова."
  },
  invalid_name: {
    type: "error",
    text: "Проверьте поле «Имя»: от 2 до 80 символов."
  },
  invalid_phone: {
    type: "error",
    text: "Проверьте поле «Телефон»: требуется корректный номер (10-15 цифр)."
  },
  invalid_message: {
    type: "error",
    text: "Проверьте поле «Сообщение»: текст слишком короткий."
  },
  csrf_failed: {
    type: "error",
    text: "Сессия формы истекла. Обновите страницу и отправьте заявку повторно."
  },
  captcha_failed: {
    type: "error",
    text: "Не удалось подтвердить капчу. Повторите проверку и отправьте форму снова."
  },
  captcha_not_configured: {
    type: "error",
    text: "Капча не настроена на сервере. Обратитесь к администратору сайта."
  },
  rate_limited: {
    type: "error",
    text: "Слишком много запросов. Подождите немного и повторите отправку."
  },
  spam_detected: {
    type: "error",
    text: "Запрос отклонен системой защиты. Попробуйте отправить форму еще раз."
  },
  smtp_not_configured: {
    type: "error",
    text: "Почтовый сервис не настроен. Временно отправка недоступна."
  },
  delivery_failed: {
    type: "error",
    text: "Не удалось отправить заявку. Повторите попытку через несколько минут."
  },
  unknown_error: {
    type: "error",
    text: "Произошла ошибка при отправке. Попробуйте еще раз."
  }
};

const getContactFeedback = (queryObject) => {
  const statusValue = typeof queryObject.contactStatus === "string" ? queryObject.contactStatus : "";
  const codeValue = typeof queryObject.contactCode === "string" ? queryObject.contactCode : "";

  if (!statusValue || !codeValue || !feedbackMap[codeValue]) {
    return null;
  }

  const feedbackItem = feedbackMap[codeValue];

  if (statusValue === "success" && feedbackItem.type === "success") {
    return feedbackItem;
  }

  if (statusValue === "error" && feedbackItem.type === "error") {
    return feedbackItem;
  }

  return null;
};

const buildContactFormView = (req, sourcePath, formOrigin) => ({
  action: "/contact/submit",
  sourcePath: resolveSafeSourcePath(sourcePath),
  formOrigin,
  csrfToken: createCsrfToken(req),
  formStartedAt: Date.now(),
  minSubmitDelayMs: MIN_SUBMIT_DELAY_MS,
  captchaEnabled: isCaptchaEnabled(),
  captchaSiteKey: process.env.TURNSTILE_SITE_KEY || ""
});

module.exports = {
  buildContactFormView,
  buildContactRedirectUrl,
  getContactFeedback,
  resolveSafeSourcePath,
  isCaptchaEnabled
};
