class BloqueViviendas extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 0;
		super.numColonos = 0;
		super.sprite = 'bloqueViviendas';
		super.sprites = ['apartamentos1', 'apartamentos1', 'apartamentos1', 'apartamentos1',
			'apartamentos2', 'apartamentos2', 'apartamentos2', 'apartamentos2', 'apartamentos2',
			'apartamentos3', 'apartamentos3', 'apartamentos3', 'apartamentos3', 'apartamentos3',
			'apartamentos4'];
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'BloqueViviendasMenu';
		super.listImage = 'assets/sprites/Edificios/Edificio_Viviendas.png';
		super.nameEsp = 'Bloque de viviendas';
		super.nameEng = 'Block of apartments';
		this.costes = [[2, 0],
					[11, 0],
					[28, 0],
					[52, 0],
					[84, 0],
					[122, 0],
					[169, 0],
					[222, 0],
					[283, 0],
					[351, 0],
					[427, 0],
					[510, 0],
					[600, 0],
					[698, 0],
					[803, 0]];
	}
}