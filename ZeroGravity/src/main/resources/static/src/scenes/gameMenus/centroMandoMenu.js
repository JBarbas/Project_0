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
    	this.edificio = this.add.image(game.global.buildingMenu.x + 50, game.global.buildingMenu.y + 100, 'edificio').setOrigin(0, 0);
    	this.edificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		
    		if(!game.global.construyendo){
    			var edificio = new CentroOperaciones(0, 0);
    			toggle(edificio, game.scene.getScene('GameScene'));
    			game.global.construyendo = true;
    			game.global.edificioEnConstruccion = edificio;
    			game.scene.pause();
    		}
    		game.scene.stop('CentroMandoMenu');
    		game.global.inMenu = false;
    	});
    	
    	var button = this.add.image(game.global.buildingMenu.x + 200, game.global.buildingMenu.y + 800, 'btnMover').setInteractive();
    	
    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	button.on('pointerdown', function(pointer, localX, localY, event){
    		if(!game.global.construyendo){
				toggle(data.edificio, game.scene.getScene('GameScene'));
				game.global.grid[data.edificio.y][data.edificio.x] = 0;
				game.global.grid[data.edificio.y-1][data.edificio.x] = 0;
				game.global.grid[data.edificio.y-1][data.edificio.x-1] = 0;
				game.global.grid[data.edificio.y][data.edificio.x-1] = 0;
				game.global.construyendo = true;
				game.global.edificioEnConstruccion = data.edificio;
				game.scene.pause();
    		}
			game.scene.stop('CentroMandoMenu');
    		game.global.inMenu = false;
    	});
    	
    }
    update(time, delta) {
    	
    }

}