// src/data/config.js

export const STARTING_LOCATIONS = {
  var_cotedazur: {
    id: "var_cotedazur",
    label: "Côte d'Azur & Var (France)",
    description: "Zone de pontes récentes sous haute surveillance.",
    spawnCoords: { x: 400, y: 300 },
    currentForce: 1.2, // Courant léger
    plasticDensity: 0.3 // Ratio de déchets
  },
  baleares: {
    id: "baleares",
    label: "Îles Baléares (Espagne)",
    description: "Zone de nourrissage majeure avec fort trafic maritime.",
    spawnCoords: { x: 200, y: 800 },
    currentForce: 1.8,
    plasticDensity: 0.5
  },
  sicile: {
    id: "sicile",
    label: "Sicile & Mer Ionienne (Italie)",
    description: "Site historique de ponte au cœur de la Méditerranée.",
    spawnCoords: { x: 1200, y: 1000 },
    currentForce: 1.5,
    plasticDensity: 0.4
  }
};