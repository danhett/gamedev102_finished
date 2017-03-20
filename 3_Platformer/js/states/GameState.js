var GameState = function(game){
  this.bg;
  this.player;
  this.cursors;
  this.jump;
  this.walkSpeed = 20;
  this.maxSpeed = 300;
  this.jumpHeight = 600;
};

GameState.prototype = {
  create: function() {
  	this.bg = game.add.tileSprite(0, 0, 800, 600, "sky");

    this.createPlayer();
    this.addControls();
  },

  createPlayer: function() {
    this.player = game.add.sprite(200, 200, 'player');
    this.player.anchor.set(0.5, 0.5);

    this.player.animations.add('jump', [0]);
    this.player.animations.add('idle', [1]);
    this.player.animations.add('run', [2,3,4,5]);

    this.player.animations.play('idle');

    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.maxVelocity.x = this.maxSpeed;
    this.player.body.drag.x = 600;
  },

  addControls: function() {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jump = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.jump.onDown.add(this.doJump, this);
  },

  doJump: function() {
    if(this.player.body.onFloor()) {
      this.player.body.velocity.y -= this.jumpHeight;
    }
  },

  update: function() {
    this.movePlayer();
    this.checkCollisions();
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
    if(isPressing && this.player.body.onFloor()) {
      this.player.animations.play('run', 15, true);
    }
    else {
      if(!this.player.body.onFloor()) {
        this.player.animations.play('jump');
      }
      else {
        this.player.animations.play('idle');
      }
    }
  },

  checkCollisions: function() {

  }
}
