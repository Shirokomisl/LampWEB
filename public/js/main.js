const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#site-nav");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });
}

// Smooth reveal for sections on scroll.
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });

      history.pushState(null, "", targetId);
    });
  });

  const productTabs = Array.from(document.querySelectorAll("[data-product-tab]"));

  if (productTabs.length > 0) {
    const targetSections = productTabs
      .map((tabLink) => {
        const sectionId = tabLink.getAttribute("href");
        if (!sectionId || !sectionId.startsWith("#")) {
          return null;
        }
        return document.querySelector(sectionId);
      })
      .filter(Boolean);

    const setActiveTab = (hashValue) => {
      productTabs.forEach((tabLink) => {
        tabLink.classList.toggle("is-active", tabLink.getAttribute("href") === hashValue);
      });
    };

    productTabs.forEach((tabLink) => {
      tabLink.addEventListener("click", () => {
        const hashValue = tabLink.getAttribute("href");
        if (hashValue) {
          setActiveTab(hashValue);
        }
      });
    });

    if (targetSections.length > 0) {
      const tabObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab(`#${entry.target.id}`);
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );

      targetSections.forEach((sectionItem) => tabObserver.observe(sectionItem));
    }

    const clearTabsSection = document.querySelector("[data-product-tabs-clear]");

    if (clearTabsSection) {
      const clearObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab("");
            }
          });
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
      );

      clearObserver.observe(clearTabsSection);
    }
  }

  const stickyVisual = document.querySelector(".catalog-product-sticky-visual");
  const largeLead = document.querySelector("#about-product .catalog-product-lead");
  const aboutSection = document.querySelector("#about-product");
  const priceSection = document.querySelector("#product-price");
  const stickyVisualImage = stickyVisual ? stickyVisual.querySelector("img") : null;
  const tabsBar = document.querySelector(".catalog-product-tabs");
  const desktopStickyMediaQuery = window.matchMedia("(min-width: 1280px)");

  if (stickyVisual && largeLead && aboutSection && priceSection) {
    let stickyState = "pre";
    let naturalDocumentTop = 0;

    const getStartThreshold = () => {
      const tabsBottom = tabsBar ? tabsBar.getBoundingClientRect().bottom : 0;
      return Math.max(0, tabsBottom + 6);
    };

    const getTargetTop = () => {
      const stickyHeight = stickyVisual.getBoundingClientRect().height;
      const minTop = getStartThreshold() + 8;
      const maxTop = Math.max(minTop, window.innerHeight - stickyHeight - 24);
      const dividerViewportY = priceSection.getBoundingClientRect().top;
      return Math.max(minTop, Math.min(maxTop, dividerViewportY - stickyHeight / 2));
    };

    const refreshStickyMetrics = () => {
      const stickyHeight = stickyVisual.getBoundingClientRect().height;
      const aboutRect = aboutSection.getBoundingClientRect();
      const priceRect = priceSection.getBoundingClientRect();
      const dividerWithinAbout = priceRect.top - aboutRect.top;
      const initialMarginTop = Math.max(0, dividerWithinAbout - stickyHeight / 2);

      stickyVisual.style.marginTop = `${initialMarginTop}px`;
      stickyVisual.style.setProperty("--sticky-target-top", `${getTargetTop()}px`);
      naturalDocumentTop = stickyVisual.getBoundingClientRect().top + window.scrollY;
    };

    const enterPreState = () => {
      stickyState = "pre";
      stickyVisual.classList.remove("is-sticky-ready", "is-sticky-ended");
      stickyVisual.style.removeProperty("--sticky-lock-y");
      stickyVisual.style.top = "";
      stickyVisual.style.transform = "";
      refreshStickyMetrics();
    };

    const enterActiveState = () => {
      const currentTop = stickyVisual.getBoundingClientRect().top;
      const targetTop = getTargetTop();

      stickyState = "active";
      stickyVisual.classList.remove("is-sticky-ended");
      stickyVisual.style.removeProperty("--sticky-lock-y");
      stickyVisual.style.top = `${currentTop}px`;
      stickyVisual.style.setProperty("--sticky-target-top", `${targetTop}px`);
      stickyVisual.classList.add("is-sticky-ready");

      requestAnimationFrame(() => {
        stickyVisual.style.top = `${targetTop}px`;
      });
    };

    const enterPostState = () => {
      const currentTop = stickyVisual.getBoundingClientRect().top;
      const naturalViewportTop = naturalDocumentTop - window.scrollY;
      const lockOffset = currentTop - naturalViewportTop;

      stickyState = "post";
      stickyVisual.classList.remove("is-sticky-ready");
      stickyVisual.classList.add("is-sticky-ended");
      stickyVisual.style.top = "";
      stickyVisual.style.setProperty("--sticky-lock-y", `${lockOffset}px`);
    };

    const updateStickyState = () => {
      if (!desktopStickyMediaQuery.matches) {
        stickyVisual.classList.remove("is-sticky-ready", "is-sticky-ended");
        stickyVisual.style.top = "";
        stickyVisual.style.transform = "";
        stickyVisual.style.removeProperty("--sticky-lock-y");
        stickyVisual.style.marginTop = "";
        return;
      }

      const leadBottom = largeLead.getBoundingClientRect().bottom;
      const priceBottom = priceSection.getBoundingClientRect().bottom;
      const startThreshold = getStartThreshold();
      const startReached = leadBottom <= startThreshold;
      const endReached = priceBottom <= startThreshold;

      if (!startReached) {
        if (stickyState !== "pre") {
          enterPreState();
        } else {
          refreshStickyMetrics();
        }
        return;
      }

      if (!endReached) {
        if (stickyState !== "active") {
          enterActiveState();
        }
        return;
      }

      if (stickyState !== "post") {
        enterPostState();
      }
    };

    const syncSticky = () => {
      refreshStickyMetrics();
      updateStickyState();
    };

    refreshStickyMetrics();
    updateStickyState();

    window.addEventListener("scroll", updateStickyState, { passive: true });
    window.addEventListener("resize", syncSticky);

    if (stickyVisualImage) {
      if (stickyVisualImage.complete) {
        syncSticky();
      } else {
        stickyVisualImage.addEventListener("load", syncSticky, { once: true });
      }
    }
  }

  const sizeButtons = Array.from(document.querySelectorAll("[data-size-option]"));
  const productPriceValue = document.querySelector("[data-product-price-value]");
  const sizeInput = document.querySelector("[data-product-size-input]");

  const formatRubPrice = (priceValue) =>
    `${new Intl.NumberFormat("ru-RU").format(priceValue)} ₽`;

  if (sizeButtons.length > 0) {
    sizeButtons.forEach((buttonItem) => {
      buttonItem.addEventListener("click", () => {
        sizeButtons.forEach((innerButton) => innerButton.classList.remove("is-active"));
        buttonItem.classList.add("is-active");

        if (sizeInput) {
          sizeInput.value = buttonItem.textContent.trim();
        }

        if (!productPriceValue) {
          return;
        }

        const nextPrice = Number(buttonItem.dataset.sizePrice);

        if (!Number.isFinite(nextPrice) || nextPrice <= 0) {
          return;
        }

        productPriceValue.textContent = formatRubPrice(nextPrice);
        productPriceValue.dataset.productPriceRaw = String(nextPrice);
      });
    });

    const activeButton = sizeButtons.find((buttonItem) =>
      buttonItem.classList.contains("is-active")
    );
    if (activeButton && sizeInput) {
      sizeInput.value = activeButton.textContent.trim();
    }
  }

  const requestDrawer = document.querySelector("[data-request-drawer]");
  const requestOverlay = document.querySelector("[data-request-overlay]");
  const requestOpenButton = document.querySelector("[data-open-request]");
  const requestCloseButton = document.querySelector("[data-request-close]");

  const closeRequestDrawer = () => {
    if (!requestDrawer || !requestOverlay) {
      return;
    }
    requestDrawer.classList.remove("is-open");
    requestOverlay.classList.remove("is-open");
    requestDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-request-open");
  };

  const openRequestDrawer = () => {
    if (!requestDrawer || !requestOverlay) {
      return;
    }
    requestDrawer.classList.add("is-open");
    requestOverlay.classList.add("is-open");
    requestDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-request-open");
  };

  if (requestOpenButton) {
    requestOpenButton.addEventListener("click", openRequestDrawer);
  }

  if (requestCloseButton) {
    requestCloseButton.addEventListener("click", closeRequestDrawer);
  }

  if (requestOverlay) {
    requestOverlay.addEventListener("click", closeRequestDrawer);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeRequestDrawer();
    }
  });

  const gallerySlider = document.querySelector("[data-gallery-slider]");

  if (gallerySlider) {
    const mainImage = gallerySlider.querySelector("[data-gallery-main-image]");
    const prevButton = gallerySlider.querySelector("[data-gallery-prev]");
    const nextButton = gallerySlider.querySelector("[data-gallery-next]");
    const thumbnailButtons = Array.from(gallerySlider.querySelectorAll("[data-gallery-thumb]"));

    if (mainImage && thumbnailButtons.length > 0) {
      let currentIndex = Math.max(
        0,
        thumbnailButtons.findIndex((thumbButton) => thumbButton.classList.contains("is-active"))
      );

      const setActiveImage = (nextIndex) => {
        currentIndex = (nextIndex + thumbnailButtons.length) % thumbnailButtons.length;
        const activeThumb = thumbnailButtons[currentIndex];
        const imageSrc = activeThumb.dataset.galleryImage;
        const imageTitle =
          activeThumb.dataset.galleryTitle ||
          activeThumb.querySelector("img")?.alt ||
          "Фото товара";

        if (imageSrc) {
          mainImage.src = imageSrc;
        }
        mainImage.alt = imageTitle;

        thumbnailButtons.forEach((thumbButton, thumbIndex) => {
          const isCurrent = thumbIndex === currentIndex;
          thumbButton.classList.toggle("is-active", isCurrent);
          thumbButton.setAttribute("aria-current", isCurrent ? "true" : "false");
        });
      };

      thumbnailButtons.forEach((thumbButton, thumbIndex) => {
        thumbButton.addEventListener("click", () => {
          setActiveImage(thumbIndex);
        });
      });

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          setActiveImage(currentIndex - 1);
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          setActiveImage(currentIndex + 1);
        });
      }

      setActiveImage(currentIndex);
    }
  }
});
