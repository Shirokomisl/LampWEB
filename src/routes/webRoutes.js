const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/contacts", homeController.renderContacts);
router.get("/catalog", homeController.renderCatalog);
router.get("/catalog/type/:typeSlug", homeController.renderCatalogByType);
router.get("/catalog/product/:productSlug", homeController.renderCatalogProduct);

// Для нереализованных разделов ведем на шаблонную заглушку.
router.get(
  "/:pageSlug(projects|about|designers)",
  homeController.renderPlaceholderPage
);

module.exports = router;
