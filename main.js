// Phaser Lander Test
// main.js
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'lander', {preload:preload, create:create, update:update, render:render});
var level = function(game) {};
level.prototype = {

preload: function() {
	
//function preload(){
	this.game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
	this.game.load.physics('physicsData', 'assets/PhilScale.json');
	this.game.load.image('platform', 'assets/platform.png');
	this.game.load.image('planet', 'assets/earth1.png');
	this.game.load.image('square', 'assets/square.png');
	this.game.load.image('space', 'assets/backgroundTest.png');
	//this.game.load.audio('thrust', 'assets/thruster.ogg');
	this.game.load.audio('jupiter', 'assets/jupiter.ogg');

},
//var lander;
//var planet;
//var platform;
//var gravPoint;
//var tiltBox;
//var cursors;

create: function() {
	//var lander;
	var planet;
	var platform;
	//var gravPoint;
	//var tiltBox;
	//var cursors;
	this.music = this.game.add.audio('jupiter');
    this.music.play();

    //setting world size (larger than canvas)
    this.game.world.setBounds(0, 0, 3000, 3000);    
    
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	
	this.game.physics.p2.setImpactEvents(true);
	this.game.physics.p2.restitution = 0.8;
	
	background = this.game.add.tileSprite(0,0,3000,3000, "space");
	
	planet = this.game.add.sprite(1500,1500, 'planet');
	planet.scale.setTo(0.64);
	planet.anchor.set(0.5);
	var planetW = planet.width;
	var planetH = planet.height;
	this.game.physics.p2.enable(planet, true);
	planet.body.static = true;
	planet.body.setCircle(570);
	planet.enableBody = true;
	
	// point where gravity moves toward (center of planet)
	this.gravPoint = new Phaser.Point(planet.x, planet.y);
	
	platform = this.game.add.sprite(planet.x,planet.y + 570, 'platform');
	platform.anchor.set(0.5);
	platform.scale.setTo(0.75);
	this.game.physics.p2.enable(platform, true);
	platform.body.static = true;
	platform.enableBody = true;
	platform.body.rotation = Math.atan2(platform.y - this.gravPoint.y,0);
	//console.log(platform.body.angle);
	
	//lander = this.game.add.sprite(100,50,'lander');
	this.lander = this.game.add.sprite(400, 400, 'lander');
	this.lander.scale.setTo(0.5,0.5);
	this.lander.anchor.set(0.5);
	this.game.physics.p2.enable(this.lander, true);
	this.lander.body.clearShapes();
	this.lander.body.loadPolygon('physicsData', 'PhilScale');

	// Obstacle wall using array
	var obstArray = new Array();
	for(var i = 0; i < 8; i++){
		if(i == 0) obstArray.push(this.game.add.sprite(800, 400, 'square'));
		else obstArray.push(this.game.add.sprite(obstArray[i - 1].x + 50, obstArray[0].y, 'square'));
		obstArray[i].anchor.set(0.5);
		obstArray[i].scale.setTo(0.75,0.75);
		this.game.physics.p2.enable(obstArray[i], true);
		obstArray[i].body.static = true;
		obstArray[i].enableBody = true;
	}
	
	// Moving box
	this.tiltBox = this.game.add.sprite(200, 1400, 'square');
	this.tiltBox.anchor.set(0.5);
	this.tiltBox.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBox, true);
	this.tiltBox.enableBody = true;
	this.velocityTowards(this.tiltBox,this.gravPoint,80);
	this.tiltBox.body.kinematic = true;
	
	this.tiltBoxTwo = this.game.add.sprite(this.tiltBox.x,this.tiltBox.y, 'square');
	this.tiltBoxTwo.anchor.set(0.5);
	this.tiltBoxTwo.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBoxTwo, true);
	this.tiltBoxTwo.enableBody = true;
	this.velocityTowards(this.tiltBoxTwo,this.gravPoint,80);
	this.tiltBoxTwo.body.rotation = this.tiltBox.body.rotation;
	this.reverseVel(this.tiltBoxTwo);
	this.tiltBoxTwo.body.kinematic = true;
	
	this.tiltBoxThree = this.game.add.sprite(this.tiltBox.x,this.tiltBox.y, 'square');
	this.tiltBoxThree.anchor.set(0.5);
	this.tiltBoxThree.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBoxThree, true);
	this.tiltBoxThree.enableBody = true;
	this.tiltBoxThree.body.rotation = this.tiltBox.body.rotation;
	this.tiltBoxThree.body.kinematic = true;
	
	this.tiltBoxFour = this.game.add.sprite(this.tiltBox.x + 14.14213562,this.tiltBox.y - 14.14213562, 'square');
	this.tiltBoxFour.anchor.set(0.5);
	this.tiltBoxFour.scale.setTo(0.75,0.75);
	this.game.physics.p2.enable(this.tiltBoxFour, true);
	this.tiltBoxFour.enableBody = true;
	this.tiltBoxFour.body.rotation = this.tiltBox.body.rotation;
	this.tiltBoxFour.body.kinematic = true;
	
	// Calls for obstacles moving at the same speed, only need 1 call
	timer = this.game.time.create(false);
	timer.loop(Phaser.Timer.SECOND * 2.25, this.flipVel,this);
	timer.start();
	//this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, callback(this.flipVel,this.tiltBox));

	// Create collision groups
	var landerCollisionGroup = this.game.physics.p2.createCollisionGroup();
	var planetCollisionGroup = this.game.physics.p2.createCollisionGroup();
	var platformCollisionGroup = this.game.physics.p2.createCollisionGroup();
	var obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
	
	// Collidie with world bounds
	this.game.physics.p2.updateBoundsCollisionGroup();
	
	// Assign collision groups
	planet.body.setCollisionGroup(planetCollisionGroup);
	platform.body.setCollisionGroup(platformCollisionGroup);
	this.lander.body.setCollisionGroup(landerCollisionGroup);
	for(var i = 0; i < obstArray.length; i++){
		obstArray[i].body.setCollisionGroup(obstacleCollisionGroup);
		obstArray[i].body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	}
	this.tiltBox.body.setCollisionGroup(obstacleCollisionGroup);
	this.tiltBoxTwo.body.setCollisionGroup(obstacleCollisionGroup);
	
	// Object collisions
	planet.body.collides([planetCollisionGroup,landerCollisionGroup]);
	platform.body.collides([platformCollisionGroup,landerCollisionGroup]);
	this.tiltBox.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	this.tiltBoxTwo.body.collides([obstacleCollisionGroup, landerCollisionGroup]);
	
	this.lander.body.collides(platformCollisionGroup,this.landerHit,this);
	this.lander.body.collides(obstacleCollisionGroup,this.landerCol,this);
	this.lander.body.collides(planetCollisionGroup,this.landerCol,this);
	
	//sets camera to follow lander sprite
	this.game.camera.follow(this.lander);
	
	// Arrow keys
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
    
    ////Functioning Code for HUD, use with Update HUD Functions
    var level = "Return to Earth";
	var Veloc = (this.lander.body.velocity.x + this.lander.body.velocity.y)/2;
    //addChild of my text at x:0, y:0
    var levelText = this.game.add.text(0,0,level.toString());
	var VelText = this.game.add.text(0,0,Veloc.toString());
    
    // HUD Sprite
    this.HUDlevel = this.game.add.sprite(300,0);
    this.HUDvel = this.game.add.sprite(0,50);
    
    //Created a Sprite with fixedToCamera = true
    this.HUDlevel.fixedToCamera = true;
    levelText.fill = 'gold';
    this.HUDvel.fixedToCamera = true;
    VelText.fill = 'gold';
    
    this.HUDlevel.addChild(levelText);
	this.HUDvel.addChild(VelText);
	
},

