var GameState = function(game){
  this.bg;
  this.ship;
  this.cursors;
  this.shootButton;
  this.laser;

  this.bgSpeed = 4;
  this.shipMoveSpeed = 5;
};

GameState.prototype = {
  create: function() {
    this.setupGame();
    this.addControls();
  },

  setupGame: function() {
    this.bg = this.game.add.tileSprite(0, 0, 1000, 600, "game-background");

    this.ship = this.game.add.sprite(40, 250, "ship");
    this.ship.anchor.set(0, 0.5);
  },

  addControls: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton.onDown.add(this.shootLaser, this);
  },

  shootLaser: function() {
    this.laser = this.game.add.sprite(this.ship.x + 50, this.ship.y, "laser");
    this.laser.anchor.set(0, 0.5);
    this.game.physics.enable(this.laser, Phaser.Physics.ARCADE);
    this.laser.body.velocity.x = 800;

    this.laser.checkWorldBounds = true;
    this.laser.events.onOutOfBounds.add(this.killLaser, this);
  },

  killLaser: function(_laser) {
    _laser.destroy();
  },

  update: function() {

    this.bg.tilePosition.x -= this.bgSpeed;

    if(this.cursors.up.isDown)
      this.ship.y -= this.shipMoveSpeed;

    if(this.cursors.down.isDown)
      this.ship.y += this.shipMoveSpeed;

    if(this.cursors.left.isDown)
      this.ship.x -= this.shipMoveSpeed;

    if(this.cursors.right.isDown)
      this.ship.x += this.shipMoveSpeed;
  }
}
