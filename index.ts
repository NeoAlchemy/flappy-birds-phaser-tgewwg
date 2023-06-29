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

    this.load.image('BLPipeTile', 'static/assets/BLPipeTile.png');
    this.load.image('BRPipeTile', 'static/assets/BRPipeTile.png');
    this.load.image('TLPipeTile', 'static/assets/TLPipeTile.png');
    this.load.image('TRPipeTile', 'static/assets/TRPipeTile.png');
    this.load.image('TLUDPipeTile', 'static/assets/TLUpsideDownPipeTile.png');
    this.load.image('TRUDPipeTile', 'static/assets/TRUpsideDownPipeTile.png');
  }

  create() {
    const background = this.add.image(100, 100, 'pixel-sky');
    background.setDisplaySize(800, 800);

    const flappyBird = this.physics.add.sprite(100, 200, 'FlappyBird', 0);
    flappyBird.anims.play('FlappyBirdFlying');
    this.flappyBird = flappyBird;

    this.group1 = this.createPipe(100, 2, 3);
    this.group2 = this.createPipe(300, 2, 3);
    this.group3 = this.createPipe(500, 2, 3);

    const cursorKeys = this.input.keyboard.createCursorKeys();
    this.cursorKeys = cursorKeys;
  }

  private flappyBird: Phaser.GameObjects.Sprite;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private group1: Phaser.GameObjects.Group;
  private group2: Phaser.GameObjects.Group;
  private group3: Phaser.GameObjects.Group;

  update() {
    this.moveFlappyBird();

    this.managePipeGroup('group1');
    this.managePipeGroup('group2');
    this.managePipeGroup('group3');
  }

  managePipeGroup(key: string) {
    if (this[key].children) {
      this.physics.collide(this[key], this.flappyBird, () => {
        console.log('hit');
      });
      this[key]
        .getChildren()
        .forEach(function (gameObject: Phaser.GameObjects.Sprite) {
          gameObject.x -= 1;
        });

      if (this[key].children) {
        let sprite: any = this[key].getChildren()[0];
        if (sprite.x < -70) {
          this[key].destroy(true);
          this[key] = this.createPipe(500, 2, 3);
        }
      }
    }
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

  createPipe(positionX, topLength, bottomLength): Phaser.GameObjects.Group {
    let group = this.add.group();
    let k = 0;
    for (k = 0; k < topLength; k++) {
      group.add(this.add.sprite(positionX, 16 + k * 32, 'BLPipeTile'));
      group.add(this.add.sprite(positionX + 32, 16 + k * 32, 'BRPipeTile'));
    }
    group.add(this.add.sprite(positionX, 16 + k * 32, 'TLUDPipeTile'));
    group.add(this.add.sprite(positionX + 32, 16 + k * 32, 'TRUDPipeTile'));

    let i = 0;
    for (i = 0; i < bottomLength; i++) {
      group.add(this.add.sprite(positionX, 400 - 16 - i * 32, 'BLPipeTile'));
      group.add(
        this.add.sprite(positionX + 32, 400 - 16 - i * 32, 'BRPipeTile')
      );
    }
    group.add(this.add.sprite(positionX, 400 - 16 - i * 32, 'TLPipeTile'));
    group.add(this.add.sprite(positionX + 32, 400 - 16 - i * 32, 'TRPipeTile'));
    return group;
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
