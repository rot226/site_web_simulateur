#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
html_files = sorted(ROOT.rglob('*.html'))

if not html_files:
    print('Aucune page HTML trouvée.')
    sys.exit(1)

LINK_TAG_RE = re.compile(r'<link\b[^>]*>', re.IGNORECASE)
ATTR_RE = re.compile(r'([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(["\'])(.*?)\2', re.IGNORECASE | re.DOTALL)


def parse_attrs(link_tag: str) -> dict[str, str]:
    attrs = {}
    for key, _, value in ATTR_RE.findall(link_tag):
        attrs[key.lower()] = value.strip()
    return attrs


errors = []
for file_path in html_files:
    rel = file_path.relative_to(ROOT)
    depth = len(rel.parts) - 1
    expected_favicon_href = ('../' * depth) + 'assets/favicon.png'
    expected_manifest_href = ('../' * depth) + 'site.webmanifest'

    content = file_path.read_text(encoding='utf-8')
    head_match = re.search(r'<head>(.*?)</head>', content, re.IGNORECASE | re.DOTALL)
    if not head_match:
        errors.append(f'{rel}: balise <head> introuvable.')
        continue

    head = head_match.group(1)
    found_icon = False
    found_apple = False
    found_manifest = False

    for link_tag in LINK_TAG_RE.findall(head):
        attrs = parse_attrs(link_tag)
        rel_attr = attrs.get('rel', '').lower().split()
        href_attr = attrs.get('href', '')

        if 'shortcut' in rel_attr and 'icon' in rel_attr:
            errors.append(f'{rel}: balise obsolète détectée -> {link_tag}')

        if 'icon' in rel_attr:
            if href_attr != expected_favicon_href:
                errors.append(
                    f'{rel}: favicon invalide -> {link_tag} (attendu href="{expected_favicon_href}")'
                )
            if attrs.get('type', '').lower() != 'image/png':
                errors.append(
                    f'{rel}: type favicon invalide -> {link_tag} (attendu type="image/png")'
                )
            found_icon = True

        if 'apple-touch-icon' in rel_attr:
            if href_attr != expected_favicon_href:
                errors.append(
                    f'{rel}: apple-touch-icon invalide -> {link_tag} (attendu href="{expected_favicon_href}")'
                )
            found_apple = True

        if 'manifest' in rel_attr:
            if href_attr != expected_manifest_href:
                errors.append(
                    f'{rel}: manifest invalide -> {link_tag} (attendu href="{expected_manifest_href}")'
                )
            found_manifest = True

    if not found_icon:
        errors.append(
            f'{rel}: balise manquante -> <link rel="icon" type="image/png" href="{expected_favicon_href}">'
        )
    if not found_apple:
        errors.append(
            f'{rel}: balise manquante -> <link rel="apple-touch-icon" href="{expected_favicon_href}">'
        )
    if not found_manifest:
        errors.append(
            f'{rel}: balise manquante -> <link rel="manifest" href="{expected_manifest_href}">'
        )

if errors:
    print('ÉCHEC: certaines pages publiques n\'ont pas les balises favicon attendues:\n')
    for e in errors:
        print(f'- {e}')
    sys.exit(1)

print(f'OK: {len(html_files)} page(s) HTML vérifiée(s), toutes conformes.')
