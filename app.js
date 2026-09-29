/**
 * WISDOM: Well Intelligence & Drilling Operations Memory
 * (eRTMAC-NWIS Solution for Oil India Limited)
 * Proactive Decision Support & Offset Well Analytics Platform
 */

// ================= GLOBAL STATE & DATASETS =================
const STATE = {
  activeWell: {
    name: "OIL-NHK-EXP-502",
    field: "Naharkatiya Field (Upper Assam)",
    lat: 27.2885,
    lng: 95.3320,
    currentDepthMD: 2845,
    currentDepthTVD: 2842,
    targetDepth: 3900,
    currentFormation: "Barail Sandstone (Main Sand #2)",
    mudWeight: 11.8,
    rop: 14.2,
    wob: 22.5,
    torque: 16.8,
    spudDate: "2024-08-12",
    status: "Drilling Ahead"
  },
  queryRadiusKm: 5.0,
  targetFormationFilter: "Barail",
  riskFilter: "all",
  selectedOffsetWell: null,
  isAutoDrilling: false,
  autoDrillInterval: null
};

// Rich Offset Well Dataset (Upper Assam Basin: Naharkatiya / Moran / Duliajan / Jorajan)
const OFFSET_WELLS = [
  {
    id: "NHK-108",
    name: "OIL-NHK-108",
    field: "Naharkatiya",
    lat: 27.2990,
    lng: 95.3440,
    distKm: 1.8,
    td: 3650,
    year: 2021,
    status: "Oil Producer",
    casingProgram: "20\"@150m, 13-3/8\"@1480m, 9-5/8\"@2750m, 7\"@3650m",
    mudWeightAvg: "11.6 - 12.2 ppg",
    hazard: "Severe Mud Loss @ 2912m (85 bbl/hr)",
    riskLevel: "danger",
    formationTops: { Girujan: 1510, Tipam: 2120, Barail: 2755, Kopili: 3410 },
    incidents: [
      {
        depth: 2912,
        formation: "Barail Sandstone",
        type: "Severe Mud Loss",
        lossRate: "85 bbls/hr",
        nptHrs: 38,
        rootCause: "Sub-seismic micro-fracture network near coal seam contact with low fracture gradient (12.3 ppg equiv).",
        mitigation: "Pumped 40 bbl high-viscosity pill with 35 ppb CaCO3 coarse + 15 ppb Mica flakes. Soaked for 2 hrs. Lowered mud weight from 12.2 to 11.7 ppg.",
        reportRef: "WCR-OIL-NHK-108 / DDR Day 44"
      }
    ]
  },
  {
    id: "NHK-087",
    name: "OIL-NHK-087",
    field: "Naharkatiya",
    lat: 27.2790,
    lng: 95.3020,
    distKm: 3.4,
    td: 3820,
    year: 2019,
    status: "Shut-in Gas",
    casingProgram: "20\"@140m, 13-3/8\"@1510m, 9-5/8\"@2780m, 7\"@3810m",
    mudWeightAvg: "11.9 - 12.4 ppg",
    hazard: "Differential Sticking & Fishing @ 3040m",
    riskLevel: "danger",
    formationTops: { Girujan: 1540, Tipam: 2150, Barail: 2780, Kopili: 3450 },
    incidents: [
      {
        depth: 3040,
        formation: "Barail Coal-Shale",
        type: "Stuck Pipe (Differential)",
        lossRate: "Nil",
        nptHrs: 74,
        rootCause: "Overbalance pressure exceeded 520 psi across depleted sand lens while drillstring remained static for survey for 18 mins.",
        mitigation: "Spotted 50 bbl Pipe-Freeing Oil-based surfactant pill. Worked string with maximum allowable overpull (120 klbs) and downward jarring. Pipe freed in 16 hrs.",
        reportRef: "WCR-OIL-NHK-087 / Fishing Log"
      }
    ]
  },
  {
    id: "MOR-45",
    name: "OIL-MOR-45",
    field: "Moran",
    lat: 27.2510,
    lng: 95.3580,
    distKm: 4.9,
    td: 4100,
    year: 2023,
    status: "Oil Producer",
    casingProgram: "20\"@160m, 13-3/8\"@1490m, 9-5/8\"@2770m, 7\"@3920m",
    mudWeightAvg: "11.5 - 12.0 ppg",
    hazard: "Partial Loss @ 2908m & High Torque",
    riskLevel: "warning",
    formationTops: { Girujan: 1515, Tipam: 2140, Barail: 2770, Kopili: 3430 },
    incidents: [
      {
        depth: 2908,
        formation: "Barail Sandstone",
        type: "Partial Mud Loss & Torque Spikes",
        lossRate: "28 bbls/hr",
        nptHrs: 14,
        rootCause: "Intercalated coal seam sloughing and washouts causing high drag & torque variations.",
        mitigation: "Pre-treated mud with nut plug and fine cellulosic fibers. Added 3% lubricant to reduce torque from 24 kft-lbs to 16 kft-lbs.",
        reportRef: "DDR-OIL-MOR-45 Day 51"
      }
    ]
  },
  {
    id: "NHK-124",
    name: "OIL-NHK-124",
    field: "Naharkatiya",
    lat: 27.3050,
    lng: 95.3180,
    distKm: 2.3,
    td: 3580,
    year: 2022,
    status: "Oil Producer",
    casingProgram: "20\"@155m, 13-3/8\"@1470m, 9-5/8\"@2740m, 7\"@3570m",
    mudWeightAvg: "11.4 - 11.9 ppg",
    hazard: "Gas Kick & Well Influx @ 3420m",
    riskLevel: "danger",
    formationTops: { Girujan: 1505, Tipam: 2110, Barail: 2740, Kopili: 3390 },
    incidents: [
      {
        depth: 3420,
        formation: "Kopili Shale (Basal Member)",
        type: "Gas Influx / Kick (SIDPP 320 psi)",
        lossRate: "Pit gain +22 bbls",
        nptHrs: 28,
        rootCause: "Underbalanced drilling into overpressured localized gas pocket in Kopili sand stringer.",
        mitigation: "Shut in well via Annular BOP. Circulated out kick using Wait & Weight method. Weighted up active mud from 11.8 ppg to 12.5 ppg.",
        reportRef: "WCR-OIL-NHK-124 / Well Control Log"
      }
    ]
  },
  {
    id: "JOR-12",
    name: "OIL-JOR-12",
    field: "Jorajan",
    lat: 27.2710,
    lng: 95.3720,
    distKm: 4.4,
    td: 3950,
    year: 2020,
    status: "Oil Producer",
    casingProgram: "20\"@150m, 13-3/8\"@1520m, 9-5/8\"@2790m, 7\"@3940m",
    mudWeightAvg: "11.7 - 12.1 ppg",
    hazard: "Drill Bit Premature Wear in Chert",
    riskLevel: "warning",
    formationTops: { Girujan: 1530, Tipam: 2160, Barail: 2790, Kopili: 3460 },
    incidents: [
      {
        depth: 3120,
        formation: "Barail Hard Sand",
        type: "Severe Bit Ring-Out & Low ROP",
        lossRate: "Nil",
        nptHrs: 18,
        rootCause: "High quartz and chert nodules caused catastrophic cutter delamination on standard PDC bit.",
        mitigation: "Tripped out string, replaced with heavy-duty Hybrid Roller Cone/PDC bit with conical diamond inserts.",
        reportRef: "DDR-OIL-JOR-12 Day 62"
      }
    ]
  },
  {
    id: "KUS-04",
    name: "OIL-KUS-04",
    field: "Kusijan",
    lat: 27.3200,
    lng: 95.3480,
    distKm: 3.9,
    td: 3720,
    year: 2021,
    status: "Oil Producer",
    casingProgram: "20\"@145m, 13-3/8\"@1495m, 9-5/8\"@2765m, 7\"@3710m",
    mudWeightAvg: "11.6 - 11.9 ppg",
    hazard: "Smooth Drilling - Zero Major NPT",
    riskLevel: "normal",
    formationTops: { Girujan: 1512, Tipam: 2130, Barail: 2765, Kopili: 3415 },
    incidents: [
      {
        depth: 2890,
        formation: "Barail Sandstone",
        type: "Minor Seepage Loss (<5 bbl/hr)",
        lossRate: "4 bbls/hr",
        nptHrs: 2,
        rootCause: "Permeable sand layer. Self-healed with good filter cake.",
        mitigation: "Maintained API fluid loss < 4 cc/30min with modified starch additives.",
        reportRef: "WCR-OIL-KUS-04"
      }
    ]
  },
  {
    id: "DUL-19",
    name: "OIL-DUL-19",
    field: "Duliajan",
    lat: 27.3350,
    lng: 95.3100,
    distKm: 5.7,
    td: 3400,
    year: 2018,
    status: "Water Injection",
    casingProgram: "20\"@140m, 13-3/8\"@1460m, 9-5/8\"@2710m",
    mudWeightAvg: "11.3 - 11.7 ppg",
    hazard: "Casing Collapse in Girujan Shale",
    riskLevel: "warning",
    formationTops: { Girujan: 1490, Tipam: 2090, Barail: 2710, Kopili: 3370 },
    incidents: [
      {
        depth: 1840,
        formation: "Girujan Claystone",
        type: "Casing Ovality / Creep Stress",
        lossRate: "Nil",
        nptHrs: 32,
        rootCause: "Reactive swelling montmorillonite clay exerting anisotropic tectonic earth stress on 13-3/8\" casing.",
        mitigation: "Utilized high-collapse grade N-80 casing and upgraded to KCl-Polymer mud with glycol shale inhibitors.",
        reportRef: "WCR-OIL-DUL-19 / Casing Log"
      }
    ]
  },
  {
    id: "NHK-052",
    name: "OIL-NHK-052",
    field: "Naharkatiya",
    lat: 27.2650,
    lng: 95.2950,
    distKm: 4.6,
    td: 3880,
    year: 2017,
    status: "Oil Producer",
    casingProgram: "20\"@150m, 13-3/8\"@1500m, 9-5/8\"@2770m, 7\"@3870m",
    mudWeightAvg: "11.6 - 12.2 ppg",
    hazard: "Cement Channeling behind 9-5/8\" Casing",
    riskLevel: "warning",
    formationTops: { Girujan: 1525, Tipam: 2145, Barail: 2770, Kopili: 3440 },
    incidents: [
      {
        depth: 2770,
        formation: "Tipam / Barail Boundary",
        type: "Poor Cement Bond / Gas Migration",
        lossRate: "Nil",
        nptHrs: 46,
        rootCause: "Inadequate mud displacement efficiency and gas percolation prior to cement initial set.",
        mitigation: "Performed remedial squeeze cementing through casing perforations. Recommended latex gas-block additive for future offsets.",
        reportRef: "CBL/VDL Log Report NHK-052"
      }
    ]
  }
];

