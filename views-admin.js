/* ============================================================
   ADMIN DASHBOARD VIEWS
   ============================================================ */

const ADMIN_NAV = [
  ["Operations", [
    ["#/admin/overview",  "Overview",        "grid",   null],
    ["#/admin/bookings",  "Bookings",        "clip",   () => BOOKINGS.filter(b=>b.status==="New").length + STORE.leads.length],
    ["#/admin/dispatch",  "Dispatch Board",  "board",  null],
    ["#/admin/shipments", "Live Shipments",  "route",  () => SHIPMENTS.filter(s=>s.status!=="Delivered").length]
  ]],
  ["Assets & People", [
    ["#/admin/fleet",     "Fleet",           "truck",  () => VEHICLES.length],
    ["#/admin/drivers",   "Drivers",         "user",   () => DRIVERS.length],
    ["#/admin/workshop",  "Workshop",        "wrench", () => MAINTENANCE.filter(m=>m.status!=="Completed").length]
  ]],
  ["Commercial", [
    ["#/admin/customers", "Customers",       "users",  null],
    ["#/admin/catalogue", "Catalogue",       "list",  () => SVC_COUNT],
    ["#/admin/invoices",  "Invoicing",       "naira",  () => INVOICES.filter(i=>i.status==="Overdue").length || null]
  ]],
  ["Channels & Insight", [
    ["#/admin/whatsapp",  "WhatsApp Inbox",  "chat",   () => WA_THREADS.reduce((s,t)=>s+t.unread,0)],
    ["#/admin/reports",   "Reports",         "chart",  null],
    ["#/admin/settings",  "Settings",        "cog",    null]
  ]]
];

