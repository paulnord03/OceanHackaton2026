export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    // Si carte.png est introuvable, on génère une carte de remplacement
    // pour pouvoir tester quand même.
    this.load.on('loaderror', (file) => {
      if (file.key === 'carte') {
        console.warn('carte.png introuvable -> carte de remplacement utilisée');
        this.createPlaceholderMap();
      }
    });

    this.load.image('carte', 'src/Assets/images/carte.png');
  }

  create() {
    this.scene.start('MenuScene');
  }

  createPlaceholderMap() {
    const w = 800, h = 2000;
    const tex = this.textures.createCanvas('carte', w, h);
    const ctx = tex.getContext();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1a8fc4');
    grad.addColorStop(1, '#0b3d5c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    tex.refresh();
  }
}