# Checklist de release

Cette checklist est obligatoire avant toute mise en production.

## Contrôles obligatoires favicon (toute nouvelle page HTML)
- [ ] Toute nouvelle page `*.html` inclut dans son `<head>` :
  - `<link rel="icon" type="image/png" href=".../assets/favicon.png">`
  - `<link rel="apple-touch-icon" href=".../assets/favicon.png">`
  - `<link rel="manifest" href=".../site.webmanifest">`
- [ ] Aucune page HTML ne référence un autre fichier favicon (`.ico`, `.svg`, autre `.png`, etc.).
- [ ] La vérification automatique `python scripts/check-favicon-tags.py` passe.
- [ ] Le workflow CI `.github/workflows/favicon-check.yml` est vert.

## Validation pré-déploiement
- [ ] Exécuter `scripts/validate-predeploy.sh` (ou `python scripts/check-favicon-tags.py`) avant release.
