// Phaser Lander Test
// main.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'lander', {preload:preload, create:create, update:update, render:render});

function preload(){
	game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
	game.load.physics('physicsData', 'assets/PhilScale.json');
	game.load.image('platform', 'assets/platform.png');
	game.load.image('planet', 'assets/mars.png');
	game.load.image('square', 'assets/square.png');
	game.load.audio('jupiter', 'assets/jupiter.ogg');
	game.load.image('space', 'assets/backgroundTest.png');
	//game.load.audio('thrust', 'assets/thruster.ogg');
}

var lander;
var planet;
var platform;
var gravPoint;
var tiltBox;
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
	
	background = game.add.tileSprite(0,0,2000,2000, "space");
	
	planet = game.add.sprite(1000,1000, 'planet');
	planet.scale.setTo(0.64);
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	game.physics.p2.enable(planet, true);
	planet.body.static = true;
	planet.body.setCircle(480);
	planet.enableBody = true;
	
	// point where gravity moves toward (center of planet)
	gravPoint = new Phaser.Point(planet.x, planet.y);
	
	platform = game.add.sprite(planet.x + 360,planet.y - 310, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.75);
	game.physics.p2.enable(platform, true);
	platform.body.static = true;
	platform.enableBody = true;
	platform.body.rotation = Math.atan2(gravPoint.y - platform.y, gravPoint.x - platform.x);
	//console.log(platform.body.angle);
	
	//lander = game.add.sprite(100,50,'lander');
	lander = game.add.sprite(400, 400, 'lander');
	lander.scale.setTo(0.5,0.5);
	lander.anchor.set(0.5);
	game.physics.p2.enable(lander, true);
	lander.body.clearShapes();
	lander.body.loadPolygon('physicsData', 'PhilScale');

	// Obstacle wall using array
	var obstArray = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) obstArray.push(game.add.sprite(800, 400, 'square'));
		else obstArray.push(game.add.sprite(obstArray[i - 1].x + 50, obstArray[0].y, 'square'));
		obstArray[i].anchor.set(0.5);
		obstArray[i].scale.setTo(0.75,0.75);
		game.physics.p2.enable(obstArray[i], true);
		obstArray[i].body.static = true;
		obstArray[i].enableBody = true;
	}
	
	// Moving box
	tiltBox = game.add.sprite(1300, 400, 'square');
	tiltBox.anchor.set(0.5);
	tiltBox.scale.setTo(0.75,0.75);
	game.physics.p2.enable(tiltBox, true);
	tiltBox.enableBody = true;
	velocityTowards(tiltBox,gravPoint,80);
	tiltBox.body.kinematic = true;
	
	// Calls for obstacles moving at the same speed, only need 1 call
	game.time.events.loop(Phaser.Timer.SECOND * 2.25, flipVel);

	// Create collision groups
	var landerCollisionGroup = game.physics.p2.createCollisionGroup();
	var planetCollisionGroup = game.physics.p2.createCollisionGroup();
	var platformCollisionGroup = game.physics.p2.createCollisionGroup();
	var obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
	
	// Collidie with world bounds
	game.physics.p2.updateBoundsCollisionGroup();
	
	// Assign collision groups
	planet.body.setCollisionGroup(planetCollisionGroup);
	platform.body.setCollisionGroup(platformCollisionGroup);
	lander.body.setCollisionGroup(landerCollisionGroup);
	for(var i = 0; i < obstArray.length; i++){
		obstArray[i].body.setCollisionGroup(obstacleCollisionGroup);
		obstArray[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	tiltBox.body.setCollisionGroup(obstacleCollisionGroup);
	
	// Object collisions
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	tiltBox.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	
	
	lander.body.collides(platformCollisionGroup,landerHit,this);
	lander.body.collides(obstacleCollisionGroup);
	lander.body.collides(planetCollisionGroup);
	
	//sets camera to follow lander sprite
	game.camera.follow(lander);
	
	// Arrow keys
	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	//thrust = game.add.audio('thrust');
	if(cursors.up.isDown){
		lander.body.thrust(100);
		//thrust.play();
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
	//console.log(lander.body.angle);
	var v = new Phaser.Point(lander.body.velocity.x, lander.body.velocity.y);
	var absX = Math.abs(v.x);
	var absY = Math.abs(v.y);
	console.log(absX, absY);
	if(absX >= 18 || absY >= 18){
		// blow up
		console.log("blow up");
	}
	else{
		if(lander.body.angle <= platform.body.angle + 100 && lander.body.angle >= platform.body.angle - 100){
		lander.body.static = true;
		console.log("SAFE");
		}
	}
	
		
}

// Calls reverseVel for every obstacle that needs to move at the same time
function flipVel(){
	reverseVel(tiltBox);
}

// Called by timer function to reverse object's velocity
function reverseVel(obj1){
	obj1.body.velocity.y = -obj1.body.velocity.y;
	obj1.body.velocity.x = -obj1.body.velocity.x;
}

function velocityTowards(obj1, obj2, speed){
	if(typeof speed === 'undefined'){speed = 80;}
	var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	obj1.body.rotation = angle;
    obj1.body.velocity.x = Math.cos(angle) * speed;
    obj1.body.velocity.y = Math.sin(angle) * speed;
}

function render(){
	game.debug.bodyInfo(lander,32,32);
}