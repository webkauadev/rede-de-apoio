# Run INSIDE MySQL Workbench 8.0.47 using --run-script; native reverse engineering/save.
import grt, json, traceback
try:
 state=json.load(open('/tmp/mysql-state.json'))
 c=grt.classes.db_mgmt_Connection()
 c.name='Issue 124 disposable only'
 c.driver=next(d for d in grt.root.wb.rdbmsMgmt.rdbms[0].drivers if d.name=='MysqlNative')
 for k,v in {'hostName':'127.0.0.1','port':state['port'],'userName':'root','useSSL':1}.items():c.parameterValues[k]=v
 c.hostIdentifier='Mysql@127.0.0.1:'+str(state['port'])
 grt.modules.DbMySQLRE.connect(c,state['password'])
 catalog=grt.modules.DbMySQLRE.reverseEngineer(c,'def',['rede_de_apoio'],{'reverseEngineerTables':1,'reverseEngineerViews':0,'reverseEngineerRoutines':0,'reverseEngineerTriggers':0})
 # DbMySQLRE's per-table parser drops forward reference bindings. Restore
 # native GRT FK pointers ONLY from this server's information_schema capture.
 physical=json.load(open('/delivery/estrutura_fisica.json'))
 table_map={t.name:t for schema in catalog.schemata for t in schema.tables}
 grouped={}
 for row in physical['foreignKeys']:grouped.setdefault((row['child'],row['name']),[]).append(row)
 for (child,name),rows in grouped.items():
  table=table_map[child]
  fk=next(f for f in table.foreignKeys if f.name==name)
  parent=table_map[rows[0]['parent']]
  fk.referencedTable=parent
  fk.columns.remove_all();fk.referencedColumns.remove_all()
  for row in rows:
   fk.columns.append(next(col for col in table.columns if col.name==row['childColumn']))
   fk.referencedColumns.append(next(col for col in parent.columns if col.name==row['parentColumn']))
  fk.updateRule=rows[0]['updateRule'];fk.deleteRule=rows[0]['deleteRule']
 assert len(grouped)==79
 grt.modules.DbMySQLRE.disconnect(c)
 tables=list(catalog.schemata[0].tables)
 assert len(tables)==34
 assert sum(len(t.foreignKeys) for t in tables)==79
 grt.modules.Workbench.newDocument()
 model=grt.root.wb.doc.physicalModels[0]
 # Move the server-reversed schema into the native document's catalog.
 model.catalog.schemata.remove_all()
 for schema in list(catalog.schemata):
  schema.owner=model.catalog
  model.catalog.schemata.append(schema)
 grt.modules.WbModel.createDiagramWithCatalog(model,model.catalog)
 diagram=model.diagrams[0]
 diagram.name='V1 - 34 tabelas e 79 relacionamentos'
 diagram.setPageCounts(7,5)
 # Spacious grid for all columns, deterministic ordering; native relationship figures retained.
 for i,figure in enumerate(sorted(diagram.figures,key=lambda f:f.table.name)):
  figure.left=80+(i%7)*520
  figure.top=80+(i//7)*680
 grt.modules.Workbench.activateDiagram(diagram)
 grt.modules.Workbench.saveModelAs('/delivery/rede_de_apoio_v1.mwb')
 with open('/delivery/workbench_criacao.json','w') as f:json.dump({'workbench':'8.0.47','method':'DbMySQLRE live reverse engineering; native Workbench saveModelAs','tables':len(tables),'foreignKeys':sum(len(t.foreignKeys) for t in tables),'diagramFigures':len(diagram.figures),'diagramConnections':len(diagram.connections)},f,indent=2)
except Exception:
 with open('/tmp/wb-error-reverse.txt','w') as f:f.write(traceback.format_exc())
