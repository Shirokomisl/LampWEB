const {
  getHomePageData,
  getContactsPageData,
  getAboutPageData
} = require("../models/productCatalogModel");
const {
  getCatalogPageData,
  getCatalogProductData,
  isCatalogType
} = require("../models/catalogPageModel");
const { verifyCsrfToken } = require("../services/contactSecurityService");
const {
  buildContactFormView,
  buildContactRedirectUrl,
  getContactFeedback, 
  resolveSafeSourcePath
} = require("../services/contactFormService");
const { processContactSubmission } = require("../services/contactService");

const placeholderPages = {
  designers: {
    pageTitle: "Для дизайнеров",
    pageName: "Для дизайнеров",
    placeholderLead:
      "[Раздел-заглушка] Партнерская программа для дизайнеров в разработке.",
    placeholderBody:
      "[Текст-заглушка] Добавьте условия сотрудничества, бонусы и процесс оформления заявок."
  }
};

const buildContactUiState = (req, sourcePath, formOrigin) => ({
  contactForm: buildContactFormView(req, sourcePath, formOrigin),
  contactFeedback: getContactFeedback(req.query)
});

const renderHome = (req, res) => {
  const viewModel = getHomePageData();
  res.render("home/index", {
    ...viewModel,
    ...buildContactUiState(req, "/", "home")
  });
};

const renderContacts = (req, res) => {
  const viewModel = getContactsPageData();
  res.render("contacts/index", {
    ...viewModel,
    ...buildContactUiState(req, "/contacts", "contacts")
  });
};

const renderAbout = (req, res) => {
  const viewModel = getAboutPageData();
  res.render("about/index", viewModel);
};

const renderCatalog = (req, res) => {
  const selectedPriceSlug = req.query.price || "any";
  const viewModel = getCatalogPageData("all", selectedPriceSlug);
  res.render("catalog/index", viewModel);
};

const renderCatalogByType = (req, res) => {
  const { typeSlug } = req.params;

  if (!isCatalogType(typeSlug)) {
    return res.status(404).render("placeholders/page", {
      pageTitle: "Тип товаров не найден",
      pageName: "Каталог",
      placeholderLead:
        "[Страница-заглушка] Запрошенный тип товаров не найден в каталоге.",
      placeholderBody:
        "[Текст-заглушка] Проверьте ссылку фильтра или вернитесь в общий каталог.",
      actionHref: "/catalog",
      actionLabel: "Открыть общий каталог"
    });
  }

  const selectedPriceSlug = req.query.price || "any";
  const viewModel = getCatalogPageData(typeSlug, selectedPriceSlug);
  return res.render("catalog/index", viewModel);
};

const renderCatalogProduct = (req, res) => {
  const { productSlug } = req.params;
  const viewModel = getCatalogProductData(productSlug);

  if (!viewModel) {
    return res.status(404).render("placeholders/page", {
      pageTitle: "Товар не найден",
      pageName: "Каталог",
      placeholderLead:
        "[Страница-заглушка] Карточка товара не найдена или была перемещена.",
      placeholderBody:
        "[Текст-заглушка] Вернитесь в каталог и выберите другую модель.",
      actionHref: "/catalog",
      actionLabel: "Вернуться в каталог"
    });
  }

  return res.render("catalog/product", {
    ...viewModel,
    ...buildContactUiState(req, req.path, "catalog-product")
  });
};

const submitContact = async (req, res) => {
  const sourcePath = resolveSafeSourcePath(req.body.sourcePath);
  const csrfToken = req.body._csrf;

  if (!verifyCsrfToken(req, csrfToken)) {
    return res.redirect(303, buildContactRedirectUrl(sourcePath, "error", "csrf_failed"));
  }

  let result = null;

  try {
    result = await processContactSubmission({
      req,
      sourcePath,
      formData: req.body
    });
  } catch (error) {
    console.error("[contact-submit] unexpected error", error);
    return res.redirect(303, buildContactRedirectUrl(sourcePath, "error", "unknown_error"));
  }

  if (!result.ok) {
    return res.redirect(303, buildContactRedirectUrl(sourcePath, "error", result.code));
  }

  return res.redirect(303, buildContactRedirectUrl(sourcePath, "success", "sent"));
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
  renderContacts,
  renderAbout,
  renderCatalog,
  renderCatalogByType,
  renderCatalogProduct,
  renderPlaceholderPage,
  submitContact
};
