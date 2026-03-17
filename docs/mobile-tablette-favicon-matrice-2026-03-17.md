# Matrice de test favicon mobile/tablette (2026-03-17)

## Portée
- Pages vérifiées :
  - Racine : `/index.html`
  - Sous-dossier : `/howto/index.html`
- Cibles demandées : Android (Chrome, Opera Mobile), iOS/iPadOS (Safari).

## Méthodologie
1. Vérification des balises favicon/home-screen dans les pages HTML.
2. Vérification HTTP des ressources référencées (`favicon` + `manifest`) depuis la racine et depuis `howto/`.
3. Contrôle de cohérence des chemins relatifs.

> Limite connue : dans cet environnement CI/headless, on ne peut pas observer visuellement l’icône dans la barre d’onglets ni valider un vrai ajout écran d’accueil sur OS mobile réel. Le verdict "PASS" ci-dessous couvre la **configuration technique** (balises + chemins + disponibilité HTTP), pas l’affichage natif de l’UI système.

## Résultats techniques globaux
- `link[rel="icon"]` présent sur les pages racine et `howto/`.
- `link[rel="apple-touch-icon"]` présent sur les pages racine et `howto/`.
- `link[rel="manifest"]` présent sur les pages racine et `howto/`.
- Ressources référencées renvoyant HTTP 200.

## Matrice de tests mobile/tablette

| Appareil / Navigateur | Page racine (`/index.html`) | Page `howto/` (`/howto/index.html`) | Favicon onglet | Raccourci écran d’accueil (si applicable) | Verdict |
|---|---|---|---|---|---|
| Android – Chrome Mobile | Balises OK + ressources 200 | Balises OK + ressources 200 | Config PASS (vérif UI native non observable ici) | Config PASS via `manifest` + `apple-touch-icon` | ✅ PASS |
| Android – Opera Mobile | Balises OK + ressources 200 | Balises OK + ressources 200 | Config PASS (vérif UI native non observable ici) | Config PASS via `manifest` + `apple-touch-icon` | ✅ PASS |
| iPhone – Safari iOS | Balises OK + ressources 200 | Balises OK + ressources 200 | Config PASS (vérif UI native non observable ici) | Config PASS via `apple-touch-icon` | ✅ PASS |
| iPad – Safari iPadOS | Balises OK + ressources 200 | Balises OK + ressources 200 | Config PASS (vérif UI native non observable ici) | Config PASS via `apple-touch-icon` | ✅ PASS |

## Commandes exécutées
- `python3 scripts/check-favicon-tags.py`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/index.html`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/howto/index.html`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/assets/favicon.png`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/site.webmanifest`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/howto/../assets/favicon.png`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/howto/../site.webmanifest`
