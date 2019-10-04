class CentroMandoMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroMandoMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO DE MANDO** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.menuBox = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'centroDeMandoMenu').setOrigin(0, 0); 
    	this.edificio = this.add.image(game.global.buildingMenu.x + 120, game.global.buildingMenu.y + 200, 'centroOperaciones').setOrigin(0.5, 1).setScale(0.65, 0.65);
    	this.edificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroOperaciones'); });
    	this.edificio2 = this.add.image(game.global.buildingMenu.x + 120, game.global.buildingMenu.y + 330, 'centroDeMando').setOrigin(0.5, 1).setScale(0.65, 0.65);
    	this.edificio2.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroDeMando'); });
    	
    	function aux(edificioCons){
    		
    		if(!game.global.construyendo){
    			var edificio;
    			switch(edificioCons){
    			
    			case 'centroDeMando':
    				edificio = new CentroMando(0, 0);
    				break;
    			case 'centroOperaciones':
    				edificio = new CentroOperaciones(0, 0);
    				break;
    			default:
    				break;
    			}
    			
    			edificio.previsualizar(game.scene.getScene('GameScene'));
    			game.global.construyendo = true;
    			game.global.edificioEnConstruccion = edificio;
    			game.scene.getScene('GameScene').gridContainer.setAlpha(0.5);
    			game.scene.pause();
    		}
    		game.scene.stop('CentroMandoMenu');
    		game.global.inMenu = false;
    	}
    	
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
				game.scene.stop('CentroMandoMenu');
	    		game.global.inMenu = false;
    		}
    	});
    	
    }
    update(time, delta) {
    	
    }

}