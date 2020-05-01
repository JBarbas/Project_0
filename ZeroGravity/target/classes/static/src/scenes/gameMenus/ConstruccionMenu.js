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
    	let msg = new Object();
		msg.event = 'GET CONSTRUCCION MENU';
		game.global.socket.send(JSON.stringify(msg));
    	
    	game.global.inMenu = true;
    	
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelConstruccion = this.add.image(430, 300, 'panelConstruccion').setOrigin(0, 0);
    	this.panelConstruccion.setInteractive();
    	
    	var btnX = this.add.image(1580, 335, 'xBuilding').setInteractive();
    	var btnConstruir = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnConstruir').setInteractive();
    	var btnBuild = this.add.image(game.global.btnAnuncio.x, game.global.btnAnuncio.y+60, 'btnBuild').setInteractive();
    	
    	btnBuild.setFrame(2);
		btnConstruir.setFrame(2);
    	
    	var btnPDExtraccion = this.add.image(540, 420, 'btnPDExtraccion').setInteractive();
    	var btnBDViviendas = this.add.image(720, 420, 'btnBDViviendas').setInteractive();
    	var btnGenerador = this.add.image(900, 420, 'btnGenerador').setInteractive();
    	var btnTaller = this.add.image(540, 600, 'btnTaller').setInteractive();
    	var btnCAdministrativo = this.add.image(720, 600, 'btnCAdministrativo').setInteractive();
    	var btnLaboratorio;
    	if (game.global.myPlayer.labBlocked) {
    		btnLaboratorio = this.add.image(900, 600, 'btnLabBlocked').setInteractive();
    	}
    	else {
    		btnLaboratorio = this.add.image(900, 600, 'btnLaboratorio').setInteractive();
    	}
    	var btnCDComercio;
    	if (game.global.myPlayer.cdcBlocked) {
    		btnCDComercio = this.add.image(540, 780, 'btnCdcBlocked').setInteractive();
    	}
    	else {
    		btnCDComercio = this.add.image(540, 780, 'btnCDComercio').setInteractive();
    	}
    	var btnCDOperaciones;
    	if (game.global.myPlayer.cdoBlocked) {
    		btnCDOperaciones = this.add.image(720, 780, 'btnCdoBlocked').setInteractive();
    	}
    	else {
    		btnCDOperaciones = this.add.image(720, 780, 'btnCDOperaciones').setInteractive();
    	}
    	
    	var selPDExtraccion = this.add.image(1205, 474, 'selPDExtraccion').setVisible(false);
    	var selBDViviendas = this.add.image(1205, 474, 'selBDViviendas').setVisible(false);
    	var selGenerador = this.add.image(1205, 474, 'selGenerador').setVisible(false);
    	var selTaller = this.add.image(1205, 474, 'selTaller').setVisible(false);
    	var selLaboratorio = this.add.image(1205, 474, 'selLaboratorio').setVisible(false);
    	var selCDComercio = this.add.image(1205, 474, 'selCDComercio').setVisible(false);
    	var selCDOperaciones = this.add.image(1205, 474, 'selCDOperaciones').setVisible(false);
    	var selCAdministrativo = this.add.image(1205, 474, 'selCAdministrativo').setVisible(false);
    	
    	var selLaboratorioBlack = this.add.image(1205, 474, 'selLaboratorioBlack').setVisible(false);
    	var selCDComercioBlack = this.add.image(1205, 474, 'selCDComercioBlack').setVisible(false);
    	var selCDOperacionesBlack = this.add.image(1205, 474, 'selCDOperacionesBlack').setVisible(false);
    	
    	
    	this.nombreEdificio = this.add.text(1335, 360, '', {
    	    fontFamily: 'pantonBlack',
    	    fontSize: '30px'
    	});
    	
    	this.costeEdificio = this.add.text(1350, 440, '', {
    	    fontFamily: 'pantonBlack',
    	    fontSize: '20px'
    	});
    	
    	this.creditIcon = this.add.image(1375, 490, 'creditIcon').setScale(0.7, 0.7);
    	this.metalIcon = this.add.image(1375, 530, 'metalIcon').setScale(0.7, 0.7);
    	this.clayIcon = this.add.image(1375, 570, 'clayIcon').setScale(0.7, 0.7);
    	this.creditIcon.setVisible(false);
    	this.metalIcon.setVisible(false);
    	this.clayIcon.setVisible(false);
    	this.costeNums = this.add.text(1405, 478, '', {
    	    fontFamily: 'pantonBlack',
    	    fontSize: '18px',
    	    lineSpacing: 20
    	});
    	
    	this.descEdificio = this.add.text(1080, 625, '', {
    	    fontFamily: 'Roboto Condensed',
    	    fontSize: '24px'
    	});
    	
    	this.blockMessage = this.add.text(1080, 790, '', {
    	    fontFamily: 'Roboto Condensed',
    	    fontSize: '20px',
    	    color: '#4A4A4A'
    	});
    	
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
    		if (scene.edificioSeleccionado !== "plataformaExtraccion") {
    			btnPDExtraccion.setFrame(0);
    		}
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
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnBDViviendas.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnTaller.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	btnCAdministrativo.setFrame(0);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    		if(game.global.idioma == "eng"){
        		scene.nombreEdificio.text = "Extraction\nplatform";
        		scene.costeEdificio.text = "Cost:";        		
        	}
        	else {
        		scene.nombreEdificio.text = "Plataforma\nde extracción";
        		scene.costeEdificio.text = "Coste:";        		
        	}
    		scene.blockMessage.text = "";
    		scene.creditIcon.setVisible(true);
    		scene.metalIcon.setVisible(true);
    		scene.clayIcon.setVisible(true);
    		scene.costeNums.text = '1000\n1000\n1000';
    		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('pedesc')[0].childNodes[0].nodeValue, 50);
    	})
    	
    	btnBDViviendas.on('pointerover',function(pointer){
    		btnBDViviendas.setFrame(1);
    	})
    	
    	btnBDViviendas.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "bloqueViviendas") {
    			btnBDViviendas.setFrame(0);
    		}
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
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnPDExtraccion.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnTaller.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	btnCAdministrativo.setFrame(0);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    		if(game.global.idioma == "eng"){
        		scene.nombreEdificio.text = "Block of\napartments";
        		scene.costeEdificio.text = "Cost:";        		
        	}
        	else {
        		scene.nombreEdificio.text = "Bloque de\nviviendas";
        		scene.costeEdificio.text = "Coste:";        		
        	}
    		scene.blockMessage.text = "";
    		scene.creditIcon.setVisible(true);
    		scene.metalIcon.setVisible(true);
    		scene.clayIcon.setVisible(true);
    		scene.costeNums.text = '1000\n1000\n1000';
    		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('bvdesc')[0].childNodes[0].nodeValue, 50);
    	})
    	
    	btnGenerador.on('pointerover',function(pointer){
    		btnGenerador.setFrame(1);
    	})
    	
    	btnGenerador.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "generador") {
    			btnGenerador.setFrame(0);
    		}
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
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnPDExtraccion.setFrame(0);
        	btnBDViviendas.setFrame(0);
        	btnTaller.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	btnCAdministrativo.setFrame(0);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    		if(game.global.idioma == "eng"){
        		scene.nombreEdificio.text = "Generator";
        		scene.costeEdificio.text = "Cost:";        		
        	}
        	else {
        		scene.nombreEdificio.text = "Generador";
        		scene.costeEdificio.text = "Coste:";        		
        	}
    		scene.blockMessage.text = "";
    		scene.creditIcon.setVisible(true);
    		scene.metalIcon.setVisible(true);
    		scene.clayIcon.setVisible(true);
    		scene.costeNums.text = '1000\n1000\n1000';
    		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('gendesc')[0].childNodes[0].nodeValue, 50);
    	})
    	
    	btnTaller.on('pointerover',function(pointer){
    		btnTaller.setFrame(1);
    	})
    	
    	btnTaller.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "taller") {
    			btnTaller.setFrame(0);
    		}
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
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnPDExtraccion.setFrame(0);
        	btnBDViviendas.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	btnCAdministrativo.setFrame(0);
    		btnBuild.setFrame(0);
    		btnConstruir.setFrame(0);
    		if(game.global.idioma == "eng"){
        		scene.nombreEdificio.text = "Workshop";
        		scene.costeEdificio.text = "Cost:";        		
        	}
        	else {
        		scene.nombreEdificio.text = "Taller";
        		scene.costeEdificio.text = "Coste:";        		
        	}
    		scene.blockMessage.text = "";
    		scene.creditIcon.setVisible(true);
    		scene.metalIcon.setVisible(true);
    		scene.clayIcon.setVisible(true);
    		scene.costeNums.text = '1000\n1000\n1000';
    		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('tdesc')[0].childNodes[0].nodeValue, 50);
    	})
    	
    	btnLaboratorio.on('pointerover',function(pointer){
    		btnLaboratorio.setFrame(1);
    	})
    	
    	btnLaboratorio.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "laboratorioInvestigacion") {
    			btnLaboratorio.setFrame(0);
    		}
    	})
    	
    	btnLaboratorio.on('pointerdown',function(pointer){
    		if (!game.global.myPlayer.labBlocked) {
    			scene.edificioSeleccionado = "laboratorioInvestigacion";
    		}
    		else {
    			scene.edificioSeleccionado = "";
    		}
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnPDExtraccion.setFrame(0);
        	btnBDViviendas.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnTaller.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	btnCAdministrativo.setFrame(0);
        	if (!game.global.myPlayer.labBlocked) {
        		btnBuild.setFrame(0);
        		btnConstruir.setFrame(0);
        		selLaboratorio.setVisible(true);
        		
        		//Si no esta bloqueado que salga el texto
        		if(game.global.idioma == "eng"){
            		scene.nombreEdificio.text = "Research\nlaboratory";
            		scene.costeEdificio.text = "Cost:";        		
            	}
            	else {
            		scene.nombreEdificio.text = "Laboratorio de\ninvestigación";
            		scene.costeEdificio.text = "Coste:";        		
            	}
        		scene.blockMessage.text = "";
        		scene.creditIcon.setVisible(true);
        		scene.metalIcon.setVisible(true);
        		scene.clayIcon.setVisible(true);
        		scene.costeNums.text = '1000\n1000\n1000';
        		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('labdesc')[0].childNodes[0].nodeValue, 50);
        	}
        	else {
        		btnBuild.setFrame(2);
        		btnConstruir.setFrame(2);
        		selLaboratorioBlack.setVisible(true);
        		
        		//Si no esta bloqueado que salga el texto
        		if(game.global.idioma == "eng"){
            		scene.nombreEdificio.text = "??????";
            		scene.costeEdificio.text = "Cost:";        		
            	}
            	else {
            		scene.nombreEdificio.text = "??????";
            		scene.costeEdificio.text = "Coste:";        		
            	}
        		scene.blockMessage.text = "";
        		scene.creditIcon.setVisible(true);
        		scene.metalIcon.setVisible(true);
        		scene.clayIcon.setVisible(true);
        		scene.costeNums.text = '??????\n??????\n??????';
        		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('labdescblock')[0].childNodes[0].nodeValue, 50);
        	}
    		
    	})
    	
    	btnCDComercio.on('pointerover',function(pointer){
    		btnCDComercio.setFrame(1);
    	})
    	
    	btnCDComercio.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "centroComercio") {
    			btnCDComercio.setFrame(0);
    		}
    	})
    	
    	btnCDComercio.on('pointerdown',function(pointer){
    		if (!game.global.myPlayer.cdcBlocked) {
    			scene.edificioSeleccionado = "centroComercio";
    		}
    		else {
    			scene.edificioSeleccionado = "";
    		}
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(false);
        	
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	
        	btnPDExtraccion.setFrame(0);
        	btnBDViviendas.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnTaller.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	btnCAdministrativo.setFrame(0);
        	if (!game.global.myPlayer.cdcBlocked) {
        		btnBuild.setFrame(0);
        		btnConstruir.setFrame(0);
        		selCDComercio.setVisible(true);
        		
        		if(game.global.idioma == "eng"){
            		scene.nombreEdificio.text = "Trade\ncenter";
            		scene.costeEdificio.text = "Cost:";        		
            	}
            	else {
            		scene.nombreEdificio.text = "Centro de\ncomercio";
            		scene.costeEdificio.text = "Coste:";        		
            	}
        		scene.blockMessage.text = "";
        		scene.creditIcon.setVisible(true);
        		scene.metalIcon.setVisible(true);
        		scene.clayIcon.setVisible(true);
        		scene.costeNums.text = '1000\n1000\n1000';
        		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('ccdesc')[0].childNodes[0].nodeValue, 50);
        	}
        	else {
        		btnBuild.setFrame(2);
        		btnConstruir.setFrame(2);
        		selCDComercioBlack.setVisible(true);
        		
        		//Si no esta bloqueado que salga el texto
        		if(game.global.idioma == "eng"){
            		scene.nombreEdificio.text = "??????";
            		scene.costeEdificio.text = "Cost:";        		
            	}
            	else {
            		scene.nombreEdificio.text = "??????";
            		scene.costeEdificio.text = "Coste:";        		
            	}
        		scene.blockMessage.text = "";
        		scene.creditIcon.setVisible(true);
        		scene.metalIcon.setVisible(true);
        		scene.clayIcon.setVisible(true);
        		scene.costeNums.text = '??????\n??????\n??????';
        		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('ccdescblock')[0].childNodes[0].nodeValue, 50);
        	}
    		
    	})
    	
    	btnCDOperaciones.on('pointerover',function(pointer){
    		btnCDOperaciones.setFrame(1);
    	})
    	
    	btnCDOperaciones.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "centroOperaciones") {
    			btnCDOperaciones.setFrame(0);
    		}
    	})
    	
    	btnCDOperaciones.on('pointerdown',function(pointer){
    		if (!game.global.myPlayer.cdoBlocked) {
    			scene.edificioSeleccionado = "centroOperaciones";
    		}
    		else {
    			scene.edificioSeleccionado = "";
    		}
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCAdministrativo.setVisible(false);
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnPDExtraccion.setFrame(0);
        	btnBDViviendas.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnTaller.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCAdministrativo.setFrame(0);
        	if (!game.global.myPlayer.cdoBlocked) {
        		btnBuild.setFrame(0);
        		btnConstruir.setFrame(0);
        		
            	selCDOperaciones.setVisible(true);
        		if(game.global.idioma == "eng"){
            		scene.nombreEdificio.text = "Operations\ncenter";
            		scene.costeEdificio.text = "Cost:";        		
            	}
            	else {
            		scene.nombreEdificio.text = "Centro de\noperaciones";
            		scene.costeEdificio.text = "Coste:";        		
            	}
            	scene.blockMessage.text = "";
        		scene.creditIcon.setVisible(true);
        		scene.metalIcon.setVisible(true);
        		scene.clayIcon.setVisible(true);
        		scene.costeNums.text = '1000\n1000\n1000';
        		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('codesc')[0].childNodes[0].nodeValue, 50);
        	}
        	else {
        		btnBuild.setFrame(2);
        		btnConstruir.setFrame(2);
        		selCDOperacionesBlack.setVisible(true);
        		
        		//Si no esta bloqueado que salga el texto
        		if(game.global.idioma == "eng"){
            		scene.nombreEdificio.text = "??????";
            		scene.costeEdificio.text = "Cost:";        		
            	}
            	else {
            		scene.nombreEdificio.text = "??????";
            		scene.costeEdificio.text = "Coste:";        		
            	}
        		scene.blockMessage.text = "";
        		scene.creditIcon.setVisible(true);
        		scene.metalIcon.setVisible(true);
        		scene.clayIcon.setVisible(true);
        		scene.costeNums.text = '??????\n??????\n??????';
        		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('codescblock')[0].childNodes[0].nodeValue, 50);
        	}
        	
    	})
    	
    	btnCAdministrativo.on('pointerover',function(pointer){
    		btnCAdministrativo.setFrame(1);
    	})
    	
    	btnCAdministrativo.on('pointerout',function(pointer){
    		if (scene.edificioSeleccionado !== "centroAdministrativo") {
    			btnCAdministrativo.setFrame(0);
    		}
    	})
    	
    	btnCAdministrativo.on('pointerdown',function(pointer){
    		if (!game.global.myPlayer.caBlocked) {
    			scene.edificioSeleccionado = "centroAdministrativo";
    		}
    		else {
    			scene.edificioSeleccionado = "";
    		}
    		selPDExtraccion.setVisible(false);
    		selBDViviendas.setVisible(false);
        	selGenerador.setVisible(false);
        	selTaller.setVisible(false);
        	selLaboratorio.setVisible(false);
        	selCDComercio.setVisible(false);
        	selCDOperaciones.setVisible(false);
        	selCAdministrativo.setVisible(true);
        	
        	selLaboratorioBlack.setVisible(false);
        	selCDOperacionesBlack.setVisible(false);
        	selCDComercioBlack.setVisible(false);
        	btnPDExtraccion.setFrame(0);
        	btnBDViviendas.setFrame(0);
        	btnGenerador.setFrame(0);
        	btnTaller.setFrame(0);
        	btnLaboratorio.setFrame(0);
        	btnCDComercio.setFrame(0);
        	btnCDOperaciones.setFrame(0);
        	if (!game.global.myPlayer.caBlocked) {
        		btnBuild.setFrame(0);
        		btnConstruir.setFrame(0);
        	}
        	else {
        		btnBuild.setFrame(2);
        		btnConstruir.setFrame(2);
        		scene.blockMessage.text = "Ya tienes un edificio de este tipo";
        	}
    		if(game.global.idioma == "eng"){
        		scene.nombreEdificio.text = "Administrative\ncenter";
        		scene.costeEdificio.text = "Cost:";        		
        	}
        	else {
        		scene.nombreEdificio.text = "Centro\nadministrativo";
        		scene.costeEdificio.text = "Coste:";        		
        	}
    		scene.creditIcon.setVisible(true);
    		scene.metalIcon.setVisible(true);
    		scene.clayIcon.setVisible(true);
    		scene.costeNums.text = '1000\n1000\n1000';
    		scene.descEdificio.text = justificaHasta(scene.cache.xml.get(game.global.idioma).getElementsByTagName('cadesc')[0].childNodes[0].nodeValue, 50);
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
    		game.global.editMode = true;
    		game.scene.getScene('GameScene').gridContainer.setAlpha(0.5);
    		game.global.buildingsEdited = [];
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