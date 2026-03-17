# Validation favicon multi-navigateurs (Desktop)

Date: 2026-03-17

## Objectif
Tester l’apparition du favicon dans l’onglet, les favoris et l’historique d’onglets pour Chrome, Firefox, Edge, Safari et Opera Desktop, avec hard refresh + purge cache pour éviter les faux négatifs.

## Résultats d'exécution en environnement CI (conteneur)

| Navigateur | Statut | Capture | Observation |
|---|---|---|---|
| Chrome | KO | N/A | Lancement impossible dans l’environnement d’exécution: binaire Chrome non présent (`playwright channel chrome` indisponible). |
| Firefox | KO | `browser:/tmp/codex_browser_invocations/d1d7603903665a43/artifacts/artifacts/firefox-desktop.png` | Le navigateur démarre, mais la cible testée via le port forward renvoie `404 Not Found`, empêchant la vérification visuelle du favicon. |
| Edge | KO | N/A | Lancement impossible dans l’environnement d’exécution: binaire Edge non présent (`playwright channel msedge` indisponible). |
| Safari (WebKit) | KO | `browser:/tmp/codex_browser_invocations/d1d7603903665a43/artifacts/artifacts/safari-desktop.png` | Le moteur WebKit démarre, mais la cible testée via le port forward renvoie `404 Not Found`, empêchant la vérification visuelle du favicon. |
| Opera | KO | N/A | Lancement impossible: canal Playwright `opera` non supporté dans cet environnement. |

## Vérifications indirectes de conformité favicon (code)

- Le script de contrôle des balises favicon passe sur l’ensemble des pages HTML du dépôt.
- Le fichier `assets/favicon.png` existe bien dans le projet.

## Conclusion
Les tests multi-navigateurs demandés n’ont pas pu être validés de bout en bout dans cet environnement conteneurisé (limitations de canaux navigateurs + résolution cible via port forwarding). Les prérequis côté code favicon sont néanmoins conformes.
