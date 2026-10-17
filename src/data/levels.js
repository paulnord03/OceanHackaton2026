// Positions NORMALISÉES (0 à 1) par rapport à la taille de carte.png.
// x = 0.5, y = 0.5 -> centre de l'image. Ainsi, peu importe la résolution
// de l'image ou de l'écran, les points restent au bon endroit.
// Astuce : activez DEBUG dans Mapscene.js, cliquez sur la carte et copiez
// les coordonnées affichées dans la console.

export const LEVELS = [
  { id: 1, name: 'La plage de ponte',   x: 0.50, y: 0.92, params: { difficulty: 1, duration: 60 } },
  { id: 2, name: 'Les eaux claires',    x: 0.30, y: 0.80, params: { difficulty: 1, duration: 75 } },
  { id: 3, name: 'Le banc de méduses',  x: 0.62, y: 0.68, params: { difficulty: 2, duration: 90 } },
  { id: 4, name: 'La route des bateaux',x: 0.35, y: 0.54, params: { difficulty: 2, duration: 90 } },
  { id: 5, name: 'Le vortex de plastique', x: 0.65, y: 0.40, params: { difficulty: 3, duration: 100 } },
  { id: 6, name: 'Le récif sauvé',      x: 0.45, y: 0.25, params: { difficulty: 3, duration: 120 } },
  { id: 7, name: 'Retour à la maison',  x: 0.60, y: 0.10, params: { difficulty: 4, duration: 120 } },
];
