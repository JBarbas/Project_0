class CentroComercioMenu extends Phaser.Scene {

	constructor() {
        super({
            key: 'CentroComercioMenu',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO_COMERCIO** menu");
		} 	
    }
    
    preload () {
    	
    }
    
    create (data)  {
    	this.intEdificios = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intEdificios').setOrigin(0, 0); 
    	this.intMejoras = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intMejoras').setOrigin(0, 0); 
    	this.intDetalles = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intDetalles').setOrigin(0, 0); 
    	
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
				game.scene.stop('CentroComercioMenu');
				setTimeout(function(){ game.global.inMenu = false; }, 500);
    		}
    	});
    	
    	var cerrar = this.add.image(game.global.buildingMenu.x + 505, game.global.buildingMenu.y + 60, 'xBuilding').setInteractive();
    	   cerrar.setOrigin(0, 0);
    	
    	cerrar.on('pointerover',function(pointer){
    	    this.setFrame(1);
    	})

    	cerrar.on('pointerout',function(pointer){
    	    this.setFrame(0);
    	})
    	
    	cerrar.on('pointerdown', function(pointer, localX, localY, event){
			game.scene.stop(data.miEdificio.menuScene);
			game.global.inMenu = false;
    	});
    	
    	this.miEdificio = data.miEdificio;
    	
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(data.miEdificio.level < 3){
    	
	    	this.subirNivel = this.add.image(game.global.buildingMenu.x + 500, game.global.buildingMenu.y + 800, 'btnSubirNivel').setInteractive();
	    	
	    		    	
	    	this.subirNivel.on('pointerover',function(pointer){
	    		this.setFrame(1);
	    	})
	    	
	    	this.subirNivel.on('pointerout',function(pointer){
	    		this.setFrame(0);
	    	})
	    	
	    	this.subirNivel.on('pointerdown', function(pointer, localX, localY, event){
	    		
	    		askLevelUpBuilding(data.miEdificio.id);
	    		
	    	});
	    	
    	}
    }
    update(time, delta) {
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    }

}