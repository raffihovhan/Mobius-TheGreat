"""
World Bank & IMF API integration.
Falls back to mock data if APIs are unreachable or return no data.
"""
import asyncio
import httpx
from typing import Optional
import logging

logger = logging.getLogger(__name__)

WORLD_BANK_BASE = "https://api.worldbank.org/v2"

# World Bank indicator codes
WB_INDICATORS = {
    "gdp_growth":           "NY.GDP.MKTP.KD.ZG",
    "inflation":            "FP.CPI.TOTL.ZG",
    "govt_debt_pct_gdp":   "GC.DOD.TOTL.GD.ZS",
    "current_account_pct_gdp": "BN.CAB.XOKA.GD.ZS",
    "foreign_reserves_bn": "FI.RES.TOTL.CD",   # in current USD
    "interest_rate":       "FR.INR.RINR",       # lending rate (proxy)
}


async def fetch_wb_indicator(
    client: httpx.AsyncClient,
    country_iso3: str,
    indicator: str,
    mrv: int = 3,
) -> Optional[float]:
    """Return the most recent non-null value for a World Bank indicator."""
    url = f"{WORLD_BANK_BASE}/country/{country_iso3}/indicator/{indicator}"
    params = {"format": "json", "mrv": mrv, "per_page": mrv}
    try:
        r = await client.get(url, params=params, timeout=8.0)
        r.raise_for_status()
        data = r.json()
        if len(data) < 2 or not data[1]:
            return None
        for entry in data[1]:
            if entry.get("value") is not None:
                val = float(entry["value"])
                # convert reserves from USD to billions
                if indicator == WB_INDICATORS["foreign_reserves_bn"]:
                    val = round(val / 1e9, 1)
                return round(val, 2)
    except Exception as exc:
        logger.debug(f"WB fetch failed [{country_iso3}/{indicator}]: {exc}")
    return None


async def enrich_with_world_bank(country_iso3: str, base_macro: dict) -> dict:
    """
    Attempt to pull fresh World Bank data for a country.
    Keys that come back are merged into base_macro; missing keys keep mock values.
    """
    async with httpx.AsyncClient() as client:
        tasks = {
            label: fetch_wb_indicator(client, country_iso3, code)
            for label, code in WB_INDICATORS.items()
        }
        results = await asyncio.gather(*tasks.values(), return_exceptions=True)

    enriched = dict(base_macro)
    for label, result in zip(tasks.keys(), results):
        if isinstance(result, float):
            enriched[label] = result
            logger.info(f"WB live [{country_iso3}] {label} = {result}")

    return enriched
