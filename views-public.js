/* ============================================================
   PUBLIC WEBSITE VIEWS
   ============================================================ */

function heroArt(){
  return `<div class="hero-art">
    <div class="open-badge">NOW<br>OPEN</div>
    <figure class="car-frame">
      <img src="car-hero.jpg" alt="Silver executive SUV from the Morizo Logistics fleet" class="hero-car">
      <figcaption>Lexus NX 300 · Executive SUV · for hire and for sale</figcaption>
    </figure>
  </div>`;
}

/* ---------------- HOME ---------------- */
function viewHome(){
  const live = ALL_SERVICES.filter(s=>s.status==="live").length;
  return page("#/", `
  <section class="hero"><div class="wrap hero-in">
    <div>
      <span class="script">${esc(BRAND.tagline)}</span>
      <h1>Move anything <em>out of Abuja.</em><br>Or into it.</h1>
      <p class="lead">Cars for sale and for hire, trucks on every corridor, bikes across the FCT, and a warehouse to hold it all. ${SVC_COUNT} service lines under one operator — and every one of them starts with a WhatsApp message.</p>
      <div class="hero-cta">
        <a class="btn btn-red" href="#/quote">Get an Instant Quote</a>
        <a class="btn btn-wa" href="${waLink("Hello Morizo Logistics 👋 I want to make a booking.")}" target="_blank" rel="noopener">Book on WhatsApp</a>
        <a class="btn btn-ghost" style="border-color:rgba(255,255,255,.28);color:#EDF1F9" href="#/track">Track a Shipment</a>
      </div>
      <div class="hero-stats">
        <div><b>${SVC_COUNT}</b><span>Service lines</span></div>
        <div><b>36+1</b><span>States covered</span></div>
        <div><b>93%</b><span>On-time rate</span></div>
        <div><b>24/7</b><span>Recovery desk</span></div>
      </div>
    </div>
    ${heroArt()}
  </div></section>

  <section class="section"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">What we run</span>
      <h2>Eight divisions. One phone number.</h2>
      <p>Most Nigerian businesses juggle a car dealer, a haulier, a dispatch rider and a clearing agent. Morizo is all four, so the handover between them stops being your problem.</p>
    </div>
    <div class="div-grid">
      ${DIVISIONS.map(d=>`
        <article class="div-card" style="--accent:${d.accent}">
          <div class="row" style="justify-content:space-between">
            <h3>${esc(d.name)}</h3>
            <span class="cnt">${d.services.length}</span>
          </div>
          <p class="small muted">${esc(d.blurb)}</p>
          <ul>${d.services.slice(0,4).map(s=>`<li>${esc(s.name)}</li>`).join("")}
            ${d.services.length>4?`<li class="muted">+ ${d.services.length-4} more</li>`:""}</ul>
          <a class="btn btn-ghost btn-sm" href="#/services" style="align-self:flex-start;margin-top:4px">See all</a>
        </article>`).join("")}
    </div>
  </div></section>

  <section class="section section-alt"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">How it works</span>
      <h2>From a chat message to a signed POD</h2></div>
    <div class="grid-3">
      ${[
        ["Tell us what's moving","Send the pickup, the drop and roughly what it is — on WhatsApp, or through the quote tool on this site. No forms, no account needed."],
        ["Get a price in minutes","A real person confirms the rate against the corridor, the weight and the vehicle class. Corporate clients get 14 or 30-day terms."],
        ["Watch it move","You get a tracking reference and a live link. Driver name, plate number, ETA — and a WhatsApp message when it lands."],
        ["Proof, then invoice","Signature and photo captured at delivery. The POD and the invoice reach you the same day."]
      ].map((s,i)=>`<div class="panel">
        <div class="eyebrow">Step ${i+1}</div>
        <h3 style="margin:6px 0 8px;font-size:18px">${esc(s[0])}</h3>
        <p class="small muted">${esc(s[1])}</p></div>`).join("")}
    </div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Fleet</span>
      <h2>Unbeatable cars — and the trucks behind them</h2>
      <p>Hire by the day, lease by the year, or buy outright. Rates below are daily self-drive; chauffeur adds ${N(20000)} a day.</p></div>
    <div class="fleet-grid">
      ${FLEET.slice(0,4).map(fleetCard).join("")}
    </div>
    <div class="row" style="margin-top:18px"><a class="btn btn-red" href="#/fleet">View the full fleet &amp; rates</a></div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="panel flyer-band">
      <img src="flyer.jpg" alt="Morizo Logistics opening flyer — Unbeatable Cars, now open" class="flyer-img">
      <div>
        <span class="eyebrow">Now open in Abuja</span>
        <h2 style="font-family:var(--ff-display);font-size:clamp(21px,2.8vw,28px);margin:8px 0 10px">The yard is open. The trucks are rolling.</h2>
        <p class="muted" style="max-width:48ch">Come and inspect any vehicle on the lot, or send us what you need moved. Both numbers on the flyer reach the same desk, and the recovery line runs through the night.</p>
        <div class="row" style="margin-top:14px">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink("Hello Morizo Logistics 👋 I saw your flyer. I would like to enquire about:")}">${esc(BRAND.wa1d)}</a>
          <a class="btn btn-ghost" href="#/fleet">See the fleet</a>
        </div>
      </div>
    </div>
  </div></section>

  <section class="section section-alt"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Who we move for</span>
      <h2>Sectors we already serve</h2></div>
    <div class="div-grid">
      ${INDUSTRIES.map(i=>`<div class="panel" style="padding:15px 16px">
        <b style="font-size:15px">${esc(i.n)}</b>
        <p class="small muted" style="margin-top:3px">${esc(i.d)}</p></div>`).join("")}
    </div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="panel cta-band">
      <div>
        <span class="eyebrow">Talk to a human</span>
        <h2 style="font-family:var(--ff-display);font-size:clamp(22px,3vw,30px);margin:8px 0 10px;color:#fff">Two WhatsApp lines. Both answered.</h2>
        <p style="color:#B6C0D8;max-width:48ch">Quotes, bookings, tracking updates and complaints all run through the same desk — ${esc(BRAND.hours)}. Recovery and towing is 24 hours.</p>
      </div>
      <div class="stack" style="gap:10px">
        <a class="btn btn-wa btn-block" href="${waLink("Hello Morizo Logistics 👋 I would like a quote.")}" target="_blank" rel="noopener">${esc(BRAND.wa1d)}</a>
        <a class="btn btn-wa btn-block" href="${waLink("Hello Morizo Logistics 👋 I would like a quote.", BRAND.wa2)}" target="_blank" rel="noopener">${esc(BRAND.wa2d)}</a>
        <a class="btn btn-ghost btn-block" style="border-color:rgba(255,255,255,.3);color:#EDF1F9" href="#/book">Use the booking form instead</a>
      </div>
    </div>
  </div></section>
  `);
}

