// entity-modal.ts
// Mounts a React entity dashboard inside a full-screen overlay.
// Drop this file in frontend/src/ and import into main.ts.

import React from "react";
import { createRoot, Root } from "react-dom/client";
import MobiusKaspiDashboard from "./MobiusKaspiDashboard";

// Map: country ISO2 → React component
const ENTITY_DASHBOARDS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  KZ: MobiusKaspiDashboard,
};

export function hasEntityDashboard(iso2: string): boolean {
  return (iso2 || "").toUpperCase() in ENTITY_DASHBOARDS;
}

let _root: Root | null = null;

export function openEntityDashboard(iso2: string): void {
  const Component = ENTITY_DASHBOARDS[(iso2 || "").toUpperCase()];
  if (!Component) return;

  const overlay = document.getElementById("entity-overlay")!;
  const container = document.getElementById("entity-container")!;

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Unmount any previous render first
  if (_root) { _root.unmount(); _root = null; }

  _root = createRoot(container);
  _root.render(React.createElement(Component, { onClose: closeEntityDashboard }));
}

export function closeEntityDashboard(): void {
  const overlay = document.getElementById("entity-overlay")!;
  overlay.style.display = "none";
  document.body.style.overflow = "";
  if (_root) { _root.unmount(); _root = null; }
}
