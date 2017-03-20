var GameState = function(game){
  this.bg;
  this.player;
  this.cursors;
  this.jump;
  this.walls;
  this.walkSpeed = 20;
  this.maxSpeed = 300;
  this.jumpHeight = 600;
};

GameState.prototype = {
  create: function() {
  	this.bg = game.add.tileSprite(0, 0, 1920, 1080, "sky");

    this.createPlayer();
    this.createLevel();
    this.addControls();
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
    this.player.body.drag.x = 600;
    this.player.body.gravity.y = 1000;

    game.world.setBounds(0, 0, 1920, 1080);
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
  },


  //----------------------------------------------------------------------------
  //                            LEVEL SET UP
  //----------------------------------------------------------------------------
  createLevel: function() {
    var level = [
      'xxxxxxxxxxxxxxxxxxx',
      'x                 x',
      'x                 x',
      'x                 x',
      'x         xxxxxxxxx',
      'x                 x',
      'xxxxxx            x',
      'x                 x',
      'x       xxx  xxxxxx',
      'x                 x',
      'xxxxxx            x',
      'x                 x',
      'xxxxxxxxxxxxxxxxxxx',
    ];

    this.walls = game.add.group();

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        if (level[i][j] == 'x') {
            var wall = game.add.sprite(64*j, 64*i, 'box');
            game.physics.enable(wall, Phaser.Physics.ARCADE);
            wall.body.immovable = true;

            this.walls.add(wall);
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

  update: function() {
    this.checkCollisions();
    this.movePlayer();
  },

  movePlayer: function() {
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= this.walkSpeed;
      this.player.scale.set(-1,1);
      this.setCorrectAnimationState(true);
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += this.walkSpeed;
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

  checkCollisions: function() {
    game.physics.arcade.collide(this.player, this.walls);
  }
}
