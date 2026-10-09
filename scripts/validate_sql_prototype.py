#!/usr/bin/env python3
"""Validador ESTATICO do prototipo SQL MySQL. Nao conecta nem executa SQL."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SQL = ROOT / "database/mysql/001_rede_de_apoio_schema.sql"
EXPECTED = {
    "usuario", "pessoa_idosa", "rede_cuidado", "membro_rede",
    "atribuicao_papel_familiar", "plantao", "solicitacao_troca_plantao",
    "tarefa", "conclusao_tarefa", "compromisso", "consulta",
    "recomendacao", "medicamento", "regime_medicamento", "horario_regime",
    "ocorrencia_programada", "administracao_medicamento", "registro_cuidado",
    "correcao_registro_cuidado", "correcao_consulta",
    "correcao_administracao_medicamento", "anexo", "contato_importante",
    "informacao_emergencia", "preferencia_notificacao", "auditoria",
    "entrega_tecnica_notificacao", "idempotencia_comando",
    "habilitacao_acesso_idoso", "historico_plantao",
}
errors: list[str] = []


def fail(message: str) -> None:
    errors.append(message)


def cols(data: str) -> tuple[str, ...]:
    return tuple(x.strip().strip("`").lower() for x in data.split(","))


def main() -> int:
    if not SQL.exists():
        print(f"ERRO: ausente {SQL}", file=sys.stderr)
        return 1
    source = SQL.read_text(encoding="utf-8")
    if not source.endswith("\n"):
        fail("Arquivo deve terminar com quebra de linha")

    no_line_comments = re.sub(r"(?m)^\s*--[^\n]*$", "", source)
    for word in (r"\bDROP\s+(?:DATABASE|TABLE)\b",
                 r"\bTRUNCATE\s+TABLE\b",
                 r"\bINSERT\s+INTO\b",
                 r"\bDELETE\s+FROM\b",
                 r"\bSET\s+FOREIGN_KEY_CHECKS\s*=\s*0"):
        if re.search(word, no_line_comments, re.I):
            fail(f"Comando proibido neste prototipo: {word}")

    pattern = re.compile(r"CREATE TABLE IF NOT EXISTS\s+(\w+)\s*\(", re.I)
    found = list(pattern.finditer(no_line_comments))
    tables: dict[str, str] = {}
    order: dict[str, int] = {}
    for i, m in enumerate(found):
        name = m.group(1).lower()
        # Nao encerrar no primeiro ;: um COMMENT SQL pode conter ; dentro de aspas.
        # Cada CREATE foi delimitado pelo inicio do seguinte e pelo bloco ENGINE.
        end = found[i + 1].start() if i + 1 < len(found) else len(no_line_comments)
        block = no_line_comments[m.start():end]
        if not re.search(r"\)\s*ENGINE=InnoDB[\s\S]*?;", block, re.I):
            fail(f"CREATE TABLE sem encerramento ENGINE=InnoDB e ;: {name}")
        if name in tables:
            fail(f"Tabela repetida: {name}")
        tables[name] = block
        order[name] = i
        if "ENGINE=InnoDB" not in block:
            fail(f"Engine diferente de InnoDB: {name}")
        if "DEFAULT CHARSET=utf8mb4" not in block:
            fail(f"Charset nao e utf8mb4: {name}")

    if set(tables) != EXPECTED:
        fail(f"Inventario divergente, faltam={sorted(EXPECTED - set(tables))}, extras={sorted(set(tables) - EXPECTED)}")

    constraint_names = []
    total_fk = 0
    for name, block in tables.items():
        constraints = re.findall(r"\bCONSTRAINT\s+(\w+)\s+(?:CHECK|FOREIGN KEY)", block, re.I)
        constraint_names.extend(constraints)
        pks = re.findall(r"\bPRIMARY KEY\s*\(([^)]+)\)", block, re.I)
        if len(pks) != 1:
            fail(f"Esperada uma PK: {name}")
        fkmatches = re.findall(
            r"FOREIGN KEY\s*\(([^)]+)\)\s*REFERENCES\s+(\w+)\s*\(([^)]+)\)",
            block, re.I | re.S
        )
        total_fk += len(fkmatches)
        for child_columns, parent, referenced_columns in fkmatches:
            parent = parent.lower()
            if parent not in tables:
                fail(f"FK de {name} referencia tabela inexistente: {parent}")
                continue
            if order[parent] >= order[name]:
                fail(f"FK de {name} referencia {parent} fora de ordem de criacao")
            if len(cols(child_columns)) != len(cols(referenced_columns)):
                fail(f"FK de {name}->{parent} com numero diferente de colunas")
            parent_block = tables[parent]
            candidate_keys = [
                cols(k) for k in re.findall(
                    r"(?:PRIMARY KEY|UNIQUE KEY\s+\w+)\s*\(([^)]+)\)",
                    parent_block, re.I
                )
            ]
            if cols(referenced_columns) not in candidate_keys:
                fail(
                    f"FK {name}->{parent}: colunas {cols(referenced_columns)} "
                    "sem chave unica exata no pai"
                )

    if len(constraint_names) != len(set(constraint_names)):
        fail("Existem nomes de constraints duplicados")
    mandatory = {
        "uq_papel_principal_rede", "uq_conclusao_ciclo",
        "uq_membro_usuario_ativo", "ck_ocorrencia_origem", "ck_anexo_pai",
        "fk_papel_membro_familiar", "fk_administracao_ocorrencia",
        "uq_rede_idoso_v1", "uq_administracao_ocorrencia_v1",
        "fk_habilitacao_pessoa_titular", "uq_convite_aberto_pessoa",
        "uq_historico_plantao_versao",
    }
    for token in sorted(mandatory):
        if token not in no_line_comments:
            fail(f"Guarda obrigatoria ausente: {token}")

    if not re.search(r"UNIQUE\s+KEY\s+uq_rede_idoso_v1\s*\(\s*pessoa_idosa_id\s*\)", tables.get("rede_cuidado", ""), re.I):
        fail("DB-001 V1: UNIQUE obrigatoria para uma rede por pessoa idosa")
    if not re.search(r"\bCREATE DATABASE IF NOT EXISTS\s+rede_de_apoio\b", no_line_comments, re.I):
        fail("Nome do banco inicial divergente")

    if errors:
        print(f"FAIL — {len(errors)} erro(s) de estrutura estatica:")
        for item in errors:
            print(" -", item)
        return 1
    print(f"PASS — {len(tables)} tabelas, {total_fk} FKs, "
          f"{len(constraint_names)} constraints unicas conferidas estaticamente")
    print("LIMITACAO: NAO valida sintaxe completa, InnoDB, execucao MySQL, concurrencia ou autorizacao.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
