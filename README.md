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

## Après une modification du CSS ou du JS

Incrémenter le numéro `?v=` dans `index.html` (`css/style.css?v=2`, `js/main.js?v=2`)
pour que les navigateurs des invités chargent la nouvelle version.

## Traduction italienne

- Le texte français est dans `index.html` ; chaque texte traduisible porte un attribut `data-i18n="clé"`.
- Les traductions italiennes sont dans `js/i18n.js` (même clé). Une clé absente = texte français affiché.
- Nouveau texte à traduire : ajouter `data-i18n="ma.cle"` dans `index.html` et `"ma.cle": "…"` dans `js/i18n.js`.
- Lien direct en italien : https://romaincoville.github.io/wedding-site/?lang=it
  (sinon : choix mémorisé, ou langue du navigateur).

## RSVP

Le bouton « Répondre à l'invitation » ouvre un formulaire externe (Google Forms…) en pop-up.
Coller le lien du formulaire dans `RSVP_FORM_URL` (`js/main.js`).
Pour Google Forms : les réponses vont dans une Google Sheet privée via
l'onglet « Réponses » → « Associer à Sheets ».

## À compléter

- Horaire de la cérémonie (14h30 à confirmer) et du brunch (11h à confirmer)
- Lien de la liste de mariage (`#registry-link` dans `index.html`)
- Infos stationnement, bonnes adresses de logement
- Photos dans `images/` (voir `images/README.md`)
