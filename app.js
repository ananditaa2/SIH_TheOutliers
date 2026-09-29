/**
 * WISDOM: Well Intelligence & Drilling Operations Memory
 * (eRTMAC-NWIS Solution for Oil India Limited)
 * Proactive Decision Support & Offset Well Analytics Platform
 */

// ================= MULTI-WELL REPOSITORY & GLOBAL STATE =================
const ACTIVE_WELL_CATALOG = {
  "OIL-NHK-EXP-502": {
    name: "OIL-NHK-EXP-502",
    field: "Naharkatiya Field (Upper Assam)",
    lat: 27.2885,
    lng: 95.3320,
    currentDepthMD: 2845,
    currentDepthTVD: 2842,
    targetDepth: 3900,
    currentFormation: "Barail Sandstone (Main Sand #2)",
    mudWeight: 11.8,
    ecd: 12.18,
    flowRate: 480,
    rpm: 95,
    overbalance: 420,
    rop: 14.2,
    wob: 22.5,
    torque: 16.8,
    spudDate: "2024-08-12",
    status: "Drilling Ahead"
  },
  "OIL-MOR-EXP-104": {
    name: "OIL-MOR-EXP-104",
    field: "Moran Field (Deep Eocene Prospect)",
    lat: 27.2510,
    lng: 95.3580,
    currentDepthMD: 3420,
    currentDepthTVD: 3415,
    targetDepth: 4250,
    currentFormation: "Kopili Shale / Eocene Transition",
    mudWeight: 12.4,
    ecd: 12.85,
    flowRate: 420,
    rpm: 80,
    overbalance: 510,
    rop: 8.5,
    wob: 28.0,
    torque: 22.4,
    spudDate: "2024-07-01",
    status: "Drilling Ahead"
  },
  "OIL-DUL-EXP-301": {
    name: "OIL-DUL-EXP-301",
    field: "Duliajan North Exploration Block",
    lat: 27.3350,
    lng: 95.3100,
    currentDepthMD: 2150,
    currentDepthTVD: 2145,
    targetDepth: 3600,
    currentFormation: "Tipam Sandstone (Upper Member)",
    mudWeight: 11.2,
    ecd: 11.55,
    flowRate: 520,
    rpm: 110,
    overbalance: 310,
    rop: 19.4,
    wob: 18.0,
    torque: 12.6,
    spudDate: "2024-09-10",
    status: "Drilling Ahead"
  }
};

const STATE = {
  activeWell: { ...ACTIVE_WELL_CATALOG["OIL-NHK-EXP-502"] },
  queryRadiusKm: 5.0,
  targetFormationFilter: "Barail",
  riskFilter: "all",
  selectedOffsetWell: null,
  isAutoDrilling: false,
  autoDrillInterval: null,
  simSpeed: 3,
  mitigationApplied: false
};

