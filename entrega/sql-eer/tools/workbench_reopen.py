# Separate Workbench process: reopen the saved native model and export its actual diagram.
import grt, json, traceback
try:
 grt.modules.Workbench.openModel('/delivery/rede_de_apoio_v1.mwb')
 model=grt.root.wb.doc.physicalModels[0]
 tables=[t for s in model.catalog.schemata for t in s.tables]
 assert len(tables)==34
 assert sum(len(t.foreignKeys) for t in tables)==79
 physical=json.load(open('/delivery/estrutura_fisica.json'))
 expected={}
 for row in physical['foreignKeys']:expected.setdefault((row['child'],row['name']),[]).append(row)
 for table in tables:
  for fk in table.foreignKeys:
   rows=expected[(table.name,fk.name)]
   assert fk.referencedTable.name==rows[0]['parent']
   assert [col.name for col in fk.columns]==[r['childColumn'] for r in rows]
   assert [col.name for col in fk.referencedColumns]==[r['parentColumn'] for r in rows]
   assert fk.updateRule==rows[0]['updateRule'] and fk.deleteRule==rows[0]['deleteRule']
 diagram=model.diagrams[0]
 assert len(diagram.figures)==34
 assert len(diagram.connections)==79
 grt.modules.Workbench.activateDiagram(diagram)
 grt.modules.Workbench.exportSVG('/delivery/diagrama_geral.svg')
 grt.modules.Workbench.exportPNG('/delivery/diagrama_geral.png')
 with open('/delivery/workbench_reabertura.json','w') as f:json.dump({'workbench':'8.0.47','separateProcess':True,'nativeOpenModel':True,'tables':sorted(t.name for t in tables),'tableCount':len(tables),'foreignKeys':sum(len(t.foreignKeys) for t in tables),'diagramFigures':len(diagram.figures),'diagramConnections':len(diagram.connections),'fkColumnsAndRulesVerified':True,'diagrams':len(model.diagrams),'exports':['diagrama_geral.svg','diagrama_geral.png']},f,indent=2)
except Exception:
 with open('/tmp/wb-error-reopen.txt','w') as f:f.write(traceback.format_exc())