// Pre-loaded Knowledge Q&A database for RAG semantic queries
const RAG_KNOWLEDGE_BASE = {
  stuck_pipe_barail: {
    questionPattern: /stuck pipe|nhk-087|3040|differential|freed/i,
    answer: `**Historical Stuck Pipe Analysis in Barail Formation (Offset: OIL-NHK-087 @ 3,040m):**
- **Mechanism:** Differential sticking occurred across a 14m permeable Barail sand lens with excessive hydrostatic overbalance (ΔP = 520 psi). The drillstring remained static for 18 minutes during directional survey.
- **Formation Context:** Barail Coal-Shale intercalated with depleted sandstone members having high matrix permeability.
- **Immediate Resolution:** Spotted 50 bbls of Oil-Based Pipe-Freeing Surfactant Pill across the BHA. Worked string with downward jarring and maximum allowable overpull (120 klbs). The string was freed after 16 hours.
- **Proactive Recommendation for Current Well (OIL-NHK-EXP-502):**
  1. Maintain mud weight strictly between 11.6 - 11.8 ppg (avoid exceeding 12.0 ppg).
  2. Maintain low fluid loss (< 3.5 cc API) to minimize filter cake thickness.
  3. Enforce strict rig floor protocol: Continuous rotation (>80 RPM) and string movement; limit stationary time during survey/connections to < 2.5 minutes.`,
    citations: [
      { doc: "WCR-OIL-NHK-087.pdf", section: "Section 7: Well Incidents & Fishing Operations", score: "97.8%" },
      { doc: "DDR-OIL-NHK-087-Day49.pdf", section: "Operational Chronology (Depth: 3,040m)", score: "94.2%" }
    ]
  },
  mud_weight_barail: {
    questionPattern: /mud weight|barail|8-1\/2|program|recommendation/i,
    answer: `**Recommended Mud Weight & Drilling Hydraulics for 8-1/2" Section in Barail Formation:**
- **Optimal Mud Density Window:** **11.6 - 11.8 ppg (1.39 - 1.41 SG)**
- **Fracture Gradient Constraint:** Offset well logs indicate fracture breakdown at 12.3 ppg equiv in subsea coal seams. Exceeding 12.0 ppg risks severe lost circulation.
- **Pore Pressure:** Normal to slightly overpressured gas stringers (10.9 - 11.2 ppg equiv).
- **Mud System Chemistry:** High-Performance Water-Based Mud (HPWBM) with KCl (5-7%) + PHPA polymer and 20-25 ppb Calcium Carbonate (graded micro-fine & medium) to continuously seal micro-fractures in coal stringers.
- **ECD Management:** Keep Annular Velocity < 65 m/min to prevent Dynamic ECD exceeding 12.1 ppg.`,
    citations: [
      { doc: "OIL-Barail-MudProgram-Standard-2023.pdf", section: "Hydraulics & Mud Window Spec", score: "98.1%" },
      { doc: "WCR-OIL-MOR-45.pdf", section: "Mud Logging Summary", score: "93.5%" }
    ]
  },
  mud_loss_mor45: {
    questionPattern: /mor-45|mud loss|severe loss|2910|2908|cured/i,
    answer: `**Lost Circulation Mitigation in Barail Sandstone (Offset: OIL-MOR-45 @ 2,908m):**
- **Incident Summary:** Encountered 28 bbls/hr partial mud loss at 2,908m MD upon penetrating Barail upper sand member.
- **Root Cause:** Naturally micro-fractured sandstone coupled with high equivalent circulating density (ECD = 12.25 ppg).
- **Corrective Measure Applied:** Pre-treated active mud pits with 20 ppb Nut Plug and 10 ppb Medium Cellulosic Flakes. Pumped a 30 bbl engineered high-fluid loss squeeze pill.
- **Outcome:** Full returns regained within 4 hours. Casing was successfully run and cemented at planned depth with zero loss.`,
    citations: [
      { doc: "DDR-OIL-MOR-45-Day51.pdf", section: "Loss Mitigation Chronology", score: "96.4%" },
      { doc: "WCR-OIL-MOR-45.pdf", section: "Drilling Hydraulics & NPT", score: "91.8%" }
    ]
  },
  general_casing: {
    questionPattern: /casing|cementing|9-5\/8|7 inch|setting depth/i,
    answer: `**Offset Casing Setting & Cementing Practice for Upper Assam Basin:**
- **9-5/8" Intermediate Casing:** Set between **2,740m - 2,780m MD**, directly into the competent Top Barail marker to isolate the overlying Tipam water-bearing sands before penetrating high-risk Barail coal-shale sequences.
- **7" Production Liner / Casing:** Set at planned TD (3,650m - 3,900m MD) through the Kopili / Eocene carbonate sequences.
- **Cementing Best Practice:** Use gas-tight slurry (15.8 ppg class G cement + latex gas migration additive) across Barail gas stringers with 100% excess in washout intervals identified from 4-arm caliper logs.`,
    citations: [
      { doc: "OIL-Well-Engineering-Standard-Casing-2022.pdf", section: "Casing Program Design", score: "95.0%" },
      { doc: "WCR-OIL-NHK-108.pdf", section: "Casing & Cementing Records", score: "92.7%" }
    ]
  }
};

