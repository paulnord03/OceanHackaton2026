import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import MapScene from './scenes/Mapscene.js';
import GameScene from './scenes/GameScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 800,
  backgroundColor: '#0b2a3d',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, MenuScene, MapScene, GameScene],
});