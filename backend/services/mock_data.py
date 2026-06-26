"""
Rich mock data for 20 emerging market countries.
Used as fallback when live APIs are unavailable.
"""

COUNTRIES = {
    # ─── Central Asia ────────────────────────────────────────────────────────
    "KZ": {
        "name": "Kazakhstan",
        "region": "Central Asia",
        "iso3": "KAZ",
        "lat": 48.0196,
        "lng": 66.9237,
        "flag": "🇰🇿",
        "currency": "KZT",
        "macro": {
            "gdp_growth": 4.1,
            "inflation": 9.8,
            "interest_rate": 15.25,
            "govt_debt_pct_gdp": 23.4,
            "budget_deficit_pct_gdp": -2.1,
            "current_account_pct_gdp": 0.8,
            "fx_trend": "stable",
            "fx_vs_usd": 449.5,
            "fx_change_1y_pct": -3.2,
            "foreign_reserves_bn": 35.1,
            "country_risk_score": 52,
            "credit_rating": "BBB-",
        },
        "sectors": {
            "top": ["Energy", "Mining", "Banking", "Agriculture"],
            "opportunity": ["Renewables", "Tech", "Tourism", "Logistics"],
            "risk": ["Oil price dependency", "Currency volatility"],
        },
        "policy_events": [
            {"date": "2024-Q3", "event": "National Fund reform — diversification mandate", "impact": "positive"},
            {"date": "2024-Q4", "event": "New mining code reduces royalties for rare earths", "impact": "positive"},
            {"date": "2025-Q1", "event": "CBK held rates at 15.25% amid disinflation", "impact": "neutral"},
        ],
        "narrative": (
            "Kazakhstan is the largest economy in Central Asia, heavily driven by oil "
            "and metals exports. Recent fiscal reforms and a commodity super-cycle "
            "tailwind support growth, but FX and political risk remain key concerns."
        ),
    },
    "UZ": {
        "name": "Uzbekistan",
        "region": "Central Asia",
        "iso3": "UZB",
        "lat": 41.2995,
        "lng": 69.2401,
        "flag": "🇺🇿",
        "currency": "UZS",
        "macro": {
            "gdp_growth": 6.2,
            "inflation": 10.5,
            "interest_rate": 13.5,
            "govt_debt_pct_gdp": 37.2,
            "budget_deficit_pct_gdp": -4.5,
            "current_account_pct_gdp": -4.1,
            "fx_trend": "depreciating",
            "fx_vs_usd": 12650.0,
            "fx_change_1y_pct": -5.8,
            "foreign_reserves_bn": 34.8,
            "country_risk_score": 58,
            "credit_rating": "BB-",
        },
        "sectors": {
            "top": ["Gold Mining", "Cotton/Textiles", "Gas", "Agriculture"],
            "opportunity": ["Manufacturing", "IT/BPO", "Tourism", "Agro-processing"],
            "risk": ["Current account deficit", "Remittance dependency"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "Full capital account liberalization announced", "impact": "positive"},
            {"date": "2024-Q3", "event": "SEZ expansion — 15 new free economic zones", "impact": "positive"},
            {"date": "2025-Q1", "event": "IMF Article IV praises reform pace", "impact": "positive"},
        ],
        "narrative": (
            "Uzbekistan is one of the fastest-reforming economies in Eurasia. "
            "Market liberalization since 2017 has attracted FDI and opened sectors "
            "previously closed to foreigners. A young population and cheap labor "
            "make it compelling for manufacturing M&A."
        ),
    },
    "GE": {
        "name": "Georgia",
        "region": "Caucasus",
        "iso3": "GEO",
        "lat": 42.3154,
        "lng": 43.3569,
        "flag": "🇬🇪",
        "currency": "GEL",
        "macro": {
            "gdp_growth": 7.5,
            "inflation": 3.2,
            "interest_rate": 8.0,
            "govt_debt_pct_gdp": 38.9,
            "budget_deficit_pct_gdp": -2.8,
            "current_account_pct_gdp": -4.7,
            "fx_trend": "appreciating",
            "fx_vs_usd": 2.69,
            "fx_change_1y_pct": 3.1,
            "foreign_reserves_bn": 5.1,
            "country_risk_score": 44,
            "credit_rating": "BB",
        },
        "sectors": {
            "top": ["Banking", "Tourism", "Logistics", "Real Estate"],
            "opportunity": ["Tech Hub", "Pharma", "Wine exports", "Renewable Energy"],
            "risk": ["Geopolitical proximity to Russia", "CA deficit"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "EU candidate status drives reform pipeline", "impact": "positive"},
            {"date": "2024-Q4", "event": "Re-Russians capital inflow slows — policy stabilizes", "impact": "neutral"},
            {"date": "2025-Q1", "event": "NBG cuts rates to 8.0% on lower inflation", "impact": "positive"},
        ],
        "narrative": (
            "Georgia punches above its weight on ease of doing business and low "
            "corruption. The EU accession path is a strong institutional anchor. "
            "Strong tourism rebound and tech hub status attract diaspora investment."
        ),
    },
    "AZ": {
        "name": "Azerbaijan",
        "region": "Caucasus",
        "iso3": "AZE",
        "lat": 40.4093,
        "lng": 49.8671,
        "flag": "🇦🇿",
        "currency": "AZN",
        "macro": {
            "gdp_growth": 2.8,
            "inflation": 7.5,
            "interest_rate": 8.5,
            "govt_debt_pct_gdp": 18.2,
            "budget_deficit_pct_gdp": 4.2,
            "current_account_pct_gdp": 13.6,
            "fx_trend": "pegged",
            "fx_vs_usd": 1.70,
            "fx_change_1y_pct": 0.0,
            "foreign_reserves_bn": 10.8,
            "country_risk_score": 48,
            "credit_rating": "BB+",
        },
        "sectors": {
            "top": ["Oil & Gas", "Construction", "Agriculture"],
            "opportunity": ["Non-oil diversification", "ICT", "Tourism (Karabakh)", "Logistics"],
            "risk": ["Oil dependency (>90% exports)", "Dutch disease risk"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "SOCAR privatization of downstream assets begins", "impact": "positive"},
            {"date": "2024-Q4", "event": "COP29 hosted in Baku — green investment pledge", "impact": "positive"},
            {"date": "2025-Q1", "event": "Southern Gas Corridor expansion deal signed with EU", "impact": "positive"},
        ],
        "narrative": (
            "Azerbaijan's oil wealth funds a large sovereign wealth fund (SOFAZ). "
            "Post-Karabakh conflict, reconstruction creates significant M&A and "
            "construction opportunities. Non-oil diversification is the key policy goal."
        ),
    },

    # ─── Middle East ─────────────────────────────────────────────────────────
    "TR": {
        "name": "Turkey",
        "region": "Middle East / Europe",
        "iso3": "TUR",
        "lat": 38.9637,
        "lng": 35.2433,
        "flag": "🇹🇷",
        "currency": "TRY",
        "macro": {
            "gdp_growth": 3.1,
            "inflation": 44.5,
            "interest_rate": 46.0,
            "govt_debt_pct_gdp": 31.0,
            "budget_deficit_pct_gdp": -5.2,
            "current_account_pct_gdp": -2.8,
            "fx_trend": "depreciating",
            "fx_vs_usd": 34.2,
            "fx_change_1y_pct": -22.1,
            "foreign_reserves_bn": 98.5,
            "country_risk_score": 68,
            "credit_rating": "B+",
        },
        "sectors": {
            "top": ["Manufacturing", "Banking", "Tourism", "Defense", "Retail"],
            "opportunity": ["Defense exports", "Regional logistics hub", "Distressed assets"],
            "risk": ["High inflation", "TRY depreciation", "Political risk"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "CBRT raises rates to 46% — orthodox policy pivot", "impact": "positive"},
            {"date": "2024-Q3", "event": "Fiscal consolidation plan — VAT hike approved", "impact": "neutral"},
            {"date": "2025-Q1", "event": "Tourism revenues hit record $60bn", "impact": "positive"},
        ],
        "narrative": (
            "Turkey made a sharp u-turn to orthodox monetary policy in 2023. "
            "High real rates are painful near-term but rebuilding credibility. "
            "Cheap TRY creates M&A opportunities in manufacturing and tourism. "
            "Defense sector booming on NATO demand and regional conflicts."
        ),
    },
    "SA": {
        "name": "Saudi Arabia",
        "region": "Middle East",
        "iso3": "SAU",
        "lat": 23.8859,
        "lng": 45.0792,
        "flag": "🇸🇦",
        "currency": "SAR",
        "macro": {
            "gdp_growth": 1.9,
            "inflation": 1.7,
            "interest_rate": 6.0,
            "govt_debt_pct_gdp": 26.4,
            "budget_deficit_pct_gdp": -2.0,
            "current_account_pct_gdp": 3.1,
            "fx_trend": "pegged",
            "fx_vs_usd": 3.75,
            "fx_change_1y_pct": 0.0,
            "foreign_reserves_bn": 451.0,
            "country_risk_score": 35,
            "credit_rating": "A",
        },
        "sectors": {
            "top": ["Oil & Gas", "Petrochemicals", "Construction", "Finance"],
            "opportunity": ["Entertainment", "Tourism", "Renewables", "Sports", "Giga-projects"],
            "risk": ["Oil price dependency", "Vision 2030 execution risk"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "NEOM Phase 2 — $500bn construction acceleration", "impact": "positive"},
            {"date": "2024-Q3", "event": "100% foreign ownership in most sectors approved", "impact": "positive"},
            {"date": "2025-Q1", "event": "Aramco secondary offering raises $11bn", "impact": "neutral"},
        ],
        "narrative": (
            "Saudi Arabia's Vision 2030 is the biggest economic transformation story "
            "in the GCC. Giga-projects, sports, entertainment, and tourism investment "
            "create large procurement and M&A pipelines. Low political risk for the region."
        ),
    },
    "EG": {
        "name": "Egypt",
        "region": "Middle East / Africa",
        "iso3": "EGY",
        "lat": 26.8206,
        "lng": 30.8025,
        "flag": "🇪🇬",
        "currency": "EGP",
        "macro": {
            "gdp_growth": 4.2,
            "inflation": 25.7,
            "interest_rate": 27.25,
            "govt_debt_pct_gdp": 89.1,
            "budget_deficit_pct_gdp": -6.1,
            "current_account_pct_gdp": -1.2,
            "fx_trend": "stabilizing",
            "fx_vs_usd": 48.6,
            "fx_change_1y_pct": -35.2,
            "foreign_reserves_bn": 46.5,
            "country_risk_score": 72,
            "credit_rating": "B",
        },
        "sectors": {
            "top": ["Tourism", "Suez Canal", "Energy", "Telecoms", "Real Estate"],
            "opportunity": ["Green hydrogen", "Data centers", "Agri-tech", "Distressed privatizations"],
            "risk": ["IMF program compliance", "Debt sustainability", "FX risk"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "IMF $8bn extended program approved", "impact": "positive"},
            {"date": "2024-Q2", "event": "EGP devaluation — floated at 48 to USD", "impact": "neutral"},
            {"date": "2024-Q4", "event": "UAE $35bn Ras el-Hekma deal closes", "impact": "positive"},
        ],
        "narrative": (
            "Egypt is undergoing painful but necessary IMF-backed stabilization. "
            "The EGP devaluation makes Egyptian assets very cheap in USD terms. "
            "The UAE investment deal provides a confidence anchor. Post-correction, "
            "selected banks and consumer plays offer contrarian opportunity."
        ),
    },

    # ─── Latin America ────────────────────────────────────────────────────────
    "BR": {
        "name": "Brazil",
        "region": "Latin America",
        "iso3": "BRA",
        "lat": -14.2350,
        "lng": -51.9253,
        "flag": "🇧🇷",
        "currency": "BRL",
        "macro": {
            "gdp_growth": 2.9,
            "inflation": 4.8,
            "interest_rate": 10.5,
            "govt_debt_pct_gdp": 87.5,
            "budget_deficit_pct_gdp": -7.1,
            "current_account_pct_gdp": -2.1,
            "fx_trend": "depreciating",
            "fx_vs_usd": 5.08,
            "fx_change_1y_pct": -8.2,
            "foreign_reserves_bn": 355.0,
            "country_risk_score": 55,
            "credit_rating": "BB",
        },
        "sectors": {
            "top": ["Agribusiness", "Energy (pre-salt oil)", "Mining", "Finance", "Consumer"],
            "opportunity": ["Green economy", "Offshore wind", "Fintech", "Healthcare"],
            "risk": ["Fiscal trajectory", "BRL weakness", "Political noise"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "Ecological transformation plan — R$500bn green investment", "impact": "positive"},
            {"date": "2024-Q3", "event": "BACEN begins rate cutting cycle to 10.5%", "impact": "positive"},
            {"date": "2025-Q1", "event": "Fiscal framework stress — primary deficit widens", "impact": "negative"},
        ],
        "narrative": (
            "Brazil's vast commodity base, large domestic market, and deep capital "
            "markets make it the anchor EM in LatAm. Fiscal concerns weigh on BRL "
            "but agribusiness and green energy offer structural growth. Petrobras "
            "and Vale remain globally significant."
        ),
    },
    "MX": {
        "name": "Mexico",
        "region": "Latin America",
        "iso3": "MEX",
        "lat": 23.6345,
        "lng": -102.5528,
        "flag": "🇲🇽",
        "currency": "MXN",
        "macro": {
            "gdp_growth": 1.5,
            "inflation": 4.7,
            "interest_rate": 11.0,
            "govt_debt_pct_gdp": 48.5,
            "budget_deficit_pct_gdp": -5.9,
            "current_account_pct_gdp": -0.9,
            "fx_trend": "depreciating",
            "fx_vs_usd": 17.8,
            "fx_change_1y_pct": -12.4,
            "foreign_reserves_bn": 213.5,
            "country_risk_score": 50,
            "credit_rating": "BBB",
        },
        "sectors": {
            "top": ["Manufacturing", "Nearshoring", "Oil & Gas", "Finance", "Remittances"],
            "opportunity": ["Nearshoring supply chain", "Industrial parks", "Semiconductors"],
            "risk": ["Judicial reform uncertainty", "Pemex liabilities", "US trade risk"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "Nearshoring investment hits record $40bn", "impact": "positive"},
            {"date": "2024-Q2", "event": "Constitutional judicial reform — market selloff", "impact": "negative"},
            {"date": "2025-Q1", "event": "Banxico cuts 11% — monetary easing cycle begins", "impact": "positive"},
        ],
        "narrative": (
            "Mexico is the biggest nearshoring beneficiary of US-China decoupling. "
            "Manufacturing FDI is at record highs driven by Tesla, TSMC supply chain "
            "and USMCA. Judicial reforms created volatility but underlying trends intact."
        ),
    },
    "CO": {
        "name": "Colombia",
        "region": "Latin America",
        "iso3": "COL",
        "lat": 4.5709,
        "lng": -74.2973,
        "flag": "🇨🇴",
        "currency": "COP",
        "macro": {
            "gdp_growth": 1.6,
            "inflation": 6.1,
            "interest_rate": 10.75,
            "govt_debt_pct_gdp": 56.8,
            "budget_deficit_pct_gdp": -4.2,
            "current_account_pct_gdp": -2.9,
            "fx_trend": "depreciating",
            "fx_vs_usd": 4050.0,
            "fx_change_1y_pct": -9.1,
            "foreign_reserves_bn": 59.2,
            "country_risk_score": 58,
            "credit_rating": "BB+",
        },
        "sectors": {
            "top": ["Oil & Gas", "Mining", "Agriculture", "Finance"],
            "opportunity": ["Clean energy (hydro, wind)", "Tourism", "Agri-exports"],
            "risk": ["Petro government uncertainty", "Security", "Oil phase-out policy"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "Government freezes new oil exploration licenses", "impact": "negative"},
            {"date": "2024-Q3", "event": "BanRep cuts rates aggressively to 10.75%", "impact": "positive"},
            {"date": "2025-Q1", "event": "Energy transition plan — $20bn renewable target", "impact": "positive"},
        ],
        "narrative": (
            "Colombia faces a policy transition risk as President Petro pursues "
            "energy transition away from oil. Short-term fiscal pressure but "
            "renewable energy creates fresh M&A opportunities. Strong banking sector."
        ),
    },

    # ─── Southeast Asia ───────────────────────────────────────────────────────
    "ID": {
        "name": "Indonesia",
        "region": "Southeast Asia",
        "iso3": "IDN",
        "lat": -0.7893,
        "lng": 113.9213,
        "flag": "🇮🇩",
        "currency": "IDR",
        "macro": {
            "gdp_growth": 5.1,
            "inflation": 2.8,
            "interest_rate": 6.25,
            "govt_debt_pct_gdp": 39.2,
            "budget_deficit_pct_gdp": -2.7,
            "current_account_pct_gdp": -0.5,
            "fx_trend": "stable",
            "fx_vs_usd": 15950.0,
            "fx_change_1y_pct": -3.5,
            "foreign_reserves_bn": 144.0,
            "country_risk_score": 42,
            "credit_rating": "BBB",
        },
        "sectors": {
            "top": ["Nickel/EV battery metals", "Palm oil", "Coal", "Banking", "Digital"],
            "opportunity": ["EV supply chain", "Green nickel", "Digital economy", "Islamic finance"],
            "risk": ["Commodity price exposure", "Political transition (Prabowo era)", "FX"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "Nickel ore export ban — downstream processing push", "impact": "positive"},
            {"date": "2024-Q4", "event": "Prabowo inaugurated — continuity policies signaled", "impact": "neutral"},
            {"date": "2025-Q1", "event": "BI rate cut to 6.25% — growth support", "impact": "positive"},
        ],
        "narrative": (
            "Indonesia is the world's largest nickel producer and a critical node in "
            "EV battery supply chains. The export ban policy has attracted massive "
            "Chinese and Korean smelting FDI. Demographics (280M people) support "
            "strong domestic consumption story."
        ),
    },
    "VN": {
        "name": "Vietnam",
        "region": "Southeast Asia",
        "iso3": "VNM",
        "lat": 14.0583,
        "lng": 108.2772,
        "flag": "🇻🇳",
        "currency": "VND",
        "macro": {
            "gdp_growth": 6.8,
            "inflation": 3.6,
            "interest_rate": 4.5,
            "govt_debt_pct_gdp": 34.8,
            "budget_deficit_pct_gdp": -3.7,
            "current_account_pct_gdp": 4.7,
            "fx_trend": "stable",
            "fx_vs_usd": 25200.0,
            "fx_change_1y_pct": -3.1,
            "foreign_reserves_bn": 87.0,
            "country_risk_score": 38,
            "credit_rating": "BB+",
        },
        "sectors": {
            "top": ["Electronics manufacturing", "Textiles", "Seafood", "Tourism"],
            "opportunity": ["Semiconductors", "Renewable energy", "Tech manufacturing", "Real estate"],
            "risk": ["Grid capacity", "Skilled labor shortage", "Regulatory unpredictability"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "US-Vietnam Comprehensive Strategic Partnership deepens", "impact": "positive"},
            {"date": "2024-Q2", "event": "Samsung chips plant expansion — $3bn investment", "impact": "positive"},
            {"date": "2024-Q4", "event": "PDP8 energy plan approves 73GW by 2030", "impact": "positive"},
        ],
        "narrative": (
            "Vietnam is the clearest winner of China+1 manufacturing diversification. "
            "Apple, Samsung, Intel all expanding here. Lowest manufacturing costs in "
            "ASEAN with improving infrastructure. Strong current account and reserves."
        ),
    },
    "TH": {
        "name": "Thailand",
        "region": "Southeast Asia",
        "iso3": "THA",
        "lat": 15.8700,
        "lng": 100.9925,
        "flag": "🇹🇭",
        "currency": "THB",
        "macro": {
            "gdp_growth": 2.8,
            "inflation": 1.1,
            "interest_rate": 2.5,
            "govt_debt_pct_gdp": 63.8,
            "budget_deficit_pct_gdp": -3.9,
            "current_account_pct_gdp": 1.5,
            "fx_trend": "depreciating",
            "fx_vs_usd": 35.1,
            "fx_change_1y_pct": -4.8,
            "foreign_reserves_bn": 215.0,
            "country_risk_score": 40,
            "credit_rating": "BBB+",
        },
        "sectors": {
            "top": ["Tourism", "Auto manufacturing", "Electronics", "Agriculture"],
            "opportunity": ["EV hub (Chinese OEMs)", "Digital economy", "Medical tourism"],
            "risk": ["Aging population", "Sluggish growth", "Political instability"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "EV incentive package — Chinese OEMs flock in", "impact": "positive"},
            {"date": "2024-Q3", "event": "BOT holds rates at 2.5% — cautious stance", "impact": "neutral"},
            {"date": "2025-Q1", "event": "Digital wallet stimulus program launched", "impact": "positive"},
        ],
        "narrative": (
            "Thailand is becoming an EV manufacturing hub with BYD, SAIC, and GAC "
            "setting up plants. Tourism is recovering to pre-COVID levels. "
            "Political stability improved after 2023 elections but risks remain."
        ),
    },

    # ─── Africa ───────────────────────────────────────────────────────────────
    "NG": {
        "name": "Nigeria",
        "region": "Africa",
        "iso3": "NGA",
        "lat": 9.0820,
        "lng": 8.6753,
        "flag": "🇳🇬",
        "currency": "NGN",
        "macro": {
            "gdp_growth": 3.2,
            "inflation": 29.9,
            "interest_rate": 26.25,
            "govt_debt_pct_gdp": 39.4,
            "budget_deficit_pct_gdp": -5.4,
            "current_account_pct_gdp": 0.5,
            "fx_trend": "depreciating",
            "fx_vs_usd": 1590.0,
            "fx_change_1y_pct": -42.0,
            "foreign_reserves_bn": 33.5,
            "country_risk_score": 75,
            "credit_rating": "B-",
        },
        "sectors": {
            "top": ["Oil & Gas", "Telecoms", "Banking", "Agriculture", "FMCG"],
            "opportunity": ["Fintech", "Agriculture tech", "Dangote refinery downstream", "Power infrastructure"],
            "risk": ["FX crisis", "Fuel subsidy removal shock", "Security", "Power outages"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "Fuel subsidy fully removed — reform milestone", "impact": "positive"},
            {"date": "2024-Q2", "event": "NGN floated — devaluation to 1500+ per USD", "impact": "neutral"},
            {"date": "2024-Q4", "event": "Dangote refinery starts production — $20bn complex", "impact": "positive"},
        ],
        "narrative": (
            "Nigeria's Tinubu government delivered painful but necessary reforms. "
            "FX liberalization and subsidy removal are IMF-approved. The Dangote "
            "refinery is a game-changer for fuel imports. Fintech sector (Flutterwave, "
            "Paystack) is world-class. High risk, high return."
        ),
    },
    "KE": {
        "name": "Kenya",
        "region": "Africa",
        "iso3": "KEN",
        "lat": -0.0236,
        "lng": 37.9062,
        "flag": "🇰🇪",
        "currency": "KES",
        "macro": {
            "gdp_growth": 5.1,
            "inflation": 5.7,
            "interest_rate": 13.0,
            "govt_debt_pct_gdp": 67.5,
            "budget_deficit_pct_gdp": -5.8,
            "current_account_pct_gdp": -4.2,
            "fx_trend": "stabilizing",
            "fx_vs_usd": 128.5,
            "fx_change_1y_pct": 15.2,  # KES recovered
            "foreign_reserves_bn": 8.2,
            "country_risk_score": 62,
            "credit_rating": "B",
        },
        "sectors": {
            "top": ["Fintech/MPesa", "Agriculture", "Tourism", "Telecoms"],
            "opportunity": ["Green energy (geothermal)", "Agri-fintech", "East Africa hub services"],
            "risk": ["Debt overhang", "Political risk (protests)", "Drought/climate"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "Eurobond buyback — debt crisis averted", "impact": "positive"},
            {"date": "2024-Q3", "event": "Finance Bill 2024 withdrawn — mass protest response", "impact": "neutral"},
            {"date": "2025-Q1", "event": "CBK cuts rates to 13% on KES stabilization", "impact": "positive"},
        ],
        "narrative": (
            "Kenya avoided a debt crisis and the KES staged a sharp recovery. "
            "M-Pesa and the broader fintech ecosystem make Nairobi the Silicon "
            "Savannah of Africa. East Africa hub status drives regional opportunity."
        ),
    },
    "ZA": {
        "name": "South Africa",
        "region": "Africa",
        "iso3": "ZAF",
        "lat": -30.5595,
        "lng": 22.9375,
        "flag": "🇿🇦",
        "currency": "ZAR",
        "macro": {
            "gdp_growth": 1.3,
            "inflation": 4.5,
            "interest_rate": 8.25,
            "govt_debt_pct_gdp": 73.6,
            "budget_deficit_pct_gdp": -5.0,
            "current_account_pct_gdp": -1.8,
            "fx_trend": "stable",
            "fx_vs_usd": 18.5,
            "fx_change_1y_pct": 5.1,
            "foreign_reserves_bn": 62.4,
            "country_risk_score": 60,
            "credit_rating": "BB-",
        },
        "sectors": {
            "top": ["Mining (PGM, gold)", "Finance", "Retail", "Telecoms"],
            "opportunity": ["Renewable energy (wind/solar)", "GNU-driven reform plays", "Tourism rebound"],
            "risk": ["Eskom power crisis", "Crime", "Low growth", "Political coalition fragility"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "GNU (Government of National Unity) formed — ANC+DA", "impact": "positive"},
            {"date": "2024-Q3", "event": "Eskom — 6 months without loadshedding milestone", "impact": "positive"},
            {"date": "2025-Q1", "event": "SARB cuts rates to 8.25% — cautious easing", "impact": "positive"},
        ],
        "narrative": (
            "South Africa's GNU formation was a watershed political moment. "
            "ANC+DA coalition reduced political risk premium significantly. "
            "Eskom power crisis is easing. PGMs and gold mining offer "
            "commodity exposure with improving operational conditions."
        ),
    },
    "MA": {
        "name": "Morocco",
        "region": "Africa",
        "iso3": "MAR",
        "lat": 31.7917,
        "lng": -7.0926,
        "flag": "🇲🇦",
        "currency": "MAD",
        "macro": {
            "gdp_growth": 3.4,
            "inflation": 2.5,
            "interest_rate": 2.75,
            "govt_debt_pct_gdp": 70.0,
            "budget_deficit_pct_gdp": -4.4,
            "current_account_pct_gdp": -2.1,
            "fx_trend": "stable",
            "fx_vs_usd": 10.1,
            "fx_change_1y_pct": -1.5,
            "foreign_reserves_bn": 34.8,
            "country_risk_score": 37,
            "credit_rating": "BB+",
        },
        "sectors": {
            "top": ["Phosphates (OCP)", "Tourism", "Automotive", "Agri-exports"],
            "opportunity": ["Green hydrogen", "Europe nearshoring", "World Cup 2030 infrastructure", "Solar"],
            "risk": ["Drought/water stress", "High youth unemployment", "CA deficit"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "World Cup 2030 co-host confirmed — €25bn infrastructure plan", "impact": "positive"},
            {"date": "2024-Q3", "event": "Renault, Stellantis expand Casablanca auto plants", "impact": "positive"},
            {"date": "2025-Q1", "event": "Green hydrogen strategy — 4GW electrolyzer target by 2030", "impact": "positive"},
        ],
        "narrative": (
            "Morocco is Africa's most stable investment destination. OCP Group "
            "controls ~72% of global phosphate reserves — critical for food security. "
            "World Cup 2030 is a decade-long infrastructure catalyst. Green hydrogen "
            "ambition targets European energy transition demand."
        ),
    },

    # ─── Additional ───────────────────────────────────────────────────────────
    "PH": {
        "name": "Philippines",
        "region": "Southeast Asia",
        "iso3": "PHL",
        "lat": 12.8797,
        "lng": 121.7740,
        "flag": "🇵🇭",
        "currency": "PHP",
        "macro": {
            "gdp_growth": 5.6,
            "inflation": 3.9,
            "interest_rate": 6.5,
            "govt_debt_pct_gdp": 60.2,
            "budget_deficit_pct_gdp": -5.6,
            "current_account_pct_gdp": -2.5,
            "fx_trend": "stable",
            "fx_vs_usd": 56.8,
            "fx_change_1y_pct": -4.2,
            "foreign_reserves_bn": 103.0,
            "country_risk_score": 45,
            "credit_rating": "BBB",
        },
        "sectors": {
            "top": ["BPO/IT services", "Remittances", "Consumer", "Real Estate", "Mining"],
            "opportunity": ["Semiconductor manufacturing", "Nickel downstream", "Tourism", "Renewables"],
            "risk": ["South China Sea tension", "Typhoon exposure", "Infrastructure gaps"],
        },
        "policy_events": [
            {"date": "2024-Q2", "event": "100% foreign ownership in some utilities approved", "impact": "positive"},
            {"date": "2024-Q3", "event": "PBBM infrastructure push — $168bn Build Better More", "impact": "positive"},
            {"date": "2025-Q1", "event": "BSP cuts to 6.5% — easing cycle starts", "impact": "positive"},
        ],
        "narrative": (
            "Philippines has the strongest BPO sector in Asia with 1.5M workers. "
            "Remittances provide a stable FX buffer. New foreign ownership rules "
            "unlock previously closed sectors including utilities and retail."
        ),
    },
    "AR": {
        "name": "Argentina",
        "region": "Latin America",
        "iso3": "ARG",
        "lat": -38.4161,
        "lng": -63.6167,
        "flag": "🇦🇷",
        "currency": "ARS",
        "macro": {
            "gdp_growth": -3.5,
            "inflation": 133.0,
            "interest_rate": 60.0,
            "govt_debt_pct_gdp": 88.0,
            "budget_deficit_pct_gdp": 0.3,  # Milei surplus achieved
            "current_account_pct_gdp": -0.8,
            "fx_trend": "stabilizing",
            "fx_vs_usd": 1010.0,
            "fx_change_1y_pct": -55.0,
            "foreign_reserves_bn": 28.2,
            "country_risk_score": 80,
            "credit_rating": "CCC",
        },
        "sectors": {
            "top": ["Agriculture (soy, corn)", "Energy (Vaca Muerta)", "Mining (lithium)"],
            "opportunity": ["Vaca Muerta gas exports", "Lithium triangle", "Agri-tech", "LNG infrastructure"],
            "risk": ["Hyperinflation", "Debt renegotiation", "Social unrest", "Political reversal"],
        },
        "policy_events": [
            {"date": "2024-Q1", "event": "Milei achieves primary fiscal surplus — first in 16 years", "impact": "positive"},
            {"date": "2024-Q2", "event": "RIGI investment incentive regime — $25bn+ committed", "impact": "positive"},
            {"date": "2024-Q4", "event": "IMF program discussions advance — $15bn target", "impact": "positive"},
        ],
        "narrative": (
            "Javier Milei's shock therapy is delivering a fiscal miracle but social "
            "pain is severe. The Vaca Muerta shale formation is world-class and "
            "massive. Argentina's lithium reserves are a generational asset. "
            "Extremely high risk but potentially enormous asymmetric upside."
        ),
    },
}

