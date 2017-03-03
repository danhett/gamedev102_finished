var game;

window.onload = function() {
  setupPhaser();
};

function setupPhaser() {
  game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameholder', {create: init });
}

function init() {
  console.log('init');
}
