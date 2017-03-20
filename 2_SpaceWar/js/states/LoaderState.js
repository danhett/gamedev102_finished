var LoaderState = function(game){

};

LoaderState.prototype = {
	preload: function(){
		this.makeLoaderMessage();
		this.loadObjects();
	},

	makeLoaderMessage: function() {
		var text = game.add.text(game.world.centerX, game.world.centerY,
														 "Loading...", { font: "32px Arial", fill: "#ffffff"});

    text.anchor.setTo(0.5, 0.5);
	},

	loadObjects: function() {
		game.load.image('start-button', 'assets/start.png');
		game.load.image('game-background', 'assets/space.png');
		game.load.image('ship', 'assets/ship.png');
		game.load.image('laser', 'assets/laser.png');
		game.load.image('asteroid', 'assets/asteroid.png');
		game.load.image('asteroid-chunk', 'assets/asteroid-chunk.png');
		game.load.image('enemy-ship', 'assets/enemy.png');
	},

  create: function(){
  	game.state.start("MenuState");
  }
}
