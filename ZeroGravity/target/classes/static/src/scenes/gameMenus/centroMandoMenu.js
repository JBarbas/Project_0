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
    	this.centroOperaciones = this.add.image(game.global.buildingMenu.x + 120, game.global.buildingMenu.y + 200, 'centroOperaciones').setOrigin(0.5, 1).setScale(0.65, 0.65);
    	this.centroOperaciones.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroOperaciones'); });
    	this.centroAdministrativo = this.add.image(game.global.buildingMenu.x + 120, game.global.buildingMenu.y + 330, 'centroAdministrativo').setOrigin(0.5, 1).setScale(0.65, 0.65);
    	this.centroAdministrativo.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroAdministrativo'); });
    	this.taller = this.add.image(game.global.buildingMenu.x + 120, game.global.buildingMenu.y + 445, 'taller').setOrigin(0.5, 1);
    	this.taller.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('taller'); });
    	this.plataformaExtraccion = this.add.image(game.global.buildingMenu.x + 400, game.global.buildingMenu.y + 200, 'plataformaExtraccion').setOrigin(0.5, 1).setScale(0.65, 0.65);
    	this.plataformaExtraccion.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('plataformaExtraccion'); });
    	this.bloqueViviendas = this.add.image(game.global.buildingMenu.x + 400, game.global.buildingMenu.y + 330, 'bloqueViviendas').setOrigin(0.5, 1).setScale(0.65, 0.65);
    	this.bloqueViviendas.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('bloqueViviendas'); });
    	this.generador = this.add.image(game.global.buildingMenu.x + 400, game.global.buildingMenu.y + 445, 'generador').setOrigin(0.5, 1);
    	this.generador.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('generador'); });
    	this.centroComercio = this.add.image(game.global.buildingMenu.x + 120, game.global.buildingMenu.y + 570, 'centroComercio').setOrigin(0.5, 1);
    	this.centroComercio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroComercio'); });
    	this.laboratorioInvestigacion = this.add.image(game.global.buildingMenu.x + 400, game.global.buildingMenu.y + 570, 'laboratorioInvestigacion').setOrigin(0.5, 1)
    	this.laboratorioInvestigacion.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('laboratorioInvestigacion'); });
    
    	
    	function aux(edificioCons){
    		
    		if(!game.global.construyendo){
    			var edificio;
    			switch(edificioCons){
    			case 'centroOperaciones':
    				edificio = new CentroOperaciones(0, 0);
    				break;
    			case 'centroAdministrativo':
    				edificio = new CentroAdministrativo(0, 0);
    				break;
    			case 'taller':
    				edificio = new Taller(0, 0);
    				break;
    			case 'plataformaExtraccion':
    				edificio = new PlataformaExtraccion(0, 0);
    				break;
    			case 'bloqueViviendas':
    				edificio = new BloqueViviendas(0, 0);
    				break;
    			case 'generador':
    				edificio = new Generador(0, 0);
    				break;
    			case 'centroComercio':
    				edificio = new CentroComercio(0, 0);
    				break;
    			case 'laboratorioInvestigacion':
    				edificio = new LaboratorioInvestigacion(0, 0);
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
    		setTimeout(function(){ game.global.inMenu = false; }, 500);
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
				setTimeout(function(){ game.global.inMenu = false; }, 500);
    		}
    	});
    	
    	var cerrar = this.add.image(game.global.buildingMenu.x + 5, game.global.buildingMenu.y + 5, 'btnCerrar').setInteractive();
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