function fleetCard(f){
  return `<article class="fleet-card">
    <div class="fleet-img">${f.img?`<img src="${esc(f.img)}" alt="${esc(f.name)}">`:carSVG(f.kind)}</div>
    <div class="fleet-body">
      <div class="row" style="justify-content:space-between">
        <h3>${esc(f.name)}</h3>
        ${f.star?`<span class="pill p-warn flat">Flagship</span>`:""}
      </div>
      <p class="small muted">${esc(f.cls)}</p>
      <div class="fleet-spec">
        <span class="spec">${f.seats} seats</span><span class="spec">${f.trans}</span>
        <span class="spec">${esc(f.fuel)}</span>${f.bags?`<span class="spec">${f.bags} bags</span>`:""}
      </div>
      <div class="fleet-price">
        <span><b>${N(f.day)}</b> <span>/ day</span></span>
        <a class="btn btn-red btn-sm" href="#/book?v=${encodeURIComponent(f.name)}">Reserve</a>
      </div>
    </div>
  </article>`;
}

/* ---------------- SERVICES ---------------- */
function viewServices(){
  const counts = {
    live: ALL_SERVICES.filter(s=>s.status==="live").length,
    ready:ALL_SERVICES.filter(s=>s.status==="ready").length,
    next: ALL_SERVICES.filter(s=>s.status==="next").length
  };
  return page("#/services", `
  <section class="section"><div class="wrap">
    <div class="sec-head" style="max-width:70ch">
      <span class="eyebrow">Master catalogue</span>
      <h2>Everything Morizo Logistics does — all ${SVC_COUNT} lines</h2>
      <p>Grouped into ${DIVISIONS.length} divisions. <b style="color:var(--ok)">${counts.live} running now</b>,
      <b style="color:var(--info)">${counts.ready} available on request</b>, and
      <b style="color:var(--gold)">${counts.next} growth ideas</b> we can switch on as demand and capex allow.
      Prices are "from" figures in Naira and move with diesel, distance and season.</p>
    </div>
    <div class="chipbar" id="svcFilter" style="margin-bottom:16px">
      <button class="chip on" data-f="all">All ${SVC_COUNT}</button>
      <button class="chip" data-f="live">Running now</button>
      <button class="chip" data-f="ready">On request</button>
      <button class="chip" data-f="next">Growth ideas</button>
    </div>
    <div id="svcBody" class="stack" style="gap:26px">${DIVISIONS.map(svcBlock).join("")}</div>
  </div></section>

  <section class="section section-alt"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Not listed?</span>
      <h2>If it has wheels or needs to be somewhere else, ask.</h2>
      <p>Odd cargo, unusual routes and one-off project moves are most of what we quote. Send the details and you will get a price the same day.</p></div>
    <div class="row">
      <a class="btn btn-wa" href="${waLink("Hello Morizo Logistics 👋 I need a service that is not on your list. Here is what I need:")}" target="_blank" rel="noopener">Ask on WhatsApp</a>
      <a class="btn btn-ghost" href="#/quote">Try the quote tool</a>
    </div>
  </div></section>`);
}