# ─── Policy Scenario Engine ────────────────────────────────────────────────────

SCENARIO_TEMPLATES = {
    "rate_hike": {
        "label": "Central Bank Rate Hike",
        "description": "The central bank raises the policy rate by {magnitude}%",
        "params": {"magnitude": {"type": "float", "default": 2.0, "range": [0.25, 10.0]}},
        "effects": {
            "currency": lambda m: ("appreciate", min(m * 1.8, 8.0), f"+{m*1.8:.1f}% (higher carry attracts flows)"),
            "bonds": lambda m: ("bearish", min(m * 2.1, 12.0), f"Yields rise ~{m*2.1:.1f}bps (price fall)"),
            "equities": lambda m: ("bearish", min(m * 1.5, 9.0), f"P/E compression; banks benefit, growth stocks hurt"),
            "inflation": lambda m: ("down", min(m * 0.8, 5.0), f"Demand cooling expected in 6–18 months"),
            "investment": lambda m: ("negative", min(m * 1.0, 6.0), f"Higher cost of capital; project deferrals likely"),
            "sector_winners": ["Banks (NIM expansion)", "FX-earners (carry)", "Utilities (refinancing risk priced in)"],
            "sector_losers": ["Real estate", "Growth/Tech", "Highly-leveraged corporates"],
        },
    },
    "rate_cut": {
        "label": "Central Bank Rate Cut",
        "description": "The central bank cuts the policy rate by {magnitude}%",
        "params": {"magnitude": {"type": "float", "default": 1.5, "range": [0.25, 10.0]}},
        "effects": {
            "currency": lambda m: ("depreciate", min(m * 1.5, 7.0), f"-{m*1.5:.1f}% (carry unwind)"),
            "bonds": lambda m: ("bullish", min(m * 2.0, 11.0), f"Yields fall; duration trade attractive"),
            "equities": lambda m: ("bullish", min(m * 2.0, 12.0), f"Multiple expansion; RE and consumer benefit"),
            "inflation": lambda m: ("up", min(m * 0.7, 4.5), f"Demand stimulus may lift prices 6–12M lagged"),
            "investment": lambda m: ("positive", min(m * 1.5, 8.0), f"Lower hurdle rate; capex and M&A activity rise"),
            "sector_winners": ["Real estate", "Consumer discretionary", "Industrials", "Private equity"],
            "sector_losers": ["Banks (NIM pressure)", "Savers", "Insurance (reinvestment risk)"],
        },
    },
    "infrastructure_program": {
        "label": "Major Infrastructure Program",
        "description": "Government launches a large infrastructure investment program ({magnitude}% of GDP)",
        "params": {"magnitude": {"type": "float", "default": 3.0, "range": [0.5, 15.0]}},
        "effects": {
            "currency": lambda m: ("depreciate", min(m * 0.4, 3.0), f"Fiscal expansion widens deficit — modest FX pressure"),
            "bonds": lambda m: ("bearish", min(m * 0.7, 5.0), f"Higher govt borrowing — supply pressure on bonds"),
            "equities": lambda m: ("bullish", min(m * 2.5, 15.0), f"Construction, materials, logistics re-rated"),
            "inflation": lambda m: ("up", min(m * 0.5, 4.0), f"Demand-pull via construction and employment"),
            "investment": lambda m: ("positive", min(m * 3.0, 20.0), f"Multiplier effect; crowd-in of private investment"),
            "sector_winners": ["Construction", "Cement", "Steel", "Engineering", "Banking (project finance)", "Logistics"],
            "sector_losers": ["Bond market", "FX (short-term)"],
        },
    },
    "imf_program": {
        "label": "IMF Program Entry",
        "description": "Country enters an IMF stabilization program",
        "params": {"magnitude": {"type": "float", "default": 5.0, "range": [1.0, 30.0]}},
        "effects": {
            "currency": lambda m: ("stabilize", min(m * 0.5, 5.0), f"IMF FX reserves buffer; confidence anchor"),
            "bonds": lambda m: ("bullish", min(m * 1.5, 10.0), f"Spreads compress on reduced default risk"),
            "equities": lambda m: ("mixed", min(m * 0.8, 6.0), f"Short-term pain (austerity), long-term stability"),
            "inflation": lambda m: ("down", min(m * 1.0, 7.0), f"Tight fiscal and monetary conditions"),
            "investment": lambda m: ("improving", min(m * 1.2, 8.0), f"Reform credibility attracts long-term FDI"),
            "sector_winners": ["Sovereign bonds", "Banks (NPL clarity)", "Exporters (competitive FX)"],
            "sector_losers": ["Consumer (austerity)", "Public sector companies", "Domestic demand plays"],
        },
    },
    "market_liberalization": {
        "label": "Capital Market / FDI Liberalization",
        "description": "Country opens market to foreign investors, removes ownership caps",
        "params": {"magnitude": {"type": "float", "default": 1.0, "range": [0.5, 2.0]}},
        "effects": {
            "currency": lambda m: ("appreciate", min(m * 3.0, 8.0), f"FDI inflow surge — FX demand"),
            "bonds": lambda m: ("bullish", min(m * 2.0, 8.0), f"Foreign bond buying compresses yields"),
            "equities": lambda m: ("bullish", min(m * 4.0, 18.0), f"Re-rating on index inclusion expectations"),
            "inflation": lambda m: ("neutral", 0.5, f"Limited inflationary impact"),
            "investment": lambda m: ("very positive", min(m * 5.0, 25.0), f"FDI surge, JV activity, M&A wave"),
            "sector_winners": ["Banking", "Telecoms", "Retail", "Real Estate", "Consumer"],
            "sector_losers": ["Protected incumbents", "State enterprises facing competition"],
        },
    },
    "currency_devaluation": {
        "label": "Sharp Currency Devaluation",
        "description": "Currency devalues by {magnitude}% against USD",
        "params": {"magnitude": {"type": "float", "default": 25.0, "range": [5.0, 80.0]}},
        "effects": {
            "currency": lambda m: ("depreciate", m, f"-{m:.0f}% devaluation event"),
            "bonds": lambda m: ("bearish", min(m * 0.5, 15.0), f"USD debt-servicing costs rise; local bonds pressured"),
            "equities": lambda m: ("mixed", min(m * 0.3, 10.0), f"Exporters win; USD-debt corporates hit"),
            "inflation": lambda m: ("up", min(m * 0.6, 35.0), f"Import cost pass-through in 3–6 months"),
            "investment": lambda m: ("negative ST, positive LT", min(m * 0.5, 12.0), f"Short-term shock; longer-term competitiveness gain"),
            "sector_winners": ["Exporters", "Tourism", "Agricultural exporters", "Commodity producers"],
            "sector_losers": ["Importers", "USD-debt companies", "Banks (FX NPLs)", "Consumer (import inflation)"],
        },
    },
    "privatization": {
        "label": "State Privatization Program",
        "description": "Government sells {magnitude}% of GDP in state assets",
        "params": {"magnitude": {"type": "float", "default": 3.0, "range": [0.5, 20.0]}},
        "effects": {
            "currency": lambda m: ("appreciate", min(m * 0.8, 6.0), f"FX inflows from asset sales"),
            "bonds": lambda m: ("bullish", min(m * 0.6, 5.0), f"Deficit reduction — less borrowing needed"),
            "equities": lambda m: ("bullish", min(m * 2.0, 12.0), f"New listings; valuation discovery; M&A opportunity"),
            "inflation": lambda m: ("neutral", 0.3, f"Minimal direct inflationary impact"),
            "investment": lambda m: ("positive", min(m * 2.5, 15.0), f"M&A wave; PE and strategic buyer activity"),
            "sector_winners": ["M&A advisors", "PE firms", "Strategic acquirers", "Capital markets"],
            "sector_losers": ["State enterprise employees (restructuring)", "Unions"],
        },
    },
    "oil_price_shock": {
        "label": "Oil Price Shock (fall/rise)",
        "description": "Oil price changes by {magnitude}% (negative = fall, positive = rise)",
        "params": {"magnitude": {"type": "float", "default": -30.0, "range": [-60.0, 60.0]}},
        "effects": {
            "currency": lambda m: ("depreciate" if m < 0 else "appreciate", abs(m) * 0.25, f"Oil revenue impact: {'negative' if m < 0 else 'positive'} for oil exporters"),
            "bonds": lambda m: ("bearish" if m < 0 else "bullish", abs(m) * 0.2, f"Fiscal revenue {'falls' if m < 0 else 'rises'} — budget impact"),
            "equities": lambda m: ("mixed", abs(m) * 0.3, f"Oil sector {'down' if m < 0 else 'up'}; consumers {'up' if m < 0 else 'down'}"),
            "inflation": lambda m: ("down" if m < 0 else "up", abs(m) * 0.15, f"Energy cost {'falls' if m < 0 else 'rises'}"),
            "investment": lambda m: ("contracts" if m < 0 else "expands", abs(m) * 0.3, f"Capex in energy sector {'cut' if m < 0 else 'expands'}"),
            "sector_winners": ["Airlines (if fall)", "Petrochemicals (if fall)", "Energy producers (if rise)"],
            "sector_losers": ["Energy producers (if fall)", "Airlines (if rise)", "Energy importers (if rise)"],
        },
    },
}
