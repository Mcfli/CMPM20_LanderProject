// about.js
// about screen

var about = function(game) {};
about.prototype = {
	preload: function() {
		this.game.load.image('space', 'assets/backgroundTest.png');
		this.game.load.image('blankButton', 'assets/blankButton.png');
		this.game.load.audio('clairdelune', 'assets/clairdelune.ogg');
		this.game.load.image('comet', 'assets/comet.png');
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

		this.title = this.game.add.text(this.game.world.centerX, 100, "About");
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
		
		this.createdText = 'Orbitron';
    	this.createdText = this.game.add.text(this.game.world.centerX, 175, 'Created by\n      Nathan Irwin, George Rocha, Anderson Tu, Dominic Balassone');
    	this.createdText.anchor.set(0.5);
    	this.createdText.align = 'center';
		this.createdText.fontSize = 20;
		this.createdText.stroke = '#000000';
    	this.createdText.strokeThickness = 6;
		this.createdText.fill = 'white';
		
		var infoStr = "This game was created for CMPM 20 at University of California, Santa Cruz.\n" +
		"The theme for the project was Scientific Breakthroughs of 2014. The game was\n" +
		"inspired by the Rosetta spacecraft and Philae lander mission to land on a comet,\n" +
		"which was succesful on November 12, 2014.  We wrote the game in Javascript\n" +
		"and used the Phaser library for the general framework and physics of the game.\n";
		this.infoText = 'Orbitron';
    	this.infoText = this.game.add.text(this.game.world.centerX, 325, infoStr);
    	this.infoText.anchor.set(0.5);
    	this.infoText.align = 'center';
		this.infoText.fontSize = 20;
		this.infoText.stroke = '#000000';
    	this.infoText.strokeThickness = 6;
		this.infoText.fill = 'white';
		
		this.cutText = 'Orbitron';
    	this.cutText = this.game.add.text(this.game.world.centerX, 450, "Cutscene image credit: NASA");
    	this.cutText.anchor.set(0.5);
    	this.cutText.align = 'center';
		this.cutText.fontSize = 16;
		this.cutText.stroke = '#000000';
    	this.cutText.strokeThickness = 6;
		this.cutText.fill = 'white';
		
		this.logoText = 'Orbitron';
    	this.logoText = this.game.add.text(this.game.world.centerX, 475, "Team logo image credit: Stuart Keller");
    	this.logoText.anchor.set(0.5);
    	this.logoText.align = 'center';
		this.logoText.fontSize = 16;
		this.logoText.stroke = '#000000';
    	this.logoText.strokeThickness = 6;
		this.logoText.fill = 'white';
	},
	
	retMenu: function() {
		this.music.stop();
		this.game.state.start("mainmenu");
	},
	
	over: function() {
    	this.backText.fill = 'gold';
	},

	out: function() {
    	this.backText.fill = 'white';
	}
}
