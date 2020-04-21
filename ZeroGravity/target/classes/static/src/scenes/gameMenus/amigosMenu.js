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
    	var btnSearch = this.add.image(1030, 730, 'btnSearchFriends').setInteractive();
    	var cort = this.cortina;
    	
    	var textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('txtamigos')[0].childNodes[0].nodeValue;
		this.amigostxt = this.add.text(550, 295, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
		this.amigostxt.scale = 0.8;
    	cort.alpha = 0.4;
    	btnX.scale = 0.7;
    	panelFriends.scale = 0.8;
    	
    	btnAdd.scale = 0.7;
    	btnSearch.scale = 0.7;
    	btnSolicitud.scale = 0.7;
    	//bloqueAmigo.scale = 0.8;
    	
    	
    	var amigosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
    	var elementV = this.add.dom(-1170, 350).createFromCache('centroMandoMenu');
        elementV.setPerspective(800);
        
        var divMando = document.getElementById("divMando");
      	
           		
		let divPuestoV = document.createElement("div");
		divPuestoV.style.marginTop = "40px";
		
		/*la imagen*/
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
    	
    	/*el div de los span*/
    	var contenidoV = document.createElement("div");
    	contenidoV.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
    	
    	divPuestoV.appendChild(name);
    	divPuestoV.appendChild(connect);
    	divPuestoV.appendChild(con);
    	divPuestoV.appendChild(boxV);
    	divPuestoV.appendChild(contenidoV);
    	divMando.appendChild(divPuestoV);
    	
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
    	
    	btnX.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('FriendsScene');
    	});
    	
    }
    update(time, delta) {
    	
    }

}