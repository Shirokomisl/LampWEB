const getHomePageData = () => {
  return {
    pageTitle: "ГÉОМЕТРИЯ | Главная",
    headerLogo: "/images/logo-ru_1920.png",
    footerBrandName: "ГÉОМЕТРИЯ",
    hero: {
      eyebrow: "Свет имеет форму",
      title: "ГÉОМЕТРИЯ",
      description:
        "Универсальное решение для любого интерьера\nСвет, который движется вместе с вами",
      primaryCta: {
        label: "Связаться с экспертом",
        href: "#contact-point"
      },
      secondaryCta: {
        label: "Открыть каталог",
        href: "/catalog"
      },
      backgroundImage: "/images/header-background.png",
      backgroundPosition: "1% center"
    },
    // Блок девиза бренда перед витриной линеек.
    brandMotto: {
      logoSign: "/images/logo-cube.png",
      logoName: "ГÉОМЕТРИЯ",
      title: "СВЕТ ИМЕЕТ ФОРМУ",
      shortLines: [
        "ГÉОМЕТРИЯ – молодой, но динамично развивающий бренд поддерживающий концепцию, что простые формы несут в себе более сложный замысел, заложенный в их создание. Мы не работаем с прямыми источниками света – мы рисуем образы с помощью отраженного и рассеянного света, наполняя помещение особой атмоcферой уюта и комфорта.",
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
        coverImage: "/images/3.4.png",
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
        "ГÉОМЕТРИЯ — семейная мастерская, основанная в 2023 году. Каждый светильник мы изготавливаем вручную, с фокусом на качестве, уникальности метериалов и точности ручной сборки",
      // sideFact:
      //   "Более 20 мастеров и специалистов различных направлений участвуют в создании каждого изделия, объединяя ремесленные традиции и современные технологии.",
      paragraphs: [
        "За годы работы команда ГÉОМЕТРИЯ достигла высокого уровня в обработке металла, стекла и камня, продолжая ежедневно разрабатывать новые формы, конструкции и световые решения.",
        "Коллекция ГÉОМЕТРИЯ регулярно пополняется уникальными моделями, при создании которых используются качественные материалы, ручная сборка и авторские методы обработки, обеспечивающие выразительный внешний вид и долговечность каждого светильника."
      ]
    },
    contactPoint: {
      title: "Точка контакта",
      description:
        "Оставьте контакт, чтобы получить подборку света под ваш интерьерный проект.",
      phone: "7 (900) 325-47-10",
      email: "geometria_orders@mail.ru"
      // formPlaceholder:
      //   "[Форма-заглушка] Функциональная отправка будет добавлена на следующем этапе."
    },
    footerNote:
      ""
  };
};

const getContactsPageData = () => {
  return {
    pageTitle: "ГÉОМЕТРИЯ | Контакты",
    headerLogo: "/images/logo-ru_1920.png",
    footerBrandName: "ГÉОМЕТРИЯ",
    // footerNote:
    //   "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    hero: {
      brandLine: "ГÉОМЕТРИЯ",
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
      legalLines: ["СЗ Тягунов Сергей Владимирович", "ИНН 165706755959"],
      officeImage: "/images/IMG_6454.jpg"
    },
    formBlock: {
      title: "НАПИШИТЕ НАМ",
      subtitle:
        "Пожалуйста, направьте ваш запрос по форме, представленной ниже. Мы свяжемся с вами в ближайшее время.",
      submitLabel: "ОТПРАВИТЬ",
      policyText:
        "Нажимая кнопку «Отправить», вы соглашаетесь с <a href=\"/files/user-agreement.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">пользовательским соглашением</a>"
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

const getAboutPageData = () => {
  return {
    pageTitle: "ГÉОМЕТРИЯ | О бренде",
    headerLogo: "/images/logo-ru_1920.png",
    footerBrandName: "ГÉОМЕТРИЯ",
    // footerNote:
    //   "[Юридическая заглушка] ООО «Название компании». ИНН/ОГРН и документы добавляются на этапе запуска.",
    introVideo: {
      brandLine: "ГÉОМЕТРИЯ",
      title: "О БРЕНДЕ",
      videoSrc: "/videos/contacts-video.MOV",
      videoType: "video/quicktime",
      poster: "/images/studio-head.jpg"
    },
    hero: {
      eyebrow: "О БРЕНДЕ",
      title: "СВЕТ, СОЗДАННЫЙ ВРУЧНУЮ",
      lead:
        "ГÉОМЕТРИЯ —  молодой, но динамично развивающийся Российский бренд по производству дизайнерского освещения. Основанный в 2023 году, как семейная студия, мы по сей день придерживаемся  традициям ручного производства каждого экземпляра. В основе ДНК наших продуктов – это работа с рассеянным светом, где свет выходит за границы своего прямого назначения и становится частью атмосферы помещения наполняя его невероятной аурой уюта. Разрушая стереотипы о ценовой недоступности подобных изделий – мы делаем наши продукты ближе к нашим Клиентам."
    },
    strengths: [
      {
        title: "Качество",
        description:
          "Контролируем каждый этап: от подбора материалов до финальной сборки и проверки светового рисунка."
      },
      {
        title: "Уникальные материалы",
        description:
          "Используем выразительные материалы и фактуры, чтобы каждый светильник выглядел индивидуально."
      },
      {
        title: "Полностью ручная работа",
        description:
          "Без конвейера и массовых тиражей: каждое изделие собирается вручную и доводится до результата в мастерской."
      }
    ],
    storyPhotosTop: [
      {
        image: "/images/glass_hanging-gallery6.jpg",
        caption: "НАША ЭСТЕТИКА"
      },
      {
        image: "/images/stone-veneer.png",
        caption: "НЕОБРАБОТАННЫЙ КАМЕННЫЙ ШПОН"
      }
    ],
    videoBlocks: [
      {
        eyebrow: "Производство",
        title: "Ручная сборка в мастерской",
        description:
          "Все процессы выполняются вручную: подготовка деталей, подгонка элементов, финишная обработка и проверка качества света.",
        videoSrc: "/videos/veneer_cutting.MOV",
        videoType: "video/quicktime",
        poster: "/images/studio-head.jpg"
      },
      {
        eyebrow: "Материалы",
        title: "Фактура, тактильность, долговечность",
        description:
          "Мы делаем акцент на материалах, которые раскрываются в интерьере по фактуре, глубине оттенка и тактильным ощущениям.",
        videoSrc: "/videos/contacts-video.MOV",
        videoType: "video/quicktime",
        poster: "/images/studio-head.jpg"
      }
    ],
    iconFeatures: [
      {
        icon: "/images/about-icon-workshop.svg",
        text: "Собственная мастерская по металлообработке — каждое изделие проходит ручной контроль качества"
      },
      {
        icon: "/images/about-icon-box.svg",
        text: "Надежная упаковка перед отправкой — бережная защита изделия при транспортировке"
      },
      {
        icon: "/images/about-icon-craft.svg",
        text: "Небольшое ремесленное производство — фокус на качестве, а не на количестве"
      }
    ],
    delivery: {
      title: "ОСУЩЕСТВЛЯЕМ ПОСТАВКИ ПО ВСЕЙ ТЕРРИТОРИИ РОССИИ",
      productImage: "/images/russia_shaped-interier-no_background.png",
      lead:
        "Доставка заказов выполняется по всей России. Мы заранее согласовываем сроки и формат отправки."
    },
    storyPhotosBottom: [
      {
        image: "/images/hand-work.jpg",
        caption: "НЕИСПОЛЬЗОВАННЫЙ ПОДВЕС"
      },
      {
        image: "/images/glass_hanging-gallery7.jpg",
        caption: "НАША ЭСТЕТИКА"
      }
    ]
  };
};

const getDesignersPageData = () => {
  return {
    pageTitle: "ГÉОМЕТРИЯ | Для дизайнеров",
    headerLogo: "/images/logo-ru_1920.png",
    footerBrandName: "ГÉОМЕТРИЯ",
    hero: {
      eyebrow: "Для дизайнеров",
      title: "3D-модели по запросу.",
      description: [
        "Рынок дизайнерского освещения за последние годы пережил достаточно серьезные трансформации. Кто-то, работая с взыскательной аудиторией, адаптируется под все более сложные каналы поставок из Европы, другие выходят на китайские фабрики, которые могут дать любое прогнозируемое качество и понятные сроки поставки. И это нормально.",
        "Но есть и другой, более простой и понятный путь, объединяющий в себе все преимущества – локальный российский производитель, без конвейера и массовых тиражей, делающий эксклюзивные вещи, слышащего вас и вашего клиента, способный выдать высокое качество вкратчайшие сроки."
      ],
      highlight:
        "Мы предлагаем дизайнерам и комплектаторам привлекательные условия сотрудничества в виде гибкого ценообразования, расширенной складской программы, кастомизации под персональные требования ваших заказчиков в самые короткие сроки. Мы не где-то там, мы здесь, свои и без ложной гордости заявляем: «Сделано в Казани для лучших интерьеров России».",
      image: "/images/IMG_6454.jpg"
    },
    gridImages: [
      {
        src: "/images/IMG_0932.jpg",
        alt: "Производство светильников в мастерской"
      },
      {
        src: "/images/hand-work.jpg",
        alt: "Ручная работа над деталями светильника"
      },
      {
        src: "/images/IMG_0933.jpg",
        alt: "Финальная сборка и контроль качества"
      }
    ],
    actions: {
      request3dLabel: "СКАЧАТЬ 3D-МОДЕЛИ",
      request3dTitle: "ЗАПРОС 3D МОДЕЛИ",
      request3dSubtitle:
        "Оставьте заявку, чтобы получить полный набор 3D моделей. Мы свяжемся с вами и уточним детали.",
      request3dType: "designers-3d",
      request3dOrigin: "designers-3d",
      catalogPdfLabel: "КАТАЛОГ В PDF",
      catalogPdfHref: "/files/ufo-catalog.pdf"
    },
    requestDrawer: {
      title: "ЗАПРОС 3D МОДЕЛЕЙ",
      subtitle:
        "Оставьте запрос по форме, и мы свяжемся с вами в ближайшее время.",
      submitLabel: "ОТПРАВИТЬ",
      policyText:
        "Нажимая кнопку «Отправить», вы соглашаетесь с <a href=\"/files/user-agreement.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">пользовательским соглашением</a>"
    }
  };
};

module.exports = {
  getHomePageData,
  getContactsPageData,
  getAboutPageData,
  getDesignersPageData
};
