(function () {
  "use strict";

  var STORAGE_KEY = "ai-kompetens-theme";

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      /* localStorage otillgängligt (privat läge, kvot m.m.) — ignorera tyst */
    }
  }

  function initTheme() {
    var root = document.documentElement;
    var toggle = document.getElementById("theme-toggle");
    var stored = safeGet(STORAGE_KEY);

    function systemPrefersDark() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }

    function currentIsDark() {
      if (root.getAttribute("data-theme") === "dark") return true;
      if (root.getAttribute("data-theme") === "light") return false;
      return systemPrefersDark();
    }

    function render() {
      var isDark = currentIsDark();
      if (!toggle) return;
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      toggle.textContent = isDark ? "Ljust läge" : "Mörkt läge";
    }

    if (stored === "dark" || stored === "light") {
      root.setAttribute("data-theme", stored);
    }

    render();

    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = currentIsDark() ? "light" : "dark";
        root.setAttribute("data-theme", next);
        safeSet(STORAGE_KEY, next);
        render();
      });
    }

    if (window.matchMedia) {
      var media = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () {
        if (!safeGet(STORAGE_KEY)) {
          render();
        }
      };
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", onChange);
      } else if (typeof media.addListener === "function") {
        media.addListener(onChange);
      }
    }
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Öppna meny");
    }

    function openNav() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Stäng meny");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.tagName === "A") {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      var withinNav = nav.contains(event.target);
      var withinToggle = toggle.contains(event.target);
      if (!withinNav && !withinToggle) {
        closeNav();
      }
    });

    var mediaQuery = window.matchMedia
      ? window.matchMedia("(min-width: 768px)")
      : null;
    if (mediaQuery) {
      var handleBreakpoint = function () {
        if (mediaQuery.matches) {
          closeNav();
        }
      };
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handleBreakpoint);
      } else if (typeof mediaQuery.addListener === "function") {
        mediaQuery.addListener(handleBreakpoint);
      }
    }
  }

  function initSmoothNavClose() {
    var links = document.querySelectorAll('.site-nav__list a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId.length < 2) return;
        var target = document.querySelector(targetId);
        if (target && typeof target.focus === "function") {
          target.setAttribute("tabindex", "-1");
          target.addEventListener(
            "blur",
            function onBlur() {
              target.removeAttribute("tabindex");
              target.removeEventListener("blur", onBlur);
            },
            { once: true }
          );
        }
      });
    });
  }

  function initAccordions() {
    var accordions = document.querySelectorAll(".accordion");
    accordions.forEach(function (accordion) {
      var items = accordion.querySelectorAll(".accordion__item");
      items.forEach(function (item) {
        item.addEventListener("toggle", function () {
          if (!item.open) return;
          items.forEach(function (other) {
            if (other !== item) {
              other.open = false;
            }
          });
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMobileNav();
    initSmoothNavClose();
    initAccordions();
  });
})();
