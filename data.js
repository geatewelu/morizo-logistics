/* ============================================================
   MORIZO LOGISTICS — company config + seed operating data
   Edit BRAND and SERVICES here; every screen reads from this file.
   ============================================================ */

const BRAND = {
  name: "MORIZO LOGISTICS",
  tagline: "Unbeatable Cars",
  status: "Now Open",
  wa1: "2348033877168",
  wa2: "2348085540217",
  wa1d: "+234 803 387 7168",
  wa2d: "+234 808 554 0217",
  email: "hello@morizologistics.ng",
  addressLine: "Head Office — Abuja, Federal Capital Territory, Nigeria",
  addressNote: "Wuse / Central Business District corridor",
  hours: "Mon–Sat 7:00am – 8:00pm  ·  Sun 10:00am – 6:00pm",
  rcNumber: "RC —— (add at Settings)",
  currency: "₦"
};

const N = n => BRAND.currency + Math.round(n).toLocaleString("en-NG");

/* DIVISIONS live in services.js */


/* ---------- 2. FLEET FOR HIRE (public) ---------- */
const FLEET = [
  {id:"F-01", name:"Toyota Corolla", cls:"Sedan", seats:4, bags:2, trans:"Automatic", fuel:"Petrol", day:45000, kind:"car"},
  {id:"F-02", name:"Lexus NX 300", cls:"Executive SUV", seats:5, bags:3, trans:"Automatic", fuel:"Petrol", day:150000, kind:"suv", star:true, img:"car-hero.jpg"},
  {id:"F-03", name:"Toyota Hilux", cls:"Pickup 4x4", seats:5, bags:4, trans:"Manual", fuel:"Diesel", day:95000, kind:"suv"},
  {id:"F-04", name:"Toyota Hiace Bus", cls:"14-Seater Bus", seats:14, bags:10, trans:"Manual", fuel:"Diesel", day:110000, kind:"bus"},
  {id:"F-05", name:"Toyota Prado", cls:"Premium SUV", seats:7, bags:5, trans:"Automatic", fuel:"Petrol", day:185000, kind:"suv"},
  {id:"F-06", name:"Mercedes-Benz E-Class", cls:"Luxury Sedan", seats:4, bags:3, trans:"Automatic", fuel:"Petrol", day:220000, kind:"car"},
  {id:"F-07", name:"Mack Granite 30T", cls:"Covered Truck", seats:2, bags:0, trans:"Manual", fuel:"Diesel", day:480000, kind:"truck"},
  {id:"F-08", name:"Bajaj Boxer Dispatch", cls:"Delivery Bike", seats:1, bags:1, trans:"Manual", fuel:"Petrol", day:12000, kind:"bike"}
];

/* ---------- 3. QUOTE ENGINE ---------- */
const FCT_ZONES = ["Wuse","Wuse 2","Garki","Maitama","Asokoro","Central Business District","Jabi","Utako","Gwarinpa","Life Camp","Katampe","Lugbe","Kubwa","Nyanya","Karu","Lokogoma","Apo","Gudu","Durumi","Jahi","Dawaki","Kuje","Gwagwalada","Bwari","Airport Road / NAIA"];

const LANES = [
  {to:"Within Abuja (FCT)", km:22},
  {to:"Suleja / Niger", km:48},
  {to:"Kaduna", km:186},
  {to:"Jos / Plateau", km:290},
  {to:"Lokoja / Kogi", km:198},
  {to:"Makurdi / Benue", km:302},
  {to:"Kano", km:428},
  {to:"Enugu", km:522},
  {to:"Ibadan / Oyo", km:625},
  {to:"Lagos", km:756},
  {to:"Port Harcourt / Rivers", km:640},
  {to:"Calabar / Cross River", km:735},
  {to:"Maiduguri / Borno", km:740},
  {to:"Sokoto", km:768}
];

