class CentroAdministrativoMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroAdministrativoMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO DE OPERACIONES** menu");
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
				game.scene.stop('CentroAdministrativoMenu');
	    		game.global.inMenu = false;
    		}
    	});
    	
    	var expandir = this.add.image(game.global.buildingMenu.x + 200, game.global.buildingMenu.y + 700, 'btnExpandir').setInteractive();
    	
    	expandir.on('pointerover',function(pointer){
    		expandir.setFrame(1);
    	})

    	expandir.on('pointerout',function(pointer){
    		expandir.setFrame(0);
    	})
    	
    	expandir.on('pointerdown', function(pointer, localX, localY, event){
    		if(!game.global.expandiendo){
    			game.global.expandiendo = true;
    			game.scene.stop('CentroAdministrativoMenu');
    			setTimeout(function(){ game.global.inMenu = false; }, 500);
    		}
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