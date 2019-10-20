class GameInterface extends Phaser.Scene {

	constructor() {
        super({
            key: 'GameInterface',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Opening **GAME INTERFACE** scene");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	
    	this.panel = this.add.image(660,-200, 'panelCMando').setOrigin(0,0);
    	this.panel.setScale(.7);
    	this.panel.depth = -1;
    	this.panel.visible = false;
    	
    	/*this.panelViviendas = this.add.image(660,-200, 'panelBViviendas').setOrigin(0,0);
    	this.panelViviendas.setScale(.7);
    	this.panelViviendas.depth = -1;
    	this.panelViviendas.visible = false;
    	
    	this.panelAdmin = this.add.image(660,-200, 'panelCAdministrativo').setOrigin(0,0);
    	this.panelAdmin.setScale(.7);
    	this.panelAdmin.depth = -1;
    	this.panelAdmin.visible = false;
    	
    	this.panelComercio = this.add.image(660,-200, 'panelCComercio').setOrigin(0,0);
    	this.panelComercio.setScale(.7);
    	this.panelComercio.depth = -1;
    	this.panelComercio.visible = false;
    	
    	this.panelOperaciones = this.add.image(660,-200, 'panelCOperaciones').setOrigin(0,0);
    	this.panelOperaciones.setScale(.7);
    	this.panelOperaciones.depth = -1;
    	this.panelOperaciones.visible = false;
    	
    	this.panelGen = this.add.image(660,-200, 'panelGenerador').setOrigin(0,0);
    	this.panelGen.setScale(.7);
    	this.panelGen.depth = -1;
    	this.panelGen.visible = false;
    	
    	this.panelLab = this.add.image(660,-200, 'panelLInvestivacion').setOrigin(0,0);
    	this.panelLab.setScale(.7);
    	this.panelLab.depth = -1;
    	this.panelLab.visible = false;
    	
    	this.panelExt = this.add.image(660,-200, 'panelCExtraccion').setOrigin(0,0);
    	this.panelExt.setScale(.7);
    	this.panelExt.depth = -1;
    	this.panelExt.visible = false;
    	
    	this.panelTaller = this.add.image(660,-200, 'panelTaller').setOrigin(0,0);
    	this.panelTaller.setScale(.7);
    	this.panelTaller.depth = -1;
    	this.panelTaller.visible = false;*/
    	
    	this.intPrincipal = this.add.image(game.global.intPrincipal.x, game.global.intPrincipal.y, 'intPrincipal').setOrigin(0, 0); 
    	this.btnMision = this.add.image(game.global.btnMision.x, game.global.btnMision.y, 'intMision').setOrigin(0, 0); 
    	
    	var btnRanking = this.add.image(game.global.btnRanking.x, game.global.btnRanking.y, 'intRanking').setOrigin(0, 0); 
    	
    	var btnOpciones = this.add.image(game.global.btnOpciones.x, game.global.btnOpciones.y, 'btnOpciones').setInteractive();

    	this.energia = this.add.text(420, 22, game.global.resources.energia, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '18px'});
    	this.metal = this.add.text(588, 22, game.global.resources.metal, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.ceramica = this.add.text(755, 22, game.global.resources.ceramica, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.creditos = this.add.text(248, 22, game.global.resources.creditos, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.unionCoins = this.add.text(80, 22, game.global.resources.unionCoins, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	this.colonos = this.add.text(1298, 22, game.global.resources.colonos, { fontFamily: '"Roboto Condensed"', color: 'white', fontSize: '18px' });
    	
    	this.e1 = this.add.image(920, 15, 'starIcon').setOrigin(0, 0);
    	this.e2 = this.add.image(970, 15, 'starIcon').setOrigin(0, 0);
    	this.e3 = this.add.image(1020, 15, 'starIcon').setOrigin(0, 0);
    	this.e4 = this.add.image(1070, 15, 'starIcon').setOrigin(0, 0);
    	this.e5 = this.add.image(1120, 15, 'starIcon').setOrigin(0, 0);
    	

    	this.e1.setFrame(1);

    	
    
    	
    	var btnAnuncios = this.add.image(game.global.btnAnuncios.x, game.global.btnAnuncios.y, 'intAnuncios').setOrigin(0, 0); 
    	btnAnuncios.setInteractive();
    	btnRanking.setInteractive();
    	
    	
    	btnOpciones.on('pointerover',function(pointer){
    		btnOpciones.setFrame(1);
    	})

    	btnOpciones.on('pointerout',function(pointer){
    		btnOpciones.setFrame(0);
    	})
    	
    	btnRanking.on('pointerdown', function(pointer){
    		game.scene.getScene('GameInterface').panel.alpha = 0.0;
    		/*this.panelExt.visible = false;
			this.panel.visible = false;
			this.panelViviendas.visible = false;
			this.panelAdmin.visible = false;
			this.panelComercio.visible = false;
			this.panelOperaciones.visible = false;
			this.panelGen.visible = false;
			this.panelLab.visible = false;
			this.panelTaller.visible = false;*/	
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'RankingMenu';
			game.scene.run('RankingMenu');
			
					
    	});
    	
    	btnAnuncios.on('pointerdown', function(pointer){
    		game.scene.getScene('GameInterface').panel.alpha = 0.0;
    		
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'AnuncioMenu';
			game.scene.run('AnuncioMenu');
			
			
    	});
    	
    	
    	
    	btnOpciones.on('pointerdown', function(pointer){
    		game.scene.run('OptionsScene');
    		game.scene.stop('GameInterface');
    		game.scene.stop('GameScene');
    		game.scene.stop('CentroMandoMenu');
    		game.scene.stop('CentroOperacionesMenu');
    		game.scene.stop('BloqueViviendasMenu');
    		game.scene.stop('CentroAdministrativoMenu');
    		game.scene.stop('CentroComercioMenu');
    		game.scene.stop('GeneradorMenu');
    		game.scene.stop('LaboratorioInvestigacionMenu');
    		game.scene.stop('PlataformaExtraccionMenu');
    		game.scene.stop('RankingMenu');
    		game.scene.stop('AnuncioMenu');
    		game.scene.stop('TallerMenu');
    		
    	});
    	
    	//particulasRecurso();
    }
    update(time, delta) {
    	if(game.global.inMenu){
    		this.panel.visible = true;
    	}
    	else{
    		this.panel.visible = false;
    	}
    	
    	this.energia.text = game.global.resources.energia;
    	this.metal.text = game.global.resources.metal;
    	this.ceramica.text = game.global.resources.ceramica;
    	this.creditos.text = game.global.resources.creditos;
    	this.unionCoins.text = game.global.resources.unionCoins;
    	this.colonos.text = game.global.resources.colonos;
    	
    	this.puntuacion = game.global.puntuacion;
    	if(this.puntuacion >= 5000){
    		this.e5.setFrame(2);
    		this.e4.setFrame(2);
    		this.e3.setFrame(2);
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	//Intermedio
    	if(this.puntuacion >= 3800){
    		this.e5.setFrame(1);
    		this.e4.setFrame(2);
    		this.e3.setFrame(2);
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	if(this.puntuacion >= 2300){
    		this.e4.setFrame(2);
    		this.e3.setFrame(2);
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	//Intermedio
    	if(this.puntuacion >= 1600){
    		this.e5.setFrame(0);
    		this.e4.setFrame(1);
    		this.e3.setFrame(2);
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	if(this.puntuacion >= 1100){
    		this.e3.setFrame(2);
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	//Intermedio
    	if(this.puntuacion >= 800){
    		this.e5.setFrame(0);
    		this.e4.setFrame(0);
    		this.e3.setFrame(1);
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	
    	if(this.puntuacion >= 500){
    		this.e2.setFrame(2);
    		this.e1.setFrame(2);
    	}
    	//Intermedio
    	if(this.puntuacion >= 350){
    		this.e5.setFrame(0);
    		this.e4.setFrame(0);
    		this.e3.setFrame(0);
    		this.e2.setFrame(1);
    		this.e1.setFrame(2);
    	}
    	if(this.puntuacion >= 200){
    		this.e1.setFrame(2);
    	}
    }
}