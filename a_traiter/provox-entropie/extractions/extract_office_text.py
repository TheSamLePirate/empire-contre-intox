#!/usr/bin/env python3
"""Extract visible text from DOCX and ODT containers without rewriting it."""

from __future__ import annotations

import argparse
import html
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
TEXT_NS = "{urn:oasis:names:tc:opendocument:xmlns:text:1.0}"
TABLE_NS = "{urn:oasis:names:tc:opendocument:xmlns:table:1.0}"


def docx_paragraph_text(paragraph: ET.Element) -> str:
    chunks: list[str] = []
    for node in paragraph.iter():
        if node.tag in {W + "t", W + "delText", W + "instrText"} and node.text:
            chunks.append(node.text)
        elif node.tag == W + "tab":
            chunks.append("\t")
        elif node.tag in {W + "br", W + "cr"}:
            chunks.append("\n")
    return "".join(chunks).strip()


def extract_docx(path: Path) -> list[tuple[str, list[str]]]:
    sections: list[tuple[str, list[str]]] = []
    with zipfile.ZipFile(path) as archive:
        names = set(archive.namelist())
        ordered = ["word/document.xml"]
        ordered += sorted(n for n in names if n.startswith("word/header") and n.endswith(".xml"))
        ordered += sorted(n for n in names if n.startswith("word/footer") and n.endswith(".xml"))
        ordered += [n for n in ("word/footnotes.xml", "word/endnotes.xml", "word/comments.xml") if n in names]
        for name in ordered:
            if name not in names:
                continue
            root = ET.fromstring(archive.read(name))
            paragraphs = [docx_paragraph_text(p) for p in root.iter(W + "p")]
            paragraphs = [p for p in paragraphs if p]
            if paragraphs:
                sections.append((name, paragraphs))
    return sections


def odt_node_text(node: ET.Element) -> str:
    chunks: list[str] = []
    if node.text:
        chunks.append(node.text)
    for child in node:
        if child.tag == TEXT_NS + "tab":
            chunks.append("\t")
        elif child.tag == TEXT_NS + "line-break":
            chunks.append("\n")
        elif child.tag == TEXT_NS + "s":
            chunks.append(" " * int(child.attrib.get(TEXT_NS + "c", "1")))
        chunks.append(odt_node_text(child))
        if child.tail:
            chunks.append(child.tail)
    return "".join(chunks)


def extract_odt(path: Path) -> list[tuple[str, list[str]]]:
    with zipfile.ZipFile(path) as archive:
        root = ET.fromstring(archive.read("content.xml"))
    paragraphs: list[str] = []
    for node in root.iter():
        if node.tag in {TEXT_NS + "p", TEXT_NS + "h"}:
            # Ignore nested paragraphs here; each is emitted by its own iteration.
            text = odt_node_text(node).strip()
            if text:
                paragraphs.append(text)
    return [("content.xml", paragraphs)]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    if args.source.suffix.lower() == ".docx":
        sections = extract_docx(args.source)
    elif args.source.suffix.lower() == ".odt":
        sections = extract_odt(args.source)
    else:
        raise SystemExit("Format non pris en charge")

    lines = [f"# Extraction intégrale — {args.source.name}", ""]
    for section, paragraphs in sections:
        if section != "word/document.xml" and section != "content.xml":
            lines.extend((f"## Partie interne : `{section}`", ""))
        for paragraph in paragraphs:
            lines.extend((html.unescape(paragraph), ""))
    args.output.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
