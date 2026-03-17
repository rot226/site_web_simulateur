#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
html_files = sorted(ROOT.rglob('*.html'))

if not html_files:
    print('Aucune page HTML trouvée.')
    sys.exit(1)

errors = []
for file_path in html_files:
    rel = file_path.relative_to(ROOT)
    depth = len(rel.parts) - 1
    expected_href = ('../' * depth) + 'assets/favicon.png'

    content = file_path.read_text(encoding='utf-8')
    head_match = re.search(r'<head>(.*?)</head>', content, re.IGNORECASE | re.DOTALL)
    if not head_match:
        errors.append(f'{rel}: balise <head> introuvable.')
        continue

    head = head_match.group(1)
    expected_icon = f'<link rel="icon" type="image/png" href="{expected_href}">'
    expected_apple = f'<link rel="apple-touch-icon" href="{expected_href}">'
    expected_manifest_href = ('../' * depth) + 'site.webmanifest'
    expected_manifest = f'<link rel="manifest" href="{expected_manifest_href}">'

    if expected_icon not in head:
        errors.append(f'{rel}: balise manquante ou incorrecte -> {expected_icon}')

    if expected_apple not in head:
        errors.append(f'{rel}: balise manquante ou incorrecte -> {expected_apple}')

    if expected_manifest not in head:
        errors.append(f'{rel}: balise manquante ou incorrecte -> {expected_manifest}')

    if 'rel="shortcut icon"' in head:
        errors.append(f'{rel}: balise obsolète détectée -> <link rel="shortcut icon" ...>')

if errors:
    print('ÉCHEC: certaines pages publiques n\'ont pas les balises favicon attendues:\n')
    for e in errors:
        print(f'- {e}')
    sys.exit(1)

print(f'OK: {len(html_files)} page(s) HTML vérifiée(s), toutes conformes.')
