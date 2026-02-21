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
    name: "UFO Glass Hanging",
    typeSlug: "hanging",
    price: 68000,
    image: "/images/Handing-Card.jpg",
    description: "[Описание-заглушка] Подвесная модель с акцентом на чистую геометрию."
  },
  {
    slug: "ufo-myst-hanging",
    name: "UFO Myst Hanging",
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
    slug: "ufo-glass-wall",
    name: "UFO Glass Wall",
    typeSlug: "wall",
    price: 54000,
    image: "/images/Wall-Card.jpg",
    description: "[Описание-заглушка] Настенный светильник с выразительным профилем."
  },
  {
    slug: "ufo-pandora-wall",
    name: "UFO Pandora Wall",
    typeSlug: "wall",
    price: 112000,
    image: "/images/wall-card-engle.jpg",
    description: "[Описание-заглушка] Архитектурный свет для акцентной подсветки."
  },
  {
    slug: "ufo-myst-wall",
    name: "UFO Myst Wall",
    typeSlug: "wall",
    price: 158000,
    image: "/images/pandora.JPG",
    description: "[Описание-заглушка] Компактная настенная модель для галерейных стен."
  },
  {
    slug: "dea-floor",
    name: "Dea Floor",
    typeSlug: "floor",
    price: 146000,
    image: "/images/Dea-Card.png",
    description: "[Описание-заглушка] Торшер с мягким рассеянным светом."
  },
  {
    slug: "dea-bronze",
    name: "Dea Bronze",
    typeSlug: "floor",
    price: 198000,
    image: "/images/dea.jpg",
    description: "[Описание-заглушка] Торшер для камерных зон отдыха."
  },
  {
    slug: "ufo-pandora-floor",
    name: "UFO Pandora Floor",
    typeSlug: "floor",
    price: 232000,
    image: "/images/IMG_6454.jpg",
    description: "[Описание-заглушка] Напольная композиция для гостиной."
  }
];

const buildTypeHref = (typeSlug) =>
  typeSlug === "all" ? "/catalog" : `/catalog/type/${typeSlug}`;

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
      // Текст под "КОЛЛЕКЦИЯ" равен текущему выбранному типу фильтра.
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

  const typeItem = CATALOG_TYPES.find((item) => item.slug === productItem.typeSlug);

  return {
    pageTitle: `GÉOMETRIA | ${productItem.name}`,
    brandName: "GÉOMETRIA",
    yearLabel: "UFO & Dea Collection",
    footerNote:
      "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    product: productItem,
    backToTypeHref: buildTypeHref(productItem.typeSlug),
    backToTypeLabel: typeItem ? typeItem.label : "КАТАЛОГ"
  };
};

module.exports = {
  getCatalogPageData,
  getCatalogProductData,
  isCatalogType
};

