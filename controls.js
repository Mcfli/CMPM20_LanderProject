// controls.js
// Controls screen (how to play)

var controls = function(game) {};
controls.prototype = {
	preload: function() {
		this.game.load.image('space', 'assets/backgroundTest.png');
		this.game.load.image('blankButton', 'assets/blankButton.png');
		this.game.load.audio('clairdelune', 'assets/clairdelune.ogg');
		this.game.load.image('comet', 'assets/comet.png');
		this.game.load.image('lander', 'assets/Lander Sprites/Phil1.png');
		this.game.load.image('platform', 'assets/platformRot.png');
		this.game.load.image('up', 'assets/up.png');
		this.game.load.image('left', 'assets/left.png');
		this.game.load.image('right', 'assets/right.png');
		this.game.load.image('ast1', 'assets/ast1.png');
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

		this.title = this.game.add.text(this.game.world.centerX, 100, "Controls");
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
		
		this.guide = this.game.add.text(200, 200, "Control");
    	this.guide.anchor.set(0.5);
    	this.guide.font = 'BANGERS';
    	this.guide.fontSize = 20;
    	this.guide.fontWeight = 'bold';
    	this.guide.fill = 'white';
		
		this.lander = this.game.add.sprite(300, 200, 'lander');
		this.lander.scale.setTo(0.5,0.5);
		this.lander.anchor.set(0.5);
		
    	this.using = this.game.add.text(400, 200, "using");
    	this.using.anchor.set(0.5);
    	this.using.font = 'BANGERS';
    	this.using.fontSize = 20;
    	this.using.fontWeight = 'bold';
    	this.using.fill = 'white';
    	
    	this.left = this.game.add.sprite(500, 200, 'left');
    	this.left.scale.setTo(0.5,0.5);
    	this.left.anchor.set(0.5);
    	this.up = this.game.add.sprite(550, 200, 'up');
    	this.up.scale.setTo(0.5,0.5);
    	this.up.anchor.set(0.5);
    	this.right = this.game.add.sprite(600, 200, 'right');
    	this.right.scale.setTo(0.5,0.5);
    	this.right.anchor.set(0.5);
    	
    	this.safe = this.game.add.text(300, 300, "Find     &     land     safely     on");
    	this.safe.anchor.set(0.5);
    	this.safe.font = 'BANGERS';
    	this.safe.fontSize = 20;
    	this.safe.fontWeight = 'bold';
    	this.safe.fill = 'white';
    	
    	this.platform = this.game.add.sprite(550, 300, 'platform');
    	this.platform.scale.setTo(0.75);
    	this.platform.anchor.set(0.5);
		
		this.avoid = this.game.add.text(358, 400, "Avoid");
    	this.avoid.anchor.set(0.5);
    	this.avoid.font = 'BANGERS';
    	this.avoid.fontSize = 20;
    	this.avoid.fontWeight = 'bold';
    	this.avoid.fill = 'white';
    	
    	this.ast = this.game.add.sprite(500, 400, 'ast1');
    	this.ast.scale.setTo(0.75,0.75);
    	this.ast.anchor.set(0.5);
    	
    	this.esc = this.game.add.text(420, 500, '[ESC]      to      pause');
    	this.esc.anchor.set(0.5);
    	this.esc.font = 'BANGERS';
    	this.esc.fontSize = 20;
    	this.esc.fontWeight = 'bold';
    	this.esc.fill = 'white';
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
