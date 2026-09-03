# Extractions du corpus « entropie »

Chaque fichier Markdown restitue, dans l’ordre du document, le texte visible extrait du fichier source correspondant.

- `01-design-104058.md` — histoire, principes, applications et cosmos
- `02-design-105702.md` — exercices et cosmologie
- `03-fin-bloc-110113.md` — synthèse machines, désordre et cosmos
- `04-design-110812.md` — quatorze idées de simulations
- `05-fin-bloc-110928.md` — simulation du démon de Maxwell
- `06-portraits-scientifiques.md` — portraits biographiques et énoncé de Kelvin-Planck

L’extraction a été effectuée directement depuis les structures XML des fichiers `.docx` et `.odt`, car deux documents Word n’étaient pas lisibles par le convertisseur standard. Les documents sources n’ont pas été modifiés.

Le sous-dossier `media` est vide : aucun média incorporé n’a été détecté. Le script `extract_office_text.py` permet de reproduire l’extraction.
