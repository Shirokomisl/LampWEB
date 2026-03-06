const CATALOG_TYPES = [
  { slug: "all", label: "ВСЕ ИЗДЕЛИЯ" },
  { slug: "hanging", label: "ПОДВЕСНЫЕ" },
  { slug: "wall", label: "НАСТЕННЫЕ" },
  { slug: "floor", label: "ТОРШЕР" }
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
    price: 11900,
    sizeOptions: [
      { label: "S", price: 8900 },
      { label: "M", price: 11900, isDefault: true },
      { label: "L", price: 14900 }
    ],
    image: "/images/glass_hanging-catalog.png",
    gallery: [
      { image: "/images/glass_hanging-gallery1.jpg", title: "Парные в интерьере" },
      { image: "/images/glass_hanging-gallery2.jpg", title: "Одиночный ВКЛ, вид сверху" },
      { image: "/images/glass_hanging-gallery3.jpg", title: "Одиночный ВКЛ, вид снизу" },
      { image: "/images/glass_hanging-gallery4.jpg", title: "Одиночный ВЫКЛ, вид сверху" },
      { image: "/images/glass_hanging-gallery5.jpg", title: "Одиночный ВЫКЛ, вид снизу" },
      { image: "/images/glass_hanging-gallery6.jpg", title: "Парные ВЫКЛ, вид снизу" },
      { image: "/images/glass_hanging-gallery7.jpg", title: "Парные ВКЛ, вид снизу" },
      { image: "/images/glass_hanging-gallery8.jpg", title: "Парные ВЫКЛ, вид сверху" }
    ],
    description: "UFO Glass (премиальное матированное стекло) – наиболее универсальная модель подходящая под большинство интерьеров за счет нейтральности.",
    paragraph1: "Особенно выигрышно смотрится при разноуровневой композиции из разных размеров, где рассеянный матовым стеклом теплый свет перетекает от диска на диск – невероятная магия уюта.",
    paragraph2: "Материалы: алюминий, бельгийское стекло, латунь.",
  },
  {
    slug: "ufo-myst-hanging",
    name: "UFO Myst",
    typeSlug: "hanging",
    price: 11900,
    sizeOptions: [
      { label: "S", price: 8900 },
      { label: "M", price: 11900, isDefault: true },
      { label: "L", price: 14900 }
    ],
    image: "/images/myst_hanging-catalog.png",
    description: "UFO Myst (премиальное матированное стекло дымчатого оттенка) – мастер-спальни частных интерьеров, номерной фонд стильных отелей, ночной проходной свет, когда нужно максимально бережно сохранить сон или подготовиться к нему.",
    paragraph1: "Отличное решение по размещению над прикроватными тумбами в спальне - свисающий разноуровневый монтаж, особенно для высоких потолков (3+ метра).",
    paragraph2: "Материалы: алюминий, бельгийское стекло, латунь."
  },
  {
    slug: "ufo-potrofino",
    name: "UFO Potrofino",
    typeSlug: "hanging",
    price: 11900,
    sizeOptions: [
      { label: "S", price: 8900 },
      { label: "M", price: 11900, isDefault: true },
      { label: "L", price: 14900 }
    ],
    image: "/images/potrofino-catalog.png",
    description: "UFO Portofino – для светлых минималистичных интерьеров, где нужен крайне выверенный и тонкий акцент «уровня Hi-End» без нарушения общей гармонии пространства.",
    paragraph1: "За счет полностью отраженного от диска света можно использовать в качестве основного освещения небольшое зоны.",
    paragraph2: "Материалы: алюминий, бельгийское стекло, латунь"
  },
  {
    slug: "ufo-prive",
    name: "UFO Prive",
    typeSlug: "hanging",
    price: 18900,
    sizeOptions: [{ label: "XL", price: 18900, isDefault: true }],
    image: "/images/prive-catalog-cube.png",
    description: "Очень часто, простые формы несут в себе более сложные идеи, заложенные в их создание и светильник UFO Prive является этим ярким примером. 100% премиальность в простых и лаконичных формах, прецизионное качество обработки массива латуни.",
    paragraph1: "Тончайший подвес фокусирует внимание на безупречных деталях UFO Prive, а свободная геометрия провода добавляет логичной и управляемой сложности в общую композицию.",
    paragraph2: "Материалы: бельгийское стекло, латунь."
  },
  {
    slug: "ufo-glass-wall",
    name: "UFO Glass Wall",
    typeSlug: "wall",
    price: 10900,
    sizeOptions: [
      { label: "S", price: 7900 },
      { label: "M", price: 10900, isDefault: true },
      { label: "L", price: 13900 }
    ],
    image: "/images/glass_wall-catalog.png",
    gallery: [
      { image: "/images/glass_wall-catalog.png", title: "UFO Glass Wall" },
      { image: "/images/wall-card-engle.jpg", title: "UFO Glass Wall в интерьере" },
      { image: "/images/Wall-Card.jpg", title: "UFO Glass Wall, крупный план" }
    ],
    description: "UFO Glass Wall (премиальное матированное стекло) - представляет из себя настенную версию светильника UFO Glass",
    paragraph1: "Может быть использован в сателлитном использовании с подвесной версией для формирования композитного восприятия в освещении интерьера.",
    paragraph2: "Материалы: бельгийское стекло, латунь, алюминий."
  },
  {
    slug: "ufo-pandora",
    name: "UFO Pandora",
    typeSlug: "wall",
    price: 14900,
    sizeOptions: [
      { label: "S", price: 10900 },
      { label: "M", price: 14900, isDefault: true },
      { label: "L", price: 19900 }
    ],
    image: "/images/pandora-catalog-cube.png",
    description: "UFO Pandora – представьте себе поверхность неизведанной вам планеты, по которой текут реки, раскинуты океаны и песчаные дюны – невероятный космос прямо на ваших стенах.",
    paragraph1: "Нет двух абсолютно одинаковых листов каменного шпона, поэтому, как и модель Terra – каждый светильник — это абсолютный эксклюзив. Создавайте световые композиции тремя доступными размерами, разбивая все законы симметрии.",
    paragraph2: "Материалы: натуральный каменный шпон, латунь, алюминий."
  },
  {
    slug: "ufo-myst-wall",
    name: "UFO Myst Wall",
    typeSlug: "wall",
    price: 10900,
    sizeOptions: [
      { label: "S", price: 7900 },
      { label: "M", price: 10900, isDefault: true },
      { label: "L", price: 13900 }
    ],
    image: "/images/myst_wall-catalog.png",
    description: "UFO Myst Wall (премиальное матированное стекло дымчатого оттенка) - за счет дымчатого стекла наиболее подходит в качестве сдержанного атмосферного света и идеальны для формирования световых композиций за счет применения разных размеров.",
    paragraph1: "Идеальное решение для мастер-спален, прихожих, идеальное решение в качестве проходного ночного света и пр.",
    paragraph2: "Материалы: бельгийское стекло, латунь, алюминий."
  },
  {
    slug: "ufo-antique",
    name: "UFO Antique",
    typeSlug: "wall",
    price: 12900,
    sizeOptions: [
      { label: "S", price: 9900 },
      { label: "M", price: 12900, isDefault: true },
      { label: "L", price: 15900 }
    ],
    image: "/images/antique-catalog.png",
    description: "UFO Antique - матированное стекло в сочетании с центральным диском из итальянского травертина пористой текстуры и латунью.",
    paragraph1: "Формируют изысканный стиль, твердо декларируя, что премиальный стиль — это не всегда сложные формы и молча подчеркивают изысканный стиль своего владельца.",
    paragraph2: "Материалы: бельгийское стекло, латунь, турецкий травертин. Рекомендованная инсталляция: ассиметричное размещение 3-х разных размеров (L, M и S)"
  },
  {
    slug: "ufo-terra",
    name: "UFO Terra",
    typeSlug: "wall",
    price: 14900,
    sizeOptions: [
      { label: "S", price: 10900 },
      { label: "M", price: 14900, isDefault: true },
      { label: "L", price: 19900 }
    ],
    image: "/images/terra-catalog.png",
    description: "UFO Terra – невероятная магия натурального каменного шпона с выраженной сланцевой текстурой, которая очень красиво подчеркивается теплым растекающимся по камню светом.",
    paragraph1: "Центральный диск из массива латуни подчеркивает премиальный уровень светильника UFO Terra и еще больше добавляет теплоты в общую композицию.",
    paragraph2: "Материалы: натуральный каменный шпон, латунь, алюминий."
  },
  {
    slug: "dea",
    name: "Dea",
    typeSlug: "floor",
    price: 49900,
    sizeOptions: [{ label: "XL", price: 49900, isDefault: true }],
    image: "/images/dea-catalog.png",
    description: "[Описание-заглушка] Торшер с мягким рассеянным светом.",
    paragraph1: "",
    paragraph2: ""
  }
];

