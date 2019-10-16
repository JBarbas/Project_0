class OptionsScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "OptionsScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **OPTIONS** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    	
    	var background = this.add.image(960, 540, 'backgroundOptionsAccount');
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	

    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('MenuScene');
    		game.scene.stop('OptionsScene');
    	});
    }
    update(time, delta) {
    	
    }
}