const QUOTE_MODES = [
  {id:"bike",  label:"Bike Dispatch (≤10 kg, FCT only)",      base:1800,  perKm:180,  perKg:0,   fctOnly:true},
  {id:"van",   label:"Van Dispatch (≤500 kg, FCT only)",      base:8000,  perKm:350,  perKg:0,   fctOnly:true},
  {id:"parcel",label:"Interstate Parcel (per kg)",            base:6500,  perKm:0,    perKg:450, freeKg:5},
  {id:"ltl",   label:"Part Load / LTL (per tonne)",           base:25000, perKm:95,   perTonne:12000},
  {id:"ftl15", label:"Full Truck Load — 15 Tonne",            base:180000,perKm:1250, min:380000},
  {id:"ftl30", label:"Full Truck Load — 30 Tonne",            base:260000,perKm:1850, min:520000},
  {id:"carcar",label:"Car Carrier (per vehicle)",             base:95000, perKm:340,  min:180000},
  {id:"hire",  label:"Car Hire / Chauffeur (per day)",        hire:true},
  {id:"tow",   label:"Recovery & Towing",                     base:40000, perKm:900,  min:40000}
];

/* ---------- 4. SEED OPERATING DATA (admin) ---------- */
const BOOKINGS = [
  {id:"MRZ-40118", cust:"Dangote Cement Plc",       svc:"HF-01 · FTL Haulage",        route:"Obajana → Abuja",            when:"16 Sep, 06:30", amount:620000,  status:"In Transit", driver:"Sunday Akpan",  veh:"ABJ-441-XA", ch:"Portal",   urgent:false},
  {id:"MRZ-40117", cust:"Mrs Adaeze Nwachukwu",      svc:"VS-06 · Airport Transfer",   route:"Maitama → NAIA",             when:"16 Sep, 05:10", amount:35000,   status:"Completed",  driver:"Ibrahim Musa",  veh:"ABJ-209-KU", ch:"WhatsApp", urgent:false},
  {id:"MRZ-40116", cust:"Jumia Nigeria",             svc:"CL-05 · E-commerce COD",     route:"Idu Hub → 38 drops (FCT)",   when:"16 Sep, 07:00", amount:121600,  status:"In Transit", driver:"Peter Obi Eze", veh:"ABJ-882-GW", ch:"API",      urgent:false},
  {id:"MRZ-40115", cust:"Julius Berger Nigeria",     svc:"HF-04 · Lowbed Plant Move",  route:"Karu Yard → Kaduna Site",    when:"16 Sep, 04:00", amount:1180000, status:"In Transit", driver:"Yakubu Danladi",veh:"ABJ-117-LB", ch:"Portal",   urgent:true},
  {id:"MRZ-40114", cust:"Stanbic IBTC (Wuse 2)",     svc:"VS-08 · Staff Shuttle",      route:"Gwarinpa → Wuse 2 loop",     when:"16 Sep, 06:00", amount:48000,   status:"Completed",  driver:"Grace Ekanem",  veh:"ABJ-703-HB", ch:"Contract", urgent:false},
  {id:"MRZ-40113", cust:"Emeka Okafor",              svc:"VS-04 · Self-Drive Hire",    route:"Jabi pickup · 3 days",       when:"16 Sep, 09:00", amount:135000,  status:"Confirmed",  driver:"—",             veh:"ABJ-556-CR", ch:"WhatsApp", urgent:false},
  {id:"MRZ-40112", cust:"Nestlé Nigeria",            svc:"HF-02 · LTL Consolidation",  route:"Agbara → Abuja (12 T)",      when:"16 Sep, 11:30", amount:486000,  status:"Confirmed",  driver:"Musa Bello",    veh:"ABJ-330-TR", ch:"Portal",   urgent:false},
  {id:"MRZ-40111", cust:"Shoprite Jabi Lake",        svc:"CL-06 · Multi-Drop",         route:"Jabi → 9 stores",            when:"16 Sep, 13:00", amount:92500,   status:"New",        driver:"—",             veh:"—",          ch:"WhatsApp", urgent:false},
  {id:"MRZ-40110", cust:"Hon. Bassey Effiong",       svc:"VS-09 · Convoy Hire",        route:"Asokoro → Calabar",          when:"17 Sep, 05:00", amount:960000,  status:"New",        driver:"—",             veh:"—",          ch:"WhatsApp", urgent:true},
  {id:"MRZ-40109", cust:"Chisom Ventures Ltd",       svc:"CL-03 · Interstate Parcel",  route:"Utako → Onitsha",            when:"16 Sep, 10:15", amount:14750,   status:"In Transit", driver:"Dispatch #4",   veh:"ABJ-998-BK", ch:"Portal",   urgent:false},
  {id:"MRZ-40108", cust:"Total Energies Retail",     svc:"HF-07 · Tanker Haulage",     route:"Suleja Depot → Minna",       when:"15 Sep, 22:00", amount:1520000, status:"Completed",  driver:"Ali Sanusi",    veh:"ABJ-014-TK", ch:"Contract", urgent:false},
  {id:"MRZ-40107", cust:"Kemi Adeyemi",              svc:"VS-10 · Towing & Recovery",  route:"Kubwa Expressway (km 12)",   when:"15 Sep, 19:40", amount:52000,   status:"Completed",  driver:"Recovery 2",    veh:"ABJ-667-RV", ch:"WhatsApp", urgent:false},
  {id:"MRZ-40106", cust:"MTN Nigeria (Enterprise)",  svc:"FM-01 · Fleet Management",   route:"18 vehicles · September",    when:"01 Sep, 00:00", amount:1710000, status:"Confirmed",  driver:"—",             veh:"Fleet",      ch:"Contract", urgent:false},
  {id:"MRZ-40105", cust:"Ahmed Garba",               svc:"VS-02 · Tokunbo Purchase",   route:"2019 Lexus NX · Abuja",      when:"14 Sep, 15:00", amount:38500000,status:"Completed",  driver:"—",             veh:"Sold",       ch:"Walk-in",  urgent:false},
  {id:"MRZ-40104", cust:"Lafarge Africa",            svc:"HF-06 · Tipper Haulage",     route:"Mpape Quarry → Lugbe",       when:"15 Sep, 08:00", amount:114000,  status:"Cancelled",  driver:"—",             veh:"—",          ch:"Portal",   urgent:false}
];

