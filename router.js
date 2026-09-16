/* ============================================================
   ROUTER + INTERACTION WIRING
   ============================================================ */

let SIGNED_IN = false;
let WA_ACTIVE = 1;

const ROUTES = {
  "#/":           viewHome,
  "#/services":   viewServices,
  "#/fleet":      viewFleet,
  "#/quote":      viewQuote,
  "#/track":      viewTrack,
  "#/book":       viewBook,
  "#/contact":    viewContact
};
const ADMIN_ROUTES = {
  "#/admin/overview":  viewOverview,
  "#/admin/bookings":  viewBookings,
  "#/admin/dispatch":  viewDispatch,
  "#/admin/shipments": viewShipments,
  "#/admin/fleet":     viewFleetAdmin,
  "#/admin/drivers":   viewDrivers,
  "#/admin/workshop":  viewWorkshop,
  "#/admin/customers": viewCustomers,
  "#/admin/catalogue": viewCatalogue,
  "#/admin/invoices":  viewInvoices,
  "#/admin/whatsapp":  () => viewWhatsApp(WA_ACTIVE),
  "#/admin/reports":   viewReports,
  "#/admin/settings":  viewSettings
};

/* ---------- theme ---------- */
function applyTheme(t){
  if(t) document.documentElement.setAttribute("data-theme", t);
  else  document.documentElement.removeAttribute("data-theme");
  try{ localStorage.setItem("morizo.theme", t||""); }catch(e){}
}
function initTheme(){
  let t=""; try{ t = localStorage.getItem("morizo.theme")||""; }catch(e){}
  if(t) applyTheme(t);
}
function toggleTheme(){
  const cur = document.documentElement.getAttribute("data-theme");
  const dark = cur ? cur==="dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(dark ? "light" : "dark");
}

/* ---------- render ---------- */
function render(){
  let hash = location.hash || "#/";
  const base = hash.split("?")[0];
  STORE = load();

  if(base.startsWith("#/admin")){
    if(!SIGNED_IN){ app().innerHTML = viewLogin(); wireLogin(); return; }
    const fn = ADMIN_ROUTES[base] || viewOverview;
    app().innerHTML = fn();
    wireAdmin(base);
  } else {
    const fn = ROUTES[base] || viewHome;
    app().innerHTML = fn();
    wirePublic(base);
  }
  document.body.classList.remove("nav-open");
  window.scrollTo(0,0);
  const tb = document.getElementById("themeBtn");
  if(tb) tb.addEventListener("click", toggleTheme);
}

/* ---------- wiring ---------- */
function wireLogin(){
  document.getElementById("loginForm").addEventListener("submit", e=>{
    e.preventDefault(); SIGNED_IN = true;
    if(!location.hash.startsWith("#/admin/")) location.hash = "#/admin/overview";
    else render();
    toast("Signed in as "+document.getElementById("lgRole").value);
  });
  const tb=document.getElementById("themeBtn"); if(tb) tb.addEventListener("click",toggleTheme);
}

function wireMobileNav(){
  const nav   = document.getElementById("mobileNav");
  const scrim = document.getElementById("navScrim");
  const open  = document.getElementById("navToggle");
  const close = document.getElementById("navClose");
  if(!nav || !scrim || !open) return;

  let hideTimer = null;
  const setOpen = on => {
    if(on){
      clearTimeout(hideTimer);
      nav.classList.add("mounted");
      requestAnimationFrame(()=>nav.classList.add("open"));
    } else {
      nav.classList.remove("open");
      hideTimer = setTimeout(()=>nav.classList.remove("mounted"), 280);
    }
    scrim.classList.toggle("open", on);
    document.body.classList.toggle("nav-open", on);
    open.setAttribute("aria-expanded", on ? "true" : "false");
    nav.setAttribute("aria-hidden", on ? "false" : "true");
    open.setAttribute("aria-label", on ? "Close menu" : "Open menu");
    if(on){ const first = nav.querySelector(".mnav-link"); if(first) first.focus(); }
    else { open.focus(); }
  };

  open.addEventListener("click", ()=>setOpen(!nav.classList.contains("open")));
  scrim.addEventListener("click", ()=>setOpen(false));
  if(close) close.addEventListener("click", ()=>setOpen(false));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>setOpen(false)));
  document.addEventListener("keydown", e=>{
    if(e.key === "Escape" && nav.classList.contains("open")) setOpen(false);
  });
}


