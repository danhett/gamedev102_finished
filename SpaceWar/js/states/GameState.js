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
    this.emitter.minParticleSpeed.setTo(-100, -100);
    this.emitter.maxParticleSpeed.setTo(300, 300);
    this.emitter.gravity.x = -500;
    this.emitter.gravity.y = 0;
  },

  setupEnemies: function() {
    for(var i = 0; i < 10; i++) {
      var enemy = this.enemies.create(1200, 800, "asteroid");
      enemy.anchor.set(0.5, 0.5);
      this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.velocity.x = -300;

      enemy.checkWorldBounds = true;
      enemy.events.onOutOfBounds.add(this.recycleEnemy, this);
    }
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
    _laser.kill();
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
    game.physics.arcade.overlap(this.lasers, this.enemies, this.onEnemyDestroyed, null, this);
  },

  onEnemyDestroyed: function(_laser, _enemy) {
    this.emitter.x = _enemy.x;
    this.emitter.y = _enemy.y;

    this.emitter.start(true, 4000, null, 6);

    this.killLaser(_laser);
    this.recycleEnemy(_enemy);
  },

  recycleEnemy: function(_enemy) {
    _enemy.x = 1200 + (Math.random() * 5000);
    _enemy.y = Math.random() * 600;
    _enemy.body.velocity.x = -300;
  }
}
