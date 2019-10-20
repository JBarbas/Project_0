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
		this.recursos = [[4, 20],
						[4, 20],
						[4, 20]];
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}