const VEHICLES = [
  {plate:"ABJ-441-XA", type:"Mack Granite 30T",     cat:"Truck",   yr:2019, driver:"Sunday Akpan",   status:"On Trip",     odo:418200, nextSvc:422000, fuel:62, ins:"2027-02-11", track:"Live"},
  {plate:"ABJ-117-LB", type:"MAN Lowbed 60T",       cat:"Lowbed",  yr:2018, driver:"Yakubu Danladi", status:"On Trip",     odo:512400, nextSvc:515000, fuel:44, ins:"2026-11-30", track:"Live"},
  {plate:"ABJ-330-TR", type:"Mercedes Actros 15T",  cat:"Truck",   yr:2020, driver:"Musa Bello",     status:"Loading",     odo:288150, nextSvc:295000, fuel:88, ins:"2027-04-02", track:"Live"},
  {plate:"ABJ-014-TK", type:"Tanker 33,000 L",      cat:"Tanker",  yr:2017, driver:"Ali Sanusi",     status:"Available",   odo:601980, nextSvc:605000, fuel:30, ins:"2026-10-18", track:"Live"},
  {plate:"ABJ-209-KU", type:"Lexus NX 300",         cat:"SUV",     yr:2019, driver:"Ibrahim Musa",   status:"Available",   odo:78420,  nextSvc:82000,  fuel:75, ins:"2027-01-09", track:"Live"},
  {plate:"ABJ-556-CR", type:"Toyota Corolla",       cat:"Sedan",   yr:2021, driver:"—",              status:"On Hire",     odo:62110,  nextSvc:65000,  fuel:55, ins:"2027-03-21", track:"Live"},
  {plate:"ABJ-703-HB", type:"Toyota Hiace 14-Str",  cat:"Bus",     yr:2020, driver:"Grace Ekanem",   status:"Available",   odo:141330, nextSvc:145000, fuel:68, ins:"2026-12-05", track:"Live"},
  {plate:"ABJ-882-GW", type:"Ford Transit Van",     cat:"Van",     yr:2021, driver:"Peter Obi Eze",  status:"On Trip",     odo:96740,  nextSvc:100000, fuel:51, ins:"2027-05-14", track:"Live"},
  {plate:"ABJ-667-RV", type:"Flatbed Recovery",     cat:"Recovery",yr:2016, driver:"Recovery Crew 2",status:"Available",   odo:333010, nextSvc:335000, fuel:40, ins:"2026-09-28", track:"Live"},
  {plate:"ABJ-998-BK", type:"Bajaj Boxer ×6",       cat:"Bike",    yr:2023, driver:"Dispatch Pool",  status:"On Trip",     odo:41220,  nextSvc:44000,  fuel:80, ins:"2027-06-30", track:"Partial"},
  {plate:"ABJ-771-PD", type:"Toyota Prado",         cat:"SUV",     yr:2022, driver:"—",              status:"Workshop",    odo:53870,  nextSvc:55000,  fuel:22, ins:"2027-07-19", track:"Live"},
  {plate:"ABJ-402-HX", type:"Toyota Hilux 4x4",     cat:"Pickup",  yr:2020, driver:"—",              status:"Available",   odo:119460, nextSvc:122000, fuel:70, ins:"2026-09-22", track:"Live"}
];

