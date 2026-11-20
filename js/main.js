(function () {
  "use strict";

  /* ---------- Onglets ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  var ids = panels.map(function (p) { return p.id; });
  var DEFAULT = "accueil";

  function show(id, focusTab) {
    if (ids.indexOf(id) === -1) id = DEFAULT;
    tabs.forEach(function (tab) {
      var active = tab.dataset.target === id;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== id;
    });
  }

  function fromHash() {
    return decodeURIComponent(location.hash.replace("#", "")) || DEFAULT;
  }

  function go(id) {
    if (fromHash() !== id) {
      history.pushState(null, "", "#" + id);
    }
    show(id);
    document.querySelector(".topbar").scrollIntoView({ behavior: "smooth" });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { go(tab.dataset.target); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        go(next.dataset.target);
        next.focus();
      }
    });
  });

  // Liens internes (ex. bouton "Voir le planning")
  document.querySelectorAll('main a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (ids.indexOf(id) === -1) return;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      go(id);
    });
  });

  window.addEventListener("popstate", function () { show(fromHash()); });
  window.addEventListener("hashchange", function () { show(fromHash()); });
  show(fromHash());

  /* ---------- Langue (FR / IT) ----------
     Français = texte de index.html ; autres langues = js/i18n.js.
     Priorité : lien ?lang=it > choix mémorisé > langue du navigateur > français. */
  var LANGS = ["fr", "it"];
  var DICT = window.I18N || {};
  var lang = "fr";
  var originals = new Map();

  document.querySelectorAll("[data-i18n]").forEach(function (node) {
    originals.set(node, { html: node.innerHTML });
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
    var saved = originals.get(node) || {};
    saved.attrs = {};
    node.dataset.i18nAttr.split(",").forEach(function (pair) {
      var name = pair.split("=")[0].trim();
      saved.attrs[name] = node.getAttribute(name);
    });
    originals.set(node, saved);
  });
  var originalTitle = document.title;

  // Texte traduit, ou texte français si la clé n'existe pas
  function t(key, fr) {
    var d = DICT[lang];
    return lang !== "fr" && d && d[key] != null ? d[key] : fr;
  }

  function storage(value) {
    try {
      if (value) localStorage.setItem("lang", value);
      return localStorage.getItem("lang");
    } catch (e) { return null; }
  }

  function initialLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(fromUrl) !== -1) return fromUrl;
    var saved = storage();
    if (LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return nav.toLowerCase().indexOf("it") === 0 ? "it" : "fr";
  }

  var onLangChange = [];

  function setLang(next, remember) {
    lang = LANGS.indexOf(next) !== -1 ? next : "fr";
    if (remember) storage(lang);
    document.documentElement.lang = lang;
    document.title = t("meta.title", originalTitle);

    originals.forEach(function (saved, node) {
      if (saved.html != null) node.innerHTML = t(node.dataset.i18n, saved.html);
      if (saved.attrs) {
        node.dataset.i18nAttr.split(",").forEach(function (pair) {
          var parts = pair.split("=");
          var name = parts[0].trim();
          node.setAttribute(name, t(parts[1].trim(), saved.attrs[name]));
        });
      }
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    onLangChange.forEach(function (fn) { fn(); });
  }

  document.querySelectorAll(".lang-switch [data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang, true); });
  });

  /* ---------- RSVP ----------
     Lien du formulaire (Youform, Google Forms, Tally…).
     Pour Google Forms, le mode intégré (?embedded=true) est ajouté automatiquement. */
  var RSVP_FORM_URL = "https://app.youform.com/forms/rd7v0z5k";

  var openBtn = document.getElementById("rsvp-open");
  var modal = document.getElementById("rsvp-modal");
  var frame = document.getElementById("rsvp-frame");

  function embedUrl(url) {
    if (/docs\.google\.com\/forms/.test(url) && !/[?&]embedded=true/.test(url)) {
      return url + (url.indexOf("?") === -1 ? "?" : "&") + "embedded=true";
    }
    return url;
  }

  if (openBtn && modal) {
    var newTab = document.getElementById("rsvp-newtab");

    newTab.href = RSVP_FORM_URL || "#";
    openBtn.disabled = !RSVP_FORM_URL;
    onLangChange.push(function () {
      if (!RSVP_FORM_URL) openBtn.textContent = t("rsvp.soon", "Formulaire bientôt disponible");
    });

    openBtn.addEventListener("click", function () {
      if (!frame.getAttribute("src")) frame.src = embedUrl(RSVP_FORM_URL); // chargé au 1er clic
      modal.showModal();
      document.body.classList.add("no-scroll");
    });
    document.getElementById("rsvp-close").addEventListener("click", function () { modal.close(); });
    // Clic sur le fond assombri = fermeture
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
    modal.addEventListener("close", function () { document.body.classList.remove("no-scroll"); });
  }

  /* ---------- Compte à rebours ----------
     Calculé à chaque ouverture de la page, en jours du calendrier
     (date de l'appareil du visiteur). Masqué après le 26 juin. */
  var el = document.getElementById("countdown");
  if (el) {
    onLangChange.push(function () {
      var now = new Date();
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var weddingDay = new Date(2027, 5, 26); // 26 juin 2027
      // Math.round absorbe le décalage d'une heure lors des changements d'heure
      var days = Math.round((weddingDay - today) / 86400000);
      var text = "";
      if (days > 1) text = t("countdown.days", "Plus que {n} jours").replace("{n}", days);
      else if (days === 1) text = t("countdown.tomorrow", "C'est demain !");
      else if (days === 0) text = t("countdown.today", "C'est le grand jour !");
      el.textContent = text;
    });
  }

  setLang(initialLang(), false);
})();
