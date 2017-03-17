var GameState = function(game){
  this.bg;
  this.ship;
  this.cursors;
  this.shootButton;

  this.bgSpeed = 4;
  this.shipMoveSpeed = 5;

  this.lasers;
  this.enemies;

  this.emitter;
};

GameState.prototype = {
  create: function() {
    this.setupGame();
    this.setupEnemies();
    this.addControls();
  },

  setupGame: function() {
    this.bg = this.game.add.tileSprite(0, 0, 1000, 600, "game-background");

    this.ship = this.game.add.sprite(40, 250, "ship");
    this.ship.anchor.set(0, 0.5);

    this.lasers = this.game.add.group();
    this.enemies = this.game.add.group();

    this.emitter = this.game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('asteroid-chunk');
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, 200);
    this.emitter.gravity.x = -300;
    this.emitter.gravity.y = 0;
  },

  setupEnemies: function() {
    var asteroid = this.enemies.create(600, 300, "asteroid");
    asteroid.anchor.set(0.5, 0.5);
    this.game.physics.enable(asteroid, Phaser.Physics.ARCADE);
  },

  addControls: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton.onDown.add(this.shootLaser, this);
  },

  shootLaser: function() {
    var laser = this.lasers.create(this.ship.x + 50, this.ship.y, "laser");
    laser.anchor.set(0, 0.5);
    this.game.physics.enable(laser, Phaser.Physics.ARCADE);
    laser.body.velocity.x = 800;

    laser.checkWorldBounds = true;
    laser.events.onOutOfBounds.add(this.killLaser, this);
  },

  killLaser: function(_laser) {
    _laser.destroy();
  },

  update: function() {
    this.moveEverything();
    this.checkCollisions();
  },

  moveEverything: function() {
    // scroll the background
    this.bg.tilePosition.x -= this.bgSpeed;

    // move the ship
    if(this.cursors.up.isDown)
      this.ship.y -= this.shipMoveSpeed;

    if(this.cursors.down.isDown)
      this.ship.y += this.shipMoveSpeed;

    if(this.cursors.left.isDown)
      this.ship.x -= this.shipMoveSpeed;

    if(this.cursors.right.isDown)
      this.ship.x += this.shipMoveSpeed;
  },

  checkCollisions: function() {
    game.physics.arcade.collide(this.lasers, this.enemies, this.onEnemyDestroyed, null, this);
  },

  onEnemyDestroyed: function(_laser, _enemy) {
    this.emitter.x = _enemy.x;
    this.emitter.y = _enemy.y;

    this.emitter.start(true, 2000, null, 10);

    _laser.destroy();
    _enemy.destroy();
  }
}
