class RankingMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "RankingMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **RANKING** menu");
		}
    	game.global.inMenu = true;
    }
    
    preload () {

    }
    create (data)  {
    	
    	game.global.inStrictMenu = true;
    	
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	this.panelRanking = this.add.image(760, 100, 'panelRanking').setOrigin(0, 0);
    	
    	var cerrar = this.add.image(game.global.buildingMenu.x-80, game.global.buildingMenu.y + 40, 'xBuilding').setInteractive();
	 	   cerrar.setOrigin(0, 0);
	 	
	 	cerrar.on('pointerover',function(pointer){
	 	    this.setFrame(1);
	 	})
	
	 	cerrar.on('pointerout',function(pointer){
	 	    this.setFrame(0);
	 	})
	 	
    	var cort = this.cortina;
    	var panelR = this.panelRanking;
    	
    	var element = this.add.dom(400, 400).createFromCache('rankingmenu');
        element.setPerspective(800);
    	
    	cort.alpha = 0.4;
    	panelR.scale = 0.6;
    	
    	cerrar.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.global.inStrictMenu = false;
    		game.global.ranking = 'all';
    		game.scene.stop('RankingMenu');
    	});
    	
    	/*Aqui pedimos las peticiones al servidor y las pintamos en el cliente*/      	
    	
    	this.divPuntuaciones = document.getElementById("divPuntuaciones");
  	
    	let msg = new Object();
        msg.event = 'SHOW FRIENDS';
        game.global.socket.send(JSON.stringify(msg));
        
        if(game.global.ranking === 'all'){
	    	for(var i = 0; i < game.global.mejoresPuntuaciones.length; i+=2){
		    		
		    		let divPuesto = document.createElement("div");
		    		
	
		    		var box = document.createElement("img");
		        	box.src = "assets/interface/Gameplay/boxRanking.png";
		        	box.style.marginLeft ="0px";
		        	box.style.marginTop = "30px";
		        	box.style.width = '95%';
		        	box.style.height = '70%';
		        	
		        	
		        	var contenido = document.createElement("div");
		        	contenido.style.cssText = "position:relative;color:white;margin-top:-30px;margin-left:5px";
		        	
		        	
		        	var numRankingValue = document.createTextNode(""+ (Math.round(i/2)+1));
		        	var numRanking = document.createElement("span");
		        	numRanking.style.position="absolute";
		        	numRanking.style.left="10px";
		        	numRanking.style.top="-10px";
		        	//numRanking.style.paddingTop="-50px";
		        	numRanking.style.fontSize = "20px";
		        	numRanking.style.fontFamily = "Roboto";
		        	
		        	numRanking.appendChild(numRankingValue);
		        	
		        	var nombreRankingValue = document.createTextNode(" "+game.global.mejoresPuntuaciones[i]);
		        	var nombreRanking = document.createElement("span");
		        	nombreRanking.style.position="absolute";
		        	nombreRanking.style.left="50px";
		        	nombreRanking.style.top="-7px";
		        	nombreRanking.style.fontSize = "15px";
		        	nombreRanking.style.fontFamily = "Roboto";
		        	nombreRanking.appendChild(nombreRankingValue);
		        	
		        	var puntuacionRankingValue = document.createTextNode(" "+game.global.mejoresPuntuaciones[i+1]);
		        	var puntuacionRanking = document.createElement("span");
		        	puntuacionRanking.style.position="absolute";
		        	puntuacionRanking.style.textAlign="center";
		        	puntuacionRanking.style.left="150px";
		        	puntuacionRanking.style.top="-7px";
		        	puntuacionRanking.style.fontSize = "15px";
		        	puntuacionRanking.style.fontFamily = "Roboto";
		        	puntuacionRanking.appendChild(puntuacionRankingValue);
		        	
		        	switch (i){
		        		case 0:
		        			var n1 = document.createElement("img");
		        			n1.src = "assets/interface/Gameplay/n1.png";
		            		n1.style.position="absolute";
		            		n1.style.textAlign="center";
		            		n1.style.left="125px";
		            		n1.style.top="-10px";
		            		n1.style.width="20px";
		        			n1.style.height="auto";
		            		contenido.appendChild(n1);
		            	break;
		        		case 2:
		        			var n2 = document.createElement("img");
		        			n2.src = "assets/interface/Gameplay/n2.png";
		        			n2.style.position="absolute";
		        			n2.style.textAlign="center";
		        			n2.style.left="125px";
		        			n2.style.top="-10px";
		        			n2.style.width="20px";
		        			n2.style.height="auto";
		        			contenido.appendChild(n2);
		        		break;
		        		case 4:
		        			var n3 = document.createElement("img");
		        			n3.src = "assets/interface/Gameplay/n3.png";
		        			n3.style.position="absolute";
		        			n3.style.textAlign="center";
		        			n3.style.left="125px";
		        			n3.style.top="-10px";
		        			n3.style.width="20px";
		        			n3.style.height="auto";
		        			contenido.appendChild(n3);
		        		break;
		        		default:
		        			break;
		        	}
		        	
		        	
		        	contenido.appendChild(numRanking);
		        	contenido.appendChild(nombreRanking);
		        	contenido.appendChild(puntuacionRanking);
		        	
		        	
		        	
		        	
		        	divPuesto.appendChild(box);
		        	divPuesto.appendChild(contenido);
		        	
		        	divPuntuaciones.appendChild(divPuesto);
		    	
	    	}
        }
    }
    update(time, delta) {
    	
    }

}