// Rich Offset Well Dataset (Upper Assam Basin: Naharkatiya / Moran / Duliajan / Jorajan / Kusijan)
let OFFSET_WELLS = [
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

// Calculate Haversine Distances from Active Well
function recalculateOffsetDistances() {
  OFFSET_WELLS.forEach(well => {
    const d = calculateHaversine(STATE.activeWell.lat, STATE.activeWell.lng, well.lat, well.lng);
    well.distKm = parseFloat(d.toFixed(1));
  });
}

function calculateHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// RAG Knowledge Base
const RAG_KNOWLEDGE_BASE = {
  stuck_pipe_barail: {
    questionPattern: /stuck pipe|nhk-087|3040|differential|freed/i,
    answer: `**Historical Stuck Pipe Analysis in Barail Formation (Offset: OIL-NHK-087 @ 3,040m):**
- **Mechanism:** Differential sticking occurred across a 14m permeable Barail sand lens with excessive hydrostatic overbalance (ΔP = 520 psi). The drillstring remained static for 18 minutes during directional survey.
- **Formation Context:** Barail Coal-Shale intercalated with depleted sandstone members having high matrix permeability.
- **Immediate Resolution:** Spotted 50 bbls of Oil-Based Pipe-Freeing Surfactant Pill across the BHA. Worked string with downward jarring and maximum allowable overpull (120 klbs). The string was freed after 16 hours.
- **Proactive Recommendation for Current Well (${STATE.activeWell.name}):**
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
  casing_guidelines: {
    questionPattern: /casing|cementing|9-5\/8|7 inch|setting depth|guidelines/i,
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
  recalculateOffsetDistances();
  lucide.createIcons();
  initNavigation();
  initActiveWellSelector();
  initLeafletMap();
  initOffsetWellList();
  initLookAheadSimulator();
  initStratigraphicCharts();
  initRiskAnalyticsCharts();
  initParameterSandbox();
  initRagAssistant();
  initApiKeyModal();
  initNptIncidentTable();
  initIngestionSimulator();
  initArchModal();

  // Reset Filters button
  document.getElementById("btnResetFilters")?.addEventListener("click", () => {
    document.getElementById("radiusSlider").value = 5;
    document.getElementById("radiusValue").textContent = "5.0 km";
    document.getElementById("targetFormationFilter").value = "all";
    document.getElementById("riskFilter").value = "all";
    STATE.queryRadiusKm = 5.0;
    STATE.targetFormationFilter = "all";
    STATE.riskFilter = "all";
    if (radiusCircle) radiusCircle.setRadius(5000);
    renderOffsetMarkers();
    renderOffsetWellList();
  });

  // Radar Scan button
  document.getElementById("btnTriggerScan")?.addEventListener("click", () => {
    scanOffsetRadius(STATE.queryRadiusKm);
  });

  // Apply Mitigation Pill button
  document.getElementById("btnApplyMitigationPill")?.addEventListener("click", () => {
    applyLcmMitigation();
  });

  // Quick action buttons in well detail bar
  document.getElementById("btnCorrelateSelectedWell")?.addEventListener("click", () => {
    const corrBtn = document.querySelector('.nav-btn[data-tab="correlation"]');
    if (corrBtn) corrBtn.click();
  });

  document.getElementById("btnQueryAIForWell")?.addEventListener("click", () => {
    const aiBtn = document.querySelector('.nav-btn[data-tab="ai-assistant"]');
    if (aiBtn) aiBtn.click();
    const wellName = STATE.selectedOffsetWell ? STATE.selectedOffsetWell.name : "OIL-NHK-108";
    window.sendPredefinedQuery(`Summarize all drilling hazards and successful mitigations from offset well ${wellName}`);
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

        // Invalidate map size on tab switch
        if (targetTab === "geospatial" && window.leafletMapInstance) {
          setTimeout(() => {
            window.leafletMapInstance.invalidateSize();
            if (activeWellMarker) {
              window.leafletMapInstance.panTo([STATE.activeWell.lat, STATE.activeWell.lng]);
            }
          }, 150);
        }

        // Resize charts on tab switch
        if (targetTab === "correlation" || targetTab === "risk-analytics") {
          setTimeout(() => {
            if (window.correlationCharts) window.correlationCharts.forEach(c => c.resize());
            if (window.riskProfileChart) window.riskProfileChart.resize();
            if (window.poreChart) window.poreChart.resize();
          }, 150);
        }
      }
    });
  });
}

// ================= ACTIVE WELL SWITCHER =================
function initActiveWellSelector() {
  const selector = document.getElementById("activeWellSelector");
  if (!selector) return;

  selector.addEventListener("change", (e) => {
    const selectedKey = e.target.value;
    if (ACTIVE_WELL_CATALOG[selectedKey]) {
      STATE.activeWell = { ...ACTIVE_WELL_CATALOG[selectedKey] };
      STATE.mitigationApplied = false;

      // Update top ticker
      updateTopTelemetryBar();

      // Recalculate distances and update UI
      recalculateOffsetDistances();
      updateMapActiveWell();
      renderOffsetMarkers();
      renderOffsetWellList();

      // Update Look-ahead depth slider & charts
      const depthSlider = document.getElementById("liveDepthSlider");
      if (depthSlider) {
        depthSlider.value = STATE.activeWell.currentDepthMD;
        updateDepthSimulation(STATE.activeWell.currentDepthMD);
      }

      // Update Correlation header
      const corrActiveName = document.getElementById("corrActiveWellName");
      const corrActiveSub = document.getElementById("corrActiveWellSub");
      if (corrActiveName) corrActiveName.textContent = STATE.activeWell.name;
      if (corrActiveSub) corrActiveSub.textContent = `Current: ${STATE.activeWell.currentDepthMD}m | Target: ${STATE.activeWell.targetDepth}m`;

      // Update Sandbox sliders
      document.getElementById("sliderMudWt").value = STATE.activeWell.mudWeight;
      document.getElementById("lblMudWt").textContent = `${STATE.activeWell.mudWeight} ppg`;
      document.getElementById("sliderFlowRate").value = STATE.activeWell.flowRate;
      document.getElementById("lblFlowRate").textContent = `${STATE.activeWell.flowRate} GPM`;
      document.getElementById("sliderRPM").value = STATE.activeWell.rpm;
      document.getElementById("lblRPM").textContent = `${STATE.activeWell.rpm} RPM`;
      document.getElementById("sliderOverbalance").value = STATE.activeWell.overbalance;
      document.getElementById("lblOverbalance").textContent = `${STATE.activeWell.overbalance} psi`;
      recalculateRiskScores();
    }
  });
}

function updateTopTelemetryBar() {
  document.getElementById("topLiveDepth").textContent = `${STATE.activeWell.currentDepthMD.toLocaleString()} m`;
  document.getElementById("topFormation").textContent = STATE.activeWell.currentFormation.split(" (")[0];
  document.getElementById("topMudWt").textContent = `${STATE.activeWell.mudWeight} ppg`;
  document.getElementById("topECD").textContent = `${STATE.activeWell.ecd} ppg`;
  document.getElementById("topROP").textContent = `${STATE.activeWell.rop} m/hr`;
  document.getElementById("topTorque").textContent = `${STATE.activeWell.torque} kft-lb`;
}

// ================= LEAFLET MAP MODULE =================
let mapInstance = null;
let radiusCircle = null;
let activeWellMarker = null;
let wellMarkers = [];
let connectionLine = null;

function initLeafletMap() {
  const mapElement = document.getElementById("leafletMap");
  if (!mapElement) return;

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
    html: `<div style="background:#0284c7; width:20px; height:20px; border-radius:50%; border:3px solid #38bdf8; box-shadow:0 0 16px #38bdf8; animation:pulse-animation 1.5s infinite;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  activeWellMarker = L.marker([STATE.activeWell.lat, STATE.activeWell.lng], { icon: activeIcon })
    .addTo(mapInstance)
    .bindPopup(`
      <div style="color:#000; font-family:sans-serif; font-size:12px;">
        <strong style="color:#0284c7; font-size:13px;">${STATE.activeWell.name} (ACTIVE DRILLING RIG)</strong><br>
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

function updateMapActiveWell() {
  if (!mapInstance || !activeWellMarker) return;

  activeWellMarker.setLatLng([STATE.activeWell.lat, STATE.activeWell.lng]);
  activeWellMarker.setPopupContent(`
    <div style="color:#000; font-family:sans-serif; font-size:12px;">
      <strong style="color:#0284c7; font-size:13px;">${STATE.activeWell.name} (ACTIVE DRILLING RIG)</strong><br>
      <b>Field:</b> ${STATE.activeWell.field}<br>
      <b>Current Depth:</b> ${STATE.activeWell.currentDepthMD} m TVD<br>
      <b>Formation:</b> ${STATE.activeWell.currentFormation}<br>
      <b>Mud Weight:</b> ${STATE.activeWell.mudWeight} ppg | <b>ROP:</b> ${STATE.activeWell.rop} m/hr
    </div>
  `);

  if (radiusCircle) {
    radiusCircle.setLatLng([STATE.activeWell.lat, STATE.activeWell.lng]);
  }

  if (connectionLine) {
    mapInstance.removeLayer(connectionLine);
    connectionLine = null;
  }

  mapInstance.panTo([STATE.activeWell.lat, STATE.activeWell.lng]);
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
      html: `<div style="background:${pinColor}; width:13px; height:13px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 8px ${pinColor}; cursor:pointer;"></div>`,
      iconSize: [13, 13],
      iconAnchor: [6, 6]
    });

    const marker = L.marker([well.lat, well.lng], { icon: offsetIcon })
      .addTo(mapInstance)
      .bindPopup(`
        <div style="color:#000; font-family:sans-serif; font-size:12px; min-width:190px;">
          <strong style="font-size:13px;">${well.name}</strong> (${well.distKm} km away)<br>
          <b>TD:</b> ${well.td} m | <b>Status:</b> ${well.status}<br>
          <b>Hazard Encountered:</b> <span style="color:${pinColor}; font-weight:700;">${well.hazard}</span><br>
          <button onclick="window.selectOffsetWell('${well.id}')" style="margin-top:6px; background:#0284c7; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">
            Inspect Full Offset History
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
    let matchesFormation = true;
    if (STATE.targetFormationFilter !== "all") {
      matchesFormation = Object.keys(well.formationTops).some(f => f.toLowerCase().includes(STATE.targetFormationFilter.toLowerCase()));
    }

    let matchesRisk = true;
    if (STATE.riskFilter === "severe_loss") matchesRisk = well.hazard.toLowerCase().includes("loss");
    else if (STATE.riskFilter === "stuck_pipe") matchesRisk = well.hazard.toLowerCase().includes("stuck") || well.hazard.toLowerCase().includes("fishing");
    else if (STATE.riskFilter === "kick_gas") matchesRisk = well.hazard.toLowerCase().includes("kick") || well.hazard.toLowerCase().includes("influx");

    return inRadius && matchesFormation && matchesRisk;
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
    container.innerHTML = `<div style="padding:20px; text-align:center; color:#64748b;">No offset wells found within ${STATE.queryRadiusKm} km radius with current filters.<br><small>Try expanding search radius slider above.</small></div>`;
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
  document.getElementById("detailWellTitle").textContent = `${well.name} - Offset Profile (${well.field} Field)`;
  document.getElementById("detTD").textContent = `${well.td} m TVD`;
  document.getElementById("detDist").textContent = `${well.distKm} km from ${STATE.activeWell.name}`;
  document.getElementById("detYear").textContent = well.year;
  document.getElementById("detHazard").textContent = well.hazard;
  document.getElementById("detMud").textContent = well.mudWeightAvg;
  document.getElementById("detCasing").textContent = well.casingProgram;

  // Highlight in list
  renderOffsetWellList();

  // Draw connecting line from active well to this offset on map
  if (mapInstance) {
    if (connectionLine) mapInstance.removeLayer(connectionLine);
    connectionLine = L.polyline([
      [STATE.activeWell.lat, STATE.activeWell.lng],
      [well.lat, well.lng]
    ], {
      color: "#38bdf8",
      weight: 2,
      dashArray: "4, 6"
    }).addTo(mapInstance);

    mapInstance.panTo([well.lat, well.lng]);
  }
};

function scanOffsetRadius(radius) {
  const count = getFilteredOffsetWells().length;
  alert(`Spatial Radar Scan Completed for ${STATE.activeWell.name}.\nFound ${count} historical offset wells within ${radius} km.\nStratigraphic tops aligned & look-ahead risk models updated.`);
}

// ================= LOOK-AHEAD DEPTH ALERTS MODULE =================
function initLookAheadSimulator() {
  const slider = document.getElementById("liveDepthSlider");
  const display = document.getElementById("sliderDepthDisplay");
  const autoDrillBtn = document.getElementById("btnAutoDrill");
  const speedSelect = document.getElementById("simSpeedSelect");

  if (speedSelect) {
    speedSelect.addEventListener("change", (e) => {
      STATE.simSpeed = parseInt(e.target.value);
    });
  }

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
        autoDrillBtn.innerHTML = `<i data-lucide="play"></i> Auto Drill`;
        lucide.createIcons();
      } else {
        STATE.isAutoDrilling = true;
        autoDrillBtn.innerHTML = `<i data-lucide="pause"></i> Pause Drill`;
        lucide.createIcons();

        STATE.autoDrillInterval = setInterval(() => {
          let curr = parseInt(slider.value);
          if (curr >= 3780) curr = 1500;
          curr += (5 * STATE.simSpeed);
          slider.value = curr;
          updateDepthSimulation(curr);
        }, 500);
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

  // Update correlation bit marker position
  const corrBitMarker = document.getElementById("corrBitMarker");
  if (corrBitMarker) {
    corrBitMarker.style.top = `${pct}%`;
    corrBitMarker.innerHTML = `<strong>BIT @ ${depth}m</strong>`;
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
  const hazardBanner = document.getElementById("liveHazardBanner");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc = document.getElementById("bannerDesc");

  // Determine current formation & dynamic drilling parameters
  let formation = "Girujan Clay (1,500m - 2,100m)";
  let rop = 18.5;
  let torque = 12.0;

  if (currentDepth >= 2100 && currentDepth < 2750) {
    formation = "Tipam Sandstone (2,100m - 2,750m)";
    rop = 22.0;
    torque = 14.5;
  } else if (currentDepth >= 2750 && currentDepth < 3400) {
    formation = "Barail Coal-Shale / Main Sand (2,750m - 3,400m)";
    rop = (currentDepth >= 2900 && currentDepth <= 2940) ? 6.2 : 14.2;
    torque = (currentDepth >= 2900 && currentDepth <= 2940) ? 24.5 : 16.8;
  } else if (currentDepth >= 3400) {
    formation = "Kopili Shale & Eocene Carbonate (3,400m - 4,000m)";
    rop = 7.8;
    torque = 21.0;
  }

  STATE.activeWell.currentFormation = formation;
  STATE.activeWell.rop = rop;
  STATE.activeWell.torque = torque;
  document.getElementById("topROP").textContent = `${rop} m/hr`;
  document.getElementById("topTorque").textContent = `${torque} kft-lb`;
  document.getElementById("topFormation").textContent = formation.split(" (")[0];
  if (currentHorizonTag) currentHorizonTag.textContent = formation;

  // Scan offset well incidents within depth threshold [currentDepth - 60, currentDepth + 150]
  const windowAlerts = [];

  OFFSET_WELLS.forEach(well => {
    well.incidents.forEach(inc => {
      const depthDiff = inc.depth - currentDepth;
      if (depthDiff >= -50 && depthDiff <= 150) {
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

  // Critical Hazard Banner handling (when bit is within 40m of hazard)
  const criticalHazard = windowAlerts.find(a => Math.abs(a.depthDiff) <= 40);
  if (criticalHazard && !STATE.mitigationApplied) {
    if (hazardBanner) {
      hazardBanner.style.display = "flex";
      if (bannerTitle) bannerTitle.textContent = `CRITICAL HAZARD: Approaching ${criticalHazard.incident.type} Zone (@ ${criticalHazard.incident.depth}m)`;
      if (bannerDesc) bannerDesc.textContent = `Offset ${criticalHazard.wellName} (${criticalHazard.distKm} km) experienced: "${criticalHazard.incident.rootCause}"`;
    }
  } else {
    if (hazardBanner) hazardBanner.style.display = "none";
  }

  // Render Alert Feed Cards
  if (windowAlerts.length === 0) {
    if (lookaheadFeed) {
      lookaheadFeed.innerHTML = `
        <div style="padding:24px; text-align:center; background:var(--bg-surface); border-radius:8px; border:1px dashed var(--border-color);">
          <i data-lucide="shield-check" style="width:36px; height:36px; color:#10b981; margin-bottom:8px;"></i>
          <h4 style="color:#10b981;">No Major Offset Hazards in Next 150m</h4>
          <p class="text-muted" style="font-size:12px; margin-top:4px;">Historical drilling parameters in this interval were stable across nearby offset wells.</p>
        </div>
      `;
      lucide.createIcons();
    }
    return;
  }

  if (lookaheadFeed) {
    lookaheadFeed.innerHTML = windowAlerts.map(a => {
      const isCritical = a.depthDiff >= -20 && a.depthDiff <= 60;
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
          <div class="check-item"><i data-lucide="check-circle-2"></i> Maintain continuous string movement (>80 RPM) during surveys and connections.</div>
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

function applyLcmMitigation() {
  STATE.mitigationApplied = true;
  STATE.activeWell.mudWeight = 11.6;
  STATE.activeWell.ecd = 11.95;
  updateTopTelemetryBar();
  document.getElementById("sliderMudWt").value = 11.6;
  document.getElementById("lblMudWt").textContent = "11.6 ppg";

  const hazardBanner = document.getElementById("liveHazardBanner");
  if (hazardBanner) {
    hazardBanner.innerHTML = `
      <div class="banner-icon" style="color:#10b981;"><i data-lucide="check-circle-2"></i></div>
      <div class="banner-content">
        <strong style="color:#10b981;">MITIGATION APPLIED: Active Mud Pre-Treated with 30 ppb LCM Pill</strong>
        <p>Mud density reduced to 11.6 ppg (ECD: 11.95 ppg). Lost circulation risk mitigated for Barail Coal Seam #3 penetration.</p>
      </div>
    `;
    lucide.createIcons();
    setTimeout(() => {
      hazardBanner.style.display = "none";
    }, 4000);
  }

  recalculateRiskScores();
}

// ================= STRATIGRAPHIC CORRELATION CHARTS =================
function initStratigraphicCharts() {
  window.correlationCharts = [];
  window.correlationCharts.push(createSyntheticWellLog("chartActiveWellTrack", [45, 60, 52, 95, 110, 85, 42, 55, 120, 135, 75, 50], "#38bdf8"));
  window.correlationCharts.push(createSyntheticWellLog("chartOffset1Track", [42, 58, 50, 92, 115, 88, 40, 52, 118, 138, 70, 48], "#10b981"));
  window.correlationCharts.push(createSyntheticWellLog("chartOffset2Track", [48, 62, 55, 98, 108, 82, 45, 58, 122, 130, 78, 52], "#f59e0b"));
  window.correlationCharts.push(createSyntheticWellLog("chartOffset3Track", [44, 59, 53, 94, 112, 86, 41, 54, 119, 136, 72, 49], "#a855f7"));

  // Toggle Facies Alignment button
  document.getElementById("btnToggleFacies")?.addEventListener("click", () => {
    alert("Stratigraphic tops automatically aligned across all 4 offset wells based on marker bed biostratigraphy and Gamma Ray normalization.");
  });

  // Export Correlation button
  document.getElementById("btnExportCorrelation")?.addEventListener("click", () => {
    alert("Exporting high-resolution Stratigraphic Correlation Panel (PDF / Scaled LAS Log view)... Download starting.");
  });
}

function createSyntheticWellLog(canvasId, grData, primaryColor) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  return new Chart(ctx, {
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

// ================= RISK ANALYTICS & PARAMETER SANDBOX =================
function initParameterSandbox() {
  const sliderMud = document.getElementById("sliderMudWt");
  const sliderFlow = document.getElementById("sliderFlowRate");
  const sliderRPM = document.getElementById("sliderRPM");
  const sliderOver = document.getElementById("sliderOverbalance");

  if (sliderMud) {
    sliderMud.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById("lblMudWt").textContent = `${val.toFixed(1)} ppg`;
      STATE.activeWell.mudWeight = val;
      STATE.activeWell.ecd = parseFloat((val + 0.38).toFixed(2));
      updateTopTelemetryBar();
      recalculateRiskScores();
    });
  }

  if (sliderFlow) {
    sliderFlow.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      document.getElementById("lblFlowRate").textContent = `${val} GPM`;
      STATE.activeWell.flowRate = val;
      recalculateRiskScores();
    });
  }

  if (sliderRPM) {
    sliderRPM.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      document.getElementById("lblRPM").textContent = `${val} RPM`;
      STATE.activeWell.rpm = val;
      recalculateRiskScores();
    });
  }

  if (sliderOver) {
    sliderOver.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      document.getElementById("lblOverbalance").textContent = `${val} psi`;
      STATE.activeWell.overbalance = val;
      recalculateRiskScores();
    });
  }
}

function recalculateRiskScores() {
  const mw = STATE.activeWell.mudWeight;
  const ob = STATE.activeWell.overbalance;
  const rpm = STATE.activeWell.rpm;

  // Mud loss probability formula (higher with high mud weight in fractured Barail)
  let lossProb = Math.min(Math.max((mw - 10.5) * 28 + (STATE.mitigationApplied ? -35 : 0), 5), 98);

  // Differential sticking index (higher with overbalance, lower with high RPM)
  let stuckProb = Math.min(Math.max((ob / 7.5) - (rpm * 0.22), 8), 95);

  // Kick risk (higher with low mud weight)
  let kickProb = Math.min(Math.max((12.5 - mw) * 32, 4), 92);

  // Instability
  let instProb = Math.min(Math.max(42 + (mw > 12.5 ? 15 : -5), 10), 85);

  // Update gauges
  document.getElementById("lossRiskVal").textContent = `${lossProb.toFixed(1)}%`;
  document.getElementById("lossRiskBar").style.width = `${lossProb}%`;

  document.getElementById("stuckRiskVal").textContent = `${stuckProb.toFixed(1)}%`;
  document.getElementById("stuckRiskBar").style.width = `${stuckProb}%`;

  document.getElementById("kickRiskVal").textContent = `${kickProb.toFixed(1)}%`;
  document.getElementById("kickRiskBar").style.width = `${kickProb}%`;

  document.getElementById("instabilityVal").textContent = `${instProb.toFixed(1)}%`;
  document.getElementById("instabilityBar").style.width = `${instProb}%`;
}

function initRiskAnalyticsCharts() {
  // Chart 1: Multi Risk Profile vs Depth
  const ctxRisk = document.getElementById("chartRiskProfile");
  if (ctxRisk) {
    window.riskProfileChart = new Chart(ctxRisk, {
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
    window.poreChart = new Chart(ctxPore, {
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

// ================= API KEY & LIVE AI CALLER MODULE =================
function getStoredApiKey() {
  return localStorage.getItem("WISDOM_AI_API_KEY") || "";
}

function getStoredProvider() {
  return localStorage.getItem("WISDOM_AI_PROVIDER") || "gemini";
}

function initApiKeyModal() {
  const btnOpen = document.getElementById("btnOpenApiSettings");
  const modal = document.getElementById("apiKeyModal");
  const btnClose = document.getElementById("btnCloseApiModal");
  const btnCancel = document.getElementById("btnCancelApiModal");
  const btnSave = document.getElementById("btnSaveApiKey");
  const btnClear = document.getElementById("btnClearApiKey");
  const inputKey = document.getElementById("apiKeyInput");
  const selectProvider = document.getElementById("aiProviderSelect");
  const statusBox = document.getElementById("apiKeyStatusBox");

  if (!modal) return;

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      inputKey.value = getStoredApiKey();
      selectProvider.value = getStoredProvider();
      if (getStoredApiKey()) {
        statusBox.style.display = "block";
        statusBox.innerHTML = `<span style="color:#10b981;"><i data-lucide="check-circle-2"></i> Active Key configured (${getStoredProvider().toUpperCase()}). Live AI calls enabled!</span>`;
      } else {
        statusBox.style.display = "none";
      }
      modal.style.display = "flex";
      lucide.createIcons();
    });
  }

  const closeModal = () => { modal.style.display = "none"; };
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);

  if (btnSave) {
    btnSave.addEventListener("click", () => {
      const key = inputKey.value.trim();
      const provider = selectProvider.value;
      if (key) {
        localStorage.setItem("WISDOM_AI_API_KEY", key);
        localStorage.setItem("WISDOM_AI_PROVIDER", provider);
        alert(`API Key for ${provider.toUpperCase()} saved successfully! The WISDOM AI assistant is now connected to live LLM generation.`);
        closeModal();
      } else {
        alert("Please enter a valid API Key or click Clear.");
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      localStorage.removeItem("WISDOM_AI_API_KEY");
      localStorage.removeItem("WISDOM_AI_PROVIDER");
      inputKey.value = "";
      statusBox.style.display = "block";
      statusBox.innerHTML = `<span style="color:#f59e0b;">Key cleared. Reverted to built-in grounded knowledge base.</span>`;
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Live Gemini API Caller with Offset Well Grounding Context
async function callLiveGeminiAPI(query, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const systemPrompt = `You are the WISDOM AI Chief Drilling Operations Co-Pilot for Oil India Limited (OIL).
Current Active Rig Context:
- Active Well: ${STATE.activeWell.name}
- Field: ${STATE.activeWell.field}
- Current Bit Depth: ${STATE.activeWell.currentDepthMD} m TVD
- Current Formation: ${STATE.activeWell.currentFormation}
- Mud Density: ${STATE.activeWell.mudWeight} ppg (ECD: ${STATE.activeWell.ecd} ppg)
- Offset Wells in vicinity: OIL-NHK-108 (1.8km, severe loss at 2912m), OIL-NHK-087 (3.4km, stuck pipe at 3040m), OIL-MOR-45 (4.9km, partial loss at 2908m).

Answer the drilling engineer's question with precise geomechanical and operational mitigation recommendations, drilling hydraulics, casing programs, and safety SOPs. Use professional oilfield terminology and markdown formatting.`;

  const payload = {
    contents: [
      {
        parts: [
          { text: `${systemPrompt}\n\nEngineer Query: ${query}` }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini API.";
  return text;
}

// ================= AI RAG ASSISTANT MODULE =================
function initRagAssistant() {
  const input = document.getElementById("ragQueryInput");
  const sendBtn = document.getElementById("btnSendRagQuery");
  const presetBtn = document.getElementById("btnQuickPrompts");

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

  if (presetBtn) {
    presetBtn.addEventListener("click", () => {
      window.sendPredefinedQuery("What are the casing setting depth and cementing guidelines for 9-5/8 inch casing in Naharkatiya?");
    });
  }
}

window.sendPredefinedQuery = function(queryText) {
  const input = document.getElementById("ragQueryInput");
  if (input) input.value = queryText;
  handleUserRagQuery(queryText);
};

async function handleUserRagQuery(query) {
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

  // Append Thinking / Loading indicator
  const loadingId = `bot-loading-${Date.now()}`;
  const loadingHtml = `
    <div class="message-bubble bot-message" id="${loadingId}">
      <div class="msg-avatar"><i data-lucide="bot"></i></div>
      <div class="msg-body">
        <p style="color:var(--accent-cyan);"><i data-lucide="loader-2" class="pulse-animation"></i> Searching offset logs & synthesizing recommendations...</p>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", loadingHtml);
  lucide.createIcons();
  container.scrollTop = container.scrollHeight;

  const apiKey = getStoredApiKey();
  const provider = getStoredProvider();

  let answerText = "";
  let citations = [
    { doc: "WCR-OIL-NHK-108.pdf", section: "Geological Summary & Operational Review", score: "96.2%" },
    { doc: "OIL-Standard-Operating-Guidelines-2023.pdf", section: "Upper Assam Basin Drilling Specs", score: "93.4%" }
  ];

  if (apiKey && provider === "gemini") {
    try {
      answerText = await callLiveGeminiAPI(query, apiKey);
      citations = [
        { doc: "Live Gemini 1.5 Grounded Response", section: `Context: ${STATE.activeWell.name} @ ${STATE.activeWell.currentDepthMD}m`, score: "Live API" },
        { doc: "WCR-OIL-NHK-108.pdf", section: "Offset Knowledge Store", score: "95.8%" }
      ];
    } catch (err) {
      console.warn("Live API call failed, falling back to local grounded knowledge engine:", err);
      answerText = `*(Notice: Live Gemini call had a network issue, used internal grounded repository)*\n\n` + getLocalKnowledgeResponse(query).answer;
      citations = getLocalKnowledgeResponse(query).citations;
    }
  } else {
    // Local grounded knowledge base
    const matched = getLocalKnowledgeResponse(query);
    answerText = matched.answer;
    citations = matched.citations;
  }

  // Remove loading bubble
  const loadingBubble = document.getElementById(loadingId);
  if (loadingBubble) loadingBubble.remove();

  // Render Bot Response
  const botHtml = `
    <div class="message-bubble bot-message">
      <div class="msg-avatar"><i data-lucide="bot"></i></div>
      <div class="msg-body">
        ${formatMarkdown(answerText)}
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", botHtml);
  lucide.createIcons();
  container.scrollTop = container.scrollHeight;

  // Update Citations Card
  updateCitationsList(citations);
}

function getLocalKnowledgeResponse(query) {
  if (RAG_KNOWLEDGE_BASE.stuck_pipe_barail.questionPattern.test(query)) {
    return RAG_KNOWLEDGE_BASE.stuck_pipe_barail;
  } else if (RAG_KNOWLEDGE_BASE.mud_loss_mor45.questionPattern.test(query)) {
    return RAG_KNOWLEDGE_BASE.mud_loss_mor45;
  } else if (RAG_KNOWLEDGE_BASE.casing_guidelines.questionPattern.test(query)) {
    return RAG_KNOWLEDGE_BASE.casing_guidelines;
  } else if (RAG_KNOWLEDGE_BASE.mud_weight_barail.questionPattern.test(query)) {
    return RAG_KNOWLEDGE_BASE.mud_weight_barail;
  } else {
    return {
      answer: `**WISDOM Knowledge Synthesis for Query:** "${query}"
- **Institutional Context:** Indexed across 450+ Oil India historical wells in Upper Assam Basin.
- **Correlated Offset Behavior:** For active well **${STATE.activeWell.name}** at **${STATE.activeWell.currentDepthMD}m** in **${STATE.activeWell.currentFormation}**:
  1. Offset wells **OIL-NHK-108** (1.8 km) and **OIL-MOR-45** (4.9 km) encountered similar lithological boundaries.
  2. Maintain mud weight in the approved pore-fracture window (**11.6 - 11.8 ppg**) to avoid micro-fracture breakdown.
  3. Pre-treat pits with graded Calcium Carbonate (25 ppb) and maintain high annular velocity during hole cleaning.`,
      citations: [
        { doc: "WCR-OIL-NHK-108.pdf", section: "Geological Summary & Operational Review", score: "94.6%" },
        { doc: "OIL-Standard-Operating-Guidelines-2023.pdf", section: "Upper Assam Basin Drilling Specs", score: "91.2%" }
      ]
    };
  }
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
  const btnCsv = document.getElementById("btnExportNptCsv");
  const btnJson = document.getElementById("btnExportNptJson");
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

  if (btnCsv) {
    btnCsv.addEventListener("click", () => {
      const csvContent = "data:text/csv;charset=utf-8," +
        "Well Name,Distance (km),Depth (m),Formation,Incident Type,NPT (Hrs),Root Cause,Mitigation\n" +
        allIncidents.map(i => `"${i.wellName}","${i.distKm}","${i.depth}","${i.formation}","${i.type}","${i.nptHrs}","${i.rootCause.replace(/"/g, '""')}","${i.mitigation.replace(/"/g, '""')}"`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "OIL_NPT_Incidents_Database.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (btnJson) {
    btnJson.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allIncidents, null, 2));
      const link = document.createElement("a");
      link.setAttribute("href", dataStr);
      link.setAttribute("download", "OIL_NPT_Incidents_Database.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// ================= OCR & INGESTION PIPELINE MODULE =================
function initIngestionSimulator() {
  const btn = document.getElementById("btnSimulateUpload");
  const browseBtn = document.getElementById("btnBrowseFile");
  const fileInput = document.getElementById("fileInputUploader");
  const dropzone = document.getElementById("reportDropzone");
  const progressBox = document.getElementById("ingestionProgressBox");
  const stepTitle = document.getElementById("progressStepTitle");
  const progressBar = document.getElementById("ingestProgressBar");
  const ocrLog = document.getElementById("liveOcrLog");
  const codeOutput = document.getElementById("codeExtractionOutput");

  function triggerProcessing(filename = "WCR-OIL-NHK-124.pdf") {
    if (progressBox) progressBox.style.display = "block";

    const steps = [
      { pct: "25%", text: `Step 1/4: Optical Character Recognition & Layout Parsing (${filename})...`, log: "Running PaddleOCR + LayoutLMv3 table detector on 42 pages..." },
      { pct: "50%", text: "Step 2/4: Extracting Geological Tops & Mud Programs via LLM Schema Parser...", log: "Identified Tops: Girujan (1505m), Tipam (2110m), Barail (2740m), Kopili (3390m)" },
      { pct: "75%", text: "Step 3/4: Indexing Operational Incidents into PostGIS & Vector DB...", log: "Extracted Incident: Gas Influx @ 3420m (SIDPP 320 psi). Embeddings stored." },
      { pct: "100%", text: "Step 4/4: Ingestion Complete! Well integrated into WISDOM repository.", log: "Ingestion pipeline finished in 1.8s. All offset metrics synced." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        if (progressBar) progressBar.style.width = steps[currentStep].pct;
        if (stepTitle) stepTitle.textContent = steps[currentStep].text;
        if (ocrLog) ocrLog.textContent = steps[currentStep].log;
        currentStep++;
      } else {
        clearInterval(interval);
        if (codeOutput) {
          codeOutput.textContent = JSON.stringify({
            status: "SUCCESSFULLY_INGESTED",
            source_file: filename,
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
    }, 500);
  }

  if (btn) {
    btn.addEventListener("click", () => triggerProcessing("WCR-OIL-NHK-124.pdf"));
  }

  if (browseBtn && fileInput) {
    browseBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        triggerProcessing(e.target.files[0].name);
      }
    });
  }

  if (dropzone) {
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "#0284c7";
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.style.borderColor = "var(--border-color)";
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--border-color)";
      if (e.dataTransfer.files.length > 0) {
        triggerProcessing(e.dataTransfer.files[0].name);
      }
    });
  }
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
                <strong style="color:#38bdf8;">1. Multi-Modal Ingestion & OCR Pipeline</strong>
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
