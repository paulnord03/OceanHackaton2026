import { LEVELS } from '../data/levels.js';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    // Si un fichier est introuvable, on génère un remplaçant pour pouvoir tester
    this.load.on('loaderror', (file) => {
      console.warn(`Fichier introuvable : ${file.src}`);
      if (file.key === 'carte') {
        this.createPlaceholderMap();
      } else if (file.key.startsWith('lvl')) {
        this.createPlaceholderButton(file.key, file.key.replace('lvl', ''));
      }
    });

    this.load.image('carte', 'src/Assets/images/carte.png');

    // Boutons de niveaux : 1.png, 2.png, ... 5.png
    LEVELS.forEach((level) => this.load.image(level.texture, level.image));
  }

  create() {
    this.scene.start('MenuScene');
  }

  createPlaceholderMap() {
    const w = 1600, h = 1000;
    const tex = this.textures.createCanvas('carte', w, h);
    const ctx = tex.getContext();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1a8fc4');
    grad.addColorStop(1, '#0b3d5c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    tex.refresh();
  }

  createPlaceholderButton(key, label) {
    const s = 128;
    const tex = this.textures.createCanvas(key, s, s);
    const ctx = tex.getContext();
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, 58, 0, Math.PI * 2);
    ctx.fillStyle = '#f1c40f';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = '#1b2631';
    ctx.font = 'bold 64px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, s / 2, s / 2 + 4);
    tex.refresh();
  }
}