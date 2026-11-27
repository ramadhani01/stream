// Velvet: satu file. Pages: simpan sebagai functions/_middleware.js. Worker: simpan sebagai worker.js.
// Butuh: binding KV bernama VIDEOS dan secret ADMIN_PASSWORD.
const INDEX = "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title>Velvet</title>\n<style>\n:root{--bg:#f6f7fb;--surface:#fff;--text:#12141c;--muted:#5b6275;--line:#e3e6ef;--accent:#6d4aff;--accent2:#ff4a8d}\n@media (prefers-color-scheme:dark){:root{--bg:#0d0f16;--surface:#171a24;--text:#f1f3fa;--muted:#9aa2b8;--line:#272b3a}}\n*{box-sizing:border-box}\nbody{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}\n.wrap{max-width:1100px;margin:0 auto;padding:0 16px}\nheader{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line)}\nheader .wrap{display:flex;align-items:center;justify-content:space-between;height:60px}\n.logo{font-weight:800;font-size:20px;letter-spacing:-.02em}\n#nm{background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}\n.age{font-style:normal;font-size:12px;font-weight:700;border:1.5px solid var(--accent2);color:var(--accent2);border-radius:6px;padding:1px 6px;vertical-align:middle;margin-left:4px}\nnav a{color:var(--muted);text-decoration:none;margin-left:16px;font-size:14px}\n.btn{display:inline-block;border:0;border-radius:10px;padding:11px 18px;font:600 15px system-ui,sans-serif;cursor:pointer;color:#fff;background:linear-gradient(90deg,var(--accent),var(--accent2));text-decoration:none}\n.btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line)}\n.hero{padding:44px 0 20px}\n.hero h1{font-size:clamp(30px,7vw,52px);line-height:1.1;margin:0 0 12px;letter-spacing:-.03em}\n.hero p{color:var(--muted);max-width:560px;margin:0 0 20px}\n.row{display:flex;gap:10px;flex-wrap:wrap}\nh2{font-size:24px;margin:30px 0 14px;letter-spacing:-.02em}\n.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px}\n.chip{flex:none;border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:999px;padding:7px 14px;font-size:14px;cursor:pointer}\n.chip[aria-pressed=\"true\"]{background:var(--accent);border-color:var(--accent);color:#fff}\n.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px}\n@media (min-width:760px){.grid{grid-template-columns:repeat(3,1fr);gap:16px}}\n.card{display:block;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;text-decoration:none;color:inherit}\n.thumb{position:relative;aspect-ratio:16/9;display:flex;align-items:flex-end;justify-content:flex-end;padding:10px;color:#fff;font-size:12px;font-weight:600}\n.ti{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n.thumb b{position:relative;z-index:1;background:rgba(0,0,0,.55);border-radius:6px;padding:2px 7px}\n.thumb b.lock{background:var(--accent2);margin-right:auto}\n.meta{padding:12px 14px 14px}\n.meta h3{margin:0 0 2px;font-size:16px}\n.meta small{color:var(--muted)}\n.adbox{margin:24px 0;text-align:center;overflow:hidden}\n.adbox::before{content:\"Iklan\";display:block;font-size:11px;color:var(--muted);margin-bottom:4px}\n.adbox img{max-width:100%;border-radius:10px}\n.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}\n.plan{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px}\n.plan.pop{border:2px solid var(--accent)}\n.plan h3{margin:0}\n.price{font-size:30px;font-weight:800;margin:8px 0}\n.price small{font-size:14px;font-weight:400;color:var(--muted)}\n.plan ul{padding-left:18px;color:var(--muted);margin:10px 0 18px}\n.plan .btn{width:100%;text-align:center}\nfooter{margin-top:48px;padding:24px 0;border-top:1px solid var(--line);color:var(--muted);font-size:13px}\n#watch{padding:18px 0 8px}\n.player{aspect-ratio:16/9;background:#000;border-radius:14px;margin:14px 0;display:flex;align-items:center;justify-content:center;color:#cfd3e0;text-align:center;padding:16px;font-size:14px;overflow:hidden}\n.player video{width:100%;height:100%}\n.player p{margin:0 0 12px}\n#watch h2{margin:8px 0 2px}\n#dsc{color:var(--muted);white-space:pre-line}\n</style>\n</head>\n<body>\n<header><div class=\"wrap\">\n<div class=\"logo\"><span id=\"nm\">Velvet</span><em class=\"age\" id=\"age\">18+</em></div>\n<nav><a href=\"#katalog\">Katalog</a><a href=\"#paket\">Paket</a></nav>\n</div></header>\n<main class=\"wrap\">\n<div id=\"home\">\n<section class=\"hero\"><h1 id=\"ht\"></h1><p id=\"hp\"></p>\n<div class=\"row\"><a class=\"btn\" href=\"#katalog\">Mulai Nonton</a><a class=\"btn ghost\" href=\"#paket\">Lihat Paket</a></div></section>\n<div class=\"adbox\" id=\"adTop\" hidden></div>\n<section id=\"katalog\"><h2>Katalog</h2>\n<div class=\"chips\" id=\"chips\"></div>\n<div class=\"grid\" id=\"grid\"></div>\n<div class=\"adbox\" id=\"adGrid\" hidden></div>\n</section>\n<section id=\"paket\"><h2>Pilih paket</h2>\n<div class=\"plans\">\n<div class=\"plan\"><h3>Gratis</h3><div class=\"price\">Rp0</div>\n<ul><li>Konten gratis</li><li>Diselingi iklan</li><li>Kualitas standar</li></ul>\n<a class=\"btn ghost\" href=\"#katalog\">Mulai gratis</a></div>\n<div class=\"plan pop\"><h3>Sewa per judul</h3><div class=\"price\"><span id=\"pr\"></span><small> /judul</small></div>\n<ul><li>Bayar hanya yang ditonton</li><li>Akses 48 jam</li><li>Tanpa iklan</li></ul>\n<button class=\"btn\" id=\"rent\">Sewa judul</button></div>\n</div></section>\n</div>\n<section id=\"watch\" hidden>\n<button class=\"btn ghost\" id=\"back\">← Kembali ke katalog</button>\n<div class=\"player\" id=\"player\"></div>\n<h2 id=\"dt\"></h2><small id=\"dm\"></small><p id=\"dsc\"></p>\n<div class=\"adbox\" id=\"adPlayer\" hidden></div>\n</section>\n</main>\n<footer><div class=\"wrap\">© <span id=\"fn\"></span>. <span id=\"ft\"></span></div></footer>\n<script src=\"https://cdn.jsdelivr.net/npm/hls.js@1.4.14/dist/hls.min.js\"></script>\n<script>\nconst $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>\"']/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[c]));\nlet V=[],S={ads:{}},cat=\"Semua\",hls=null;\nfunction ad(el,a){el.innerHTML=\"\";el.hidden=true;if(!a||!a.on)return;\nif(a.type===\"code\"){if(!a.code)return;el.appendChild(document.createRange().createContextualFragment(a.code))}\nelse{if(!a.img)return;const l=document.createElement(\"a\");if(a.link){l.href=a.link;l.target=\"_blank\";l.rel=\"noopener sponsored nofollow\"}\nconst i=document.createElement(\"img\");i.src=a.img;i.alt=a.alt||\"Iklan\";l.appendChild(i);el.appendChild(l)}\nel.hidden=false}\nfunction site(){document.title=S.name;$(\"#nm\").textContent=S.name;$(\"#fn\").textContent=S.name;$(\"#age\").hidden=!S.badge18;\n$(\"#ht\").textContent=S.heroT;$(\"#hp\").textContent=S.heroP;$(\"#ft\").textContent=S.footer;$(\"#pr\").textContent=S.price;\nad($(\"#adTop\"),S.ads.top);ad($(\"#adGrid\"),S.ads.grid)}\nfunction chips(){const cs=[\"Semua\",...new Set(V.map(v=>v.c))];\n$(\"#chips\").innerHTML=cs.map(c=>`<button class=\"chip\" aria-pressed=\"${c===cat}\" data-c=\"${esc(c)}\">${esc(c)}</button>`).join(\"\");\ndocument.querySelectorAll(\".chip\").forEach(b=>b.onclick=()=>{cat=b.dataset.c;chips();grid()})}\nfunction grid(){const L=V.filter(v=>cat===\"Semua\"||v.c===cat);\n$(\"#grid\").innerHTML=L.map(v=>`<a class=\"card\" href=\"#tonton-${esc(v.id)}\"><div class=\"thumb\" style=\"background:linear-gradient(135deg,${v.g[0]},${v.g[1]})\">${v.thumb?`<img class=\"ti\" loading=\"lazy\" src=\"${esc(v.thumb)}\" alt=\"\">`:\"\"}${v.free?\"\":'<b class=\"lock\">Sewa</b>'}${v.d?`<b>${esc(v.d)}</b>`:\"\"}</div><div class=\"meta\"><h3>${esc(v.t)}</h3><small>${esc(v.c)}</small></div></a>`).join(\"\")||\"<p>Belum ada video.</p>\"}\nfunction attach(p,v){p.innerHTML=\"\";const el=document.createElement(\"video\");el.controls=true;el.playsInline=true;if(v.thumb)el.poster=v.thumb;p.appendChild(el);\nconst url=v.src,fail=()=>{p.textContent=\"Video gagal dimuat. Coba lagi nanti.\"};\nif(/\\.m3u8(\\?|$)/i.test(url)&&!el.canPlayType(\"application/vnd.apple.mpegurl\")){\nif(window.Hls&&Hls.isSupported()){hls=new Hls();hls.loadSource(url);hls.attachMedia(el);hls.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal)fail()})}\nelse p.textContent=\"Browser ini tidak mendukung HLS.\"}\nelse{el.src=url;el.onerror=fail}}\nfunction route(){const m=/^#tonton-([\\w-]+)$/.exec(location.hash),v=m?V.find(x=>x.id===m[1]):null;\nconst old=document.querySelector(\"#player video\");if(old)old.pause();if(hls){hls.destroy();hls=null}\n$(\"#home\").hidden=!!v;$(\"#watch\").hidden=!v;\nif(!v){ad($(\"#adPlayer\"),null);const t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView();return}\nconst p=$(\"#player\");$(\"#dt\").textContent=v.t;$(\"#dm\").textContent=[v.c,v.d].filter(Boolean).join(\" · \");$(\"#dsc\").textContent=v.desc||\"\";\nif(!v.free){p.innerHTML='<div><p>Konten sewa. Pembayaran belum aktif.</p><a class=\"btn\" href=\"#paket\">Lihat harga sewa</a></div>'}\nelse if(!v.src){p.textContent=\"Video belum tersedia.\"}\nelse attach(p,v);\nad($(\"#adPlayer\"),S.ads.player);window.scrollTo(0,0)}\n$(\"#back\").onclick=()=>{location.hash=\"katalog\"};\n$(\"#rent\").onclick=()=>alert(\"Pembayaran belum aktif.\");\nwindow.addEventListener(\"hashchange\",route);\n(async()=>{try{const r=await fetch(\"/api/data\");if(r.ok){const d=await r.json();S=d.site;V=d.videos}}catch{}\nif(!S.name)S={name:\"Velvet\",heroT:\"\",heroP:\"\",footer:\"\",price:\"\",badge18:true,ads:{}};site();chips();grid();route()})();\n</script>\n</body>\n</html>\n";
const ADMIN = "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"robots\" content=\"noindex,nofollow\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title>Admin</title>\n<style>\n:root{--bg:#f6f7fb;--surface:#fff;--text:#12141c;--muted:#5b6275;--line:#e3e6ef;--accent:#6d4aff;--accent2:#ff4a8d}\n@media (prefers-color-scheme:dark){:root{--bg:#0d0f16;--surface:#171a24;--text:#f1f3fa;--muted:#9aa2b8;--line:#272b3a}}\n*{box-sizing:border-box}\nbody{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}\n.wrap{max-width:720px;margin:0 auto;padding:16px 16px 80px}\nh1{font-size:22px;margin:0 0 12px}h3{margin:0}\ninput,select,textarea{width:100%;padding:11px 12px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:inherit;font-size:16px}\ninput[type=checkbox]{width:auto}\nlabel{display:flex;gap:8px;align-items:center;font-size:14px;color:var(--muted)}\n.btn{border:0;border-radius:10px;padding:10px 16px;font:600 15px system-ui,sans-serif;cursor:pointer;color:#fff;background:linear-gradient(90deg,var(--accent),var(--accent2))}\n.btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line)}\n.box,.item{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;display:grid;gap:10px;margin-bottom:12px}\n.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.bar{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0;position:sticky;top:0;background:var(--bg);padding:8px 0;z-index:3}\n.tab[aria-pressed=\"true\"]{outline:2px solid var(--accent)}\n#msg,#lm{color:var(--muted);font-size:14px}\n.pv{width:100%;max-width:240px;aspect-ratio:16/9;object-fit:cover;border-radius:8px;background:var(--line)}\nsmall.h{color:var(--muted)}\n</style>\n</head>\n<body><div class=\"wrap\">\n<h1>Admin</h1>\n<div id=\"login\" class=\"box\" hidden>\n<input id=\"pw\" type=\"password\" placeholder=\"Password admin\" autocomplete=\"current-password\">\n<button class=\"btn\" id=\"go\">Masuk</button><small id=\"lm\"></small>\n</div>\n<div id=\"panel\" hidden>\n<div class=\"bar\"><button class=\"btn tab\" data-t=\"v\">Video</button><button class=\"btn tab\" data-t=\"a\">Iklan</button><button class=\"btn tab\" data-t=\"s\">Pengaturan</button><button class=\"btn\" id=\"save\">Simpan semua</button></div>\n<div id=\"msg\"></div>\n<div id=\"app\"></div>\n</div>\n</div>\n<script>\nconst $=s=>document.querySelector(s),esc=s=>String(s??\"\").replace(/[&<>\"']/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[c]));\nconst G=[[\"#6d4aff\",\"#2b8cff\"],[\"#ff8a4a\",\"#ff4a8d\"],[\"#12b886\",\"#2b8cff\"],[\"#3b2a8f\",\"#ff4a8d\"]];\nconst SLOTS=[[\"top\",\"Iklan atas katalog\"],[\"grid\",\"Iklan bawah katalog\"],[\"player\",\"Iklan bawah pemutar\"]];\nlet D={site:{ads:{}},videos:[]},tab=\"v\";\nasync function api(m,u,b,raw){const r=await fetch(u,{method:m,credentials:\"same-origin\",headers:raw?{\"Content-Type\":\"image/jpeg\"}:b?{\"Content-Type\":\"application/json\"}:{},body:raw?b:b?JSON.stringify(b):undefined});return{s:r.status,d:await r.json().catch(()=>({}))}}\nconst msg=t=>$(\"#msg\").textContent=t;\nfunction show(on){$(\"#login\").hidden=on;$(\"#panel\").hidden=!on}\nconst tp=v=>v.thumb===\"kv\"?`/thumb/${v.id}?v=${v.tv||0}`:v.thumb;\nfunction vid(v,i){const cats=[...new Set(D.videos.map(x=>x.c))];return`<div class=\"item\">\n<div class=\"two\"><input data-i=\"${i}\" data-k=\"t\" placeholder=\"Judul\" value=\"${esc(v.t)}\"><input data-i=\"${i}\" data-k=\"c\" list=\"cl\" placeholder=\"Kategori\" value=\"${esc(v.c)}\"></div>\n<div class=\"two\"><input data-i=\"${i}\" data-k=\"d\" placeholder=\"Durasi (mis. 24 mnt)\" value=\"${esc(v.d)}\"><select data-i=\"${i}\" data-k=\"free\" data-bool><option value=\"1\"${v.free?\" selected\":\"\"}>Gratis</option><option value=\"0\"${v.free?\"\":\" selected\"}>Sewa</option></select></div>\n<textarea data-i=\"${i}\" data-k=\"desc\" rows=\"2\" placeholder=\"Deskripsi (opsional)\">${esc(v.desc)}</textarea>\n<input data-i=\"${i}\" data-k=\"src\" placeholder=\"Link video https (.mp4 / .m3u8)\" value=\"${esc(v.src)}\">\n<input data-i=\"${i}\" data-k=\"thumbLink\" placeholder=\"Link thumbnail https (atau unggah gambar di bawah)\" value=\"${v.thumb&&v.thumb!==\"kv\"?esc(v.thumb):\"\"}\">\n${v.thumb?`<img class=\"pv\" src=\"${esc(tp(v))}\" alt=\"\">`:\"\"}\n<div class=\"two\"><label class=\"btn ghost\" style=\"justify-content:center\">Unggah thumbnail<input type=\"file\" accept=\"image/*\" data-up=\"${i}\" hidden></label><button class=\"btn ghost\" data-nothumb=\"${i}\">Hapus thumbnail</button></div>\n<div class=\"two\"><select data-i=\"${i}\" data-k=\"pub\" data-bool><option value=\"1\"${v.pub!==false?\" selected\":\"\"}>Tayang</option><option value=\"0\"${v.pub===false?\" selected\":\"\"}>Sembunyikan</option></select>\n<div class=\"two\"><button class=\"btn ghost\" data-mv=\"${i}:-1\">↑</button><button class=\"btn ghost\" data-mv=\"${i}:1\">↓</button></div></div>\n<button class=\"btn ghost\" data-del=\"${i}\">Hapus video</button></div>`}\nfunction adbox(k,n){const a=D.site.ads[k]||(D.site.ads[k]={on:false,type:\"banner\",img:\"\",link:\"\",alt:\"\",code:\"\"});return`<div class=\"box\"><h3>${n}</h3>\n<label><input type=\"checkbox\" data-a=\"${k}\" data-k=\"on\"${a.on?\" checked\":\"\"}> Aktif</label>\n<select data-a=\"${k}\" data-k=\"type\" data-redraw><option value=\"banner\"${a.type!==\"code\"?\" selected\":\"\"}>Banner (gambar + link)</option><option value=\"code\"${a.type===\"code\"?\" selected\":\"\"}>Kode iklan (AdSense dll.)</option></select>\n${a.type===\"code\"?`<textarea data-a=\"${k}\" data-k=\"code\" rows=\"5\" placeholder=\"Tempel kode iklan dari ad network\">${esc(a.code)}</textarea>`:\n`<input data-a=\"${k}\" data-k=\"img\" placeholder=\"Link gambar banner https\" value=\"${esc(a.img)}\"><input data-a=\"${k}\" data-k=\"link\" placeholder=\"Link tujuan https\" value=\"${esc(a.link)}\"><input data-a=\"${k}\" data-k=\"alt\" placeholder=\"Teks alternatif\" value=\"${esc(a.alt)}\">`}</div>`}\nfunction draw(){document.querySelectorAll(\".tab\").forEach(b=>b.setAttribute(\"aria-pressed\",b.dataset.t===tab));const s=D.site;\nif(tab===\"v\")$(\"#app\").innerHTML=`<button class=\"btn\" id=\"add\" style=\"margin-bottom:12px\">+ Video baru</button><datalist id=\"cl\">${[...new Set(D.videos.map(x=>x.c))].map(c=>`<option value=\"${esc(c)}\">`).join(\"\")}</datalist>`+(D.videos.map(vid).join(\"\")||\"<p>Belum ada video.</p>\");\nelse if(tab===\"a\")$(\"#app\").innerHTML=SLOTS.map(([k,n])=>adbox(k,n)).join(\"\")+`<small class=\"h\">Kode iklan dijalankan apa adanya di halaman penonton. Tempel hanya kode dari ad network tepercaya.</small>`;\nelse $(\"#app\").innerHTML=`<div class=\"box\"><input data-s=\"name\" placeholder=\"Nama platform\" value=\"${esc(s.name)}\"><input data-s=\"heroT\" placeholder=\"Judul utama\" value=\"${esc(s.heroT)}\"><textarea data-s=\"heroP\" rows=\"3\" placeholder=\"Deskripsi singkat\">${esc(s.heroP)}</textarea><input data-s=\"price\" placeholder=\"Harga sewa (mis. Rp15.000)\" value=\"${esc(s.price)}\"><input data-s=\"footer\" placeholder=\"Teks footer\" value=\"${esc(s.footer)}\"><label><input type=\"checkbox\" data-s=\"badge18\"${s.badge18!==false?\" checked\":\"\"}> Tampilkan lencana 18+</label><button class=\"btn ghost\" id=\"out\">Keluar</button></div>`}\nasync function load(){const r=await api(\"GET\",\"/api/admin/data\");if(r.s!==200){show(false);return}D=r.d;D.site.ads=D.site.ads||{};show(true);draw()}\n$(\"#go\").onclick=async()=>{const r=await api(\"POST\",\"/api/admin/login\",{password:$(\"#pw\").value});if(r.s!==200){$(\"#lm\").textContent=r.d.error||\"Gagal masuk\";return}$(\"#pw\").value=\"\";$(\"#lm\").textContent=\"\";load()};\n$(\"#app\").addEventListener(\"input\",e=>{const t=e.target,d=t.dataset;const val=t.type===\"checkbox\"?t.checked:d.bool!=null?t.value===\"1\":t.value;\nif(d.i!=null){const v=D.videos[d.i];if(d.k===\"thumbLink\"){v.thumb=val.trim();v.tv=0}else v[d.k]=val}else if(d.a){D.site.ads[d.a][d.k]=val;if(d.redraw!=null)draw()}else if(d.s)D.site[d.s]=val});\n$(\"#app\").addEventListener(\"click\",async e=>{const d=e.target.dataset||{};\nif(e.target.id===\"add\"){D.videos.unshift({id:crypto.randomUUID(),t:\"\",c:\"Umum\",d:\"\",desc:\"\",free:true,src:\"\",thumb:\"\",tv:0,pub:true,g:G[D.videos.length%4]});draw()}\nelse if(d.del!=null){if(confirm(\"Hapus video ini?\")){D.videos.splice(+d.del,1);draw()}}\nelse if(d.mv){const[i,s]=d.mv.split(\":\").map(Number),j=i+s;if(j>=0&&j<D.videos.length){[D.videos[i],D.videos[j]]=[D.videos[j],D.videos[i]];draw()}}\nelse if(d.nothumb!=null){D.videos[+d.nothumb].thumb=\"\";draw()}\nelse if(e.target.id===\"out\"){await api(\"DELETE\",\"/api/admin/login\");show(false)}});\n$(\"#app\").addEventListener(\"change\",async e=>{const i=e.target.dataset.up;if(i==null||!e.target.files[0])return;\nmsg(\"Memproses gambar...\");const img=new Image();img.src=URL.createObjectURL(e.target.files[0]);\ntry{await img.decode()}catch{msg(\"Gambar tidak bisa dibaca.\");return}\nconst c=document.createElement(\"canvas\");c.width=640;c.height=360;const x=c.getContext(\"2d\");\nconst k=Math.max(640/img.width,360/img.height),w=img.width*k,h=img.height*k;x.drawImage(img,(640-w)/2,(360-h)/2,w,h);\nconst b=await new Promise(r=>c.toBlob(r,\"image/jpeg\",.82));const v=D.videos[+i];\nconst r=await api(\"PUT\",\"/api/admin/thumb/\"+v.id,b,true);\nif(r.s===200){v.thumb=\"kv\";v.tv=Date.now();draw();msg(\"Thumbnail terunggah. Tekan Simpan semua.\")}else msg(r.d.error||\"Gagal mengunggah thumbnail\")});\ndocument.querySelectorAll(\".tab\").forEach(b=>b.onclick=()=>{tab=b.dataset.t;draw()});\n$(\"#save\").onclick=async()=>{const r=await api(\"PUT\",\"/api/admin/data\",D);\nif(r.s===200){D=r.d;draw();msg(\"Tersimpan. Perubahan bisa butuh sampai sekitar semenit tampil di situs.\")}else if(r.s===401){show(false)}else msg(r.d.error||\"Gagal menyimpan\")};\nload();\n</script>\n</body>\n</html>\n";

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
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });
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
const url = (v) => { const s = str(v, 2000); return s === "" || /^https:\/\/\S+$/.test(s) ? s : null; };
const SLOTS = ["top", "grid", "player"];
const GRAD = ["#6d4aff", "#2b8cff"];