update: function() {
	//thrust = this.game.add.audio('thrust');
	if(this.cursors.up.isDown){
		this.lander.body.thrust(100);
		//thrust.play();
	}
	if(this.cursors.left.isDown){
		
		this.lander.body.rotateLeft(100);
	}
	else if(this.cursors.right.isDown){
		this.lander.body.rotateRight(100);
	}
	else{
		this.lander.body.setZeroRotation();
	}
	this.accelerateToObject(this.lander,this.gravPoint,50);
	
	
	////Velocity update for HUD
	//calculating Velocity of Lander
	var Veloc = (Math.floor(Math.floor(Math.abs(this.lander.body.velocity.x) 
		+ Math.abs(this.lander.body.velocity.y)/2)));
    //stringify Veloc
    var VelText = this.game.add.text(0,0,Veloc.toString());
	//clear old sprite
	this.HUDvel.destroy();
    //generate new sprite
    this.HUDvel = this.game.add.sprite(0,50);
    this.HUDvel.fixedToCamera = true;
    VelText.fill = 'gold';
    this.HUDvel.addChild(VelText);
    
    //Logic for generating Warning
    if(Math.floor(Math.floor(Math.abs(this.lander.body.velocity.x) 
		+ Math.abs(this.lander.body.velocity.y)/2)) > 40){
			//+ Math.abs(this.lander.body.velocity.y)/2)) > 40 && this.HUDwarn.exists() == false){
			var Warning = "UNSAFE LANDING SPEED";
			var WarnText = this.game.add.text(0,0,Warning.toString());
			//this.HUDwarn.destroy();
			this.HUDwarn = this.game.add.sprite(0,75);
			this.HUDwarn.fixedToCamera = true;
			WarnText.fill = 'red';
			this.HUDwarn.addChild(WarnText);
	}
		
	/*if(Math.floor(Math.floor(Math.abs(this.lander.body.velocity.x) 
		+ Math.abs(this.lander.body.velocity.y)/2)) < 40 && this.HUDwarn.exists() == true){
			
			this.HUDwarn.destroy();	
	
	}*/
	
},

