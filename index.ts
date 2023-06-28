import Phaser from 'phaser';

// Import stylesheets
import './style.css';

class StartLevel extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.baseURL =
      'https://neoalchemy.github.io/flappy-birds-phaser-tgewwg/';
    this.load.image('pixel-sky', 'static/assets/pixel-sky.png');
    this.load.image('background', 'static/assets/background.png');
    this.load.bitmapFont({
      key: 'Titillium',
      textureURL: 'static/assets/font/Titillium.png',
      fontDataURL: 'static/assets/font/Titillium.fnt',
    });
  }

  create() {
    const background = this.add.image(100, 100, 'pixel-sky');
    background.setDisplaySize(800, 800);

    const modalWindow = this.add.image(200, 200, 'background');
    const bitmapFont = this.add.bitmapText(
      130,
      130,
      'Titillium',
      'Flappy Bird',
      30
    );
  }
}

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: 0x0000ff,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [StartLevel],
};

const game = new Phaser.Game(config);
