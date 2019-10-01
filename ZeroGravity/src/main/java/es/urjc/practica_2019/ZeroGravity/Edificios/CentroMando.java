package es.urjc.practica_2019.ZeroGravity.Edificios;

public class CentroMando extends Edificio {

	//Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	private static final int[] nivel1 = {1, 0, 0, 0};
	private static final int[] nivel2 = {2, 0, 0, 0};
	private static final int[] nivel3 = {3, 0, 0, 0};
	private static final int[][] costs = {nivel1, nivel2, nivel3};
	
	public CentroMando(int x, int y) {
		
		this.x = x;
		this.y = y;
		this.height = 2;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroMando";
	}
	
	@Override
	public boolean build(float x, float y) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean move(float x, float y) {
		// TODO Auto-generated method stub
		return false;
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
