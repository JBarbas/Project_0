package es.urjc.practica_2019.ZeroGravity.Edificios;

public class CentroComercio extends Edificio {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	private static final int[] nivel1 = { 1, 0, 0, 0 };
	private static final int[] nivel2 = { 2, 0, 0, 0 };
	private static final int[] nivel3 = { 3, 0, 0, 0 };
	private static final int[][] costs = { nivel1, nivel2, nivel3 };

	public CentroComercio(int x, int y, Edificio depends) {

		this.x = x;
		this.y = y;
		this.height = 0;
		this.width = 0;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "centroComercio";
	}

	@Override
	public void levelUp() {
		// TODO Auto-generated method stub

	}

	@Override
	public void showMenu() {
		// TODO Auto-generated method stub

	}

	public void mostrarOfertas() {

	}

	public void ofrecerIntercambio() {

	}

	public void aceptarIntercambio() {

	}
}
