"""Run INSIDE MySQL Workbench 8.0 with --run-script; no database connection.
RDA_WB_INPUT: native model; RDA_WB_OUTPUT: staging directory, never delivery directly.
"""
import grt
import os
import json
import traceback
import hashlib
from pathlib import Path
from datetime import datetime, timezone

out = Path(os.environ['RDA_WB_OUTPUT'])
out.mkdir(parents=True, exist_ok=True)
proof = {'startedUtc': datetime.now(timezone.utc).isoformat(), 'nativeOpenModel': False}
try:
    source = Path(os.environ['RDA_WB_INPUT'])
    proof['inputSha256'] = hashlib.sha256(source.read_bytes()).hexdigest()
    grt.modules.Workbench.openModel(str(source))
    proof['nativeOpenModel'] = True
    model = grt.root.wb.doc.physicalModels[0]
    tables = [t for s in model.catalog.schemata for t in s.tables]
    fks = [f for t in tables for f in t.foreignKeys]
    assert len(tables) == 34 and len(fks) == 79 and len(model.diagrams) == 6
    proof.update(tableCount=len(tables), foreignKeyCount=len(fks), diagramCount=len(model.diagrams))
    cardinalities = []
    for t in tables:
        unique = [{c.referencedColumn.name for c in ix.columns} for ix in t.indices if ix.unique or ix.isPrimary]
        for fk in t.foreignKeys:
            columns = {c.name for c in fk.columns}
            expected_many = int(not any(u and u <= columns for u in unique))
            expected_parent_mandatory = int(all(c.isNotNull for c in fk.columns))
            before = dict(many=fk.many, mandatory=fk.mandatory, referencedMandatory=fk.referencedMandatory)
            # Workbench start = referencing (child); end = referenced (parent).
            # DDL does not require every parent to have a child.
            fk.many = expected_many
            fk.mandatory = 0
            fk.referencedMandatory = expected_parent_mandatory
            row = dict(table=t.name, foreignKey=fk.name, parent=fk.referencedTable.name,
                       columns=[c.name for c in fk.columns], many=fk.many,
                       mandatory=fk.mandatory, referencedMandatory=fk.referencedMandatory,
                       expectedMany=expected_many, expectedParentMandatory=expected_parent_mandatory, before=before)
            assert fk.many == expected_many, row
            assert fk.mandatory == 0, row
            assert fk.referencedMandatory == expected_parent_mandatory, row
            cardinalities.append(row)
    proof['cardinalities'] = cardinalities
    critical = next(x for x in cardinalities if x['foreignKey'] == 'fk_rede_pessoa')
    assert (critical['many'], critical['mandatory'], critical['referencedMandatory']) == (0,0,1)
    proof['criticalRelationship'] = 'pessoa_idosa [1] -- [0..1] rede_cuidado'
    proof['exports'] = []
    for i, diagram in enumerate(model.diagrams):
        suffix = 'geral' if i == 0 else diagram.name
        assert suffix in ['geral','identidade_rede','agenda_tarefas','medicacao','diario_consultas','suporte_tecnico']
        grt.modules.Workbench.activateDiagram(diagram)
        row = dict(name=diagram.name, figures=len(diagram.figures), connections=len(diagram.connections))
        for ext, function in [('svg', grt.modules.Workbench.exportSVG), ('png', grt.modules.Workbench.exportPNG)]:
            path = out / ('diagrama_' + suffix + '.' + ext)
            row[ext] = {'returnCode': function(str(path)), 'bytes': path.stat().st_size,
                        'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
            assert path.stat().st_size > 1000
        proof['exports'].append(row)
    # Native diagnostic export isolates the audited relationship, then restores visibility.
    diagram = next(d for d in model.diagrams if d.name == 'identidade_rede')
    grt.modules.Workbench.activateDiagram(diagram)
    visibility = [(c, c.visible) for c in diagram.connections]
    try:
        for c, visible in visibility:
            c.visible = int(c.foreignKey.name == 'fk_rede_pessoa')
        grt.modules.Workbench.exportPNG(str(out / 'fk_rede_pessoa-native.png'))
        grt.modules.Workbench.exportSVG(str(out / 'fk_rede_pessoa-native.svg'))
    finally:
        for c, visible in visibility:
            c.visible = visible
    proof['nativeSaveReturnCode'] = grt.modules.Workbench.saveModelAs(str(out / 'rede_de_apoio_v1.mwb'))
    proof['status'] = 'PASS'
except Exception:
    proof['status'] = 'FAIL'
    proof['traceback'] = traceback.format_exc()
finally:
    proof['finishedUtc'] = datetime.now(timezone.utc).isoformat()
    (out / 'native-export.json').write_text(json.dumps(proof, indent=2))
