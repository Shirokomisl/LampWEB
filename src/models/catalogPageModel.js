const CATALOG_TYPES = [
  { slug: "all", label: "ВСЕ ИЗДЕЛИЯ" },
  { slug: "hanging", label: "ПОДВЕСНЫЕ" },
  { slug: "wall", label: "НАСТЕННЫЕ" },
  { slug: "floor", label: "ТОРШЕРЫ" }
];

const PRICE_RANGES = [
  { slug: "any", label: "ЛЮБАЯ СТОИМОСТЬ", min: 0, max: Number.POSITIVE_INFINITY },
  { slug: "up-to-70k", label: "ДО 70 000", min: 0, max: 70000 },
  { slug: "70k-120k", label: "70 000 - 120 000", min: 70000, max: 120000 },
  { slug: "120k-200k", label: "120 000 - 200 000", min: 120000, max: 200000 },
  { slug: "200k-plus", label: "ОТ 200 000", min: 200000, max: Number.POSITIVE_INFINITY }
];

const CATALOG_PRODUCTS = [
  {
    slug: "ufo-glass-hanging",
    name: "UFO Glass",
    typeSlug: "hanging",
    price: 68000,
    image: "/images/Handing-Card.jpg",
    description: "[Описание-заглушка] Подвесная модель с акцентом на чистую геометрию."
  },
  {
    slug: "ufo-myst-hanging",
    name: "UFO Myst",
    typeSlug: "hanging",
    price: 89000,
    image: "/images/hanging.jpg",
    description: "[Описание-заглушка] Мягкий световой сценарий для обеденных зон."
  },
  {
    slug: "ufo-portofino",
    name: "UFO Portofino",
    typeSlug: "hanging",
    price: 126000,
    image: "/images/interier-hanging.jpg",
    description: "[Описание-заглушка] Серия подвесов для премиальных пространств."
  },
  {
    slug: "ufo-prive",
    name: "UFO Prive",
    typeSlug: "hanging",
    price: 120000,
    image: "/images/hanging.jpg",
    description: "[Описание-заглушка] Серия подвесов для премиальных пространств."
  },
  {
    slug: "ufo-glass-wall",
    name: "UFO Glass Wall",
    typeSlug: "wall",
    price: 54000,
    image: "/images/glass_wall-catalog.png",
    description: "[Описание-заглушка] Настенный светильник с выразительным профилем."
  },
  {
    slug: "ufo-pandora",
    name: "UFO Pandora",
    typeSlug: "wall",
    price: 112000,
    image: "/images/pandora-catalog.png",
    description: "[Описание-заглушка] Архитектурный свет для акцентной подсветки."
  },
  {
    slug: "ufo-myst-wall",
    name: "UFO Myst Wall",
    typeSlug: "wall",
    price: 158000,
    image: "/images/myst_wall-catalog.png",
    description: "[Описание-заглушка] Компактная настенная модель для галерейных стен."
  },
  {
    slug: "ufo-antique",
    name: "UFO Antique",
    typeSlug: "wall",
    price: 142000,
    image: "/images/antique-catalog.png",
    description: "[Описание-заглушка] Компактная настенная модель для галерейных стен."
  },
  {
    slug: "ufo-terra",
    name: "UFO Terra",
    typeSlug: "wall",
    price: 220000,
    image: "/images/terra-catalog.png",
    description: "[Описание-заглушка] Компактная настенная модель для галерейных стен."
  },
  {
    slug: "dea",
    name: "Dea",
    typeSlug: "floor",
    price: 146000,
    image: "/images/dea-catalog.png",
    description: "[Описание-заглушка] Торшер с мягким рассеянным светом."
  }
];

const buildTypeHref = (typeSlug) =>
  typeSlug === "all" ? "/catalog" : `/catalog/type/${typeSlug}`;

const formatPrice = (priceValue) =>
  `${new Intl.NumberFormat("ru-RU").format(priceValue)} ₽`;

const getProductImage = (productItem) => productItem.image || "/images/hanging.jpg";

const getConfiguratorSizes = (productSlug) =>
  ["ufo-prive", "dea"].includes(productSlug) ? ["XL"] : ["S", "M", "L"];

const normalizePriceSlug = (priceSlug) =>
  PRICE_RANGES.some((range) => range.slug === priceSlug) ? priceSlug : "any";

const buildTypeAndPriceHref = (typeSlug, priceSlug) => {
  const baseHref = buildTypeHref(typeSlug);
  return priceSlug === "any" ? baseHref : `${baseHref}?price=${priceSlug}`;
};

const getCatalogTypesWithState = (selectedTypeSlug, selectedPriceSlug) =>
  CATALOG_TYPES.map((typeItem) => ({
    ...typeItem,
    href: buildTypeAndPriceHref(typeItem.slug, selectedPriceSlug),
    isActive: typeItem.slug === selectedTypeSlug
  }));

const getPriceRangesWithState = (selectedTypeSlug, selectedPriceSlug) =>
  PRICE_RANGES.map((rangeItem) => ({
    ...rangeItem,
    href: buildTypeAndPriceHref(selectedTypeSlug, rangeItem.slug),
    isActive: rangeItem.slug === selectedPriceSlug
  }));

const isCatalogType = (typeSlug) =>
  CATALOG_TYPES.some((typeItem) => typeItem.slug === typeSlug && typeSlug !== "all");