const DRIVERS = [
  {name:"Sunday Akpan",   lic:"Class E",  yrs:11, phone:"0803 114 2288", trips:412, score:94, status:"On Trip",   base:"Karu Yard"},
  {name:"Yakubu Danladi", lic:"Class F",  yrs:14, phone:"0806 552 7710", trips:508, score:91, status:"On Trip",   base:"Karu Yard"},
  {name:"Musa Bello",     lic:"Class E",  yrs:8,  phone:"0813 220 9045", trips:298, score:88, status:"Loading",   base:"Idu Hub"},
  {name:"Ali Sanusi",     lic:"Class F",  yrs:16, phone:"0802 771 3390", trips:611, score:96, status:"Resting",   base:"Suleja"},
  {name:"Ibrahim Musa",   lic:"Class D",  yrs:6,  phone:"0705 889 1123", trips:1042,score:97, status:"Available", base:"Wuse 2"},
  {name:"Grace Ekanem",   lic:"Class D",  yrs:5,  phone:"0816 334 6620", trips:874, score:95, status:"Available", base:"Gwarinpa"},
  {name:"Peter Obi Eze",  lic:"Class D",  yrs:4,  phone:"0810 445 2201", trips:1390,score:89, status:"On Trip",   base:"Idu Hub"},
  {name:"Hauwa Lawal",    lic:"Class D",  yrs:3,  phone:"0907 118 4432", trips:520, score:92, status:"Available", base:"Lugbe"}
];

const SHIPMENTS = [
  {id:"MRZ-40116", cust:"Jumia Nigeria",     from:"Idu Hub",    to:"38 drops · FCT",  wt:"940 kg", eta:"Today 17:20", status:"Out for Delivery", pct:72},
  {id:"MRZ-40109", cust:"Chisom Ventures",   from:"Utako",      to:"Onitsha",         wt:"18 kg",  eta:"Tomorrow 12:00",status:"In Transit",      pct:45},
  {id:"MRZ-40118", cust:"Dangote Cement",    from:"Obajana",    to:"Abuja",           wt:"30 T",   eta:"Today 19:45", status:"In Transit",       pct:58},
  {id:"MRZ-40115", cust:"Julius Berger",     from:"Karu Yard",  to:"Kaduna Site",     wt:"42 T",   eta:"Today 15:30", status:"In Transit",       pct:81},
  {id:"MRZ-40121", cust:"Shoprite Jabi",     from:"Jabi DC",    to:"9 stores",        wt:"2.1 T",  eta:"Today 16:00", status:"Awaiting Pickup",  pct:5},
  {id:"MRZ-40122", cust:"Zenith Bank Abuja", from:"CBD",        to:"Lagos Island",    wt:"4 kg",   eta:"Tomorrow 10:00",status:"Awaiting Pickup", pct:5},
  {id:"MRZ-40103", cust:"Fidson Healthcare", from:"Lagos",      to:"Abuja Cold Room", wt:"1.4 T",  eta:"Delivered",   status:"Delivered",        pct:100},
  {id:"MRZ-40098", cust:"BUA Foods",         from:"Kano",       to:"Abuja",           wt:"28 T",   eta:"Delivered",   status:"Delivered",        pct:100}
];

