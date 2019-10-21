class BloqueViviendas extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.sprite = 'bloqueViviendas';
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'BloqueViviendasMenu';
		this.costes = [[2, 0],
			[2, 0],
			[2, 0]];
	}
}