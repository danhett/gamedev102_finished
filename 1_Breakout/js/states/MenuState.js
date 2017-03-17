var MenuState = function(game){

};

MenuState.prototype = {
  create: function() {
  	var start = this.game.add.sprite(this.game.world.centerX,
																		 this.game.world.centerY,
																		 'start-button');

		start.anchor.set(0.5, 0.5);
		start.inputEnabled = true;
		start.input.useHandCursor = true;
    start.events.onInputDown.add(this.startGame, this);
  },

	startGame: function() {
		this.game.state.start("GameState");
	}
}
