/* Traductions du site.
   Le français est directement dans index.html (attributs data-i18n="clé").
   Ici : la version italienne de chaque clé. Le HTML simple est autorisé
   (<strong>, <em>, <br>, <span class="tbc">…</span>).
   Une clé absente = le texte français reste affiché. */
window.I18N = {
  it: {
    /* En-tête */
    "meta.title": "Mathilde & Romain · 26 giugno 2027",
    "hero.pre": "Ci sposiamo!",
    "hero.date": "Sabato 26 giugno 2027",
    "hero.place": "Golfo del Morbihan · Bretagna",

    /* Compte à rebours (générés par js/main.js) */
    "countdown.days": "Mancano ancora {n} giorni",
    "countdown.tomorrow": "È domani!",
    "countdown.today": "È il grande giorno!",

    /* Onglets */
    "nav.label": "Sezioni del sito",
    "tab.accueil": "Benvenuti",
    "tab.planning": "Programma",
    "tab.acces": "Come arrivare",
    "tab.logement": "Alloggio",
    "tab.liste": "Lista nozze",

    /* Accueil */
    "home.title": "Benvenuti",
    "img.couple": "Mathilde e Romain",
    "home.lead": "Siamo felici di invitarvi a festeggiare il nostro matrimonio nel cuore del Golfo del Morbihan. Su questo sito troverete tutte le informazioni pratiche per godervi appieno questo weekend insieme a noi.",
    "home.ceremony": "La cerimonia",
    "home.ceremony.when": "Sabato · 14:30 <em>(da confermare)</em>",
    "home.ceremony.place": "Chiesa di Locmariaquer",
    "home.reception": "Il ricevimento",
    "home.reception.when": "Sabato · dalle 17:00",
    "home.brunch": "Il brunch",
    "home.brunch.when": "Domenica · 11:00 <em>(da confermare)</em>",
    "home.brunch.place": "Maison Jegat, punta di Arradon",
    "home.seePlanning": "Vedi il programma",

    /* RSVP */
    "rsvp.title": "Sarete dei nostri?",
    "rsvp.text": "Basta una risposta per famiglia.",
    "rsvp.button": "Rispondi all'invito",
    "rsvp.soon": "Modulo presto disponibile",
    "modal.title": "La vostra risposta",
    "modal.close": "Chiudi",
    "modal.frame": "Modulo di risposta",
    "modal.fallback": "Il modulo non si visualizza?",
    "modal.newtab": "Apritelo in una nuova scheda",

    /* Planning */
    "plan.title": "Il programma del weekend",
    "plan.saturday": "Sabato 26 giugno 2027",
    "plan.ceremony.time": "14:30 <small class=\"tbc\">(da confermare)</small>",
    "plan.ceremony": "Cerimonia religiosa",
    "plan.ceremony.place": "Chiesa di Locmariaquer.",
    "plan.cocktail.time": "17:00",
    "plan.cocktail": "Aperitivo",
    "plan.cocktail.place": "Al Manoir de Kerat, ad Arradon.",
    "plan.dinner": "Cena",
    "plan.dinner.place": "Al Manoir de Kerat.",
    "plan.party": "Festa danzante",
    "plan.party.text": "Fino a notte fonda…",
    "plan.sunday": "Domenica 27 giugno 2027",
    "plan.brunch.time": "11:00 <small class=\"tbc\">(da confermare)</small>",
    "plan.brunch": "Brunch in riva al mare",
    "plan.brunch.place": "Maison Jegat, punta di Arradon.",

    /* Accès */
    "access.title": "Come arrivare",
    "img.church": "La chiesa di Locmariaquer",
    "access.church": "Chiesa di Locmariaquer",
    "access.church.when": "Cerimonia religiosa · 14:30 <span class=\"tbc\">(da confermare)</span>",
    "map.church": "Mappa: chiesa di Locmariaquer",
    "img.kerat": "Il Manoir de Kerat ad Arradon",
    "access.kerat.when": "Ricevimento · dalle 17:00",
    "map.kerat": "Mappa: Manoir de Kerat, Arradon",
    "img.jegat": "La Maison Jegat, punta di Arradon",
    "access.jegat.when": "Brunch della domenica · 11:00 <span class=\"tbc\">(da confermare)</span>",
    "access.jegat.address": "Punta di Arradon, 56610 Arradon",
    "map.jegat": "Mappa: Maison Jegat, punta di Arradon",
    "access.directions": "Indicazioni stradali",
    "access.info": "Informazioni pratiche",
    "access.info.train": "<strong>In treno:</strong> stazione di Vannes (la più vicina al Manoir de Kerat), poi stazione di Auray (la più vicina alla chiesa di Locmariaquer). TGV diretto da Parigi-Montparnasse.",
    "access.info.car": "<strong>Tra la chiesa e il maniero:</strong> circa 30 minuti in auto.",
    "access.info.plane": "<strong>In aereo:</strong> aeroporti di Lorient Bretagne Sud, Nantes Atlantique o Rennes.",
    "access.info.parking": "<strong>Parcheggio al maniero:</strong> <span class=\"tbc\">informazioni in arrivo</span>",
    "access.info.brunch": "<strong>Per il brunch:</strong> la Maison Jegat si trova a pochi minuti dal Manoir de Kerat, sulla punta di Arradon.",

    /* Logement */
    "stay.title": "Dove dormire nei dintorni",
    "stay.notice": "A fine giugno è alta stagione nel Golfo del Morbihan: vi consigliamo di prenotare il vostro alloggio il prima possibile.",
    "stay.badge": "Il più vicino alla festa",
    "stay.arradon.text": "Sul posto, a due passi dal Manoir de Kerat e dalla Maison Jegat: ideale per godersi la serata e il brunch senza doversi mettere in macchina.",
    "stay.hotel": "Hotel",
    "stay.venetes": "Vista mare, punta di Arradon",
    "stay.bnb": "Bed & breakfast",
    "stay.manerkozh": "L'antico maniero",
    "stay.tilaouen": "Camere e casa vacanze",
    "stay.camping": "Campeggi",
    "stay.4stars": "4 stelle",
    "stay.3stars": "3 stelle",
    "stay.searchAlso": "Cercate anche su:",
    "stay.others": "Un po' più lontano",
    "stay.vannes.text": "A 10 minuti da Arradon: la più ampia scelta di hotel, una stazione TGV e un grazioso centro storico.",
    "stay.baden.text": "Tra la chiesa e il maniero, in riva al Golfo. Bed & breakfast e case vacanza di charme.",
    "stay.locmariaquer.text": "Vicino alla chiesa: Locmariaquer per il mare, Auray e il porto di Saint-Goustan per il suo fascino.",

    /* Liste de mariage */
    "gift.title": "Lista nozze",
    "gift.text": "La vostra presenza al nostro fianco è il regalo più bello.<br>Per chi lo desidera, una lista nozze sarà presto disponibile.",
    "gift.button": "Presto disponibile"
  }
};
