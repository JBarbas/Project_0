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
    	var cort = this.cortina;
    	
    	var textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('txtamigos')[0].childNodes[0].nodeValue;
		this.amigostxt = this.add.text(550, 295, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
		this.amigostxt.scale = 0.8;
    	cort.alpha = 0.4;
    	btnX.scale = 0.7;
    	panelFriends.scale = 0.8;
    	//bloqueAmigo.scale = 0.8;
    	
    	
    	var amigosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
    	var elementV = this.add.dom(-370, 280).createFromCache('amigosMenu');
        elementV.setPerspective(800);
        
        var divAmigos = document.getElementById("divAmigos");
        
    	//Textos de bloques
    	/*for(var i=0;i<10;i++){
    		
    		let divPuestoV = document.createElement("div");
    		divPuestoV.style.marginTop = "40px";
    		
    		/*la imagen*/
    		/*let boxV = document.createElement("img");
        	boxV.src = 'assets/interface/Gameplay/Friends/AmigosBck.png';
        	boxV.style.marginLeft ="0px";
        	boxV.style.marginTop = "0px";
        	boxV.style.width = '98%';
        	boxV.style.height = 'auto';
        	boxV.indice = i;
        	
        	
        	
        	var contenidoV = document.createElement("div");
        	contenidoV.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
        	
        	divPuestoV.appendChild(boxV);
        	divPuestoV.appendChild(contenidoV);
        	
        	divAmigos.appendChild(divPuestoV);
    	}*/
    	
    	amigosContainer.add(elementV);
    	
    	btnX.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	btnX.on('pointerout',function(pointer){
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