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
		this.game.load.image('sky', 'assets/sky.png');
		this.game.load.spritesheet('player', 'assets/player-sheet.png', 72, 97, 6);
	},

  create: function(){
  	this.game.state.start("MenuState");
  }
}
