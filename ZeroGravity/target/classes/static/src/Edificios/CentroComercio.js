class CentroComercio extends Edificio {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.numColonos = 0;
		super.sprite = 'centroComercio';
		super.sprites = ['mercado1', 'mercado1',
			'mercado2', 'mercado2', 'mercado2',
			'mercado3', 'mercado3', 'mercado3',
			'mercado4'];
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'CentroComercioMenu';
		super.listImage = 'assets/sprites/Edificios/Comercio_1.png';
		super.nameEsp = 'Centro de comercio';
		super.nameEng = 'Trade center';
		this.costes = [[2, 0],
			[2, 0],
			[2, 0]];
	}
}