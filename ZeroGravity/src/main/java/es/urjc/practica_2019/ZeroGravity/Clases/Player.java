package es.urjc.practica_2019.ZeroGravity.Clases;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player {

	private final WebSocketSession session;
	private static final int GRID_WIDTH = 20;
	private static final int GRID_HEIGHT = 20;
	private int [][] grid = new int[GRID_HEIGHT][GRID_WIDTH];
	
	public Player(WebSocketSession session) {
		this.session = session;
		this.grid = createGrid(this.grid);
	}

	public WebSocketSession getSession() {
		return session;
	}
	
	public int[][] createGrid(int[][] grid) {
		//Primera generacion, con celdas bloqueadas, desbloqueadas y bordes
		int minGridSide = Math.min(GRID_WIDTH - 2, GRID_HEIGHT - 2);
		for (int i = 0; i < GRID_HEIGHT; i++) {
			for (int j = 0; j < GRID_WIDTH; j++) {
				if (i >= minGridSide/3 + 1 && i < 2*minGridSide/3  + 1 && j >= minGridSide/3  + 1 && j < 2*minGridSide/3  + 1) {
					grid[i][j] = 0;
				}
				else if (i == 0 || i == GRID_HEIGHT - 1 || j == 0 || j == GRID_WIDTH - 1) {
					grid[i][j] = -2;
				}
				else {
					grid[i][j] = -1;
				}
			}
		}
		
		//Introducimos el Centro de Mando
		grid[GRID_HEIGHT/2][GRID_WIDTH/2] = 1;
		grid[GRID_HEIGHT/2 - 1][GRID_WIDTH/2] = -10;
		grid[GRID_HEIGHT/2 - 1][GRID_WIDTH/2 - 1] = -10;
		grid[GRID_HEIGHT/2][GRID_WIDTH/2 - 1] = -10;
		
		return grid;
	}
	
	public int[][] getGrid() {
		return this.grid;
	}
	
	public void build(int i, int j, String edificio) {
		switch (edificio) {
		case "centroOperaciones":
			if (this.grid[i][j] == 0) {
				this.grid[i][j] = 2;
				System.out.println("dentro: " + this.grid[i][j]);
			}
			break;
		default:
			break;
		}
	}
}
