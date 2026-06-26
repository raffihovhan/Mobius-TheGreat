"""
/api/scenarios  — policy scenario simulator engine.
POST a country + scenario + magnitude → get projected market effects.
"""
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from ..services.mock_data import COUNTRIES, SCENARIO_TEMPLATES

router = APIRouter(prefix="/api/scenarios", tags=["scenarios"])


class ScenarioRequest(BaseModel):
    country_iso2: str = Field(..., example="TR")
    scenario_key: str = Field(..., example="rate_hike")
    magnitude: Optional[float] = Field(None, description="Override default magnitude")


def _compute_scenario(country: dict, template: dict, magnitude: float) -> dict:
    """Apply the scenario lambda functions and build a structured result."""
    effects_raw = template["effects"]
    effects = {}

    for dim in ["currency", "bonds", "equities", "inflation", "investment"]:
        fn = effects_raw.get(dim)
        if callable(fn):
            direction, size, rationale = fn(magnitude)
            effects[dim] = {
                "direction": direction,
                "magnitude_pct": round(size, 1),
                "rationale": rationale,
            }

    return {
        "scenario": {
            "key":         template.get("key", ""),
            "label":       template["label"],
            "description": template["description"].replace("{magnitude}", str(magnitude)),
            "magnitude":   magnitude,
        },
        "country": {
            "iso2":   country.get("iso2", ""),
            "name":   country["name"],
            "region": country["region"],
            "macro":  country["macro"],
        },
        "effects":       effects,
        "sector_winners": effects_raw.get("sector_winners", []),
        "sector_losers":  effects_raw.get("sector_losers", []),
        "disclaimer": (
            "These projections are illustrative approximations based on historical "
            "macro patterns. They are not financial advice. Actual outcomes depend "
            "on country-specific factors, market structure, and global conditions."
        ),
    }


@router.get("/templates")
async def list_scenarios():
    """Return all available scenario templates."""
    return [
        {
            "key":         key,
            "label":       t["label"],
            "description": t["description"],
            "params":      {
                k: {p: v for p, v in param.items() if p != "type"}
                for k, param in t["params"].items()
            },
        }
        for key, t in SCENARIO_TEMPLATES.items()
    ]


@router.post("/run")
async def run_scenario(req: ScenarioRequest):
    """
    Run a policy scenario for a country.
    Returns projected directional effects on currency, bonds, equities, inflation,
    and investment climate, plus winning and losing sectors.
    """
    iso2 = req.country_iso2.upper()
    if iso2 not in COUNTRIES:
        raise HTTPException(status_code=404, detail=f"Country '{iso2}' not found")

    key = req.scenario_key.lower()
    if key not in SCENARIO_TEMPLATES:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown scenario '{key}'. Available: {list(SCENARIO_TEMPLATES.keys())}"
        )

    template = {**SCENARIO_TEMPLATES[key], "key": key}
    default_mag = template["params"].get("magnitude", {}).get("default", 1.0)
    magnitude = req.magnitude if req.magnitude is not None else default_mag

    country_data = {**COUNTRIES[iso2], "iso2": iso2}
    result = _compute_scenario(country_data, template, magnitude)
    return result


@router.get("/compare/{scenario_key}")
async def compare_across_countries(scenario_key: str, magnitude: Optional[float] = None):
    """
    Run the same scenario across all countries and return a ranked comparison.
    Useful for finding the markets most / least affected by a given policy shift.
    """
    key = scenario_key.lower()
    if key not in SCENARIO_TEMPLATES:
        raise HTTPException(status_code=400, detail=f"Unknown scenario '{key}'")

    template = {**SCENARIO_TEMPLATES[key], "key": key}
    default_mag = template["params"].get("magnitude", {}).get("default", 1.0)
    mag = magnitude if magnitude is not None else default_mag

    results = []
    for iso2, data in COUNTRIES.items():
        r = _compute_scenario({**data, "iso2": iso2}, template, mag)
        equity_effect = r["effects"].get("equities", {})
        results.append({
            "iso2":   iso2,
            "name":   data["name"],
            "region": data["region"],
            "equity_direction": equity_effect.get("direction", "unknown"),
            "equity_magnitude": equity_effect.get("magnitude_pct", 0.0),
            "currency_direction": r["effects"].get("currency", {}).get("direction", "unknown"),
            "investment_direction": r["effects"].get("investment", {}).get("direction", "unknown"),
        })

    return {
        "scenario_key": key,
        "scenario_label": template["label"],
        "magnitude": mag,
        "country_impacts": sorted(results, key=lambda x: x["equity_magnitude"], reverse=True),
    }
