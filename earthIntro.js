var earthIntro = function(game){};
earthIntro.prototype = {
	
	
	preload: function(){
		
		this.game.load.image('venusSurface', 'assets/CutsceneArt/venusSurface.png');
		this.game.load.image('earthcut1', 'assets/CutsceneArt/earthcut1.png');
		
		this.game.load.audio('earthSong', 'assets/EarthMusic.ogg');
	},
	
	create: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.world.setBounds(0, 0, 800, 600); 
		this.music = this.game.add.audio('earthSong');
		this.music.play();
		this.background = this.game.add.sprite(0,0, "venusSurface");
		this.game.stage.setBackgroundColor('black');
		
		this.cutsceneArray = new Array();
		this.cutsceneArray.push('venusSurface');
		this.cutsceneArray.push('earthcut1');
		this.iterator = 1;
		
		PIXI.Text.prototype.determineFontProperties = function(fontStyle) {
			var properties = PIXI.Text.fontPropertiesCache[fontStyle];
			if(properties) {
				return properties; 
				}
				properties = {ascent: 40, descent: 10, fontSize: 60
	};

	PIXI.Text.fontPropertiesCache[fontStyle] = properties;
	return properties;
};

		this.content = [
    		" ",
    		"After exploring the\nsurface of Venus,",
    		"the Philae knew that \nit had spent enough time\non this detour.",
    		
			"The Philae set course for Earth.",

			"For humanity.",

			"For home.",

		];

		this.index = 0;
		this.line = '';
		
		this.text = this.game.add.text(32, 380, '', { font: "40pt Jura", fill: 'white', stroke: 'black', strokeThickness: 2});
		
		timer = this.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND * 16.00, this.nextImage,this);
		timer.start();
		
    	this.nextLine();
		
		this.skip = this.game.add.sprite(630,550);
		var skipText = this.game.add.text(0,0, "Press [SPACE] to skip");
		skipText.fontSize = 16;
		skipText.font = "Arial";
		skipText.stroke = '#000000';
    	skipText.strokeThickness = 6;
		skipText.fill = 'white';
		this.skip.addChild(skipText);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
			this.music.stop();
			this.game.state.start("earth");
		}, this);
	},
	
	
	updateLine: function() {

    	if (this.line.length < this.content[this.index].length)
    	{
        	this.line = this.content[this.index].substr(0, this.line.length + 1);
        	// text.text = line;
        	this.text.setText(this.line);
    	}
    	else
    	{
       		//  Wait 2 seconds then start a new line
        	this.game.time.events.add(Phaser.Timer.SECOND * 4, this.nextLine, this);
    	}

	},

	nextLine : function() {

    	this.index++;

    	if (this.index < this.content.length)
    	{
        	this.line = '';
        	this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
    	}

	},
	
	nextImage : function(){
		if (this.iterator < 1){
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.iterator++;
		}
		else {
			this.background.loadTexture(this.cutsceneArray[this.iterator]);
			this.game.time.events.add(Phaser.Timer.SECOND * 16, this.nextLevel, this);
			
		}
		
	},
	nextLevel : function(){
		this.music.stop();
		this.game.state.start('earth');
		
	}
	
}
