const { getCatalogPageData, getCatalogProductData } = require("../models/catalogPageModel");

const SITE_URL = process.env.SITE_URL || "https://geometria-lamps.com";

const CATALOG_TYPES = ["all", "hanging", "wall", "floor"];

const PRODUCT_SLUGS = [
  "ufo-glass-hanging",
  "ufo-myst-hanging",
  "ufo-potrofino",
  "ufo-prive",
  "ufo-glass-wall",
  "ufo-pandora",
  "ufo-myst-wall",
  "ufo-antique",
  "ufo-terra",
  "ufo-hugo",
  "dea"
];

const generateSitemap = () => {
  const now = new Date().toISOString();

  const urls = [];

  // Главная страница
  urls.push({
    loc: SITE_URL,
    lastmod: now,
    changefreq: "weekly",
    priority: "1.0"
  });

  // Статические страницы
  urls.push({
    loc: `${SITE_URL}/about`,
    lastmod: now,
    changefreq: "monthly",
    priority: "0.8"
  });

  urls.push({
    loc: `${SITE_URL}/contacts`,
    lastmod: now,
    changefreq: "monthly",
    priority: "0.8"
  });

  urls.push({
    loc: `${SITE_URL}/designers`,
    lastmod: now,
    changefreq: "monthly",
    priority: "0.7"
  });

  // Страницы каталога по типам
  CATALOG_TYPES.forEach((typeSlug) => {
    const href = typeSlug === "all" ? "/catalog" : `/catalog/type/${typeSlug}`;
    urls.push({
      loc: `${SITE_URL}${href}`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.9"
    });
  });

  // Страницы продуктов
  PRODUCT_SLUGS.forEach((productSlug) => {
    urls.push({
      loc: `${SITE_URL}/catalog/product/${productSlug}`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.8"
    });
  });

  // Генерация XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    xml += "  <url>\n";
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  return xml;
};

module.exports = {
  generateSitemap
};
