class ConstruccionMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "ConstruccionMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CONSTRUCCION** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelConstruccion = this.add.image(430, 300, 'panelConstruccion').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1580, 340, 'xBuilding').setInteractive();
    	var btnConstruir = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnConstruir').setInteractive();
    	var btnBuild = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnBuild').setInteractive();
    	
    	var boxConstr = this.add.image(540, 420, 'boxConstr').setInteractive();
    	var boxConstr1 = this.add.image(720, 420, 'boxConstr').setInteractive();
    	var boxConstr2 = this.add.image(900, 420, 'boxConstr').setInteractive();
    	
    	var boxConstr3 = this.add.image(540, 600, 'boxConstr').setInteractive();
    	var boxConstr4 = this.add.image(720, 600, 'boxConstr').setInteractive();
    	var boxConstr5 = this.add.image(900, 600, 'boxConstr').setInteractive();
    	
    	var btnEdit = this.add.image(500, 275, 'btnEdit').setInteractive(); //1650, 870 Lateral inferior derecho      // 1500, 275   Superior derecho
    	
    	var cort = this.cortina;
    	var panelA = this.panelConstruccion;    	
    	
    	cort.alpha = 0.4;
    	btnX.scale = 0.7;
    	
    	panelA.scale = 1;
    	btnConstruir.scale = 0.5;
    	btnBuild.scale = 0.5;
    	
    	if(game.global.idioma == "eng"){
    		btnConstruir.setVisible(false);
    		btnBuild.setVisible(true);
    	}else{
    		btnConstruir.setVisible(true);
    		btnBuild.setVisible(false);
    	}
    	
    	boxConstr.on('pointerover',function(pointer){
    		boxConstr.setFrame(1);
    	})
    	
    	boxConstr.on('pointerout',function(pointer){
    		boxConstr.setFrame(0);
    	})
    	
    	btnBuild.on('pointerover',function(pointer){
    		btnBuild.setFrame(1);
    	})
    	
    	btnBuild.on('pointerout',function(pointer){
    		btnBuild.setFrame(0);
    	})
    	
    	btnConstruir.on('pointerover',function(pointer){
    		btnConstruir.setFrame(1);
    	})
    	
    	btnConstruir.on('pointerout',function(pointer){
    		btnConstruir.setFrame(0);
    	})
    	
    	btnX.on('pointerover',function(pointer){
    		btnX.setFrame(1);
    	})
    	
    	btnX.on('pointerout',function(pointer){
    		btnX.setFrame(0);
    	})
    	
    	btnEdit.on('pointerover',function(pointer){
    		btnEdit.setFrame(1);
    	})
    	
    	btnEdit.on('pointerout',function(pointer){
    		btnEdit.setFrame(0);
    	})
    	
    	btnEdit.on('pointerdown', function(pointer){
    		//Aqui falta poner el menu de edicion para mover edificios
    		
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('ConstruccionMenu');
    	});
    	
    	btnConstruir.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		aux('taller');
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('ConstruccionMenu');
    	});
    	
    	btnBuild.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		aux('taller');
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('ConstruccionMenu');
    	});
    	
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('ConstruccionMenu');
    	});
    	
    	function aux(edificioCons){if(!game.global.construyendo){
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
    	
    }
    update(time, delta) {
    	
    }

}