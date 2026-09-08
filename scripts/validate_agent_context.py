#!/usr/bin/env python3
"""Validate machine-readable AI/Figma/GitHub context for internal consistency."""

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
    "stories": ROOT / "docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml",
    "requirements": ROOT / "docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml",
}

GITHUB_OPERATIONAL_FILES = [
    ROOT / "AGENTS.md",
    ROOT / "CLAUDE.md",
    ROOT / "README.md",
    ROOT / "docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md",
    ROOT / "docs/07_AI_CONTEXT/AUTONOMOUS_DESIGN_WORKFLOW.md",
    ROOT / ".github/pull_request_template.md",
]

EXPECTED_STORY_OWNERS = {
    "David": {"US-001", "US-002", "US-003", "US-004", "US-005", "US-006", "US-007", "US-026", "US-028"},
    "Rhuan": {"US-008", "US-009", "US-011", "US-012", "US-013", "US-014", "US-023", "US-024", "US-025"},
    "Henrique": {"US-010", "US-016", "US-017", "US-018", "US-019", "US-020", "US-021", "US-022", "US-027"},
    "Kauã": {"US-015", "US-029", "US-030", "US-031", "US-032", "US-033", "US-034", "US-035"},
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

    required_files = list(PATHS.values()) + GITHUB_OPERATIONAL_FILES + [
        ROOT / "docs/06_GITHUB/GITHUB.md",
        ROOT / "docs/06_GITHUB/ISSUE_STRUCTURE.md",
        ROOT / "docs/06_GITHUB/WORKFLOW.md",
    ]
    for path in required_files:
        if not path.exists():
            errors.append(f"missing required file: {path.relative_to(ROOT)}")

    if (ROOT / "docs/06_GITLAB").exists():
        errors.append("legacy docs/06_GITLAB must not exist in the GitHub-only operational model")

    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors))
        return 1

    try:
        screens_doc = load_yaml(PATHS["screens"])
        states_doc = load_yaml(PATHS["states"])
        figma_doc = load_yaml(PATHS["figma"])
        load_yaml(PATHS["components"])
        stories_doc = load_yaml(PATHS["stories"])
        requirements_doc = load_yaml(PATHS["requirements"])
    except (OSError, ValueError, yaml.YAMLError) as exc:
        print(f"ERROR: {exc}")
        return 1

    # Operational source-of-truth checks.
    source = screens_doc.get("sources", {}).get("requirements", {})
    if source.get("system") != "GitHub":
        errors.append("SCREEN_REGISTRY sources.requirements.system must be GitHub")
    if source.get("repository") != "webkauadev/rede-de-apoio":
        errors.append("SCREEN_REGISTRY canonical repository must be webkauadev/rede-de-apoio")
    if source.get("missing_data_policy") != "migration_required":
        errors.append("SCREEN_REGISTRY missing_data_policy must be migration_required")
    if stories_doc.get("canonical_system") != "GitHub":
        errors.append("USER_STORIES_INDEX canonical_system must be GitHub")
    if requirements_doc.get("canonical_system") != "GitHub":
        errors.append("REQUIREMENTS_INDEX canonical_system must be GitHub")

    # Prevent operational documentation from reintroducing the legacy tracker.
    for path in GITHUB_OPERATIONAL_FILES:
        text = path.read_text(encoding="utf-8").lower()
        if "gitlab" in text or "fslab" in text:
            errors.append(f"{path.relative_to(ROOT)} contains legacy tracker reference")

    screens = screens_doc.get("screens", {})
    states = states_doc.get("screens", {})
    figma_nodes = figma_doc.get("known_current_nodes", {})

    expected_screens = {f"T{i:02d}" for i in range(1, 18)}
    actual_screens = set(screens)
    missing = sorted(expected_screens - actual_screens)
    extra = sorted(actual_screens - expected_screens)
    if missing:
        errors.append(f"SCREEN_REGISTRY missing screens: {', '.join(missing)}")
    if extra:
        errors.append(f"SCREEN_REGISTRY has unexpected screens: {', '.join(extra)}")

    for screen_id, screen in screens.items():
        owner = screen.get("owner")
        if not owner:
            errors.append(f"{screen_id}: owner is required")
        if screen.get("requirements") != "resolve_in_github":
            errors.append(f"{screen_id}: requirements must be resolve_in_github")

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

    # User Story inventory and assignment checks.
    stories = stories_doc.get("stories", {})
    expected_stories = {f"US-{i:03d}" for i in range(1, 36)}
    actual_stories = set(stories)
    missing_stories = sorted(expected_stories - actual_stories)
    extra_stories = sorted(actual_stories - expected_stories)
    if missing_stories:
        errors.append(f"USER_STORIES_INDEX missing stories: {', '.join(missing_stories)}")
    if extra_stories:
        errors.append(f"USER_STORIES_INDEX has unexpected official stories: {', '.join(extra_stories)}")

    actual_by_owner: dict[str, set[str]] = {}
    for story_id, story in stories.items():
        owner = story.get("owner")
        actual_by_owner.setdefault(owner, set()).add(story_id)
        if story.get("content_status") not in {"migration_required", "complete"}:
            errors.append(f"{story_id}: content_status must be migration_required or complete")

    for owner, expected_ids in EXPECTED_STORY_OWNERS.items():
        actual_ids = actual_by_owner.get(owner, set())
        if actual_ids != expected_ids:
            missing_owner = sorted(expected_ids - actual_ids)
            extra_owner = sorted(actual_ids - expected_ids)
            details = []
            if missing_owner:
                details.append(f"missing {', '.join(missing_owner)}")
            if extra_owner:
                details.append(f"unexpected {', '.join(extra_owner)}")
            errors.append(f"{owner}: story assignment mismatch ({'; '.join(details)})")

    unexpected_owners = set(actual_by_owner) - set(EXPECTED_STORY_OWNERS)
    if unexpected_owners:
        errors.append(f"USER_STORIES_INDEX has unexpected owners: {', '.join(sorted(map(str, unexpected_owners)))}")

    # Requirement inventory checks.
    functional = requirements_doc.get("functional_requirements", {})
    expected_rf = {f"RF{i:02d}" for i in range(1, 31)}
    missing_rf = sorted(expected_rf - set(functional))
    if missing_rf:
        errors.append(f"REQUIREMENTS_INDEX missing functional requirements: {', '.join(missing_rf)}")

    nonfunctional = requirements_doc.get("non_functional_requirements", {})
    for requirement_id in ("RNF01", "RNF03"):
        if requirement_id not in nonfunctional:
            errors.append(f"REQUIREMENTS_INDEX missing referenced {requirement_id}")

    if errors:
        print("Agent context validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    migration_count = sum(
        1 for story in stories.values() if story.get("content_status") == "migration_required"
    )
    print("Agent context validation passed.")
    print(f"- screens: {len(screens)}")
    print(f"- screens with known Figma nodes: {len(figma_nodes)}")
    print(f"- state entries: {len(states)}")
    print(f"- official user stories indexed: {len(stories)}")
    print(f"- user stories awaiting content migration: {migration_count}")
    print(f"- functional requirements indexed: {len(functional)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
