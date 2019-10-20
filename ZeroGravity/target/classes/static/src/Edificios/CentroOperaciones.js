class CentroOperaciones extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.sprite = 'centroOperaciones';
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'CentroOperacionesMenu';
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}