const INVOICES = [
  {no:"INV-2609-014", cust:"Dangote Cement Plc",   issued:"12 Sep 2026", due:"12 Oct 2026", amount:4820000, paid:0,       status:"Sent"},
  {no:"INV-2609-013", cust:"MTN Nigeria",          issued:"01 Sep 2026", due:"15 Sep 2026", amount:1710000, paid:1710000, status:"Paid"},
  {no:"INV-2609-012", cust:"Julius Berger",        issued:"08 Sep 2026", due:"08 Oct 2026", amount:3260000, paid:1000000, status:"Part-Paid"},
  {no:"INV-2608-041", cust:"Shoprite Jabi Lake",   issued:"22 Aug 2026", due:"05 Sep 2026", amount:645000,  paid:0,       status:"Overdue"},
  {no:"INV-2609-011", cust:"Nestlé Nigeria",       issued:"05 Sep 2026", due:"05 Oct 2026", amount:1458000, paid:0,       status:"Sent"},
  {no:"INV-2609-010", cust:"Stanbic IBTC",         issued:"01 Sep 2026", due:"16 Sep 2026", amount:1248000, paid:1248000, status:"Paid"},
  {no:"INV-2608-039", cust:"Total Energies Retail",issued:"18 Aug 2026", due:"01 Sep 2026", amount:4560000, paid:0,       status:"Overdue"},
  {no:"INV-2609-015", cust:"Jumia Nigeria",        issued:"14 Sep 2026", due:"28 Sep 2026", amount:892400,  paid:0,       status:"Draft"}
];

const CUSTOMERS = [
  {name:"Dangote Cement Plc",    type:"Corporate", since:"2021", trips:318, spend:58400000, terms:"30 days", owner:"Ngozi A.",  tier:"Platinum"},
  {name:"Julius Berger Nigeria", type:"Corporate", since:"2022", trips:142, spend:31200000, terms:"30 days", owner:"Ngozi A.",  tier:"Platinum"},
  {name:"MTN Nigeria",           type:"Corporate", since:"2023", trips:96,  spend:19800000, terms:"14 days", owner:"Tunde B.",  tier:"Gold"},
  {name:"Jumia Nigeria",         type:"E-commerce",since:"2024", trips:2140,spend:14900000, terms:"14 days", owner:"Tunde B.",  tier:"Gold"},
  {name:"Nestlé Nigeria",        type:"Corporate", since:"2024", trips:71,  spend:11350000, terms:"30 days", owner:"Ngozi A.",  tier:"Gold"},
  {name:"Shoprite Jabi Lake",    type:"Retail",    since:"2023", trips:388, spend:8720000,  terms:"14 days", owner:"Amaka U.",  tier:"Silver"},
  {name:"Stanbic IBTC",          type:"Corporate", since:"2025", trips:210, spend:6640000,  terms:"14 days", owner:"Tunde B.",  tier:"Silver"},
  {name:"Hon. Bassey Effiong",   type:"Individual",since:"2025", trips:19,  spend:4180000,  terms:"Prepaid", owner:"Amaka U.",  tier:"Silver"},
  {name:"Emeka Okafor",          type:"Individual",since:"2026", trips:7,   spend:742000,   terms:"Prepaid", owner:"Amaka U.",  tier:"Bronze"},
  {name:"Kemi Adeyemi",          type:"Individual",since:"2026", trips:3,   spend:148000,   terms:"Prepaid", owner:"Amaka U.",  tier:"Bronze"}
];

