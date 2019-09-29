class CentroMandoMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroMandoMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO DE MANDO** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.menuBox = this.add.image(50, 50, 'centroDeMandoMenu').setOrigin(0, 0); 
    	this.edificio = this.add.image(100, 150, 'edificio').setOrigin(0, 0);
    	this.edificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		
    		if(!game.global.construyendo){
    			toggle('centroMando');
    			game.global.construyendo = true;
    			game.scene.pause();
    		}
    		game.scene.stop('CentroMandoMenu');
    	});
    }
    update(time, delta) {
    	
    }

}