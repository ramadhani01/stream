// Velour: satu file Cloudflare Worker (main di wrangler.jsonc).
// Butuh: binding KV bernama VIDEOS (dibuat otomatis oleh wrangler.jsonc) dan secret ADMIN_PASSWORD.
const INDEX = "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title>Velour 18+ – Streaming Video Dewasa</title>\n<style>\n:root{--bg:#f6f7fb;--surface:#fff;--text:#12141c;--muted:#5b6275;--line:#e3e6ef;--accent:#6d4aff;--accent2:#ff4a8d}\n@media (prefers-color-scheme:dark){:root{--bg:#0d0f16;--surface:#171a24;--text:#f1f3fa;--muted:#9aa2b8;--line:#272b3a}}\n*{box-sizing:border-box}\nbody{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}\n.wrap{max-width:1100px;margin:0 auto;padding:0 16px}\nheader{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line)}\nheader .wrap{display:flex;align-items:center;justify-content:space-between;height:60px}\n.logo{font-weight:800;font-size:20px;letter-spacing:-.02em}\n.logo span{background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}\n.age{font-style:normal;font-size:12px;font-weight:700;border:1.5px solid var(--accent2);color:var(--accent2);border-radius:6px;padding:1px 6px;vertical-align:middle;margin-left:4px}\nnav a{color:var(--muted);text-decoration:none;margin-left:16px;font-size:14px}\n.btn{display:inline-block;border:0;border-radius:10px;padding:11px 18px;font:600 15px system-ui,sans-serif;cursor:pointer;color:#fff;background:linear-gradient(90deg,var(--accent),var(--accent2));text-decoration:none}\n.btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line)}\n.hero{padding:44px 0 28px}\n.hero h1{font-size:clamp(30px,7vw,52px);line-height:1.1;margin:0 0 12px;letter-spacing:-.03em}\n.hero p{color:var(--muted);max-width:560px;margin:0 0 20px}\n.row{display:flex;gap:10px;flex-wrap:wrap}\nh2{font-size:24px;margin:36px 0 14px;letter-spacing:-.02em}\n.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px}\n.chip{flex:none;border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:999px;padding:7px 14px;font-size:14px;cursor:pointer}\n.chip[aria-pressed=\"true\"]{background:var(--accent);border-color:var(--accent);color:#fff}\n.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px}\n@media (min-width:760px){.grid{grid-template-columns:repeat(3,1fr);gap:16px}}\n.card{display:block;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;text-decoration:none;color:inherit}\n.thumb{aspect-ratio:16/9;display:flex;align-items:flex-end;justify-content:space-between;padding:10px;color:#fff;font-size:12px;font-weight:600}\n.thumb b{background:rgba(0,0,0,.55);border-radius:6px;padding:2px 7px}\n.thumb b.lock{background:var(--accent2)}\n.meta{padding:12px 14px 14px}\n.meta h3{margin:0 0 2px;font-size:16px}\n.meta small{color:var(--muted)}\n.ad{margin:28px 0;border:1px dashed var(--line);border-radius:12px;padding:18px;text-align:center;color:var(--muted);font-size:13px}\n.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}\n.plan{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px}\n.plan.pop{border:2px solid var(--accent)}\n.plan h3{margin:0}\n.price{font-size:30px;font-weight:800;margin:8px 0}\n.price small{font-size:14px;font-weight:400;color:var(--muted)}\n.plan ul{padding-left:18px;color:var(--muted);margin:10px 0 18px}\n.plan .btn{width:100%;text-align:center}\nfooter{margin-top:48px;padding:24px 0;border-top:1px solid var(--line);color:var(--muted);font-size:13px}\n#watch{padding:18px 0 8px}\n.player{aspect-ratio:16/9;background:#000;border-radius:14px;margin:14px 0;display:flex;align-items:center;justify-content:center;color:#cfd3e0;text-align:center;padding:16px;font-size:14px;overflow:hidden}\n.player video{width:100%;height:100%}\n.player p{margin:0 0 12px}\n#watch h2{margin:8px 0 2px}\n</style>\n</head>\n<body>\n<header><div class=\"wrap\">\n<div class=\"logo\">Velo<span>ur</span> <em class=\"age\">18+</em></div>\n<nav><a href=\"#katalog\">Katalog</a><a href=\"#paket\">Paket</a></nav>\n</div></header>\n\n<main class=\"wrap\">\n<div id=\"home\">\n<section class=\"hero\">\n<h1>Tontonan dewasa, khusus 18+.</h1>\n<p>Streaming video kualitas tinggi untuk usia 18 tahun ke atas. Mulai gratis dengan iklan, atau sewa per judul tanpa iklan.</p>\n<div class=\"row\"><a class=\"btn\" href=\"#katalog\">Mulai Nonton</a><a class=\"btn ghost\" href=\"#paket\">Lihat Paket</a></div>\n</section>\n<section id=\"katalog\">\n<h2>Katalog</h2>\n<div class=\"chips\" id=\"chips\"></div>\n<div class=\"grid\" id=\"grid\"></div>\n<div class=\"ad\">Slot iklan (belum terhubung ke ad network).</div>\n</section>\n<section id=\"paket\">\n<h2>Pilih paket</h2>\n<div class=\"plans\">\n<div class=\"plan\"><h3>Gratis</h3><div class=\"price\">Rp0</div>\n<ul><li>Konten gratis</li><li>Diselingi iklan</li><li>Kualitas standar</li></ul>\n<a class=\"btn ghost\" href=\"#katalog\">Mulai gratis</a></div>\n<div class=\"plan pop\"><h3>Sewa per judul</h3><div class=\"price\">Rp15.000<small> /judul (contoh)</small></div>\n<ul><li>Bayar hanya yang ditonton</li><li>Akses 48 jam</li><li>Tanpa iklan</li></ul>\n<button class=\"btn\" id=\"rent\">Sewa judul</button></div>\n</div>\n</section>\n</div>\n<section id=\"watch\" hidden>\n<button class=\"btn ghost\" id=\"back\">← Kembali ke katalog</button>\n<div class=\"player\" id=\"player\"></div>\n<h2 id=\"dt\"></h2><small id=\"dm\"></small>\n<div class=\"ad\" id=\"dad\" style=\"margin-top:18px\">Slot iklan. Tidak memotong video.</div>\n</section>\n</main>\n<footer><div class=\"wrap\">© Velour. Situs ini khusus usia 18+.</div></footer>\n\n<script src=\"https://cdn.jsdelivr.net/npm/hls.js@1.4.14/dist/hls.min.js\"></script>\n<script>\nconst $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>\"']/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[c]));\nlet CAT=[],cat=\"Semua\",hls=null;\nfunction chips(){const cs=[\"Semua\",...new Set(CAT.map(v=>v.c))];\n$(\"#chips\").innerHTML=cs.map(c=>`<button class=\"chip\" aria-pressed=\"${c===cat}\" data-c=\"${esc(c)}\">${esc(c)}</button>`).join(\"\");\ndocument.querySelectorAll(\".chip\").forEach(b=>b.onclick=()=>{cat=b.dataset.c;chips();grid()})}\nfunction grid(){const L=CAT.filter(v=>cat===\"Semua\"||v.c===cat);\n$(\"#grid\").innerHTML=L.map(v=>`<a class=\"card\" href=\"#tonton-${esc(v.id)}\"><div class=\"thumb\" style=\"background:linear-gradient(135deg,${v.g[0]},${v.g[1]})\"><b class=\"${v.free?\"\":\"lock\"}\">${v.free?\"Gratis\":\"Sewa\"}</b><b>${esc(v.d)}</b></div><div class=\"meta\"><h3>${esc(v.t)}</h3><small>${esc(v.c)}</small></div></a>`).join(\"\")||\"<p>Belum ada video.</p>\"}\nfunction attach(p,url){p.innerHTML=\"\";const el=document.createElement(\"video\");el.controls=true;el.playsInline=true;p.appendChild(el);\nconst fail=()=>{p.textContent=\"Video gagal dimuat. Coba lagi nanti.\"};\nif(/\\.m3u8(\\?|$)/i.test(url)&&!el.canPlayType(\"application/vnd.apple.mpegurl\")){\nif(window.Hls&&Hls.isSupported()){hls=new Hls();hls.loadSource(url);hls.attachMedia(el);hls.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal)fail()})}\nelse p.textContent=\"Browser ini tidak mendukung HLS.\"}\nelse{el.src=url;el.onerror=fail}}\nfunction route(){const m=/^#tonton-([\\w-]+)$/.exec(location.hash),v=m?CAT.find(x=>x.id===m[1]):null;\nconst old=document.querySelector(\"#player video\");if(old)old.pause();if(hls){hls.destroy();hls=null}\n$(\"#home\").hidden=!!v;$(\"#watch\").hidden=!v;\nif(!v){const t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView();return}\nconst p=$(\"#player\");$(\"#dt\").textContent=v.t;$(\"#dm\").textContent=v.c+\" · \"+v.d;\nif(!v.free){p.innerHTML='<div><p>Konten sewa. Pembayaran belum aktif.</p><a class=\"btn\" href=\"#paket\">Lihat harga sewa</a></div>'}\nelse if(!v.src){p.textContent=\"Video belum tersedia.\"}\nelse attach(p,v.src);\nwindow.scrollTo(0,0)}\n$(\"#back\").onclick=()=>{location.hash=\"katalog\"};\n$(\"#rent\").onclick=()=>alert(\"Pembayaran belum aktif.\");\nwindow.addEventListener(\"hashchange\",route);\n(async()=>{try{const r=await fetch(\"/api/videos\");if(r.ok)CAT=await r.json()}catch{}chips();grid();route()})();\n</script>\n</body>\n</html>\n";
const ADMIN = "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"robots\" content=\"noindex,nofollow\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title>Admin</title>\n<style>\n:root{--bg:#f6f7fb;--surface:#fff;--text:#12141c;--muted:#5b6275;--line:#e3e6ef;--accent:#6d4aff;--accent2:#ff4a8d}\n@media (prefers-color-scheme:dark){:root{--bg:#0d0f16;--surface:#171a24;--text:#f1f3fa;--muted:#9aa2b8;--line:#272b3a}}\n*{box-sizing:border-box}\nbody{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}\n.wrap{max-width:720px;margin:0 auto;padding:20px 16px 60px}\nh1{font-size:22px;margin:0 0 16px}\ninput,select{width:100%;padding:11px 12px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:inherit}\n.btn{border:0;border-radius:10px;padding:11px 18px;font:600 15px system-ui,sans-serif;cursor:pointer;color:#fff;background:linear-gradient(90deg,var(--accent),var(--accent2))}\n.btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line)}\n.box,.item{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;display:grid;gap:10px;margin-bottom:12px}\n.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.bar{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}\n#msg,#lm{color:var(--muted);font-size:14px}\n</style>\n</head>\n<body><div class=\"wrap\">\n<h1>Admin Video</h1>\n<div id=\"login\" class=\"box\" hidden>\n<input id=\"pw\" type=\"password\" placeholder=\"Password admin\" autocomplete=\"current-password\">\n<button class=\"btn\" id=\"go\">Masuk</button><small id=\"lm\"></small>\n</div>\n<div id=\"panel\" hidden>\n<div class=\"bar\"><button class=\"btn\" id=\"add\">+ Video</button><button class=\"btn\" id=\"save\">Simpan</button><button class=\"btn ghost\" id=\"out\">Keluar</button></div>\n<div id=\"msg\"></div>\n<div id=\"items\"></div>\n</div>\n</div>\n<script>\nconst $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>\"']/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[c]));\nconst G=[[\"#6d4aff\",\"#2b8cff\"],[\"#ff8a4a\",\"#ff4a8d\"],[\"#12b886\",\"#2b8cff\"],[\"#3b2a8f\",\"#ff4a8d\"]];\nlet list=[];\nasync function api(m,u,b){const r=await fetch(u,{method:m,credentials:\"same-origin\",headers:b?{\"Content-Type\":\"application/json\"}:{},body:b?JSON.stringify(b):undefined});return{s:r.status,d:await r.json().catch(()=>({}))}}\nfunction show(on){$(\"#login\").hidden=on;$(\"#panel\").hidden=!on}\nfunction draw(){$(\"#items\").innerHTML=list.map((v,i)=>`<div class=\"item\">\n<input data-i=\"${i}\" data-k=\"t\" placeholder=\"Judul\" value=\"${esc(v.t)}\">\n<div class=\"two\"><input data-i=\"${i}\" data-k=\"c\" placeholder=\"Kategori\" value=\"${esc(v.c)}\"><input data-i=\"${i}\" data-k=\"d\" placeholder=\"Durasi (mis. 24 mnt)\" value=\"${esc(v.d)}\"></div>\n<input data-i=\"${i}\" data-k=\"src\" placeholder=\"Link https (.mp4 atau .m3u8)\" value=\"${esc(v.src)}\">\n<div class=\"two\"><select data-i=\"${i}\" data-k=\"free\"><option value=\"1\"${v.free?\" selected\":\"\"}>Gratis</option><option value=\"0\"${v.free?\"\":\" selected\"}>Sewa</option></select><button class=\"btn ghost\" data-del=\"${i}\">Hapus</button></div></div>`).join(\"\")||\"<p>Belum ada video.</p>\"}\nasync function load(){const r=await api(\"GET\",\"/api/admin/videos\");if(r.s!==200){show(false);return}list=r.d;show(true);draw()}\n$(\"#go\").onclick=async()=>{const r=await api(\"POST\",\"/api/admin/login\",{password:$(\"#pw\").value});if(r.s!==200){$(\"#lm\").textContent=r.d.error||\"Gagal masuk\";return}$(\"#pw\").value=\"\";$(\"#lm\").textContent=\"\";load()};\n$(\"#items\").addEventListener(\"input\",e=>{const t=e.target,i=t.dataset.i;if(i==null)return;list[i][t.dataset.k]=t.dataset.k===\"free\"?t.value===\"1\":t.value});\n$(\"#items\").addEventListener(\"click\",e=>{const i=e.target.dataset.del;if(i==null)return;list.splice(+i,1);draw()});\n$(\"#add\").onclick=()=>{list.push({t:\"\",c:\"Umum\",d:\"—\",free:true,src:\"\",g:G[list.length%G.length]});draw();$(\"#msg\").textContent=\"Belum disimpan.\"};\n$(\"#save\").onclick=async()=>{const r=await api(\"PUT\",\"/api/admin/videos\",list);if(r.s===200){list=r.d;draw();$(\"#msg\").textContent=\"Tersimpan. Perubahan bisa butuh sampai sekitar semenit tampil di situs.\"}else if(r.s===401){show(false)}else $(\"#msg\").textContent=r.d.error||\"Gagal menyimpan\"};\n$(\"#out\").onclick=async()=>{await api(\"DELETE\",\"/api/admin/login\");list=[];show(false)};\nload();\n</script>\n</body>\n</html>\n";

