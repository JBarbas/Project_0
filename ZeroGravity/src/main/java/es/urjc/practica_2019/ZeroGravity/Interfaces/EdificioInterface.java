package es.urjc.practica_2019.ZeroGravity.Interfaces;

public interface EdificioInterface {

	public int[][] build(int[][] grid, int x, int y);
	
	public int[][] move(int[][] grid, int x, int y);
	
	public void levelUp();
	
	public void showMenu();
	
}
