const getHomePageData = () => {
  return {
    pageTitle: "UFO Atelier | Главная",
    brandName: "Géometria",
    yearLabel: "UFO Collection",
    hero: {
      eyebrow: "Light has the form",
      title: "GÉOMETRIA",
      description:
        "Универсальное решение для любого интерьера\nСвет, который движется вместе с вами",
      primaryCta: {
        label: "Связаться с экспертом",
        href: "#contact-point"
      },
      secondaryCta: {
        label: "Открыть каталог-заглушку",
        href: "/catalog"
      },
      backgroundImage: "/images/studio-head.jpg"
    },
    // Блок девиза бренда перед витриной линеек.
    brandMotto: {
      logoSign: "/images/logo-cube.png",
      logoName: "GÉOMETRIA",
      est: "EST 2025",
      title: "THE LIGHT HAS ITS FORM",
      shortLines: [
        "В своей работе мы соединяем воедино столярное искусство со столетними традициями и смелость современных материалов, таких как керамика и металл.",
        "От классики до современности, от традиционных до самых смелых решений – мы создае для вас те изделия, которые удовлетворят именно ваши представления о прекрасном."
      ],
      sideImage: "/images/motto.PNG",
      aboutLabel: "ПОДРОБНЕЕ О БРЕНДЕ",
      aboutHref: "/about"
    },
    productCollections: [
      {
        categoryTitle: "Подвесные светильники UFO Hanging",
        coverImage: "/images/hanging.jpg",
        href: "/catalog"
      },
      {
        categoryTitle: "Настенные светильники UFO Wall",
        coverImage: "/images/pandora.JPG",
        href: "/catalog"
      },
      {
        categoryTitle: "Торшер Dea",
        coverImage: "/images/dea.jpg",
        href: "/catalog"
      }
    ],
    trustBlocks: [
      {
        title: "УНИКАЛЬНАЯ ТЕКСТУРА МАТЕРИАЛА",
        image: "/images/texture.jpg"
      },
      {
        title: "РУЧНАЯ РАБОТА",
        image: "/images/hand-work.jpg"
      },
      {
        title: "ВЫСОКОКАЧЕСТВЕННОЕ СЫРЬЕ",
        image: "/images/quality.jpg"
      }
    ],
    brandStatement: {
      lead:
        "GÉOMETRIA — мастерская авторских светильников ручной работы, основанная в 2019 году на базе экспериментальной студии предметного дизайна.",
      sideFact:
        "Более 20 мастеров и специалистов различных направлений участвуют в создании каждого изделия, объединяя ремесленные традиции и современные технологии.",
      paragraphs: [
        "За годы работы команда GÉOMETRIA достигла высокого уровня в обработке металла, стекла и акрила, продолжая ежедневно разрабатывать новые формы, конструкции и световые решения.",
        "Коллекция GÉOMETRIA регулярно пополняется уникальными моделями, при создании которых используются качественные материалы, ручная сборка и авторские методы обработки, обеспечивающие выразительный внешний вид и долговечность каждого светильника."
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
