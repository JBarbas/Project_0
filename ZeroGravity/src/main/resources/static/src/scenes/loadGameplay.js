class LoadGameplayScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "LoadGameplayScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOAD GAMEPLAY** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    	
    	var bckCargando = this.add.image(960, 540, 'bckCargando');
    	
    	var cargando = this.add.image(game.config.width/2+20, game.config.height/2, 'load');
    	
    }
    update(time, delta) {
    	//this.global.cargando.angle += 1;
    }
}