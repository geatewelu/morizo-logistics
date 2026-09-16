/* ============================================================
   MORIZO LOGISTICS — application shell, public site + admin
   ============================================================ */

const $  = (s, r=document) => r.querySelector(s);
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const app = () => document.getElementById("app");

/* ---------- WhatsApp deep links ---------- */
function waLink(msg, num){ return "https://wa.me/" + (num||BRAND.wa1) + "?text=" + encodeURIComponent(msg); }
function waOpen(msg, num){ window.open(waLink(msg,num), "_blank", "noopener"); }

/* ---------- tiny per-viewer store (leads raised on this device) ---------- */
const KEY = "morizo.v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {leads:[]}; }catch(e){ return {leads:[]}; } }
function save(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
let STORE = load();

function toast(msg){
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg; document.body.appendChild(t);
  setTimeout(()=>t.remove(), 3200);
}

/* ---------- vehicle artwork (original silhouettes, chrome finish) ---------- */
function carSVG(kind){
  const g = `
   <defs>
     <linearGradient id="chr${kind}" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0%" stop-color="#F2F5FA"/><stop offset="38%" stop-color="#B9C3D4"/>
       <stop offset="55%" stop-color="#78849B"/><stop offset="100%" stop-color="#2C3650"/>
     </linearGradient>
     <linearGradient id="gls${kind}" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0%" stop-color="#5F7CB8"/><stop offset="100%" stop-color="#16203C"/>
     </linearGradient>
   </defs>`;
  const wheel = (cx,cy,r) => `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0B0F1C"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.58}" fill="#98A3B8"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.26}" fill="#3A4560"/>`;
  const body = {
    suv:`<path d="M34 120 C36 104 48 96 66 94 L104 92 C118 74 138 66 166 66 L218 66 C246 66 266 76 282 96 L326 106 C350 112 360 122 360 138 L360 154 C360 161 355 165 348 165 L40 165 C33 165 28 161 28 154 L28 136 C28 127 30 122 34 120 Z" fill="url(#chr${kind})"/>
       <path d="M124 96 C134 82 148 76 168 76 L216 76 C238 76 254 84 266 98 Z" fill="url(#gls${kind})"/>
       <path d="M168 76 L168 98" stroke="#0B1020" stroke-width="3" opacity=".5"/>
       <rect x="28" y="128" width="20" height="10" rx="5" fill="#FFE9A8"/>
       <rect x="342" y="126" width="18" height="9" rx="4" fill="#FF6067"/>
       <path d="M74 165 A32 32 0 0 1 138 165 Z" fill="#0B0F1C" opacity=".85"/>
       <path d="M254 165 A32 32 0 0 1 318 165 Z" fill="#0B0F1C" opacity=".85"/>
       ${wheel(106,165,29)}${wheel(286,165,29)}`,
    car:`<path d="M24 126 L44 126 C50 104 68 92 96 92 L208 92 C232 92 250 100 266 114 L330 126 C350 130 360 136 360 148 L360 158 C360 164 356 168 350 168 L32 168 C26 168 22 164 22 158 L22 138 C22 130 22 128 24 126 Z" fill="url(#chr${kind})"/>
       <path d="M100 100 L198 100 C210 100 222 106 234 118 L100 118 C92 118 88 114 88 108 C88 103 93 100 100 100 Z" fill="url(#gls${kind})"/>
       <rect x="22" y="134" width="18" height="9" rx="4" fill="#FFE9A8"/>
       <rect x="342" y="136" width="18" height="8" rx="4" fill="#FF6067"/>
       ${wheel(102,168,28)}${wheel(284,168,28)}`,
    bus:`<path d="M28 70 L318 70 C340 70 352 82 352 104 L352 158 C352 164 348 168 342 168 L34 168 C28 168 24 164 24 158 L24 84 C24 75 26 70 28 70 Z" fill="url(#chr${kind})"/>
       <rect x="44" y="84" width="256" height="40" rx="7" fill="url(#gls${kind})"/>
       <rect x="24" y="132" width="16" height="10" rx="4" fill="#FFE9A8"/>
       ${wheel(96,168,28)}${wheel(286,168,28)}`,
    truck:`<path d="M182 52 L352 52 C360 52 364 57 364 65 L364 152 C364 160 359 164 352 164 L182 164 Z" fill="url(#chr${kind})"/>
       <path d="M30 96 L90 96 C104 96 114 102 122 116 L150 116 C162 116 170 124 170 136 L170 152 C170 160 165 164 158 164 L34 164 C27 164 22 160 22 152 L22 110 C22 101 24 96 30 96 Z" fill="url(#chr${kind})"/>
       <path d="M40 104 L86 104 C94 104 100 108 106 118 L40 118 Z" fill="url(#gls${kind})"/>
       <rect x="188" y="62" width="168" height="66" rx="5" fill="#101A36" opacity=".45"/>
       ${wheel(62,164,26)}${wheel(214,164,26)}${wheel(272,164,26)}`,
    bike:`<path d="M120 112 L196 112 L214 138 L150 138 Z" fill="url(#chr${kind})"/>
       <rect x="206" y="96" width="62" height="52" rx="8" fill="#CE1420"/>
       <path d="M96 138 L128 104 L150 104" stroke="#8D98AC" stroke-width="9" fill="none" stroke-linecap="round"/>
       <path d="M150 138 L206 148" stroke="#8D98AC" stroke-width="8" fill="none" stroke-linecap="round"/>
       ${wheel(112,158,26)}${wheel(246,158,26)}`
  };
  return `<svg viewBox="0 0 384 200" role="img" aria-label="${esc(kind)} silhouette">${g}${body[kind]||body.suv}</svg>`;
}

/* ---------- chart primitives (drawn to a single scale) ---------- */
function sparkline(vals, color){
  const w=120, h=30, mx=Math.max(...vals), mn=Math.min(...vals), rg=(mx-mn)||1;
  const pt = vals.map((v,i)=>[6+i*((w-12)/(vals.length-1)), h-4-((v-mn)/rg)*(h-10)]);
  const d  = pt.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  const area = d + ` L${pt[pt.length-1][0].toFixed(1)} ${h} L${pt[0][0].toFixed(1)} ${h} Z`;
  const last = pt[pt.length-1];
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <path d="${area}" fill="${color}" opacity=".13"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="${color}"/>
  </svg>`;
}

function barChart(series){
  const W=620, H=230, padL=44, padB=30, padT=14, padR=8;
  const max = Math.ceil(Math.max(...series.map(s=>s.v))/10)*10;
  const iw = W-padL-padR, ih = H-padB-padT;
  const bw = iw/series.length;
  const ticks = [0, max/4, max/2, max*0.75, max];
  const grid = ticks.map(t=>{
    const y = padT + ih - (t/max)*ih;
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="var(--line)" stroke-width="1"/>
      <text x="${padL-8}" y="${(y+4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--text-3)">${t}</text>`;
  }).join("");
  const bars = series.map((s,i)=>{
    const bh = (s.v/max)*ih, x = padL + i*bw + bw*0.2, y = padT + ih - bh;
    const hot = i===series.length-1;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw*0.6).toFixed(1)}" height="${Math.max(bh,1).toFixed(1)}"
       rx="3" fill="${hot?"var(--red)":"var(--chrome)"}" opacity="${hot?1:.55}"><title>${esc(s.m)}: ₦${s.v}m</title></rect>
      <text x="${(padL+i*bw+bw/2).toFixed(1)}" y="${H-10}" text-anchor="middle" font-size="10" fill="var(--text-3)">${esc(s.m.split(" ")[0])}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:100%;height:auto" role="img"
    aria-label="Monthly revenue in naira millions">${grid}${bars}
    <text x="${padL}" y="11" font-size="11" fill="var(--text-3)">₦ millions</text></svg>`;
}

function donut(parts){
  const R=68, r=42, cx=82, cy=82; let a=-Math.PI/2;
  const total = parts.reduce((s,p)=>s+p.v,0);
  const arcs = parts.map(p=>{
    const sw = (p.v/total)*Math.PI*2, e=a+sw;
    const big = sw>Math.PI?1:0;
    const x1=cx+R*Math.cos(a), y1=cy+R*Math.sin(a), x2=cx+R*Math.cos(e), y2=cy+R*Math.sin(e);
    const x3=cx+r*Math.cos(e), y3=cy+r*Math.sin(e), x4=cx+r*Math.cos(a), y4=cy+r*Math.sin(a);
    a=e;
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 ${big} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} A${r} ${r} 0 ${big} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z" fill="${p.c}"><title>${esc(p.k)}: ${p.v}%</title></path>`;
  }).join("");
  return `<svg viewBox="0 0 164 164" width="164" height="164" role="img" aria-label="Revenue by division">${arcs}
    <text x="82" y="78" text-anchor="middle" font-size="20" font-weight="700" fill="var(--text)">₦38.4m</text>
    <text x="82" y="95" text-anchor="middle" font-size="10" fill="var(--text-3)">SEPTEMBER</text></svg>`;
}

