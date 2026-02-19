const path = require("path");
const express = require("express");
const webRoutes = require("./src/routes/webRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Базовая конфигурация шаблонизатора и статических файлов.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRoutes);

// Единая заглушка для любых несуществующих URL.
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

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

