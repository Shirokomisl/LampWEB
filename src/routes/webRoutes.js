const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/about", homeController.renderAbout);
router.get("/contacts", homeController.renderContacts);
router.get("/catalog", homeController.renderCatalog);
router.get("/catalog/type/:typeSlug", homeController.renderCatalogByType);
router.get("/catalog/product/:productSlug", homeController.renderCatalogProduct);

// Временная заглушка только для не реализованного раздела дизайнеров.
router.get("/:pageSlug(designers)", homeController.renderPlaceholderPage);

module.exports = router;

