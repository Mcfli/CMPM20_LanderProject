// Phaser Lander Test
// main.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'lander-test', {preload:preload, create:create, update:update, render:render});

function preload(){
	game.load.image('ship', 'assets/ship_2.png');
	game.load.image('planet', 'assets/planet.png');
}

var lander;
var planet;
var gravPoint;
var cursors;

function create(){
	game.stage.backgroundColor = '#2d2d2d';
	game.renderer.clearBeforeRender = false;
	game.renderer.roundPixels = true;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.arcade.gravity.y = 25;
	planet = game.add.sprite(400,300, 'planet');
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	game.physics.enable(planet, Phaser.Physics.ARCADE);
	planet.body.gravity = false;
	lander = game.add.sprite(200,300,'ship');
	lander.scale.setTo(0.5,0.5);
	lander.anchor.set(0.5);
	game.physics.enable(lander, Phaser.Physics.ARCADE);
	
	lander.body.maxVelocity.set(200);
	
	gravPoint = new Phaser.Point(planet.x, planet.y);
	
	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	if(cursors.up.isDown){
		game.physics.arcade.accelerationFromRotation(lander.rotation, 100, lander.body.acceleration);
	}
	else{
		lander.body.acceleration.set(0);
	}
	if(cursors.left.isDown){
		lander.body.angularVelocity = -200;
	}
	else if(cursors.right.isDown){
		lander.body.angularVelocity = 200;
	}
	else{
		lander.body.angularVelocity = 0;
	}
	lander.body.gravity = new Phaser.Point(gravPoint.x - lander.body.x, gravPoint.y - lander.body.y);
	lander.body.gravity = lander.body.gravity.normalize().multiply(100, 100);
}

function render(){
	
}
