var GameState = function(game){
  var paddle;
  var ball;
  var blocks = [];
};

GameState.prototype = {
  create: function() {
  	this.game.add.sprite(0, 0, "game-background");

    this.setupBall();
    this.setupPaddle();
    this.setupBlocks();
  },

  // BALL
  setupBall: function() {
    this.ball = this.game.add.sprite(400, 300, "ball");
    this.ball.anchor.set(0.5, 0.5);

    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.velocity.x = 250;
    this.ball.body.velocity.y = 250;
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);
  },

  // PADDLE
  setupPaddle: function() {
    this.paddle = this.game.add.sprite(20, 550, "paddle");
    this.paddle.anchor.set(0.5, 0.5);

    this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
    this.paddle.body.immovable = true;
  },

  // BLOCKS
  setupBlocks: function() {

  },

  update: function() {
    this.paddle.x = this.ball.x;

    game.physics.arcade.collide(this.ball, this.paddle);
  },

  render: function() {
    this.game.debug.text(this.ball.body.velocity.x + "/" + this.ball.body.velocity.y, 20, 30);
  }
}
