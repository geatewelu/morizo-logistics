/* ============================================================
   MORIZO LOGISTICS — MASTER SERVICE CATALOGUE
   Every line the business runs or can run, grouped by division.
   status: "live" = running today | "ready" = can start on demand
           | "next" = growth idea, needs capex or a licence
   ============================================================ */

const DIVISIONS = [
/* ---------------------------------------------------------- 1 */
{
  id:"veh", name:"Vehicle Sales & Hire", accent:"var(--red)",
  blurb:"The car side of the house — buying, selling, hiring and keeping vehicles legal, clean and on the road.",
  services:[
  {code:"VS-01", name:"Car Sales — Brand New", basis:"Per unit", note:"Dealer-sourced, warranty-backed, full documentation", from:null, status:"live"},
  {code:"VS-02", name:"Car Sales — Foreign Used (Tokunbo)", basis:"Per unit", note:"US/Canada auction sourcing, duty-paid, Carfax history", from:null, status:"live"},
  {code:"VS-03", name:"Car Sales — Nigerian Used", basis:"Per unit", note:"Inspected, diagnostics run, panel and paint where needed", from:null, status:"live"},
  {code:"VS-04", name:"Self-Drive Car Hire", basis:"Per day", note:"Valid licence + NIN + refundable caution fee", from:45000, status:"live"},
  {code:"VS-05", name:"Chauffeur / Executive Car Service", basis:"Per day (10 hrs)", note:"Uniformed, background-checked, defensive-driving certified", from:65000, status:"live"},
  {code:"VS-06", name:"Airport Transfer — NAIA Abuja", basis:"Per trip", note:"Meet-and-greet, flight tracked, 60 mins free waiting", from:35000, status:"live"},
  {code:"VS-07", name:"Corporate Fleet Leasing", basis:"Per vehicle / month", note:"12–36 month lease, maintenance + driver + replacement unit", from:850000, status:"live"},
  {code:"VS-08", name:"Staff Shuttle & Employee Transport", basis:"Per route / month", note:"Fixed pick-up points, manifest and headcount reporting", from:1200000, status:"live"},
  {code:"VS-09", name:"Event, Wedding & Convoy Hire", basis:"Per day", note:"Bridal decoration, matched convoys, outriders optional", from:120000, status:"live"},
  {code:"VS-10", name:"Long-Term Hire (Monthly Rental)", basis:"Per month", note:"Expats, NGOs and project teams — 1 to 12 months", from:950000, status:"live"},
  {code:"VS-11", name:"Armoured & VIP Protection Vehicles", basis:"Per day", note:"B6 armoured SUVs with vetted security drivers", from:450000, status:"ready"},
  {code:"VS-12", name:"Keke & Motorcycle Hire (Dispatch Partners)", basis:"Per week", note:"Hire-purchase to vetted riders on our dispatch network", from:38000, status:"ready"},
  {code:"VS-13", name:"Ride-Hailing Fleet Partnership", basis:"Revenue share", note:"Cars placed with vetted Uber/Bolt/inDrive drivers", from:null, status:"next"},
  {code:"VS-14", name:"Vehicle Financing & Hire-Purchase", basis:"12–36 months", note:"Structured with a partner bank or cooperative", from:null, status:"next"},
  {code:"VS-15", name:"Trade-In & Guaranteed Buy-Back", basis:"Per unit", note:"Valuation, offset against a new purchase, same-day payout", from:null, status:"ready"}
]},
/* ---------------------------------------------------------- 2 */
{
  id:"ws", name:"Workshop, Parts & Compliance", accent:"var(--chrome)",
  blurb:"Everything that happens to a vehicle when it is not moving — repairs, papers, plates, cosmetics and parts.",
  services:[
  {code:"WK-01", name:"Servicing, Diagnostics & Repairs", basis:"Per job", note:"Scheduled servicing, computer diagnostics, engine and suspension", from:35000, status:"live"},
  {code:"WK-02", name:"Panel Beating, Spraying & Detailing", basis:"Per job", note:"Accident repair, oven-baked respray, interior detailing", from:120000, status:"live"},
  {code:"WK-03", name:"Car Wash & Valet (Mobile + Yard)", basis:"Per wash", note:"Mobile team comes to the customer's office or estate", from:4500, status:"ready"},
  {code:"WK-04", name:"Tyre Sales, Fitting & Balancing", basis:"Per tyre", note:"Truck and car tyres, alignment, nitrogen fill", from:38000, status:"live"},
  {code:"WK-05", name:"Auto Spare Parts Sales", basis:"Per part", note:"Genuine and OEM-equivalent, sourced Ladipo / overseas", from:null, status:"live"},
  {code:"WK-06", name:"Vehicle Documentation & Licensing", basis:"Per vehicle", note:"FRSC plate number, VIO roadworthiness, insurance, proof of ownership", from:95000, status:"live"},
  {code:"WK-07", name:"Vehicle Tracking & Telematics Fitting", basis:"Per unit + sub", note:"GPS install, geofence, remote fuel-cut, driver-behaviour reports", from:85000, status:"live"},
  {code:"WK-08", name:"Vehicle Branding, Wrapping & Signage", basis:"Per vehicle", note:"Full wraps and fleet livery for corporate clients", from:180000, status:"ready"},
  {code:"WK-09", name:"Pre-Purchase Inspection & Valuation Report", basis:"Per vehicle", note:"90-point check, written report — sold to third-party buyers", from:25000, status:"ready"},
  {code:"WK-10", name:"Car Recovery, Towing & Roadside Assistance", basis:"Per call-out", note:"Flatbed recovery, jump-start, tyre, fuel run — 24/7", from:40000, status:"live"},
  {code:"WK-11", name:"Annual Roadside Assistance Membership", basis:"Per vehicle / year", note:"Unlimited call-outs within FCT — recurring revenue", from:85000, status:"next"},
  {code:"WK-12", name:"CNG / LPG Conversion", basis:"Per vehicle", note:"Cuts fuel cost sharply; strong demand under current PMS prices", from:750000, status:"next"}
]},
/* ---------------------------------------------------------- 3 */
{
  id:"hau", name:"Haulage & Heavy Freight", accent:"var(--gold)",
  blurb:"Trucks on the Abuja–Kano, Abuja–Lagos and Abuja–Port Harcourt corridors, plus plant, project and cross-border cargo.",
  services:[
  {code:"HF-01", name:"Full Truck Load (FTL) Haulage", basis:"Per trip", note:"15T and 30T covered body, GIT insurance included", from:450000, status:"live"},
  {code:"HF-02", name:"Part Load / LTL Consolidation", basis:"Per tonne", note:"Shared trailer space on scheduled corridor departures", from:38000, status:"live"},
  {code:"HF-03", name:"Container Haulage (Port ↔ Abuja)", basis:"Per container", note:"20ft / 40ft from Apapa, Tin Can, Onne, Lekki Deep Sea", from:1650000, status:"live"},
  {code:"HF-04", name:"Flatbed & Lowbed — Plant Movement", basis:"Per trip", note:"Excavators, gensets, transformers, abnormal-load permits", from:900000, status:"live"},
  {code:"HF-05", name:"Car Carrier / Vehicle Transport", basis:"Per vehicle", note:"Single-deck and 6-car trailer, dealer-to-dealer movement", from:180000, status:"live"},
  {code:"HF-06", name:"Tipper & Construction Material Haulage", basis:"Per trip", note:"Granite, laterite, sharp sand — FCT and satellite towns", from:95000, status:"live"},
  {code:"HF-07", name:"Tanker & Petroleum Product Haulage", basis:"Per 33,000 L trip", note:"NMDPRA-compliant tankers — PMS, AGO, LPG", from:1400000, status:"live"},
  {code:"HF-08", name:"Agro-Commodity Haulage", basis:"Per tonne", note:"Grain, sesame, cashew, cocoa from northern aggregation points", from:32000, status:"ready"},
  {code:"HF-09", name:"Livestock Haulage", basis:"Per trip", note:"Purpose-built crates, Sallah and festive season peaks", from:520000, status:"ready"},
  {code:"HF-10", name:"Solid Minerals & Mining Haulage", basis:"Per tonne", note:"Nasarawa and Plateau mine sites to processing plants", from:28000, status:"ready"},
  {code:"HF-11", name:"Water Tanker Supply & Delivery", basis:"Per trip", note:"Construction sites and estates across the FCT", from:45000, status:"ready"},
  {code:"HF-12", name:"Skip Hire & Waste Haulage", basis:"Per lift", note:"Construction debris and estate waste under AEPB contracts", from:85000, status:"next"},
  {code:"HF-13", name:"Cross-Border ECOWAS Haulage", basis:"Per trip", note:"Niger, Benin, Cameroon, Ghana — with customs transit documents", from:3200000, status:"next"},
  {code:"HF-14", name:"Rail–Road Intermodal (Abuja–Kaduna / Lagos–Ibadan)", basis:"Per container", note:"Trunk leg by NRC rail, first and last mile by our trucks", from:null, status:"next"},
  {code:"HF-15", name:"Dedicated Contract Logistics", basis:"Per month", note:"Trucks and drivers ring-fenced to one client, SLA-backed", from:4500000, status:"live"},
  {code:"HF-16", name:"Security Escort & Convoy Management", basis:"Per trip", note:"Escort liaison, tracked convoy, checkpoint clearance", from:250000, status:"live"}
]},
/* ---------------------------------------------------------- 4 */
{
  id:"cou", name:"Courier, Dispatch & Last Mile", accent:"var(--info)",
  blurb:"Same-day inside the FCT, next-day to the states, and the cash-on-delivery machinery e-commerce sellers actually need.",
  services:[
  {code:"CL-01", name:"Same-Day Intra-Abuja Dispatch (Bike)", basis:"Base + per km", note:"Under 10 kg within FCT — 48 min average door to door", from:1800, status:"live"},
  {code:"CL-02", name:"Same-Day Intra-Abuja Dispatch (Van)", basis:"Base + per km", note:"Up to 500 kg, bulky and multi-drop runs", from:8000, status:"live"},
  {code:"CL-03", name:"Interstate Parcel & Courier", basis:"First 5 kg + per kg", note:"Next-day to Lagos, Kano, Kaduna, Jos, PH, Enugu, Calabar", from:6500, status:"live"},
  {code:"CL-04", name:"Door-to-Door Nationwide Delivery", basis:"Per parcel", note:"36 states + FCT via partner last-mile network", from:5500, status:"live"},
  {code:"CL-05", name:"E-commerce Fulfilment & COD", basis:"Per order + 2.5%", note:"Pick, pack, deliver, collect cash, remit within 48 hrs", from:3200, status:"live"},
  {code:"CL-06", name:"Scheduled Multi-Drop Distribution", basis:"Per route / day", note:"Retail replenishment on fixed daily routes", from:85000, status:"live"},
  {code:"CL-07", name:"Document & High-Value Courier", basis:"Per envelope", note:"Signature on delivery, chain-of-custody log, sealed pouch", from:4500, status:"live"},
  {code:"CL-08", name:"Reverse Logistics & Returns Pickup", basis:"Per pickup", note:"Failed-delivery recovery and merchant restocking", from:3000, status:"live"},
  {code:"CL-09", name:"Pharmacy & Medical Sample Courier", basis:"Per run", note:"Hospitals and labs — cold box, timestamped handover", from:7500, status:"ready"},
  {code:"CL-10", name:"Food & Restaurant Delivery Fleet", basis:"Per order", note:"White-label riders for restaurants that don't want an app", from:1500, status:"ready"},
  {code:"CL-11", name:"Campus & Student Delivery", basis:"Per parcel", note:"UniAbuja, Baze, Nile, Veritas — pickup lockers on campus", from:1200, status:"next"},
  {code:"CL-12", name:"Examination & Sensitive Material Movement", basis:"Per assignment", note:"Sealed, escorted, GPS-logged — WAEC/JAMB/NECO style contracts", from:380000, status:"next"},
  {code:"CL-13", name:"Cash-in-Transit Support (Licensed Partner)", basis:"Per run", note:"Vehicles and routing; cash handling by the licensed partner", from:null, status:"next"},
  {code:"CL-14", name:"Errand & Personal Concierge Runs", basis:"Per errand", note:"Queue-standing, pickups, bill payments — diaspora clients pay well", from:6000, status:"next"}
]},
/* ---------------------------------------------------------- 5 */
{
  id:"war", name:"Warehousing, Freight Forwarding & Customs", accent:"var(--ok)",
  blurb:"Somewhere to keep the goods, and the paperwork to get them in and out of the country.",
  services:[
  {code:"WF-01", name:"Warehousing & Short-Term Storage", basis:"Per pallet / week", note:"Racked, CCTV, fire-suppressed — Idu and Karu facilities", from:4500, status:"live"},
  {code:"WF-02", name:"Cross-Docking & Regional Distribution", basis:"Per pallet", note:"Inbound trailer stripped and re-routed the same day", from:7500, status:"live"},
  {code:"WF-03", name:"Cold Chain & Temperature-Controlled", basis:"Per pallet / week", note:"2–8°C pharma and frozen, temperature logged end to end", from:14000, status:"ready"},
  {code:"WF-04", name:"Inventory Management & Stock Counts", basis:"Per month", note:"Bin-level stock, cycle counts, low-stock alerts to WhatsApp", from:180000, status:"live"},
  {code:"WF-05", name:"Customs Brokerage & Clearing", basis:"Per declaration", note:"Form M, PAAR, duty assessment, terminal and shipping charges", from:320000, status:"live"},
  {code:"WF-06", name:"Air Freight — Import & Export", basis:"Per kg", note:"NAIA and MMIA gateways, consolidated and express", from:3800, status:"live"},
  {code:"WF-07", name:"Sea Freight — FCL & LCL", basis:"Per CBM / container", note:"China, UAE, UK, US lanes into Lagos and Onne", from:null, status:"live"},
  {code:"WF-08", name:"Vehicle Import, Clearing & Delivery", basis:"Per unit", note:"Tin Can / PTML clearing, duty, terminal handling, delivery to Abuja", from:null, status:"live"},
  {code:"WF-09", name:"Packing, Crating, Home & Office Relocation", basis:"Per move", note:"Survey, materials, dismantle, transit, reinstall", from:280000, status:"live"},
  {code:"WF-10", name:"Bonded Warehouse & Duty Deferment", basis:"Per pallet / month", note:"Goods stored duty-unpaid until the client sells", from:null, status:"next"},
  {code:"WF-11", name:"Container Depot & Empty Yard", basis:"Per TEU / day", note:"Storage, repair and repositioning of empties in Abuja", from:null, status:"next"},
  {code:"WF-12", name:"Packaging, Labelling & Kitting", basis:"Per unit", note:"Retail-ready packs, barcoding, promo bundling", from:250, status:"ready"},
  {code:"WF-13", name:"Fumigation & Pest Control (Warehouse)", basis:"Per treatment", note:"Required for agro-commodity export consignments", from:150000, status:"ready"},
  {code:"WF-14", name:"Archive & Document Storage", basis:"Per box / year", note:"Banks, law firms and agencies — indexed, retrievable in 24 hrs", from:3800, status:"next"},
  {code:"WF-15", name:"Export Documentation & Trade Facilitation", basis:"Per shipment", note:"NXP form, Certificate of Origin, NEPC registration support", from:180000, status:"next"}
]},
/* ---------------------------------------------------------- 6 */
{
  id:"fms", name:"Fleet Management for Third Parties", accent:"var(--gold-fill)",
  blurb:"What we run for our own trucks, sold to companies that own vehicles but don't want a transport department.",
  services:[
  {code:"FM-01", name:"Outsourced Fleet Management", basis:"Per vehicle / month", note:"Servicing, licensing, driver supply, incident handling", from:95000, status:"live"},
  {code:"FM-02", name:"Driver Supply & Verification", basis:"Per driver / month", note:"Guarantor checks, licence class verification, driving test", from:180000, status:"live"},
  {code:"FM-03", name:"Fuel Management & Fleet Cards", basis:"Per litre + admin", note:"Station network, litre-per-trip variance reporting", from:null, status:"ready"},
  {code:"FM-04", name:"Preventive Maintenance Programme", basis:"Per vehicle / year", note:"Mileage-triggered service schedule and parts sourcing", from:420000, status:"live"},
  {code:"FM-05", name:"Telematics Monitoring & Reporting", basis:"Per vehicle / month", note:"Speeding, harsh braking, idling, geofence breach alerts", from:12000, status:"live"},
  {code:"FM-06", name:"Insurance Placement, Claims & Accident Management", basis:"Per claim", note:"Comprehensive and GIT placement, police report, repair follow-through", from:null, status:"live"},
  {code:"FM-07", name:"Driver Training Academy", basis:"Per trainee", note:"Defensive driving, HGV handling, customer conduct — certificated", from:75000, status:"next"},
  {code:"FM-08", name:"Fleet Audit & Cost-Reduction Consulting", basis:"Per engagement", note:"Cost-per-km baseline, right-sizing, disposal plan", from:1200000, status:"next"},
  {code:"FM-09", name:"Vehicle Disposal & Auction Management", basis:"Commission", note:"End-of-life fleet sold through our sales channel", from:null, status:"ready"},
  {code:"FM-10", name:"Tyre & Battery Management Programme", basis:"Per vehicle / year", note:"Tracked by serial, cost-per-km measured, rotation scheduled", from:180000, status:"ready"}
]},
/* ---------------------------------------------------------- 7 */
{
  id:"spec", name:"Specialised & Project Logistics", accent:"var(--crit)",
  blurb:"Contract work where the movement is the project — sites, elections, relief operations and oilfields.",
  services:[
  {code:"SP-01", name:"Oil & Gas Field Logistics", basis:"Per contract", note:"Rig consumables, camp supply, personnel movement", from:null, status:"next"},
  {code:"SP-02", name:"Telecom Tower & BTS Site Logistics", basis:"Per site", note:"Generators, batteries, diesel runs to remote sites", from:420000, status:"ready"},
  {code:"SP-03", name:"Construction Site Logistics", basis:"Per month", note:"Materials, plant, labour transport under one site contract", from:2800000, status:"live"},
  {code:"SP-04", name:"NGO & Humanitarian Relief Distribution", basis:"Per operation", note:"Food and NFI distribution with beneficiary manifests", from:null, status:"ready"},
  {code:"SP-05", name:"Election & Government Logistics", basis:"Per assignment", note:"Materials, ad-hoc staff movement, tracked and escorted", from:null, status:"next"},
  {code:"SP-06", name:"Event & Exhibition Logistics", basis:"Per event", note:"Stage, sound, LED walls, exhibition stands and crew transport", from:650000, status:"ready"},
  {code:"SP-07", name:"Pharmaceutical Distribution", basis:"Per month", note:"NAFDAC-compliant handling, batch tracking, cold chain", from:null, status:"next"},
  {code:"SP-08", name:"Agricultural Input Distribution", basis:"Per season", note:"Fertiliser, seed and agro-chemical drops to farm clusters", from:null, status:"next"},
  {code:"SP-09", name:"Bank & ATM Servicing Logistics", basis:"Per month", note:"Engineers, spares and consumables to branch and ATM sites", from:null, status:"next"},
  {code:"SP-10", name:"Mining Site Support & Camp Supply", basis:"Per month", note:"Nasarawa, Plateau, Kogi — diesel, water, provisions, crew", from:null, status:"next"}
]},
/* ---------------------------------------------------------- 8 */
{
  id:"dig", name:"Digital, Advisory & Revenue Extras", accent:"var(--info)",
  blurb:"The layer that makes the rest scale — the WhatsApp desk, the client portal, the API, and knowledge sold as a product.",
  services:[
  {code:"DG-01", name:"WhatsApp Booking & Support Desk", basis:"Included", note:"Two lines, quote → booking → POD without the customer leaving chat", from:null, status:"live"},
  {code:"DG-02", name:"Customer Self-Service Portal", basis:"Included", note:"Quotes, bookings, live tracking, invoices and statements", from:null, status:"live"},
  {code:"DG-03", name:"Merchant API & E-commerce Plugins", basis:"Per integration", note:"WooCommerce, Shopify and custom carts push orders straight to dispatch", from:250000, status:"ready"},
  {code:"DG-04", name:"Live Tracking Links & Digital POD", basis:"Included", note:"Customer gets a link; driver captures signature and photo at delivery", from:null, status:"live"},
  {code:"DG-05", name:"Route Optimisation as a Service", basis:"Per month", note:"We plan another company's daily drops on our engine", from:350000, status:"next"},
  {code:"DG-06", name:"Tracking SaaS Resale (White-Label)", basis:"Per vehicle / month", note:"Our telematics stack resold to small fleet owners", from:9500, status:"next"},
  {code:"DG-07", name:"Supply Chain Audit & Advisory", basis:"Per engagement", note:"Network design, warehouse siting, cost-to-serve modelling", from:1800000, status:"next"},
  {code:"DG-08", name:"Logistics Training & Certification", basis:"Per seat", note:"Public courses for dispatch riders, fleet officers and SME owners", from:65000, status:"next"},
  {code:"DG-09", name:"Advertising on Fleet (Mobile Billboards)", basis:"Per vehicle / month", note:"Brand wraps on our trucks and vans — pure margin", from:120000, status:"next"},
  {code:"DG-10", name:"Insurance Brokerage Commission", basis:"Commission", note:"GIT, comprehensive and marine cargo placed for clients", from:null, status:"ready"},
  {code:"DG-11", name:"Trade Finance & Cargo Credit Referral", basis:"Commission", note:"Importers referred to partner lenders against cargo", from:null, status:"next"},
  {code:"DG-12", name:"Franchise / Agent Network", basis:"Per franchise", note:"Morizo-branded drop-off agents in other state capitals", from:null, status:"next"}
]}
];

