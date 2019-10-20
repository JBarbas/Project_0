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
    }
    
    preload () {

    }
    create (data)  {
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
    		game.global.sound = game.sound.play('pulsarBoton');
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('RankingMenu');
    	});
    	
    	/*Aqui pedimos las peticiones al servidor y las pintamos en el cliente*/      	
    	console.log(game.global.mejoresPuntuaciones.length);
    	
    	var divPuntuaciones = document.getElementById("divPuntuaciones");
  	
    	for(var i = 0; i < game.global.mejoresPuntuaciones.length; i+=2){
    		
    		let divPuesto = document.createElement("div");
    		
    		/*la imagen*/
    		var box = document.createElement("img");
        	box.src = "assets/interface/Gameplay/box.png";
        	box.style.marginLeft ="5px";
        	box.style.marginTop = "6px";
        	box.style.width = '90%';
        	box.style.height = 'auto';
        	
        	/*el div de los span*/
        	var contenido = document.createElement("div");
        	contenido.style.cssText = "position:relative;color:white;margin-top:-30px;margin-left:5px";
        	
        	/*los span*/
        	var numRankingValue = document.createTextNode("#"+ (Math.round(i/2)+1));
        	var numRanking = document.createElement("span");
        	numRanking.appendChild(numRankingValue);
        	
        	var nombreRankingValue = document.createTextNode(" "+game.global.mejoresPuntuaciones[i]);
        	var nombreRanking = document.createElement("span");
        	nombreRanking.appendChild(nombreRankingValue);
        	
        	var puntuacionRankingValue = document.createTextNode(" "+game.global.mejoresPuntuaciones[i+1]);
        	var puntuacionRanking = document.createElement("span");
        	puntuacionRanking.appendChild(puntuacionRankingValue);
        	
        	contenido.appendChild(numRanking);
        	contenido.appendChild(nombreRanking);
        	contenido.appendChild(puntuacionRanking);
        	
        	divPuesto.appendChild(box);
        	divPuesto.appendChild(contenido);
        	
        	divPuntuaciones.appendChild(divPuesto);
    	}
    }
    update(time, delta) {
    	
    }

}