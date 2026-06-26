"""
/api/signals — investment opportunity & risk signal generation.
Scans all countries and surfaces actionable macro / policy-driven signals.
"""
from fastapi import APIRouter, Query
from typing import Optional
from ..services.mock_data import COUNTRIES

router = APIRouter(prefix="/api/signals", tags=["signals"])


def _score_opportunity(data: dict) -> dict:
    """
    Rule-based signal engine. Returns a list of signals for a country.
    Each signal has: type, title, rationale, strength (1-5), asset_class.
    """
    macro = data["macro"]
    signals = []

    # ── Currency Dislocation ─────────────────────────────────────────────────
    fx_change = macro.get("fx_change_1y_pct", 0)
    if fx_change < -20:
        signals.append({
            "type": "opportunity",
            "title": "Deep FX Dislocation — Exporter Re-rating",
            "rationale": f"Currency fell {abs(fx_change):.0f}% YoY, making local exports highly competitive in USD terms. Exporters, tourism, and agriculture could see margin expansion.",
            "strength": min(5, int(abs(fx_change) / 10)),
            "asset_class": ["Equities (exporters)", "Distressed FX bonds"],
        })

    # ── High Real Rate ───────────────────────────────────────────────────────
    real_rate = macro.get("interest_rate", 0) - macro.get("inflation", 0)
    if real_rate > 8:
        signals.append({
            "type": "opportunity",
            "title": "Very High Real Rate — Bond Entry Point",
            "rationale": f"Real policy rate is +{real_rate:.1f}%. Once inflation peaks, duration rally could generate significant total returns for early bond buyers.",
            "strength": min(5, int(real_rate / 4)),
            "asset_class": ["Local currency bonds", "EM debt funds"],
        })

    # ── IMF Program Credibility Signal ───────────────────────────────────────
    policy_texts = [e["event"].lower() for e in data.get("policy_events", [])]
    if any("imf" in t for t in policy_texts):
        signals.append({
            "type": "opportunity",
            "title": "IMF Program — Spread Compression Play",
            "rationale": "Active IMF engagement signals reform commitment and provides FX buffer. Sovereign spreads typically compress 150-400bps following program approval.",
            "strength": 3,
            "asset_class": ["Sovereign Eurobonds", "Local bonds"],
        })

    # ── Privatization / Market Opening ───────────────────────────────────────
    if any(kw in t for t in policy_texts for kw in ["privatiz", "liberali", "foreign ownership", "sez"]):
        signals.append({
            "type": "opportunity",
            "title": "Market Opening — M&A Wave Incoming",
            "rationale": "Policy changes reducing ownership restrictions or launching privatizations historically trigger a 2-3 year M&A cycle as foreign strategics and PE firms enter.",
            "strength": 4,
            "asset_class": ["Private Equity", "M&A targets", "IPO pipeline"],
        })

    # ── Infrastructure Boom ───────────────────────────────────────────────────
    if any(kw in t for t in policy_texts for kw in ["infrastructure", "construction", "world cup", "giga", "build"]):
        signals.append({
            "type": "opportunity",
            "title": "Infrastructure Supercycle — Construction Play",
            "rationale": "Large-scale infrastructure programs create multi-year demand for cement, steel, engineering services, and project finance. Early-cycle entry captures best returns.",
            "strength": 4,
            "asset_class": ["Construction equities", "Building materials", "Project finance bonds"],
        })

    # ── Green Energy Transition ───────────────────────────────────────────────
    if any(kw in t for t in policy_texts for kw in ["green", "renewable", "hydrogen", "solar", "wind", "energy transition"]):
        signals.append({
            "type": "opportunity",
            "title": "Energy Transition — Green Capex Pipeline",
            "rationale": "Government commitments to renewable energy create a long-dated project pipeline for investors. PPAs and green bonds provide relatively predictable returns.",
            "strength": 3,
            "asset_class": ["Green bonds", "Renewables infrastructure", "Utilities"],
        })

    # ── Debt Sustainability Risk ──────────────────────────────────────────────
    debt = macro.get("govt_debt_pct_gdp", 0)
    deficit = abs(macro.get("budget_deficit_pct_gdp", 0))
    if debt > 80 and deficit > 5:
        signals.append({
            "type": "risk",
            "title": "Debt Sustainability Warning",
            "rationale": f"Govt debt at {debt}% of GDP with a {deficit}% deficit. Refinancing risk is elevated; any external shock could trigger a debt event.",
            "strength": 4,
            "asset_class": ["Avoid: long-duration sovereign bonds", "Hedge: CDS"],
        })

    # ── Hyperinflation Risk ───────────────────────────────────────────────────
    inflation = macro.get("inflation", 0)
    if inflation > 50:
        signals.append({
            "type": "risk",
            "title": "Hyperinflationary Environment",
            "rationale": f"Inflation at {inflation}% destroys real returns on local assets. Only USD-indexed or hard-asset investments offer protection.",
            "strength": 5,
            "asset_class": ["Hard assets (land, gold)", "USD-denominated only", "Avoid: local bonds"],
        })

    # ── FX Peg Vulnerability ─────────────────────────────────────────────────
    if macro.get("fx_trend") == "pegged" and macro.get("country_risk_score", 0) > 55:
        signals.append({
            "type": "risk",
            "title": "Pegged Currency Under Stress",
            "rationale": "Maintaining a peg with elevated risk scores depletes reserves. Unwind risk creates sudden devaluation danger for unhedged positions.",
            "strength": 3,
            "asset_class": ["Monitor: reserves trajectory", "Hedge FX exposure"],
        })

    # ── Low Risk Score Entry ──────────────────────────────────────────────────
    risk = macro.get("country_risk_score", 100)
    growth = macro.get("gdp_growth", 0)
    if risk < 45 and growth > 4:
        signals.append({
            "type": "opportunity",
            "title": "Quality Growth Market — Core EM Allocation",
            "rationale": f"Strong {growth}% GDP growth with low country risk ({risk}/100) makes this an attractive core position. Likely index inclusion candidate.",
            "strength": 4,
            "asset_class": ["Equity index funds", "Investment-grade sovereign bonds", "FDI"],
        })

    return signals


@router.get("/")
async def get_all_signals(
    type_filter: Optional[str] = Query(None, description="Filter by 'opportunity' or 'risk'"),
    region: Optional[str] = Query(None, description="Filter by region"),
    min_strength: int = Query(1, ge=1, le=5),
):
    """
    Scan all countries and return investment signals.
    Optionally filter by signal type, region, or minimum strength.
    """
    output = []
    for iso2, data in COUNTRIES.items():
        if region and region.lower() not in data["region"].lower():
            continue
        signals = _score_opportunity(data)
        for sig in signals:
            if sig["strength"] < min_strength:
                continue
            if type_filter and sig["type"] != type_filter:
                continue
            output.append({
                "country_iso2": iso2,
                "country_name": data["name"],
                "region":       data["region"],
                "flag":         data["flag"],
                **sig,
            })

    # sort by strength desc
    output.sort(key=lambda x: x["strength"], reverse=True)
    return {"count": len(output), "signals": output}


@router.get("/{iso2}")
async def get_country_signals(iso2: str):
    """Return all signals for a single country."""
    iso2 = iso2.upper()
    if iso2 not in COUNTRIES:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Country '{iso2}' not found")

    data = COUNTRIES[iso2]
    signals = _score_opportunity(data)
    return {
        "country_iso2": iso2,
        "country_name": data["name"],
        "count": len(signals),
        "signals": signals,
    }
