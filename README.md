# GEOMETRIA Lamp Store (Express + EJS, MVC)

Сайт премиального бренда светильников на `Express + EJS` с MVC-структурой.

Актуально реализовано:
- главная страница;
- каталог и карточка товара;
- страница контактов;
- страница «О бренде»;
- рабочая backend-отправка форм обратной связи с защитой.

## 1. Стек

- Node.js 18+
- Express 4
- EJS
- Helmet (security headers/CSP)
- Nodemailer (SMTP-отправка)
- Cloudflare Turnstile (captcha)

## 2. Быстрый запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## 3. Маршруты

- `GET /` — главная
- `GET /about` — о бренде
- `GET /contacts` — контакты
- `GET /catalog` — каталог
- `GET /catalog/type/:typeSlug` — каталог по типу
- `GET /catalog/product/:productSlug` — карточка товара
- `POST /contact/submit` — защищенная отправка формы

## 4. Что нужно настроить вам (обязательно)

Создайте файл `.env` в корне проекта.

Минимальный рабочий пример:

```env
PORT=3000
TRUST_PROXY=0

# --- CAPTCHA (Cloudflare Turnstile) ---
CONTACT_CAPTCHA_ENABLED=true
TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# --- SMTP (почта для заявок) ---
CONTACT_SMTP_HOST=smtp.example.com
CONTACT_SMTP_PORT=587
CONTACT_SMTP_SECURE=false
CONTACT_SMTP_USER=no-reply@example.com
CONTACT_SMTP_PASS=your_password
CONTACT_SMTP_FROM="GEOMETRIA <no-reply@example.com>"
CONTACT_RECEIVER_EMAIL=sales@example.com

# --- Защита формы ---
CONTACT_CSRF_SECRET=long_random_secret
CONTACT_CSRF_MAX_AGE_MS=7200000
CONTACT_MIN_SUBMIT_DELAY_MS=2500
CONTACT_MAX_SUBMIT_AGE_MS=7200000
CONTACT_RATE_LIMIT_WINDOW_MS=600000
CONTACT_RATE_LIMIT_MAX_REQUESTS=8
```

### Где получить ключи капчи

1. Зарегистрируйте сайт в Cloudflare Turnstile.
2. Получите `SITE KEY` и `SECRET KEY`.
3. Подставьте в `.env` как `TURNSTILE_SITE_KEY` и `TURNSTILE_SECRET_KEY`.

### SMTP

Используйте SMTP вашего почтового провайдера (Mail.ru, Yandex, корпоративная почта и т.д.).

Важно:
- `CONTACT_SMTP_FROM` должен быть разрешен вашим SMTP-сервером;
- `CONTACT_RECEIVER_EMAIL` — адрес, куда приходят заявки.

## 5. Как работает отправка заявок

Источник форм:
- `src/views/home/index.ejs`
- `src/views/contacts/index.ejs`
- `src/views/catalog/product.ejs`

Все формы отправляют в `POST /contact/submit`.

Пайплайн обработки:
1. **Rate limit по IP** (`src/middleware/contactRateLimiter.js`).
2. **CSRF-проверка** токена (`src/services/contactSecurityService.js`).
3. **Антиспам-проверки** (`src/services/contactService.js`):
   - honeypot-поле `website` должно быть пустым;
   - проверка времени заполнения формы (`formStartedAt`);
   - валидация имени/телефона/сообщения.
4. **Проверка Cloudflare Turnstile** на сервере.
5. **SMTP-отправка письма** через Nodemailer.
6. Redirect обратно на исходную страницу с результатом (`success/error`) и сообщением.

## 6. Реализованные меры безопасности

- CSP + security headers через Helmet (`app.js`)
- CSRF токен (HMAC + срок жизни + fingerprint запроса)
- Rate limiting отправок
- Honeypot поле
- Проверка минимального времени заполнения формы
- Серверная валидация входных данных
- Captcha verification на backend
- Ограничение размера body (`25kb`)

## 7. Где менять контент

### Главная / Контакты / О бренде
`src/models/productCatalogModel.js`

### Каталог и карточки товаров
`src/models/catalogPageModel.js`

## 8. Настройка галереи фото в карточке товара

Файл: `src/models/catalogPageModel.js`

Для каждого товара в `CATALOG_PRODUCTS` можно задать:

```js
gallery: [
  { image: "/images/example-1.jpg", title: "Подпись 1" },
  { image: "/images/example-2.jpg", title: "Подпись 2" }
]
```

Если `gallery` не задана, используется fallback-галерея (из фото текущего и похожих товаров).

## 9. Основные backend-файлы по контактам

- `src/controllers/homeController.js` — рендер + `submitContact`
- `src/routes/webRoutes.js` — маршрут `POST /contact/submit`
- `src/services/contactSecurityService.js` — CSRF + IP
- `src/services/contactFormService.js` — form view state + feedback + safe redirects
- `src/services/contactService.js` — валидация, captcha verify, SMTP send
- `src/middleware/contactRateLimiter.js` — ограничение частоты отправок

## 10. Проверка после настройки

1. Откройте главную/контакты/карточку товара.
2. Убедитесь, что капча отображается.
3. Отправьте тестовую заявку.
4. Проверьте, что пришло письмо на `CONTACT_RECEIVER_EMAIL`.
5. Проверьте защиту:
   - отправка без капчи должна отклоняться;
   - слишком частые отправки — `rate_limited`;
   - при обновлении/просрочке токена — `csrf_failed`.

## 11. Примечания по продакшену

- За reverse proxy выставьте корректный `TRUST_PROXY`.
- Используйте отдельный почтовый ящик для отправки форм.
- Регулярно ротируйте `CONTACT_CSRF_SECRET`.
- Включите мониторинг ошибок и SMTP-метрик.

## 12. Статус Netlify-развертывания

Проект развернут в Netlify и доступен по адресу:
- Production URL: `https://geometria-test.netlify.app`
- Deploy details: `https://app.netlify.com/projects/geometria-test/deploys`

Технически используется SSR через Netlify Function:
- entrypoint функции: `netlify/functions/server.js`
- конфиг: `netlify.toml`
- правило маршрутизации: все нестатические URL проксируются в `/.netlify/functions/server`

## 13. Что обязательно сделать в Netlify

Откройте:
- Site configuration -> Environment variables

Добавьте значения:
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `CONTACT_SMTP_HOST`
- `CONTACT_SMTP_PORT`
- `CONTACT_SMTP_SECURE`
- `CONTACT_SMTP_USER`
- `CONTACT_SMTP_PASS`
- `CONTACT_SMTP_FROM`
- `CONTACT_RECEIVER_EMAIL`
- `CONTACT_CSRF_SECRET`

После добавления переменных выполните redeploy (Deploys -> Trigger deploy).

## 14. Команды для повторного деплоя

Локальная проверка через Netlify:
```bash
npm run netlify:dev
```

Продакшен-деплой:
```bash
npm run netlify:deploy
```

Если нужен деплой в другой Netlify-сайт:
```bash
netlify unlink
netlify link
npm run netlify:deploy
```
