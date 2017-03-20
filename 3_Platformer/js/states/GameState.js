var GameState = function(game){
  this.bg;
  this.player;
};

GameState.prototype = {
  create: function() {
  	this.bg = game.add.tileSprite(0, 0, 800, 600, "sky");

    this.createPlayer();
  },

  createPlayer: function() {
    this.player = game.add.sprite(200, 200, 'player');

    this.player.animations.add('jump', [0]);
    this.player.animations.add('idle', [1]);
    this.player.animations.add('run', [2,3,4,5]);

    //this.player.animations.play('run', 10, true);
    this.player.animations.play('idle');
  }
}