function svcBlock(d){
  return `<div class="svc-block" data-div="${d.id}">
    <div class="row" style="justify-content:space-between;align-items:flex-end;margin-bottom:10px">
      <div>
        <span class="eyebrow" style="color:${d.accent}">Division · ${d.services.length} services</span>
        <h3 style="font-family:var(--ff-display);font-size:21px;margin-top:4px">${esc(d.name)}</h3>
        <p class="small muted" style="max-width:70ch;margin-top:4px">${esc(d.blurb)}</p>
      </div>
    </div>
    <div class="tablewrap"><table>
      <thead><tr><th style="width:74px">Code</th><th>Service</th><th>Charged</th><th class="num">From</th><th>Status</th></tr></thead>
      <tbody>${d.services.map(s=>`
        <tr data-st="${s.status}">
          <td class="code">${esc(s.code)}</td>
          <td><b>${esc(s.name)}</b><br><span class="small muted">${esc(s.note)}</span></td>
          <td class="small muted">${esc(s.basis)}</td>
          <td class="num">${s.from?N(s.from):'<span class="muted">On request</span>'}</td>
          <td><span class="pill ${s.status==="live"?"p-ok":s.status==="ready"?"p-info":"p-warn"}">${esc(STATUS_LABEL[s.status])}</span></td>
        </tr>`).join("")}</tbody>
    </table></div>
  </div>`;
}

