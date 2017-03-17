var GameState = function(game){
  var bg;
  var ship;
};

GameState.prototype = {
  create: function() {
  	this.bg = this.game.add.tileSprite(0, 0, 1000, 600, "game-background");
    this.ship = this.game.add.sprite(40, 250, "ship");
  },

  update: function() {
    this.bg.tilePosition.x -= 2;
  }
}
