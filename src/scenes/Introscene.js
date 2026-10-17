// src/scenes/IntroScene.js
import Phaser from 'phaser';
import { playerData } from '../data/playerData.js';
import { STARTING_LOCATIONS } from '../data/config.js';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene');
    this.currentStep = 1; // 1: Bienvenue, 2: Personnalisation, 3: Origine
  }

  create() {
    this.add.image(400, 300, 'background_ocean'); // Image chargée dans BootScene
    this.renderStep1();
  }

  renderStep1() {
    // Page 1 : Histoire & Accueil du Dauphin
    // Bouton pour passer à l'étape 2...
  }

  renderStep2() {
    // Page 2 : Saisie du prénom & choix Mâle/Femelle
    // Mise à jour de playerData.name et playerData.gender...
  }

  renderStep3() {
    // Page 3 : Choix du lieu d'origine (Var, Baléares, Sicile)
    // Sélection -> playerData.origin = selectedOrigin
    
    // Bouton final :
    // this.scene.start('GameScene');
  }
}