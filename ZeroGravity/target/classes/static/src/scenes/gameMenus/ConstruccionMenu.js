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
    	game.global.inMenu = true;
    	
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelConstruccion = this.add.image(430, 300, 'panelConstruccion').setOrigin(0, 0);
    	this.panelConstruccion.setInteractive();
    	
    	var btnX = this.add.image(1580, 340, 'xBuilding').setInteractive();
    	var btnConstruir = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnConstruir').setInteractive();
    	var btnBuild = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnBuild').setInteractive();
    	
    	btnBuild.setFrame(2);
		btnConstruir.setFrame(2);
    	
    	var btnPDExtraccion = this.add.image(540, 420, 'btnPDExtraccion').setInteractive();
    	var btnBDViviendas = this.add.image(720, 420, 'btnBDViviendas').setInteractive();
    	var btnGenerador = this.add.image(900, 420, 'btnGenerador').setInteractive();
    	var btnTaller = this.add.image(540, 600, 'btnTaller').setInteractive();
    	var btnLaboratorio = this.add.image(720, 600, 'btnLaboratorio').setInteractive();
    	var btnCDComercio = this.add.image(900, 600, 'btnCDComercio').setInteractive();
    	var btnCDOperaciones = this.add.image(540, 780, 'btnCDOperaciones').setInteractive();
    	var btnCAdministrativo = this.add.image(720, 780, 'btnCAdministrativo').setInteractive();
    	
    	var selPDExtraccion = this.add.image(1205, 474, 'selPDExtraccion').setVisible(false);
    	var selBDViviendas = this.add.image(1205, 474, 'selBDViviendas').setVisible(false);
    	var selGenerador = this.add.image(1205, 474, 'selGenerador').setVisible(false);
    	var selTaller = this.add.image(1205, 474, 'selTaller').setVisible(false);
    	var selLaboratorio = this.add.image(1205, 474, 'selLaboratorio').setVisible(false);
    	var selCDComercio = this.add.image(1205, 474, 'selCDComercio').setVisible(false);
    	var selCDOperaciones = this.add.image(1205, 474, 'selCDOperaciones').setVisible(false);
    	var selCAdministrativo = this.add.image(1205, 474, 'selCAdministrativo').setVisible(false);
    	/*var boxConstr1 = this.add.image(720, 420, 'boxConstr').setInteractive();
    	var boxConstr2 = this.add.image(900, 420, 'boxConstr').setInteractive();
    	
    	var boxConstr3 = this.add.image(540, 600, 'boxConstr').setInteractive();
    	var boxConstr4 = this.add.image(720, 600, 'boxConstr').setInteractive();
    	var boxConstr5 = this.add.image(900, 600, 'boxConstr').setInteractive();*/
    	
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
    	
    	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	// EDIFICIOS
    	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	
    	this.edificioSeleccionado = "";
    	var scene = this;
    	
    	btnPDExtraccion.on('pointerover',function(pointer){
    		btnPDExtraccion.setFrame(1);
    	})
    	
    	btnPDExtraccion.on('pointerout',function(pointer){
    		btnPDExtraccion.setFrame(0);
    	})
    	
    	btnPDExtraccion.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "plataformaExtraccion";
    		selPDExtraccion.setVisible(true);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnBDViviendas.on('pointerover',function(pointer){
    		btnBDViviendas.setFrame(1);
    	})
    	
    	btnBDViviendas.on('pointerout',function(pointer){
    		btnBDViviendas.setFrame(0);
    	})
    	
    	btnBDViviendas.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "bloqueViviendas";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(true);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnGenerador.on('pointerover',function(pointer){
    		btnGenerador.setFrame(1);
    	})
    	
    	btnGenerador.on('pointerout',function(pointer){
    		btnGenerador.setFrame(0);
    	})
    	
    	btnGenerador.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "generador";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(true);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnTaller.on('pointerover',function(pointer){
    		btnTaller.setFrame(1);
    	})
    	
    	btnTaller.on('pointerout',function(pointer){
    		btnTaller.setFrame(0);
    	})
    	
    	btnTaller.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "taller";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(true);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnLaboratorio.on('pointerover',function(pointer){
    		btnLaboratorio.setFrame(1);
    	})
    	
    	btnLaboratorio.on('pointerout',function(pointer){
    		btnLaboratorio.setFrame(0);
    	})
    	
    	btnLaboratorio.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "laboratorioInvestigacion";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(true);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnCDComercio.on('pointerover',function(pointer){
    		btnCDComercio.setFrame(1);
    	})
    	
    	btnCDComercio.on('pointerout',function(pointer){
    		btnCDComercio.setFrame(0);
    	})
    	
    	btnCDComercio.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "centroComercio";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(true);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnCDOperaciones.on('pointerover',function(pointer){
    		btnCDOperaciones.setFrame(1);
    	})
    	
    	btnCDOperaciones.on('pointerout',function(pointer){
    		btnCDOperaciones.setFrame(0);
    	})
    	
    	btnCDOperaciones.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "centroOperaciones";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(true);
        	selCAdministrativo.setVisible(false);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	btnCAdministrativo.on('pointerover',function(pointer){
    		btnCAdministrativo.setFrame(1);
    	})
    	
    	btnCAdministrativo.on('pointerout',function(pointer){
    		btnCAdministrativo.setFrame(0);
    	})
    	
    	btnCAdministrativo.on('pointerdown',function(pointer){
    		scene.edificioSeleccionado = "centroAdministrativo";
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(true);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    	})
    	
    	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	// EDIFICIOS
    	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	
    	btnBuild.on('pointerover',function(pointer){
    		if (scene.edificioSeleccionado !== "") {
    			btnBuild.setFrame(1);
    		}
    	})
    	
    	btnBuild.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "") {
    			btnBuild.setFrame(0);
    		}
    	})
    	
    	btnConstruir.on('pointerover',function(pointer){
    		if (scene.edificioSeleccionado !== "") {
    			btnConstruir.setFrame(1);
    		}
    	})
    	
    	btnConstruir.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "") {
    			btnConstruir.setFrame(0);
    		}
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
    		if (scene.edificioSeleccionado !== "") {
        		game.global.effects.pulsarBoton.play();
        		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    			aux(scene.edificioSeleccionado);
        		game.scene.getScene('GameInterface').panel.alpha = 1.0;
        		game.scene.stop('ConstruccionMenu');
    		}
    	});
    	
    	btnBuild.on('pointerdown', function(pointer){
    		if (scene.edificioSeleccionado !== "") {
        		game.global.effects.pulsarBoton.play();
        		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    			aux(scene.edificioSeleccionado);
        		game.scene.getScene('GameInterface').panel.alpha = 1.0;
        		game.scene.stop('ConstruccionMenu');
    		}
    	});
    	
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('ConstruccionMenu');
    	});
    	
    	function aux(edificioCons){
    		game.global.inMenu = true;
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
			game.scene.stop('ConstruccionMenu');
			setTimeout(function(){ game.global.inMenu = false; }, 1000);
		}
    }
    update(time, delta) {
    	
    }

}