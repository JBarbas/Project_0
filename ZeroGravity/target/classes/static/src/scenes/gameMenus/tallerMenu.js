class TallerMenu extends Phaser.Scene {

	constructor() {
        super({
            key: 'TallerMenu',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **TALLER** menu");
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
				game.scene.stop('TallerMenu');
	    		game.global.inMenu = false;
    		}
    	});
    	
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(data.miEdificio.level < 3){
    	
	    	var subirNivel = this.add.image(game.global.buildingMenu.x + 500, game.global.buildingMenu.y + 800, 'btnMover').setInteractive();
	    	
	    	subirNivel.on('pointerover',function(pointer){
	    		mover.setFrame(1);
	    	})
	    	
	    	subirNivel.on('pointerout',function(pointer){
	    		mover.setFrame(0);
	    	})
	    	
	    	subirNivel.on('pointerdown', function(pointer, localX, localY, event){
	    		
	    		askLevelUpBuilding(data.miEdificio.id);
	    		
	    	});
	    	
    	}
    }
    update(time, delta) {
    	
    }

}