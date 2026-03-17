# Checklist des pages couvertes pour les favicons

Cette checklist recense les pages publiques de `loraflexsim.org` qui doivent contenir les balises favicon dans leur `<head>`.

## Racine du site
- [x] `/` → `index.html`
- [x] `/research.html`
- [x] `/paper.html`
- [x] `/documentation.html`
- [x] `/authors.html`

## Sous-dossier `howto/`
- [x] `/howto/` → `howto/index.html`
- [x] `/howto/usage.html`
- [x] `/howto/installation.html`

## Règle de validation avant mise en production
- [x] Exécuter `python scripts/check-favicon-tags.py`.
- [x] Le workflow CI `.github/workflows/favicon-check.yml` doit passer; sinon la mise en production est bloquée.

## Convention technique
- favicon unique = image assets existante
