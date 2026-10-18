import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  init(data) {
    // Récupération des données passées à la scène (score, étoiles, etc.)
    this.score = data.score || 0;
    this.stars = data.stars || 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    // 1. Fond sombre semi-transparent
    this.add.rectangle(0, 0, width, height, 0x0b3d5c)
      .setOrigin(0)
      .setAlpha(0.9);

    // 2. Titre de fin
    this.add.text(width / 2, height * 0.25, 'MISSION ACCOMPLIE ! 🐢', {
      font: 'bold 42px sans-serif',
      fill: '#f1c40f'
    }).setOrigin(0.5);

    // 3. Affichage du score et des étoiles
    this.add.text(width / 2, height * 0.4, `Score : ${this.score}`, {
      font: '28px sans-serif',
      fill: '#ffffff'
    }).setOrigin(0.5);

    const starsText = '⭐'.repeat(this.stars) + '☆'.repeat(3 - this.stars);
    this.add.text(width / 2, height * 0.48, starsText, {
      font: '36px sans-serif'
    }).setOrigin(0.5);

    // 4. Bouton "Retour à la Carte"
    const btnMap = this.add.text(width / 2, height * 0.65, '🗺️ RETOUR À LA CARTE', {
      font: 'bold 22px sans-serif',
      fill: '#ffffff',
      backgroundColor: '#2ec4b6',
      padding: { x: 20, y: 12 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

    // Effet au survol du bouton
    btnMap.on('pointerover', () => btnMap.setStyle({ fill: '#f1c40f' }));
    btnMap.on('pointerout', () => btnMap.setStyle({ fill: '#ffffff' }));

    // Clic : Retour à MapScene
    btnMap.on('pointerdown', () => {
      this.scene.start('MapScene');
    });
  }
}