class CentroAdministrativo extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 1;
		super.sprite = 'centroAdministrativo';
		super.buildingSprite = 'enConstruccion2';
		super.menuScene = 'CentroAdministrativoMenu';
		super.originX = 0.67;
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}