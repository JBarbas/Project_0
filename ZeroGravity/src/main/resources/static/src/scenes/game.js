class GameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "GameScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    }
    update(time, delta) {
    	
    		if(game.input.mousePointer.isDown){
	    		console.log(game.input.mousePointer.x);
	    		console.log(game.input.mousePointer.y);
	    		var centroMando = new CentroMando(game.input.mousePointer.x, game.input.mousePointer.y);
	    		console.log(centroMando.x)
	    		this.add.image(centroMando.x, centroMando.y, 'CentroMando');
    		}
    	
    }
}