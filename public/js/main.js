const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#site-nav");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });
}

// Плавное появление блоков при прокрутке.
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

  const catalogGrid = document.querySelector("[data-catalog-grid]");
  const viewSwitcher = document.querySelector("[data-view-switcher]");

  if (catalogGrid && viewSwitcher) {
    const viewButtons = Array.from(
      viewSwitcher.querySelectorAll("button[data-view-size]")
    );
    const storageKey = "catalog_card_size";

    const applyCatalogSize = (sizeValue) => {
      const allowedSizes = ["small", "medium", "large"];
      const nextSize = allowedSizes.includes(sizeValue) ? sizeValue : "medium";

      catalogGrid.classList.remove("is-small", "is-medium", "is-large");
      catalogGrid.classList.add(`is-${nextSize}`);

      viewButtons.forEach((buttonItem) => {
        buttonItem.classList.toggle(
          "is-active",
          buttonItem.dataset.viewSize === nextSize
        );
      });
    };

    const savedSize = localStorage.getItem(storageKey) || "medium";
    applyCatalogSize(savedSize);

    viewButtons.forEach((buttonItem) => {
      buttonItem.addEventListener("click", () => {
        const nextSize = buttonItem.dataset.viewSize || "medium";
        applyCatalogSize(nextSize);
        localStorage.setItem(storageKey, nextSize);
      });
    });
  }

  const priceDropdown = document.querySelector("[data-price-dropdown]");

  if (priceDropdown) {
    const toggleButton = priceDropdown.querySelector("[data-price-toggle]");
    const priceMenu = priceDropdown.querySelector("[data-price-menu]");

    if (toggleButton && priceMenu) {
      const closePriceDropdown = () => {
        priceDropdown.classList.remove("is-open");
        toggleButton.setAttribute("aria-expanded", "false");
      };

      toggleButton.addEventListener("click", () => {
        const isOpen = priceDropdown.classList.toggle("is-open");
        toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      document.addEventListener("click", (event) => {
        if (!priceDropdown.contains(event.target)) {
          closePriceDropdown();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closePriceDropdown();
        }
      });
    }
  }

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

  const sizeButtons = Array.from(document.querySelectorAll("[data-size-option]"));

  if (sizeButtons.length > 0) {
    sizeButtons.forEach((buttonItem) => {
      buttonItem.addEventListener("click", () => {
        sizeButtons.forEach((innerButton) => innerButton.classList.remove("is-active"));
        buttonItem.classList.add("is-active");
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

      const updateGallery = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gapValue = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
        const nextOffset = (slideWidth + gapValue) * currentIndex;

        track.style.transform = `translateX(${-nextOffset}px)`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
      };

      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex -= 1;
          updateGallery();
        }
      });

      nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
          currentIndex += 1;
          updateGallery();
        }
      });

      window.addEventListener("resize", updateGallery);
      updateGallery();
    }
  }
});
