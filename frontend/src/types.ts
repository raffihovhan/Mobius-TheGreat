// ─── Mobius TypeScript Types ────────────────────────────────────────────────

export interface MacroData {
  gdp_growth: number;
  inflation: number;
  interest_rate: number;
  govt_debt_pct_gdp: number;
  budget_deficit_pct_gdp: number;
  current_account_pct_gdp: number;
  fx_trend: "appreciating" | "depreciating" | "stable" | "pegged" | "stabilizing";
  fx_vs_usd: number;
  fx_change_1y_pct: number;
  foreign_reserves_bn: number;
  country_risk_score: number;
  credit_rating: string;
}

export interface PolicyEvent {
  date: string;
  event: string;
  impact: "positive" | "negative" | "neutral";
}

export interface Sectors {
  top: string[];
  opportunity: string[];
  risk: string[];
}

export interface CountrySummary {
  iso2: string;
  iso3: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  flag: string;
  macro: Pick<MacroData, "gdp_growth" | "inflation" | "interest_rate" | "country_risk_score" | "credit_rating" | "fx_trend">;
}

export interface CountryDetail extends CountrySummary {
  currency: string;
  macro: MacroData;
  sectors: Sectors;
  policy_events: PolicyEvent[];
  narrative: string;
}

export interface ScenarioEffect {
  direction: string;
  magnitude_pct: number;
  rationale: string;
}

export interface ScenarioResult {
  scenario: {
    key: string;
    label: string;
    description: string;
    magnitude: number;
  };
  country: {
    iso2: string;
    name: string;
    region: string;
  };
  effects: {
    currency: ScenarioEffect;
    bonds: ScenarioEffect;
    equities: ScenarioEffect;
    inflation: ScenarioEffect;
    investment: ScenarioEffect;
  };
  sector_winners: string[];
  sector_losers: string[];
  disclaimer: string;
}

export interface ScenarioTemplate {
  key: string;
  label: string;
  description: string;
  params: {
    magnitude?: { default: number; range: [number, number] };
  };
}

export interface Signal {
  country_iso2: string;
  country_name: string;
  region: string;
  flag: string;
  type: "opportunity" | "risk";
  title: string;
  rationale: string;
  strength: number;
  asset_class: string[];
}

export interface SignalsResponse {
  count: number;
  signals: Signal[];
}
