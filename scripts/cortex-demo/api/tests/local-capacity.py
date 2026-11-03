import json,urllib.request,urllib.error,subprocess,concurrent.futures
base='http://localhost:8791'
def req(path,method='GET',body=None,ip='198.51.100.1'):
 h={'Authorization':'Bearer shared-demo','Content-Type':'application/json','CF-Connecting-IP':ip};data=json.dumps(body).encode() if body is not None else None;q=urllib.request.Request(base+path,data=data,headers=h,method=method)
 try:
  with urllib.request.urlopen(q,timeout=30) as r:return r.status,json.load(r)
 except urllib.error.HTTPError as e:return e.code,json.load(e)
def sql(cmd):
 return subprocess.check_output(['npx','--yes','wrangler','d1','execute','cortex-demo','--local','--command',cmd,'--json'],text=True)
status,note=req('/api/notes','POST',{'title':'Validation'});assert status==201;id=note['id']
assert req('/api/notes/'+id,'PUT',{'content':[{'type':'p','children':[42]}]})[0]==400
assert req('/api/notes/'+id,'PUT',{'content':[{'type':'p','children':[{'text':'x'}]}]})[0]==200
req('/api/notes/'+id,'DELETE');sql("UPDATE notes SET expires_at=1 WHERE id='"+id+"'")
assert req('/api/notes/'+id)[0]==404
assert all(n['id']!=id for n in req('/api/notes/archived')[1]['notes'])
assert 'Validation' in sql("SELECT title FROM notes WHERE id='"+id+"'")
print('Malformed tree rejected; expired archive and detail hidden without deleting on read')
sql("DELETE FROM notes WHERE id!='intro'")
sql("WITH RECURSIVE n(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM n WHERE i<98) INSERT INTO notes(id,title,content,content_text,created_at,updated_at,expires_at) SELECT 'filler-'||i,'filler','[]','','2026-01-01','2026-01-01',9999999999 FROM n")
with concurrent.futures.ThreadPoolExecutor(max_workers=15) as ex:
 results=list(ex.map(lambda i:req('/api/notes','POST',{'title':'Race test'},ip=f'203.0.113.{i+1}')[0],range(15)))
print('Concurrent create statuses:',results)
assert results.count(201)==1 and results.count(429)==14
sql("DELETE FROM notes WHERE id!='intro'")
print('Atomic cap allows only one creation when one slot is free')
