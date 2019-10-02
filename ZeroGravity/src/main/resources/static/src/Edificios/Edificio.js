class Edificio {
	
	constructor(x, y){
		
		this.id = 0;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.sprite = 'edificio';
		this.gameObject = null;
		this.originX = 0.5; // Porcentaje a lo ancho de la imagen desde donde se comenzara a pintar
		this.menuScene = ''; // La key de la escena del menu de este edificio
	}
	
	build(scene) {
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
		var position = new Phaser.Geom.Point(this.x*tile_width/2, this.y*tile_height);
		position = cartesianToIsometric(position);
		position.x += tileMap_width*tile_width/2;
		this.gameObject = scene.add.image(position.x, position.y, this.sprite).setOrigin(this.originX, 1);
	}
}