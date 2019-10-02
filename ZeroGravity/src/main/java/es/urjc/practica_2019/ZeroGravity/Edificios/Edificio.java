package es.urjc.practica_2019.ZeroGravity.Edificios;

import es.urjc.practica_2019.ZeroGravity.Interfaces.EdificioInterface;

public class Edificio  implements EdificioInterface{

	protected int id; 
	protected int x;
	protected int y;
	protected int height;
	protected int width;
	protected int level;
	protected String sprite;
	protected Edificio buildingDependsOn;	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getSprite() {
		return sprite;
	}

	public void setSprite(String sprite) {
		this.sprite = sprite;
	}

	public Edificio getBuildingDependsOn() {
		return buildingDependsOn;
	}

	public void setBuildingDependsOn(Edificio buildingDependsOn) {
		this.buildingDependsOn = buildingDependsOn;
	}

	public void Edificio() {}

	@Override
	public int[][] build(int[][] grid, int x, int y) {
		for (int i = y-this.height+1; i <= y; i++) {
			for (int j = x-this.width+1; j <= x; j++) {
				if (i > 0 && i < grid.length) {
					if (j > 0 && j < grid[i].length) {
						if (grid[i][j] == 0) {
							grid[i][j] = this.id;
						}
						else {
							return null;
						}
					}
				}
			}
		}
		return grid;
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
}
