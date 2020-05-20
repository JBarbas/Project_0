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
    	
    	var intPrincipal = this.add.image(game.global.intPrincipal.x, game.global.intPrincipal.y, 'intPrincipal').setOrigin(0, 0); 
    	var btnMision = this.add.image(game.global.btnMision.x, game.global.btnMision.y, 'intMision').setOrigin(0, 0); 
    	
    	var btnRanking = this.add.image(game.global.btnRanking.x, game.global.btnRanking.y, 'intRanking').setOrigin(0, 0); 
    	
    	var btnOpciones = this.add.image(game.global.btnOpciones.x, game.global.btnOpciones.y, 'btnOpciones').setInteractive();
    	
    	var cityBox = this.add.image(game.global.btnOpciones.x-150, game.global.btnOpciones.y+970, 'boxCityName').setInteractive();
    	var cityEdit = this.add.image(game.global.btnOpciones.x+20, game.global.btnOpciones.y+965, 'boxCityEdit').setInteractive();
    	cityEdit.visible = false;
    	
    	//NOMBRE CIUDAD
    	/*if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('operationsCenter');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelCOperaciones');
    	}*/


    	this.unionCoins = this.add.text(480, 22, game.global.resources.unionCoins, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	this.creditos = this.add.text(700, 22, game.global.resources.creditos, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	this.energia = this.add.text(900, 22, game.global.resources.energia, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '18px'});
    	this.metal = this.add.text(1100, 22, game.global.resources.metal, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	this.ceramica = this.add.text(1320, 22, game.global.resources.ceramica, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	this.colonos = this.add.text(1500, 22, game.global.resources.colonos, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	
    	var unionCoinsicon = this.add.image(355, 10, 'iconoUC').setOrigin(0, 0).setInteractive(); 
    	var creditosicon = this.add.image(595, 10, 'iconoMoney').setOrigin(0, 0).setInteractive(); 
    	var energiaicon = this.add.image(810, 10, 'iconoEnergy').setOrigin(0, 0).setInteractive(); 
    	var metalicon = this.add.image(1035, 10, 'iconoMetal').setOrigin(0, 0).setInteractive(); 
    	var ceramicaicon = this.add.image(1245, 10, 'iconoArcilla').setOrigin(0, 0).setInteractive(); 
    	var colonosicon = this.add.image(1460, 7, 'iconoColonos').setOrigin(0, 0).setInteractive(); 
    	
    	
    	///////////////////////////////////////////////////////////////////////CAJAS HOVER DE LOS ICONOS DE ARRIBA///////////////////////////////////////////////////
    	
    	var ucContainer = this.add.container(380,65);
    	var moneyContainer = this.add.container(600,65);
    	var energyContainer = this.add.container(820,65);
    	var metalContainer = this.add.container(1040,65);
    	var arcillaContainer = this.add.container(1260,65);
    	var colonosContainer = this.add.container(1480,65);
    	
    	var textoDesdeXml;
    	
    	ucContainer.visible = false;
    	moneyContainer.visible = false;
    	energyContainer.visible = false;
    	metalContainer.visible = false;
    	arcillaContainer.visible = false;
    	colonosContainer.visible = false;
    	
    	this.hoverMatsUC = this.add.image(0,0, 'hoverMats').setOrigin(0,0);
    	
    	this.unionCoinstxtUC = this.add.text(80,10, "Union Coins", { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	 
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('unioncoin')[0].childNodes[0].nodeValue;
    	if(game.global.idioma == 'esp'){
    		this.unionCoinstxtdesc1UC = this.add.text(25,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}else{
    		this.unionCoinstxtdesc1UC = this.add.text(60,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('unioncoin2')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtdesc2UC = this.add.text(90,45, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	
    	
    	ucContainer.add(this.hoverMatsUC);
    	ucContainer.add(this.unionCoinstxtUC);
    	ucContainer.add(this.unionCoinstxtdesc1UC);
    	ucContainer.add(this.unionCoinstxtdesc2UC);
    	
    	this.hoverMatsMoney = this.add.image(0,0, 'hoverMats').setOrigin(0,0);
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('dinero')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtMoney = this.add.text(110,10, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('dinero1')[0].childNodes[0].nodeValue;
    	if(game.global.idioma == 'esp'){
    		this.unionCoinstxtdesc1Money = this.add.text(25,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}else{
    		this.unionCoinstxtdesc1Money = this.add.text(70,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}
    	
    	
    	moneyContainer.add(this.hoverMatsMoney);
    	moneyContainer.add(this.unionCoinstxtMoney);
    	moneyContainer.add(this.unionCoinstxtdesc1Money);
    	
    	this.hoverMatsenergy = this.add.image(0,0, 'hoverMats').setOrigin(0,0);
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('energiaT')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtenergy = this.add.text(100,10, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('energia1')[0].childNodes[0].nodeValue;
    	if(game.global.idioma == 'esp'){
    		this.unionCoinstxtdesc1energy = this.add.text(25,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}else{
    		this.unionCoinstxtdesc1energy = this.add.text(65,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}
    	
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('energia2')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtdesc2energy = this.add.text(90,45, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	
    	energyContainer.add(this.hoverMatsenergy);
    	energyContainer.add(this.unionCoinstxtenergy);
    	energyContainer.add(this.unionCoinstxtdesc1energy);
    	energyContainer.add(this.unionCoinstxtdesc2energy);
    	
    	this.hoverMatsmet = this.add.image(0,0, 'hoverMats').setOrigin(0,0);
    	this.unionCoinstxtmet = this.add.text(110,10, "Metal", { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('metal')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtdesc1met = this.add.text(35,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	
    	metalContainer.add(this.hoverMatsmet);
    	metalContainer.add(this.unionCoinstxtmet);
    	metalContainer.add(this.unionCoinstxtdesc1met);
    	//metalContainer.add(this.unionCoinstxtdesc2met);
    	
    	this.hoverMatsarc = this.add.image(0,0, 'hoverMats').setOrigin(0,0);
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ceramica')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtarc = this.add.text(90,10, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ceramica1')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtdesc1arc = this.add.text(20,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ceramica2')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtdesc2arc = this.add.text(100,45, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	
    	arcillaContainer.add(this.hoverMatsarc);
    	arcillaContainer.add(this.unionCoinstxtarc);
    	arcillaContainer.add(this.unionCoinstxtdesc1arc);
    	arcillaContainer.add(this.unionCoinstxtdesc2arc);
    	
    	this.hoverMatsColonos = this.add.image(0,0, 'hoverMats').setOrigin(0,0);
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('colono')[0].childNodes[0].nodeValue;
    	if(game.global.idioma == 'esp'){
    		this.unionCoinstxtColonos = this.add.text(40,10, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	}else{
    		this.unionCoinstxtColonos = this.add.text(40,10, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '18px' });
    	}
    	
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('colono1')[0].childNodes[0].nodeValue;
    	if(game.global.idioma == 'esp'){
    		this.unionCoinstxtdesc1Colonos = this.add.text(45,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}else{
    		this.unionCoinstxtdesc1Colonos = this.add.text(70,30, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	}
    	
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('colono2')[0].childNodes[0].nodeValue;
    	this.unionCoinstxtdesc2Colonos = this.add.text(55,45, textoDesdeXml, { fontFamily: '"pantonLight"', color: 'white', fontSize: '14px' });
    	
    	colonosContainer.add(this.hoverMatsColonos);
    	colonosContainer.add(this.unionCoinstxtColonos);
    	colonosContainer.add(this.unionCoinstxtdesc1Colonos);
    	colonosContainer.add(this.unionCoinstxtdesc2Colonos);
    	
    	this.cityname = this.add.text(1550,1000, game.global.myPlayer.cityName, { fontFamily: '"pantonBlack"', color: 'white', fontSize: '30px' });
    	if (game.global.myPlayer.isVisitor) {
    		this.cityname.text = game.global.myPlayer.visitorCityName;
    		
    	}
    	
    	//NOMBRE CIUDAD
    	cityBox.on('pointerover',function(pointer){
    		if(game.global.myPlayer.isVisitor){
        		cityEdit.visible = false;
        	}else{
        		cityEdit.visible = true;
        	}
    	})

    	cityBox.on('pointerout',function(pointer){
    		cityEdit.visible = false;
    	})
    	
    	cityEdit.on('pointerover',function(pointer){
    		if(game.global.myPlayer.isVisitor){
        		cityEdit.visible = false;
        	}else{
        		cityEdit.visible = true;
        	}
    	})

    	cityEdit.on('pointerout',function(pointer){
    		cityEdit.visible = false;
    	})
    	
    	cityEdit.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		//Sweet Alert para editar nombre Ciudad  --------------------- HAY QUE CONFIGURARLO BIEN ------------------------------------------
			Swal.fire({
				  title: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('cambiarCity')[0].childNodes[0].nodeValue,
				  input: 'text',
				  inputAttributes: {
				    autocapitalize: 'off'
				  },
				  showCancelButton: true,
				  confirmButtonText: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('btnSwConfirmar')[0].childNodes[0].nodeValue,
				  showLoaderOnConfirm: true
				}).then((result) => {
				  if (result.value.length <= 15) {
					  let msg = new Object();
					  msg.event = 'CHANGE CITY NAME';
					  msg.name = result.value;
					  game.global.socket.send(JSON.stringify(msg));
					  Swal.fire({
						  icon: 'success',
						  title: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('bien')[0].childNodes[0].nodeValue,
						  text: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('nombreCamb')[0].childNodes[0].nodeValue
						});
				  }
				})
    	});
    	
    	
    	//Caja UnionCoin
    	unionCoinsicon.on('pointerover',function(pointer){
    		ucContainer.visible = true;
    	})

    	unionCoinsicon.on('pointerout',function(pointer){
    		ucContainer.visible = false;
    	})
    	
    	//Caja money
    	creditosicon.on('pointerover',function(pointer){
    		moneyContainer.visible = true;
    	})

    	creditosicon.on('pointerout',function(pointer){
    		moneyContainer.visible = false;
    	})
    	
    	//Caja energia
    	energiaicon.on('pointerover',function(pointer){
    		energyContainer.visible = true;
    	})

    	energiaicon.on('pointerout',function(pointer){
    		energyContainer.visible = false;
    	})
    	
    	//CAJA METAL
    	metalicon.on('pointerover',function(pointer){
    		metalContainer.visible = true;
    	})

    	metalicon.on('pointerout',function(pointer){
    		metalContainer.visible = false;
    	})
    	
    	//CAJA ARCILLA
    	ceramicaicon.on('pointerover',function(pointer){
    		arcillaContainer.visible = true;
    	})

    	ceramicaicon.on('pointerout',function(pointer){
    		arcillaContainer.visible = false;
    	})
    	
    	//CAJA COLONO
    	colonosicon.on('pointerover',function(pointer){
    		colonosContainer.visible = true;
    	})

    	colonosicon.on('pointerout',function(pointer){
    		colonosContainer.visible = false;
    	})
    	
    	
    	/*this.e1 = this.add.image(1150, 15, 'starIcon').setOrigin(0, 0);
    	this.e2 = this.add.image(1200, 15, 'starIcon').setOrigin(0, 0);
    	this.e3 = this.add.image(1250, 15, 'starIcon').setOrigin(0, 0);
    	this.e4 = this.add.image(1300, 15, 'starIcon').setOrigin(0, 0);
    	this.e5 = this.add.image(1350, 15, 'starIcon').setOrigin(0, 0);*/
    	
    	
    	//this.nombre = this.add.text(865, 18, "AGATUPITI STATION", { fontFamily: '"Roboto"', color: 'white', fontSize: '26px' });
    	

    	//this.e1.setFrame(1);

    	var btnAnuncios = this.add.image(game.global.btnAnuncios.x, game.global.btnAnuncios.y, 'intAnuncios').setOrigin(0, 0); 
    	btnAnuncios.setInteractive();
    	btnRanking.setInteractive();
    	btnMision.setInteractive();
    	
    	btnOpciones.on('pointerover',function(pointer){
    		btnOpciones.setFrame(1);
    	})

    	btnOpciones.on('pointerout',function(pointer){
    		btnOpciones.setFrame(0);
    	})
    	
    	btnMision.on('pointerover',function(pointer){
    		btnMision.setFrame(1);
    	})

    	btnMision.on('pointerout',function(pointer){
    		btnMision.setFrame(0);
    	})
    	
    	btnAnuncios.on('pointerover',function(pointer){
    		btnAnuncios.setFrame(1);
    	})

    	btnAnuncios.on('pointerout',function(pointer){
    		btnAnuncios.setFrame(0);
    	})
    	
    	btnRanking.on('pointerover',function(pointer){
    		btnRanking.setFrame(1);
    	})

    	btnRanking.on('pointerout',function(pointer){
    		btnRanking.setFrame(0);
    	})
    	
    	btnRanking.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 0.0;
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'RankingMenu';
			game.scene.run('RankingMenu');		
    	});
    	
    	btnAnuncios.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 0.0;
    		
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'AnuncioMenu';
			game.scene.run('AnuncioMenu');
			
			
    	});
    	

    	btnMision.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 0.0;
    		
    		//start scene
    		game.global.inMenu = true;
			if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
			game.global.menu = 'ConstruccionMenu';
			game.scene.run('ConstruccionMenu');
			
			
    	});
    	
    	
    	
    	btnOpciones.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
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
    		if (game.global.menu !== null) {
				game.scene.stop(game.global.menu);
			}
    		
    	});
    	
    	//particulasRecurso();
    	
    	// Cuando construyes y/o mueves edificios:
    	this.btnCancel = this.add.image(1150, 900, 'cancelBtn').setOrigin(0.5, 0.5); 
    	this.btnCancel.setInteractive();
    	this.btnCancel.setVisible(false);
    	
    	this.btnAcept = this.add.image(900, 900, 'btnAcept').setOrigin(0.5, 0.5); 
    	this.btnAcept.setInteractive();
    	this.btnAcept.setVisible(false);
    	
    	this.btnAceptar = this.add.image(900, 900, 'btnAceptar').setOrigin(0.5, 0.5); 
    	this.btnAceptar.setInteractive();
    	this.btnAceptar.setVisible(false);
    	
    	this.btnCancel.on('pointerover',function(pointer){
    		this.setFrame(1);
    		game.global.canBuild = false;
    	})

    	this.btnCancel.on('pointerout',function(pointer){
    		this.setFrame(0);
    		game.global.canBuild = true;
    	})
    	
    	this.btnAceptar.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})

    	this.btnAceptar.on('pointerout',function(pointer){
    		this.setFrame(0);
    		
    	})
    	
    	this.btnAcept.on('pointerover',function(pointer){
    		this.setFrame(1);
    	})

    	this.btnAcept.on('pointerout',function(pointer){
    		this.setFrame(0);
    		
    	})
    	
    	this.btnCancel.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		if (game.global.editMode) {
    			game.global.editMode = false;
    			game.scene.getScene('GameScene').gridContainer.setAlpha(0);
    			if (game.global.edificioEnConstruccion !== null) {
    				cancelConstruir(game.scene.getScene('GameScene'), game.global.edificioEnConstruccion);
    			}
    		}
    		else {
    			cancelConstruir(game.scene.getScene('GameScene'), game.global.edificioEnConstruccion);
    		}
    	});
    	
    	this.btnAcept.on('pointerdown', function(pointer){
    		if (game.global.editMode) {
    			editarCiudad();
    			game.global.editMode = false;
    		}
    		else if (game.global.edificioEnConstruccion.bienSituado) {    		
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
	    		construir(game.global.edificioEnConstruccion.i, game.global.edificioEnConstruccion.j, game.scene.getScene('GameScene'), game.global.edificioEnConstruccion);
    		}    		
    	});
    	
    	this.btnAceptar.on('pointerdown', function(pointer){
    		if (game.global.edificioEnConstruccion.bienSituado) {    		
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
	    		construir(game.global.edificioEnConstruccion.i, game.global.edificioEnConstruccion.j, game.scene.getScene('GameScene'), game.global.edificioEnConstruccion);
    		}
    	});
    	
    	if (game.global.myPlayer.isVisitor) {
    		if(game.global.idioma == 'eng'){
    			var button = this.add.image(950, 900, 'backEng').setInteractive();
    		}else{
    			var button = this.add.image(950, 900, 'back').setInteractive();
    		}
            button.setOrigin(0.5, 0.5);
            
            btnMision.visible = false;
            btnRanking.visible = false;
            btnOpciones.visible = false;
            btnAnuncios.visible = false;
            intPrincipal.visible = false;
            creditosicon.visible = false;
            ceramicaicon.visible = false;
            metalicon.visible = false;
            colonosicon.visible = false;
            energiaicon.visible = false;
            energiaicon.visible = false;
            unionCoinsicon.visible = false;
            
            this.unionCoins.visible = false;
            this.creditos.visible = false;
            this.energia.visible = false;
            this.metal.visible = false;
            this.ceramica.visible = false;
            this.colonos.visible = false;
            
            
            button.on('pointerover',function(pointer){
        	    button.setFrame(1);
        	})

        	button.on('pointerout',function(pointer){
        	    button.setFrame(0);
        	})
        	
        	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
        		Swal.fire({
    				  title: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('volverColonia')[0].childNodes[0].nodeValue,
    				  icon: 'warning',
    				  showCancelButton: true,
    				  confirmButtonColor: '#3085d6',
    				  cancelButtonColor: '#d33',
    				  confirmButtonText: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('btnAfirmacion')[0].childNodes[0].nodeValue
    				}).then((result) => {
    				  if (result.value) {
    			    		let msg = new Object();
    			    		msg.event = 'ASK PLAYER INFO';
    			    		game.global.socket.send(JSON.stringify(msg));
    			    		game.global.myPlayer.isVisitor = false;
    			    		game.global.inStrictMenu = false;
    			    		game.global.inMenu = false;
    			    		game.scene.stop('GameVisitorScene');
    			    		game.scene.stop('GameInterface');
    						game.scene.run('LoadGameplayScene');
    				  }
    				})
        	});
    	}
    }
    update(time, delta) {
    	
    	if(game.global.inMenu){
    		if(!game.global.myPlayer.isVisitor){
    			this.panel.visible = true;
    		}
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
    	
    	/*this.puntuacion = game.global.puntuacion;
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
    	}*/
    	
    	if (game.global.construyendo || game.global.editMode) {
    		this.btnCancel.setVisible(true);
    		if (game.global.edificioEnConstruccion !== null) {
    			if (game.global.editMode) {
    				this.btnAcept.setVisible(true);
    				for (var i in game.global.buildingsEdited) {
    					if (!game.global.buildingsEdited[i].bienSituado) {
    						this.btnAcept.setVisible(false);
    					}
    				}
    			}
    			else if (game.global.edificioEnConstruccion.bienSituado){
	    			this.btnAcept.setVisible(true);
	    		}
	    		else {
	    			this.btnAcept.setVisible(false);
	    		}
    		}
    	}
    	else {
    		this.btnCancel.setVisible(false);
    		this.btnAcept.setVisible(false);
    	}
    	
    }
}