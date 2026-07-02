// ─── Mobius — Main App Entry ────────────────────────────────────────────────
import Globe from "globe.gl";
import * as d3 from "d3";
import type {
  CountrySummary,
  CountryDetail,
  ScenarioResult,
  ScenarioTemplate,
  Signal,
} from "./types";
import { api } from "./api";
import "./styles.css";
import { hasEntityDashboard, openEntityDashboard } from "./entity-modal";

// ── State ────────────────────────────────────────────────────────────────────
let globeInstance: ReturnType<typeof Globe> | null = null;
let allCountries: CountrySummary[] = [];
let selectedCountry: CountryDetail | null = null;
let scenarioTemplates: ScenarioTemplate[] = [];
let activeTab: "dashboard" | "scenario" | "signals" = "dashboard";

// ── Color helpers ────────────────────────────────────────────────────────────
const riskColor = d3
  .scaleSequential(d3.interpolateRdYlGn)
  .domain([100, 0]); // 0=green (safe), 100=red (risky)

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getRiskColor(score: number): string {
  return riskColor(score) as string;
}

function fmtPct(v: number, sign = true): string {
  const s = sign && v > 0 ? "+" : "";
  return `${s}${v.toFixed(1)}%`;
}

function fmtNum(v: number, dec = 1): string {
  return v.toFixed(dec);
}

// ── Globe Setup ──────────────────────────────────────────────────────────────
async function initGlobe(): Promise<void> {
  const container = document.getElementById("globe-container")!;

  globeInstance = Globe({ animateIn: true })(container)
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
    .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
    .showAtmosphere(true)
    .atmosphereColor("#1a4a7a")
    .atmosphereAltitude(0.18)
    .width(container.clientWidth)
    .height(container.clientHeight);

  // Auto-resize
  window.addEventListener("resize", () => {
    globeInstance!.width(container.clientWidth).height(container.clientHeight);
  });

  // Load countries and plot pins
  try {
    allCountries = await api.countries.list();
    plotCountryPins(allCountries);
  } catch (err) {
    showError("Failed to load country data. Is the backend running?");
    console.error(err);
  }
}

function plotCountryPins(countries: CountrySummary[]): void {
  if (!globeInstance) return;

  globeInstance
    .pointsData(countries)
    .pointLat((d: object) => (d as CountrySummary).lat)
    .pointLng((d: object) => (d as CountrySummary).lng)
    .pointColor((d: object) => getRiskColor((d as CountrySummary).macro.country_risk_score))
    .pointAltitude(0.02)
    .pointRadius(0.5)
    .pointLabel((d: object) => {
      const c = d as CountrySummary;
      return `
        <div class="globe-tooltip">
          <div class="gt-header">${c.flag} ${c.name}</div>
          <div class="gt-row"><span>GDP Growth</span><span>${fmtPct(c.macro.gdp_growth)}</span></div>
          <div class="gt-row"><span>Inflation</span><span>${fmtPct(c.macro.inflation, false)}</span></div>
          <div class="gt-row"><span>Rate</span><span>${fmtPct(c.macro.interest_rate, false)}</span></div>
          <div class="gt-row"><span>Risk Score</span><span>${c.macro.country_risk_score}/100</span></div>
          <div class="gt-cta">Click to explore →</div>
        </div>
      `;
    })
    .onPointClick((d: object) => {
      selectCountry((d as CountrySummary).iso2);
    });

  // Add arcs connecting high-opportunity countries to simulate "flow of capital"
  const highOpp = countries
    .filter((c) => c.macro.country_risk_score < 50 && c.macro.gdp_growth > 4)
    .slice(0, 6);

  const arcs = [];
  for (let i = 0; i < highOpp.length - 1; i++) {
    arcs.push({
      startLat: highOpp[i].lat,
      startLng: highOpp[i].lng,
      endLat: highOpp[i + 1].lat,
      endLng: highOpp[i + 1].lng,
      color: ["#f0c040", "#f0c040"],
    });
  }

  globeInstance
    .arcsData(arcs)
    .arcColor("color")
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashAnimateTime(3000)
    .arcStroke(0.4)
    .arcAltitudeAutoScale(0.3);
}

