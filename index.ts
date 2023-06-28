import Phaser from 'phaser';

// Import stylesheets
import './style.css';

class StartLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'StartLevel' });
  }

  preload() {
    this.load.baseURL =
      'https://neoalchemy.github.io/flappy-birds-phaser-tgewwg/';
    this.load.image('pixel-sky', 'static/assets/pixel-sky.png');
    this.load.image('background', 'static/assets/background.png');
    this.load.image('button', 'static/assets/button.png');
    this.load.bitmapFont({
      key: 'titillium',
      textureURL: 'static/assets/font/TitilliumBlack.png',
      fontDataURL: 'static/assets/font/TitilliumBlack.xml',
    }); //USE OF SNOWB (https://snowb.org/)
  }

  create() {
    const background = this.add.image(100, 100, 'pixel-sky');
    background.setDisplaySize(800, 800);

    const modalWindow = this.add.image(200, 200, 'background');
    const bitmapFont = this.add.bitmapText(
      120,
      130,
      'titillium',
      'Flappy Bird',
      30
    );

    const button = this.add.sprite(200, 230, 'button');
    this.newGameButton = button;
    this.newGameButton.setInteractive();
    this.newGameButton.on('pointerdown', this.newGame, this);
    this.add.text(165, 220, 'New Game', {
      fontFamily: 'serif',
      fontSize: '16px',
      color: 'black',
    });
  }

  private newGameButton: Phaser.GameObjects.Sprite;

  newGame() {
    this.scene.start('MainLevel');
  }
}

class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'MainLevel' });
  }

  preload() {
    this.load.baseURL =
      'https://neoalchemy.github.io/flappy-birds-phaser-tgewwg/';
    this.load.image('FlappyBird', 'static/assets/FlappyBird.png');
    this.load.animation(
      'FlappyBirdAnims',
      './static/assets/FlappyBirdAnims.json'
    );
  }

  create() {
    const background = this.add.image(100, 100, 'pixel-sky');
    background.setDisplaySize(800, 800);

    const flappyBird = this.add.image(100, 200, 'FlappyBird');

    this.anims.play('FlappyBirdFlying', flappyBird);
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
  scene: [StartLevel, MainLevel],
};

const game = new Phaser.Game(config);
