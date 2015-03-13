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
