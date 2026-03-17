# Validation QA responsive & accessibilité minimale

Date : 2026-03-17

## Périmètre testé
Pages principales :
- `/` (alias `/index.html`)
- `/paper.html`
- `/documentation.html`
- `/howto/index.html`
- `/howto/usage.html`
- `/howto/installation.html`
- `/research.html`
- `/authors.html`

Breakpoints testés :
- Mobile : `375x812`
- Tablette : `768x1024`
- Desktop : `1440x900`

## Résultats

### 1) Responsive global
- ✅ Affichage correct sur mobile / tablette / desktop pour toutes les pages listées.
- ✅ Pas de débordement horizontal détecté (`scrollWidth <= clientWidth`) sur tous les couples page + viewport testés.

### 2) Liens externes critiques
- ✅ GitHub : `https://github.com/LoRaFlexSim/LoRaFlexSim` (HTTP 200).
- ⚠️ Publications IEEE :
  - `https://ieeexplore.ieee.org/abstract/document/11304034`
  - `https://ieeexplore.ieee.org/abstract/document/11323245`
  
  Vérification automatisée bloquée par protection anti-bot IEEE (`HTTP 418` depuis le runner). À valider manuellement dans un navigateur utilisateur.
- ✅ Site personnel François : `https://fasanou.netlify.app/` (HTTP 200).

### 3) Accessibilité minimale
- ✅ Focus visible :
  - focus clavier visible sur le bouton menu mobile et les liens de navigation (outline solide 2px)
  - focus visible également lors de la tabulation vers les liens de contenu.
- ✅ Contraste (vérification palette principale) :
  - texte principal `#333` sur fond `#f7fbff` : **12.15:1**
  - liens d’en-tête `#fff` sur fond `#002d40` : **14.49:1**
  - liens standards `#006699` sur fond `#f7fbff` : **6.01:1**
- ✅ Navigation clavier menu mobile :
  - ouverture via clavier (Entrée sur le bouton menu)
  - tabulation dans les liens du menu
  - fermeture via `Escape` avec retour du focus sur le bouton menu.

## Conclusion
Validation **globalement conforme** sur les critères demandés (responsive, absence de scroll horizontal, a11y minimale), avec une réserve de contexte d’exécution sur la validation automatique des deux liens IEEE.
