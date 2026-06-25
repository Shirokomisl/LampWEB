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

const SITE_URL = process.env.SITE_URL || "https://geometria-lamps.com";

const buildSeoData = (path, title, description, image) => ({
  currentPath: path,
  canonicalUrl: `${SITE_URL}${path}`,
  pageDescription: description,
  ogImage: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/logo-cube.png`
});

const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GÉOMETRIA",
  "url": SITE_URL,
  "logo": `${SITE_URL}/images/logo-cube.png`,
  "description": "Семейная мастерская дизайнерских светильников премиум-класса",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU"
  }
});

const buildProductSchema = (product, price) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description || "",
  "image": `${SITE_URL}${product.image}`,
  "brand": {
    "@type": "Brand",
    "name": "GÉOMETRIA"
  },
  "offers": {
    "@type": "Offer",
    "price": price,
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock",
    "url": `${SITE_URL}/catalog/product/${product.slug}`
  }
});

const renderHome = (req, res) => {
  const viewModel = withBaseLayoutData(getHomePageData());
  res.render("home/index", {
    ...viewModel,
    ...buildContactUiState(req, "/", "home"),
    ...buildSeoData(
      "/",
      "GÉOMETRIA | Дизайнерские светильники премиум-класса",
      "ГÉОМЕТРИЯ — семейная мастерская дизайнерских светильников премиум-класса. Подвесные и настенные светильники UFO, торшеры из премиальных материалов.",
      "/images/header-background.png"
    ),
    structuredData: buildOrganizationSchema()
  });
};

const renderContacts = (req, res) => {
  const viewModel = withBaseLayoutData(getContactsPageData());
  res.render("contacts/index", {
    ...viewModel,
    ...buildContactUiState(req, "/contacts", "contacts"),
    ...buildSeoData(
      "/contacts",
      "Контакты | GÉOMETRIA",
      "Свяжитесь с нами для заказа дизайнерских светильников GÉOMETRIA. Консультация и подбор светильников для вашего интерьера.",
      "/images/logo-cube.png"
    )
  });
};

const renderAbout = (req, res) => {
  const viewModel = withBaseLayoutData(getAboutPageData());
  res.render("about/index", {
    ...viewModel,
    ...buildSeoData(
      "/about",
      "О нас | GÉOMETRIA",
      "История создания семейной мастерской GÉOMETRIA. Философия дизайна и производства премиальных светильников.",
      "/images/logo-cube.png"
    )
  });
};

const renderDesigners = (req, res) => {
  const viewModel = withBaseLayoutData(getDesignersPageData());
  res.render("designers/index", {
    ...viewModel,
    ...buildContactUiState(req, "/designers", "designers-3d"),
    ...buildSeoData(
      "/designers",
      "Дизайнерам | GÉOMETRIA",
      "3D-модели светильников GÉOMETRIA для дизайнеров интерьеров. Запросите модели для вашего проекта.",
      "/images/logo-cube.png"
    )
  });
};

const renderCatalog = (req, res) => {
  const selectedPriceSlug = req.query.price || "any";
  const viewModel = withBaseLayoutData(getCatalogPageData("all", selectedPriceSlug));
  res.render("catalog/index", {
    ...viewModel,
    ...buildSeoData(
      "/catalog",
      "Каталог | GÉOMETRIA",
      "Каталог дизайнерских светильников GÉOMETRIA: подвесные UFO Glass, UFO Myst, настенные UFO Pandora, UFO Terra, торшеры Dea.",
      "/images/header-background.png"
    )
  });
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

  const typeNames = {
    hanging: "Подвесные светильники",
    wall: "Настенные светильники",
    floor: "Торшеры"
  };

  return res.render("catalog/index", {
    ...viewModel,
    ...buildSeoData(
      `/catalog/type/${typeSlug}`,
      `${typeNames[typeSlug] || "Каталог"} | GÉOMETRIA`,
      `${typeNames[typeSlug] || "Светильники"} GÉOMETRIA премиум-класса. Дизайнерские решения для вашего интерьера.`,
      "/images/header-background.png"
    )
  });
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

  const productName = viewModel.product?.name || "Светильник";
  const productDescription = viewModel.productAbout?.lead || "Дизайнерский светильник GÉOMETRIA";
  const productImage = viewModel.product?.image || "/images/logo-cube.png";
  const productPrice = viewModel.productPrice?.previewPriceRaw || viewModel.product?.price || 0;

  return res.render("catalog/product", {
    ...viewModel,
    ...buildContactUiState(req, req.path, "catalog-product"),
    ...buildSeoData(
      `/catalog/product/${productSlug}`,
      `${productName} | GÉOMETRIA`,
      productDescription,
      productImage
    ),
    structuredData: buildProductSchema({
      name: productName,
      description: productDescription,
      image: productImage,
      slug: productSlug
    }, productPrice)
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