// ── Country Selection ────────────────────────────────────────────────────────
async function selectCountry(iso2: string): Promise<void> {
  const panel = document.getElementById("side-panel")!;
  panel.classList.add("loading");
  showPanel();

  try {
    selectedCountry = await api.countries.get(iso2, true);
    renderDashboard(selectedCountry);
    setActiveTab("dashboard");

    // Fly globe to country
    if (globeInstance && selectedCountry) {
      globeInstance.pointOfView(
        { lat: selectedCountry.lat, lng: selectedCountry.lng, altitude: 1.8 },
        1500
      );
    }
  } catch (err) {
    showError(`Could not load data for ${iso2}`);
    console.error(err);
  } finally {
    panel.classList.remove("loading");
  }
}

function showPanel(): void {
  document.getElementById("side-panel")!.classList.add("open");
  document.getElementById("empty-state")!.style.display = "none";
}

function setActiveTab(tab: "dashboard" | "scenario" | "signals"): void {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  document.getElementById(`tab-${tab}`)!.classList.add("active");
  document.querySelectorAll(".tab-content").forEach((el) => (el as HTMLElement).style.display = "none");
  document.getElementById(`content-${tab}`)!.style.display = "block";
}

// ── Dashboard Renderer ───────────────────────────────────────────────────────
function renderDashboard(c: CountryDetail): void {
  const m = c.macro;

  document.getElementById("country-header")!.innerHTML = `
    <span class="country-flag">${c.flag}</span>
    <div class="country-title">
      <h2>${c.name}</h2>
      <span class="country-region">${c.region} · ${c.currency}</span>
    </div>
    <div class="risk-badge" style="background:${getRiskColor(m.country_risk_score)}22;border-color:${getRiskColor(m.country_risk_score)}">
      <span style="color:${getRiskColor(m.country_risk_score)}">${m.country_risk_score}</span>
      <small>Risk</small>
    </div>
  `;
  

  // KPI grid
  const kpiData = [
    { label: "GDP Growth", value: fmtPct(m.gdp_growth), delta: m.gdp_growth, icon: "📈" },
    { label: "Inflation", value: fmtPct(m.inflation, false), delta: -m.inflation, icon: "🔥" },
    { label: "Policy Rate", value: fmtPct(m.interest_rate, false), delta: 0, icon: "🏦" },
    { label: "Govt Debt", value: `${fmtNum(m.govt_debt_pct_gdp)}% GDP`, delta: -m.govt_debt_pct_gdp / 10, icon: "📋" },
    { label: "Budget", value: `${fmtPct(m.budget_deficit_pct_gdp)} GDP`, delta: m.budget_deficit_pct_gdp, icon: "💰" },
    { label: "Curr. Acct", value: `${fmtPct(m.current_account_pct_gdp)} GDP`, delta: m.current_account_pct_gdp, icon: "⚖️" },
    { label: "FX vs USD", value: m.fx_vs_usd.toLocaleString(), delta: m.fx_change_1y_pct, icon: "💱" },
    { label: "Reserves", value: `$${fmtNum(m.foreign_reserves_bn)}bn`, delta: 0, icon: "🏛️" },
    { label: "Credit Rating", value: m.credit_rating, delta: 0, icon: "⭐" },
  ];

  document.getElementById("kpi-grid")!.innerHTML = kpiData
    .map(
      (k) => `
    <div class="kpi-card">
      <div class="kpi-icon">${k.icon}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      ${
        k.delta !== 0
          ? `<div class="kpi-delta ${k.delta > 0 ? "pos" : "neg"}">${k.delta > 0 ? "▲" : "▼"} ${Math.abs(k.delta).toFixed(1)}%</div>`
          : ""
      }
    </div>
  `
    )
    .join("");

  // Narrative
  document.getElementById("country-narrative")!.innerHTML = `
    <p>${c.narrative}</p>
  `;

  const existingBtn = document.getElementById("entity-deep-dive-btn");
  if (existingBtn) existingBtn.remove();
  if (hasEntityDashboard(c.iso2)) {
    const entityBtn = document.createElement("button");
    entityBtn.id = "entity-deep-dive-btn";
    entityBtn.textContent = "🏢 Open Anchor Entity Dashboard";
    entityBtn.style.cssText = `
      display: block;
      width: 100%;
      margin: 14px 0 0;
      padding: 10px 16px;
      background: rgba(201,151,75,0.12);
      border: 1px solid rgba(201,151,75,0.5);
      border-radius: 6px;
      color: #C9974B;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12px;
      cursor: pointer;
      text-align: left;
    `;
    entityBtn.addEventListener("click", () => openEntityDashboard(c.iso2));
    document.getElementById("country-narrative")!.appendChild(entityBtn);
  }

  // FX trend badge
  const fxColors: Record<string, string> = {
    appreciating: "#4ade80",
    stable: "#fbbf24",
    pegged: "#60a5fa",
    depreciating: "#f87171",
    stabilizing: "#a78bfa",
  };
  document.getElementById("fx-indicator")!.innerHTML = `
    <span class="fx-badge" style="background:${fxColors[m.fx_trend] ?? "#888"}22;color:${fxColors[m.fx_trend] ?? "#888"}">
      ${m.fx_trend.toUpperCase()} &nbsp;·&nbsp; ${fmtPct(m.fx_change_1y_pct)} YoY
    </span>
  `;

  // Sectors
  document.getElementById("sectors-panel")!.innerHTML = `
    <div class="sector-group">
      <div class="sector-title">🏭 Core Sectors</div>
      <div class="sector-tags">${c.sectors.top.map((s) => `<span class="tag tag-core">${s}</span>`).join("")}</div>
    </div>
    <div class="sector-group">
      <div class="sector-title">🚀 Opportunities</div>
      <div class="sector-tags">${c.sectors.opportunity.map((s) => `<span class="tag tag-opp">${s}</span>`).join("")}</div>
    </div>
    <div class="sector-group">
      <div class="sector-title">⚠️ Key Risks</div>
      <div class="sector-tags">${c.sectors.risk.map((s) => `<span class="tag tag-risk">${s}</span>`).join("")}</div>
    </div>
  `;

  // Policy events
  document.getElementById("policy-events")!.innerHTML = c.policy_events
    .map(
      (e) => `
    <div class="policy-event impact-${e.impact}">
      <div class="pe-dot"></div>
      <div class="pe-body">
        <div class="pe-date">${e.date}</div>
        <div class="pe-event">${e.event}</div>
      </div>
      <div class="pe-badge">${e.impact === "positive" ? "▲ Positive" : e.impact === "negative" ? "▼ Negative" : "◆ Neutral"}</div>
    </div>
  `
    )
    .join("");

  // Render mini chart
  renderMacroRadar(m);
}

