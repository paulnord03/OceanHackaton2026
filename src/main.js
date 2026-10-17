import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import MapScene from './scenes/Mapscene.js';
import GameScene from './scenes/GameScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  // Le jeu occupe toute la fenêtre et suit son redimensionnement
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#0b2a3d',
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  scene: [BootScene, MenuScene, MapScene, GameScene],
});