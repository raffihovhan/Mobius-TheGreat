-- ─────────────────────────────────────────────────────────────────────────────
-- Mobius — PostgreSQL Schema
-- Run with: psql -U mobius_user -d mobius -f schema.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Extensions ───────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- trigram for fuzzy text search

-- ── Enums ────────────────────────────────────────────────────────────────────
CREATE TYPE impact_type AS ENUM ('positive', 'negative', 'neutral');
CREATE TYPE fx_trend_type AS ENUM ('appreciating', 'depreciating', 'stable', 'pegged', 'stabilizing');
CREATE TYPE data_source AS ENUM ('mock', 'world_bank', 'imf', 'bloomberg', 'manual');
CREATE TYPE signal_type AS ENUM ('opportunity', 'risk');

-- ── Countries ─────────────────────────────────────────────────────────────────
CREATE TABLE countries (
    iso2        CHAR(2)       PRIMARY KEY,
    iso3        CHAR(3)       NOT NULL UNIQUE,
    name        VARCHAR(100)  NOT NULL,
    region      VARCHAR(80),
    currency    VARCHAR(10),
    lat         DECIMAL(9,6),
    lng         DECIMAL(9,6),
    flag        VARCHAR(10),
    narrative   TEXT,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_countries_region ON countries(region);
CREATE INDEX idx_countries_name_trgm ON countries USING gin(name gin_trgm_ops);

-- ── Macro Snapshots ───────────────────────────────────────────────────────────
-- One row per country per data pull. Allows full time-series history.
CREATE TABLE macro_snapshots (
    id                       BIGSERIAL       PRIMARY KEY,
    country_iso2             CHAR(2)         NOT NULL REFERENCES countries(iso2) ON DELETE CASCADE,
    snapshot_date            TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    source                   data_source     NOT NULL DEFAULT 'mock',
    gdp_growth               NUMERIC(7,3),   -- % YoY
    inflation                NUMERIC(7,3),   -- % YoY CPI
    interest_rate            NUMERIC(7,3),   -- policy rate %
    govt_debt_pct_gdp        NUMERIC(7,2),   -- % of GDP
    budget_deficit_pct_gdp   NUMERIC(7,2),   -- % of GDP (negative = deficit)
    current_account_pct_gdp  NUMERIC(7,2),   -- % of GDP
    fx_trend                 fx_trend_type,
    fx_vs_usd                NUMERIC(18,4),  -- local per 1 USD
    fx_change_1y_pct         NUMERIC(7,2),   -- % change vs 1 year ago
    foreign_reserves_bn      NUMERIC(12,2),  -- USD billions
    country_risk_score       SMALLINT CHECK (country_risk_score BETWEEN 0 AND 100),
    credit_rating            VARCHAR(10)
);

CREATE INDEX idx_macro_country  ON macro_snapshots(country_iso2);
CREATE INDEX idx_macro_date     ON macro_snapshots(snapshot_date DESC);
CREATE INDEX idx_macro_latest   ON macro_snapshots(country_iso2, snapshot_date DESC);

-- ── Policy Events ─────────────────────────────────────────────────────────────
CREATE TABLE policy_events (
    id           BIGSERIAL     PRIMARY KEY,
    country_iso2 CHAR(2)       NOT NULL REFERENCES countries(iso2) ON DELETE CASCADE,
    date_label   VARCHAR(20),  -- e.g. "2024-Q3"
    event_date   DATE,         -- precise date if known
    event        TEXT          NOT NULL,
    impact       impact_type   NOT NULL DEFAULT 'neutral',
    tags         TEXT[],       -- e.g. {'monetary','IMF','rates'}
    source_url   TEXT,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_policy_country ON policy_events(country_iso2);
CREATE INDEX idx_policy_date    ON policy_events(event_date DESC NULLS LAST);
CREATE INDEX idx_policy_impact  ON policy_events(impact);
CREATE INDEX idx_policy_tags    ON policy_events USING gin(tags);

-- ── Scenarios (logged runs) ───────────────────────────────────────────────────
CREATE TABLE scenario_runs (
    id              BIGSERIAL   PRIMARY KEY,
    session_id      UUID        DEFAULT uuid_generate_v4(),
    country_iso2    CHAR(2)     NOT NULL,
    scenario_key    VARCHAR(50) NOT NULL,
    magnitude       NUMERIC(8,3),
    result_json     JSONB,
    run_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_scenario_country ON scenario_runs(country_iso2);
CREATE INDEX idx_scenario_key     ON scenario_runs(scenario_key);
CREATE INDEX idx_scenario_run_at  ON scenario_runs(run_at DESC);

-- ── Investment Signals (persisted) ────────────────────────────────────────────
CREATE TABLE investment_signals (
    id               BIGSERIAL   PRIMARY KEY,
    country_iso2     CHAR(2)     NOT NULL REFERENCES countries(iso2) ON DELETE CASCADE,
    signal_type      signal_type NOT NULL,
    title            VARCHAR(200) NOT NULL,
    rationale        TEXT,
    strength         SMALLINT    CHECK (strength BETWEEN 1 AND 5),
    asset_classes    TEXT[],
    generated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_until      TIMESTAMPTZ,
    is_active        BOOLEAN     NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_signals_country  ON investment_signals(country_iso2);
CREATE INDEX idx_signals_type     ON investment_signals(signal_type);
CREATE INDEX idx_signals_strength ON investment_signals(strength DESC);
CREATE INDEX idx_signals_active   ON investment_signals(is_active) WHERE is_active = TRUE;

-- ── Materialized View: Latest Macro Per Country ───────────────────────────────
-- Refreshed on schedule (e.g. daily): REFRESH MATERIALIZED VIEW CONCURRENTLY mv_latest_macro;
CREATE MATERIALIZED VIEW mv_latest_macro AS
SELECT DISTINCT ON (m.country_iso2)
    c.iso2,
    c.iso3,
    c.name,
    c.region,
    c.currency,
    c.lat,
    c.lng,
    c.flag,
    m.snapshot_date,
    m.source,
    m.gdp_growth,
    m.inflation,
    m.interest_rate,
    m.govt_debt_pct_gdp,
    m.budget_deficit_pct_gdp,
    m.current_account_pct_gdp,
    m.fx_trend,
    m.fx_vs_usd,
    m.fx_change_1y_pct,
    m.foreign_reserves_bn,
    m.country_risk_score,
    m.credit_rating
FROM macro_snapshots m
JOIN countries c ON c.iso2 = m.country_iso2
ORDER BY m.country_iso2, m.snapshot_date DESC;

CREATE UNIQUE INDEX idx_mv_latest_macro_iso2 ON mv_latest_macro(iso2);

-- ── Helper Function: upsert macro snapshot ────────────────────────────────────
CREATE OR REPLACE FUNCTION upsert_macro(
    p_iso2                   CHAR(2),
    p_source                 data_source,
    p_gdp_growth             NUMERIC,
    p_inflation              NUMERIC,
    p_interest_rate          NUMERIC,
    p_govt_debt              NUMERIC,
    p_budget_deficit         NUMERIC,
    p_current_account        NUMERIC,
    p_fx_trend               fx_trend_type,
    p_fx_vs_usd              NUMERIC,
    p_fx_change_1y           NUMERIC,
    p_reserves_bn            NUMERIC,
    p_risk_score             SMALLINT,
    p_credit_rating          VARCHAR
) RETURNS BIGINT AS $$
DECLARE
    v_id BIGINT;
BEGIN
    INSERT INTO macro_snapshots (
        country_iso2, source, gdp_growth, inflation, interest_rate,
        govt_debt_pct_gdp, budget_deficit_pct_gdp, current_account_pct_gdp,
        fx_trend, fx_vs_usd, fx_change_1y_pct, foreign_reserves_bn,
        country_risk_score, credit_rating
    ) VALUES (
        p_iso2, p_source, p_gdp_growth, p_inflation, p_interest_rate,
        p_govt_debt, p_budget_deficit, p_current_account,
        p_fx_trend, p_fx_vs_usd, p_fx_change_1y, p_reserves_bn,
        p_risk_score, p_credit_rating
    ) RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- ── Trigger: auto-update updated_at ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON countries
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
