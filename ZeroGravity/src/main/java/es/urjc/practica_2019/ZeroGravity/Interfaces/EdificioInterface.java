package es.urjc.practica_2019.ZeroGravity.Interfaces;

public interface EdificioInterface {

	public int[][] build(int[][] grid, int x, int y);
	
	public boolean move(int x, int y);
	
	public void levelUp();
	
	public void showMenu();
	
}
