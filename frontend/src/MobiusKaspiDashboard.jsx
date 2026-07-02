import React, { useState } from "react";

/* ============================================================================
   MOBIUS — Kaspi.kz Anchor Entity Dashboard (v0.1)
   Data compiled 2026-07-02 from graded public sources; est. points marked C.
   Signals rank research priority only — not investment recommendations.
   ============================================================================ */

export const MOBIUS = {
  entity: {
    entityId: "kaspi",
    canonicalName: "Kaspi.kz",
    sourceNames: ["Kaspi.kz AO", "Joint Stock Company Kaspi.kz"],
    country: "Kazakhstan",
    primarySector: "Financial Services",
    secondarySectors: ["Fintech", "Payments", "E-commerce", "Consumer", "Digital Infrastructure"],
    entityType: "public_company",
    ownershipType: "founder_led",
    primaryTab: "public",
    visibleTabs: ["public"],
    tickers: [{ symbol: "KSPI", exchange: "Nasdaq" }, { symbol: "KSPI", exchange: "KASE" }],
    linkedSourceIds: ["kaspi_ir", "sec_edgar", "investing_com", "morningstar", "stocktitan_press", "macrotrends"],
    sourceConfidence: "A",
    researchPriority: "high",
    marketInfluenceTier: "tier_1",
    opportunityTypes: ["public_equity", "ecosystem_mapping", "private_market_readthrough", "turkiye_expansion_readthrough"],
    tags: ["super_app", "fintech", "payments", "marketplace", "hepsiburada", "kazakhstan_digital_economy"],
    lastUpdated: "2026-07-02",
  },

  marketData: {
    entityId: "kaspi",
    asOf: "2026-07-02",
    listings: {
      nasdaq_ads: { price_usd: 86.26, prevClose_usd: 88.95, dayChangePct: -1.3, week52Low: 68.59, week52High: 99.2, confidence: "B" },
      kase_kzt: { price_kzt: 41910, week52Low: 34837, week52High: 52400, confidence: "B" },
    },
    marketCap_usd_bn_approx: 16.4,
    analystTargets_usd: { low: 95, avg: 100, high: 105, n: 2 },
    dividend: { perADS_kzt: 850, cadence: "quarterly", payoutRatioPct: 64, confidence: "A" },
    priceTrend4M: {
      unit: "USD (Nasdaq ADS)",
      method: "Sourced anchors + interpolation; est points are confidence C",
      points: [
        { date: "2026-03-02", price: 76.0, est: true, label: "FY25 results", eventId: "evt_fy25_results" },
        { date: "2026-03-16", price: 79.0, est: true, label: "20-F filed; +3.99% day", eventId: "evt_20f" },
        { date: "2026-03-25", price: 83.5, est: true, label: "+4.66% day" },
        { date: "2026-04-17", price: 84.91, est: false, label: "pre-Tencent close (implied)" },
        { date: "2026-04-20", price: 91.6, est: false, label: "Tencent stake, +7%", eventId: "evt_tencent" },
        { date: "2026-04-24", price: 90.5, est: true, label: "$600M bond priced", eventId: "evt_bond" },
        { date: "2026-05-11", price: 88.0, est: true, label: "1Q26 results", eventId: "evt_q1_results" },
        { date: "2026-06-05", price: 81.17, est: false, label: "June drawdown" },
        { date: "2026-06-11", price: 82.5, est: true, label: "EGM: dividend approved", eventId: "evt_dividend_egm" },
        { date: "2026-06-24", price: 86.5, est: true, label: "Rabobank approval", eventId: "evt_rabobank" },
        { date: "2026-06-29", price: 87.4, est: false, label: "close" },
        { date: "2026-07-02", price: 86.26, est: false, label: "latest" },
      ],
    },
    yearlyTrend: {
      note: "Revenue per company KZT reporting; net income & diluted EPS in USD (ADS). 2025 consolidates Hepsiburada.",
      years: [
        { year: 2021, revenue_kzt_tn: 0.89, netIncome_usd_bn: null, eps_usd: null },
        { year: 2022, revenue_kzt_tn: 1.25, netIncome_usd_bn: 1.287, eps_usd: 6.64 },
        { year: 2023, revenue_kzt_tn: 1.89, netIncome_usd_bn: 1.851, eps_usd: 9.64 },
        { year: 2024, revenue_kzt_tn: 2.52, netIncome_usd_bn: 2.183, eps_usd: 11.41 },
        { year: 2025, revenue_kzt_tn: 4.05, netIncome_usd_bn: 2.1, eps_usd: 10.63 },
      ],
    },
  },

  fy2025Report: {
    period: "FY2025",
    reportedAt: "2026-03-02",
    headline: {
      revenue_kzt_tn: 4.05,
      revenueGrowthPct_incl_turkiye: 60,
      netIncome_usd_bn_approx: 2.1,
      netIncomeGrowth_kzt_pct: 10,
      dilutedEPS_usd: 10.63,
      activeConsumers_mn: 26.5,
      activeConsumersGrowthPct: 3,
    },
    platforms: {
      payments: { tpv_usd_bn: 24, tpvGrowthPct: 14, revenueGrowthPct: 7, adjEbitda: "stable", note: "Take-rate drifting down as Kaspi Pay QR & B2B grow fastest." },
      marketplace: { gmvGrowthPct: 19, revenueGrowthPct: 49, adjEbitdaGrowthPct: 12, note: "Advertising + delivery revenue +73% YoY. Smartphones the drag: 4Q25 smartphone GMV −24%." },
      fintech: { avgNetLoanPortfolio_usd_bn: 15, portfolioGrowthPct: 23, revenueGrowthPct: 25, adjEbitdaGrowthPct: 12, durationMonths: 9.3, note: "Margin compressed by higher rates, taxes and reserve requirements." },
      turkiye: { stakePct: 85.17, target: "Hepsiburada adj. EBITDA breakeven; ~$300M investment on Rabobank close", note: "2026 guidance includes Türkiye for the first time." },
    },
    capitalReturns: { dividendResumed: true, perADS_kzt: 850, cadence: "quarterly", payoutRatioPct: 64 },
    newProducts: { alaqan: "Pay-by-palm launched Almaty Dec 2025: 500k+ registrations in <3 months; 9% of Kaspi transactions where enabled; national rollout during 2026." },
    guidance2026: { gmvGrowthPct: 20, tpvGrowthPct: 15, tfvGrowthPct: 5, adjEbitdaGrowthPct: 5 },
    q1_2026_check: {
      revenue_kzt_tn: 1.06, revenueGrowthPct: 31, adjEbitda_kzt_bn: 368, adjEbitdaGrowthPct: 9,
      netIncome_kzt_bn: 252, netIncomeGrowthPct: -1, eps_kzt: 1335.65, epsEst_kzt: 1226.71,
      eCommerceGMVGrowthPct: 41, marketplaceRevGrowthPct: 49, fintechRevGrowthPct: 25,
    },
  },

  valueChain: {
    nodes: [
      { nodeId: "kaspi_consumer_users", name: "Consumer Users", stage: "customers", description: "26.5M active consumers (+3% YoY). Growth now from engagement & ARPU, not user count.", macroFactors: ["consumer_income", "inflation", "interest_rates"] },
      { nodeId: "kaspi_merchants_smes", name: "Merchants / SMEs", stage: "platform", description: "Merchant ecosystem; B2B payments the fastest-growing payments line.", macroFactors: ["consumer_spending", "small_business_activity"] },
      { nodeId: "kaspi_payments", name: "Payments", stage: "platform", description: "TPV ~$24B (+14%). Take-rate dilution from QR & B2B mix; Alaqan rolling out nationally.", macroFactors: ["consumer_spending", "digital_payment_adoption"] },
      { nodeId: "kaspi_consumer_finance", name: "Consumer Finance", stage: "financing", description: "Avg net loan book ~$15B (+23%), duration 9.3 mo. Rates, taxes & reserve rules bite margins.", macroFactors: ["interest_rates", "household_debt", "tax_policy"] },
      { nodeId: "kaspi_marketplace_commerce", name: "Marketplace / Commerce", stage: "platform", description: "GMV +19% FY25; ads+delivery revenue +73%. Smartphone import rules main drag, normalising.", macroFactors: ["consumer_spending", "ecommerce_adoption"] },
      { nodeId: "kaspi_logistics_fulfillment", name: "Logistics / Fulfillment", stage: "logistics", description: "Delivery & e-Grocery infrastructure; delivery revenue scaling ahead of GMV.", macroFactors: ["fuel_costs", "urban_consumption"] },
      { nodeId: "kaspi_regulation_policy", name: "Regulation / Policy", stage: "regulators", description: "NBK policy rate, consumer-lending rules, new taxes & reserve requirements. Turkish BRSA for banking.", macroFactors: ["policy_rate", "banking_liquidity"] },
      { nodeId: "kaspi_turkiye_hepsiburada", name: "Türkiye / Hepsiburada", stage: "operations", description: "85.17% stake; growth engine and margin drag. Rabobank A.Ş. = fintech playbook export.", macroFactors: ["try_fx", "turkiye_inflation", "ecommerce_adoption"] },
    ],
  },

  events: [
    { eventId: "evt_fy25_results", date: "2026-03-02", title: "FY2025 results — growth vs. profitability divergence; dividend resumed", summary: "Revenue KZT 4.05T (+60% incl. Türkiye). Net income margin 23.3%; ~flat USD net income. Dividend resumed at KZT 850/ADS quarterly (64% payout).", confidence: "A" },
    { eventId: "evt_20f", date: "2026-03-16", title: "Form 20-F for FY2025 filed with the SEC", summary: "Audited annual report confirms Hepsiburada stake at 85.17%. Stock rose 3.99% on filing day.", confidence: "A" },
    { eventId: "evt_tencent", date: "2026-04-20", title: "Tencent + CEO Lomtadze + U.S. institutions buy 6.0M ADSs from Baring", summary: "Baring Fintech exits; Tencent enters as cornerstone alongside management reinvestment. Shares +7% to $91.60 on the day.", confidence: "A" },
    { eventId: "evt_bond", date: "2026-04-24", title: "$600M 5.900% senior notes due 2031 — 3.5× oversubscribed", summary: "Debut benchmark USD bond; ~130 institutions; rated Baa3/BBB−. Proceeds strengthen liquidity ahead of Türkiye investment.", confidence: "A" },
    { eventId: "evt_q1_results", date: "2026-05-11", title: "1Q 2026: revenue +31%, net income −1%", summary: "Revenue KZT 1.06T (+31%); adj. EBITDA KZT 368B (+9%); net income KZT 252B (−1%). EPS KZT 1,335.65 vs est. 1,226.71. e-Commerce GMV +41%.", confidence: "A" },
    { eventId: "evt_dividend_egm", date: "2026-06-11", title: "EGM approves KZT 850/ADS quarterly dividend", summary: "Shareholders confirm the Q1 2026 dividend at 64% payout.", confidence: "A" },
    { eventId: "evt_rabobank", date: "2026-06-24", title: "Turkish BRSA approves acquisition of Rabobank A.Ş.", summary: "Regulatory green light to buy a licensed Turkish bank — the vehicle for exporting Kaspi's fintech model to Hepsiburada's user base (~$300M investment on close).", confidence: "A" },
  ],

  eventImpacts: [
    { eventId: "evt_fy25_results", valueChainNodeIds: ["kaspi_consumer_finance", "kaspi_marketplace_commerce", "kaspi_turkiye_hepsiburada"], impactDirection: "mixed", impactMagnitude: "high", timeHorizon: "medium_term", impactChannels: ["net_interest_margin", "gmv", "consolidation_margin", "dividend_capacity"], explanation: "Top line accelerates on Türkiye consolidation while four simultaneous costs (rates, taxes, reserves, Hepsiburada losses) flatten earnings. Dividend resumption signals management confidence in cash generation.", researchQuestion: "Are the Kazakh tax + reserve headwinds fully absorbed by YE2026 as management claims, restoring EPS growth?" },
    { eventId: "evt_tencent", valueChainNodeIds: ["kaspi_payments", "kaspi_turkiye_hepsiburada"], impactDirection: "positive", impactMagnitude: "medium", timeHorizon: "medium_term", impactChannels: ["valuation", "ownership_quality", "strategic_optionality"], explanation: "A patient strategic holder replaces an exiting VC fund; CEO reinvestment aligns incentives. Tencent's fintech/super-app DNA creates optionality beyond the financial stake.", researchQuestion: "Does Tencent stay purely financial, or does a WeChat-Pay-style commercial partnership follow?" },
    { eventId: "evt_bond", valueChainNodeIds: ["kaspi_consumer_finance", "kaspi_turkiye_hepsiburada"], impactDirection: "positive", impactMagnitude: "medium", timeHorizon: "short_to_medium_term", impactChannels: ["funding_cost", "liquidity", "fx_exposure"], explanation: "Investment-grade debut at 5.9% diversifies funding beyond KZT deposits. Introduces USD liability against KZT/TRY revenue — a new FX watch-item.", researchQuestion: "How is the USD liability hedged against tenge and lira revenue streams?" },
    { eventId: "evt_q1_results", valueChainNodeIds: ["kaspi_marketplace_commerce", "kaspi_consumer_finance", "kaspi_payments"], impactDirection: "mixed", impactMagnitude: "high", timeHorizon: "short_term", impactChannels: ["gmv", "net_interest_margin", "take_rate", "eps"], explanation: "e-Commerce GMV +41% proves demand; net income −1% proves cost stack still being digested. EPS beat (+8.9% vs est.) suggests the street over-marked the margin damage.", researchQuestion: "Does smartphone GMV normalisation show up in 2Q26 marketplace growth?" },
    { eventId: "evt_dividend_egm", valueChainNodeIds: ["kaspi_consumer_finance"], impactDirection: "positive", impactMagnitude: "low", timeHorizon: "short_term", impactChannels: ["capital_return", "payout_sustainability"], explanation: "Quarterly KZT 850/ADS at 64% payout puts a cash-yield floor under the stock. Payout sustainability is now coupled to Hepsiburada breakeven.", researchQuestion: "At what Hepsiburada loss level does the 64% payout become constrained?" },
    { eventId: "evt_rabobank", valueChainNodeIds: ["kaspi_turkiye_hepsiburada", "kaspi_regulation_policy"], impactDirection: "positive", impactMagnitude: "high", timeHorizon: "long_term", impactChannels: ["market_expansion", "regulatory_unlock", "capex"], explanation: "The banking licence is the missing piece of the Türkiye thesis: Marketplace + Payments + Fintech replicates the Kazakh flywheel in an 85M-person market.", researchQuestion: "Can Kaspi underwrite Turkish consumer credit profitably at Turkish inflation/rate levels?" },
  ],

  sources: [
    { sourceId: "kaspi_ir", name: "Kaspi.kz Investor Relations", reliability: "A", usedFor: "FY25 & 1Q26 results, platform KPIs, guidance, Alaqan" },
    { sourceId: "sec_edgar", name: "SEC / Form 20-F 2025", reliability: "A", usedFor: "Annual report, Hepsiburada 85.17% stake" },
    { sourceId: "stocktitan_press", name: "GlobeNewswire via StockTitan", reliability: "A", usedFor: "Tencent deal, bond, EGM, Rabobank approval" },
    { sourceId: "morningstar", name: "Morningstar quote", reliability: "B", usedFor: "Price $87.40 (29 Jun), 52-wk range" },
    { sourceId: "investing_com", name: "Investing.com", reliability: "B", usedFor: "KASE KZT 41,910; TTM ratios" },
    { sourceId: "macrotrends", name: "Macrotrends", reliability: "B", usedFor: "EPS history" },
    { sourceId: "stockanalysis", name: "StockAnalysis.com", reliability: "B", usedFor: "Revenue KZT 4.05T FY25" },
    { sourceId: "google_finance", name: "Google Finance", reliability: "B", usedFor: "Q1 2026 EPS vs estimate" },
    { sourceId: "quartr", name: "Quartr earnings summaries", reliability: "B", usedFor: "FY25 platform growth rates" },
    { sourceId: "gurufocus_days", name: "GuruFocus daily-move notes", reliability: "C", usedFor: "Mar 16 +3.99%, Mar 25 +4.66%" },
    { sourceId: "ainvest", name: "AInvest FY25 analysis", reliability: "C", usedFor: "$8B revenue / $2.1B NI USD framing" },
  ],

  sectorTrend: {
    trendDirection: "volatile_positive",
    positiveDrivers: ["e-Commerce GMV +41% (1Q26)", "dividend resumed + Tencent cornerstone", "IG bond market access at 5.9%", "Türkiye fintech unlock (Rabobank)", "Alaqan adoption curve"],
    negativeDrivers: ["net income flat: rates + taxes + reserve requirements", "Hepsiburada consolidation losses", "USD debt vs KZT/TRY revenue FX mismatch", "smartphone import disruption (fading)", "payments take-rate dilution"],
    mobiusView: "Kaspi in mid-2026 is a margin-digestion story wearing a growth story's clothes. Revenue engines (e-Commerce, B2B payments, Türkiye) are all accelerating; every drag on earnings is identifiable, dated, and — per management — temporary. The research task is to verify each drag's expiry: tax/reserve absorption by YE26, smartphone comps from Mar 26, Hepsiburada EBITDA breakeven, Rabobank integration. If those check out, flat EPS at ~8× earnings with a 64% payout is a mispriced pause; if Türkiye credit costs surprise, the 'temporary' drags become structural.",
  },
};

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const T = {
  bg: "#0B0F14", panel: "#111721", panel2: "#0E141C",
  line: "rgba(232,227,216,0.09)", line2: "rgba(232,227,216,0.16)",
  text: "#E8E3D8", sub: "#8B93A3", faint: "#5C6472",
  gold: "#C9974B", goldDim: "rgba(201,151,75,0.16)",
  pos: "#6FBF8E", posDim: "rgba(111,191,142,0.14)",
  neg: "#E2604F", negDim: "rgba(226,96,79,0.14)",
  mix: "#D8A94E", mixDim: "rgba(216,169,78,0.14)",
  teal: "#4FA8A0", tealDim: "rgba(79,168,160,0.14)",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
  disp: "'Space Grotesk', system-ui, sans-serif",
};
const DIR_COLOR = { positive: [T.pos, T.posDim], negative: [T.neg, T.negDim], mixed: [T.mix, T.mixDim] };
const GRADE_COLOR = { A: [T.pos, T.posDim], B: [T.teal, T.tealDim], C: [T.mix, T.mixDim] };