// ================= INITIALIZATION & EVENT BINDINGS =================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initNavigation();
  initLeafletMap();
  initOffsetWellList();
  initLookAheadSimulator();
  initStratigraphicCharts();
  initRiskAnalyticsCharts();
  initRagAssistant();
  initNptIncidentTable();
  initIngestionSimulator();
  initArchModal();

  // Trigger initial offset scan
  document.getElementById("btnTriggerScan")?.addEventListener("click", () => {
    scanOffsetRadius(STATE.queryRadiusKm);
  });
});

// ================= NAVIGATION HANDLER =================
function initNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      navButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add("active");
        lucide.createIcons();
        if (targetTab === "geospatial" && window.leafletMapInstance) {
          setTimeout(() => window.leafletMapInstance.invalidateSize(), 200);
        }
      }
    });
  });
}

// ================= LEAFLET MAP MODULE =================
let mapInstance = null;
let radiusCircle = null;
let wellMarkers = [];

function initLeafletMap() {
  const mapElement = document.getElementById("leafletMap");
  if (!mapElement) return;

  // Center on Upper Assam Oilfields (Naharkatiya / Duliajan)
  mapInstance = L.map("leafletMap", {
    center: [STATE.activeWell.lat, STATE.activeWell.lng],
    zoom: 12,
    zoomControl: true
  });
  window.leafletMapInstance = mapInstance;

  // Dark mode tile layer (CartoDB Dark Matter)
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a> | Oil India Limited NWIS',
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(mapInstance);

  // Add Active Well Marker with custom glowing icon
  const activeIcon = L.divIcon({
    className: "custom-active-pin",
    html: `<div style="background:#0284c7; width:18px; height:18px; border-radius:50%; border:3px solid #38bdf8; box-shadow:0 0 16px #38bdf8; animation:pulse-animation 1.5s infinite;"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  const activeMarker = L.marker([STATE.activeWell.lat, STATE.activeWell.lng], { icon: activeIcon })
    .addTo(mapInstance)
    .bindPopup(`
      <div style="color:#000; font-family:sans-serif; font-size:12px;">
        <strong style="color:#0284c7; font-size:13px;">${STATE.activeWell.name} (ACTIVE DRILLING)</strong><br>
        <b>Field:</b> ${STATE.activeWell.field}<br>
        <b>Current Depth:</b> ${STATE.activeWell.currentDepthMD} m TVD<br>
        <b>Formation:</b> ${STATE.activeWell.currentFormation}<br>
        <b>Mud Weight:</b> ${STATE.activeWell.mudWeight} ppg | <b>ROP:</b> ${STATE.activeWell.rop} m/hr
      </div>
    `);

  // Add Radius Range Circle
  radiusCircle = L.circle([STATE.activeWell.lat, STATE.activeWell.lng], {
    radius: STATE.queryRadiusKm * 1000,
    color: "#0ea5e9",
    fillColor: "#0284c7",
    fillOpacity: 0.08,
    weight: 2,
    dashArray: "6, 6"
  }).addTo(mapInstance);

  // Render Offset Wells
  renderOffsetMarkers();

  // Radius Slider Event Listener
  const radiusSlider = document.getElementById("radiusSlider");
  const radiusValue = document.getElementById("radiusValue");
  if (radiusSlider && radiusValue) {
    radiusSlider.addEventListener("input", (e) => {
      const r = parseFloat(e.target.value);
      STATE.queryRadiusKm = r;
      radiusValue.textContent = `${r.toFixed(1)} km`;
      if (radiusCircle) {
        radiusCircle.setRadius(r * 1000);
      }
      renderOffsetMarkers();
      renderOffsetWellList();
    });
  }

  // Filter dropdowns
  document.getElementById("targetFormationFilter")?.addEventListener("change", (e) => {
    STATE.targetFormationFilter = e.target.value;
    renderOffsetMarkers();
    renderOffsetWellList();
  });

  document.getElementById("riskFilter")?.addEventListener("change", (e) => {
    STATE.riskFilter = e.target.value;
    renderOffsetMarkers();
    renderOffsetWellList();
  });
}

function renderOffsetMarkers() {
  if (!mapInstance) return;

  // Clear existing markers
  wellMarkers.forEach(m => mapInstance.removeLayer(m));
  wellMarkers = [];

  const filteredWells = getFilteredOffsetWells();

  filteredWells.forEach(well => {
    let pinColor = "#10b981"; // normal
    if (well.riskLevel === "danger") pinColor = "#ef4444";
    else if (well.riskLevel === "warning") pinColor = "#f59e0b";

    const offsetIcon = L.divIcon({
      className: "custom-offset-pin",
      html: `<div style="background:${pinColor}; width:12px; height:12px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 8px ${pinColor};"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    const marker = L.marker([well.lat, well.lng], { icon: offsetIcon })
      .addTo(mapInstance)
      .bindPopup(`
        <div style="color:#000; font-family:sans-serif; font-size:12px; min-width:180px;">
          <strong style="font-size:13px;">${well.name}</strong> (${well.distKm} km away)<br>
          <b>TD:</b> ${well.td} m | <b>Status:</b> ${well.status}<br>
          <b>Hazard History:</b> <span style="color:${pinColor}; font-weight:700;">${well.hazard}</span><br>
          <button onclick="window.selectOffsetWell('${well.id}')" style="margin-top:6px; background:#0284c7; color:#fff; border:none; padding:3px 8px; border-radius:4px; cursor:pointer; font-size:11px;">
            Inspect Offset History
          </button>
        </div>
      `);

    marker.on("click", () => {
      selectOffsetWell(well.id);
    });

    wellMarkers.push(marker);
  });
}

