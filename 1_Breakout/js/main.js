var game;

window.onload = function() {
  setupPhaser();
};

function setupPhaser() {
  game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameholder', {create: init});
}

function init() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.state.add("LoaderState", LoaderState);
  game.state.add("MenuState", MenuState);
  game.state.add("GameState", GameState);

  game.state.start("LoaderState");
}