// ─── Primitives ───────────────────────────────────────────────────────────────
const Badge = ({ color = [T.sub, "rgba(139,147,163,0.14)"], children }) => (
  <span style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1, padding: "2px 7px", borderRadius: 3, textTransform: "uppercase", color: color[0], background: color[1], whiteSpace: "nowrap" }}>{children}</span>
);

const SectionHead = ({ id, title, sub, jsonKey, openJson, toggleJson }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: `1px solid ${T.line2}`, paddingBottom: 10, marginBottom: 22, flexWrap: "wrap" }}>
    <span style={{ fontFamily: T.mono, fontSize: 11, color: T.gold, letterSpacing: 2 }}>{id}</span>
    <h2 style={{ fontSize: 21, fontWeight: 600, letterSpacing: -0.2, margin: 0 }}>{title}</h2>
    {sub && <span style={{ color: T.faint, fontSize: 12.5, fontFamily: T.mono }}>{sub}</span>}
    {jsonKey && (
      <button onClick={() => toggleJson(jsonKey)} style={{ marginLeft: "auto", fontFamily: T.mono, fontSize: 11, letterSpacing: 1, color: openJson[jsonKey] ? "#7FD0C9" : T.teal, background: openJson[jsonKey] ? T.tealDim : "none", border: "1px solid rgba(79,168,160,0.35)", borderRadius: 3, padding: "4px 10px", cursor: "pointer" }}>
        {"{ } JSON"}
      </button>
    )}
  </div>
);

