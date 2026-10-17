// Positions NORMALISÉES (0 à 1) par rapport à la taille de carte.png :
// x = 0 (bord gauche) -> 1 (bord droit), y = 0 (haut) -> 1 (bas).
//
// "via" (facultatif) : points de passage du chemin pointillé depuis le niveau
// précédent, pour contourner les terres (Baléares, Sardaigne, Italie...).
//
// ⚠ Ces coordonnées sont des estimations. Pour les affiner, ouvrez
//   http://localhost:8080/?debug
// puis cliquez sur la carte : les coordonnées s'affichent en bas à gauche
// et dans la console. Copiez-les ici.

export const LEVELS = [
  {
    id: 1, name: 'Toulon',
    texture: 'lvl1', image: 'src/Assets/images/1.png',
    x: 0.285, y: 0.205,
    params: { difficulty: 1, duration: 60 },
  },
  {
    id: 2, name: 'Côte espagnole',
    texture: 'lvl2', image: 'src/Assets/images/2.png',
    x: 0.200, y: 0.330,
    params: { difficulty: 1, duration: 75 },
  },
  {
    id: 3, name: 'Mer Tyrrhénienne (Italie)',
    texture: 'lvl3', image: 'src/Assets/images/3.png',
    x: 0.440, y: 0.340,
    via: [[0.255, 0.335], [0.340, 0.430], [0.400, 0.430]], // contourne Baléares et Sardaigne
    params: { difficulty: 2, duration: 90 },
  },
  {
    id: 4, name: 'Détroit de Messine',
    texture: 'lvl4', image: 'src/Assets/images/4.png',
    x: 0.535, y: 0.500,
    via: [[0.500, 0.430]],
    params: { difficulty: 3, duration: 100 },
  },
  {
    id: 5, name: 'Plage de ponte (Zakynthos)',
    texture: 'lvl5', image: 'src/Assets/images/5.png',
    x: 0.640, y: 0.476,
    params: { difficulty: 4, duration: 120 },
  },
];