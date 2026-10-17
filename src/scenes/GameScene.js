import { Progress } from '../systems/Progress.js';

// Scène de TEST : remplacez-la par votre vrai jeu.
export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) {
    console.log('Données reçues de la carte :', data);
    this.levelId = data.levelId ?? 1;
    this.levelName = data.levelName ?? '';
    this.difficulty = data.difficulty ?? 1;
    this.duration = data.duration ?? 60;
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.fadeIn(300);

    this.add.text(width / 2, height * 0.2,
      `Niveau ${this.levelId}\n${this.levelName}\n\nDifficulté : ${this.difficulty}\nDurée : ${this.duration}s`,
      { fontSize: '28px', color: '#ffffff', align: 'center' }
    ).setOrigin(0.5);

    this.button(width / 2, height * 0.6, '✅ Gagner (3 étoiles)', () => {
      Progress.complete(this.levelId, 3);
      this.scene.start('MapScene');
    });
    this.button(width / 2, height * 0.72, '⭐ Gagner (1 étoile)', () => {
      Progress.complete(this.levelId, 1);
      this.scene.start('MapScene');
    });
    this.button(width / 2, height * 0.84, '❌ Perdre', () => this.scene.start('MapScene'));
  }

  button(x, y, label, onClick) {
    this.add.text(x, y, label, {
      fontSize: '26px', color: '#1b2631', backgroundColor: '#ecf0f1', padding: { x: 18, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', onClick);
  }
}