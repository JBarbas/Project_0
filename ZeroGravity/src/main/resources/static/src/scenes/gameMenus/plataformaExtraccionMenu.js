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
    	this.menuBox = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'centroDeMandoMenu').setOrigin(0, 0); 
    	
    	this.miEdificio = data.miEdificio;
    	
    	this.colonos = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
    	
    	this.timeLeft = 'Quedan ' + Math.floor(this.miEdificio.recursos[this.miEdificio.level-1][1] - (Date.now() - this.miEdificio.inicioProduccion)/60000) + ' minutos';
    	this.timeLeftText = this.add.text(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 230, this.timeLeft, { fontFamily: '"Roboto Condensed"', color: 'white' });
    	
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
				game.scene.stop('PlataformaExtraccionMenu');
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
    	this.timeLeftText.visible = !this.miEdificio.lleno;
    	
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    } 
}