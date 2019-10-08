package es.urjc.practica_2019.ZeroGravity.Robots;

public class RobotEspecial extends Robot {

	// coste Metal, coste UnionCoins, vidaMax, fuerza, capacidadCarga, duracion
	private final int[] nivel1 = { 0, 0, 0, 0, 0, 0 };
	private final int[] nivel2 = { 0, 0, 0, 0, 0, 0 };
	private final int[] nivel3 = { 0, 0, 0, 0, 0, 0 };
	private final int[][] infoPorNivel = { nivel1, nivel2, nivel3 };

	@Override
	public void recolectar() {

	}

	@Override
	public void subirNivel() {

	}
}