/* ============================================================
   CINEMATICS — runs on public pages only.
   Adds .motion to <html> so the CSS entrance/reveal rules apply.
   Without JS, or with reduced motion, nothing is hidden.
   ============================================================ */
const REDUCED = () => {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  catch(e){ return false; }
};

function countUp(el){
  const raw = el.textContent.trim();
  const m = raw.match(/^(\d+)(\D*)$/);           // 104, 93%  — not 36+1 or 24/7
  if(!m) return;
  const target = Number(m[1]), suffix = m[2];
  if(target < 2) return;
  const dur = 1100, start = performance.now();
  el.textContent = "0" + suffix;
  const tick = now => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if(t < 1) requestAnimationFrame(tick);
    else el.textContent = raw;
  };
  requestAnimationFrame(tick);
}

function cinematics(){
  const root = document.documentElement;
  if(REDUCED()){ root.classList.remove("motion"); return; }
  root.classList.add("motion");

  /* stagger everything worth revealing */
  const SELECTORS = [".sec-head", ".div-card", ".fleet-card", ".panel",
                     ".tablewrap", ".flyer-band", ".cta-band", ".svc-block", ".track-line"];
  const items = [];
  SELECTORS.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if(el.closest(".hero") || el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      items.push(el);
    });
  });
  /* delay is per position within its own row, so cards cascade */
  items.forEach(el => {
    const sibs = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains("reveal")) : [];
    const i = Math.max(0, sibs.indexOf(el));
    el.style.setProperty("--d", Math.min(i, 6) * 70 + "ms");
  });

  const show = el => el.classList.add("in");

  if(!("IntersectionObserver" in window)){ items.forEach(show); return; }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if(e.isIntersecting){ show(e.target); obs.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

  items.forEach(el => {
    /* anything already on screen reveals immediately — the first frame is never blank */
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight * 0.96) show(el); else io.observe(el);
  });

  /* safety net: nothing stays hidden, whatever the observer does */
  setTimeout(() => items.forEach(show), 1800);

  document.querySelectorAll(".hero-stats div b").forEach(countUp);
}

function wirePublic(base){
  wireMobileNav();
  cinematics();
  if(base==="#/quote") wireQuote();
  if(base==="#/track") wireTrack();
  if(base==="#/book")  wireBook();
  if(base==="#/services"){
    const bar=document.getElementById("svcFilter");
    bar.addEventListener("click", e=>{
      const b=e.target.closest(".chip"); if(!b) return;
      bar.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on", c===b));
      const f=b.dataset.f;
      document.querySelectorAll("#svcBody tbody tr").forEach(tr=>{
        tr.hidden = !(f==="all" || tr.dataset.st===f);
      });
      document.querySelectorAll(".svc-block").forEach(bl=>{
        bl.hidden = !bl.querySelector("tbody tr:not([hidden])");
      });
    });
  }
}

function signOut(){
  SIGNED_IN = false;
  WA_ACTIVE = 1;
  if(location.hash === "#/") render();
  else location.hash = "#/";
  toast("Signed out");
}

