const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.renderHome);

// Для нереализованных разделов ведем на шаблонную заглушку.
router.get(
  "/:pageSlug(catalog|projects|about|contacts|designers)",
  homeController.renderPlaceholderPage
);

module.exports = router;

