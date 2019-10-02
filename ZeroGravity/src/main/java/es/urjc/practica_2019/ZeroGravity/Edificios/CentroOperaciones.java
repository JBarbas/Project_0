package es.urjc.practica_2019.ZeroGravity.Edificios;

public class CentroOperaciones extends Edificio {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	private static final int[] nivel1 = { 0, 0, 0, 0 };
	private static final int[] nivel2 = { 0, 0, 0, 0 };
	private static final int[] nivel3 = { 0, 0, 0, 0 };
	private static final int[][] costs = { nivel1, nivel2, nivel3 };

	public CentroOperaciones(int x, int y, Edificio depends, int id) {

		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "centroOperaciones";
	}
	
	public CentroOperaciones(int id) {
		
		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroOperaciones";
	}

	@Override
	public boolean move(int x, int y) {
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

	public void mostrarMisiones() {

	}

	public void apuntarseMisiones() {

	}
}