const buildTypeHref = (typeSlug) =>
  typeSlug === "all" ? "/catalog" : `/catalog/type/${typeSlug}`;

const formatPrice = (priceValue) =>
  `${new Intl.NumberFormat("ru-RU").format(priceValue)} ₽`;

const getProductImage = (productItem) => productItem.image || "/images/hanging.jpg";

// Нормализует запись галереи из модели:
// - строка: "/images/file.jpg"
// - объект: { image: "/images/file.jpg", title: "Подпись" }
const normalizeGalleryEntry = (entry, fallbackTitle) => {
  if (typeof entry === "string") {
    return {
      image: entry,
      title: fallbackTitle
    };
  }

  if (!entry || typeof entry !== "object" || !entry.image) {
    return null;
  }

  return {
    image: entry.image,
    title: entry.title || fallbackTitle
  };
};

const getProductGallery = (productItem, similarItems) => {
  const configuredGallery = Array.isArray(productItem.gallery) ? productItem.gallery : [];
  const normalizedGallery = configuredGallery
    .map((galleryEntry) => normalizeGalleryEntry(galleryEntry, productItem.name))
    .filter(Boolean);

  if (normalizedGallery.length > 0) {
    return normalizedGallery;
  }

  const galleryFallbackItems = [productItem, ...similarItems].slice(0, 3);

  return galleryFallbackItems.map((item) => ({
    image: getProductImage(item),
    title: item.name
  }));
};

