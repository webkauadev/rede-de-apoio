"""Offline integrity check of native Workbench output, not a substitute for reopening."""
import hashlib
import json
from pathlib import Path
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / '02_manifest_estrutura.json').read_text())
physical = json.loads((ROOT / 'estrutura_fisica.json').read_text())
with zipfile.ZipFile(ROOT / 'rede_de_apoio_v1.mwb') as archive:
    tree = ET.fromstring(archive.read('document.mwb.xml'))
objects = {n.get('id'): n for n in tree.iter('value') if n.get('id')}

def text(node, key):
    child = node.find(f"*[@key='{key}']")
    return child.text if child is not None else None

def named(struct):
    return list(tree.iterfind(f".//value[@struct-name='{struct}']"))

tables = named('db.mysql.Table')
assert sorted(text(t, 'name') for t in tables) == manifest['tables']
fks = named('db.mysql.ForeignKey')
expected = {}
for row in physical['foreignKeys']:
    expected.setdefault((row['child'], row['name']), []).append(row)
assert len(fks) == len(expected) == 79
actual = set()
for fk in fks:
    key = (text(objects[text(fk, 'owner')], 'name'), text(fk, 'name'))
    rows = expected[key]
    assert text(objects[text(fk, 'referencedTable')], 'name') == rows[0]['parent']
    for field, column in [('columns', 'childColumn'), ('referencedColumns', 'parentColumn')]:
        links = fk.findall(f"value[@key='{field}']/link")
        assert [text(objects[n.text], 'name') for n in links] == [r[column] for r in rows]
    assert text(fk, 'updateRule') == rows[0]['updateRule']
    assert text(fk, 'deleteRule') == rows[0]['deleteRule']
    actual.add(key)
assert actual == set(expected)
assert actual == {(f['table'], f['name']) for f in manifest['foreign_keys']}
diagrams = named('workbench.physical.Diagram')
assert len(diagrams) == 6
for diagram in diagrams:
    figures = diagram.findall("value[@key='figures']/value")
    connections = diagram.findall("value[@key='connections']/value")
    table_ids = {text(f, 'table') for f in figures}
    applicable = {f.get('id') for f in fks if text(f, 'owner') in table_ids and text(f, 'referencedTable') in table_ids}
    assert {text(c, 'foreignKey') for c in connections} == applicable
    if text(diagram, 'name').startswith('V1'):
        assert len(figures) == 34 and len(connections) == 79
assert len(physical['checks']) == len(manifest['checks']) == 50
assert len({(r['tableName'], r['name']) for r in physical['indexes'] if r['name'] != 'PRIMARY'}) == len(manifest['unique_indexes']) == 44
for suffix in ['geral', 'identidade_rede', 'agenda_tarefas', 'medicacao', 'diario_consultas', 'suporte_tecnico']:
    assert (ROOT / f'diagrama_{suffix}.png').read_bytes().startswith(b'\x89PNG\r\n\x1a\n')
    assert ET.parse(ROOT / f'diagrama_{suffix}.svg').getroot().tag.endswith('svg')
proof = json.loads((ROOT / 'evidencias_integridade.json').read_text())
for filename, expected_hash in proof['files'].items():
    assert hashlib.sha256((ROOT / filename).read_bytes()).hexdigest() == expected_hash
print('PASS native MWB: 34 tables, 79 complete FKs, six diagrams; physical 50 CHECK/44 UNIQUE; PNG/SVG valid')