const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

async function sign(secret, msg) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}

function same(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });

const page = (body, extra = {}) =>
  new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", ...extra } });

const cookie = (v, age) => `adm=${v}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;

async function passwordOk(input, env) {
  if (typeof input !== "string") return false;
  return same(await sign("cmp", input), await sign("cmp", env.ADMIN_PASSWORD));
}

async function makeSession(env) {
  const exp = Date.now() + 12 * 3600 * 1000;
  return `${exp}.${await sign(env.ADMIN_PASSWORD, "adm:" + exp)}`;
}

async function isAdmin(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const m = /(?:^|;\s*)adm=([^;]+)/.exec(request.headers.get("Cookie") || "");
  if (!m) return false;
  const [exp, sig] = m[1].split(".");
  if (!/^\d+$/.test(exp || "") || Date.now() > Number(exp)) return false;
  return same(sig || "", await sign(env.ADMIN_PASSWORD, "adm:" + exp));
}

const str = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");

function clean(list) {
  if (!Array.isArray(list) || list.length > 500) return null;
  const out = [];
  for (const v of list) {
    if (!v || typeof v !== "object") return null;
    const t = str(v.t, 120);
    const src = str(v.src, 2000);
    if (!t || (src && !/^https:\/\/\S+$/.test(src))) return null;
    const g = Array.isArray(v.g) && v.g.length === 2 && v.g.every((x) => /^#[0-9a-fA-F]{6}$/.test(x)) ? v.g : ["#6d4aff", "#2b8cff"];
    out.push({
      id: /^[\w-]{1,40}$/.test(v.id || "") ? v.id : crypto.randomUUID(),
      t, c: str(v.c, 40) || "Umum", d: str(v.d, 20) || "—", free: v.free === true, src, g,
    });
  }
  return out;
}

export async function onRequest({ request, env }) {
  const { pathname } = new URL(request.url);
  const method = request.method;

  if (pathname === "/" && (method === "GET" || method === "HEAD")) return page(INDEX);
  if (pathname === "/admin" || pathname === "/admin/") return page(ADMIN, { "X-Robots-Tag": "noindex" });

  if (pathname.startsWith("/api/") && !env.VIDEOS) return json({ error: "Binding KV bernama VIDEOS belum dipasang" }, 500);

  if (pathname === "/api/videos" && method === "GET") {
    const list = (await env.VIDEOS.get("catalog", "json")) || [];
    return json(list.map((v) => ({ id: v.id, t: v.t, c: v.c, d: v.d, free: v.free, g: v.g, src: v.free ? v.src : null })));
  }

  if (pathname === "/api/admin/login") {
    if (method === "DELETE") return json({ ok: true }, 200, { "Set-Cookie": cookie("", 0) });
    if (method === "POST") {
      if (!env.ADMIN_PASSWORD) return json({ error: "Secret ADMIN_PASSWORD belum diatur" }, 500);
      let b;
      try { b = await request.json(); } catch { return json({ error: "Permintaan tidak valid" }, 400); }
      if (!(await passwordOk(b && b.password, env))) return json({ error: "Password salah" }, 401);
      return json({ ok: true }, 200, { "Set-Cookie": cookie(await makeSession(env), 43200) });
    }
  }

  if (pathname === "/api/admin/videos") {
    if (!(await isAdmin(request, env))) return json({ error: "unauthorized" }, 401);
    if (method === "GET") return json((await env.VIDEOS.get("catalog", "json")) || []);
    if (method === "PUT") {
      if (!(request.headers.get("Content-Type") || "").includes("application/json")) return json({ error: "Permintaan tidak valid" }, 415);
      let body;
      try { body = await request.json(); } catch { return json({ error: "Permintaan tidak valid" }, 400); }
      const list = clean(body);
      if (!list) return json({ error: "Data tidak valid: judul wajib diisi dan link harus https" }, 400);
      await env.VIDEOS.put("catalog", JSON.stringify(list));
      return json(list);
    }
  }

  return new Response("Not found", { status: 404 });
}

export default { fetch: (request, env) => onRequest({ request, env }) };
