# Native Workbench thematic views of the SAME live-reversed catalog, no DDL changes.
import grt,json,traceback
try:
 grt.modules.Workbench.openModel('/delivery/rede_de_apoio_v1.mwb')
 model=grt.root.wb.doc.physicalModels[0]
 tables={t.name:t for s in model.catalog.schemata for t in s.tables}
 core=['usuario','pessoa_idosa','rede_cuidado','membro_rede']
 views={
 'identidade_rede':core+['atribuicao_papel_familiar','convite_cadastro_cuidador','habilitacao_acesso_idoso','sessao_usuario','cadastro_rate_limit','login_rate_limit'],
 'agenda_tarefas':core+['plantao','solicitacao_troca_plantao','historico_plantao','tarefa','conclusao_tarefa','compromisso','ocorrencia_programada'],
 'medicacao':core+['medicamento','regime_medicamento','horario_regime','ocorrencia_programada','administracao_medicamento','correcao_administracao_medicamento'],
 'diario_consultas':core+['registro_cuidado','correcao_registro_cuidado','consulta','correcao_consulta','recomendacao','anexo','compromisso'],
 'suporte_tecnico':core+['contato_importante','informacao_emergencia','preferencia_notificacao','entrega_tecnica_notificacao','auditoria','idempotencia_comando']
 }
 evidence=[]
 for name,names in views.items():
  diagram=model.addNewDiagram(0)
  diagram.name=name
  diagram.setPageCounts(4,3)
  for i,nameTable in enumerate(names):
   figure=diagram.placeTable(tables[nameTable],80+(i%4)*420,80+(i//4)*520)
   figure.color='#D8EBDD' if nameTable in core else '#DCE5F2'
   figure.summarizeDisplay=0
  for nameTable in names:diagram.createConnectionsForTable(tables[nameTable])
  grt.modules.Workbench.activateDiagram(diagram)
  grt.modules.Workbench.exportSVG('/delivery/diagrama_'+name+'.svg')
  grt.modules.Workbench.exportPNG('/delivery/diagrama_'+name+'.png')
  evidence.append({'name':name,'tables':len(diagram.figures),'connections':len(diagram.connections),'scope':names})
 grt.modules.Workbench.activateDiagram(model.diagrams[0])
 grt.modules.Workbench.saveModel()
 with open('/delivery/workbench_vistas.json','w') as f:json.dump(evidence,f,indent=2)
except Exception:
 with open('/tmp/wb-error-views.txt','w') as f:f.write(traceback.format_exc())
