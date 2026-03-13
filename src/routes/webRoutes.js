const express = require("express");
const homeController = require("../controllers/homeController");
const { contactRateLimiter } = require("../middleware/contactRateLimiter");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/about", homeController.renderAbout);
router.get("/designers", homeController.renderDesigners);
router.get("/contacts", homeController.renderContacts);
router.get("/catalog", homeController.renderCatalog);
router.get("/catalog/type/:typeSlug", homeController.renderCatalogByType);
router.get("/catalog/product/:productSlug", homeController.renderCatalogProduct);
router.post("/contact/submit", contactRateLimiter, homeController.submitContact);

// Временная заглушка только для не реализованного раздела дизайнеров.
module.exports = router;