/* ---------------- FLEET ---------------- */
function viewFleet(){
  return page("#/fleet", `
  <section class="section"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Fleet &amp; rates</span>
      <h2>What you can put on the road today</h2>
      <p>Self-drive needs a valid licence, NIN and a refundable caution fee. Chauffeur service adds ${N(20000)} per day and covers 10 hours; overtime is ${N(4000)} an hour. Fuel is on the hirer unless the quote says otherwise.</p></div>
    <div class="fleet-grid">${FLEET.map(fleetCard).join("")}</div>
  </div></section>

  <section class="section section-alt"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Corridor rates</span>
      <h2>Indicative haulage pricing from Abuja</h2>
      <p>30-tonne covered body, goods-in-transit insurance included, one free day of loading and one of offloading.</p></div>
    <div class="tablewrap"><table>
      <thead><tr><th>Destination</th><th class="num">Distance</th><th class="num">30T FTL</th><th class="num">Part load / tonne</th><th class="num">Car carrier</th></tr></thead>
      <tbody>${LANES.filter(l=>l.km>40).map(l=>`
        <tr><td><b>Abuja → ${esc(l.to)}</b></td>
          <td class="num">${l.km.toLocaleString()} km</td>
          <td class="num">${N(Math.max(520000, 260000 + l.km*1850))}</td>
          <td class="num">${N(Math.max(38000, 25000 + l.km*95))}</td>
          <td class="num">${N(Math.max(180000, 95000 + l.km*340))}</td></tr>`).join("")}</tbody>
    </table></div>
    <p class="hint" style="margin-top:10px">Rates reviewed against the diesel price weekly. Return-load discounts of up to 18% apply when we have a backhaul on the same corridor.</p>
  </div></section>`);
}

/* ---------------- QUOTE ---------------- */
function viewQuote(){
  return page("#/quote", `
  <section class="section"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Instant quote</span>
      <h2>Price it yourself in about twenty seconds</h2>
      <p>This is the same engine our dispatch desk uses. It gives a firm indicative price — a human confirms it before any truck rolls.</p></div>
    <div class="grid-2">
      <div class="panel">
        <div class="form-grid">
          <div class="field" style="grid-column:1/-1">
            <label for="qMode">What are you moving it with?</label>
            <select id="qMode">${QUOTE_MODES.map(m=>`<option value="${m.id}">${esc(m.label)}</option>`).join("")}</select>
          </div>
          <div class="field"><label for="qFrom">Pickup area (FCT)</label>
            <select id="qFrom">${FCT_ZONES.map(z=>`<option>${esc(z)}</option>`).join("")}</select></div>
          <div class="field"><label for="qTo">Destination</label>
            <select id="qTo">${LANES.map(l=>`<option value="${l.km}">${esc(l.to)}</option>`).join("")}</select></div>
          <div class="field" id="wrapWeight"><label for="qWeight">Weight</label>
            <input id="qWeight" type="number" min="1" value="10"><span class="hint" id="wUnit">kilograms</span></div>
          <div class="field" id="wrapVeh" hidden><label for="qVeh">Vehicle</label>
            <select id="qVeh">${FLEET.map(f=>`<option value="${f.day}">${esc(f.name)} — ${N(f.day)}/day</option>`).join("")}</select></div>
          <div class="field" id="wrapDays" hidden><label for="qDays">Days</label>
            <input id="qDays" type="number" min="1" value="2"></div>
          <div class="field" id="wrapChauf" hidden><label for="qChauf">Chauffeur</label>
            <select id="qChauf"><option value="0">Self-drive</option><option value="20000">With chauffeur (+₦20,000/day)</option></select></div>
          <div class="field"><label for="qUrg">Service level</label>
            <select id="qUrg"><option value="1">Standard</option><option value="1.35">Express (+35%)</option><option value="1.7">Same-day critical (+70%)</option></select></div>
          <div class="field"><label for="qIns">Goods-in-transit cover</label>
            <select id="qIns"><option value="0">Not required</option><option value="0.015">Insure at 1.5% of cargo value</option></select></div>
          <div class="field" id="wrapVal" hidden style="grid-column:1/-1"><label for="qVal">Declared cargo value (₦)</label>
            <input id="qVal" type="number" min="0" value="2000000"></div>
        </div>
        <p class="hint" style="margin-top:14px">VAT at 7.5% is added on the summary. Waiting time beyond the free allowance is billed at ₦6,500 per hour.</p>
      </div>

      <div class="stack">
        <div class="quote-out">
          <div class="eyebrow" style="color:#F0BE46">Indicative total</div>
          <div class="amt" id="qAmt">₦0</div>
          <div class="quote-lines" id="qLines"></div>
          <div class="stack" style="gap:8px">
            <button class="btn btn-wa btn-block" id="qWa">Send this quote on WhatsApp</button>
            <a class="btn btn-ghost btn-block" style="border-color:rgba(255,255,255,.3);color:#EDF1F9" href="#/book">Turn it into a booking</a>
          </div>
        </div>
        <div class="panel">
          <h3 style="font-size:16px;margin-bottom:8px">What moves the price</h3>
          <ul class="small muted" style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:5px">
            <li>Diesel — corridor rates are re-based weekly against the pump price.</li>
            <li>Backhaul — if we have a return load on your lane you get up to 18% off.</li>
            <li>Season — Ember months, Sallah and Christmas carry a peak surcharge.</li>
            <li>Access — sites without a hard stand or offloading labour attract a standby fee.</li>
          </ul>
        </div>
      </div>
    </div>
  </div></section>`);
}

