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

  setupBall: function() {
    this.ball = this.game.add.sprite(400, 300, "ball");

    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.velocity.x = 250;
    this.ball.body.velocity.y = 250;
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);
  },

  setupPaddle: function() {
    //this.paddle = this.game.add.sprite(20, 550, "paddle");
  },

  setupBlocks: function() {

  },

  render: function() {
    this.game.debug.text(this.ball.body.velocity.x + "/" + this.ball.body.velocity.y, 20, 30);
  }
}
