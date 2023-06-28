import Phaser from 'phaser';

// Import stylesheets
import './style.css';

class StartLevel extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image(
      'background',
      'https://static.vecteezy.com/system/resources/thumbnails/009/877/673/small_2x/pixel-art-sky-background-with-clouds-cloudy-blue-sky-for-8bit-game-on-white-background-vector.jpg'
    );
  }

  create() {
    const background = this.add.image(100, 100, 'background');
    background.setDisplaySize(800, 800);
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