const ICONS = {
  grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
  clip:'<path d="M9 3h6v3H9zM6 6h12v15H6z"/>',
  board:'<path d="M3 4h5v16H3zM10 4h5v10h-5zM17 4h4v13h-4z"/>',
  route:'<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a3 3 0 000-6H9a3 3 0 010-6h6"/>',
  truck:'<path d="M2 7h11v9H2zM13 10h4l4 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.6 3.2-5.5 7-5.5s7 1.9 7 5.5"/><path d="M17 8.5a3 3 0 100-5"/>',
  wrench:'<path d="M20 5a5 5 0 01-6.6 6.6L5 20l-2-2 8.4-8.4A5 5 0 0118 4z"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  naira:'<path d="M6 19V5l12 14V5"/>',
  chat:'<path d="M21 12a8 8 0 11-3.2-6.4L21 4l-1 4.2A8 8 0 0121 12z"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  cog:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'
};
const ico = k => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]||ICONS.grid}</svg>`;

/* ---------------- LOGIN ---------------- */
function viewLogin(){
  return `<div class="login-wrap">
    <form class="login-card" id="loginForm">
      <div style="text-align:center">${markHTML()}</div>
      <div>
        <h2 style="font-family:var(--ff-display);font-size:20px">Staff sign in</h2>
        <p class="small muted">Dispatch, fleet and accounts console.</p>
      </div>
      <div class="field"><label for="lgUser">Work email</label>
        <input id="lgUser" type="email" value="ops@morizologistics.ng" required></div>
      <div class="field"><label for="lgPass">Password</label>
        <input id="lgPass" type="password" value="demo1234" required></div>
      <div class="field"><label for="lgRole">Sign in as</label>
        <select id="lgRole"><option>Operations Manager</option><option>Dispatch Officer</option>
          <option>Fleet Officer</option><option>Accounts</option><option>Managing Director</option></select></div>
      <button class="btn btn-red btn-block" type="submit">Sign in</button>
      <p class="hint" style="text-align:center">Demo console — any credentials work. <a href="#/" style="color:var(--red)">Back to website</a></p>
    </form></div>`;
}

/* ---------------- SHELL ---------------- */
function adminShell(route, title, sub, body, actions){
  const nav = ADMIN_NAV.map(([grp, items]) => `
    <div class="rail-group">${esc(grp)}</div>
    ${items.map(([h_,l,i,c])=>{ const n = c?c():null;
      return `<a href="${h_}" class="${route===h_?"on":""}">${ico(i)}<span>${esc(l)}</span>${n?`<span class="ct">${n}</span>`:""}</a>`;
    }).join("")}`).join("");

  return `<div class="admin">
    <aside class="rail" id="rail">
      <div class="rail-head">${markHTML(true)}</div>
      <nav class="rail-nav">${nav}</nav>
      <div class="rail-foot">
        <div class="rail-user">
          <div class="rail-av">NA</div>
          <div><b style="color:var(--rail-text)">Ngozi Aliyu</b><br>Operations Manager</div>
        </div>
        <div class="rail-actions">
          <a href="#/">← Back to website</a>
          <button type="button" class="signout" data-logout>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
            Sign out
          </button>
        </div>
      </div>
    </aside>
    <div class="admin-main">
      <header class="admin-top">
        <button class="icon-btn burger" id="burger" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
        <div><h1>${esc(title)}</h1><div class="sub">${esc(sub)}</div></div>
        <div class="spacer"></div>
        <div class="searchbox">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input id="admSearch" placeholder="Search bookings, plates, customers">
        </div>
        ${actions||""}
        <button class="icon-btn" id="themeBtn" title="Switch theme" aria-label="Switch theme">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg></button>
        <button class="icon-btn" data-logout title="Sign out" aria-label="Sign out">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg></button>
      </header>
      <div class="admin-body">${body}</div>
    </div>
  </div>`;
}

const kpi = (lab,val,foot,spark) => `<div class="kpi">
  <div class="k-lab">${esc(lab)}</div><div class="k-val">${val}</div>
  <div class="k-foot">${foot}</div>${spark||""}</div>`;

const statusPill = s => {
  const m = {"Completed":"p-ok","Delivered":"p-ok","Paid":"p-ok","Available":"p-ok","Live":"p-ok",
    "In Transit":"p-info","Out for Delivery":"p-info","Confirmed":"p-info","On Trip":"p-info","Sent":"p-info","On Hire":"p-info",
    "New":"p-warn","Awaiting Pickup":"p-warn","Loading":"p-warn","Due Soon":"p-warn","Part-Paid":"p-warn","Scheduled":"p-warn","Resting":"p-warn",
    "Cancelled":"p-crit","Overdue":"p-crit","Workshop":"p-crit","In Workshop":"p-crit",
    "Draft":"p-mute","Upcoming":"p-mute","Partial":"p-mute"};
  return `<span class="pill ${m[s]||"p-mute"}">${esc(s)}</span>`;
};

/* ---------------- OVERVIEW ---------------- */
function viewOverview(){
  const active = BOOKINGS.filter(b=>b.status==="In Transit").length;
  const revM   = REVENUE[REVENUE.length-1].v, prev = REVENUE[REVENUE.length-2].v;
  const growth = (((revM-prev)/prev)*100).toFixed(1);
  const overdue= INVOICES.filter(i=>i.status==="Overdue").reduce((s,i)=>s+i.amount-i.paid,0);
  const avail  = VEHICLES.filter(v=>v.status==="Available").length;

  const body = `
  <div class="kpis">
    ${kpi("Revenue this month","₦"+revM+"m",`<span class="delta up">▲ ${growth}%</span> vs August`, sparkline(REVENUE.map(r=>r.v),"var(--red)"))}
    ${kpi("Jobs in transit", active, `${BOOKINGS.filter(b=>b.status==="New").length + STORE.leads.length} new awaiting allocation`, sparkline([9,12,10,14,13,17,15,active+12],"var(--info)"))}
    ${kpi("Fleet available", avail+" / "+VEHICLES.length, `${VEHICLES.filter(v=>v.status==="Workshop").length} in workshop`, sparkline([7,6,8,5,6,4,5,avail],"var(--ok)"))}
    ${kpi("Overdue receivables", N(overdue), `<span class="delta down">2 invoices past due</span>`, sparkline([2.1,3.4,2.8,4.9,5.2,6.1,7.8,9.1],"var(--crit)"))}
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>Revenue — last 12 months</h3><span class="small muted">₦ millions, net of VAT</span></div>
      ${barChart(REVENUE)}
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Revenue by division</h3></div>
      <div class="row" style="gap:18px;align-items:center">
        ${donut(REV_SPLIT)}
        <div class="mix-legend">
          ${REV_SPLIT.map(p=>`<div class="split small">
            <span><i style="width:10px;height:10px;border-radius:3px;background:${p.c};display:inline-block;margin-right:7px"></i>${esc(p.k)}</span>
            <b class="num">${p.v}%</b></div>`).join("")}
        </div>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>Today's jobs</h3><a class="btn btn-ghost btn-sm" href="#/admin/bookings">All bookings</a></div>
      <div class="tablewrap"><table>
        <thead><tr><th>Ref</th><th>Customer</th><th>Route</th><th class="num">Value</th><th>Status</th></tr></thead>
        <tbody>${BOOKINGS.slice(0,7).map(b=>`<tr>
          <td class="code">${esc(b.id)}</td><td><b>${esc(b.cust)}</b><br><span class="small muted">${esc(b.svc)}</span></td>
          <td class="small">${esc(b.route)}</td><td class="num">${N(b.amount)}</td><td>${statusPill(b.status)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Needs attention</h3></div>
      <div class="stack" style="gap:10px">
        ${[
          ["crit","2 invoices overdue", N(overdue)+" from Shoprite Jabi and Total Energies Retail", "#/admin/invoices"],
          ["crit","ABJ-771-PD in workshop", "Prado gearbox overhaul — out of service until 18 Sep", "#/admin/workshop"],
          ["warn","3 insurance renewals due", "ABJ-402-HX (22 Sep), ABJ-667-RV (28 Sep), ABJ-014-TK (18 Oct)", "#/admin/workshop"],
          ["warn","6 unread WhatsApp messages", "Convoy enquiry from Hon. Bassey Effiong is unanswered", "#/admin/whatsapp"],
          ["info","2 jobs unallocated", "Shoprite multi-drop and the Calabar convoy need a vehicle", "#/admin/dispatch"]
        ].map(a=>`<a href="${a[3]}" style="text-decoration:none">
          <div class="row" style="gap:10px;padding:11px 12px;border:1px solid var(--line);border-radius:10px;border-left:3px solid var(--${a[0]==="crit"?"crit":a[0]==="warn"?"warn":"info"})">
            <div style="flex:1"><b style="font-size:14px">${esc(a[1])}</b>
              <p class="small muted" style="margin-top:2px">${esc(a[2])}</p></div>
            <span class="muted">›</span></div></a>`).join("")}
      </div>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head"><h3>Corridor performance — month to date</h3>
      <div class="legend"><span><i style="background:var(--red)"></i>Trips</span><span><i style="background:var(--ok)"></i>On-time %</span></div></div>
    <div class="stack" style="gap:12px">
      ${LANE_PERF.map(l=>`<div>
        <div class="row small" style="justify-content:space-between"><b>${esc(l.lane)}</b>
          <span class="muted num">${l.trips} trips · ₦${l.rev}m · ${l.onTime}% on time</span></div>
        <div class="bar-track" style="margin-top:5px"><div class="bar-fill" style="width:${(l.trips/918*100).toFixed(1)}%"></div></div>
        <div class="bar-track" style="margin-top:4px;height:5px"><div class="bar-fill" style="width:${l.onTime}%;background:var(--ok)"></div></div>
      </div>`).join("")}
    </div>
  </div>`;
  return adminShell("#/admin/overview","Overview","Tuesday 16 September 2026 · Abuja operations", body,
    `<a class="btn btn-red btn-sm" href="#/admin/bookings">+ New job</a>`);
}

/* ---------------- BOOKINGS ---------------- */
function viewBookings(){
  const leads = STORE.leads.map(l=>({id:l.ref, cust:l.name+(l.co?" ("+l.co+")":""), svc:l.svc, route:l.from+" → "+l.to,
    when:l.when, amount:0, status:"New", driver:"—", veh:"—", ch:"Website", urgent:false}));
  const rows = leads.concat(BOOKINGS);
  const body = `
  <div class="kpis">
    ${kpi("New / unallocated", rows.filter(b=>b.status==="New").length, "Oldest waiting 3h 20m")}
    ${kpi("Confirmed", rows.filter(b=>b.status==="Confirmed").length, "Vehicle and driver assigned")}
    ${kpi("In transit", rows.filter(b=>b.status==="In Transit").length, "Tracked live")}
    ${kpi("Booked value today", N(rows.reduce((s,b)=>s+b.amount,0)), "Across all channels")}
  </div>
  <div class="panel">
    <div class="panel-head"><h3>All bookings</h3>
      <div class="chipbar" id="bkFilter">
        <button class="chip on" data-f="all">All</button><button class="chip" data-f="New">New</button>
        <button class="chip" data-f="Confirmed">Confirmed</button><button class="chip" data-f="In Transit">In transit</button>
        <button class="chip" data-f="Completed">Completed</button><button class="chip" data-f="Cancelled">Cancelled</button>
      </div></div>
    <div class="tablewrap"><table id="bkTable">
      <thead><tr><th>Ref</th><th>Customer</th><th>Service</th><th>Route</th><th>When</th><th>Driver / Vehicle</th>
        <th>Channel</th><th class="num">Value</th><th>Status</th></tr></thead>
      <tbody>${rows.map(b=>`<tr data-st="${esc(b.status)}" data-q="${esc((b.id+b.cust+b.route+b.svc).toLowerCase())}">
        <td class="code">${esc(b.id)}${b.urgent?' <span class="pill p-crit flat" style="margin-left:4px">Urgent</span>':""}</td>
        <td><b>${esc(b.cust)}</b></td>
        <td class="small">${esc(b.svc)}</td>
        <td class="small">${esc(b.route)}</td>
        <td class="small muted">${esc(b.when)}</td>
        <td class="small">${esc(b.driver)}<br><span class="muted">${esc(b.veh)}</span></td>
        <td><span class="pill p-mute flat">${esc(b.ch)}</span></td>
        <td class="num">${b.amount?N(b.amount):'<span class="muted">TBQ</span>'}</td>
        <td>${statusPill(b.status)}</td></tr>`).join("")}</tbody>
    </table></div>
    ${leads.length?`<p class="hint" style="margin-top:10px">${leads.length} booking${leads.length>1?"s":""} raised from the website on this device are shown at the top.</p>`:""}
  </div>`;
  return adminShell("#/admin/bookings","Bookings", rows.length+" jobs · "+rows.filter(b=>b.status==="New").length+" awaiting allocation", body,
    `<button class="btn btn-ghost btn-sm" id="expCsv">Export CSV</button>`);
}

/* ---------------- DISPATCH BOARD ---------------- */
function viewDispatch(){
  const cols = [["New","Unallocated"],["Confirmed","Allocated"],["In Transit","On the road"],["Completed","Delivered today"]];
  const body = `
  <p class="small muted">Drag is enabled for demonstration — moving a card between columns updates its status for this session.</p>
  <div class="kanban" id="kanban">
    ${cols.map(([st,label])=>{
      const items = BOOKINGS.filter(b=>b.status===st);
      return `<div class="kcol" data-col="${st}">
        <h4><span>${esc(label)}</span><span>${items.length}</span></h4>
        ${items.map(b=>`<article class="kcard ${b.urgent?"urgent":""}" draggable="true" data-id="${esc(b.id)}">
          <div class="kid">${esc(b.id)} · ${esc(b.ch)}</div>
          <div class="kroute">${esc(b.route)}</div>
          <div class="small muted">${esc(b.cust)}</div>
          <div class="small">${esc(b.svc)}</div>
          <div class="kmeta"><span>${esc(b.driver)}</span><b class="num">${b.amount?N(b.amount):"TBQ"}</b></div>
          <div class="kmeta"><span>${esc(b.veh)}</span><span>${esc(b.when)}</span></div>
        </article>`).join("") || `<p class="small muted" style="padding:8px">Nothing here.</p>`}
      </div>`;}).join("")}
  </div>
  <div class="grid-2">
    <div class="panel"><div class="panel-head"><h3>Vehicles ready to allocate</h3></div>
      <div class="tablewrap"><table><thead><tr><th>Plate</th><th>Type</th><th>Driver</th><th class="num">Fuel</th><th>Status</th></tr></thead>
      <tbody>${VEHICLES.filter(v=>v.status==="Available").map(v=>`<tr>
        <td class="code">${esc(v.plate)}</td><td>${esc(v.type)}</td><td class="small">${esc(v.driver)}</td>
        <td class="num">${v.fuel}%</td><td>${statusPill(v.status)}</td></tr>`).join("")}</tbody></table></div></div>
    <div class="panel"><div class="panel-head"><h3>Drivers on call</h3></div>
      <div class="tablewrap"><table><thead><tr><th>Driver</th><th>Licence</th><th>Base</th><th class="num">Score</th><th>Status</th></tr></thead>
      <tbody>${DRIVERS.filter(d=>d.status==="Available").map(d=>`<tr>
        <td><b>${esc(d.name)}</b></td><td class="small">${esc(d.lic)}</td><td class="small">${esc(d.base)}</td>
        <td class="num">${d.score}</td><td>${statusPill(d.status)}</td></tr>`).join("")}</tbody></table></div></div>
  </div>`;
  return adminShell("#/admin/dispatch","Dispatch Board","Allocate jobs to vehicles and drivers", body);
}

/* ---------------- SHIPMENTS ---------------- */
function viewShipments(){
  const body = `<div class="panel">
    <div class="panel-head"><h3>Live shipments</h3><span class="small muted">Positions refresh from telematics every 90 seconds</span></div>
    <div class="stack" style="gap:12px">
      ${SHIPMENTS.map(s=>`<div style="border:1px solid var(--line);border-radius:12px;padding:13px 15px">
        <div class="row" style="justify-content:space-between">
          <div><b>${esc(s.id)}</b> <span class="small muted">· ${esc(s.cust)}</span>
            <div class="small">${esc(s.from)} → ${esc(s.to)} · ${esc(s.wt)}</div></div>
          <div class="row" style="gap:10px">${statusPill(s.status)}<span class="small muted num">${esc(s.eta)}</span></div>
        </div>
        <div class="bar-track" style="margin-top:9px"><div class="bar-fill" style="width:${s.pct}%;background:${s.pct===100?"var(--ok)":"var(--red)"}"></div></div>
      </div>`).join("")}
    </div></div>`;
  return adminShell("#/admin/shipments","Live Shipments", SHIPMENTS.filter(s=>s.status!=="Delivered").length+" consignments moving now", body);
}

/* ---------------- FLEET ---------------- */
function viewFleetAdmin(){
  const body = `
  <div class="kpis">
    ${kpi("Total vehicles", VEHICLES.length, "Owned and on lease")}
    ${kpi("Utilisation", "74%", `<span class="delta up">▲ 6 pts</span> vs last month`, sparkline([61,64,59,67,70,68,72,74],"var(--gold-fill)"))}
    ${kpi("In workshop", VEHICLES.filter(v=>v.status==="Workshop").length, "1 major job open")}
    ${kpi("Avg. fuel level", Math.round(VEHICLES.reduce((s,v)=>s+v.fuel,0)/VEHICLES.length)+"%", "Across the whole fleet")}
  </div>
  <div class="panel">
    <div class="panel-head"><h3>Fleet register</h3><button class="btn btn-red btn-sm" id="addVeh">+ Add vehicle</button></div>
    <div class="tablewrap"><table><thead><tr>
      <th>Plate</th><th>Vehicle</th><th>Category</th><th>Year</th><th>Assigned driver</th>
      <th class="num">Odometer</th><th class="num">Next service</th><th class="num">Fuel</th><th>Insurance</th><th>Status</th></tr></thead>
      <tbody>${VEHICLES.map(v=>{
        const togo = v.nextSvc - v.odo;
        return `<tr><td class="code">${esc(v.plate)}</td><td><b>${esc(v.type)}</b></td><td class="small">${esc(v.cat)}</td>
        <td class="num">${v.yr}</td><td class="small">${esc(v.driver)}</td>
        <td class="num">${v.odo.toLocaleString()} km</td>
        <td class="num">${togo<2000?`<span style="color:var(--warn)">in ${togo.toLocaleString()} km</span>`:`in ${togo.toLocaleString()} km`}</td>
        <td class="num">${v.fuel}%</td>
        <td class="small">${esc(v.ins)}</td><td>${statusPill(v.status)}</td></tr>`;}).join("")}</tbody></table></div>
  </div>`;
  return adminShell("#/admin/fleet","Fleet", VEHICLES.length+" vehicles · "+VEHICLES.filter(v=>v.status==="Available").length+" available now", body);
}

/* ---------------- DRIVERS ---------------- */
function viewDrivers(){
  const body = `<div class="panel">
    <div class="panel-head"><h3>Driver register</h3><button class="btn btn-red btn-sm" id="addDrv">+ Onboard driver</button></div>
    <div class="tablewrap"><table><thead><tr><th>Driver</th><th>Licence</th><th class="num">Experience</th><th>Phone</th>
      <th>Base</th><th class="num">Trips</th><th class="num">Safety score</th><th>Status</th></tr></thead>
      <tbody>${DRIVERS.map(d=>`<tr>
        <td><b>${esc(d.name)}</b></td><td class="small">${esc(d.lic)}</td><td class="num">${d.yrs} yrs</td>
        <td class="small num">${esc(d.phone)}</td><td class="small">${esc(d.base)}</td><td class="num">${d.trips.toLocaleString()}</td>
        <td class="num"><b style="color:${d.score>=94?"var(--ok)":d.score>=88?"var(--warn)":"var(--crit)"}">${d.score}</b></td>
        <td>${statusPill(d.status)}</td></tr>`).join("")}</tbody></table></div>
    <p class="hint" style="margin-top:10px">Safety score blends telematics (speeding, harsh braking, idling), on-time rate and customer feedback. Anything below 85 triggers a retraining slot at the academy.</p>
  </div>`;
  return adminShell("#/admin/drivers","Drivers", DRIVERS.length+" drivers · "+DRIVERS.filter(d=>d.status==="Available").length+" available", body);
}

/* ---------------- WORKSHOP ---------------- */
function viewWorkshop(){
  const body = `
  <div class="kpis">
    ${kpi("Open jobs", MAINTENANCE.filter(m=>m.status!=="Completed").length, "1 vehicle off the road")}
    ${kpi("Spend this month", N(MAINTENANCE.reduce((s,m)=>s+m.cost,0)), "Parts, labour and renewals")}
    ${kpi("Renewals due ≤30 days", MAINTENANCE.filter(m=>m.status==="Due Soon").length, "Insurance and roadworthiness")}
    ${kpi("Avg. days off road", "3.4", `<span class="delta up">▼ 1.1 days</span> vs August`)}
  </div>
  <div class="panel">
    <div class="panel-head"><h3>Maintenance &amp; compliance schedule</h3></div>
    <div class="tablewrap"><table><thead><tr><th>Plate</th><th>Job</th><th>Opened</th><th>Vendor</th><th class="num">Cost</th><th>Due / target</th><th>Status</th></tr></thead>
      <tbody>${MAINTENANCE.map(m=>`<tr><td class="code">${esc(m.plate)}</td><td><b>${esc(m.job)}</b></td>
        <td class="small muted">${esc(m.opened)}</td><td class="small">${esc(m.vendor)}</td>
        <td class="num">${N(m.cost)}</td><td class="small">${esc(m.due)}</td><td>${statusPill(m.status)}</td></tr>`).join("")}</tbody></table></div>
  </div>`;
  return adminShell("#/admin/workshop","Workshop","Maintenance, renewals and off-road tracking", body);
}

/* ---------------- CUSTOMERS ---------------- */
function viewCustomers(){
  const body = `
  <div class="kpis">
    ${kpi("Active accounts", CUSTOMERS.length, "7 corporate, 3 individual")}
    ${kpi("Lifetime value", N(CUSTOMERS.reduce((s,c)=>s+c.spend,0)), "All accounts since 2021")}
    ${kpi("Top account", "Dangote Cement", N(58400000)+" lifetime")}
    ${kpi("On credit terms", CUSTOMERS.filter(c=>c.terms!=="Prepaid").length, "14 or 30-day invoicing")}
  </div>
  <div class="panel">
    <div class="panel-head"><h3>Customer accounts</h3><button class="btn btn-red btn-sm" id="addCust">+ Add account</button></div>
    <div class="tablewrap"><table><thead><tr><th>Account</th><th>Type</th><th>Since</th><th class="num">Trips</th>
      <th class="num">Lifetime spend</th><th>Payment terms</th><th>Account owner</th><th>Tier</th></tr></thead>
      <tbody>${CUSTOMERS.map(c=>`<tr><td><b>${esc(c.name)}</b></td><td class="small">${esc(c.type)}</td>
        <td class="num">${esc(c.since)}</td><td class="num">${c.trips.toLocaleString()}</td><td class="num">${N(c.spend)}</td>
        <td class="small">${esc(c.terms)}</td><td class="small">${esc(c.owner)}</td>
        <td><span class="pill ${c.tier==="Platinum"?"p-info":c.tier==="Gold"?"p-warn":c.tier==="Silver"?"p-mute":"p-mute"} flat">${esc(c.tier)}</span></td></tr>`).join("")}</tbody></table></div>
  </div>`;
  return adminShell("#/admin/customers","Customers", CUSTOMERS.length+" accounts", body);
}

/* ---------------- CATALOGUE ---------------- */
function viewCatalogue(){
  const body = `
  <div class="kpis">
    ${kpi("Total service lines", SVC_COUNT, DIVISIONS.length+" divisions")}
    ${kpi("Running now", ALL_SERVICES.filter(s=>s.status==="live").length, "Revenue-generating today")}
    ${kpi("Available on request", ALL_SERVICES.filter(s=>s.status==="ready").length, "Capability exists, sell it harder")}
    ${kpi("Growth ideas", ALL_SERVICES.filter(s=>s.status==="next").length, "Needs capex, a licence or a partner")}
  </div>
  <div class="panel">
    <div class="panel-head"><h3>Master catalogue</h3>
      <div class="chipbar" id="catFilter">
        <button class="chip on" data-f="all">All</button>
        ${DIVISIONS.map(d=>`<button class="chip" data-f="${d.id}">${esc(d.name.split(" ")[0])}</button>`).join("")}
      </div></div>
    <div class="tablewrap"><table id="catTable"><thead><tr><th>Code</th><th>Service</th><th>Division</th><th>Charged</th><th class="num">From</th><th>Status</th></tr></thead>
      <tbody>${ALL_SERVICES.map(s=>`<tr data-div="${s.divId}">
        <td class="code">${esc(s.code)}</td>
        <td><b>${esc(s.name)}</b><br><span class="small muted">${esc(s.note)}</span></td>
        <td class="small" style="color:${s.accent}">${esc(s.division)}</td>
        <td class="small muted">${esc(s.basis)}</td>
        <td class="num">${s.from?N(s.from):'<span class="muted">Quote</span>'}</td>
        <td><span class="pill ${s.status==="live"?"p-ok":s.status==="ready"?"p-info":"p-warn"}">${esc(STATUS_LABEL[s.status])}</span></td></tr>`).join("")}</tbody></table></div>
  </div>`;
  return adminShell("#/admin/catalogue","Service Catalogue", SVC_COUNT+" lines across "+DIVISIONS.length+" divisions", body);
}

/* ---------------- INVOICES ---------------- */
function viewInvoices(){
  const out = INVOICES.reduce((s,i)=>s+(i.amount-i.paid),0);
  const body = `
  <div class="kpis">
    ${kpi("Invoiced this month", N(INVOICES.reduce((s,i)=>s+i.amount,0)), "8 invoices raised")}
    ${kpi("Collected", N(INVOICES.reduce((s,i)=>s+i.paid,0)), `<span class="delta up">▲ 22%</span> vs August`)}
    ${kpi("Outstanding", N(out), "Across all terms")}
    ${kpi("Overdue", N(INVOICES.filter(i=>i.status==="Overdue").reduce((s,i)=>s+i.amount-i.paid,0)), `<span class="delta down">2 accounts</span>`)}
  </div>
  <div class="panel">
    <div class="panel-head"><h3>Invoices</h3>
      <div class="row"><button class="btn btn-ghost btn-sm" id="chase">Send WhatsApp reminders</button>
      <button class="btn btn-red btn-sm" id="newInv">+ Raise invoice</button></div></div>
    <div class="tablewrap"><table><thead><tr><th>Invoice</th><th>Customer</th><th>Issued</th><th>Due</th>
      <th class="num">Amount</th><th class="num">Paid</th><th class="num">Balance</th><th>Status</th></tr></thead>
      <tbody>${INVOICES.map(i=>`<tr><td class="code">${esc(i.no)}</td><td><b>${esc(i.cust)}</b></td>
        <td class="small muted">${esc(i.issued)}</td><td class="small muted">${esc(i.due)}</td>
        <td class="num">${N(i.amount)}</td><td class="num">${i.paid?N(i.paid):"—"}</td>
        <td class="num"><b>${N(i.amount-i.paid)}</b></td><td>${statusPill(i.status)}</td></tr>`).join("")}</tbody></table></div>
    <p class="hint" style="margin-top:10px">Payments reconcile against the company account; Paystack, Flutterwave, Moniepoint and Opay transfers post automatically with the invoice number as reference.</p>
  </div>`;
  return adminShell("#/admin/invoices","Invoicing","Receivables and collections", body);
}

/* ---------------- WHATSAPP ---------------- */
function viewWhatsApp(active){
  const t = WA_THREADS.find(x=>x.id===active) || WA_THREADS[0];
  const body = `
  <div class="kpis">
    ${kpi("Open conversations", WA_THREADS.length, "Across two business lines")}
    ${kpi("Unread", WA_THREADS.reduce((s,x)=>s+x.unread,0), "Oldest waiting 2h 14m")}
    ${kpi("Avg. first response", "6m 40s", `<span class="delta up">▼ 2m</span> vs last week`)}
    ${kpi("Chat → booking rate", "41%", "Of enquiries that quote")}
  </div>
  <div class="wa-shell">
    <div class="wa-list">${WA_THREADS.map(x=>`
      <div class="wa-item ${x.id===t.id?"on":""}" data-th="${x.id}">
        <div class="wa-av">${esc(x.name.split(" ").map(w=>w[0]).slice(0,2).join(""))}</div>
        <div style="min-width:0;flex:1">
          <div class="nm">${esc(x.name)}<span>${esc(x.last)}</span></div>
          <div class="pv">${esc(x.msgs[x.msgs.length-1].x)}</div>
          <div class="row" style="gap:5px;margin-top:4px">
            <span class="pill p-mute flat" style="font-size:10px">${esc(x.tag)}</span>
            ${x.unread?`<span class="pill p-crit flat" style="font-size:10px">${x.unread} new</span>`:""}
          </div>
        </div>
      </div>`).join("")}</div>
    <div class="wa-thread">
      <div class="wa-th-head">
        <div class="wa-av">${esc(t.name.split(" ").map(w=>w[0]).slice(0,2).join(""))}</div>
        <div><b>${esc(t.name)}</b><div class="small muted num">${esc(t.phone)}</div></div>
        <div class="spacer" style="margin-left:auto"></div>
        <a class="btn btn-ghost btn-sm" href="#/admin/bookings">Create booking</a>
        <a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink("Hello "+t.name.split(" ")[0]+", this is Morizo Logistics.")}">Open in WhatsApp</a>
      </div>
      <div class="wa-msgs">${t.msgs.map(m=>`<div class="bub ${m.d}">${esc(m.x)}<span class="t">${esc(m.t)}</span></div>`).join("")}</div>
      <form class="wa-compose" id="waForm">
        <input id="waMsg" placeholder="Reply to ${esc(t.name)}…" autocomplete="off">
        <button class="btn btn-wa btn-sm" type="submit">Send</button>
      </form>
    </div>
  </div>
  <div class="panel">
    <div class="panel-head"><h3>Quick replies</h3><span class="small muted">Tap to copy into the composer</span></div>
    <div class="chipbar" id="qr">
      ${["Good day. Kindly share the pickup address, delivery address and what is being moved.",
         "Your quote is ready. Please confirm and we will assign a vehicle immediately.",
         "Your consignment is on the road. Tracking reference: MRZ-",
         "Delivered. The signed POD is attached. Thank you for choosing Morizo Logistics.",
         "Self-drive hire needs a valid licence, NIN, utility bill, one guarantor and a refundable caution fee.",
         "Recovery is dispatched. Please switch on your hazard lights and stay in the vehicle."]
        .map(q=>`<button class="chip" data-q="${esc(q)}">${esc(q.slice(0,42))}…</button>`).join("")}
    </div>
  </div>`;
  return adminShell("#/admin/whatsapp","WhatsApp Inbox","Both business lines in one desk", body);
}

/* ---------------- REPORTS ---------------- */
function viewReports(){
  const body = `
  <div class="grid-2">
    <div class="panel"><div class="panel-head"><h3>Revenue trend</h3><span class="small muted">₦ millions</span></div>${barChart(REVENUE)}</div>
    <div class="panel"><div class="panel-head"><h3>Division mix</h3></div>
      <div class="row" style="gap:18px;align-items:center">${donut(REV_SPLIT)}
        <div class="mix-legend">${REV_SPLIT.map(p=>`
          <div class="split small"><span><i style="width:10px;height:10px;border-radius:3px;background:${p.c};display:inline-block;margin-right:7px"></i>${esc(p.k)}</span><b class="num">${p.v}%</b></div>`).join("")}</div>
      </div></div>
  </div>
  <div class="grid-3">
    <div class="panel"><div class="panel-head"><h3>Operational KPIs</h3></div>
      <div class="stack" style="gap:11px">
        ${[["On-time delivery","93%",93,"var(--ok)"],["Fleet utilisation","74%",74,"var(--gold-fill)"],
           ["Damage-free rate","99.2%",99,"var(--ok)"],["First-attempt delivery","88%",88,"var(--info)"],
           ["Empty-running (lower is better)","21%",21,"var(--crit)"],["Driver retention (12m)","84%",84,"var(--ok)"]]
          .map(k=>`<div><div class="row small" style="justify-content:space-between"><span>${esc(k[0])}</span><b class="num">${k[1]}</b></div>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${k[2]}%;background:${k[3]}"></div></div></div>`).join("")}
      </div></div>
    <div class="panel"><div class="panel-head"><h3>Cost per kilometre</h3></div>
      <div class="stack" style="gap:9px">
        ${[["Diesel","₦218/km",58],["Driver & allowances","₦52/km",14],["Tyres & maintenance","₦46/km",12],
           ["Insurance & licensing","₦21/km",6],["Levies & checkpoints","₦19/km",5],["Overheads","₦18/km",5]]
          .map(c=>`<div class="bar-row"><span>${esc(c[0])}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${c[2]}%"></div></div>
            <b class="num" style="text-align:right">${esc(c[1])}</b></div>`).join("")}
      </div>
      <p class="hint" style="margin-top:10px">Blended across the 30T fleet on the Lagos and Kano corridors. Total ₦374/km against an average billed rate of ₦521/km.</p></div>
    <div class="panel"><div class="panel-head"><h3>Reports you can pull</h3></div>
      <div class="stack" style="gap:8px">
        ${["Daily dispatch summary","Vehicle utilisation by category","Driver safety scorecard","Corridor profitability",
           "Customer ageing / receivables","Fuel variance per trip","COD remittance reconciliation","Workshop spend by vehicle",
           "Service-line revenue (all "+SVC_COUNT+" lines)","Monthly board pack"]
          .map(r=>`<div class="row" style="justify-content:space-between;padding:8px 10px;border:1px solid var(--line);border-radius:9px">
            <span class="small">${esc(r)}</span><button class="btn btn-ghost btn-sm">Run</button></div>`).join("")}
      </div></div>
  </div>`;
  return adminShell("#/admin/reports","Reports","Month to date · September 2026", body);
}

/* ---------------- SETTINGS ---------------- */
function viewSettings(){
  const body = `
  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>Company profile</h3></div>
      <div class="form-grid">
        <div class="field" style="grid-column:1/-1"><label for="stName">Registered name</label><input id="stName" value="${esc(BRAND.name)}"></div>
        <div class="field"><label for="stRc">RC number</label><input id="stRc" placeholder="RC 1234567"></div>
        <div class="field"><label for="stTin">TIN</label><input id="stTin" placeholder="01234567-0001"></div>
        <div class="field" style="grid-column:1/-1"><label for="stAddr">Head office address</label>
          <input id="stAddr" value="Abuja, Federal Capital Territory, Nigeria" placeholder="Plot number, street, district, Abuja"></div>
        <div class="field"><label for="stWa1">WhatsApp line 1</label><input id="stWa1" value="${esc(BRAND.wa1d)}"></div>
        <div class="field"><label for="stWa2">WhatsApp line 2</label><input id="stWa2" value="${esc(BRAND.wa2d)}"></div>
        <div class="field"><label for="stEmail">Email</label><input id="stEmail" value="${esc(BRAND.email)}"></div>
        <div class="field"><label for="stHours">Opening hours</label><input id="stHours" value="${esc(BRAND.hours)}"></div>
      </div>
      <button class="btn btn-red btn-sm" style="margin-top:14px" id="saveSettings">Save profile</button>
      <p class="hint" style="margin-top:8px">The street line is a placeholder — drop in the real plot, street and district and it flows to the website footer, invoices and WhatsApp signature.</p>
    </div>
    <div class="stack">
      <div class="panel"><div class="panel-head"><h3>Pricing controls</h3></div>
        <div class="form-grid">
          <div class="field"><label for="stDiesel">Diesel benchmark (₦/litre)</label><input id="stDiesel" type="number" value="1420"></div>
          <div class="field"><label for="stVat">VAT rate (%)</label><input id="stVat" type="number" value="7.5" step="0.5"></div>
          <div class="field"><label for="stGit">GIT cover rate (%)</label><input id="stGit" type="number" value="1.5" step="0.1"></div>
          <div class="field"><label for="stPeak">Peak-season surcharge (%)</label><input id="stPeak" type="number" value="12"></div>
          <div class="field"><label for="stWait">Waiting time (₦/hour)</label><input id="stWait" type="number" value="6500"></div>
          <div class="field"><label for="stBack">Max backhaul discount (%)</label><input id="stBack" type="number" value="18"></div>
        </div></div>
      <div class="panel"><div class="panel-head"><h3>Team &amp; roles</h3></div>
        <div class="tablewrap"><table><thead><tr><th>Name</th><th>Role</th><th>Access</th></tr></thead><tbody>
          ${[["Ngozi Aliyu","Operations Manager","Full"],["Tunde Balogun","Commercial Lead","Bookings, customers, invoices"],
             ["Amaka Uche","Dispatch Officer","Bookings, dispatch, WhatsApp"],["Salisu Idris","Fleet Officer","Fleet, drivers, workshop"],
             ["Bisi Oyelaran","Accounts","Invoices, reports"],["Comrade Ewelu Otu Okoi","Managing Director","Full + settings"]]
            .map(r=>`<tr><td><b>${esc(r[0])}</b></td><td class="small">${esc(r[1])}</td><td class="small muted">${esc(r[2])}</td></tr>`).join("")}
        </tbody></table></div></div>
      <div class="panel"><div class="panel-head"><h3>Channels &amp; integrations</h3></div>
        <div class="stack" style="gap:8px">
          ${[["WhatsApp click-to-chat","Live","p-ok"],["WhatsApp Business Cloud API","Not connected","p-mute"],
             ["Paystack / Flutterwave","Live","p-ok"],["Moniepoint POS","Live","p-ok"],
             ["GPS telematics feed","Live · 11 of 12 vehicles","p-ok"],["Merchant API (e-commerce)","Beta","p-warn"],
             ["SMS fallback (Termii)","Live","p-ok"],["Email notifications","Live","p-ok"]]
            .map(r=>`<div class="row" style="justify-content:space-between;padding:8px 10px;border:1px solid var(--line);border-radius:9px">
              <span class="small">${esc(r[0])}</span><span class="pill ${r[2]}">${esc(r[1])}</span></div>`).join("")}
        </div></div>
    </div>
  </div>`;
  return adminShell("#/admin/settings","Settings","Company profile, pricing and integrations", body);
}
