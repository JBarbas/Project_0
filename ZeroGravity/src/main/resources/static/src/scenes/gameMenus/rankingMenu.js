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
    		//stop scene
    		game.global.inMenu = false;
    		game.scene.stop('RankingMenu');
    	});
    	
    }
    update(time, delta) {
    	
    }

}