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
});

