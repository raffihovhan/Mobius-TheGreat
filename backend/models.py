"""
SQLAlchemy ORM models for Mobius.
Compatible with PostgreSQL (production) and SQLite (development).
"""
from datetime import datetime
from sqlalchemy import (
    Column, String, Float, Integer, Boolean, DateTime, Text,
    ForeignKey, Enum as SAEnum
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


class Country(Base):
    __tablename__ = "countries"

    iso2        = Column(String(2), primary_key=True)
    iso3        = Column(String(3), nullable=False, unique=True)
    name        = Column(String(100), nullable=False)
    region      = Column(String(80))
    currency    = Column(String(10))
    lat         = Column(Float)
    lng         = Column(Float)
    flag        = Column(String(10))
    narrative   = Column(Text)
    created_at  = Column(DateTime, default=datetime.utcnow)
    updated_at  = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    macro_snapshots = relationship("MacroSnapshot", back_populates="country", cascade="all, delete-orphan")
    policy_events   = relationship("PolicyEvent",   back_populates="country", cascade="all, delete-orphan")


class MacroSnapshot(Base):
    """One row per country per data pull (versioned time series)."""
    __tablename__ = "macro_snapshots"

    id                      = Column(Integer, primary_key=True, autoincrement=True)
    country_iso2            = Column(String(2), ForeignKey("countries.iso2"), nullable=False)
    snapshot_date           = Column(DateTime, default=datetime.utcnow)
    source                  = Column(String(30), default="mock")  # "mock" | "world_bank" | "imf"

    gdp_growth              = Column(Float)
    inflation               = Column(Float)
    interest_rate           = Column(Float)
    govt_debt_pct_gdp       = Column(Float)
    budget_deficit_pct_gdp  = Column(Float)
    current_account_pct_gdp = Column(Float)
    fx_trend                = Column(String(20))
    fx_vs_usd               = Column(Float)
    fx_change_1y_pct        = Column(Float)
    foreign_reserves_bn     = Column(Float)
    country_risk_score      = Column(Integer)
    credit_rating           = Column(String(10))

    country = relationship("Country", back_populates="macro_snapshots")


class PolicyEvent(Base):
    __tablename__ = "policy_events"

    id           = Column(Integer, primary_key=True, autoincrement=True)
    country_iso2 = Column(String(2), ForeignKey("countries.iso2"), nullable=False)
    date_label   = Column(String(20))   # e.g. "2024-Q3"
    event        = Column(Text, nullable=False)
    impact       = Column(SAEnum("positive", "negative", "neutral", name="impact_enum"), default="neutral")
    created_at   = Column(DateTime, default=datetime.utcnow)

    country = relationship("Country", back_populates="policy_events")


class ScenarioRun(Base):
    """Log of user scenario simulations for analytics."""
    __tablename__ = "scenario_runs"

    id           = Column(Integer, primary_key=True, autoincrement=True)
    country_iso2 = Column(String(2), nullable=False)
    scenario_key = Column(String(50), nullable=False)
    magnitude    = Column(Float)
    run_at       = Column(DateTime, default=datetime.utcnow)
    result_json  = Column(Text)  # JSON blob of computed effects
