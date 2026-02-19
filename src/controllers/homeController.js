const { getHomePageData } = require("../models/productCatalogModel");

const placeholderPages = {
  catalog: {
    pageTitle: "Каталог",
    pageName: "Каталог",
    placeholderLead: "[Раздел-заглушка] Полная структура каталога пока не реализована.",
    placeholderBody:
      "[Текст-заглушка] Добавьте фильтры, карточки товаров и детальные страницы моделей."
  },
  projects: {
    pageTitle: "Проекты",
    pageName: "Проекты",
    placeholderLead:
      "[Раздел-заглушка] Кейсы и реализованные интерьеры будут опубликованы позже.",
    placeholderBody:
      "[Текст-заглушка] Добавьте фото до/после, задачи клиента и использованные модели света."
  },
  about: {
    pageTitle: "О бренде",
    pageName: "О бренде",
    placeholderLead:
      "[Раздел-заглушка] История бренда и производственная экспертиза готовятся к публикации.",
    placeholderBody:
      "[Текст-заглушка] Добавьте ценности, географию, производственные мощности и сертификаты."
  },
  contacts: {
    pageTitle: "Контакты",
    pageName: "Контакты",
    placeholderLead:
      "[Раздел-заглушка] Полная контактная страница пока не реализована.",
    placeholderBody:
      "[Текст-заглушка] Добавьте карту, график работы, телефоны отделов и реквизиты."
  },
  designers: {
    pageTitle: "Для дизайнеров",
    pageName: "Для дизайнеров",
    placeholderLead:
      "[Раздел-заглушка] Партнерская программа для дизайнеров в разработке.",
    placeholderBody:
      "[Текст-заглушка] Добавьте условия сотрудничества, бонусы и процесс оформления заявок."
  }
};

const renderHome = (req, res) => {
  const viewModel = getHomePageData();
  res.render("home/index", viewModel);
};

const renderPlaceholderPage = (req, res) => {
  const { pageSlug } = req.params;
  const placeholder = placeholderPages[pageSlug];

  if (!placeholder) {
    return res.status(404).render("placeholders/page", {
      pageTitle: "Страница не найдена",
      pageName: "404",
      placeholderLead:
        "[Страница-заглушка] Раздел не найден, проверьте URL или вернитесь на главную.",
      placeholderBody:
        "[Текст-заглушка] Добавьте здесь ссылки на ключевые страницы и форму обратной связи.",
      actionHref: "/",
      actionLabel: "Вернуться на главную"
    });
  }

  return res.render("placeholders/page", {
    ...placeholder,
    actionHref: "/",
    actionLabel: "Открыть главную страницу"
  });
};

module.exports = {
  renderHome,
  renderPlaceholderPage
};

