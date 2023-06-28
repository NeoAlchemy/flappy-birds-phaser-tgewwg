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
    this.load.spritesheet('FlappyBird', 'static/assets/FlappyBird.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.animation(
      'FlappyBirdAnims',
      './static/assets/FlappyBirdAnims.json'
    );
  }

  create() {
    const background = this.add.image(100, 100, 'pixel-sky');
    background.setDisplaySize(800, 800);

    const flappyBird = this.physics.add.sprite(100, 200, 'FlappyBird', 0);
    flappyBird.anims.play('FlappyBirdFlying');
    this.flappyBird = flappyBird;

    const cursorKeys = this.input.keyboard.createCursorKeys();
    this.cursorKeys = cursorKeys;
  }

  private flappyBird: Phaser.GameObjects.Sprite;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  update() {
    this.moveFlappyBird();
  }

  moveFlappyBird() {
    if (this.cursorKeys.space.isDown) {
      this.flappyBird.y -= 2;
      this.flappyBird.angle = 325;
    } else {
      this.flappyBird.y += 2;
      this.flappyBird.angle = 0;
    }
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
      gravity: { y: 0 },
    },
  },
  scene: [StartLevel, MainLevel],
};

const game = new Phaser.Game(config);
