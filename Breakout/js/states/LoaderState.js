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
		this.game.load.image('start-button', 'assets/start.png');
		this.game.load.image('game-background', 'assets/space.jpg');
		this.game.load.image('paddle', 'assets/paddle.png');
		this.game.load.image('red-block', 'assets/blockRed.png');
	},

  create: function(){
  	this.game.state.start("MenuState");
  }
}