/* ---------- shared bits ---------- */
const markHTML = (dark) => `<a class="mark${dark?" on-dark":""}" href="#/" aria-label="Morizo Logistics home">
  <span class="mark-top">MORIZO <span class="lg">LOGISTICS</span></span>
  <span class="mark-sub">${esc(BRAND.tagline)}</span></a>`;

const NAV = [["#/","Home"],["#/services","Services"],["#/fleet","Fleet"],["#/quote","Get a Quote"],["#/track","Track"],["#/contact","Contact"]];

function topbar(route){
  const links = NAV.map(([h_,l])=>`<a href="${h_}" class="${route===h_?"on":""}">${l}</a>`).join("");
  const mobLinks = NAV.map(([h_,l])=>`
    <a href="${h_}" class="mnav-link ${route===h_?"on":""}">
      <span>${l}</span>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </a>`).join("");

  return `<header class="topbar"><div class="wrap topbar-in">
    ${markHTML()}
    <nav class="navlinks">${links}</nav>
    <div class="topbar-cta">
      <button class="icon-btn" id="themeBtn" title="Switch theme" aria-label="Switch theme">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>
      </button>
      <a class="btn btn-red btn-sm topbar-book" href="#/book">Book Now</a>
      <a class="btn btn-ghost btn-sm topbar-staff" href="#/admin">Staff Login</a>
      <button class="icon-btn nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div></header>

  <div class="mnav-scrim" id="navScrim"></div>
  <nav class="mnav" id="mobileNav" aria-label="Main menu" aria-hidden="true">
    <div class="mnav-head">
      <span class="mnav-title">Menu</span>
      <button class="icon-btn" id="navClose" aria-label="Close menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="mnav-links">${mobLinks}</div>
    <div class="mnav-cta">
      <a class="btn btn-red btn-block" href="#/book">Book Now</a>
      <a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="${waLink("Hello Morizo Logistics 👋 I would like to make an enquiry.")}">Chat on WhatsApp</a>
      <a class="btn btn-ghost btn-block" href="#/admin">Staff Login</a>
    </div>
    <div class="mnav-foot">
      <div class="eyebrow">Call or WhatsApp</div>
      <a href="tel:+${esc(BRAND.wa1)}">${esc(BRAND.wa1d)}</a>
      <a href="tel:+${esc(BRAND.wa2)}">${esc(BRAND.wa2d)}</a>
      <p>${esc(BRAND.hours)}</p>
      <p>${esc(BRAND.addressLine)}</p>
    </div>
  </nav>`;
}

