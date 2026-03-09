const express = require("express");
const homeController = require("../controllers/homeController");
const { contactRateLimiter } = require("../middleware/contactRateLimiter");
const { getSitemapXml, buildRobotsTxt } = require("../services/sitemapService");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/about", homeController.renderAbout);
router.get("/contacts", homeController.renderContacts);
router.get("/sitemap.xml", (req, res) => {
  res.set("Cache-Control", "public, max-age=21600");
  res.type("application/xml").send(getSitemapXml(req));
});
router.get("/robots.txt", (req, res) => {
  res.set("Cache-Control", "public, max-age=21600");
  res.type("text/plain").send(buildRobotsTxt(req));
});
router.get("/catalog", homeController.renderCatalog);
router.get("/catalog/type/:typeSlug", homeController.renderCatalogByType);
router.get("/catalog/product/:productSlug", homeController.renderCatalogProduct);
router.post("/contact/submit", contactRateLimiter, homeController.submitContact);

// Временная заглушка только для не реализованного раздела дизайнеров.
router.get("/:pageSlug(designers)", homeController.renderPlaceholderPage);

module.exports = router;