function getFilteredOffsetWells() {
  return OFFSET_WELLS.filter(well => {
    const inRadius = well.distKm <= STATE.queryRadiusKm;
    let matchesRisk = true;
    if (STATE.riskFilter === "severe_loss") matchesRisk = well.hazard.toLowerCase().includes("loss");
    else if (STATE.riskFilter === "stuck_pipe") matchesRisk = well.hazard.toLowerCase().includes("stuck") || well.hazard.toLowerCase().includes("fishing");
    else if (STATE.riskFilter === "kick_gas") matchesRisk = well.hazard.toLowerCase().includes("kick") || well.hazard.toLowerCase().includes("influx");

    return inRadius && matchesRisk;
  });
}

function initOffsetWellList() {
  renderOffsetWellList();
}

function renderOffsetWellList() {
  const container = document.getElementById("offsetWellList");
  const matchedCount = document.getElementById("matchedCount");
  const offsetCountBadge = document.getElementById("offsetCountBadge");
  if (!container) return;

  const filtered = getFilteredOffsetWells();
  if (matchedCount) matchedCount.textContent = filtered.length;
  if (offsetCountBadge) offsetCountBadge.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:20px; text-align:center; color:#64748b;">No offset wells found within ${STATE.queryRadiusKm} km radius. Expand radius slider.</div>`;
    return;
  }

  container.innerHTML = filtered.map(well => {
    let tagClass = "tag-normal";
    if (well.riskLevel === "danger") tagClass = "tag-severe";
    else if (well.riskLevel === "warning") tagClass = "tag-warning";

    const isSelected = STATE.selectedOffsetWell && STATE.selectedOffsetWell.id === well.id;

    return `
      <div class="well-list-item ${isSelected ? 'selected' : ''}" onclick="window.selectOffsetWell('${well.id}')">
        <div class="item-head">
          <span class="well-name">${well.name}</span>
          <span class="dist-tag">${well.distKm} km | TD ${well.td}m</span>
        </div>
        <div class="item-metrics">
          <span>Field: ${well.field}</span>
          <span>Year: ${well.year}</span>
        </div>
        <div class="hazard-tag ${tagClass}">${well.hazard}</div>
      </div>
    `;
  }).join("");
}

