# wedding-site

Site du mariage de Mathilde & Romain — 26 juin 2027.

Site statique (HTML/CSS/JS, sans build) : `index.html`, `css/style.css`, `js/main.js`.

## Tester en local

```sh
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Mise en ligne (GitHub Pages)

Settings → Pages → Source : « Deploy from a branch » → branche `main`, dossier `/ (root)`.
Le site sera disponible sur https://romaincoville.github.io/wedding-site/.

## RSVP

Le bouton « Répondre à l'invitation » ouvre un formulaire externe (Google Forms…) en pop-up.
Coller le lien du formulaire dans `RSVP_FORM_URL` (`js/main.js`).
Pour Google Forms : les réponses vont dans une Google Sheet privée via
l'onglet « Réponses » → « Associer à Sheets ».

## À compléter

- Horaire de la cérémonie (~14h30 à confirmer) et du brunch (~11h à confirmer)
- Adresse exacte du Domaine de Kerat
- Date limite de réponse au RSVP
- Lien du formulaire RSVP (`RSVP_FORM_URL` dans `js/main.js`)
- Lien de la liste de mariage (`#registry-link` dans `index.html`)
- Infos stationnement, email de contact, bonnes adresses de logement
- Photos dans `images/` (voir `images/README.md`)
