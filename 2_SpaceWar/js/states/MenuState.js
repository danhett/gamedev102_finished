var MenuState = function(game){

};

MenuState.prototype = {
  create: function() {
  	var start = game.add.sprite(game.world.centerX,
																game.world.centerY,
																'start-button');

		start.anchor.set(0.5, 0.5);
		start.inputEnabled = true;
		start.input.useHandCursor = true;
    start.events.onInputDown.add(this.startGame, this);
  },

	startGame: function() {
		game.state.start("GameState");
	}
}
