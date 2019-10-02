package es.urjc.practica_2019.ZeroGravity.Edificios;

public class PlataformaExtraccion extends Edificio {

	private final static int[] nivel1 = {0, 0};
	private final static int[] nivel2 = {0, 0};
	private final static int[] nivel3 = {0, 0};
	private final static int [][] recursosGenerados = {nivel1, nivel2, nivel3};
	
	public PlataformaExtraccion(int x, int y, Edificio depends) {
		
		this.x = x;
		this.y = y;
		this.height = 0;
		this.width = 0;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "plataformaExtraccion";
	}

	@Override
	public void levelUp() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void showMenu() {
		// TODO Auto-generated method stub
		
	} 	
}
