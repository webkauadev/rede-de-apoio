#!/usr/bin/env python3
"""Validate machine-readable AI/Figma context for internal consistency."""

from __future__ import annotations

from pathlib import Path
import sys

import yaml

ROOT = Path(__file__).resolve().parents[1]

PATHS = {
    "screens": ROOT / "docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml",
    "states": ROOT / "docs/07_AI_CONTEXT/STATE_MATRIX.yaml",
    "figma": ROOT / "docs/05_FIGMA/FIGMA_REGISTRY.yaml",
    "components": ROOT / "docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml",
}


def load_yaml(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    if not isinstance(data, dict):
        raise ValueError(f"{path}: expected YAML mapping at root")
    return data


def collect_strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for child in value.values():
            yield from collect_strings(child)
    elif isinstance(value, list):
        for child in value:
            yield from collect_strings(child)


def main() -> int:
    errors: list[str] = []

    for name, path in PATHS.items():
        if not path.exists():
            errors.append(f"missing required file: {path.relative_to(ROOT)}")

    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors))
        return 1

    try:
        screens_doc = load_yaml(PATHS["screens"])
        states_doc = load_yaml(PATHS["states"])
        figma_doc = load_yaml(PATHS["figma"])
        load_yaml(PATHS["components"])
    except (OSError, ValueError, yaml.YAMLError) as exc:
        print(f"ERROR: {exc}")
        return 1

    screens = screens_doc.get("screens", {})
    states = states_doc.get("screens", {})
    figma_nodes = figma_doc.get("known_current_nodes", {})

    expected = {f"T{i:02d}" for i in range(1, 18)}
    actual = set(screens)
    missing = sorted(expected - actual)
    extra = sorted(actual - expected)
    if missing:
        errors.append(f"SCREEN_REGISTRY missing screens: {', '.join(missing)}")
    if extra:
        errors.append(f"SCREEN_REGISTRY has unexpected screens: {', '.join(extra)}")

    for screen_id, screen in screens.items():
        owner = screen.get("owner")
        if not owner:
            errors.append(f"{screen_id}: owner is required")

        status = screen.get("figma_status")
        if status == "figma_mapped" and screen_id not in figma_nodes:
            errors.append(
                f"{screen_id}: marked figma_mapped but missing from FIGMA_REGISTRY known_current_nodes"
            )

    for screen_id, state_entry in states.items():
        if screen_id not in screens:
            errors.append(f"STATE_MATRIX references unknown screen {screen_id}")
            continue
        if state_entry.get("owner") != screens[screen_id].get("owner"):
            errors.append(f"{screen_id}: owner differs between SCREEN_REGISTRY and STATE_MATRIX")

    for screen_id, figma_entry in figma_nodes.items():
        if screen_id not in screens:
            errors.append(f"FIGMA_REGISTRY references unknown screen {screen_id}")
            continue
        if figma_entry.get("owner") != screens[screen_id].get("owner"):
            errors.append(f"{screen_id}: owner differs between SCREEN_REGISTRY and FIGMA_REGISTRY")

    # Every explicit state node should exist somewhere in the same screen's Figma registry entry.
    for screen_id, state_entry in states.items():
        if "states" not in state_entry or screen_id not in figma_nodes:
            continue
        registered_values = set(collect_strings(figma_nodes[screen_id]))
        for state_name, state_data in state_entry["states"].items():
            node = state_data.get("figma_node") if isinstance(state_data, dict) else None
            if node and node not in registered_values:
                errors.append(
                    f"{screen_id}/{state_name}: Figma node {node} is not registered in FIGMA_REGISTRY"
                )

    if errors:
        print("Agent context validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Agent context validation passed.")
    print(f"- screens: {len(screens)}")
    print(f"- screens with known Figma nodes: {len(figma_nodes)}")
    print(f"- state entries: {len(states)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
