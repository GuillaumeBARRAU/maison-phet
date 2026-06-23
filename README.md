# 🍜 Maison Phet — Blog Cuisine Thaï & Vietnamienne

Site statique déployé sur GitHub Pages avec Vite.js.  
Formulaire de réservation via Formspree.

## Structure du projet

```
maison-phet/
├── index.html              # Page d'accueil
├── blog.html               # Liste des articles
├── blog/
│   ├── curry-vert.html     # Article exemple
│   ├── bouillon-pho.html   # (à créer)
│   ├── epices.html         # (à créer)
│   └── ...
├── src/
│   ├── css/main.css        # Design system complet
│   └── js/main.js          # Interactions, filtre, formulaire
├── vite.config.js
└── package.json
```

## Installation

```bash
npm install
npm run dev        # Serveur local http://localhost:5173
npm run build      # Génère le dossier dist/
```

## Déploiement GitHub Pages

### 1. Créer le repo GitHub
```bash
git init
git add .
git commit -m "feat: init Maison Phet"
git remote add origin https://github.com/VOTRE_USER/maison-phet.git
git push -u origin main
```

### 2. Configurer GitHub Pages
- Aller dans **Settings → Pages**
- Source : **GitHub Actions** (ou branch `gh-pages`)

### 3. Déployer manuellement
```bash
npm run build
npm run deploy      # Pousse dist/ vers la branche gh-pages
```

### 4. Domaine custom (aidezmoi.online)
1. Créer un fichier `public/CNAME` avec : `aidezmoi.online`
2. Chez votre registrar DNS, ajouter :
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  VOTRE_USER.github.io
   ```
3. Dans GitHub Pages Settings → cocher "Enforce HTTPS"

## Configurer Formspree

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire → copier votre ID
3. Dans `index.html`, remplacer :
   ```html
   action="https://formspree.io/f/VOTRE_ID_FORMSPREE"
   ```
   par votre vrai ID, par exemple :
   ```html
   action="https://formspree.io/f/xpwzabcd"
   ```
4. Formspree envoie les réservations par email gratuitement (50 envois/mois sur le plan gratuit)

## Ajouter un article de blog

Dupliquer `blog/curry-vert.html`, modifier le contenu, puis ajouter le lien dans `blog.html`.

## Personnalisation couleurs (src/css/main.css)

```css
:root {
  --rouge:  #C0392B;   /* Couleur principale */
  --noir:   #1A1A1A;   /* Arrière-plans sombres */
  --creme:  #FAF7F2;   /* Fond général */
  --or:     #D4A853;   /* Accents dorés */
}
```

## GitHub Actions (déploiement automatique)

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Stack technique
- **Vite.js** — bundler moderne, HMR rapide
- **HTML/CSS/JS vanilla** — aucune dépendance runtime
- **Formspree** — formulaire sans backend
- **Google Fonts** — Playfair Display + Inter
- **GitHub Pages** — hébergement gratuit
