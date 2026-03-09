const {
  getCatalogTypeSlugs,
  getCatalogProductSlugs
} = require("../models/catalogPageModel");

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildBaseUrl = (req) => {
  const envBase = String(process.env.SITE_URL || "").trim();
  if (envBase) {
    return envBase.replace(/\/+$/g, "");
  }

  const host = req.get("host");
  const proto = req.protocol || "https";
  return `${proto}://${host}`;
};

const buildUrlEntry = (loc, lastmod, changefreq, priority) => {
  const parts = [
    `<loc>${escapeXml(loc)}</loc>`,
    lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "",
    changefreq ? `<changefreq>${escapeXml(changefreq)}</changefreq>` : "",
    priority ? `<priority>${escapeXml(priority)}</priority>` : ""
  ].filter(Boolean);

  return `<url>${parts.join("")}</url>`;
};

const buildSitemapXml = (req) => {
  const baseUrl = buildBaseUrl(req);
  const lastmod = new Date().toISOString().split("T")[0];
  const typeSlugs = getCatalogTypeSlugs().filter((slug) => slug !== "all");
  const productSlugs = getCatalogProductSlugs();

  const entries = [
    buildUrlEntry(`${baseUrl}/`, lastmod, "weekly", "1.0"),
    buildUrlEntry(`${baseUrl}/about`, lastmod, "monthly", "0.6"),
    buildUrlEntry(`${baseUrl}/catalog`, lastmod, "weekly", "0.9"),
    buildUrlEntry(`${baseUrl}/contacts`, lastmod, "monthly", "0.5"),
    ...typeSlugs.map((slug) =>
      buildUrlEntry(`${baseUrl}/catalog/type/${slug}`, lastmod, "weekly", "0.8")
    ),
    ...productSlugs.map((slug) =>
      buildUrlEntry(`${baseUrl}/catalog/product/${slug}`, lastmod, "weekly", "0.7")
    )
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.join(""),
    "</urlset>"
  ].join("");
};

module.exports = {
  buildSitemapXml
};