updateVel: function(){
	this.level.setText(this.lander.body.velocity.x);
},

accelerateToObject: function(obj1, obj2, speed){
	if(typeof speed === 'undefined'){speed = 50;}
	var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.force.x += Math.cos(angle) * speed;
    obj1.body.force.y += Math.sin(angle) * speed;
},



// function called by collision with platform
landerHit: function(bodyA, bodyB, shapeA, shapeB){
	var v = new Phaser.Point(bodyA.velocity.x, bodyA.velocity.y);
	var absX = Math.abs(v.x);
	var absY = Math.abs(v.y);
	console.log(absX, absY);
	// check landing velocity
//	if(absX >= 18 || absY >= 18){
		
	if((absX + absY)/2 >= 40){
		// blow up
		console.log("blow up");
		this.music.stop();
		this.game.state.start('level');
	}
	else{
		// check landing angle
		if(bodyA.angle <= bodyB.angle + 100 && bodyA.angle >= bodyB.angle - 100){
			bodyA.static = true;
			console.log("SAFE");
		}
		else{
			// blow up
			console.log("blow up");
			this.music.stop();
			this.game.state.start('create');
		}
	}
	
		
},

// function called when lander hits anything besides the platform
landerCol: function(bodyA, bodyB, shapeA, shapeB){
	console.log("blow up");
	this.music.stop();
	this.game.state.start('level');
},

// Calls reverseVel for every obstacle that needs to move at the same time
flipVel: function(obj1){
	this.reverseVel(this.tiltBox);
	this.reverseVel(this.tiltBoxTwo);
},

// Called by timer function to reverse object's velocity
reverseVel: function(obj1){
	obj1.body.velocity.y = -obj1.body.velocity.y;
	obj1.body.velocity.x = -obj1.body.velocity.x;
},

velocityTowards: function(obj1, obj2, speed){
	if(typeof speed === 'undefined'){speed = 80;}
	var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	obj1.body.rotation = angle;
    obj1.body.velocity.x = Math.cos(angle) * speed;
    obj1.body.velocity.y = Math.sin(angle) * speed;
},


render: function() {
	this.game.debug.bodyInfo(this.lander,32,32);
}
};
