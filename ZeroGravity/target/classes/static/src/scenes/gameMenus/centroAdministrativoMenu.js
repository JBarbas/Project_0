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
    	let msg = new Object();
		msg.event = 'GET JOBS';
		game.global.socket.send(JSON.stringify(msg));
    }
    create (data)  {
    	this.menuBox = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'centroDeMandoMenu').setOrigin(0, 0); 
    	
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
    	
    }

}