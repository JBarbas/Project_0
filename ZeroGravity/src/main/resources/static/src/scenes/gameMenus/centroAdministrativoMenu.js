class CentroAdministrativoMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroAdministrativoMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO ADMINISTRATIVO** menu");
		}
    }
    
    preload () {
    	let msg = new Object();
		msg.event = 'GET JOBS';
		game.global.socket.send(JSON.stringify(msg));
    }
    create (data)  {
    	this.intEdificios = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intEdificios').setOrigin(0, 0); 
    	this.intMejoras = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intMejoras').setOrigin(0, 0); 
    	this.intDetalles = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intDetalles').setOrigin(0, 0); 
    	
    	this.puestosTrabajo = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
    	let viviendas = game.global.resources.colonos.split("/")[1] - game.global.resources.colonos.split("/")[0];
    	this.viviendas = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 230, "Viviendas disponibles: " + viviendas, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	
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
    	
    	this.colonos = this.add.image(game.global.buildingMenu.x + 200, game.global.buildingMenu.y + 600, 'btnColonos').setInteractive();
    	this.colonos.alpha = 0.5;
    	this.colonos.canRequest = false;
    	
    	this.colonos.on('pointerover',function(pointer){
    		if (this.canRequest) {
    			this.setFrame(1);
    		}
    	})

    	this.colonos.on('pointerout',function(pointer){
    		this.setFrame(0);
    	})
    	
    	this.colonos.on('pointerdown', function(pointer, localX, localY, event){
    		if (this.canRequest) {
	    		let msg = new Object();
	    		msg.event = 'PEDIR COLONOS';
	    		game.global.socket.send(JSON.stringify(msg));
    		}
    	});
    }
    update(time, delta) {
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    }
}