const MAINTENANCE = [
  {plate:"ABJ-771-PD", job:"Gearbox overhaul",           opened:"13 Sep", vendor:"Zenith Auto, Idu",   cost:1850000, status:"In Workshop", due:"18 Sep"},
  {plate:"ABJ-014-TK", job:"Brake pads + tanker valve",  opened:"15 Sep", vendor:"In-house",           cost:340000,  status:"Scheduled",   due:"19 Sep"},
  {plate:"ABJ-402-HX", job:"Insurance renewal",          opened:"—",      vendor:"AIICO Insurance",    cost:420000,  status:"Due Soon",    due:"22 Sep"},
  {plate:"ABJ-667-RV", job:"Insurance renewal",          opened:"—",      vendor:"AIICO Insurance",    cost:385000,  status:"Due Soon",    due:"28 Sep"},
  {plate:"ABJ-441-XA", job:"40,000 km service",          opened:"—",      vendor:"In-house",           cost:295000,  status:"Upcoming",    due:"3,800 km"},
  {plate:"ABJ-330-TR", job:"Tyre replacement ×6",        opened:"11 Sep", vendor:"Michelin Wuse",      cost:1260000, status:"Completed",   due:"14 Sep"}
];

const WA_THREADS = [
  {id:1, name:"Emeka Okafor", phone:"+234 803 221 0094", tag:"Booking", unread:2, last:"11:42",
   msgs:[
     {d:"in",  t:"10:58", x:"Good morning. I need a Corolla for 3 days from tomorrow, self drive."},
     {d:"out", t:"11:02", x:"Good morning sir. Corolla self-drive is ₦45,000/day — ₦135,000 for 3 days. We need your driver's licence, NIN and a ₦100,000 refundable caution fee."},
     {d:"in",  t:"11:20", x:"Okay. Can I pick up at Jabi by 9am?"},
     {d:"out", t:"11:24", x:"Yes sir. Jabi pickup 9:00am confirmed. Booking reference MRZ-40113."},
     {d:"in",  t:"11:42", x:"I have sent the transfer. Send me the agreement."}
   ]},
  {id:2, name:"Shoprite Jabi Lake", phone:"+234 809 776 1200", tag:"Multi-drop", unread:1, last:"10:15",
   msgs:[
     {d:"in",  t:"09:50", x:"We have 9 store drops for today, can your van start by 1pm?"},
     {d:"out", t:"09:58", x:"Yes. 9 drops within FCT on the multi-drop rate is ₦92,500 for the route. Shall I raise it?"},
     {d:"in",  t:"10:15", x:"Please raise it. Same PO as last week."}
   ]},
  {id:3, name:"Hon. Bassey Effiong", phone:"+234 802 339 4471", tag:"Convoy", unread:3, last:"09:05",
   msgs:[
     {d:"in",  t:"08:40", x:"I need 3 SUVs and 1 bus for a Calabar trip on the 17th."},
     {d:"out", t:"08:52", x:"Noted sir. 3 Prados + 1 Hiace, Abuja–Calabar convoy with drivers and fuel is ₦960,000. Departure 5:00am from Asokoro."},
     {d:"in",  t:"09:05", x:"Add outriders. Send account details."}
   ]},
  {id:4, name:"Dangote Logistics Desk", phone:"+234 700 326 4836", tag:"Haulage", unread:0, last:"07:31",
   msgs:[
     {d:"in",  t:"06:20", x:"Truck ABJ-441-XA has loaded at Obajana. Waybill 88214."},
     {d:"out", t:"06:35", x:"Received. Tracking is live, ETA Abuja 19:45 today. We will send arrival confirmation."},
     {d:"in",  t:"07:31", x:"Thank you."}
   ]},
  {id:5, name:"Kemi Adeyemi", phone:"+234 706 550 8812", tag:"Recovery", unread:0, last:"Yesterday",
   msgs:[
     {d:"in",  t:"19:22", x:"My car has broken down on Kubwa expressway around km 12. Please help."},
     {d:"out", t:"19:26", x:"Recovery 2 is dispatched, ETA 25 minutes. Flatbed recovery within FCT is ₦52,000. Please switch on your hazard lights and stay in the vehicle."},
     {d:"in",  t:"20:05", x:"They have arrived. Thank you so much."}
   ]},
  {id:6, name:"Ahmed Garba", phone:"+234 805 118 2277", tag:"Car Sales", unread:0, last:"Mon",
   msgs:[
     {d:"in",  t:"14:10", x:"Is the 2019 Lexus NX still available?"},
     {d:"out", t:"14:18", x:"Yes sir. 2019 Lexus NX 300, foreign used, duty paid, 62,000 km — ₦38,500,000. You can inspect at our Abuja yard any day this week."},
     {d:"in",  t:"15:00", x:"I will come tomorrow morning."}
   ]}
];

