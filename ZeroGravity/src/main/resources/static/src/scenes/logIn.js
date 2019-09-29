class LogInScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "LogInScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOG IN** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundLogIn');
    	
    	var button = this.add.image(960, 800, 'btn').setInteractive();

    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		let msg = new Object();
    		msg.event = 'LOG IN';
    		game.global.socket.send(JSON.stringify(msg));
    		
    		// Esperamos la respuesta del servidor para cambiar la escena
    	});
    }
    update(time, delta) {
    	
    }
}