function wireAdmin(base){
  document.documentElement.classList.remove("motion");
  document.querySelectorAll("[data-logout]").forEach(b=>b.addEventListener("click", signOut));

  const burger=document.getElementById("burger"), rail=document.getElementById("rail");
  if(burger) burger.addEventListener("click", ()=>{
    rail.classList.add("open");
    const sc=document.createElement("div"); sc.className="scrim";
    sc.addEventListener("click",()=>{ rail.classList.remove("open"); sc.remove(); });
    document.body.appendChild(sc);
  });

  const search=document.getElementById("admSearch");
  if(search) search.addEventListener("input", e=>{
    const q=e.target.value.toLowerCase().trim();
    document.querySelectorAll(".admin-body tbody tr").forEach(tr=>{
      tr.hidden = q && !tr.textContent.toLowerCase().includes(q);
    });
  });

  if(base==="#/admin/bookings"){
    const bar=document.getElementById("bkFilter");
    bar.addEventListener("click", e=>{
      const b=e.target.closest(".chip"); if(!b) return;
      bar.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));
      const f=b.dataset.f;
      document.querySelectorAll("#bkTable tbody tr").forEach(tr=>{
        tr.hidden = !(f==="all" || tr.dataset.st===f);
      });
    });
    const exp=document.getElementById("expCsv");
    if(exp) exp.addEventListener("click", ()=>toast("CSV queued — it will reach ops@morizologistics.ng"));
  }

  if(base==="#/admin/catalogue"){
    const bar=document.getElementById("catFilter");
    bar.addEventListener("click", e=>{
      const b=e.target.closest(".chip"); if(!b) return;
      bar.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));
      const f=b.dataset.f;
      document.querySelectorAll("#catTable tbody tr").forEach(tr=>{
        tr.hidden = !(f==="all" || tr.dataset.div===f);
      });
    });
  }

  if(base==="#/admin/dispatch"){
    let dragged=null;
    document.querySelectorAll(".kcard").forEach(c=>{
      c.addEventListener("dragstart", ()=>{ dragged=c; c.style.opacity=".45"; });
      c.addEventListener("dragend",   ()=>{ if(dragged) dragged.style.opacity=""; dragged=null; });
    });
    document.querySelectorAll(".kcol").forEach(col=>{
      col.addEventListener("dragover", e=>e.preventDefault());
      col.addEventListener("drop", e=>{
        e.preventDefault(); if(!dragged) return;
        col.appendChild(dragged);
        const b = BOOKINGS.find(x=>x.id===dragged.dataset.id);
        if(b){ b.status = col.dataset.col; toast(b.id+" → "+b.status); }
        document.querySelectorAll(".kcol").forEach(c=>{
          c.querySelector("h4 span:last-child").textContent = c.querySelectorAll(".kcard").length;
        });
      });
    });
  }

  if(base==="#/admin/whatsapp"){
    document.querySelectorAll(".wa-item").forEach(i=>i.addEventListener("click", ()=>{
      WA_ACTIVE = Number(i.dataset.th);
      const t = WA_THREADS.find(x=>x.id===WA_ACTIVE); if(t) t.unread = 0;
      render();
    }));
    const f=document.getElementById("waForm");
    if(f) f.addEventListener("submit", e=>{
      e.preventDefault();
      const inp=document.getElementById("waMsg"), v=inp.value.trim(); if(!v) return;
      const t=WA_THREADS.find(x=>x.id===WA_ACTIVE);
      t.msgs.push({d:"out", t:new Date().toTimeString().slice(0,5), x:v});
      t.last=new Date().toTimeString().slice(0,5);
      render();
    });
    const qr=document.getElementById("qr");
    if(qr) qr.addEventListener("click", e=>{
      const b=e.target.closest(".chip"); if(!b) return;
      const inp=document.getElementById("waMsg"); inp.value=b.dataset.q; inp.focus();
    });
  }

  if(base==="#/admin/invoices"){
    const c=document.getElementById("chase");
    if(c) c.addEventListener("click", ()=>{
      waOpen("Good day. This is Morizo Logistics. A reminder that invoice INV-2608-041 for ₦645,000 fell due on 5 September. Kindly advise on payment. Thank you.");
    });
    const n=document.getElementById("newInv");
    if(n) n.addEventListener("click", ()=>toast("Draft invoice INV-2609-016 created"));
  }

  ["addVeh","addDrv","addCust","saveSettings"].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener("click", ()=>toast(id==="saveSettings"?"Company profile saved":"Record form opened"));
  });
}

/* ---------- boot ---------- */
initTheme();
window.addEventListener("hashchange", render);
render();