/* 12-month revenue in ₦ millions, plus split by division */
const REVENUE = [
  {m:"Oct 25", v:18.2},{m:"Nov 25", v:21.6},{m:"Dec 25", v:29.4},{m:"Jan 26", v:19.8},
  {m:"Feb 26", v:22.1},{m:"Mar 26", v:25.7},{m:"Apr 26", v:24.3},{m:"May 26", v:28.9},
  {m:"Jun 26", v:31.2},{m:"Jul 26", v:29.6},{m:"Aug 26", v:34.8},{m:"Sep 26", v:38.4}
];
const REV_SPLIT = [
  {k:"Haulage & Heavy Freight", v:41, c:"var(--red)"},
  {k:"Vehicle Services",        v:26, c:"var(--gold-fill)"},
  {k:"Courier & Last Mile",     v:17, c:"var(--info)"},
  {k:"Warehousing & Forwarding",v:10, c:"var(--ok)"},
  {k:"Fleet Management",        v:6,  c:"var(--chrome)"}
];
const LANE_PERF = [
  {lane:"Abuja → Lagos",         trips:86, onTime:91, rev:9.8},
  {lane:"Abuja → Kano",          trips:74, onTime:95, rev:6.2},
  {lane:"Abuja → Kaduna",        trips:132,onTime:97, rev:5.4},
  {lane:"Abuja → Port Harcourt", trips:41, onTime:84, rev:7.1},
  {lane:"Intra-FCT (all modes)", trips:918,onTime:93, rev:6.6},
  {lane:"Abuja → Jos",           trips:38, onTime:89, rev:2.3}
];

const TRACK_DEMO = {
  "MRZ-40118": {cust:"Dangote Cement Plc", svc:"FTL Haulage · 30 T", from:"Obajana, Kogi", to:"Idu Industrial, Abuja",
    eta:"Today, 19:45", veh:"ABJ-441-XA · Mack Granite", driver:"Sunday Akpan",
    steps:[
      {s:"Order confirmed",        w:"15 Sep · 16:20", st:"done"},
      {s:"Truck assigned & fuelled",w:"15 Sep · 21:05", st:"done"},
      {s:"Loaded at Obajana plant", w:"16 Sep · 06:30", st:"done"},
      {s:"In transit — Lokoja bypass", w:"16 Sep · 11:10", st:"now"},
      {s:"Arrival at Idu yard",    w:"Est. 19:45",     st:"todo"},
      {s:"Offloaded & POD signed", w:"Est. 21:00",     st:"todo"}
    ]},
  "MRZ-40116": {cust:"Jumia Nigeria", svc:"E-commerce COD · 38 drops", from:"Idu Fulfilment Hub", to:"FCT — 38 addresses",
    eta:"Today, 17:20", veh:"ABJ-882-GW · Ford Transit", driver:"Peter Obi Eze",
    steps:[
      {s:"Manifest received via API", w:"15 Sep · 22:40", st:"done"},
      {s:"Picked & packed",           w:"16 Sep · 05:50", st:"done"},
      {s:"Out for delivery",          w:"16 Sep · 07:00", st:"done"},
      {s:"27 of 38 delivered",        w:"16 Sep · 13:15", st:"now"},
      {s:"Route completed",           w:"Est. 17:20",     st:"todo"},
      {s:"COD remitted to merchant",  w:"Est. 18 Sep",    st:"todo"}
    ]}
};