function cleanAd(a) {
  a = a && typeof a === "object" ? a : {};
  const img = url(a.img), link = url(a.link);
  if (img === null || link === null) return null;
  return { on: a.on === true, type: a.type === "code" ? "code" : "banner", img, link, alt: str(a.alt, 100), code: typeof a.code === "string" ? a.code.slice(0, 5000) : "" };
}
function cleanSite(s) {
  s = s && typeof s === "object" ? s : {};
  const ads = {};
  for (const k of SLOTS) { const a = cleanAd(s.ads && s.ads[k]); if (!a) return null; ads[k] = a; }
  return {
    name: str(s.name, 30) || "Velvet", heroT: str(s.heroT, 100), heroP: str(s.heroP, 300), footer: str(s.footer, 200),
    price: str(s.price, 30) || "Rp15.000", badge18: s.badge18 !== false, ads,
  };
}
function cleanVideos(list) {
  if (!Array.isArray(list) || list.length > 500) return null;
  const out = [], seen = new Set();
  for (const v of list) {
    if (!v || typeof v !== "object") return null;
    const t = str(v.t, 120), src = url(v.src), thumb = v.thumb === "kv" ? "kv" : url(v.thumb);
    if (!t || src === null || thumb === null) return null;
    let id = /^[\w-]{1,40}$/.test(v.id || "") ? v.id : crypto.randomUUID();
    if (seen.has(id)) id = crypto.randomUUID();
    seen.add(id);
    const g = Array.isArray(v.g) && v.g.length === 2 && v.g.every((x) => /^#[0-9a-fA-F]{6}$/.test(x)) ? v.g : GRAD;
    out.push({ id, t, c: str(v.c, 40) || "Umum", d: str(v.d, 20), desc: str(v.desc, 500), free: v.free === true, src, thumb, tv: Number.isFinite(v.tv) ? v.tv : 0, pub: v.pub !== false, g });
  }
  return out;
}
async function readAll(env) {
  const site = cleanSite(await env.VIDEOS.get("site", "json")) || cleanSite({});
  const raw = (await env.VIDEOS.get("catalog", "json")) || [];
  const videos = raw.map((v) => ({ ...v, id: v.id, thumb: v.thumb || "", desc: v.desc || "", tv: v.tv || 0, pub: v.pub !== false, g: v.g || GRAD, d: v.d === "—" ? "" : v.d || "" }));
  return { site, videos };
}

export async function onRequest({ request, env }) {
  const { pathname } = new URL(request.url);
  const method = request.method;

  if (pathname === "/" && (method === "GET" || method === "HEAD")) return page(INDEX);
  if (pathname === "/admin" || pathname === "/admin/") return page(ADMIN, { "X-Robots-Tag": "noindex" });
  if ((pathname.startsWith("/api/") || pathname.startsWith("/thumb/")) && !env.VIDEOS) return json({ error: "Binding KV bernama VIDEOS belum dipasang" }, 500);

  if (pathname === "/api/data" && method === "GET") {
    const { site, videos } = await readAll(env);
    return json({
      site,
      videos: videos.filter((v) => v.pub).map((v) => ({
        id: v.id, t: v.t, c: v.c, d: v.d, desc: v.desc, free: v.free, g: v.g,
        thumb: v.thumb === "kv" ? `/thumb/${v.id}?v=${v.tv}` : v.thumb, src: v.free ? v.src : null,
      })),
    });
  }

  const tm = /^\/thumb\/([\w-]{1,40})$/.exec(pathname);
  if (tm && method === "GET") {
    const buf = await env.VIDEOS.get("thumb:" + tm[1], "arrayBuffer");
    if (!buf) return new Response("Not found", { status: 404 });
    return new Response(buf, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400" } });
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

  if (pathname.startsWith("/api/admin/")) {
    if (!(await isAdmin(request, env))) return json({ error: "unauthorized" }, 401);

    if (pathname === "/api/admin/data") {
      if (method === "GET") return json(await readAll(env));
      if (method === "PUT") {
        if (!(request.headers.get("Content-Type") || "").includes("application/json")) return json({ error: "Permintaan tidak valid" }, 415);
        let body;
        try { body = await request.json(); } catch { return json({ error: "Permintaan tidak valid" }, 400); }
        const site = cleanSite(body && body.site), videos = cleanVideos(body && body.videos);
        if (!site || !videos) return json({ error: "Data tidak valid: judul video wajib, semua link harus https" }, 400);
        const prev = (await env.VIDEOS.get("catalog", "json")) || [];
        const keep = new Set(videos.filter((v) => v.thumb === "kv").map((v) => v.id));
        for (const p of prev) if (p.thumb === "kv" && !keep.has(p.id)) await env.VIDEOS.delete("thumb:" + p.id);
        await env.VIDEOS.put("catalog", JSON.stringify(videos));
        await env.VIDEOS.put("site", JSON.stringify(site));
        return json({ site, videos });
      }
    }

    const up = /^\/api\/admin\/thumb\/([\w-]{1,40})$/.exec(pathname);
    if (up && method === "PUT") {
      const buf = await request.arrayBuffer();
      const u = new Uint8Array(buf);
      if (buf.byteLength < 100 || buf.byteLength > 500000 || !(u[0] === 0xff && u[1] === 0xd8 && u[2] === 0xff)) return json({ error: "Thumbnail harus JPEG maksimal 500 KB" }, 400);
      await env.VIDEOS.put("thumb:" + up[1], buf);
      return json({ ok: true });
    }
  }

  return new Response("Not found", { status: 404 });
}
