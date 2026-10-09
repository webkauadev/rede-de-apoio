#!/usr/bin/env python3
"""Validação offline do snapshot Figma versionado — não consulta Figma nem rede."""
from __future__ import annotations

import json
import re
import struct
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/10_IMPLEMENTACAO/FIGMA_SNAPSHOT"
MANIFEST = BASE / "SCREENSHOTS_INDEX.json"
SOURCE_REGISTRIES = [
    ROOT / "docs/05_FIGMA/FIGMA_REGISTRY.yaml",
    ROOT / "docs/05_FIGMA/ELDERLY_READ_ONLY_FLOW.yaml",
]
errors: list[str] = []


def fail(msg: str) -> None:
    errors.append(msg)


def main() -> int:
    if not MANIFEST.is_file():
        print("FAIL: manifesto ausente", file=sys.stderr)
        return 1
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    baselines = data["baselines"]
    critical = data["critical_states"]
    expected = {f"T{i:02d}" for i in range(1, 18)}
    found = {item["screen"] for item in baselines}
    if len(baselines) != 17 or found != expected:
        fail(f"T01–T17 incompleto ou duplicado: {sorted(found)}")
    if len(critical) != 9 or len({item["id"] for item in critical}) != 9:
        fail("Estados criticos divergentes do inventario de nove")
    if data.get("source_page_id") != "5926:1014":
        fail("Pagina de origem nao e Fluxo Final canonica")

    source_text = "\n".join(
        path.read_text(encoding="utf-8") for path in SOURCE_REGISTRIES
    )
    images_seen: set[str] = set()
    items = baselines + critical
    for item in items:
        png_name = item["png"]
        node_id = item["node_id"]
        if not re.fullmatch(r"assets/[A-Z0-9\-]+\.png", png_name):
            fail(f"Caminho inseguro ou inesperado: {png_name}")
            continue
        if png_name in images_seen:
            fail(f"PNG repetido no manifesto: {png_name}")
        images_seen.add(png_name)
        if not re.fullmatch(r"\d+:\d+", node_id):
            fail(f"ID Figma invalido: {node_id}")
        if node_id not in source_text:
            fail(f"Node {node_id} nao aparece nos registries canônicos")
        img = BASE / png_name
        if not img.is_file():
            fail(f"PNG ausente: {png_name}")
            continue
        b = img.read_bytes()
        if len(b) < 45 or b[:8] != b"\x89PNG\r\n\x1a\n" or b[12:16] != b"IHDR":
            fail(f"PNG invalido: {png_name}")
            continue
        width, height = struct.unpack(">II", b[16:24])
        if not (0 < width <= 4000 and 0 < height <= 4000):
            fail(f"Tamanho inesperado: {png_name} {width}x{height}")
        if item in baselines and (width, height) != (390, 844):
            fail(f"Baseline nao possui 390x844: {png_name} {width}x{height}")

    actual_pngs = {p.relative_to(BASE).as_posix() for p in (BASE / "assets").glob("*.png")}
    if actual_pngs != images_seen:
        fail(f"PNGs diferentes do manifesto: extras={sorted(actual_pngs-images_seen)}, faltam={sorted(images_seen-actual_pngs)}")
    if errors:
        for error in errors:
            print("FAIL:", error)
        return 1
    print("PASS: 17 baselines T01–T17 e 9 estados criticos, 26 PNGs validos, fontes em registries.")
    print("LIMITE: valida inventario e formato PNG; nao compara pixels ao Figma nem reactions.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
