import Phaser from 'phaser';
// Importez votre scène (ex: Mapscene)
import Mapscene from './scenes/Mapscene'; 

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Mapscene]
};

// CRUCIAL : Attacher à window.game
window.game = new Phaser.Game(config);