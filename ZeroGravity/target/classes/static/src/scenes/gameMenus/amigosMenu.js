class FriendsScene extends Phaser.Scene {

	constructor() {
        super({
            key: "FriendsScene",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **FRIENDS** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	
    	var scene = this;
    	
    	this.mode = "amigos";
    	
    	var textoDesdeXml;
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	var panelFriends = this.add.image(460, 260, 'bckAmigos').setOrigin(0, 0);
    	//var bloqueAmigo = this.add.image(540, 420, 'bloqueAmigosBck').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1500, 300, 'xBuilding').setInteractive();
    	var btnAdd = this.add.image(1030, 420, 'btnAddFriends').setInteractive();
    	var btnSolicitud = this.add.image(1030, 575, 'btnSolicitudFriends').setInteractive();
    	var btnVolver = this.add.image(1030, 420, 'btnBackFriends').setInteractive();
    	var btnVolver1 = this.add.image(1030, 575, 'btnBackFriends').setInteractive();
    	var btnSearch = this.add.image(1030, 730, 'btnSearchFriends').setInteractive();
    	var cort = this.cortina;
    	
    	//GIF
    	this.anims.create({ key: 'everything1', frames: this.anims.generateFrameNames('global'), repeat: -1 });
    	this.add.sprite((game.config.width/2)+352, 430, 'global').play('everything1').setOrigin(0.5,0.5).setScale(0.57);
    	
    	
    	var textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('txtamigos')[0].childNodes[0].nodeValue;
		var amigostxt = this.add.text(550, 300, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
		amigostxt.scale = 0.6;
		
		var textoDesdeXml1 = this.cache.xml.get(game.global.idioma).getElementsByTagName('txtadd')[0].childNodes[0].nodeValue;
		var addamigostxt = this.add.text(525, 300, textoDesdeXml1, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
		addamigostxt.scale = 0.6;
		addamigostxt.setVisible(false);
		
		var textoDesdeXml2 = this.cache.xml.get(game.global.idioma).getElementsByTagName('txtsol')[0].childNodes[0].nodeValue;
		var solicitudamigostxt = this.add.text(550, 300, textoDesdeXml2, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
		solicitudamigostxt.scale = 0.6;
		solicitudamigostxt.setVisible(false);
		
    	cort.alpha = 0.4;
    	btnX.scale = 0.7;
    	panelFriends.scale = 0.8;
    	
    	btnAdd.scale = 0.7;
    	btnSearch.scale = 0.7;
    	btnSolicitud.scale = 0.7;
    	btnVolver.scale = 0.7;
    	btnVolver.setVisible(false);
    	btnVolver1.scale = 0.7;
    	btnVolver1.setVisible(false);
    	
    	this.usersList = this.add.text(550, 420, '', {
    	    fontFamily: 'pantonBlack',
    	    fontSize: '18px',
    	    lineSpacing: 20
    	});
    	
    	this.element = this.add.dom(0, 545).createFromCache('buscarAmigosMenu');

        this.element.setPerspective(800);
        this.element.alpha = 50;
    	
    	var textBuscar = this.element.getChildByName("friend");
    	var amigosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
    	var elementV = this.add.dom(-1125, 610).createFromCache('amigosMenu');
        elementV.setPerspective(800);
        
        this.divAmigos = document.getElementById("divAmigos");
      	
           		
		///////////////////////////////////
    	
    	amigosContainer.add(elementV);
    	
    	btnX.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnX.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
	 	
	 	btnAdd.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnAdd.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
	 	
	 	btnSearch.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnSearch.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
	 	
	 	btnSolicitud.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnSolicitud.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
	 	
	 	btnVolver.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnVolver.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
	 	
	 	btnVolver1.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnVolver1.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('FriendsScene');
    	});
    	
    	btnVolver.on('pointerdown', function(pointer){
    		btnAdd.setVisible(true);
    		btnSolicitud.setVisible(true);
    		btnVolver.setVisible(false);
    		btnVolver1.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(true);
    		
    		scene.mode = "amigos";
    	});
    	
    	btnVolver1.on('pointerdown', function(pointer){
    		btnAdd.setVisible(true);
    		btnSolicitud.setVisible(true);
    		btnVolver.setVisible(false);
    		btnVolver1.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(true);
    		
    		scene.mode = "amigos";
    	});
    	
    	btnAdd.on('pointerdown', function(pointer){
    		btnAdd.setVisible(false);
    		btnVolver.setVisible(true);
    		btnVolver1.setVisible(false);
    		btnSolicitud.setVisible(true);
    		
    		addamigostxt.setVisible(true);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(false);
    		
    		scene.mode = "addAmigos";
    	});
    	
    	btnSolicitud.on('pointerdown', function(pointer){
    		btnAdd.setVisible(true);
    		btnVolver.setVisible(false);
    		btnVolver1.setVisible(true);
    		btnSolicitud.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(true);
    		amigostxt.setVisible(false);
    		
    		scene.mode = "solicitudes";
    	});
    	
    	
		  /*$("#search-box").change(function(){
		    let msg = new Object();
			msg.event = 'SEARCH USERS';
			msg.search = $("#friend").val();
			game.global.socket.send(JSON.stringify(msg));
		  });*/
    	
    }
    update(time, delta) {
    	if ($("#friend").val() !== this.searchName && $("#friend").val().length > 0) {
    		let msg = new Object();
			msg.event = 'SEARCH USERS';
			msg.search = $("#friend").val();
			game.global.socket.send(JSON.stringify(msg));
    	}
    	else if ($("#friend").val().length === 0) {
    		this.divAmigos.innerHTML = '';
    	}
    	
    	this.searchName = $("#friend").val();
    	
    	
    }

}