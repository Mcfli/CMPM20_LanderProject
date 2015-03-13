// loadLevel.js

var loadLevel = function(game) {};
loadLevel.prototype = {
	preload: function() {
		this.game.load.image('space', 'assets/backgroundTest.png');
		this.game.load.image('blankButton', 'assets/blankButton.png');
		this.game.load.audio('clairdelune', 'assets/clairdelune.ogg');
		this.game.load.image('comet', 'assets/comet.png');
		this.game.load.image('jupiter', 'assets/jupiter3.png');
		this.game.load.image('mars', 'assets/mars.png');
		this.game.load.image('venus', 'assets/venus.png');
		this.game.load.image('earth', 'assets/earth1.png');
	},
	
	create: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.world.setBounds(0, 0, 800, 600); 
		this.music = this.game.add.audio('clairdelune');
		this.music.play();
		background = this.game.add.tileSprite(0,0,2000,2000, "space");
		this.game.stage.setBackgroundColor('0x2d2d2d');

		this.title = this.game.add.text(this.game.world.centerX, 100, "Level Select");
    	this.title.anchor.set(0.5);
    	this.title.font = 'BANGERS';
    	this.title.fontSize = 40;
    	this.title.fontWeight = 'bold';
    	this.title.fill = 'gold';
    	
    	button = this.game.add.button(50, 50, 'blankButton', this.retMenu, this);
    	button.anchor.set(0.5);
    	
    	button.onInputOver.add(this.over, this);
    	button.onInputOut.add(this.out, this);
    	
    	this.comet = this.game.add.sprite(50,50,'comet');
    	this.comet.scale.setTo(0.1);
    	this.comet.anchor.set(0.5);
    	
    	this.backText = 'Orbitron';
    	this.backText = this.game.add.text(50, 50, 'Back');
    	this.backText.anchor.set(0.5);
    	this.backText.align = 'center';
		this.backText.fontSize = 20;
		this.backText.stroke = '#000000';
    	this.backText.strokeThickness = 6;
		this.backText.fill = 'white';
		
		// comet
		buttonTwo = this.game.add.button(200, 250, 'blankButton', this.loadComet, this);
    	buttonTwo.anchor.set(0.5);
    	
    	buttonTwo.onInputOver.add(this.overTwo, this);
    	buttonTwo.onInputOut.add(this.outTwo, this);
    	
    	this.cometL = this.game.add.sprite(200,250,'comet');
    	this.cometL.scale.setTo(0.1);
    	this.cometL.anchor.set(0.5);
    	
    	this.cometText = 'Orbitron';
    	this.cometText = this.game.add.text(200, 250,'Comet');
    	this.cometText.anchor.set(0.5);
    	this.cometText.align = 'center';
		this.cometText.fontSize = 20;
		this.cometText.stroke = '#000000';
    	this.cometText.strokeThickness = 6;
		this.cometText.fill = 'white';
		
		// jupiter
		buttonThree = this.game.add.button(400, 250, 'blankButton', this.loadJupiter, this);
    	buttonThree.anchor.set(0.5);
    	
    	buttonThree.onInputOver.add(this.overThree, this);
    	buttonThree.onInputOut.add(this.outThree, this);
    	
    	this.jupiter = this.game.add.sprite(400,250,'jupiter');
    	this.jupiter.scale.setTo(0.1);
    	this.jupiter.anchor.set(0.5);
    	
    	this.jupiterText = 'Orbitron';
    	this.jupiterText = this.game.add.text(400, 250,'Jupiter');
    	this.jupiterText.anchor.set(0.5);
    	this.jupiterText.align = 'center';
		this.jupiterText.fontSize = 20;
		this.jupiterText.stroke = '#000000';
    	this.jupiterText.strokeThickness = 6;
		this.jupiterText.fill = 'white';
		
		// mars
		buttonFour = this.game.add.button(600, 250, 'blankButton', this.loadMars, this);
    	buttonFour.anchor.set(0.5);
    	
    	buttonFour.onInputOver.add(this.overFour, this);
    	buttonFour.onInputOut.add(this.outFour, this);
    	
    	this.mars = this.game.add.sprite(600,250,'mars');
    	this.mars.scale.setTo(0.1);
    	this.mars.anchor.set(0.5);
    	
    	this.marsText = 'Orbitron';
    	this.marsText = this.game.add.text(600, 250,'Mars');
    	this.marsText.anchor.set(0.5);
    	this.marsText.align = 'center';
		this.marsText.fontSize = 20;
		this.marsText.stroke = '#000000';
    	this.marsText.strokeThickness = 6;
		this.marsText.fill = 'white';
		
		// venus
		buttonFive = this.game.add.button(290, 450, 'blankButton', this.loadVenus, this);
    	buttonFive.anchor.set(0.5);
    	
    	buttonFive.onInputOver.add(this.overFive, this);
    	buttonFive.onInputOut.add(this.outFive, this);
    	
    	this.venus = this.game.add.sprite(290,450,'venus');
    	this.venus.scale.setTo(0.1);
    	this.venus.anchor.set(0.5);
    	
    	this.venusText = 'Orbitron';
    	this.venusText = this.game.add.text(290, 450,'Venus');
    	this.venusText.anchor.set(0.5);
    	this.venusText.align = 'center';
		this.venusText.fontSize = 20;
		this.venusText.stroke = '#000000';
    	this.venusText.strokeThickness = 6;
		this.venusText.fill = 'white';
		
		// earth
		buttonSix = this.game.add.button(510, 450, 'blankButton', this.loadEarth, this);
    	buttonSix.anchor.set(0.5);
    	
    	buttonSix.onInputOver.add(this.overSix, this);
    	buttonSix.onInputOut.add(this.outSix, this);
    	
    	this.earth = this.game.add.sprite(510,450,'earth');
    	this.earth.scale.setTo(0.1);
    	this.earth.anchor.set(0.5);
    	
    	this.earthText = 'Orbitron';
    	this.earthText = this.game.add.text(510, 450,'Earth');
    	this.earthText.anchor.set(0.5);
    	this.earthText.align = 'center';
		this.earthText.fontSize = 20;
		this.earthText.stroke = '#000000';
    	this.earthText.strokeThickness = 6;
		this.earthText.fill = 'white';
	},
	
	retMenu: function() {
		this.music.stop();
		this.game.state.start("mainmenu");
	},
	
	loadComet: function() {
		this.music.stop();
		this.game.state.start("intro");
	},
	
	loadJupiter: function() {
		this.music.stop();
		this.game.state.start("jupiterIntro");
	},
	
	loadMars: function() {
		this.music.stop();
		this.game.state.start("marsIntro");
	},
	
	loadVenus: function() {
		this.music.stop();
		this.game.state.start("venusIntro");
	},
	
	loadEarth: function() {
		this.music.stop();
		this.game.state.start("earthIntro");
	},
	
	over: function() {
    	this.backText.fill = 'gold';
	},

	out: function() {
    	this.backText.fill = 'white';
	},
	
	overTwo: function() {
    	this.cometText.fill = 'gold';
	},

	outTwo: function() {
    	this.cometText.fill = 'white';
	},
	
	overThree: function() {
    	this.jupiterText.fill = 'gold';
	},

	outThree: function() {
    	this.jupiterText.fill = 'white';
	},
	
	overFour: function() {
    	this.marsText.fill = 'gold';
	},

	outFour: function() {
    	this.marsText.fill = 'white';
	},
	
	overFive: function() {
    	this.venusText.fill = 'gold';
	},

	outFive: function() {
    	this.venusText.fill = 'white';
	},
	
	overSix: function() {
    	this.earthText.fill = 'gold';
	},

	outSix: function() {
    	this.earthText.fill = 'white';
	}
}