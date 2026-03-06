const path = require("path");
const express = require("express");
const helmet = require("helmet");

require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });
const webRoutes = require("./src/routes/webRoutes");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

// Express + EJS setup.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.set("trust proxy", Number(process.env.TRUST_PROXY || 0));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://www.google.com"],
        frameSrc: ["'self'", "https://www.google.com"],
        mediaSrc: ["'self'", "blob:", "data:"],
        formAction: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.urlencoded({ extended: false, limit: "25kb" }));
app.use(express.json({ limit: "25kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRoutes);

// Default 404 page.
app.use((req, res) => {
  res.status(404).render("placeholders/page", {
    pageTitle: "Страница не найдена",
    pageName: "404",
    placeholderLead:
      "[Страница-заглушка] Раздел не реализован или был перемещен.",
    placeholderBody:
      "[Текст-заглушка] Добавьте здесь понятную навигацию обратно к нужным разделам.",
    actionHref: "/",
    actionLabel: "Вернуться на главную"
  });
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
  });
}

module.exports = app;