/* Sectors the business sells into */
const INDUSTRIES = [
  {n:"Construction & Real Estate", d:"Tippers, lowbeds, site contracts"},
  {n:"FMCG & Manufacturing", d:"FTL, LTL, warehousing, distribution"},
  {n:"Oil, Gas & Energy", d:"Tankers, site logistics, camp supply"},
  {n:"E-commerce & Retail", d:"COD, fulfilment, multi-drop"},
  {n:"Banking & Finance", d:"Executive cars, staff shuttle, ATM servicing"},
  {n:"Government & MDAs", d:"Fleet leasing, project and election logistics"},
  {n:"NGOs & Development", d:"Relief distribution, field vehicle hire"},
  {n:"Healthcare & Pharma", d:"Cold chain, sample courier, distribution"},
  {n:"Agriculture & Agro-Export", d:"Commodity haulage, fumigation, export papers"},
  {n:"Telecoms", d:"Tower site logistics, diesel runs, engineer transport"},
  {n:"Mining & Solid Minerals", d:"Ore haulage, camp supply, plant movement"},
  {n:"Events, Hospitality & Diaspora", d:"Convoys, airport transfers, concierge runs"}
];

const ALL_SERVICES = DIVISIONS.flatMap(d => d.services.map(s => ({...s, division:d.name, divId:d.id, accent:d.accent})));
const SVC_COUNT = ALL_SERVICES.length;
const STATUS_LABEL = {live:"Running now", ready:"Available on request", next:"Growth idea"};
