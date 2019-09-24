class BootScene extends Phaser.Scene {

	constructor() {
        super({
            key: "BootScene",
            active: true
        });
    }

    init(data) {}
    
    preload () {
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    }
    create (data)  {
    	var image = this.add.image(400, 300, 'Lharys');
    }
    update(time, delta) {
    	
    }

}