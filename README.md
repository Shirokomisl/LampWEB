# GEOMETRIA Lamp Store (Express + EJS, MVC)

Актуальная версия проекта: многостраничный сайт премиального бренда светильников с MVC-структурой, отдельными страницами `home`, `contacts`, `catalog`, карточкой товара и интерактивом на фронтенде.

## 1. Технологии

- Node.js 18+
- Express 4
- EJS
- Vanilla CSS + JS

## 2. Запуск

1. Установить зависимости:

```bash
npm install
```

2. Запуск в dev-режиме:

```bash
npm run dev
```

3. Открыть:

```text
http://localhost:3000
```

## 3. Актуальные страницы и маршруты

- `/` — главная страница
- `/about` — страница «О бренде»
- `/contacts` — контакты (hero-видео, контактный блок, карта)
- `/catalog` — каталог (фильтр по типам, фильтр по стоимости, размер карточек)
- `/catalog/type/:typeSlug` — каталог по типу (`hanging`, `wall`, `floor`)
- `/catalog/product/:productSlug` — карточка товара
- `/:pageSlug(designers)` — заглушка раздела
- `*` — 404 заглушка

## 4. Структура проекта

```text
app.js
src/
  controllers/homeController.js
  models/
    productCatalogModel.js
    catalogPageModel.js
  routes/webRoutes.js
  views/
    home/index.ejs
    about/index.ejs
    contacts/index.ejs
    catalog/index.ejs
    catalog/product.ejs
    partials/{head,header,footer}.ejs
    placeholders/page.ejs
public/
  css/styles.css
  js/main.js
  images/*
  videos/*
```

## 5. Где редактировать контент

### Главная + Контакты

Файл: `src/models/productCatalogModel.js`

- `getHomePageData()` — hero, блок бренда, преимущества, контент секций
- `getContactsPageData()` — все данные страницы контактов (телефон, адреса, соцсети, карта, видео)

### Каталог + карточка товара

Файл: `src/models/catalogPageModel.js`

- `CATALOG_PRODUCTS` — список товаров
- `CATALOG_TYPES` — типы фильтра
- `PRICE_RANGES` — диапазоны стоимости
- `getCatalogPageData()` — данные страницы каталога
- `getCatalogProductData()` — данные карточки товара

## 6. Настройка блока «Фотографии» в карточке товара

Теперь галерея на странице товара настраивается прямо из `catalogPageModel.js` через поле `gallery` у конкретного товара.

### Формат `gallery`

Можно задавать:

- массив строк (только путь к изображению)
- массив объектов `{ image, title }`

Пример:

```js
{
  slug: "ufo-glass-wall",
  name: "UFO Glass Wall",
  // ...
  gallery: [
    { image: "/images/glass_wall-catalog.png", title: "UFO Glass Wall" },
    { image: "/images/wall-card-engle.jpg", title: "UFO Glass Wall в интерьере" },
    { image: "/images/Wall-Card.jpg", title: "UFO Glass Wall, крупный план" }
  ]
}
```

### Поведение по умолчанию (fallback)

Если `gallery` не задана, используется автологика:

1. фото текущего товара;
2. фото похожих товаров того же типа;
3. максимум 3 слайда.

Это реализовано в `getProductGallery()` в `src/models/catalogPageModel.js`.

## 7. Видео на странице Contacts

- Видео берется из `getContactsPageData().hero.videoSrc` в `src/models/productCatalogModel.js`.
- MIME-тип задается через `hero.videoType` (сейчас `video/quicktime` для `.MOV`).

Если у пользователя не воспроизводится `.MOV`, добавьте MP4 (H.264/AAC) и поменяйте:

- `videoSrc` на MP4-файл;
- `videoType` на `video/mp4`.

## 8. Статические файлы

- Изображения: `public/images`
- Видео: `public/videos`
- Стили: `public/css/styles.css`
- JS-интерактив: `public/js/main.js`

## 9. Что уже реализовано во фронтенде

- премиальная светлая визуальная стилистика
- sticky-хедер и секционные якоря
- анимации появления блоков
- интерактив каталога:
  - типы товаров
  - диапазоны стоимости
  - переключение размера карточек (`small/medium/large`)
- карточка товара:
  - секции «Об изделии», «Стоимость», «Фотографии», «Похожие модели»
  - sticky-визуал товара
  - слайдер фото
  - контактный CTA-блок

## 10. Рекомендации перед продом

- заменить заглушечные тексты на финальный copy
- подключить реальный backend для форм
- добавить валидацию и защиту форм
- оптимизировать изображения (webp/avif + responsive sizes)
- добавить favicon, OG, SEO-мета
