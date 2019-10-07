class CentroAdministrativo extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 1;
		super.sprite = 'centroAdministrativo';
		super.menuScene = 'CentroAdministrativoMenu';
		super.originX = 0.67;
	}
}