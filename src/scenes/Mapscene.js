import { LEVELS } from '../data/levels.js';
import { Progress } from '../systems/Progress.js';

// Importe directement le fichier image pour que Vite / Webpack résolve le bon chemin
import carteImg from '../Assets/images/carte.png';

const DEBUG = new URLSearchParams(window.location.search).has('debug');
const DRAG_THRESHOLD = 10;

export default class Mapscene extends Phaser.Scene {
  constructor() {
    super('Mapscene');
  }

  // 1. AJOUTE LE PRELOAD ICI
  preload() {
    // Charge l'image de la carte avec la clé 'carte'
    this.load.image('carte', carteImg);

    // Charge également les images des niveaux si elles sont dans Assets/images/
    LEVELS.forEach((level) => {
      this.load.image(level.texture, level.image);
    });
  }

  create() {
    this.cameras.main.fadeIn(250);

    // 2. Cette ligne affichera désormais la vraie image 'carte.png' !
    this.map = this.add.image(0, 0, 'carte').setOrigin(0, 0);
    
    this.pathGraphics = this.add.graphics();
    this.nodes = LEVELS.map((level) => this.createNode(level));

    this.setupScrolling();
    this.createBackButton();
    if (DEBUG) this.setupDebug();

    this.layout();

    const current = Progress.getCurrentLevel();
    this.cameras.main.centerOn(current.x * this.mapW, current.y * this.mapH);

    this.scale.on('resize', this.layout, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.layout, this);
    });
  }
  // ---------------------------------------------------------------
  // Mise en page : la carte COUVRE toute la fenêtre (pas de bandes vides).
  // Si elle dépasse, on peut la faire défiler.
  // ---------------------------------------------------------------
  layout() {
    const cam = this.cameras.main;
    const { width, height } = this.scale;

    const scale = Math.max(width / this.map.width, height / this.map.height);
    this.map.setScale(scale);
    this.mapW = this.map.displayWidth;
    this.mapH = this.map.displayHeight;

    cam.setBounds(0, 0, this.mapW, this.mapH);

    // Taille des boutons proportionnelle à la fenêtre (entre 56 et 120 px)
    this.nodeSize = Phaser.Math.Clamp(Math.min(width, height) * 0.13, 56, 120);
    this.nodes.forEach((node) => this.layoutNode(node));
    this.drawPath();

    if (this.debugLabel) this.debugLabel.setY(height - 10);
  }

  // ---------- Chemin pointillé (passe par les points "via") ----------
  drawPath() {
    const g = this.pathGraphics;
    g.clear();
    g.fillStyle(0xffffff, 0.85);

    const radius = Phaser.Math.Clamp(this.nodeSize * 0.06, 3, 7);
    const spacing = radius * 5;
    const toPx = ([x, y]) => ({ x: x * this.mapW, y: y * this.mapH });

    // Liste complète des points : niveau 1, [via], niveau 2, [via], niveau 3...
    const points = [toPx([LEVELS[0].x, LEVELS[0].y])];
    for (let i = 1; i < LEVELS.length; i++) {
      (LEVELS[i].via ?? []).forEach((p) => points.push(toPx(p)));
      points.push(toPx([LEVELS[i].x, LEVELS[i].y]));
    }

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const dist = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
      const steps = Math.floor(dist / spacing);
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        g.fillCircle(Phaser.Math.Linear(a.x, b.x, t), Phaser.Math.Linear(a.y, b.y, t), radius);
      }
    }
  }

  // ---------- Création d'un bouton de niveau (image 1.png, 2.png...) ----------
  createNode(level) {
    const state = Progress.getState(level.id); // 'locked' | 'unlocked' | 'completed'
    const stars = Progress.getStars(level.id);

    const container = this.add.container(0, 0);
    const img = this.add.image(0, 0, level.texture);
    container.add(img);

    let lock = null;
    let starsText = null;

    if (state === 'locked') {
      img.setTint(0x555555).setAlpha(0.85);
      lock = this.add.text(0, 0, '🔒', { fontSize: '28px' }).setOrigin(0.5);
      container.add(lock);
    }

    if (state === 'completed') {
      starsText = this.add.text(0, 0, '★'.repeat(stars) + '☆'.repeat(3 - stars), {
        fontSize: '22px', color: '#f9e79f', stroke: '#000000', strokeThickness: 3,
      }).setOrigin(0.5, 0);
      container.add(starsText);
    }

    // L'image elle-même est cliquable (sa zone suit automatiquement sa taille)
    img.setInteractive({ useHandCursor: state !== 'locked' });
    img.on('pointerup', (pointer) => {
      if (pointer.getDistance() > DRAG_THRESHOLD) return; // c'était un défilement
      if (state === 'locked') {
        this.shake(container);
        return;
      }
      this.startLevel(level);
    });

    return { level, state, container, img, lock, starsText, tween: null };
  }

  layoutNode(node) {
    const { level, img, lock, starsText } = node;

    node.container.setPosition(level.x * this.mapW, level.y * this.mapH);

    const k = this.nodeSize / Math.max(img.width, img.height);
    img.setScale(k);

    // (Re)lancer l'animation de pulsation avec la nouvelle taille
    if (node.tween) { node.tween.stop(); node.tween = null; }
    if (node.state === 'unlocked') {
      node.tween = this.tweens.add({
        targets: img, scale: k * 1.12, duration: 600,
        yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });
    }

    if (lock) lock.setFontSize(this.nodeSize * 0.45);
    if (starsText) {
      starsText.setFontSize(this.nodeSize * 0.3);
      starsText.setY(this.nodeSize / 2 + 4);
    }
  }

  shake(target) {
    const baseX = target.x;
    this.tweens.add({
      targets: target, x: baseX + 6, duration: 50, yoyo: true, repeat: 3,
      onComplete: () => target.setX(baseX),
    });
  }

  // ---------- Lancement du niveau ----------
  startLevel(level) {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      
      // Si c'est le niveau 1, on redirige vers le mini-jeu HTML
      if (level.id === 1) {
        window.location.href = '/src/MiniJeu1/tortue-crossy.html';
      } else {
        // Pour les autres niveaux, on lance la scène Phaser classique
        this.scene.start('GameScene', {
          levelId: level.id,
          levelName: level.name,
          ...level.params,
        });
      }

    });
  }

  // ---------- Défilement : glisser + molette ----------
  setupScrolling() {
    const cam = this.cameras.main;

    this.input.on('pointermove', (pointer) => {
      if (!pointer.isDown) return;
      cam.scrollX -= (pointer.x - pointer.prevPosition.x) / cam.zoom;
      cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
    });

    this.input.on('wheel', (_p, _objs, dx, dy) => {
      cam.scrollX += dx * 0.6;
      cam.scrollY += dy * 0.6;
    });
  }

  createBackButton() {
    this.add.text(20, 20, '← Menu', {
      fontSize: '24px', color: '#ffffff', backgroundColor: '#00000088', padding: { x: 12, y: 8 },
    })
      .setScrollFactor(0)
      .setDepth(100)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start('MenuScene'));
  }

  // ---------- Debug : afficher les coordonnées du clic ----------
  setupDebug() {
    this.debugLabel = this.add.text(10, this.scale.height - 10, 'DEBUG : cliquez sur la carte', {
      fontSize: '20px', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 8, y: 4 },
    }).setOrigin(0, 1).setScrollFactor(0).setDepth(100);

    this.input.on('pointerup', (pointer) => {
      if (pointer.getDistance() > DRAG_THRESHOLD) return;
      const nx = (pointer.worldX / this.mapW).toFixed(3);
      const ny = (pointer.worldY / this.mapH).toFixed(3);
      const text = `x: ${nx}, y: ${ny}`;
      this.debugLabel.setText(text);
      console.log(text);
    });
  }
}