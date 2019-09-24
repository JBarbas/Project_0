class PreloadScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadScene",
		});
	}
	
	init(data){}
	
	preload () {
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    }
    create (data)  {
    	var image = this.add.image(300, 300, 'Lharys');
    	image.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('BootScene');
    		game.scene.stop('PreloadScene');
    	});
    }
    update(time, delta) {
    	
    }
}