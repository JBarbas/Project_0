class CreditsScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "CreditsScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CREDITS** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundCredits');
    	
    	var button = this.add.image(960, 800, 'btn').setInteractive();
    	

    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('MenuScene');
    		game.scene.stop('CreditsScene');
    	});
    }
    update(time, delta) {
    	
    }
}