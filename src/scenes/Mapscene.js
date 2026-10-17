import { LEVELS } from '../data/levels.js';
import { Progress } from '../systems/Progress.js';

// Si vous utilisez Phaser via npm, ajoutez : import Phaser from 'phaser';

const DEBUG = false;          // true : clic sur la carte => coordonnées normalisées dans la console
const NODE_RADIUS = 34;
const DRAG_THRESHOLD = 10;    // px : en dessous, c'est un clic ; au-dessus, c'est un défilement

const COLORS = {
  locked:    0x7f8c8d,
  unlocked:  0xf1c40f,
  completed: 0x2ecc71,
};

export default class MapScene extends Phaser.Scene {
  constructor() {
    super('MapScene'); // clé utilisée par this.scene.start('MapScene') ailleurs
  }

  // La clé 'carte' doit être chargée ici ou dans BootScene (une seule fois suffit)
  preload() {
    if (!this.textures.exists('carte')) {
      this.load.image('carte', 'src/Assets/images/carte.png');
    }
  }

  create() {
    const cam = this.cameras.main;
    const { width } = this.scale;

    // --- 1. Carte : mise à l'échelle sur la largeur de l'écran ---
    const map = this.add.image(0, 0, 'carte').setOrigin(0, 0);
    const scale = width / map.width;
    map.setScale(scale);
    this.mapW = map.displayWidth;
    this.mapH = map.displayHeight;

    // Limites du défilement (si la carte est plus petite que l'écran, Phaser la centre)
    cam.setBounds(0, 0, this.mapW, this.mapH);

    // --- 2. Chemin pointillé entre les niveaux ---
    this.drawPath();

    // --- 3. Boutons de niveaux ---
    this.nodes = LEVELS.map(level => this.createNode(level));

    // --- 4. Défilement (glisser + molette) ---
    this.setupScrolling();

    // --- 5. Bouton retour (fixe à l'écran) ---
    this.add.text(20, 20, '← Menu', {
      fontSize: '24px', color: '#ffffff', backgroundColor: '#00000088', padding: { x: 12, y: 8 },
    })
      .setScrollFactor(0)
      .setDepth(100)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start('MenuScene'));

    // --- 6. Centrer la caméra sur le niveau en cours ---
    const current = Progress.getCurrentLevel();
    cam.centerOn(this.mapW / 2, current.y * this.mapH);

    // --- Debug : afficher les coordonnées pour placer les points ---
    if (DEBUG) {
      this.input.on('pointerup', (p) => {
        if (p.getDistance() > DRAG_THRESHOLD) return;
        const nx = (p.worldX / this.mapW).toFixed(2);
        const ny = (p.worldY / this.mapH).toFixed(2);
        console.log(`{ x: ${nx}, y: ${ny} }`);
      });
    }
  }

  // ---------- Conversion coordonnées normalisées -> pixels ----------
  toWorld(level) {
    return { x: level.x * this.mapW, y: level.y * this.mapH };
  }

  // ---------- Chemin pointillé ----------
  drawPath() {
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.8);
    for (let i = 0; i < LEVELS.length - 1; i++) {
      const a = this.toWorld(LEVELS[i]);
      const b = this.toWorld(LEVELS[i + 1]);
      const dist = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
      const steps = Math.floor(dist / 22);
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        g.fillCircle(Phaser.Math.Linear(a.x, b.x, t), Phaser.Math.Linear(a.y, b.y, t), 4);
      }
    }
  }

  // ---------- Création d'un bouton de niveau ----------
  createNode(level) {
    const { x, y } = this.toWorld(level);
    const state = Progress.getState(level.id);
    const stars = Progress.getStars(level.id);

    const container = this.add.container(x, y);

    const circle = this.add.circle(0, 0, NODE_RADIUS, COLORS[state])
      .setStrokeStyle(5, 0xffffff);
    container.add(circle);

    if (state === 'locked') {
      container.add(this.add.text(0, 0, '🔒', { fontSize: '28px' }).setOrigin(0.5));
    } else {
      container.add(this.add.text(0, 0, String(level.id), {
        fontSize: '32px', fontStyle: 'bold', color: '#1b2631',
      }).setOrigin(0.5));
    }

    // Étoiles sous le bouton (niveaux terminés)
    if (state === 'completed') {
      const starText = '★'.repeat(stars) + '☆'.repeat(3 - stars);
      container.add(this.add.text(0, NODE_RADIUS + 14, starText, {
        fontSize: '22px', color: '#f9e79f', stroke: '#000000', strokeThickness: 3,
      }).setOrigin(0.5));
    }

    // Animation "pulse" sur le niveau à jouer
    if (state === 'unlocked') {
      this.tweens.add({
        targets: container, scale: 1.15, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });
    }

    // Interactivité : seulement si non verrouillé
    container.setSize(NODE_RADIUS * 2, NODE_RADIUS * 2);
    container.setInteractive({ useHandCursor: state !== 'locked' });

    container.on('pointerup', (pointer) => {
      // Ignorer si le joueur était en train de faire défiler la carte
      if (pointer.getDistance() > DRAG_THRESHOLD) return;

      if (state === 'locked') {
        this.shake(container);
        return;
      }
      this.startLevel(level);
    });

    return container;
  }

  shake(target) {
    this.tweens.add({
      targets: target, x: target.x + 6, duration: 50, yoyo: true, repeat: 3,
      onComplete: () => { /* position restaurée par le yoyo */ },
    });
  }

  // ---------- Lancement du niveau ----------
  startLevel(level) {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene', {
        levelId: level.id,
        levelName: level.name,
        ...level.params,
      });
    });
  }

  // ---------- Défilement ----------
  setupScrolling() {
    const cam = this.cameras.main;

    this.input.on('pointermove', (pointer) => {
      if (!pointer.isDown) return;
      cam.scrollX -= (pointer.x - pointer.prevPosition.x) / cam.zoom;
      cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
    });

    this.input.on('wheel', (_p, _objs, _dx, dy) => {
      cam.scrollY += dy * 0.6;
    });
  }
}
