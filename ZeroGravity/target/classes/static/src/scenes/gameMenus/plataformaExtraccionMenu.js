class PlataformaExtraccionMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "PlataformaExtraccionMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Plataforma de Extraccion** menu");
		}
    	let msg = new Object();
		msg.event = 'GET PLATAFORMA EXTRACCION MENU';
		msg.id = data.miEdificio.id;
		game.global.socket.send(JSON.stringify(msg));
    }
    
    preload () {
    	
    }
    create (data)  {
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
    	this.miEdificio = data.miEdificio;
    	
    	this.colonos = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
    	
    	this.timeLeft = 'Quedan ' + Math.floor(this.miEdificio.recursos[this.miEdificio.level-1][1] - (Date.now() - this.miEdificio.inicioProduccion)/60000) + ' minutos';
    	this.timeLeftText = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 230, this.timeLeft, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	
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
				game.scene.stop('PlataformaExtraccionMenu');
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
    	if(data.miEdificio.level < 3){
    	
    		this.subirNivel = this.add.image(game.global.buildingMenu.x + 420, game.global.buildingMenu.y + 800, 'btnSubirNivel').setInteractive();
	    	
	    		    	
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
    	if (this.miEdificio.produciendo) {
	    	this.timeLeft = Math.floor(this.miEdificio.recursos[this.miEdificio.level-1][1] - (Date.now() - this.miEdificio.inicioProduccion)/60000);
	    	if (this.miEdificio.lleno) {
	    		this.timeLeftText.text = this.miEdificio.recursos[this.miEdificio.level-1][0] + ' unidades de cerámica listas para recolectar';
	    	}
	    	else if (this.timeLeft < 1) {
	    		this.timeLeftText.text = 'Almacenando la cerámica...';
	    	}
	    	else {
	    		this.timeLeftText.text = 'Quedan ' + this.timeLeft + ' minutos';
	    	}
	    	this.timeLeftText.visible = !this.miEdificio.lleno;
    	}
    	else {
    		this.timeLeftText.visible = false;
    	}
    	
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    } 
}