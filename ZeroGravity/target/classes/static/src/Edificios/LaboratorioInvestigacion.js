class LaboratorioInvestigacion extends GeneradorRecursos {
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 1;
		super.sprite = 'laboratorioInvestigacion';
		super.buildingSprite = 'enConstruccion2';
		super.menuScene = 'LaboratorioInvestigacionMenu';
		super.resourceSprite = 'creditIcon';
		super.originX = 0.67;
		this.recursos = [[4, 5],
						[4, 20],
						[4, 20]];
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}