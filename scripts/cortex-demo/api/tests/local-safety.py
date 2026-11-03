import json, urllib.request, urllib.error, subprocess
base='http://localhost:8791'
def req(path, method='GET', data=None, ip='192.0.2.11', auth=True):
 h={'Content-Type':'application/json','CF-Connecting-IP':ip}
 if auth:h['Authorization']='Bearer shared-demo'
 if isinstance(data,dict):data=json.dumps(data).encode()
 q=urllib.request.Request(base+path,data=data,headers=h,method=method)
 try:
  with urllib.request.urlopen(q,timeout=10) as r:return r.status,json.load(r)
 except urllib.error.HTTPError as e:return e.code,json.load(e)
assert req('/api/notes/dashboard',auth=False)[0]==401
assert req('/api/notes/intro','PUT',{'title':'No'})[0]==403
assert req('/api/notes/intro','DELETE')[0]==403
status,note=req('/api/notes','POST',{'title':'Test save'});assert status==201,(status,note)
id=note['id']
assert req('/api/notes/'+id,'PUT',{'content':'not an array'})[0]==400
assert req('/api/notes/'+id,'PUT',{'title':{'x':'bad'}})[0]==400
assert req('/api/notes/'+id,'PUT',b'{broken')[0]==400
assert req('/api/notes/'+id,'PUT',{'contentText':'x'*121000})[0]==413
assert req('/api/notes/'+id,'PUT',{'title':'Saved','content':[{'type':'p','children':[{'text':'sample'}]}],'contentText':'sample'})[0]==200
assert req('/api/notes/'+id)[1]['note']['content_text']=='sample'
assert req('/api/notes/'+id,'DELETE')[0]==200
assert req('/api/notes/'+id+'/forever','DELETE')[0]==200
print('Access, immutable seed, malformed and large input, and save checks pass')
statuses=[req('/api/notes/intro','DELETE',ip='192.0.2.22')[0] for _ in range(21)]
assert statuses[-1]==429,statuses
print('Rate limit rejects the 21st write in one minute')
status,note=req('/api/notes','POST',{'title':'Expiry test'},ip='192.0.2.33'); assert status==201
sql="UPDATE notes SET expires_at=1 WHERE id='"+note['id']+"'"
subprocess.run(['npx','--yes','wrangler','d1','execute','cortex-demo','--local','--command',sql],stdout=subprocess.DEVNULL,check=True)
assert req('/api/notes/'+note['id'],ip='192.0.2.33')[0]==404
assert all(n['id']!=note['id'] for n in req('/api/notes/dashboard',ip='192.0.2.33')[1]['notes'])
print('Expired notes are hidden')
