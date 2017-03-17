var GameState = function(game){
  var bg;
  var ship;
  var cursors;
  var shootButton;

  var bgSpeed = 4;
};

GameState.prototype = {
  create: function() {
    this.setupGame();
    this.addControls();
  },

  setupGame: function() {
    this.bg = this.game.add.tileSprite(0, 0, 1000, 600, "game-background");
    this.ship = this.game.add.sprite(40, 250, "ship");
  },

  addControls: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton.onDown.add(this.shootLaser, this);
  },

  shootLaser: function() {
    console.log("pew!");
  },

  update: function() {
    this.bg.tilePosition.x -= 4;

    if(this.cursors.up.isDown)
      this.ship.y -= 4;

    if(this.cursors.down.isDown)
      this.ship.y += 4;
  }
}
