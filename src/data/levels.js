// src/data/levels.js

// Positions NORMALISÉES (0 à 1) par rapport à la taille de carte.png
export const LEVELS = [
  {
    id: 1,
    name: 'Toulon & Var (Départ)',
    texture: 'lvl1',
    image: 'src/Assets/images/1.png',
    x: 0.285,
    y: 0.205,
    params: { 
      difficulty: 1, 
      duration: 60,
      locationId: 'toulon_var',
      sandTemp: '30.2°C (Chaud - 100% Femelles)',
      desc: 'Zone d’émergence principale sous la protection de l’Association Émergence.'
    },
  },
  {
    id: 2,
    name: 'Côte Espagnole & Baléares',
    texture: 'lvl2',
    image: 'src/Assets/images/2.png',
    x: 0.200,
    y: 0.330,
    params: { 
      difficulty: 1, 
      duration: 75,
      locationId: 'balearics',
      foodDensity: 'Élevée (Méduses Pelagia)',
      desc: 'Zone majeure de nourrissage dans les herbiers de posidonies.'
    },
  },
  {
    id: 3,
    name: 'Mer Tyrrhénienne (Italie)',
    texture: 'lvl3',
    image: 'src/Assets/images/3.png',
    x: 0.440,
    y: 0.340,
    via: [[0.255, 0.335], [0.340, 0.430], [0.400, 0.430]], // Contourne les Baléares et la Sardaigne
    params: { 
      difficulty: 2, 
      duration: 90,
      hazard: 'Trafic maritime & Plastiques',
      desc: 'Couloir de migration exposé aux risques de collision et de déchets.'
    },
  },
  {
    id: 4,
    name: 'Détroit de Messine',
    texture: 'lvl4',
    image: 'src/Assets/images/4.png',
    x: 0.535,
    y: 0.500,
    via: [[0.500, 0.430]],
    params: { 
      difficulty: 3, 
      duration: 100,
      currents: 'Courants forts',
      desc: 'Passage étroit nécessitant de contourner les filets de pêche.'
    },
  },
  {
    id: 5,
    name: 'Plage de ponte (Zakynthos / Méditerranée)',
    texture: 'lvl5',
    image: 'src/Assets/images/5.png',
    x: 0.640,
    y: 0.476,
    params: { 
      difficulty: 4, 
      duration: 120,
      sandTemp: '28.2°C (Frais - Mâles) / 30.8°C (Chaud - Femelles)',
      desc: 'Sanctuaire de ponte historique de Méditerranée orientale.'
    },
  },
];