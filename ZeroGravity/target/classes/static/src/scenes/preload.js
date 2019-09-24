class PreloadScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadScene",
			active: true
		});
	}
	
	init(data){}
	
	preload () {
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    }
    create (data)  {
    	var image = this.add.image(100, 300, 'Lharys');
    }
    update(time, delta) {
    	
    }
}