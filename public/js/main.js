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
  const desktopStickyMediaQuery = window.matchMedia("(min-width: 1281px)");

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

  const formatRubPrice = (priceValue) =>
    `${new Intl.NumberFormat("ru-RU").format(priceValue)} ₽`;

  if (sizeButtons.length > 0) {
    sizeButtons.forEach((buttonItem) => {
      buttonItem.addEventListener("click", () => {
        sizeButtons.forEach((innerButton) => innerButton.classList.remove("is-active"));
        buttonItem.classList.add("is-active");

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
  }

  const gallerySlider = document.querySelector("[data-gallery-slider]");

  if (gallerySlider) {
    const track = gallerySlider.querySelector("[data-gallery-track]");
    const prevButton = gallerySlider.querySelector("[data-gallery-prev]");
    const nextButton = gallerySlider.querySelector("[data-gallery-next]");
    const slides = track ? Array.from(track.children) : [];

    if (track && prevButton && nextButton && slides.length > 0) {
      let currentIndex = 0;
      const slideShare = 100 / slides.length;

      track.style.width = `${slides.length * 100}%`;
      slides.forEach((slideItem) => {
        slideItem.style.flex = `0 0 ${slideShare}%`;
      });

      const updateGallery = () => {
        track.style.transform = `translateX(-${currentIndex * slideShare}%)`;
      };

      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateGallery();
      });

      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateGallery();
      });

      window.addEventListener("resize", updateGallery);
      updateGallery();
    }
  }
});