function wireQuote(){
  const el = id => document.getElementById(id);
  const mode=el("qMode"), to=el("qTo"), wt=el("qWeight"), urg=el("qUrg"), ins=el("qIns"), val=el("qVal");
  function calc(){
    const m = QUOTE_MODES.find(x=>x.id===mode.value);
    const km = Number(to.value)||22;
    const isHire = !!m.hire;
    el("wrapWeight").hidden = isHire;
    el("wrapVeh").hidden = !isHire; el("wrapDays").hidden = !isHire; el("wrapChauf").hidden = !isHire;
    el("wrapVal").hidden = ins.value==="0";
    const lines=[]; let sub=0;

    if(isHire){
      const day=Number(el("qVeh").value), days=Math.max(1,Number(el("qDays").value)||1), ch=Number(el("qChauf").value);
      sub = (day+ch)*days;
      lines.push(["Vehicle · "+days+" day"+(days>1?"s":""), N(day*days)]);
      if(ch) lines.push(["Chauffeur · "+days+" day"+(days>1?"s":""), N(ch*days)]);
    } else {
      const w = Math.max(1, Number(wt.value)||1);
      el("wUnit").textContent = (m.perTonne||m.id.startsWith("ftl")) ? "tonnes" : "kilograms";
      if(m.fctOnly && km>40){ lines.push(["Note","FCT-only mode — using 22 km"]); }
      const d = m.fctOnly ? Math.min(km,40) : km;
      sub += m.base||0; lines.push(["Base charge", N(m.base||0)]);
      if(m.perKm){ sub += m.perKm*d; lines.push([`Distance · ${d.toLocaleString()} km`, N(m.perKm*d)]); }
      if(m.perKg){ const bill=Math.max(0,w-(m.freeKg||0)); sub += m.perKg*bill;
        lines.push([`Weight · ${bill.toLocaleString()} kg above first ${m.freeKg||0} kg`, N(m.perKg*bill)]); }
      if(m.perTonne){ sub += m.perTonne*w; lines.push([`Tonnage · ${w} T`, N(m.perTonne*w)]); }
      if(m.min && sub<m.min){ lines.push(["Corridor minimum applied", N(m.min)]); sub=m.min; }
    }
    const u=Number(urg.value); if(u>1){ const add=sub*(u-1); lines.push(["Service level uplift", N(add)]); sub+=add; }
    const ir=Number(ins.value); if(ir>0){ const add=(Number(val.value)||0)*ir; lines.push(["Goods-in-transit cover", N(add)]); sub+=add; }
    const vat=sub*0.075; lines.push(["VAT @ 7.5%", N(vat)]);
    const total=sub+vat;

    el("qLines").innerHTML = lines.map(l=>`<div><span>${esc(l[0])}</span><b>${esc(l[1])}</b></div>`).join("");
    el("qAmt").textContent = N(total);
    el("qAmt").dataset.msg =
      `*MORIZO LOGISTICS — Quote request*\n\nService: ${m.label}\nPickup: ${el("qFrom").value}\nDestination: ${to.options[to.selectedIndex].text}\n`+
      (isHire?`Vehicle: ${el("qVeh").options[el("qVeh").selectedIndex].text}\nDays: ${el("qDays").value}\n`:`Weight: ${wt.value}\n`)+
      `Service level: ${urg.options[urg.selectedIndex].text}\n\n*Indicative total: ${N(total)}* (VAT included)\n\nPlease confirm availability.`;
  }
  ["qMode","qFrom","qTo","qWeight","qUrg","qIns","qVal","qVeh","qDays","qChauf"].forEach(id=>{
    const n=el(id); if(n){ n.addEventListener("input",calc); n.addEventListener("change",calc); }
  });
  el("qWa").addEventListener("click",()=>waOpen(el("qAmt").dataset.msg));
  calc();
}

