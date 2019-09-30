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
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	button.setScale(.15);
    	
    	var link = this.add.image(1800, 50, 'link').setInteractive();
    	
    	//Animacion creditos saliendo
    	var team = this.add.image(1010, 1800, 'team').setInteractive();
    	team.setScale(.8);

        //link.on('pointerup', openExternalLink, this);
        

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