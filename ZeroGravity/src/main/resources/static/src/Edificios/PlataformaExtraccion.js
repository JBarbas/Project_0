class PlataformaExtraccion extends GeneradorRecursos{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.sprite = 'plataformaExtraccion';
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'PlataformaExtraccionMenu';
		super.resourceSprite = 'clayIcon';
		this.recursos = [[4, 2],
						[100, 30],
						[225, 60]];
		this.costes = [[2, 0],
			[2, 0],
			[2, 0]];
	}
}