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
    document.querySelector(".tabs").scrollIntoView({ behavior: "smooth" });
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

  /* ---------- RSVP ----------
     Coller ci-dessous le lien du formulaire (Google Forms, Tally…).
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
    if (!RSVP_FORM_URL) {
      openBtn.textContent = "Formulaire bientôt disponible";
    } else {
      openBtn.disabled = false;
      document.getElementById("rsvp-newtab").href = RSVP_FORM_URL;

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
  }

  /* ---------- Compte à rebours ----------
     Calculé à chaque ouverture de la page, en jours du calendrier
     (date de l'appareil du visiteur). Masqué après le 26 juin. */
  var el = document.getElementById("countdown");
  if (el) {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var weddingDay = new Date(2027, 5, 26); // 26 juin 2027
    // Math.round absorbe le décalage d'une heure lors des changements d'heure
    var days = Math.round((weddingDay - today) / 86400000);
    if (days > 1) el.textContent = "Plus que " + days + " jours";
    else if (days === 1) el.textContent = "C'est demain !";
    else if (days === 0) el.textContent = "C'est le grand jour !";
  }
})();