// ── Radar / Bar Chart ────────────────────────────────────────────────────────
function renderMacroRadar(m: CountryDetail["macro"]): void {
  const canvas = document.getElementById("macro-chart") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const metrics = [
    { label: "GDP Growth", value: Math.min(Math.max(m.gdp_growth, -5), 12), max: 12, color: "#4ade80" },
    { label: "Inflation", value: Math.min(m.inflation, 50), max: 50, color: "#f87171", invert: true },
    { label: "Risk Score", value: m.country_risk_score, max: 100, color: "#60a5fa", invert: true },
    { label: "Reserves", value: Math.min(m.foreign_reserves_bn, 200), max: 200, color: "#fbbf24" },
    { label: "Debt/GDP", value: Math.min(m.govt_debt_pct_gdp, 120), max: 120, color: "#a78bfa", invert: true },
  ];

  const W = canvas.width;
  const H = canvas.height;
  const barH = 28;
  const padding = { left: 90, right: 50, top: 10 };

  metrics.forEach((metric, i) => {
    const y = padding.top + i * (barH + 10);
    const pct = metric.value / metric.max;
    const barW = (W - padding.left - padding.right) * pct;

    // Background
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.roundRect(padding.left, y, W - padding.left - padding.right, barH, 4);
    ctx.fill();

    // Bar
    ctx.fillStyle = metric.invert
      ? `rgba(${hexToComponents(metric.color)},${0.4 + pct * 0.5})`
      : metric.color;
    ctx.roundRect(padding.left, y, Math.max(barW, 4), barH, 4);
    ctx.fill();

    // Label
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(metric.label, padding.left - 8, y + barH / 2 + 4);

    // Value
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(
      metric.label === "Reserves"
        ? `$${metric.value.toFixed(0)}bn`
        : `${metric.value.toFixed(1)}${metric.label.includes("Score") ? "" : "%"}`,
      padding.left + barW + 6,
      y + barH / 2 + 4
    );
  });
}

