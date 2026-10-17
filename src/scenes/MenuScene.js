import { Progress } from '../systems/Progress.js';

export default class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height * 0.25, '🐢 Survie des tortues', {
      fontSize: '36px', color: '#ffffff', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5);

    this.makeButton(width / 2, height * 0.5, 'Jouer', () => this.scene.start('MapScene'));
    this.makeButton(width / 2, height * 0.62, 'Réinitialiser la progression', () => {
      Progress.reset();
    }, 20);
  }

  makeButton(x, y, label, onClick, fontSize = 30) {
    return this.add.text(x, y, label, {
      fontSize: `${fontSize}px`, color: '#1b2631', backgroundColor: '#f1c40f',
      padding: { x: 24, y: 12 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', onClick);
  }
}