const getSizeOptions = (productItem) => {
  const configuredOptions = Array.isArray(productItem.sizeOptions)
    ? productItem.sizeOptions
    : [];

  const normalizedOptions = configuredOptions
    .filter(
      (optionItem) =>
        optionItem &&
        typeof optionItem.label === "string" &&
        optionItem.label.trim() &&
        Number.isFinite(optionItem.price) &&
        optionItem.price > 0
    )
    .map((optionItem) => ({
      label: optionItem.label.trim(),
      price: optionItem.price,
      isDefault: Boolean(optionItem.isDefault)
    }));

  if (normalizedOptions.length > 0) {
    return normalizedOptions;
  }

  return [
    {
      label: "M",
      price: productItem.price,
      isDefault: true
    }
  ];
};

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
    headerLogo: "/images/logo-new_1920.png",
    footerBrandName: "GÉOMETRIA",
    // footerNote:
    //   "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    hero: {
      eyebrow: "КОЛЛЕКЦИЯ",
      // Текст под "КОЛЛЕКЦИЯ" всегда равен текущему выбранному типу фильтра.
      title: selectedType.label,
      image: "/images/header-background.png"
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

  const galleryItems = getProductGallery(productItem, similarItems);
  const configuredSizeOptions = getSizeOptions(productItem);
  const defaultOption =
    configuredSizeOptions.find((optionItem) => optionItem.isDefault) ||
    configuredSizeOptions[0];
  const activeSizeLabel = defaultOption.label;
  const activeSizePrice = defaultOption.price;

  const sizeOptions = configuredSizeOptions.map((optionItem) => ({
    label: optionItem.label,
    price: optionItem.price,
    formattedPrice: formatPrice(optionItem.price),
    isActive: optionItem.label === activeSizeLabel
  }));

  return {
    pageTitle: `GÉOMETRIA | ${productItem.name}`,
    headerLogo: "/images/logo-new_1920.png",
    footerBrandName: "GÉOMETRIA",
    // footerNote:
    //   "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    tabs: [
      { id: "about-product", label: "ОБ ИЗДЕЛИИ" },
      { id: "product-price", label: "СТОИМОСТЬ" },
      { id: "product-gallery", label: "ФОТОГРАФИИ" },
      { id: "similar-models", label: "ПОХОЖИЕ МОДЕЛИ" }
    ],
    product: {
      ...productItem,
      yearLabel: "2026",
      heroBackdropImage: "/images/header-background.png",
      image: productImage,
      stickyImage: productImage
    },
    productAbout: {
      lead: productItem.description,
      paragraphs: [
        productItem.paragraph1,
        productItem.paragraph2
      ]
    },
    productPrice: {
      previewPriceLabel: "ПРЕДВАРИТЕЛЬНАЯ СТОИМОСТЬ",
      previewPriceValue: formatPrice(activeSizePrice),
      previewPriceRaw: activeSizePrice,
      configuratorTitle: "КОНФИГУРАТОР",
      configuratorDescription:
        "Выберите размер, чтобы узнать предварительную стоимость.",
      sizeLabel: "ВЫБЕРИТЕ РАЗМЕР",
      sizeOptions,
      requestLabel: "ОСТАВИТЬ ЗАЯВКУ",
      modelLabel: "ЗАПРОСИТЬ 3D МОДЕЛЬ"
    },
    productGallery: galleryItems,
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
