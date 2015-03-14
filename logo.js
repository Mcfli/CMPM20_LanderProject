var logo = function(game){};
logo.prototype = {
	
	
	preload: function(){
		
		this.game.load.image('venusSurface', 'assets/CutsceneArt/venusSurface.png');
		this.game.load.image('earthcut1', 'assets/CutsceneArt/earthcut1.png');
		
		this.game.load.audio('ding', 'assets/ding.ogg');
	},
	
	create: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.world.setBounds(0, 0, 800, 600); 
		this.background = this.game.add.sprite(0,0, "venusSurface");
		this.game.stage.setBackgroundColor('white');
		
		this.ding = this.game.add.audio('ding');
		
		this.cutsceneArray = new Array();
		this.cutsceneArray.push('venusSurface');
		this.cutsceneArray.push('earthcut1');
		this.iterator = 1;

		timer = this.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND * 2.00, this.nextImage,this);
		timer.start();
		
	},
	

	
	nextImage : function(){
		if (this.iterator < 1){
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.iterator++;
		}
		else {
			timer.stop();
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.ding.play();
			this.game.time.events.add(Phaser.Timer.SECOND * 4, this.nextLevel, this);
			
		}
		
	},
	nextLevel : function(){
		this.game.state.start('mainmenu');
		
	}
	
}