const JsonView = ({ show, data }) =>
  !show ? null : (
    <pre style={{ background: "#080C11", border: "1px solid rgba(79,168,160,0.25)", borderRadius: 6, padding: 16, fontFamily: T.mono, fontSize: 11, lineHeight: 1.6, color: "#9AB8B4", overflow: "auto", marginBottom: 22, maxHeight: 420 }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );

const Card = ({ title, badge, children, style }) => (
  <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: 18, ...style }}>
    {title && <h3 style={{ fontSize: 14.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, margin: "0 0 8px" }}>{title} {badge}</h3>}
    {children}
  </div>
);

const KV = ({ k, v }) => (
  <li style={{ fontSize: 12.5, color: T.sub, padding: "5px 0", borderTop: `1px dashed ${T.line}`, display: "flex", gap: 8, listStyle: "none" }}>
    <b style={{ color: T.text, fontWeight: 500, fontFamily: T.mono, fontSize: 12, whiteSpace: "nowrap" }}>{k}</b>
    <span>{v}</span>
  </li>
);

// ─── SVG Charts ───────────────────────────────────────────────────────────────
function PriceChart() {
  const P = MOBIUS.marketData.priceTrend4M.points;
  const W = 980, H = 260, pad = { l: 46, r: 14, t: 16, b: 34 };
  const t0 = new Date(P[0].date).getTime(), t1 = new Date(P[P.length - 1].date).getTime();
  const lo = 76, hi = 94;
  const X = (d) => pad.l + ((new Date(d).getTime() - t0) / (t1 - t0)) * (W - pad.l - pad.r);
  const Y = (v) => pad.t + ((hi - v) / (hi - lo)) * (H - pad.t - pad.b);
  const gridVals = [76, 82, 88, 94];
  const months = [["2026-03-02", "MAR"], ["2026-04-01", "APR"], ["2026-05-01", "MAY"], ["2026-06-01", "JUN"], ["2026-07-02", "JUL"]];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img">
      {gridVals.map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={Y(v)} y2={Y(v)} stroke="rgba(232,227,216,0.06)" />
          <text x={pad.l - 8} y={Y(v) + 4} textAnchor="end" fontSize={10} fill={T.faint} fontFamily={T.mono}>${v}</text>
        </g>
      ))}
      {P.filter((p) => p.eventId).map((p) => (
        <g key={p.eventId}>
          <line x1={X(p.date)} x2={X(p.date)} y1={Y(p.price) + 8} y2={H - pad.b} stroke="rgba(79,168,160,0.4)" strokeDasharray="2 3" />
          <circle cx={X(p.date)} cy={H - pad.b} r={3.5} fill={T.teal} />
        </g>
      ))}
      {P.slice(1).map((b, i) => {
        const a = P[i];
        const est = a.est || b.est;
        return <line key={b.date} x1={X(a.date)} y1={Y(a.price)} x2={X(b.date)} y2={Y(b.price)} stroke={T.gold} strokeWidth={2} strokeDasharray={est ? "5 4" : undefined} opacity={est ? 0.75 : 1} />;
      })}
      {P.map((p) =>
        p.est ? (
          <circle key={p.date} cx={X(p.date)} cy={Y(p.price)} r={4} fill={T.bg} stroke={T.gold} strokeWidth={1.6} />
        ) : (
          <circle key={p.date} cx={X(p.date)} cy={Y(p.price)} r={4.5} fill={T.gold} />
        )
      )}
      {months.map(([d, m]) => (
        <text key={m} x={X(d)} y={H - 8} fontSize={10} fill={T.faint} textAnchor="middle" fontFamily={T.mono}>{m}</text>
      ))}
    </svg>
  );
}

