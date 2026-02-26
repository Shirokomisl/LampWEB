const path = require("path");
const express = require("express");
const helmet = require("helmet");
const webRoutes = require("./src/routes/webRoutes");

require("dotenv").config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// ������� ������������ ������������� � ����������� ������.
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
        scriptSrc: ["'self'", "https://challenges.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://challenges.cloudflare.com"],
        frameSrc: ["'self'", "https://challenges.cloudflare.com"],
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

// ������ �������� ��� ����� �������������� URL.
app.use((req, res) => {
  res.status(404).render("placeholders/page", {
    pageTitle: "�������� �� �������",
    pageName: "404",
    placeholderLead:
      "[��������-��������] ������ �� ���������� ��� ��� ���������.",
    placeholderBody:
      "[�����-��������] �������� ����� �������� ��������� ������� � ������ ��������.",
    actionHref: "/",
    actionLabel: "��������� �� �������"
  });
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
