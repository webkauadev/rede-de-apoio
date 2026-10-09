#!/usr/bin/env python3
"""Valida o backlog Codex contra o catálogo US de origem, sem rede nem MySQL."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml"
INDEX = ROOT / "docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml"
BACKLOG = ROOT / "docs/10_IMPLEMENTACAO/IMPLEMENTATION_BACKLOG.json"
errors: list[str] = []


def fail(message: str) -> None:
    errors.append(message)


def extract_us_yaml(text: str) -> dict[str, dict[str, object]]:
    entries: dict[str, dict[str, object]] = {}
    key: str | None = None
    for line in text.splitlines():
        m = re.match(r"^  (US-\d{3}):\s*$", line)
        if m:
            key = m[1]
            entries[key] = {}
            continue
        if not key:
            continue
        p = re.match(r"^    (issue|owner|origin_requirement|title|screens):\s*(.*)$", line)
        if not p:
            continue
        prop, value = p.groups()
        value = value.strip().strip('"').strip("'")
        if prop == "issue":
            entries[key][prop] = int(value)
        elif prop == "screens":
            entries[key][prop] = re.findall(r"\bT\d{2}\b", value)
        else:
            entries[key][prop] = value
    return entries


def main() -> int:
    source = extract_us_yaml(SOURCE.read_text(encoding="utf-8"))
    manifest = json.loads(BACKLOG.read_text(encoding="utf-8"))
    expected = {f"US-{i:03d}" for i in range(1, 37)}
    found = [obj["us"] for obj in manifest["stories"]]
    if set(source) != expected:
        fail("Catalogo canonico US-001..US-036 divergiu")
    if len(found) != 36 or set(found) != expected or len(found) != len(set(found)):
        fail("Backlog deve conter exatamente 36 US sem duplicatas")
    if len(source) != 36:
        fail("Registro fonte nao contem exatamente 36 US")
    for entry in manifest["stories"]:
        us = entry["us"]
        origin = source.get(us)
        if not origin:
            fail(f"US inesperada: {us}")
            continue
        for field in ("issue", "owner", "origin_requirement", "title"):
            if entry.get(field) != origin.get(field):
                fail(f"{us}: divergencia de {field}, backlog={entry.get(field)!r}, fonte={origin.get(field)!r}")
        if entry.get("screens", []) != origin.get("screens", []):
            fail(f"{us}: telas diferem do registry canonico")
        if entry.get("code_state") != "NOT_STARTED_IN_THIS_REPOSITORY":
            fail(f"{us}: status do backlog historico precisa de revisao manual, nao de automacao")
        for adr in entry.get("decision_dependencies", []):
            if not re.fullmatch(r"DB-\d{3}", adr):
                fail(f"{us}: ID de dependencia nao reconhecida: {adr}")

    approval = INDEX.read_text(encoding="utf-8")
    if "canonical_approved" not in approval:
        fail("P01/aceite canonico inesperadamente nao aprovado")
    for us in expected:
        if not re.search(rf"^\s*{us}:\s*\{{issue:\s*\d+,\s*comment_id:\s*\d+", approval, re.M):
            fail(f"US sem comentario de aceite registrado em P01: {us}")

    if errors:
        print(f"FAIL ({len(errors)}):")
        for e in errors:
            print(" -", e)
        return 1
    print("PASS: 36 US + owner + origem unica + issue + telas conferidos no backlog e fonte canonica.")
    print("PASS: 36 registros aprovados de comentario P01 identificados.")
    print("LIMITE: nao executa codigo, nao confirma estados do GitHub nem aprova dependencias de ADR.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
