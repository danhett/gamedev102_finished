var GameState = function(game){
  this.bg;
  this.player;
  this.cursors;
  this.jump;
  this.walls;
  this.coins;

  this.worldWidth = 1920;
  this.worldHeight = 1080;
  this.playerAccelRate = 20;
  this.maxSpeed = 300;
  this.jumpHeight = 600;
  this.playerDrag = 600;
  this.playerGravity = 1000;

  this.gameMusic;
  this.coinSound;
};

GameState.prototype = {
  create: function() {
  	this.bg = game.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, "sky");

    this.setupSound();
    this.createPlayer();
    this.createLevel();
    this.addControls();
  },

  setupSound: function() {
    this.gameMusic = game.add.audio("game-music");
    this.gameMusic.play();

    this.coinSound = game.add.audio("sfx-coin");
    this.coinSound.play();
  },

  //----------------------------------------------------------------------------
  //                            PLAYER SET UP
  //----------------------------------------------------------------------------
  createPlayer: function() {
    this.player = game.add.sprite(200, 200, 'player');
    this.player.anchor.set(0.5, 0.5);

    this.player.animations.add('jump', [0]);
    this.player.animations.add('idle', [1]);
    this.player.animations.add('run', [2,3,4,5]);

    this.player.animations.play('idle');

    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.maxVelocity.x = this.maxSpeed;
    this.player.body.drag.x = this.playerDrag;
    this.player.body.gravity.y = this.playerGravity;

    game.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
  },


  //----------------------------------------------------------------------------
  //                            LEVEL SET UP
  //----------------------------------------------------------------------------
  createLevel: function() {
    var level = [
      'xxxxxxxxxxxxxxxxxxx',
      'x                 x',
      'x         ooooooo x',
      'x                 x',
      'x ooo     xxxxxxxxx',
      'x                 x',
      'xxxxxx  ooo   ooo x',
      'x                 x',
      'x ooo   xxx  xxxxxx',
      'x                 x',
      'xxxxxx   ooooooo  x',
      'x                 x',
      'xxxxxxxxxxxxxxxxxxx',
    ];

    this.walls = game.add.group();
    this.coins = game.add.group();

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

        // BLOCK
        if (level[i][j] == 'x') {
            var wall = game.add.sprite(64*j, 64*i, 'box');
            game.physics.enable(wall, Phaser.Physics.ARCADE);
            wall.body.immovable = true;

            this.walls.add(wall);
        }

        // COIN
        if (level[i][j] == 'o') {
            var coin = game.add.sprite(64*j, 64*i, 'coin');
            game.physics.enable(coin, Phaser.Physics.ARCADE);
            coin.body.immovable = true;

            this.coins.add(coin);
        }
      }
    }
  },


  //----------------------------------------------------------------------------
  //                            CONTROLS/PHYSICS
  //----------------------------------------------------------------------------
  addControls: function() {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jump = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.jump.onDown.add(this.doJump, this);
  },

  doJump: function() {
    if(this.player.body.touching.down) {
      this.player.body.velocity.y -= this.jumpHeight;
    }
  },

  movePlayer: function() {
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= this.playerAccelRate;
      this.player.scale.set(-1,1);
      this.setCorrectAnimationState(true);
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += this.playerAccelRate;
      this.player.scale.set(1,1);
      this.setCorrectAnimationState(true);
    }
    else {
      this.setCorrectAnimationState(false);
    }
  },

  setCorrectAnimationState: function(isPressing) {
    if(isPressing && this.player.body.touching.down) {
      this.player.animations.play('run', 15, true);
    }
    else {
      if(!this.player.body.touching.down) {
        this.player.animations.play('jump');
      }
      else {
        this.player.animations.play('idle');
      }
    }
  },

  //----------------------------------------------------------------------------
  //                           TICK
  //----------------------------------------------------------------------------
  update: function() {
    this.checkCollisions();
    this.movePlayer();
  },

  checkCollisions: function() {
    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.overlap(this.player, this.coins, this.onCoinCollect, null, this);
  },

  onCoinCollect: function(player, coin) {
    this.coinSound.play();
    coin.kill();
  }
}
