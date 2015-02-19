// Phaser Lander Test
// main.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'lander', {preload:preload, create:create, update:update, render:render});

function preload(){
	game.load.image('ship', 'assets/ship_2.png');
	game.load.image('platform', 'assets/platform.png');
	game.load.image('planet', 'assets/circle.png');
	game.load.image('square', 'assets/square.png');
	game.load.audio('jupiter', 'assets/jupiter.ogg');
}

var lander;
var planet;
var platform;
var gravPoint;
var cursors;

function create(){
	music = game.add.audio('jupiter');
    music.play();
    
    //setting world size (larger than canvas)
    game.world.setBounds(0, 0, 2000, 2000);    
    
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.restitution = 0.8;
	
	game.stage.backgroundColor = '#2d2d2d';
	
	planet = game.add.sprite(1000,1000, 'planet');
	planet.scale.setTo(2);
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	game.physics.p2.enable(planet, true);
	planet.body.static = true;
	planet.body.setCircle(160);
	planet.enableBody = true;
	
	platform = game.add.sprite(planet.x,planet.y - 160, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.5);
	game.physics.p2.enable(platform, true);
	platform.body.static = true;
	platform.enableBody = true;
	
	lander = game.add.sprite(100,50,'ship');
	lander.scale.setTo(0.5,0.5);
	lander.anchor.set(0.5);
	game.physics.p2.enable(lander, true);
	
	obstacle = game.add.sprite(800, 800, 'square');
	obstacle.anchor.set(0.5);
	obstacle.scale.setTo(0.75,0.75);
	game.physics.p2.enable(obstacle, true);
	obstacle.body.static = true;
	obstacle.enableBody = true;
	
	obstacleTwo = game.add.sprite(900, 800, 'square');
	obstacleTwo.anchor.set(0.5);
	obstacleTwo.scale.setTo(0.75,0.75);
	game.physics.p2.enable(obstacleTwo, true);
	obstacleTwo.body.static = true;
	obstacleTwo.enableBody = true;
	
	
	var landerCollisionGroup = game.physics.p2.createCollisionGroup();
	var planetCollisionGroup = game.physics.p2.createCollisionGroup();
	var platformCollisionGroup = game.physics.p2.createCollisionGroup();
	var obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
	
	game.physics.p2.updateBoundsCollisionGroup();
	
	planet.body.setCollisionGroup(planetCollisionGroup);
	platform.body.setCollisionGroup(platformCollisionGroup);
	lander.body.setCollisionGroup(landerCollisionGroup);
	obstacle.body.setCollisionGroup(obstacleCollisionGroup);
	obstacleTwo.body.setCollisionGroup(obstacleCollisionGroup);
	
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	obstacle.body.collides([obstacleCollisionGroup,landerCollisionGroup]);
	obstacleTwo.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	
	lander.body.collides(platformCollisionGroup,landerHit,this);
	lander.body.collides(obstacleCollisionGroup);
	lander.body.collides(planetCollisionGroup);
	
	//sets camera to follow lander sprite
	game.camera.follow(lander);
	
	// point where gravity moves toward (center of planet)
	gravPoint = new Phaser.Point(planet.x, planet.y);
	
	cursors = game.input.keyboard.createCursorKeys();
	
	// specifies function to call when collision occurs
	lander.onBeginContact.add(landerHit,this);
}

function update(){
	if(cursors.up.isDown){
		lander.body.thrust(100);
	}
	if(cursors.left.isDown){
		lander.body.rotateLeft(100);
	}
	else if(cursors.right.isDown){
		lander.body.rotateRight(100);
	}
	else{
		lander.body.setZeroRotation();
	}
	
	accelerateToObject(lander,gravPoint,50);
}

function accelerateToObject(obj1, obj2, speed){
	if(typeof speed === 'undefined'){speed = 50;}
	var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.force.x += Math.cos(angle) * speed;
    obj1.body.force.y += Math.sin(angle) * speed;
}

//function called by collision
function landerHit(body, shapeA, shapeB, equation){
		lander.body.static = true;
}

function render(){
	game.debug.bodyInfo(lander,32,32);
}
