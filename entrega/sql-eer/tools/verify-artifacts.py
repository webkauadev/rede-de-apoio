"""Offline integrity check of native Workbench output, not a substitute for reopening."""
import hashlib
import json
from pathlib import Path
import xml.etree.ElementTree as ET
import zipfile
import struct
import zlib

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
# Workbench native renderer: start = child, end = referenced parent.
# UNIQUE FK => child maximum 1; nullable FK => optional parent.
for table in tables:
    columns = {n.get('id'): n for n in table.findall("value[@key='columns']/value")}
    unique_sets = []
    for index in table.findall("value[@key='indices']/value"):
        if text(index, 'unique') == '1' or text(index, 'isPrimary') == '1':
            unique_sets.append({text(c, 'referencedColumn') for c in index.findall("value[@key='columns']/value")})
    for fk in table.findall("value[@key='foreignKeys']/value"):
        col_ids = {n.text for n in fk.findall("value[@key='columns']/link")}
        expected_many = int(not any(u and u <= col_ids for u in unique_sets))
        parent_mandatory = int(all(text(columns[c], 'isNotNull') == '1' for c in col_ids))
        assert int(text(fk, 'many')) == expected_many, text(fk, 'name')
        assert text(fk, 'mandatory') == '0', text(fk, 'name')
        assert int(text(fk, 'referencedMandatory')) == parent_mandatory, text(fk, 'name')

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
    png = (ROOT / f'diagrama_{suffix}.png').read_bytes()
    assert png.startswith(b'\x89PNG\r\n\x1a\n')
    offset, compressed = 8, bytearray()
    while offset < len(png):
        length = struct.unpack('>I', png[offset:offset+4])[0]
        kind = png[offset+4:offset+8]
        payload = png[offset+8:offset+8+length]
        crc = struct.unpack('>I', png[offset+8+length:offset+12+length])[0]
        assert zlib.crc32(kind + payload) & 0xffffffff == crc
        if kind == b'IHDR':
            width, height = struct.unpack('>II', payload[:8])
            assert width >= 1000 and height >= 1000
        if kind == b'IDAT':
            compressed.extend(payload)
        offset += 12 + length
    assert len(set(zlib.decompress(compressed))) > 10, 'Empty PNG'
    svg = ET.parse(ROOT / f'diagrama_{suffix}.svg').getroot()
    assert svg.tag.endswith('svg') and len(list(svg.iter())) > 100
native = json.loads((ROOT / 'evidencias-workbench/native-export.json').read_text())
assert native['status'] == 'PASS' and native['nativeOpenModel'] is True
assert (native['tableCount'], native['foreignKeyCount'], native['diagramCount']) == (34, 79, 6)
assert native['inputSha256'] == hashlib.sha256((ROOT / 'rede_de_apoio_v1.mwb').read_bytes()).hexdigest()
assert len(native['exports']) == 6
for exported in native['exports']:
    suffix = 'geral' if exported['name'].startswith('V1') else exported['name']
    for ext in ['svg', 'png']:
        data = (ROOT / f'diagrama_{suffix}.{ext}').read_bytes()
        assert exported[ext]['returnCode'] == 0
        assert exported[ext]['bytes'] == len(data)
        assert exported[ext]['sha256'] == hashlib.sha256(data).hexdigest()
proof = json.loads((ROOT / 'evidencias_integridade.json').read_text())
for filename, expected_hash in proof['files'].items():
    assert hashlib.sha256((ROOT / filename).read_bytes()).hexdigest() == expected_hash
print('PASS native MWB: 34 tables, 79 complete FKs, six diagrams; physical 50 CHECK/44 UNIQUE; PNG/SVG valid')
