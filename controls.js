// controls.js
// Controls screen (how to play)

var controls = function(game) {};
controls.prototype = {
	preload: function() {
		this.game.load.image('space', 'assets/backgroundTest.png');
		this.game.load.audio('clairdelune', 'assets/clairdelune.ogg');
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
	}
}