window.selectOffsetWell = function(wellId) {
  const well = OFFSET_WELLS.find(w => w.id === wellId);
  if (!well) return;
  STATE.selectedOffsetWell = well;

  // Update detail drawer
  document.getElementById("detailWellTitle").textContent = `${well.name} - Detailed Offset Profile (${well.field} Field)`;
  document.getElementById("detTD").textContent = `${well.td} m TVD`;
  document.getElementById("detDist").textContent = `${well.distKm} km from Active Well`;
  document.getElementById("detYear").textContent = well.year;
  document.getElementById("detHazard").textContent = well.hazard;
  document.getElementById("detMud").textContent = well.mudWeightAvg;
  document.getElementById("detCasing").textContent = well.casingProgram;

  // Highlight in list
  renderOffsetWellList();

  // Center map on well
  if (mapInstance) {
    mapInstance.panTo([well.lat, well.lng]);
  }
};

function scanOffsetRadius(radius) {
  const count = getFilteredOffsetWells().length;
  alert(`Spatial Radar Scan Completed.\nFound ${count} historical offset wells within ${radius} km of active well ${STATE.activeWell.name}.\nRisk Profiles & Stratigraphic tops correlated.`);
}

// ================= LOOK-AHEAD DEPTH ALERTS MODULE =================
function initLookAheadSimulator() {
  const slider = document.getElementById("liveDepthSlider");
  const display = document.getElementById("sliderDepthDisplay");
  const autoDrillBtn = document.getElementById("btnAutoDrill");

  if (slider && display) {
    slider.addEventListener("input", (e) => {
      const depth = parseInt(e.target.value);
      updateDepthSimulation(depth);
    });
  }

  if (autoDrillBtn) {
    autoDrillBtn.addEventListener("click", () => {
      if (STATE.isAutoDrilling) {
        clearInterval(STATE.autoDrillInterval);
        STATE.isAutoDrilling = false;
        autoDrillBtn.innerHTML = `<i data-lucide="play"></i> Auto Drill Sim`;
        lucide.createIcons();
      } else {
        STATE.isAutoDrilling = true;
        autoDrillBtn.innerHTML = `<i data-lucide="pause"></i> Pause Sim`;
        lucide.createIcons();

        STATE.autoDrillInterval = setInterval(() => {
          let curr = parseInt(slider.value);
          if (curr >= 3780) curr = 1500;
          curr += 15;
          slider.value = curr;
          updateDepthSimulation(curr);
        }, 600);
      }
    });
  }

  // Initial update
  updateDepthSimulation(STATE.activeWell.currentDepthMD);
}

function updateDepthSimulation(depth) {
  STATE.activeWell.currentDepthMD = depth;
  const sliderDisplay = document.getElementById("sliderDepthDisplay");
  const topLiveDepth = document.getElementById("topLiveDepth");
  if (sliderDisplay) sliderDisplay.textContent = depth.toLocaleString();
  if (topLiveDepth) topLiveDepth.textContent = `${depth.toLocaleString()} m`;

  // Update lithology position marker (scale 1500m to 4000m)
  const marker = document.getElementById("lithoCurrentDepthMarker");
  const minD = 1500;
  const maxD = 4000;
  const pct = Math.min(Math.max(((depth - minD) / (maxD - minD)) * 100, 2), 98);
  if (marker) {
    marker.style.top = `${pct}%`;
    const label = marker.querySelector(".marker-label");
    if (label) label.textContent = `BIT @ ${depth}m`;
  }

  // Evaluate Active Alerts within ±150m depth window
  evaluateLookAheadAlerts(depth);
}