function hexToComponents(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Scenario Simulator ───────────────────────────────────────────────────────
async function initScenarioPanel(): Promise<void> {
  try {
    scenarioTemplates = await api.scenarios.templates();
    const select = document.getElementById("scenario-select") as HTMLSelectElement;
    select.innerHTML = scenarioTemplates
      .map((t) => `<option value="${t.key}">${t.label}</option>`)
      .join("");

    select.addEventListener("change", updateMagnitudeLabel);
    document.getElementById("run-scenario-btn")!.addEventListener("click", runScenario);
    updateMagnitudeLabel();
  } catch (err) {
    console.error("Failed to load scenarios:", err);
  }
}

function updateMagnitudeLabel(): void {
  const select = document.getElementById("scenario-select") as HTMLSelectElement;
  const slider = document.getElementById("magnitude-slider") as HTMLInputElement;
  const label = document.getElementById("magnitude-label")!;
  const template = scenarioTemplates.find((t) => t.key === select.value);

  if (template?.params?.magnitude) {
    const [min, max] = template.params.magnitude.range;
    slider.min = String(min);
    slider.max = String(max);
    slider.value = String(template.params.magnitude.default);
    slider.step = max > 20 ? "5" : "0.25";
  }

  label.textContent = slider.value;
  slider.oninput = () => (label.textContent = slider.value);
}

async function runScenario(): Promise<void> {
  if (!selectedCountry) {
    alert("Select a country first by clicking a pin on the globe.");
    return;
  }

  const select = document.getElementById("scenario-select") as HTMLSelectElement;
  const slider = document.getElementById("magnitude-slider") as HTMLInputElement;
  const btn = document.getElementById("run-scenario-btn")!;

  btn.textContent = "Running…";
  btn.setAttribute("disabled", "true");

  try {
    const result = await api.scenarios.run(
      selectedCountry.iso2,
      select.value,
      parseFloat(slider.value)
    );
    renderScenarioResult(result);
  } catch (err) {
    showError("Scenario simulation failed.");
    console.error(err);
  } finally {
    btn.textContent = "Run Scenario";
    btn.removeAttribute("disabled");
  }
}

function renderScenarioResult(r: ScenarioResult): void {
  const container = document.getElementById("scenario-result")!;

  const directionIcon: Record<string, string> = {
    appreciate: "🟢 ↑",
    bullish: "🟢 ↑",
    "very positive": "🟢 ↑↑",
    positive: "🟢 ↑",
    improving: "🟢 →↑",
    down: "🟢 ↓",
    depreciate: "🔴 ↓",
    bearish: "🔴 ↓",
    negative: "🔴 ↓",
    "negative ST, positive LT": "🟡 ↓↑",
    up: "🔴 ↑",
    mixed: "🟡 ~",
    stabilize: "🟡 →",
    neutral: "⚪ —",
    "contracts": "🔴 ↓",
    "expands": "🟢 ↑",
    pegged: "⚪ —",
  };

  const effects = Object.entries(r.effects).map(([key, ef]) => {
    const icon = directionIcon[ef.direction.toLowerCase()] ?? "⚪";
    const isPos = ef.direction.match(/bullish|appreciat|positive|improving|down/i);
    const isNeg = ef.direction.match(/bearish|depreciat|negative|bearish|up|contracts/i);
    const colorClass = isPos ? "effect-pos" : isNeg ? "effect-neg" : "effect-neutral";
    return `
      <div class="effect-card ${colorClass}">
        <div class="effect-header">
          <span class="effect-icon">${icon}</span>
          <span class="effect-name">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <span class="effect-mag">~${ef.magnitude_pct.toFixed(1)}%</span>
        </div>
        <p class="effect-rationale">${ef.rationale}</p>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="scenario-result-header">
      <h4>${r.scenario.label}</h4>
      <p class="scenario-desc">${r.scenario.description}</p>
    </div>
    <div class="effects-grid">${effects.join("")}</div>
    <div class="sector-impacts">
      <div class="si-col winners">
        <div class="si-title">🏆 Sector Winners</div>
        ${r.sector_winners.map((s) => `<div class="si-item">${s}</div>`).join("")}
      </div>
      <div class="si-col losers">
        <div class="si-title">📉 Sector Losers</div>
        ${r.sector_losers.map((s) => `<div class="si-item">${s}</div>`).join("")}
      </div>
    </div>
    <p class="disclaimer">${r.disclaimer}</p>
  `;
}

// ── Signals Panel ────────────────────────────────────────────────────────────
async function loadSignals(): Promise<void> {
  const container = document.getElementById("signals-list")!;
  container.innerHTML = `<div class="loading-spinner">Loading signals…</div>`;

  try {
    const { signals } = await api.signals.all({ minStrength: 3 });
    renderSignals(signals, container);
  } catch (err) {
    container.innerHTML = `<p class="error-msg">Could not load signals.</p>`;
    console.error(err);
  }
}

function renderSignals(signals: Signal[], container: HTMLElement): void {
  if (!signals.length) {
    container.innerHTML = `<p class="empty-msg">No signals match the current filters.</p>`;
    return;
  }

  const dots = ["●", "●●", "●●●", "●●●●", "●●●●●"];

  container.innerHTML = signals
    .map(
      (s) => `
    <div class="signal-card signal-${s.type}">
      <div class="signal-header">
        <span class="signal-flag">${s.flag}</span>
        <div class="signal-meta">
          <span class="signal-country">${s.country_name}</span>
          <span class="signal-region">${s.region}</span>
        </div>
        <div class="signal-strength" title="Signal strength ${s.strength}/5">
          <span class="${s.type === "opportunity" ? "str-opp" : "str-risk"}">${dots[s.strength - 1]}</span>
        </div>
        <div class="signal-type-badge ${s.type}">${s.type === "opportunity" ? "📈 OPP" : "⚠️ RISK"}</div>
      </div>
      <div class="signal-title">${s.title}</div>
      <p class="signal-rationale">${s.rationale}</p>
      <div class="signal-assets">
        ${s.asset_class.map((a) => `<span class="asset-tag">${a}</span>`).join("")}
      </div>
    </div>
  `
    )
    .join("");
}

// ── Utility ──────────────────────────────────────────────────────────────────
function showError(msg: string): void {
  const el = document.getElementById("error-toast")!;
  el.textContent = msg;
  el.classList.add("visible");
  setTimeout(() => el.classList.remove("visible"), 4000);
}

// ── Boot ─────────────────────────────────────────────────────────────────────
async function boot(): Promise<void> {
  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = (btn as HTMLElement).dataset.tab as typeof activeTab;
      setActiveTab(tab);
      if (tab === "signals" && selectedCountry) loadSignals();
    });
  });

  // Search bar
  const searchInput = document.getElementById("country-search") as HTMLInputElement;
  searchInput.addEventListener("input", (e) => {
    const q = (e.target as HTMLInputElement).value.toLowerCase();
    const matches = allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q)
    );
    plotCountryPins(q ? matches : allCountries);
  });

  // Close panel
  document.getElementById("close-panel-btn")!.addEventListener("click", () => {
    document.getElementById("side-panel")!.classList.remove("open");
  });

  // Region filter chips
  document.querySelectorAll(".region-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const region = (chip as HTMLElement).dataset.region!;
      document.querySelectorAll(".region-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filtered =
        region === "all"
          ? allCountries
          : allCountries.filter((c) => c.region.toLowerCase().includes(region.toLowerCase()));
      plotCountryPins(filtered);
    });
  });

  await Promise.all([initGlobe(), initScenarioPanel()]);
}

document.addEventListener("DOMContentLoaded", boot);
