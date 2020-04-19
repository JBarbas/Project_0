class CentroComercio extends Edificio {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.sprite = 'centroComercio';
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'CentroComercioMenu';
		super.listImage = 'assets/sprites/Edificios/Comercio_1.png';
		super.nameEsp = 'Centro de comercio';
		super.nameEng = 'Trade center';
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}