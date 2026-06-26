"""
Mobius — Emerging Markets Intelligence Platform
FastAPI backend entry point.

Run locally:
    uvicorn backend.main:app --reload --port 8000

With Docker:
    docker compose up
"""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .database import create_tables
from .routers import countries, scenarios, signals

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mobius")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Mobius starting up — initializing database...")
    create_tables()
    logger.info("Database ready.")
    yield
    logger.info("Mobius shutting down.")


app = FastAPI(
    title="Mobius — Emerging Markets Intelligence",
    description=(
        "An interactive platform connecting macroeconomics, policy decisions, "
        "and investment opportunities across emerging and frontier markets."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# In production, restrict origins to your actual frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(countries.router)
app.include_router(scenarios.router)
app.include_router(signals.router)


@app.get("/", include_in_schema=False)
async def root():
    return {
        "platform": "Mobius",
        "tagline": "Emerging Markets Intelligence — Macro × Policy × Investment",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
async def health():
    return {"status": "ok", "version": "0.1.0"}
