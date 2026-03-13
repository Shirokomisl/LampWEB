const {
  getHomePageData,
  getContactsPageData,
  getAboutPageData,
  getDesignersPageData
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

const placeholderPages = {};

const buildContactUiState = (req, sourcePath, formOrigin) => ({
  contactForm: buildContactFormView(req, sourcePath, formOrigin),
  contactFeedback: getContactFeedback(req.query)
});

const renderHome = (req, res) => {
  const viewModel = withBaseLayoutData(getHomePageData());
  res.render("home/index", {
    ...viewModel,
    ...buildContactUiState(req, "/", "home")
  });
};

const renderContacts = (req, res) => {
  const viewModel = withBaseLayoutData(getContactsPageData());
  res.render("contacts/index", {
    ...viewModel,
    ...buildContactUiState(req, "/contacts", "contacts")
  });
};

const renderAbout = (req, res) => {
  const viewModel = withBaseLayoutData(getAboutPageData());
  res.render("about/index", viewModel);
};

const renderDesigners = (req, res) => {
  const viewModel = withBaseLayoutData(getDesignersPageData());
  res.render("designers/index", {
    ...viewModel,
    ...buildContactUiState(req, "/designers", "designers-3d")
  });
};

const renderCatalog = (req, res) => {
  const selectedPriceSlug = req.query.price || "any";
  const viewModel = withBaseLayoutData(getCatalogPageData("all", selectedPriceSlug));
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
  const viewModel = withBaseLayoutData(getCatalogPageData(typeSlug, selectedPriceSlug));
  return res.render("catalog/index", viewModel);
};

const renderCatalogProduct = (req, res) => {
  const { productSlug } = req.params;
  const viewModel = withBaseLayoutData(getCatalogProductData(productSlug));

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

const withBaseLayoutData = (viewModel) => {
  const safeModel = viewModel || {};
  return {
    brandName: "GÉOMETRIA",
    footerBrandName: "GÉOMETRIA",
    footerNote: "",
    ...safeModel
  };
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
  renderDesigners,
  renderCatalog,
  renderCatalogByType,
  renderCatalogProduct,
  renderPlaceholderPage,
  submitContact
};

