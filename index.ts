import Phaser from 'phaser';

// Import stylesheets
import './style.css';

/* ----------------------------------- START SCENE --------------------------------- */
class BootLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'BootLevel' });
  }

  preload() {
    this.load.image(
      'logo',
      'https://neoalchemy.github.io/intro-to-game-programming-2023/img/logo.png'
    );
    this.load.baseURL =
      'https://neoalchemy.github.io/flappy-birds-phaser-tgewwg/';
    this.load.bitmapFont({
      key: 'Oswald',
      textureURL: 'static/assets/font/OswaldLightRed.png',
      fontDataURL: 'static/assets/font/OswaldLightRed.xml',
    });
  }

  create() {
    this.scene.start('SplashLevel');
  }
}

/* ----------------------------------- START SCENE --------------------------------- */
class SplashLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashLevel' });
  }

  preload() {
    const logo = this.add.image(200, 100, 'logo');
    logo.setScale(0.3);
    this.logo = logo;

    const text1 = this.add.bitmapText(-300, 200, 'Oswald', 'NeoAlchemy', 32);
    this.companyLine1 = text1;
    const text2 = this.add.bitmapText(-300, 230, 'Oswald', 'Game Industry', 32);
    this.companyLine2 = text2;

    const loading = this.add.text(180, 300, ['Loading...'], {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: 'black',
      align: 'center',
    });

    // PRELOAD ITEMS

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
  private logo: Phaser.GameObjects.Image;
  private companyLine1: Phaser.GameObjects.BitmapText;
  private companyLine2: Phaser.GameObjects.BitmapText;

  create() {
    this.tweens.add({
      targets: this.logo, //your image that must spin
      rotation: 2 * Math.PI, //rotation value must be radian
      ease: 'Bounce',
      delay: 600,
      duration: 600, //duration is in milliseconds
    });

    this.tweens.add({
      targets: this.companyLine1, //your image that must spin
      x: '140',
      ease: 'Elastic',
      duration: 500, //duration is in milliseconds
    });
    this.tweens.add({
      targets: this.companyLine2, //your image that must spin
      x: '125',
      ease: 'Elastic',
      duration: 500, //duration is in milliseconds
    });

    setTimeout(() => {
      //this.scene.start('StartLevel');
    }, 1500);
  }

  update() {}
}

/* ----------------------------------- START SCENE --------------------------------- */
class StartLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'StartLevel' });
  }

  preload() {}

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

/* ----------------------------------- END SCENE --------------------------------- */

class EndLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'EndLevel' });
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

  create(data) {
    const background = this.add.image(100, 100, 'pixel-sky');
    background.setDisplaySize(800, 800);

    const modalWindow = this.add.image(200, 200, 'background');
    const gameOverText = this.add.bitmapText(
      120,
      130,
      'titillium',
      'Game Over',
      30
    );

    const scoreText = this.add.bitmapText(
      180,
      160,
      'titillium',
      String(data.points),
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

/* ----------------------------------- MAIN SCENE --------------------------------- */

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

    this.group1 = this.createPipe(200);
    this.group2 = this.createPipe(400);
    this.group3 = this.createPipe(600);

    const cursorKeys = this.input.keyboard.createCursorKeys();
    this.cursorKeys = cursorKeys;

    this.points = 0;
  }

  private flappyBird: Phaser.GameObjects.Sprite;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private group1: Phaser.GameObjects.Group;
  private group2: Phaser.GameObjects.Group;
  private group3: Phaser.GameObjects.Group;
  private points: number;

  update() {
    this.moveFlappyBird();

    this.managePipeGroup('group1');
    this.managePipeGroup('group2');
    this.managePipeGroup('group3');

    this.checkHitFloor();
  }

  managePipeGroup(key: string) {
    if (this[key].children) {
      // COLLISION
      this.physics.collide(
        this[key],
        this.flappyBird,
        this.hitPipe,
        null,
        this
      );

      // MOVE PIPES
      this[key]
        .getChildren()
        .forEach(function (gameObject: Phaser.GameObjects.Sprite) {
          gameObject.x -= 1;
        });

      if (this[key].children) {
        let sprite: any = this[key].getChildren()[0];

        // SCORE POINTS
        if (sprite.x == 30) {
          this.score();
        }

        // DESTROY PIPES AND CREATE NEW
        if (sprite.x < -70) {
          this[key].destroy(true);
          this[key] = this.createPipe(500);
        }
      }
    }
  }

  hitPipe() {
    this.scene.start('EndLevel', { points: this.points });
  }

  checkHitFloor() {
    if (this.flappyBird.y > 432) {
      this.scene.start('EndLevel', { points: this.points });
    }
  }

  score() {
    this.points++;
    console.log(this.points);
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

  createPipe(positionX): Phaser.GameObjects.Group {
    const MAX_TILES = 10;
    const GAP_DIFFICULTY = 3;

    let topLength = Phaser.Math.Between(0, MAX_TILES - 1 - GAP_DIFFICULTY);
    let bottomLength = MAX_TILES - GAP_DIFFICULTY - topLength;

    let group = this.add.group();
    let k = 0;
    for (k = 0; k < topLength; k++) {
      group.add(this.physics.add.sprite(positionX, 16 + k * 32, 'BLPipeTile'));
      group.add(
        this.physics.add.sprite(positionX + 32, 16 + k * 32, 'BRPipeTile')
      );
    }
    group.add(this.physics.add.sprite(positionX, 16 + k * 32, 'TLUDPipeTile'));
    group.add(
      this.physics.add.sprite(positionX + 32, 16 + k * 32, 'TRUDPipeTile')
    );

    let i = 0;
    for (i = 0; i < bottomLength; i++) {
      group.add(
        this.physics.add.sprite(positionX, 400 - 16 - i * 32, 'BLPipeTile')
      );
      group.add(
        this.physics.add.sprite(positionX + 32, 400 - 16 - i * 32, 'BRPipeTile')
      );
    }
    group.add(
      this.physics.add.sprite(positionX, 400 - 16 - i * 32, 'TLPipeTile')
    );
    group.add(
      this.physics.add.sprite(positionX + 32, 400 - 16 - i * 32, 'TRPipeTile')
    );
    return group;
  }
}

/* -------------------------------------------------------------------------- */
/*                                RUN GAME.                                   */
/* -------------------------------------------------------------------------- */

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: '0xF2D16D',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [BootLevel, SplashLevel, StartLevel, MainLevel, EndLevel],
};

const game = new Phaser.Game(config);
