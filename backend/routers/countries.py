"""
/api/countries  — list all countries and fetch individual country detail
with live World Bank enrichment.
"""
from fastapi import APIRouter, HTTPException
from typing import Optional
from ..services.mock_data import COUNTRIES
from ..services.world_bank import enrich_with_world_bank

router = APIRouter(prefix="/api/countries", tags=["countries"])


def _build_summary(iso2: str, data: dict) -> dict:
    """Lightweight summary for globe pins."""
    return {
        "iso2":   iso2,
        "iso3":   data["iso3"],
        "name":   data["name"],
        "region": data["region"],
        "lat":    data["lat"],
        "lng":    data["lng"],
        "flag":   data["flag"],
        "macro": {
            "gdp_growth":       data["macro"]["gdp_growth"],
            "inflation":        data["macro"]["inflation"],
            "interest_rate":    data["macro"]["interest_rate"],
            "country_risk_score": data["macro"]["country_risk_score"],
            "credit_rating":    data["macro"]["credit_rating"],
            "fx_trend":         data["macro"]["fx_trend"],
        },
    }


@router.get("/")
async def list_countries():
    """Return summary data for all countries — used to populate the globe."""
    return [_build_summary(iso2, data) for iso2, data in COUNTRIES.items()]


@router.get("/{iso2}")
async def get_country(iso2: str, live: Optional[bool] = True):
    """
    Return full country detail.
    If live=true (default), attempts World Bank enrichment on top of mock data.
    """
    iso2 = iso2.upper()
    if iso2 not in COUNTRIES:
        raise HTTPException(status_code=404, detail=f"Country '{iso2}' not found")

    data = COUNTRIES[iso2]
    macro = dict(data["macro"])

    if live:
        macro = await enrich_with_world_bank(data["iso3"], macro)

    return {
        "iso2":          iso2,
        "iso3":          data["iso3"],
        "name":          data["name"],
        "region":        data["region"],
        "lat":           data["lat"],
        "lng":           data["lng"],
        "flag":          data["flag"],
        "currency":      data["currency"],
        "macro":         macro,
        "sectors":       data["sectors"],
        "policy_events": data["policy_events"],
        "narrative":     data["narrative"],
    }


@router.get("/region/{region}")
async def get_by_region(region: str):
    """Filter countries by region (case-insensitive partial match)."""
    region_lower = region.lower()
    matches = [
        _build_summary(iso2, d)
        for iso2, d in COUNTRIES.items()
        if region_lower in d["region"].lower()
    ]
    if not matches:
        raise HTTPException(status_code=404, detail=f"No countries found for region '{region}'")
    return matches