/* ---------------- TRACK ---------------- */
function viewTrack(){
  return page("#/track", `
  <section class="section"><div class="wrap" style="max-width:820px">
    <div class="sec-head"><span class="eyebrow">Tracking</span>
      <h2>Where is my consignment?</h2>
      <p>Enter the reference on your booking confirmation. Try <button class="chip" id="demoA">MRZ-40118</button>
      <button class="chip" id="demoB">MRZ-40116</button> to see live examples.</p></div>
    <div class="panel">
      <div class="row" style="gap:10px">
        <div class="field" style="flex:1;min-width:200px"><label for="trkId">Tracking reference</label>
          <input id="trkId" placeholder="MRZ-00000" autocomplete="off"></div>
        <button class="btn btn-red" id="trkGo" style="align-self:flex-end">Track</button>
      </div>
      <div id="trkOut" style="margin-top:20px"></div>
    </div>
  </div></section>`);
}

function wireTrack(){
  const out=document.getElementById("trkOut"), inp=document.getElementById("trkId");
  function run(){
    const id=(inp.value||"").trim().toUpperCase();
    const t=TRACK_DEMO[id];
    if(!t){
      out.innerHTML = `<div class="panel" style="border-color:var(--crit);background:var(--crit-wash)">
        <b>No consignment found for “${esc(id||"—")}”.</b>
        <p class="small" style="margin-top:6px">Check the reference on your confirmation message, or send it to us on WhatsApp and we will look it up.</p>
        <a class="btn btn-wa btn-sm" style="margin-top:10px" target="_blank" rel="noopener"
           href="${waLink("Hello Morizo Logistics, please help me track consignment: ")}">Ask the desk</a></div>`;
      return;
    }
    out.innerHTML = `
      <div class="row" style="justify-content:space-between;margin-bottom:14px">
        <div><div class="eyebrow">${esc(id)}</div>
          <h3 style="font-size:19px;margin-top:2px">${esc(t.from)} → ${esc(t.to)}</h3>
          <p class="small muted">${esc(t.cust)} · ${esc(t.svc)}</p></div>
        <span class="pill p-info">ETA ${esc(t.eta)}</span>
      </div>
      <div class="row small muted" style="gap:18px;margin-bottom:16px">
        <span><b style="color:var(--text)">Vehicle</b> · ${esc(t.veh)}</span>
        <span><b style="color:var(--text)">Driver</b> · ${esc(t.driver)}</span>
      </div>
      <div class="track-line">${t.steps.map(s=>`
        <div class="track-step ${s.st==="done"?"done":s.st==="now"?"now":""}">
          <div class="track-dot"><i></i></div>
          <div class="track-body"><b>${esc(s.s)}</b><span>${esc(s.w)}</span></div>
        </div>`).join("")}</div>
      <a class="btn btn-wa btn-sm" target="_blank" rel="noopener"
         href="${waLink("Hello Morizo Logistics, I have a question about consignment "+id)}">Ask about this consignment</a>`;
  }
  document.getElementById("trkGo").addEventListener("click",run);
  inp.addEventListener("keydown",e=>{ if(e.key==="Enter") run(); });
  document.getElementById("demoA").addEventListener("click",()=>{inp.value="MRZ-40118";run();});
  document.getElementById("demoB").addEventListener("click",()=>{inp.value="MRZ-40116";run();});
  inp.value="MRZ-40118"; run();
}

