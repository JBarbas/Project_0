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
		var addamigostxt = this.add.text(550, 300, textoDesdeXml1, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
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
    	
    	var textBuscar = this.element.getChildByName("friend");
    	var amigosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
    	var elementV = this.add.dom(-1170, 350).createFromCache('amigosMenu');
        elementV.setPerspective(800);
        
        var divAmigos = document.getElementById("divAmigos");
      	
           		
		let divPuestoV = document.createElement("div");
		divPuestoV.style.marginTop = "40px";
		
		
		let boxV = document.createElement("img");
    	boxV.src = "assets/interface/Gameplay/Friends/BloqueAmigosBck.png";
    	boxV.style.marginLeft ="0px";
    	boxV.style.marginTop = "0px";
    	boxV.style.width = '80%';
    	boxV.style.height = 'auto';
    	
    	let connect = document.createElement("img");
    	connect.src = 'assets/interface/Gameplay/Friends/conected.png';
    	connect.style.position = "absolute";
    	connect.style.marginLeft ="8px";
    	connect.style.marginTop = "8px";
    	connect.style.width = '2%';
    	connect.style.height = 'auto';
    	
    	var name = document.createElement("span");
		name.style.position = "absolute";
		name.style.left = "20px";
		name.style.marginTop = "1px";
		name.style.width = '200px';
		name.style.color = '#fff';
		name.style.fontFamily = 'pantonBlack';
		name.style.fontSize = '11px';
		
		var n = document.createTextNode("Pepito Perez");
		name.appendChild(n);
		
		var con = document.createElement("span");
		con.style.position = "absolute";
		con.style.left = "20px";
		con.style.marginTop = "12px";
		con.style.width = '200px';
		con.style.color = '#fff';
		con.style.fontFamily = 'pantonLight';
		con.style.fontSize = '6px';
		
		var c;
		
		if(game.global.idioma == 'eng'){
    		c = document.createTextNode("connected");
    	}else{
    		c = document.createTextNode("conectado");
    	}
		con.appendChild(c);
    	
    	
    	var contenidoV = document.createElement("div");
    	contenidoV.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
    	
    	divPuestoV.appendChild(name);
    	divPuestoV.appendChild(connect);
    	divPuestoV.appendChild(con);
    	divPuestoV.appendChild(boxV);
    	divPuestoV.appendChild(contenidoV);
    	divAmigos.appendChild(divPuestoV);
    	
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
    	});
    	
    	btnVolver1.on('pointerdown', function(pointer){
    		btnAdd.setVisible(true);
    		btnSolicitud.setVisible(true);
    		btnVolver.setVisible(false);
    		btnVolver1.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(true);
    	});
    	
    	btnAdd.on('pointerdown', function(pointer){
    		btnAdd.setVisible(false);
    		btnVolver.setVisible(true);
    		btnVolver1.setVisible(false);
    		btnSolicitud.setVisible(true);
    		
    		addamigostxt.setVisible(true);
    		solicitudamigostxt.setVisible(false);
    		amigostxt.setVisible(false);
    	});
    	
    	btnSolicitud.on('pointerdown', function(pointer){
    		btnAdd.setVisible(true);
    		btnVolver.setVisible(false);
    		btnVolver1.setVisible(true);
    		btnSolicitud.setVisible(false);
    		
    		addamigostxt.setVisible(false);
    		solicitudamigostxt.setVisible(true);
    		amigostxt.setVisible(false);
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
    		this.usersList.text = '';
    	}
    	
    	this.searchName = $("#friend").val();
    	
    	
    }

}