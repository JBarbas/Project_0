package es.urjc.practica_2019.ZeroGravity.Clases;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player {

	private final WebSocketSession session;
	private static final int GRID_WIDTH = 32;
	private static final int GRID_HEIGHT = 32;
	private int [][] grid = null;
	
	public Player(WebSocketSession session) {
		this.session = session;
	}

	public WebSocketSession getSession() {
		return session;
	}
	
	public int[][] getGrid() {
		if (this.grid == null) {
			this.grid = new int[GRID_HEIGHT][GRID_WIDTH];
			int minGridSide = Math.min(GRID_WIDTH - 2, GRID_HEIGHT - 2);
			for (int i = 0; i < GRID_HEIGHT; i++) {
				for (int j = 0; j < GRID_WIDTH; j++) {
					if (i >= minGridSide/3 + 1 && i < 2*minGridSide/3  + 1 && j >= minGridSide/3  + 1 && j < 2*minGridSide/3  + 1) {
						this.grid[i][j] = 0;
					}
					else if (i == 0 || i == GRID_HEIGHT - 1 || j == 0 || j == GRID_WIDTH - 1) {
						this.grid[i][j] = -2;
					}
					else {
						this.grid[i][j] = -1;
					}
				}
			}
		}
		return this.grid;
	}
}