/* ---------------- BOOK ---------------- */
function viewBook(){
  const pre = (location.hash.split("?v=")[1]||"");
  return page("#/book", `
  <section class="section"><div class="wrap" style="max-width:920px">
    <div class="sec-head"><span class="eyebrow">Booking</span>
      <h2>Raise a job</h2>
      <p>Fill this and it lands on the dispatch desk immediately. You will get a confirmation on WhatsApp with a tracking reference, usually inside 15 minutes.</p></div>
    <form class="panel" id="bookForm">
      <div class="form-grid">
        <div class="field"><label for="bName">Your name</label><input id="bName" required placeholder="Adaeze Nwachukwu"></div>
        <div class="field"><label for="bPhone">Phone / WhatsApp</label><input id="bPhone" required placeholder="0803 000 0000"></div>
        <div class="field"><label for="bCo">Company (optional)</label><input id="bCo" placeholder="Company name"></div>
        <div class="field"><label for="bSvc">Service</label>
          <select id="bSvc">${ALL_SERVICES.filter(s=>s.status!=="next").map(s=>`<option ${decodeURIComponent(pre)&&s.code==="VS-04"?"selected":""}>${esc(s.code)} · ${esc(s.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="bFrom">Pickup address</label><input id="bFrom" required placeholder="Plot 24, Aminu Kano Crescent, Wuse 2"></div>
        <div class="field"><label for="bTo">Delivery address</label><input id="bTo" required placeholder="Ikeja, Lagos"></div>
        <div class="field"><label for="bDate">Date needed</label><input id="bDate" type="date"></div>
        <div class="field"><label for="bTime">Time</label><input id="bTime" type="time" value="08:00"></div>
        <div class="field" style="grid-column:1/-1"><label for="bNotes">What is moving? Any special handling?</label>
          <textarea id="bNotes" placeholder="${esc(decodeURIComponent(pre)||"e.g. 12 pallets of bottled water, forklift available at pickup, no offloading labour at drop")}"></textarea></div>
      </div>
      <div class="row" style="margin-top:16px">
        <button type="submit" class="btn btn-wa">Submit &amp; send on WhatsApp</button>
        <button type="button" class="btn btn-ghost" id="bSaveOnly">Submit to the desk only</button>
      </div>
      <p class="hint" style="margin-top:10px">By submitting you agree to our carriage terms. Goods-in-transit cover is optional and quoted separately.</p>
    </form>
    <div id="bookOut" style="margin-top:16px"></div>
  </div></section>`);
}

function wireBook(){
  const f=document.getElementById("bookForm");
  const build=()=>{
    const g=id=>document.getElementById(id).value;
    const ref = "MRZ-" + (40130 + STORE.leads.length);
    const lead = {ref, name:g("bName"), phone:g("bPhone"), co:g("bCo"), svc:g("bSvc"),
      from:g("bFrom"), to:g("bTo"), when:(g("bDate")||"—")+" "+g("bTime"), notes:g("bNotes"),
      at:new Date().toISOString(), status:"New"};
    STORE.leads.unshift(lead); save(STORE);
    document.getElementById("bookOut").innerHTML = `<div class="panel" style="border-color:var(--ok);background:var(--ok-wash)">
      <b>Booking received — reference ${esc(ref)}</b>
      <p class="small" style="margin-top:6px">It is now on the dispatch desk. Open the staff dashboard to see it sitting in <b>Bookings → New</b>.</p>
      <a class="btn btn-ghost btn-sm" style="margin-top:10px" href="#/admin/bookings">Open dispatch desk</a></div>`;
    return lead;
  };
  f.addEventListener("submit", e=>{
    e.preventDefault(); const l=build();
    waOpen(`*MORIZO LOGISTICS — New booking ${l.ref}*\n\nName: ${l.name}\nPhone: ${l.phone}\nCompany: ${l.co||"—"}\nService: ${l.svc}\nPickup: ${l.from}\nDelivery: ${l.to}\nWhen: ${l.when}\n\nDetails: ${l.notes||"—"}`);
    toast("Booking "+l.ref+" raised");
  });
  document.getElementById("bSaveOnly").addEventListener("click", ()=>{
    if(!f.reportValidity()) return; const l=build(); toast("Booking "+l.ref+" sent to the desk");
  });
}

/* ---------------- CONTACT ---------------- */
function viewContact(){
  return page("#/contact", `
  <section class="section"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Contact</span><h2>Reach the desk</h2></div>
    <div class="grid-2">
      <div class="panel">
        <h3 style="font-size:17px;margin-bottom:12px">${esc(BRAND.name)}</h3>
        <div class="stack" style="gap:12px">
          <div><div class="eyebrow">Head office</div><p>${esc(BRAND.addressLine)}<br><span class="muted small">${esc(BRAND.addressNote)}</span></p></div>
          <div><div class="eyebrow">WhatsApp &amp; calls</div>
            <p><a href="tel:+${esc(BRAND.wa1)}">${esc(BRAND.wa1d)}</a> · <a href="tel:+${esc(BRAND.wa2)}">${esc(BRAND.wa2d)}</a></p></div>
          <div><div class="eyebrow">Email</div><p><a href="mailto:${esc(BRAND.email)}">${esc(BRAND.email)}</a></p></div>
          <div><div class="eyebrow">Opening hours</div><p>${esc(BRAND.hours)}<br><span class="muted small">Recovery &amp; towing desk: 24 hours, every day</span></p></div>
          <div><div class="eyebrow">Operating footprint</div>
            <p class="small muted">Abuja (head office &amp; Idu hub) · Karu truck yard · Suleja depot · agents in Lagos, Kano, Kaduna, Jos, Port Harcourt, Enugu and Calabar</p></div>
        </div>
        <div class="row" style="margin-top:16px">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink("Hello Morizo Logistics 👋")}">Chat with us</a>
          <a class="btn btn-ghost" href="#/quote">Get a quote</a>
        </div>
      </div>
      <div class="panel">
        <h3 style="font-size:17px;margin-bottom:12px">Frequently asked</h3>
        <div class="stack" style="gap:14px">
          ${[["Do I need an account?","No. Quotes, bookings and tracking all work without one. Corporate clients get a portal login for statements and credit terms."],
             ["How fast is same-day dispatch?","Inside the FCT, average door-to-door is 48 minutes for bike and about 2 hours for van multi-drops."],
             ["Is my cargo insured?","Goods-in-transit cover is optional at 1.5% of declared value. Haulage FTL includes basic GIT cover as standard."],
             ["What do you need for self-drive hire?","A valid driver's licence, your NIN, a utility bill, one guarantor, and a refundable caution fee."],
             ["Do you deliver outside Nigeria?","Cross-border ECOWAS haulage and air/sea export are quoted case by case — ask the desk."]]
            .map(q=>`<div><b>${esc(q[0])}</b><p class="small muted" style="margin-top:3px">${esc(q[1])}</p></div>`).join("")}
        </div>
      </div>
    </div>
  </div></section>`);
}
