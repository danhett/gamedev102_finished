var GameState = function(game){
  this.paddle;
  this.ball;
  this.blocks;
};

GameState.prototype = {
  create: function() {
  	game.add.sprite(0, 0, "game-background");

    this.setupBall();
    this.setupPaddle();
    this.setupBlocks();
  },

  // BALL
  setupBall: function() {
    this.ball = game.add.sprite(400, 300, "ball");
    this.ball.anchor.set(0.5, 0.5);

    game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.velocity.x = 250;
    this.ball.body.velocity.y = 250;
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);

    game.physics.arcade.checkCollision.down = false;
  },

  // PADDLE
  setupPaddle: function() {
    this.paddle = game.add.sprite(20, 550, "paddle");
    this.paddle.anchor.set(0.5, 0.5);

    game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
    this.paddle.body.immovable = true;
  },

  // BLOCKS
  setupBlocks: function() {
    this.blocks = game.add.physicsGroup();
    this.blockTypes = ["red-block", "green-block", "yellow-block", "blue-block"];

    var blockWidth = 64;
    var blockHeight = 32;
    var columns = 12;
    var rows = 4;

    for(var i = 0; i < columns; i++)
    {
      for(var j = 0; j < rows; j++)
      {
        var block = this.blocks.create(15 + i * blockWidth, 30 + j * blockHeight, this.blockTypes[j]);
        block.body.immovable = true;
      }
    }
  },

  update: function() {
    this.paddle.x = game.input.mousePointer.x;

    game.physics.arcade.collide(this.ball, this.paddle, this.onPaddleHit);
    game.physics.arcade.collide(this.ball, this.blocks, this.onBlockHit);

    if(this.ball.y > game.height) {
      game.state.start("MenuState");
    }
  },

  onPaddleHit(ball, paddle) {
    ball.body.velocity.x *= 1.005;
    ball.body.velocity.y *= 1.005;
  },

  onBlockHit(ball, block) {
    block.destroy();
  },

  render: function() {
    game.debug.text(this.ball.body.velocity.x + "/" + this.ball.body.velocity.y, 20, 30);
  }
}
