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
		this.recursos = [[4, 2],
						[100, 30],
						[225, 60]];
		this.costes = [[2, 0],
			[2, 0],
			[2, 0]];
	}
}