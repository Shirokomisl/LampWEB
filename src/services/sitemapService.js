const { getCatalogPageData } = require("../models/catalogPageModel");

const SITE_URL = process.env.SITE_URL || "https://geometria-116.ru";

const generateSitemap = () => {
  const now = new Date().toISOString();
  const catalogData = getCatalogPageData("all");

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
  catalogData.catalogTypes.forEach((type) => {
    urls.push({
      loc: `${SITE_URL}${type.href}`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.9"
    });
  });

  // Страницы продуктов
  catalogData.products.forEach((product) => {
    urls.push({
      loc: `${SITE_URL}${product.href}`,
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
