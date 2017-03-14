var GameState = function(game){
  var paddle;
  var ball;
  var blocks = [];
};

GameState.prototype = {
  create: function() {
  	this.game.add.sprite(0, 0, "game-background");
    this.setupGame();
  },

  setupGame: function() {
    this.paddle = this.game.add.sprite(20, 550, "paddle");
  }
}