function footer(){
  return `<footer class="footer"><div class="wrap">
    <div class="footer-grid">
      <div>
        ${markHTML(true)}
        <p style="margin-top:12px;max-width:34ch;font-size:14px">Cars, trucks, dispatch and warehousing out of Abuja — one operator for the whole movement, from a WhatsApp message to a signed POD.</p>
        <p style="margin-top:12px;font-size:13px;color:#F0BE46">${esc(BRAND.status)} · Serving all 36 states + FCT</p>
      </div>
      <div><h4>Divisions</h4><ul>${DIVISIONS.map(d=>`<li><a href="#/services">${esc(d.name)}</a></li>`).join("")}</ul></div>
      <div><h4>Quick Links</h4><ul>
        <li><a href="#/quote">Instant Quote</a></li><li><a href="#/track">Track a Shipment</a></li>
        <li><a href="#/book">Make a Booking</a></li><li><a href="#/fleet">Fleet &amp; Rates</a></li>
        <li><a href="#/admin">Staff Dashboard</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li>${esc(BRAND.addressLine)}</li>
        <li style="color:#78849F">${esc(BRAND.addressNote)}</li>
        <li><a href="${waLink("Hello Morizo Logistics, I need help with a delivery.")}" target="_blank" rel="noopener">WhatsApp ${esc(BRAND.wa1d)}</a></li>
        <li><a href="${waLink("Hello Morizo Logistics, I need help with a delivery.", BRAND.wa2)}" target="_blank" rel="noopener">WhatsApp ${esc(BRAND.wa2d)}</a></li>
        <li>${esc(BRAND.hours)}</li></ul></div>
    </div>
    <div class="footer-base">
      <span>© 2026 ${esc(BRAND.name)}. All rights reserved.</span>
      <span>Abuja · Lagos · Kano · Port Harcourt · Calabar</span>
      <span class="credit">Website concept by <b>Ewelu Technology</b></span>
    </div>
  </div></footer>`;
}

const waFloat = `<a class="wa-float" href="${waLink("Hello Morizo Logistics 👋 I would like to make an enquiry.")}" target="_blank" rel="noopener">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.6.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z"/></svg>
  <span>Chat on WhatsApp</span></a>`;

const page = (route, body) => topbar(route) + body + footer() + waFloat;