const isProductInRange = (productItem, rangeItem) =>
  productItem.price >= rangeItem.min && productItem.price <= rangeItem.max;

const getProductCardModel = (productItem) => ({
  ...productItem,
  href: `/catalog/product/${productItem.slug}`
});

const getCatalogPageData = (selectedTypeSlug = "all", selectedPriceSlug = "any") => {
  const selectedType = CATALOG_TYPES.find((typeItem) => typeItem.slug === selectedTypeSlug);

  if (!selectedType) {
    return null;
  }

  const normalizedPriceSlug = normalizePriceSlug(selectedPriceSlug);
  const selectedPriceRange = PRICE_RANGES.find(
    (rangeItem) => rangeItem.slug === normalizedPriceSlug
  );

  const typedProducts =
    selectedTypeSlug === "all"
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((productItem) => productItem.typeSlug === selectedTypeSlug);

  const filteredProducts =
    normalizedPriceSlug === "any"
      ? typedProducts
      : typedProducts.filter((productItem) => isProductInRange(productItem, selectedPriceRange));

  return {
    pageTitle: `GÉOMETRIA | ${selectedType.label}`,
    brandName: "GÉOMETRIA",
    yearLabel: "UFO & Dea Collection",
    footerNote:
      "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    hero: {
      eyebrow: "КОЛЛЕКЦИЯ",
      // Текст под "КОЛЛЕКЦИЯ" всегда равен текущему выбранному типу фильтра.
      title: selectedType.label,
      image: "/images/studio-head.jpg"
    },
    filterLabel: selectedType.label,
    selectedPriceLabel: selectedPriceRange.label,
    selectedPriceSlug: normalizedPriceSlug,
    catalogTypes: getCatalogTypesWithState(selectedTypeSlug, normalizedPriceSlug),
    priceRanges: getPriceRangesWithState(selectedTypeSlug, normalizedPriceSlug),
    products: filteredProducts.map(getProductCardModel)
  };
};

const getCatalogProductData = (productSlug) => {
  const productItem = CATALOG_PRODUCTS.find((item) => item.slug === productSlug);

  if (!productItem) {
    return null;
  }

  const productImage = getProductImage(productItem);
  const similarItems = CATALOG_PRODUCTS.filter(
    (item) => item.typeSlug === productItem.typeSlug && item.slug !== productItem.slug
  ).slice(0, 3);

  const galleryItems = [productItem, ...similarItems].slice(0, 3);
  const sizeOptions = getConfiguratorSizes(productItem.slug).map((sizeLabel, index) => ({
    label: sizeLabel,
    isActive: index === 0
  }));

  return {
    pageTitle: `GÉOMETRIA | ${productItem.name}`,
    brandName: "GÉOMETRIA",
    yearLabel: "UFO & Dea Collection",
    footerNote:
      "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    tabs: [
      { id: "about-product", label: "ОБ ИЗДЕЛИИ" },
      { id: "product-price", label: "СТОИМОСТЬ" },
      { id: "product-gallery", label: "ФОТОГРАФИИ" },
      { id: "similar-models", label: "ПОХОЖИЕ МОДЕЛИ" }
    ],
    product: {
      ...productItem,
      yearLabel: "2026",
      heroBackdropImage: "/images/studio-head.jpg",
      image: productImage,
      stickyImage: productImage
    },
    productAbout: {
      lead: `В коллекции GÉOMETRIA модель ${productItem.name} задумана как центральная ось пространства с балансом скульптурной формы и архитектурной строгости.`,
      paragraphs: [
        "Массивное основание и чистая пластика линий создают устойчивую визуальную композицию, подходящую как для частных интерьеров, так и для общественных пространств.",
        "Каждая модель производится малыми сериями, поэтому характер изделия сохраняет авторскую подачу и премиальное качество исполнения."
      ]
    },
    productPrice: {
      previewPriceLabel: "ПРЕДВАРИТЕЛЬНАЯ СТОИМОСТЬ",
      previewPriceValue: formatPrice(productItem.price),
      configuratorTitle: "КОНФИГУРАТОР",
      configuratorDescription:
        "Выберите размер, чтобы уточнить предварительную стоимость.",
      sizeLabel: "ВЫБЕРИТЕ РАЗМЕР",
      sizeOptions,
      requestLabel: "ОСТАВИТЬ ЗАЯВКУ",
      modelLabel: "ЗАПРОСИТЬ 3D МОДЕЛЬ"
    },
    productGallery: galleryItems.map((item) => ({
      image: getProductImage(item),
      title: item.name
    })),
    similarProducts: similarItems.map((item) => ({
      name: item.name,
      description: item.description,
      image: getProductImage(item),
      href: `/catalog/product/${item.slug}`
    })),
    productContact: {
      title: "ОСТАЛИСЬ ВОПРОСЫ?",
      description:
        "Пожалуйста, направьте ваш запрос по форме, представленной ниже. Мы свяжемся с вами в ближайшее время.",
      nameLabel: "ИМЯ *",
      phoneLabel: "ТЕЛЕФОН *",
      messageLabel: "ОПИШИТЕ СВОЙ ВОПРОС *",
      submitLabel: "ОТПРАВИТЬ",
      policyText:
        "Нажимая кнопку «Отправить», вы соглашаетесь на обработку персональных данных",
      image: productImage
    }
  };
};

module.exports = {
  getCatalogPageData,
  getCatalogProductData,
  isCatalogType
};
