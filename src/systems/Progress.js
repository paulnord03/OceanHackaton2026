import { LEVELS } from '../data/levels.js';

const KEY = 'oceanHackaton2026_progress';

// Format sauvegardé : { "1": 3, "2": 1 }  ->  id du niveau : nombre d'étoiles (0 à 3)
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

export const Progress = {
  /** 'completed' | 'unlocked' | 'locked' */
  getState(levelId) {
    const data = load();
    if (data[levelId] !== undefined) return 'completed';
    // Un niveau est débloqué si le précédent est terminé (le 1er l'est toujours)
    const index = LEVELS.findIndex(l => l.id === levelId);
    if (index === 0) return 'unlocked';
    const prev = LEVELS[index - 1];
    return data[prev.id] !== undefined ? 'unlocked' : 'locked';
  },

  getStars(levelId) {
    return load()[levelId] ?? 0;
  },

  /** À appeler depuis GameScene / EndScene quand le joueur gagne. */
  complete(levelId, stars = 1) {
    const data = load();
    data[levelId] = Math.max(data[levelId] ?? 0, stars);
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  /** Premier niveau débloqué non terminé (sert à centrer la caméra). */
  getCurrentLevel() {
    return LEVELS.find(l => this.getState(l.id) === 'unlocked') ?? LEVELS[LEVELS.length - 1];
  },

  reset() { localStorage.removeItem(KEY); },
};
