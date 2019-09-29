class RegisterScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "RegisterScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **REGISTER** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundRegister');
    	
    	var buttonR = this.add.image(960, 900, 'btnRegister').setInteractive();
    	
    	var back = this.add.image(150, 100, 'back').setInteractive();
    	back.setScale(.15);

    	buttonR.on('pointerover',function(pointer){
    		buttonR.setFrame(1);
    	})

    	buttonR.on('pointerout',function(pointer){
    		buttonR.setFrame(0);
    	})
    	
    	back.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('LogInScene');
    		game.scene.stop('RegisterScene');
    	});
    	
    	
    }
    update(time, delta) {
    	
    }
}