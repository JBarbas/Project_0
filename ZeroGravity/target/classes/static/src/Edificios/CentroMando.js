class CentroMando extends Edificio {
	
	constructor(x, y){
		
		super(x, y);
		super.height = 2;
		super.width = 2;
		super.level = 1;
		super.sprite = 'centroDeMando';
		super.sprites = ['cdm1', 'cdm2', 'cdm3'];
		super.menuScene = 'CentroMandoMenu';
	}
}