function YearlyChart() {
  const Y5 = MOBIUS.marketData.yearlyTrend.years;
  const W = 980, H = 280, pad = { l: 46, r: 50, t: 20, b: 36 }, n = Y5.length;
  const slot = (W - pad.l - pad.r) / n, bw = 54;
  const revMax = 4.5, usdMax = 12;
  const Yr = (v) => pad.t + (1 - v / revMax) * (H - pad.t - pad.b);
  const Yu = (v) => pad.t + (1 - v / usdMax) * (H - pad.t - pad.b);
  const cx = (i) => pad.l + slot * i + slot / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img">
      {[0, 1, 2, 3, 4].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={Yr(v)} y2={Yr(v)} stroke="rgba(232,227,216,0.05)" />
          <text x={pad.l - 8} y={Yr(v) + 4} fontSize={10} fill={T.faint} textAnchor="end" fontFamily={T.mono}>₸{v}T</text>
        </g>
      ))}
      {[0, 4, 8, 12].map((v) => (
        <text key={v} x={W - pad.r + 8} y={Yu(v) + 4} fontSize={10} fill={T.faint} fontFamily={T.mono}>${v}</text>
      ))}
      {Y5.map((r, i) => (
        <g key={r.year}>
          <rect x={cx(i) - bw / 2} y={Yr(r.revenue_kzt_tn)} width={bw} height={Yr(0) - Yr(r.revenue_kzt_tn)} rx={3} fill="rgba(201,151,75,0.55)" />
          <text x={cx(i)} y={Yr(r.revenue_kzt_tn) - 6} fontSize={10} fill={T.gold} textAnchor="middle" fontFamily={T.mono}>{r.revenue_kzt_tn}</text>
          <text x={cx(i)} y={H - 10} fontSize={11} fill={T.sub} textAnchor="middle" fontFamily={T.mono}>{r.year}</text>
        </g>
      ))}
      {Y5.filter(r => r.netIncome_usd_bn != null).map((r, _, arr) => {
        const i = Y5.indexOf(r);
        return (
          <g key={r.year + "ni"}>
            {i > 0 && Y5[i-1].netIncome_usd_bn != null && (
              <line x1={cx(i-1)} y1={Yu(Y5[i-1].netIncome_usd_bn)} x2={cx(i)} y2={Yu(r.netIncome_usd_bn)} stroke={T.teal} strokeWidth={2} />
            )}
            <circle cx={cx(i)} cy={Yu(r.netIncome_usd_bn)} r={4} fill={T.teal} />
          </g>
        );
      })}
      {Y5.filter(r => r.eps_usd != null).map((r) => {
        const i = Y5.indexOf(r);
        return (
          <g key={r.year + "eps"}>
            {i > 0 && Y5[i-1].eps_usd != null && (
              <line x1={cx(i-1)} y1={Yu(Y5[i-1].eps_usd)} x2={cx(i)} y2={Yu(r.eps_usd)} stroke={T.pos} strokeWidth={2} />
            )}
            <circle cx={cx(i)} cy={Yu(r.eps_usd)} r={4} fill={T.pos} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── StatStrip ────────────────────────────────────────────────────────────────
function StatStrip() {
  const h = MOBIUS.fy2025Report.headline, q = MOBIUS.fy2025Report.q1_2026_check, md = MOBIUS.marketData;
  const items = [
    { l: "FY25 Revenue", v: `₸${h.revenue_kzt_tn}T`, d: `+${h.revenueGrowthPct_incl_turkiye}% incl. Türkiye`, c: T.pos },
    { l: "FY25 Net Income", v: `~$${h.netIncome_usd_bn_approx}B`, d: `+${h.netIncomeGrowth_kzt_pct}% KZT · flat USD`, c: T.mix },
    { l: "FY25 Diluted EPS", v: `$${h.dilutedEPS_usd}`, d: "−6.8% YoY (USD)", c: T.neg },
    { l: "1Q26 Revenue", v: `₸${q.revenue_kzt_tn}T`, d: `+${q.revenueGrowthPct}% YoY`, c: T.pos },
    { l: "1Q26 EPS (KZT)", v: q.eps_kzt.toLocaleString(), d: "beat est. by +8.9%", c: T.pos },
    { l: "Dividend / ADS", v: `₸${md.dividend.perADS_kzt}`, d: `quarterly · ${md.dividend.payoutRatioPct}% payout`, c: T.sub },
    { l: "Active Consumers", v: `${h.activeConsumers_mn}M`, d: `+${h.activeConsumersGrowthPct}% YoY`, c: T.sub },
    { l: "Mkt Cap (approx)", v: `$${md.marketCap_usd_bn_approx}B`, d: "52wk $68.59–99.20", c: T.sub },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, background: T.line, border: `1px solid ${T.line}`, borderRadius: 8, overflow: "hidden" }}>
      {items.map((s) => (
        <div key={s.l} style={{ background: T.panel, padding: "16px 16px 14px" }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, color: T.faint, textTransform: "uppercase", marginBottom: 6 }}>{s.l}</div>
          <div style={{ fontFamily: T.mono, fontSize: 19, fontWeight: 600 }}>{s.v}</div>
          <div style={{ fontSize: 11.5, marginTop: 3, fontFamily: T.mono, color: s.c }}>{s.d}</div>
        </div>
      ))}
    </div>
  );
}

// ─── EventFeed ────────────────────────────────────────────────────────────────
function EventFeed() {
  const [open, setOpen] = useState({ evt_fy25_results: true });
  const nodeName = (id) => MOBIUS.valueChain.nodes.find((n) => n.nodeId === id)?.name || id;
  const pill = (txt, color) => (
    <span key={txt} style={{ fontFamily: T.mono, fontSize: 11, padding: "5px 10px", borderRadius: 4, border: `1px solid ${color ? color + "66" : T.line2}`, color: color || T.sub, whiteSpace: "nowrap" }}>{txt}</span>
  );
  return (
    <div>
      {MOBIUS.events.map((e) => {
        const imp = MOBIUS.eventImpacts.find((i) => i.eventId === e.eventId);
        const isOpen = !!open[e.eventId];
        const dir = imp && DIR_COLOR[imp.impactDirection];
        return (
          <div key={e.eventId} style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, marginTop: 12, overflow: "hidden" }}>
            <div
              role="button" tabIndex={0}
              onClick={() => setOpen((o) => ({ ...o, [e.eventId]: !o[e.eventId] }))}
              onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setOpen((o) => ({ ...o, [e.eventId]: !o[e.eventId] })); } }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", flexWrap: "wrap" }}
            >
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.faint, minWidth: 86 }}>{e.date}</span>
              <span style={{ fontSize: 14, fontWeight: 600, flex: 1, minWidth: 200 }}>{e.title}</span>
              {imp ? <Badge color={dir}>{imp.impactDirection}</Badge> : <Badge>filing</Badge>}
              <Badge color={GRADE_COLOR[e.confidence]}>{e.confidence}</Badge>
              <span style={{ fontFamily: T.mono, color: T.faint, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }}>›</span>
            </div>
            {isOpen && imp && (
              <div style={{ borderTop: `1px solid ${T.line}`, padding: 16 }}>
                <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>{e.summary}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "12px 0 14px" }}>
                  {imp.valueChainNodeIds.map((id) => pill(nodeName(id), T.gold))}
                  <span style={{ color: T.faint, fontSize: 12 }}>→</span>
                  {imp.impactChannels.map((c) => pill(c))}
                </div>
                <div style={{ fontSize: 13, color: T.sub, borderLeft: `2px solid ${T.gold}`, paddingLeft: 12, margin: "12px 0" }}>{imp.explanation}</div>
                <div style={{ fontSize: 12.5, color: T.text, background: T.goldDim, borderRadius: 6, padding: "10px 12px", marginTop: 10 }}>
                  <b style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.5, color: T.gold, display: "block", marginBottom: 3 }}>RESEARCH QUESTION</b>
                  {imp.researchQuestion}
                </div>
              </div>
            )}
            {isOpen && !imp && (
              <div style={{ borderTop: `1px solid ${T.line}`, padding: 16 }}>
                <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>{e.summary}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── ValueChainGrid ───────────────────────────────────────────────────────────
function ValueChainGrid() {
  const hits = {};
  MOBIUS.eventImpacts.forEach((i) => i.valueChainNodeIds.forEach((id) => { (hits[id] = hits[id] || []).push(i.impactDirection); }));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12 }}>
      {MOBIUS.valueChain.nodes.map((n) => (
        <div key={n.nodeId} style={{ background: T.panel, border: `1px solid ${hits[n.nodeId] ? "rgba(201,151,75,0.45)" : T.line}`, borderRadius: 8, padding: 14 }}>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.5, color: T.teal, textTransform: "uppercase" }}>{n.stage}</div>
          <h4 style={{ fontSize: 14, fontWeight: 600, margin: "4px 0 6px" }}>{n.name}</h4>
          <p style={{ fontSize: 12, color: T.sub, margin: 0 }}>{n.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9 }}>
            {(hits[n.nodeId] || []).map((d, i) => <Badge key={i} color={DIR_COLOR[d]}>{d}</Badge>)}
            {!hits[n.nodeId] && <Badge>no live impact</Badge>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function MobiusKaspiDashboard({ onClose }) {
  const [openJson, setOpenJson] = useState({});
  const toggleJson = (k) => setOpenJson((o) => ({ ...o, [k]: !o[k] }));
  const m = MOBIUS.marketData.listings.nasdaq_ads;
  const f = MOBIUS.fy2025Report, p = f.platforms, t = MOBIUS.sectorTrend;

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.disp, fontSize: 15, lineHeight: 1.55, minHeight: "100vh" }}>
      {/* sticky top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,15,20,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ fontFamily: T.mono, fontWeight: 600, fontSize: 13, letterSpacing: 3, color: T.gold }}>MOBIUS</span>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.faint, letterSpacing: 1 }}>CENTRAL ASIA / KAZAKHSTAN / ANCHOR ENTITY</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 10, fontFamily: T.mono }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>${m.price_usd.toFixed(2)}</span>
            <span style={{ fontSize: 12, color: m.dayChangePct >= 0 ? T.pos : T.neg }}>{m.dayChangePct > 0 ? "+" : ""}{m.dayChangePct.toFixed(1)}%</span>
            <span style={{ fontSize: 10, color: T.faint }}>NASDAQ</span>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(232,227,216,0.2)", borderRadius: 6, color: T.sub, padding: "6px 14px", cursor: "pointer", fontFamily: T.mono, fontSize: 12 }}>
              ✕ Close
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 20px 80px" }}>
        {/* hero */}
        <div style={{ padding: "44px 0 10px" }}>
          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 2.5, color: T.gold, textTransform: "uppercase", marginBottom: 10 }}>Anchor Entity · Tier 1 · Research Priority: High</div>
          <h1 style={{ fontSize: "clamp(30px,5vw,44px)", fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1, margin: 0 }}>
            Kaspi.kz
            <span style={{ color: T.faint, fontFamily: T.mono, fontSize: "0.45em", fontWeight: 500, verticalAlign: "middle", marginLeft: 10, letterSpacing: 1 }}>NASDAQ: KSPI · KASE: KSPI</span>
          </h1>
          <p style={{ color: T.sub, maxWidth: "70ch", marginTop: 12 }}>
            Kazakhstan's digital-economy anchor: a two-sided Super App spanning Payments, Marketplace and Fintech, now consolidating Hepsiburada (85.17%) in Türkiye. Mobius tracks Kaspi as the read-through node for Kazakh consumer, fintech, merchant and logistics ecosystems.
          </p>
        </div>

        {/* 01 SNAPSHOT */}
        <section style={{ marginTop: 56 }}>
          <SectionHead id="01" title="Snapshot & Market" sub="price as of 02 Jul 2026" jsonKey="marketData" openJson={openJson} toggleJson={toggleJson} />
          <JsonView show={openJson.marketData} data={MOBIUS.marketData} />
          <StatStrip />
          <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "18px 18px 8px", marginTop: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>KSPI ADS — 4-month price path (Mar → Jul 2026)</h3>
            <p style={{ fontSize: 11, color: T.faint, fontFamily: T.mono, margin: "0 0 6px" }}>Dashed segments & hollow points = interpolated (confidence C). Solid = sourced. Teal markers = events.</p>
            <PriceChart />
          </div>
          <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "18px 18px 8px", marginTop: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>Yearly trend — revenue (KZT) vs. net income & EPS (USD)</h3>
            <YearlyChart />
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "6px 0 4px", fontFamily: T.mono, fontSize: 10.5, color: T.sub }}>
              <span style={{ color: T.gold }}>▮ revenue, KZT T</span><span style={{ color: T.teal }}>― net income, $B</span><span style={{ color: T.pos }}>― diluted EPS, $</span>
            </div>
          </div>
        </section>

        {/* 02 FY2025 */}
        <section style={{ marginTop: 56 }}>
          <SectionHead id="02" title="FY 2025 Report" sub="reported 02 Mar 2026 · 20-F filed 16 Mar 2026" jsonKey="fy2025Report" openJson={openJson} toggleJson={toggleJson} />
          <JsonView show={openJson.fy2025Report} data={MOBIUS.fy2025Report} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
            <Card title="Payments" badge={<Badge color={[T.teal, T.tealDim]}>stable core</Badge>}>
              <ul style={{ margin: "0 0 8px", padding: 0 }}><KV k="TPV" v={`~$${p.payments.tpv_usd_bn}B, +${p.payments.tpvGrowthPct}% YoY`} /><KV k="Revenue" v={`+${p.payments.revenueGrowthPct}% · adj. EBITDA ${p.payments.adjEbitda}`} /></ul>
              <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>{p.payments.note}</p>
            </Card>
            <Card title="Marketplace" badge={<Badge color={[T.pos, T.posDim]}>growth engine</Badge>}>
              <ul style={{ margin: "0 0 8px", padding: 0 }}><KV k="GMV" v={`+${p.marketplace.gmvGrowthPct}% · Revenue +${p.marketplace.revenueGrowthPct}%`} /><KV k="adj. EBITDA" v={`+${p.marketplace.adjEbitdaGrowthPct}%`} /></ul>
              <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>{p.marketplace.note}</p>
            </Card>
            <Card title="Fintech" badge={<Badge color={[T.mix, T.mixDim]}>margin pressure</Badge>}>
              <ul style={{ margin: "0 0 8px", padding: 0 }}><KV k="Loan book" v={`~$${p.fintech.avgNetLoanPortfolio_usd_bn}B avg, +${p.fintech.portfolioGrowthPct}%`} /><KV k="Revenue" v={`+${p.fintech.revenueGrowthPct}% · duration ${p.fintech.durationMonths} mo`} /></ul>
              <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>{p.fintech.note}</p>
            </Card>
            <Card title="Türkiye / Hepsiburada" badge={<Badge color={[T.gold, T.goldDim]}>expansion bet</Badge>}>
              <ul style={{ margin: "0 0 8px", padding: 0 }}><KV k="Stake" v={`${p.turkiye.stakePct}%`} /><KV k="Target" v={p.turkiye.target} /></ul>
              <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>{p.turkiye.note}</p>
            </Card>
            <Card title="Capital Returns & Alaqan">
              <ul style={{ margin: "0 0 8px", padding: 0 }}><KV k="Dividend" v={`resumed — ₸${f.capitalReturns.perADS_kzt}/ADS quarterly, ${f.capitalReturns.payoutRatioPct}% payout`} /></ul>
              <p style={{ fontSize: 13, color: T.sub, margin: 0 }}><b style={{ color: T.text }}>Alaqan:</b> {f.newProducts.alaqan}</p>
            </Card>
            <Card title="2026 Guidance" badge={<Badge>first incl. Türkiye</Badge>}>
              <ul style={{ margin: "0 0 8px", padding: 0 }}><KV k="GMV" v={`~+${f.guidance2026.gmvGrowthPct}%`} /><KV k="TPV / TFV" v={`+${f.guidance2026.tpvGrowthPct}% / +${f.guidance2026.tfvGrowthPct}%`} /><KV k="adj. EBITDA" v={`~+${f.guidance2026.adjEbitdaGrowthPct}%`} /></ul>
              <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>1Q26: revenue +{f.q1_2026_check.revenueGrowthPct}%, adj. EBITDA +{f.q1_2026_check.adjEbitdaGrowthPct}% — tracking guidance.</p>
            </Card>
          </div>
        </section>

        {/* 03 CAUSATION */}
        <section style={{ marginTop: 56 }}>
          <SectionHead id="03" title="Evaluation Causation" sub="events → node impacts → research questions" />
          <EventFeed />
        </section>

        {/* 04 VALUE CHAIN */}
        <section style={{ marginTop: 56 }}>
          <SectionHead id="04" title="Value Chain — impact overlay" sub="gold border = node hit by ≥1 live event" jsonKey="valueChain" openJson={openJson} toggleJson={toggleJson} />
          <JsonView show={openJson.valueChain} data={MOBIUS.valueChain} />
          <ValueChainGrid />
        </section>

        {/* 05 SOURCES */}
        <section style={{ marginTop: 56 }}>
          <SectionHead id="05" title="Source Registry" jsonKey="sources" openJson={openJson} toggleJson={toggleJson} />
          <JsonView show={openJson.sources} data={MOBIUS.sources} />
          <Card style={{ padding: "6px 6px 2px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
              <thead>
                <tr>{["Source", "Grade", "Used for"].map((h) => (<th key={h} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", color: T.faint, textAlign: "left", padding: "8px 10px", borderBottom: `1px solid ${T.line2}` }}>{h}</th>))}</tr>
              </thead>
              <tbody>
                {MOBIUS.sources.map((s) => (
                  <tr key={s.sourceId}>
                    <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.line}`, color: T.sub }}><b style={{ color: T.text, fontWeight: 500 }}>{s.name}</b></td>
                    <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.line}` }}><Badge color={GRADE_COLOR[s.reliability]}>{s.reliability}</Badge></td>
                    <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.line}`, color: T.sub }}>{s.usedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* 06 MOBIUS VIEW */}
        <section style={{ marginTop: 56 }}>
          <SectionHead id="06" title="Mobius View" jsonKey="sectorTrend" openJson={openJson} toggleJson={toggleJson} />
          <JsonView show={openJson.sectorTrend} data={MOBIUS.sectorTrend} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
            <Card title="Positive drivers" badge={<Badge color={[T.pos, T.posDim]}>{t.positiveDrivers.length}</Badge>}>
              <ul style={{ margin: 0, padding: 0 }}>{t.positiveDrivers.map((d) => <KV key={d} k="▲" v={d} />)}</ul>
            </Card>
            <Card title="Negative drivers" badge={<Badge color={[T.neg, T.negDim]}>{t.negativeDrivers.length}</Badge>}>
              <ul style={{ margin: 0, padding: 0 }}>{t.negativeDrivers.map((d) => <KV key={d} k="▼" v={d} />)}</ul>
            </Card>
            <Card title="Mobius read" style={{ gridColumn: "1 / -1", borderColor: "rgba(201,151,75,0.4)" }}>
              <p style={{ fontSize: 13.5, color: T.text, lineHeight: 1.65, margin: "6px 0 0" }}>{t.mobiusView}</p>
            </Card>
          </div>
        </section>

        <div style={{ marginTop: 60, borderTop: `1px solid ${T.line}`, paddingTop: 16, fontSize: 11.5, color: T.faint, fontFamily: T.mono }}>
          MOBIUS v0.1 · Anchor entity: kaspi · Compiled 02 Jul 2026 · Research priority only, not investment advice.
        </div>
      </div>
    </div>
  );
}
