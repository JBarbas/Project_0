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
    	
    	pedirOfertas();
    }
    
    preload () {
    	
    }
    
    create (data)  {
    	this.miEdificio = data.miEdificio;
    	
    	var intEdificios = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intEdificios').setOrigin(0, 0); 
    	var intMejoras = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intMejoras').setOrigin(0, 0); 
    	var intDetalles = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'intDetalles').setOrigin(0, 0);
    	this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
    		intEdificios.alpha = 1.0;
    		intMejoras.alpha = 0.0;
    		intDetalles.alpha = 0.0;
    	});
    	
    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
    		intEdificios.alpha = 0.0;
    		intMejoras.alpha = 1.0;
    		intDetalles.alpha = 0.0;
    	});
    	
    	this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
    		intEdificios.alpha = 0.0;
    		intMejoras.alpha = 0.0;
    		intDetalles.alpha = 1.0;
    	});
    	var mover = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 800, 'btnMover').setInteractive();
    	
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
    	
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	this.subirNivel = this.add.image(game.global.buildingMenu.x + 420, game.global.buildingMenu.y + 800, 'btnSubirNivel').setInteractive();
    	
    	if(data.miEdificio.level < 3){
    	 		    	
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
    	
    	/***********************************Botones ofrecer ofertas******************************************/
    	/*ofrecer oferta*/
    	var oferta25Metal = this.add.image(game.global.buildingMenu.x + 505, game.global.buildingMenu.y + 560, 'xBuilding').setInteractive();
    	cerrar.setOrigin(0, 0);
    	
    	oferta25Metal.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})
    	
    	oferta25Metal.on('pointerout',function(pointer){
    		this.setFrame(0);
    	})
    	
    	oferta25Metal.on('pointerdown', function(pointer, localX, localY, event){ 		
    		//cantidad, recurso, creditos a cambio
    		crearOferta(25, 'metal', 100);
    	});
    	
    	/*pedir Ofertas*/
    	var pedirOfertasbtn = this.add.image(game.global.buildingMenu.x + 65, game.global.buildingMenu.y + 560, 'xBuilding').setInteractive();
    	cerrar.setOrigin(0, 0);
    	
    	pedirOfertasbtn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})
    	
    	pedirOfertasbtn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	})
    	
    	pedirOfertasbtn.on('pointerdown', function(pointer, localX, localY, event){ 		
    		//cantidad, recurso, creditos a cambio
    		pedirOfertas();
    	});
    	
    	/*pedir Ofertas de mi jugador*/
    	var pedirOfertas2btn = this.add.image(game.global.buildingMenu.x + 65, game.global.buildingMenu.y + 760, 'xBuilding').setInteractive();
    	cerrar.setOrigin(0, 0);
    	
    	pedirOfertas2btn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})
    	
    	pedirOfertas2btn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	})
    	
    	pedirOfertas2btn.on('pointerdown', function(pointer, localX, localY, event){ 		
    		//cantidad, recurso, creditos a cambio
    		console.log(pedirOfertasJugador());
    	});
    	
    	/*borrar una oferta de mi jugador*/
    	/*en principio aquí recorro la lista de ofertas y con cada una 
    	 * creo un boton con el que puedo pasar el id de la oferta a la 
    	 * funcion de borrar*/
    	var borrarOfertasbtn = this.add.image(game.global.buildingMenu.x + 400, game.global.buildingMenu.y + 760, 'xBuilding').setInteractive();
    	cerrar.setOrigin(0, 0);
    	
    	borrarOfertasbtn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})
    	
    	borrarOfertasbtn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	})
    	
    	borrarOfertasbtn.on('pointerdown', function(pointer, localX, localY, event){ 		
    		let ofertasMiJugador = pedirOfertasJugador();
    		//cantidad, recurso, creditos a cambio
    		if(ofertasMiJugador[0] != null){
    			borrarOferta(ofertasMiJugador[0].idOferta);
    		}
    	});
    	
    	/*comprar una oferta*/
    	var comprar = this.add.image(game.global.buildingMenu.x + 250, game.global.buildingMenu.y + 560, 'xBuilding').setInteractive();
    	cerrar.setOrigin(0, 0);
    	
    	comprar.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})
    	
    	comprar.on('pointerout',function(pointer){
    		this.setFrame(0);
    	})
    	
    	comprar.on('pointerdown', function(pointer, localX, localY, event){ 		
    		
    		if(game.global.offers.length != 0){
    			comprarOferta(game.global.offers[0].idOferta);
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