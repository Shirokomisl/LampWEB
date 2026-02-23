const getHomePageData = () => {
  return {
    pageTitle: "GÉOMETRIA | Главная",
    brandName: "GÉOMETRIA",
    yearLabel: "UFO & Dea Collection",
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
        "GEOMETRIA – молодой, но динамично развивающий бренд поддерживающий концепцию, что простые формы несут в себе более сложный замысел, заложенный в их создание. Мы не работаем с прямыми источниками света – мы рисуем образы с помощью отраженного и рассеянного света, наполняя помещение особой атмоcферой уюта и комфорта.",
        "Наш слоган: 'Свет имеет форму' - особым смыслом передает концепцию наших продуктов, каждый их которых сделан исключительно вручную и согрет теплом наших рук."
      ],
      sideImage: "/images/motto.PNG",
      aboutLabel: "ПОДРОБНЕЕ О БРЕНДЕ",
      aboutHref: "/about"
    },
    productCollections: [
      {
        categoryTitle: "Подвесные светильники UFO Hanging",
        coverImage: "/images/interier-hanging.jpg",
        href: "/catalog/type/hanging"
      },
      {
        categoryTitle: "Настенные светильники UFO Wall",
        coverImage: "/images/wall-card-engle.jpg",
        href: "/catalog/type/wall"
      },
      {
        categoryTitle: "Торшер Dea",
        coverImage: "/images/dea.jpg",
        href: "/catalog/type/floor"
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
      phone: "7 (900) 325-47-10",
      email: "geometria_orders@mail.ru",
      formPlaceholder:
        "[Форма-заглушка] Функциональная отправка будет добавлена на следующем этапе."
    },
    footerNote:
      "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска."
  };
};

const getContactsPageData = () => {
  return {
    pageTitle: "GÉOMETRIA | Контакты",
    brandName: "GÉOMETRIA",
    yearLabel: "UFO & Dea Collection",
    footerNote:
      "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    hero: {
      brandLine: "GÉOMETRIA",
      title: "КОНТАКТЫ",
      // Временный loop-видео источник. Можно заменить на локальный mp4 в public/videos.
      videoSrc: "/videos/contacts-video.MOV",
      videoType: "video/quicktime",
      poster: "/images/studio-head.jpg"
    },
    contactInfo: {
      phoneDisplay: "7 900 325 47 10",
      phoneLink: "+79003254710",
      email: "geometria_orders@mail.ru",
      addressLines: [
        "Казань, Проспект Победы, 159"
      ],
      socials: [
        { name: "Instagram", short: "IG", href: "https://www.instagram.com/geometria_light?igsh=dHo0YzdnanB6ZmFm&utm_source=qr" },
        { name: "Telegram", short: "TG", href: "#" },
        { name: "Pinterest", short: "PN", href: "#" },
        { name: "YouTube", short: "YT", href: "#" }
      ],
      legalLines: ["ИП Пикулева Карина Ильдаровна", "ОГРНИП 320169000078972"],
      officeImage: "/images/IMG_6454.jpg"
    },
    formBlock: {
      title: "НАПИШИТЕ НАМ",
      subtitle:
        "Пожалуйста, направьте ваш запрос по форме, представленной ниже. Мы свяжемся с вами в ближайшее время.",
      submitLabel: "ОТПРАВИТЬ",
      policyText:
        "Нажимая кнопку «Отправить», вы соглашаетесь на обработку персональных данных"
    },
    mapBlock: {
      mapImage:
        "/images/yandex-cards.png",
      pinImage: "/images/office-image.jpg",
      addressLabel: "ПРОСПЕКТ ПОБЕДЫ, 159",
      mapLinkLabel: "ОТКРЫТЬ В ЯНДЕКС КАРТАХ",
      mapLink: "https://yandex.com/maps/org/salon_m_z_gallery_tts_mzlife/1131107486/?ll=49.211029%2C55.799493&z=17.2"
    }
  };
};

module.exports = {
  getHomePageData,
  getContactsPageData
};
