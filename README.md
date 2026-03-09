# GEOMETRIA Lamp Store (Express + EJS, MVC)

Проект перенастроен под развертывание на **Timeweb** (Node.js/PM2), без Netlify-обвязки.

## 1. Что изменено для Timeweb

- Удалена serverless-конфигурация Netlify:
  - удален `netlify.toml`
  - удален `netlify/functions/server.js`
  - удалена зависимость `serverless-http`
  - удалены npm-скрипты `netlify:*`
- Возвращен обычный Express runtime:
  - сервер слушает `HOST` и `PORT` (`app.js`)
  - статические файлы и views читаются из локальной структуры проекта
- Добавлена PM2-конфигурация:
  - `ecosystem.config.cjs`
  - npm-скрипты для PM2 в `package.json`

## 2. Актуальная структура проекта

```text
app.js
package.json
package-lock.json
.env.example
ecosystem.config.cjs
README.md

public/
  css/
  js/
  images/
  videos/

src/
  controllers/
  middleware/
  models/
  routes/
  services/
  views/
    about/
    catalog/
    contacts/
    home/
    partials/
    placeholders/
```

## 3. Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## 4. Переменные окружения

Создайте `.env` на основе `.env.example`.

Минимум для запуска:

```env
PORT=3000
HOST=0.0.0.0
TRUST_PROXY=0
```

Для рабочей отправки заявок обязательно заполнить:

```env
CONTACT_CAPTCHA_ENABLED=true
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

CONTACT_SMTP_HOST=
CONTACT_SMTP_PORT=587
CONTACT_SMTP_SECURE=false
CONTACT_SMTP_USER=
CONTACT_SMTP_PASS=
CONTACT_SMTP_FROM=
CONTACT_RECEIVER_EMAIL=

CONTACT_CSRF_SECRET=
CONTACT_CSRF_MAX_AGE_MS=7200000
CONTACT_MIN_SUBMIT_DELAY_MS=2500
CONTACT_MAX_SUBMIT_AGE_MS=7200000
CONTACT_RATE_LIMIT_WINDOW_MS=600000
CONTACT_RATE_LIMIT_MAX_REQUESTS=8
```

## 5. Развертывание на Timeweb

Ниже два рабочих сценария. Выберите один.

### Вариант A: Timeweb Apps (Node.js)

1. Загрузите проект в Git-репозиторий.
2. В панели Timeweb создайте приложение из репозитория.
3. Укажите команды:
   - Install: `npm install`
   - Start: `npm start`
4. Добавьте env variables из раздела 4.
5. Убедитесь, что порт в окружении совпадает с портом платформы (обычно Timeweb прокидывает `PORT` автоматически).
6. Выполните Deploy.

### Вариант B: Timeweb Cloud/VPS (PM2 + Nginx)

1. На сервере:
   - установить Node.js LTS
   - установить PM2: `npm i -g pm2`
2. Склонировать проект и выполнить `npm install`.
3. Создать `.env`.
4. Запустить PM2:
   - `npm run start:pm2`
5. Настроить Nginx reverse proxy на `127.0.0.1:3000`.
6. Включить автозапуск PM2:
   - `pm2 startup`
   - `pm2 save`

## 6. PM2 команды

```bash
npm run start:pm2
npm run reload:pm2
npm run logs:pm2
```

## 7. Контактные формы (backend)

Формы подключены к `POST /contact/submit` и защищены:

- CSRF token
- rate limit
- honeypot
- задержка минимального времени заполнения
- server-side валидация полей
- Google reCAPTCHA (captcha)
- отправка по SMTP через Nodemailer

Ключевые файлы:

- `src/controllers/homeController.js`
- `src/routes/webRoutes.js`
- `src/services/contactSecurityService.js`
- `src/services/contactFormService.js`
- `src/services/contactService.js`
- `src/middleware/contactRateLimiter.js`

## 8. Что требуется от вас вручную

Я не могу выполнить эти шаги за вас без доступа к вашему Timeweb-аккаунту и секретам:

1. Создать/выбрать приложение в панели Timeweb.
2. Указать команды сборки/старта (см. раздел 5).
3. Заполнить env variables (SMTP + reCAPTCHA + CSRF secret).
4. Подключить домен и SSL (если требуется).
5. Проверить отправку формы после деплоя.

## 9. Проверка после деплоя

1. Откройте `/`, `/catalog`, `/contacts`.
2. Проверьте загрузку статики (`/css/styles.css`, изображения, видео).
3. Отправьте тестовую заявку.
4. Убедитесь, что письмо пришло на `CONTACT_RECEIVER_EMAIL`.
5. Проверьте, что при некорректной отправке отрабатывают ошибки защиты.

## 10. Обновление на сервере (git + PM2)

1. Забрать изменения:
   - `git pull`
2. Обновить зависимости, если изменились `package.json`/`package-lock.json`:
   - `npm ci`
3. Перезапустить PM2 (использовать глобальный `pm2`, не `npx pm2`):
   - `pm2 restart geometria-web --update-env`
4. Проверка:
   - `pm2 status`
   - `curl -I http://127.0.0.1:3000/`
