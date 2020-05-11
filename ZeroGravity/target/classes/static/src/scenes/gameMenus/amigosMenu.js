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
    	var panelFriends2 = this.add.image(460, 260, 'bckAmigosSinBuscar').setOrigin(0, 0);
    	//var bloqueAmigo = this.add.image(540, 420, 'bloqueAmigosBck').setOrigin(0, 0);
    	
    	var btnX = this.add.image(1500, 300, 'xBuilding').setInteractive();
    	var btnAdd = this.add.image(1030, 575, 'btnAddFriends').setInteractive();
    	var btnSolicitud = this.add.image(1030, 730, 'btnSolicitudFriends').setInteractive();
    	var btnAmigos = this.add.image(1030, 420, 'btnBackFriends').setInteractive();
    	//var btnSearch = this.add.image(1030, 575, 'btnSearchFriends').setInteractive();
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
    	panelFriends2.scale = 0.8;
    	panelFriends.visible = false;
    	
    	btnAdd.scale = 0.7;
    	//btnSearch.scale = 0.7;
    	btnSolicitud.scale = 0.7;
    	btnAmigos.scale = 0.7;

    	
    	this.usersList = this.add.text(550, 420, '', {
    	    fontFamily: 'pantonBlack',
    	    fontSize: '18px',
    	    lineSpacing: 20
    	});
    	
    	var element = this.add.dom(0, 545).createFromCache('buscarAmigosMenu');

        element.setPerspective(800);
        element.alpha = 50;
        element.setVisible(false);
    	var textBuscar = element.getChildByName("friend");
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
	 		if(scene.mode != "addAmigos")
	 			this.setFrame(0);
	 	})
	 	
	 	/*btnSearch.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnSearch.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})*/
	 	
	 	btnSolicitud.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnSolicitud.on('pointerout',function(pointer){
	 		if(scene.mode != "solicitudes")
	 			this.setFrame(0);
	 	})
	 	
	 	btnAmigos.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnAmigos.on('pointerout',function(pointer){
	 		if(scene.mode != "amigos")
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
    	
    	btnAmigos.on('pointerdown', function(pointer){
    		btnAmigos.setFrame(1);
    		btnSolicitud.setFrame(0);
    		btnAdd.setFrame(0);
    		
    		document.getElementById("friend").value = "";
    		
    		let msg = new Object();
			msg.event = 'SHOW FRIENDS';
			game.global.socket.send(JSON.stringify(msg));
    		
    		panelFriends2.visible = true;
    		panelFriends.visible = false;
    		element.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(true);
    		
    		scene.mode = "amigos";
    		document.getElementById("friend").value = "";
    	});
    	
    	btnAdd.on('pointerdown', function(pointer){
    		btnAdd.setFrame(1);
    		btnSolicitud.setFrame(0);
    		btnAmigos.setFrame(0);
    		
    		element.setVisible(true);
    		
    		addamigostxt.setVisible(true);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(false);
    		panelFriends.visible = true;
    		panelFriends2.visible = false;

    		
    		scene.mode = "addAmigos";
    		document.getElementById("friend").value = "";
    	});
    	
    	btnSolicitud.on('pointerdown', function(pointer){
    		btnSolicitud.setFrame(1);
    		btnAdd.setFrame(0);
    		btnAmigos.setFrame(0);
    		document.getElementById("friend").value = "";
    		
    		let msg = new Object();
			msg.event = 'SHOW FRIEND REQUESTS';
			game.global.socket.send(JSON.stringify(msg));
			
    		
    		panelFriends2.visible = true;
    		panelFriends.visible = false;
    		element.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(true);
    		amigostxt.setVisible(false);
    		
    		scene.mode = "solicitudes";		
    	});
    	
    	let msg = new Object();
		msg.event = 'SHOW FRIENDS';
		game.global.socket.send(JSON.stringify(msg));
    	
    	
		  /*$("#search-box").change(function(){
		    let msg = new Object();
			msg.event = 'SEARCH USERS';
			msg.search = $("#friend").val();
			game.global.socket.send(JSON.stringify(msg));
		  });*/
    	
    }
    update(time, delta) {
    	if ($("#friend").val() !== this.searchName && $("#friend").val().length > 0) {
    		if (this.mode === 'amigos') {
    			
    		}
    		else if(this.mode === 'addAmigos') {
        		let msg = new Object();
    			msg.event = 'SEARCH USERS';
    			msg.search = $("#friend").val();
    			game.global.socket.send(JSON.stringify(msg));    			
    		}
    		else if (this.mode === 'solicitudes') {
    			
    		}
    	}
    	else if ($("#friend").val().length === 0 && this.mode === 'addAmigos') {
    		if(game.global.idioma == "eng"){
    			this.divAmigos.innerHTML = '<span style=" color: #fff; font-family: pantonLight ">Enter characters in the search engine above to find your friends.</span>';
    		}else{
    			this.divAmigos.innerHTML = '<span style=" color: #fff; font-family: pantonLight ">Introduce caracteres en el buscador de arriba para encontrar a tus amigos.</span>';
    		}
    		this.divAmigos.style.marginTop = '20px';
    		this.divAmigos.style.textAlign = 'center';
    	}
    	
    	this.searchName = $("#friend").val();
    	
    	
    }

}