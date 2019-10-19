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
    	let msg = new Object();
		msg.event = 'GET TALLER MENU';
		msg.id = data.miEdificio.id;
		game.global.socket.send(JSON.stringify(msg));
		if (data.miEdificio.recolectIcon !== null) {
			data.miEdificio.recolectIcon.destroy();
		}
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
    	
    	this.colonos = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 170, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
    	this.energia = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
    	
    	this.robotsX = game.global.buildingMenu.x + 40;
    	this.robotsY = [game.global.buildingMenu.y + 240,
    					game.global.buildingMenu.y + 390,
    					game.global.buildingMenu.y + 560];
    	
    	this.times = [];
    	
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
				game.scene.stop('TallerMenu');
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
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    	
    	for (var i = 0; i < this.times.length; i++) {
    		if (typeof this.times[i] !== 'undefined') {
	    		this.times[i].timeLeft = Math.floor(this.times[i].robot.recursos[this.times[i].robot.nivel-1][1] - (Date.now() - this.times[i].robot.inicioProduccion)/60000);
	    		if (this.times[i].timeLeft < 1) {
	        		this.times[i].timeLeftText.text = 'Almacenando el metal...';
	        	}
	        	else {
	        		this.times[i].timeLeftText.text = 'Quedan ' + this.times[i].timeLeft + ' minutos';
	        	}
    		}
    	}
    }

}