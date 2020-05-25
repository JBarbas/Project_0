class CentroMando extends Edificio {
	
	constructor(x, y){
		
		super(x, y);
		super.height = 2;
		super.width = 2;
		super.level = 1;
		super.levelMax = 3;
		super.sprite = 'centroDeMando';
		super.sprites = ['cdm1', 'cdm2', 'cdm3'];
		super.buildingSprite = 'enConstruccion4';
		super.menuScene = 'CentroMandoMenu';
		this.costes = [[2, 0],
			[19, 0],
			[51, 0]];
	}
}