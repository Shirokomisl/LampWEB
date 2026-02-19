const getHomePageData = () => {
  return {
    pageTitle: "UFO Atelier | Главная",
    brandName: "UFO Atelier",
    yearLabel: "2026 Collection",
    hero: {
      eyebrow: "Сдержанная премиальная эстетика света",
      title: "[Заголовок-заглушка: сильное УТП в 1 строку]",
      description:
        "[Текст-заглушка] Здесь будет короткое описание ценности для дизайнеров, комплектаторов и частных клиентов 24+.",
      primaryCta: {
        label: "Связаться с экспертом",
        href: "#contact-point"
      },
      secondaryCta: {
        label: "Открыть каталог-заглушку",
        href: "/catalog"
      },
      backgroundImage: "https://picsum.photos/seed/ufo-premium-hero/1800/1200"
    },
    // Блок девиза бренда перед витриной линеек.
    brandMotto: {
      logoSign: "UA",
      logoName: "UFO Atelier",
      est: "EST 2025",
      title: "THE LIGHT HAS ITS FORM",
      shortLines: [
        "[Короткое предложение-заглушка] Каждая линия света собрана как интерьерный объект.",
        "[Короткое предложение-заглушка] Форма и материал работают на статус пространства."
      ],
      sideImage: "https://picsum.photos/seed/ufo-brand-motto/520/340",
      aboutLabel: "ПОДРОБНЕЕ О БРЕНДЕ",
      aboutHref: "/about"
    },
    productCollections: [
      {
        categoryTitle: "Подвесные светильники UFO Hanging",
        coverImage: "https://picsum.photos/seed/ufo-hanging/1600/1300",
        href: "/catalog"
      },
      {
        categoryTitle: "Настенные светильники UFO Wall",
        coverImage: "https://picsum.photos/seed/ufo-wall/1600/1300",
        href: "/catalog"
      },
      {
        categoryTitle: "Торшер Dea",
        coverImage: "https://picsum.photos/seed/dea-floor-lamp/1600/1300",
        href: "/catalog"
      }
    ],
    trustBlocks: [
      {
        title: "[Преимущество-заглушка 01]",
        image: "https://picsum.photos/seed/ufo-trust-01/900/700"
      },
      {
        title: "[Преимущество-заглушка 02]",
        image: "https://picsum.photos/seed/ufo-trust-02/900/700"
      },
      {
        title: "[Преимущество-заглушка 03]",
        image: "https://picsum.photos/seed/ufo-trust-03/900/700"
      }
    ],
    brandStatement: {
      lead:
        "UFO Atelier — [текст-заглушка] премиальная студия света для интерьеров с выразительным характером и архитектурной глубиной.",
      sideFact:
        "[Факт-заглушка] более 40 специалистов разного профиля работают над коллекциями и проектами бренда.",
      paragraphs: [
        "[Абзац-заглушка] Мы объединяем ремесленную точность, технологичные материалы и художественный подход к форме света.",
        "[Абзац-заглушка] Каждая модель проектируется как самостоятельный объект и как часть цельного интерьерного сценария."
      ]
    },
    contactPoint: {
      title: "[Точка контакта: заголовок-заглушка]",
      description:
        "[Текст-заглушка] Оставьте контакт, чтобы получить подборку света под ваш интерьерный проект.",
      phone: "+7 (000) 000-00-00",
      email: "hello@ufo-atelier.example",
      formPlaceholder:
        "[Форма-заглушка] Функциональная отправка будет добавлена на следующем этапе."
    },
    footerNote:
      "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска."
  };
};

module.exports = {
  getHomePageData
};
