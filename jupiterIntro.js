var jupiterIntro = function(game){};
jupiterIntro.prototype = {
	
	
	preload: function(){
		
		this.game.load.image('cometCutscene', 'assets/CutsceneArt/cometCutscene.png');
		this.game.load.image('coolJupiter', 'assets/CutsceneArt/coolJupiter.png');
		
		this.game.load.audio('jupiterSong', 'assets/jupiter.ogg');
	},
	
	create: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.world.setBounds(0, 0, 800, 600); 
		this.music = this.game.add.audio('jupiterSong');
		this.music.play();
		this.background = this.game.add.sprite(0,0, "cometCutscene");
		this.game.stage.setBackgroundColor('black');
		
		this.cutsceneArray = new Array();
		this.cutsceneArray.push('cometCutscene');
		this.cutsceneArray.push('cometCutscene');
		this.cutsceneArray.push('coolJupiter');
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
    		"November 12, 2014",
    		"The Philae lander made history\n by being the first craft",
    		"to land on a comet,\n67P/Churyumov–Gerasimenko.",

			"But there was a problem\n with the landing.", 
			"The Philae lost power.",

			"It was assumed that\n the Philae was lost",
			"until one day, \nthe Philae awakened.",

			"Without signal from Earth,",
			"the Philae decided\n to seek out humanity,\n and find out the truth.",
		];

		this.index = 0;
		this.line = '';
		
		this.text = this.game.add.text(32, 380, '', { font: "40pt Jura", fill: 'white', stroke: 'black', strokeThickness: 2});
		
		timer = this.game.time.create(false);
		timer.loop(Phaser.Timer.SECOND * 25.00, this.nextImage,this);
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
			this.game.state.start("jupiter");
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
		if (this.iterator < 2){
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
		this.game.state.start('jupiter');
		
	}
	
}
