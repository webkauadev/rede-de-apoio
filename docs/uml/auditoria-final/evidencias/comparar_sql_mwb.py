from pathlib import Path
import re,json,zipfile
from lxml import etree as E
base=Path(__file__).resolve().parents[4]; out=base/'docs/uml/auditoria-final/evidencias'
sql=(base/'entrega/sql-eer/01_schema_completo_v1.sql').read_text()
blocks=dict(re.findall(r'CREATE TABLE (?:IF NOT EXISTS )?(\w+)\s*\((.*?)\) ENGINE=',sql,re.S))
r=E.fromstring(zipfile.ZipFile(base/'entrega/sql-eer/rede_de_apoio_v1.mwb').read('document.mwb.xml'))
obj={n.get('id'):n for n in r.xpath('//*[@id]')}
def val(n,k):return n.findtext(f"value[@key='{k}']")
def name(i):return val(obj[i],'name')
cols={};fks={};indexes={};diff=[]
for t in r.xpath("//value[@struct-name='db.mysql.Table']"):
 tn=val(t,'name');cols[tn]={};indexes[tn]={}
 for c in t.xpath("value[@key='columns']/value"):
  typ=c.findtext("link[@key='simpleType']",'').split('.')[-1].upper()
  length=val(c,'length');prec=val(c,'precision')
  if length not in (None,'-1'):typ+='('+length+')'
  elif typ in ('DATETIME','TIME','TIMESTAMP') and prec not in (None,'-1'):typ+='('+prec+')'
  flags=[x.text for x in c.xpath("value[@key='flags']/value")]
  if 'UNSIGNED' in flags:typ+=' UNSIGNED'
  cn=val(c,'name');cols[tn][cn]={'type':typ,'not_null':val(c,'isNotNull')=='1','generated':val(c,'generated')=='1'}
  m=re.search(r'^\s*'+cn+r'\s+(\w+(?:\(\d+\))?(?: UNSIGNED)?)(?=\s|,)([^\n]*)',blocks[tn],re.M)
  if not m:diff.append([tn,cn,'missing SQL']);continue
  st=m[1];st='TINYINT' if st=='BOOLEAN' else st
  if typ!=st:diff.append([tn,cn,'type',typ,st])
  if not cols[tn][cn]['generated'] and ('NOT NULL' in m[0])!=cols[tn][cn]['not_null']:diff.append([tn,cn,'nullable'])
 for f in t.xpath("value[@key='foreignKeys']/value"):
  fn=val(f,'name'); a=[name(x.text) for x in f.xpath("value[@key='columns']/link")];b=[name(x.text) for x in f.xpath("value[@key='referencedColumns']/link")];parent=name(f.findtext("link[@key='referencedTable']"))
  fks[fn]={'child':tn,'columns':a,'parent':parent,'ref_columns':b,'nullable':any(not cols[tn][c]['not_null'] for c in a),'many':val(f,'many'),'mandatory':val(f,'mandatory'),'referencedMandatory':val(f,'referencedMandatory')}
  m=re.search(r'CONSTRAINT '+fn+r' FOREIGN KEY\s*\(([^)]+)\)\s*REFERENCES (\w+)\s*\(([^)]+)\)',blocks[tn])
  if not m or [x.strip() for x in m[1].split(',')]!=a or m[2]!=parent or [x.strip() for x in m[3].split(',')]!=b:diff.append([tn,fn,'FK mismatch'])
 for i in t.xpath("value[@key='indices']/value"):
  indexes[tn][val(i,'name')]={'columns':[name(x.text) for x in i.xpath("value[@key='columns']/value/link[@key='referencedColumn']")],'unique':val(i,'unique')=='1' or val(i,'isPrimary')=='1'}
for tn,items in indexes.items():
 for ix,props in items.items():
  if not props['unique']:continue
  pattern=r'PRIMARY KEY\s*\(([^)]+)\)' if ix=='PRIMARY' else r'UNIQUE KEY '+re.escape(ix)+r'\s*\(([^)]+)\)'
  m=re.search(pattern,blocks[tn])
  if not m or [x.strip() for x in m[1].split(',')]!=props['columns']:diff.append([tn,ix,'unique/PK mismatch'])
views=[]
for d in r.xpath("//value[@struct-name='workbench.physical.Diagram']"):
 views.append({'name':val(d,'name'),'tables':[name(x.text) for x in d.xpath("value[@key='figures']/value/link[@key='table']")],'fks':[name(x.text) for x in d.xpath("value[@key='connections']/value/link[@key='foreignKey']")]})
result={'tables':cols,'foreign_keys':fks,'indexes':indexes,'views':views,'comparison_differences':diff,'sql_tables':len(blocks),'mwb_tables':len(cols),'mwb_columns':sum(map(len,cols.values())),'mwb_fks':len(fks),'checks_in_sql':len(re.findall(r'CONSTRAINT \w+\s+CHECK',sql)),'checks_in_mwb':len(r.xpath("//value[@struct-name='db.CheckConstraint']"))}
(out/'sql-mwb-comparacao.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print({k:result[k] for k in ['sql_tables','mwb_tables','mwb_columns','mwb_fks','checks_in_sql','checks_in_mwb']});print('differences',diff);print('views',[(v['name'],len(v['tables']),len(v['fks'])) for v in views])
