const headers = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization","Cache-Control":"no-store"};
const json = (body, status = 200) => Response.json(body,{status,headers});
const profile = {id:"demo",name:"Demo Student",avatar_url:null,role:"user",is_verified:false,verified_at:null,verification_requested_at:null,preferred_language:"en",university_id:null,college_id:null,major_id:null,year_level_id:null};

class RequestError extends Error { constructor(status,message) { super(message); this.status=status; } }
async function readJson(req) {
  if (!req.body) throw new RequestError(400,"A JSON body is required.");
  const reader=req.body.getReader(); const chunks=[]; let length=0;
  try { while(true) { const {value,done}=await reader.read(); if(done) break; length+=value.byteLength; if(length>120000) { await reader.cancel(); throw new RequestError(413,"Request too large."); } chunks.push(value); } } finally { reader.releaseLock(); }
  const bytes=new Uint8Array(length); let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  let body;try { body=JSON.parse(new TextDecoder().decode(bytes)); } catch {throw new RequestError(400,"Invalid JSON.");}
  if(!body || typeof body!=="object" || Array.isArray(body)) throw new RequestError(400,"Expected a JSON object."); return body;
}
function validateContent(value) {
  if(!Array.isArray(value) || value.length>1000) return false;
  let count=0;
  const safe=(item,depth,key="")=>{ if(++count>5000 || depth>20) return false; if(item===null || typeof item==="boolean" || typeof item==="number") return true; if(typeof item==="string") { if(item.length>100000) return false; if(["url","href","src"].includes(key) && item && !/^https?:\/\//i.test(item)) return false; return true; } if(Array.isArray(item)) return item.length<=1000 && item.every(x=>safe(x,depth+1)); if(typeof item!=="object") return false; const entries=Object.entries(item);return entries.length<=64 && entries.every(([k,v])=>k!=="__proto__" && k!=="constructor" && k!=="prototype" && safe(v,depth+1,k));};
  const node=(n,depth)=>{ if(!n || typeof n!=="object" || Array.isArray(n) || depth>20) return false; const leaf=Object.hasOwn(n,"text"), branch=Object.hasOwn(n,"children");if(leaf===branch) return false; if(leaf && typeof n.text!=="string") return false;if(branch && (!Array.isArray(n.children) || n.children.length>1000 || !n.children.every(child=>node(child,depth+1)))) return false;return Object.entries(n).filter(([k])=>k!=="children").every(([k,v])=>k!=="__proto__" && k!=="constructor" && k!=="prototype" && safe(v,depth+1,k));};
  return value.every(item=>node(item,0));
}

const normal = (row) => ({...row,is_pinned:!!row.is_pinned,is_published:!!row.is_published,content:JSON.parse(row.content),note_tags:[]});
export default { async fetch(req, env) {
  try {
    if(req.method==="OPTIONS") return new Response(null,{status:204,headers});
    const url = new URL(req.url); const p=url.pathname;
    if (p==="/api/health") return json({ok:true,demo:true});
    const nowSeconds=Math.floor(Date.now()/1000);
    const ip=req.headers.get("CF-Connecting-IP") || "local";
    if (["POST","PUT","DELETE"].includes(req.method)) {
      if (Number(req.headers.get("content-length") || 0)>120000) return json({error:"Request too large."},413);
      const {success}=await env.WRITE_LIMITER.limit({key:ip});
      if(!success) return json({error:"Too many demo changes. Try again in a minute."},429);
    } else if (req.method==="GET") {
      const {success}=await env.READ_LIMITER.limit({key:ip});
      if(!success) return json({error:"Too many demo requests. Try again in a minute."},429);
    }
    if (p==="/api/auth/login" && req.method==="POST") {
      const input=await readJson(req);
      if (input.email!=="demo@cortex.example" || input.password!=="CortexDemo123!") return json({error:"Incorrect demo credentials."},401);
      return json({session:{access_token:"shared-demo",refresh_token:"shared-demo"}});
    }
    if (p==="/api/data/catalog") { const rows=await env.DB.prepare("SELECT kind,payload FROM catalog_items WHERE kind != 'resources'").all();const data={universities:[],colleges:[],majors:[],yearLevels:[],courses:[]};for(const row of rows.results) data[row.kind].push(JSON.parse(row.payload));return json(data); }
    if (p==="/api/data/courses/sample-course") { const c=await env.DB.prepare("SELECT payload FROM catalog_items WHERE id=?").bind("sample-course").first();const r=await env.DB.prepare("SELECT payload FROM catalog_items WHERE kind=?").bind("resources").all();return json({course:JSON.parse(c.payload),resources:r.results.map(x=>JSON.parse(x.payload)),doctors:[],doctorAssignments:[]}); }
    if(req.headers.get("Authorization")!=="Bearer shared-demo") return json({error:"Sign in to the shared demo first."},401);
    if(p==="/api/notes" && req.method==="POST") await env.DB.prepare("DELETE FROM notes WHERE expires_at IS NOT NULL AND expires_at <= ?").bind(nowSeconds).run();
    if(p==="/api/profile/me") return json({profile});
    if(p==="/api/notes/dashboard" && req.method==="GET") { const rows=await env.DB.prepare("SELECT * FROM notes WHERE archived_at IS NULL AND (expires_at IS NULL OR expires_at > ?) ORDER BY updated_at DESC LIMIT 100").bind(nowSeconds).all();return json({notes:rows.results.map(normal),sharedNotes:[],folders:[],tags:[]}); }
    if(p==="/api/notes/archived" && req.method==="GET") { const rows=await env.DB.prepare("SELECT * FROM notes WHERE archived_at IS NOT NULL AND (expires_at IS NULL OR expires_at > ?) ORDER BY updated_at DESC LIMIT 100").bind(nowSeconds).all();return json({notes:rows.results.map(normal),folders:[]}); }
    if(p==="/api/notes" && req.method==="POST") { const body=await readJson(req); if(body.title!==undefined && (typeof body.title!=="string" || body.title.length>200)) return json({error:"Invalid note title."},400); const title=body.title||"Untitled note";const id=crypto.randomUUID(),now=new Date().toISOString();const content=JSON.stringify([{type:"p",children:[{text:""}]}]);const inserted=await env.DB.prepare("INSERT INTO notes(id,title,content,content_text,created_at,updated_at,expires_at) SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM notes WHERE expires_at IS NULL OR expires_at > ?)<100 RETURNING id").bind(id,title,content,"",now,now,nowSeconds+3600,nowSeconds).first(); if(!inserted) return json({error:"The shared demo has reached its note limit."},429);return json({id,title,folder_id:null,workspace_id:null,created_at:now,updated_at:now},201); }
    const m=p.match(/^\/api\/notes\/([^/]+)(?:\/(shares|restore|forever))?$/);
    if(m){ const id=m[1],action=m[2]; if(id==="intro" && req.method!=="GET") return json({error:"The sample note is read-only. Create a note to edit."},403); if(action==="shares" && req.method==="GET") return json([]); const row=await env.DB.prepare("SELECT * FROM notes WHERE id=? AND (expires_at IS NULL OR expires_at > ?)").bind(id,nowSeconds).first();if(!row)return json({error:"Note not found."},404);
      if(!action && req.method==="GET") return json({note:normal(row),folders:[],tags:[],noteTags:[]});
      if(!action && req.method==="PUT") {const b=await readJson(req); if(b.title!==undefined && (typeof b.title!=="string" || b.title.length>200)) return json({error:"Invalid note title."},400); if(b.contentText!==undefined && (typeof b.contentText!=="string" || b.contentText.length>100000)) return json({error:"Invalid note text."},400); if(b.content!==undefined && !validateContent(b.content)) return json({error:"Invalid note content."},400); const content=JSON.stringify(b.content??JSON.parse(row.content)); if(content.length>100000)return json({error:"Note is too large."},413);const title=b.title??row.title; const text=b.contentText??row.content_text;await env.DB.prepare("UPDATE notes SET title=?,content=?,content_text=?,updated_at=? WHERE id=?").bind(title,content,text,new Date().toISOString(),id).run();return json({success:true});}
      if(!action && req.method==="DELETE") {await env.DB.prepare("UPDATE notes SET archived_at=?,updated_at=? WHERE id=?").bind(new Date().toISOString(),new Date().toISOString(),id).run();return json({success:true});}
      if(action==="restore" && req.method==="POST") {await env.DB.prepare("UPDATE notes SET archived_at=NULL,updated_at=? WHERE id=?").bind(new Date().toISOString(),id).run();return json({success:true});}
      if(action==="forever" && req.method==="DELETE") {await env.DB.prepare("DELETE FROM notes WHERE id=?").bind(id).run();return json({success:true});}
    }
    return json({error:"This feature is not available in the shared demo."},501);
  } catch(e) { if(e instanceof RequestError) return json({error:e.message},e.status);console.error("demo_api_error",e?.message);return json({error:"The demo request failed."},500); }
}};