function evaluateLookAheadAlerts(currentDepth) {
  const lookaheadFeed = document.getElementById("lookaheadAlertFeed");
  const activeAlertCount = document.getElementById("activeAlertCount");
  const alertBadge = document.getElementById("alertCountBadge");
  const currentHorizonTag = document.getElementById("currentHorizonTag");
  const sopContainer = document.getElementById("sopContentContainer");
  const quotesContainer = document.getElementById("historicalDdrQuotes");

  // Determine current formation
  let formation = "Girujan Clay (1,500m - 2,100m)";
  if (currentDepth >= 2100 && currentDepth < 2750) formation = "Tipam Sandstone (2,100m - 2,750m)";
  else if (currentDepth >= 2750 && currentDepth < 3400) formation = "Barail Coal-Shale / Main Sand (2,750m - 3,400m)";
  else if (currentDepth >= 3400) formation = "Kopili Shale & Eocene Carbonate (3,400m - 4,000m)";

  if (currentHorizonTag) currentHorizonTag.textContent = formation;
  const topFormation = document.getElementById("topFormation");
  if (topFormation) topFormation.textContent = formation.split(" (")[0];

  // Scan offset well incidents within depth threshold [currentDepth - 80, currentDepth + 150]
  const windowAlerts = [];

  OFFSET_WELLS.forEach(well => {
    well.incidents.forEach(inc => {
      const depthDiff = inc.depth - currentDepth;
      if (depthDiff >= -50 && depthDiff <= 160) {
        windowAlerts.push({
          wellName: well.name,
          distKm: well.distKm,
          incident: inc,
          depthDiff: depthDiff
        });
      }
    });
  });

  if (activeAlertCount) activeAlertCount.textContent = windowAlerts.length;
  if (alertBadge) alertBadge.textContent = windowAlerts.length;

  // Render Alert Feed Cards
  if (windowAlerts.length === 0) {
    if (lookaheadFeed) {
      lookaheadFeed.innerHTML = `
        <div style="padding:24px; text-align:center; background:var(--bg-surface); border-radius:8px; border:1px dashed var(--border-color);">
          <i data-lucide="shield-check" style="width:36px; height:36px; color:#10b981; margin-bottom:8px;"></i>
          <h4 style="color:#10b981;">No Major Offset Hazard in Next 150m</h4>
          <p class="text-muted" style="font-size:12px; margin-top:4px;">Historical drilling parameters in this interval were stable across nearby Naharkatiya wells.</p>
        </div>
      `;
      lucide.createIcons();
    }
    return;
  }

  if (lookaheadFeed) {
    lookaheadFeed.innerHTML = windowAlerts.map(a => {
      const isCritical = a.depthDiff >= 0 && a.depthDiff <= 80;
      const cardType = isCritical ? "alert-critical" : "alert-warning";
      const icon = isCritical ? "alert-triangle" : "info";
      const diffText = a.depthDiff >= 0 ? `Expected in ${a.depthDiff}m ahead (@ ${a.incident.depth}m)` : `Active in current zone (@ ${a.incident.depth}m)`;

      return `
        <div class="alert-card-item ${cardType}">
          <div class="alert-title-row">
            <h4><i data-lucide="${icon}"></i> ${a.incident.type}</h4>
            <span class="alert-proximity-tag">${diffText}</span>
          </div>
          <p class="alert-desc">${a.incident.rootCause}</p>
          <div class="alert-source-wells">
            <span class="well-pill">Source: ${a.wellName} (${a.distKm} km away)</span>
            <span class="well-pill">Formation: ${a.incident.formation}</span>
            <span class="well-pill">Ref: ${a.incident.reportRef}</span>
          </div>
        </div>
      `;
    }).join("");
    lucide.createIcons();
  }

  // Update SOP & Excerpt with the highest priority alert
  const primaryAlert = windowAlerts[0];
  if (sopContainer && primaryAlert) {
    sopContainer.innerHTML = `
      <div class="sop-item warning">
        <div class="sop-head">
          <span class="sop-badge"><i data-lucide="shield-alert"></i> PROACTIVE OPERATIONAL SOP</span>
          <span class="sop-meta">Correlated with ${primaryAlert.wellName} (${primaryAlert.distKm} km)</span>
        </div>
        <h4>Mitigation Protocol for ${primaryAlert.incident.type} (Target: ${primaryAlert.incident.depth}m)</h4>
        <p>${primaryAlert.incident.mitigation}</p>
        <div class="sop-checklist">
          <div class="check-item"><i data-lucide="check-circle-2"></i> Verify mud weight & ECD window before drilling within 30m of marker.</div>
          <div class="check-item"><i data-lucide="check-circle-2"></i> Pre-condition pit with recommended LCM or shale inhibitors.</div>
          <div class="check-item"><i data-lucide="check-circle-2"></i> Maintain continuous string movement during surveys and connections.</div>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  if (quotesContainer && primaryAlert) {
    quotesContainer.innerHTML = `
      <div class="quote-item">
        <span class="quote-source">${primaryAlert.wellName} | ${primaryAlert.incident.reportRef}:</span>
        <p>"${primaryAlert.incident.rootCause} Applied: ${primaryAlert.incident.mitigation}"</p>
      </div>
    `;
  }
}

// ================= STRATIGRAPHIC CORRELATION CHARTS =================
function initStratigraphicCharts() {
  createSyntheticWellLog("chartActiveWellTrack", [45, 60, 52, 95, 110, 85, 42, 55, 120, 135, 75, 50], [10.5, 10.8, 11.2, 11.5, 11.8, 11.8, 11.9, 12.1], "#38bdf8");
  createSyntheticWellLog("chartOffset1Track", [42, 58, 50, 92, 115, 88, 40, 52, 118, 138, 70, 48], [10.4, 10.7, 11.1, 11.4, 11.7, 12.2, 11.7, 11.8], "#10b981");
  createSyntheticWellLog("chartOffset2Track", [48, 62, 55, 98, 108, 82, 45, 58, 122, 130, 78, 52], [10.5, 10.9, 11.3, 11.6, 12.0, 12.4, 12.1, 12.0], "#f59e0b");
  createSyntheticWellLog("chartOffset3Track", [44, 59, 53, 94, 112, 86, 41, 54, 119, 136, 72, 49], [10.4, 10.8, 11.2, 11.5, 11.8, 11.9, 12.0, 12.3], "#a855f7");
}

function createSyntheticWellLog(canvasId, grData, mudData, primaryColor) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1500m", "1700m", "1900m", "2100m", "2300m", "2500m", "2750m", "2900m", "3100m", "3300m", "3500m", "3700m"],
      datasets: [
        {
          label: "Gamma Ray (API)",
          data: grData,
          borderColor: primaryColor,
          backgroundColor: primaryColor + "22",
          borderWidth: 1.8,
          pointRadius: 0,
          tension: 0.35,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#64748b", font: { size: 9 } }
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#64748b", font: { size: 9 } },
          suggestedMin: 0,
          suggestedMax: 150
        }
      }
    }
  });
}

// ================= RISK ANALYTICS CHARTS =================
function initRiskAnalyticsCharts() {
  // Chart 1: Multi Risk Profile vs Depth
  const ctxRisk = document.getElementById("chartRiskProfile");
  if (ctxRisk) {
    new Chart(ctxRisk, {
      type: "line",
      data: {
        labels: ["1500m", "1800m", "2100m", "2400m", "2750m", "2900m", "3100m", "3400m", "3700m", "4000m"],
        datasets: [
          {
            label: "Mud Loss Probability (%)",
            data: [8, 12, 15, 34, 52, 85, 45, 20, 15, 10],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: "Stuck Pipe Index (%)",
            data: [5, 10, 18, 22, 45, 64, 78, 30, 25, 20],
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: "Gas Influx / Kick (%)",
            data: [2, 4, 6, 8, 12, 18, 24, 75, 40, 30],
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            borderWidth: 2,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#94a3b8", font: { size: 11 } } }
        },
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" }, max: 100 }
        }
      }
    });
  }

  // Chart 2: Pore vs Fracture Gradient Window
  const ctxPore = document.getElementById("chartPoreFractureWindow");
  if (ctxPore) {
    new Chart(ctxPore, {
      type: "line",
      data: {
        labels: ["1500m", "2000m", "2500m", "2750m", "2910m", "3200m", "3450m", "3800m"],
        datasets: [
          {
            label: "Fracture Gradient (ppg equiv)",
            data: [13.8, 13.5, 13.1, 12.8, 12.3, 13.0, 13.6, 14.2],
            borderColor: "#f87171",
            borderDash: [5, 5],
            fill: false
          },
          {
            label: "Pore Pressure (ppg equiv)",
            data: [9.2, 9.5, 9.8, 10.4, 10.8, 11.2, 12.2, 12.4],
            borderColor: "#38bdf8",
            borderDash: [5, 5],
            fill: false
          },
          {
            label: "Active Mud Weight (ppg)",
            data: [10.5, 10.8, 11.2, 11.6, 11.8, 11.9, 12.6, 12.8],
            borderColor: "#10b981",
            borderWidth: 3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#94a3b8", font: { size: 11 } } }
        },
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" }, min: 8, max: 16 }
        }
      }
    });
  }
}

// ================= AI RAG ASSISTANT MODULE =================
function initRagAssistant() {
  const input = document.getElementById("ragQueryInput");
  const sendBtn = document.getElementById("btnSendRagQuery");

  if (sendBtn && input) {
    sendBtn.addEventListener("click", () => {
      const q = input.value.trim();
      if (q) {
        handleUserRagQuery(q);
        input.value = "";
      }
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
  }
}

window.sendPredefinedQuery = function(queryText) {
  const input = document.getElementById("ragQueryInput");
  if (input) input.value = queryText;
  handleUserRagQuery(queryText);
};

function handleUserRagQuery(query) {
  const container = document.getElementById("chatMessageContainer");
  if (!container) return;

  // Append user bubble
  const userHtml = `
    <div class="message-bubble user-message">
      <div class="msg-avatar"><i data-lucide="user"></i></div>
      <div class="msg-body">
        <p>${query}</p>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", userHtml);
  lucide.createIcons();
  container.scrollTop = container.scrollHeight;

  // Simulate AI Thinking & Vector Search
  setTimeout(() => {
    let matchedKnowledge = RAG_KNOWLEDGE_BASE.mud_weight_barail; // fallback

    if (RAG_KNOWLEDGE_BASE.stuck_pipe_barail.questionPattern.test(query)) {
      matchedKnowledge = RAG_KNOWLEDGE_BASE.stuck_pipe_barail;
    } else if (RAG_KNOWLEDGE_BASE.mud_loss_mor45.questionPattern.test(query)) {
      matchedKnowledge = RAG_KNOWLEDGE_BASE.mud_loss_mor45;
    } else if (RAG_KNOWLEDGE_BASE.general_casing.questionPattern.test(query)) {
      matchedKnowledge = RAG_KNOWLEDGE_BASE.general_casing;
    } else if (RAG_KNOWLEDGE_BASE.mud_weight_barail.questionPattern.test(query)) {
      matchedKnowledge = RAG_KNOWLEDGE_BASE.mud_weight_barail;
    }

    const botHtml = `
      <div class="message-bubble bot-message">
        <div class="msg-avatar"><i data-lucide="bot"></i></div>
        <div class="msg-body">
          ${formatMarkdown(matchedKnowledge.answer)}
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", botHtml);
    lucide.createIcons();
    container.scrollTop = container.scrollHeight;

    // Update Citations Card
    updateCitationsList(matchedKnowledge.citations);
  }, 450);
}

function updateCitationsList(citations) {
  const container = document.getElementById("citationListContainer");
  const badge = document.getElementById("citationCountBadge");
  if (!container) return;

  if (badge) badge.textContent = `${citations.length} Docs Cited`;

  container.innerHTML = citations.map(c => `
    <div class="citation-item">
      <div class="cite-head">
        <span class="cite-doc"><i data-lucide="file-check"></i> ${c.doc}</span>
        <span class="cite-score">Match: ${c.score}</span>
      </div>
      <div class="cite-section">${c.section}</div>
      <p class="cite-text">"Retrieved grounding passage from Oil India institutional repository with verified metadata."</p>
    </div>
  `).join("");
  lucide.createIcons();
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n- /g, '<br>• ')
    .replace(/\n/g, '<br>');
}

// ================= NPT & INCIDENTS TABLE MODULE =================
function initNptIncidentTable() {
  const tbody = document.getElementById("incidentTableBody");
  const searchInput = document.getElementById("incidentSearchInput");
  if (!tbody) return;

  let allIncidents = [];
  OFFSET_WELLS.forEach(well => {
    well.incidents.forEach(inc => {
      allIncidents.push({
        wellName: well.name,
        distKm: well.distKm,
        depth: inc.depth,
        formation: inc.formation,
        type: inc.type,
        nptHrs: inc.nptHrs,
        rootCause: inc.rootCause,
        mitigation: inc.mitigation,
        ref: inc.reportRef
      });
    });
  });

  function renderTable(filterText = "") {
    const q = filterText.toLowerCase();
    const rows = allIncidents.filter(item => {
      return item.wellName.toLowerCase().includes(q) ||
             item.type.toLowerCase().includes(q) ||
             item.formation.toLowerCase().includes(q) ||
             item.rootCause.toLowerCase().includes(q);
    });

    tbody.innerHTML = rows.map(r => `
      <tr>
        <td><strong>${r.wellName}</strong></td>
        <td>${r.distKm} km</td>
        <td><strong>${r.depth} m</strong></td>
        <td>${r.formation}</td>
        <td><span class="badge ${r.type.includes('Loss') || r.type.includes('Stuck') ? 'badge-danger' : 'badge-warning'}">${r.type}</span></td>
        <td><strong>${r.nptHrs} hrs</strong></td>
        <td style="max-width:240px; font-size:11px;">${r.rootCause}</td>
        <td style="max-width:240px; font-size:11px; color:#38bdf8;">${r.mitigation}</td>
        <td><button class="btn btn-sm btn-outline" onclick="window.sendPredefinedQuery('Explain incident ${r.type} in ${r.wellName}')">AI Query</button></td>
      </tr>
    `).join("");
  }

  renderTable();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderTable(e.target.value);
    });
  }
}

// ================= OCR & INGESTION PIPELINE MODULE =================
function initIngestionSimulator() {
  const btn = document.getElementById("btnSimulateUpload");
  const progressBox = document.getElementById("ingestionProgressBox");
  const stepTitle = document.getElementById("progressStepTitle");
  const progressBar = document.getElementById("ingestProgressBar");
  const codeOutput = document.getElementById("codeExtractionOutput");

  if (!btn) return;

  btn.addEventListener("click", () => {
    if (progressBox) progressBox.style.display = "block";

    const steps = [
      { pct: "25%", text: "Step 1/4: Performing OCR & LayoutLM Table Detection on WCR-OIL-NHK-124.pdf..." },
      { pct: "50%", text: "Step 2/4: Extracting Geological Tops & Mud Densities via LLM Schema Parser..." },
      { pct: "75%", text: "Step 3/4: Indexing Operational NPT Incidents into Vector DB & PostGIS..." },
      { pct: "100%", text: "Step 4/4: Ingestion Complete! Well metadata integrated into eRTMAC-NWIS." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        if (progressBar) progressBar.style.width = steps[currentStep].pct;
        if (stepTitle) stepTitle.textContent = steps[currentStep].text;
        currentStep++;
      } else {
        clearInterval(interval);
        if (codeOutput) {
          codeOutput.textContent = JSON.stringify({
            status: "SUCCESSFULLY_INGESTED",
            well_header: {
              well_name: "OIL-NHK-124",
              field: "Naharkatiya",
              spud_date: "2022-04-10",
              total_depth_md: 3580.0,
              total_depth_tvd: 3576.4
            },
            extracted_formation_tops: [
              { formation: "Girujan Clay", top_md: 1505.0 },
              { formation: "Tipam Sandstone", top_md: 2110.0 },
              { formation: "Barail Coal-Shale", top_md: 2740.0 },
              { formation: "Kopili Shale", top_md: 3390.0 }
            ],
            extracted_incidents: [
              {
                depth_md: 3420.0,
                formation: "Kopili Shale (Basal)",
                hazard_type: "Gas Influx / Kick (SIDPP 320 psi)",
                mitigation_applied: "Wait & Weight method, Weighted up to 12.5 ppg"
              }
            ],
            vector_embeddings_generated: 48,
            postgis_geom: "POINT(95.3180 27.3050)"
          }, null, 2);
        }
      }
    }, 600);
  });
}

// ================= ARCHITECTURE MODAL =================
function initArchModal() {
  const btnOpen = document.getElementById("btnHelpWalkthrough");
  const btnClose = document.getElementById("btnCloseArchModal");
  const modal = document.getElementById("archModal");
  const content = document.getElementById("archModalContent");

  if (!modal) return;

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      if (content) {
        content.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="background:rgba(2,132,199,0.1); border:1px solid #0284c7; padding:12px; border-radius:8px;">
              <h4 style="color:#38bdf8; margin-bottom:4px;">Project Overview: WISDOM (Well Intelligence & Drilling Operations Memory)</h4>
              <p>WISDOM connects real-time active drilling telemetry (eRTMAC) with institutional memory stored across decades of historical Well Completion Reports (WCRs), Daily Drilling Reports (DDRs), and offset well logs in the Upper Assam basin.</p>
            </div>

            <h4 style="color:#fff;">Core Technological Pillars</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="background:var(--bg-surface); padding:12px; border-radius:6px; border:1px solid var(--border-color);">
                <strong style="color:#38bdf8;">1. Multi-Modal Document Extraction & OCR Pipeline</strong>
                <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Extracts unstructured legacy drilling reports, mud logging sheets, and lithology tables into structured JSON schemas using PaddleOCR/Docling + LayoutLM + LLM Structured Extraction.</p>
              </div>
              <div style="background:var(--bg-surface); padding:12px; border-radius:6px; border:1px solid var(--border-color);">
                <strong style="color:#38bdf8;">2. Geospatial Spatial Discovery Engine</strong>
                <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">PostGIS spatial index enabling dynamic radius queries (<code>ST_DWithin</code>) to isolate relevant offset wells, fault blocks, and structural corridors.</p>
              </div>
              <div style="background:var(--bg-surface); padding:12px; border-radius:6px; border:1px solid var(--border-color);">
                <strong style="color:#38bdf8;">3. Stratigraphic Depth Correlation</strong>
                <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Dynamic TVD/MD alignment correlating active drilling bit depth with offset formation tops (Girujan, Tipam, Barail, Kopili, Eocene).</p>
              </div>
              <div style="background:var(--bg-surface); padding:12px; border-radius:6px; border:1px solid var(--border-color);">
                <strong style="color:#38bdf8;">4. Proactive Look-Ahead Alerting & RAG</strong>
                <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Predictive ML models (Loss, Stuck Pipe, Kick) combined with a grounding RAG assistant providing immediate operational mitigation SOPs.</p>
              </div>
            </div>

            <h4 style="color:#fff;">Full Tech Stack</h4>
            <ul style="padding-left:20px; font-size:12px; color:var(--text-secondary);">
              <li><strong>Frontend:</strong> Modern Vanilla JS/CSS Design System, Leaflet GIS, Chart.js, Lucide Icons (Can easily be wrapped in React/Vite/Next.js)</li>
              <li><strong>Backend API:</strong> Python FastAPI / Uvicorn (Asynchronous REST & WebSocket streaming)</li>
              <li><strong>Databases:</strong> PostgreSQL + PostGIS (Spatial indexing), TimescaleDB (eRTMAC time-series drilling logs), ChromaDB / Milvus (Vector embeddings)</li>
              <li><strong>AI & NLP:</strong> LangChain / LlamaIndex, Gemini / OpenAI APIs, PaddleOCR / Tesseract, Scikit-learn & XGBoost</li>
            </ul>
          </div>
        `;
      }
      modal.style.display = "flex";
      lucide.createIcons();
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
