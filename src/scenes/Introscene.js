import Phaser from 'phaser';

export default class Introscene extends Phaser.Scene {
  constructor() {
    super('Introscene');
  }

  create() {
    // Redirection directe vers la scène de la carte sans afficher l'écran de création
    this.scene.start('MapScene');
  }
}