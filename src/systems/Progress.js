// src/systems/Progress.js
import { LEVELS } from '../data/levels.js';

const KEY = 'oceanHackaton2026_progress';

// Charger les données depuis le localStorage
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export const Progress = {
  /** 'completed' | 'unlocked' | 'locked' */
  getState(levelId) {
    const data = load();
    if (data[levelId] !== undefined) return 'completed';
    
    // Le premier niveau est toujours débloqué
    const index = LEVELS.findIndex(l => l.id === levelId);
    if (index <= 0) return 'unlocked';

    // Un niveau est débloqué si le niveau précédent est complété
    const prev = LEVELS[index - 1];
    return data[prev.id] !== undefined ? 'unlocked' : 'locked';
  },

  /** Récupère le nombre d'étoiles (0 à 3) pour un niveau */
  getStars(levelId) {
    return load()[levelId] ?? 0;
  },

  /** Enregistre la victoire d'un niveau et sauvegarde les étoiles */
  complete(levelId, stars = 3) {
    const data = load();
    const currentStars = data[levelId] ?? 0;
    // Garde le meilleur nombre d'étoiles obtenu
    data[levelId] = Math.max(currentStars, Math.min(3, stars));
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  /** Récupère le niveau actuel pour centrer la caméra au démarrage de la carte */
  getCurrentLevel() {
    return LEVELS.find(l => this.getState(l.id) === 'unlocked') ?? LEVELS[LEVELS.length - 1];
  },

  /** Réinitialise toute la progression */
  reset() {
    localStorage.removeItem(KEY);
  }
};

// Rendre Progress accessible globalement dans le navigateur
// Permet d'appeler Progress.complete(1) directement depuis ton mini-jeu HTML
if (typeof window !== 'undefined') {
  window.Progress = Progress;
}