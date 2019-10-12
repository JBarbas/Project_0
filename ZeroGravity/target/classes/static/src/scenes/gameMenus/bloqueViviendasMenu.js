class BloqueViviendasMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "BloqueViviendasMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BLOQUE DE VIVIENDAS** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.menuBox = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'centroDeMandoMenu').setOrigin(0, 0); 
    	
    	var mover = this.add.image(game.global.buildingMenu.x + 200, game.global.buildingMenu.y + 800, 'btnMover').setInteractive();
    	
    	mover.on('pointerover',function(pointer){
    	    mover.setFrame(1);
    	})

    	mover.on('pointerout',function(pointer){
    	    mover.setFrame(0);
    	})
    	
    	mover.on('pointerdown', function(pointer, localX, localY, event){
    		if(!game.global.construyendo){
				game.scene.pause();
				data.miEdificio.move();
				game.scene.stop('BloqueViviendasMenu');
				setTimeout(function(){ game.global.inMenu = false; }, 500);
    		}
    	});
    	
    }
    update(time, delta) {
    	
    }

}