// ─── Mobius API Client ──────────────────────────────────────────────────────
import type {
  CountrySummary,
  CountryDetail,
  ScenarioResult,
  ScenarioTemplate,
  SignalsResponse,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  countries: {
    list: (): Promise<CountrySummary[]> =>
      get<CountrySummary[]>("/api/countries/"),

    get: (iso2: string, live = false): Promise<CountryDetail> =>
      get<CountryDetail>(`/api/countries/${iso2}?live=${live}`),

    byRegion: (region: string): Promise<CountrySummary[]> =>
      get<CountrySummary[]>(`/api/countries/region/${encodeURIComponent(region)}`),
  },

  scenarios: {
    templates: (): Promise<ScenarioTemplate[]> =>
      get<ScenarioTemplate[]>("/api/scenarios/templates"),

    run: (
      countryIso2: string,
      scenarioKey: string,
      magnitude?: number
    ): Promise<ScenarioResult> =>
      post<ScenarioResult>("/api/scenarios/run", {
        country_iso2: countryIso2,
        scenario_key: scenarioKey,
        magnitude,
      }),
  },

  signals: {
    all: (filters?: {
      type?: string;
      region?: string;
      minStrength?: number;
    }): Promise<SignalsResponse> => {
      const params = new URLSearchParams();
      if (filters?.type) params.set("type_filter", filters.type);
      if (filters?.region) params.set("region", filters.region);
      if (filters?.minStrength) params.set("min_strength", String(filters.minStrength));
      return get<SignalsResponse>(`/api/signals/?${params}`);
    },

    forCountry: (iso2: string): Promise<SignalsResponse> =>
      get<SignalsResponse>(`/api/signals/${iso2}`),
  },
};
