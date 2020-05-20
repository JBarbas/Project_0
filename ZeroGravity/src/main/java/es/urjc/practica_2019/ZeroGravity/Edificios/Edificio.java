package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.time.LocalDateTime;

import org.bson.Document;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Interfaces.EdificioInterface;

public class Edificio  implements EdificioInterface{

	protected int maxLevel = 3;
	protected int id; 
	protected Player player;
	protected int x;
	protected int y;
	protected int height;
	protected int width;
	protected int level;
	protected String sprite;
	protected Edificio buildingDependsOn;	
	protected boolean enConstruccion;
	protected LocalDateTime buildingBeginTime = LocalDateTime.now();
	protected int energia;
	
	public int[] getPosition() {
		int[] position = {x, y};
		return position;
	}
	
	public void setPosition(int x, int y) {
		this.x = x;
		this.y = y;
	}
	
	public int getMaxLevel() {
		return this.maxLevel;
	}
	
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
					else {
						return null;
					}
				}
				else {
					return null;
				}
			}
		}
		return grid;
	}

	@Override
	public int[][] move(int[][] grid, int x, int y) {
		for (int i = this.y-this.height+1; i <= this.y; i++) {
			for (int j = this.x-this.width+1; j <= this.x; j++) {
				if (i > 0 && i < grid.length) {
					if (j > 0 && j < grid[i].length) {
						grid[i][j] = 0;
					}
				}
			}
		}
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
					else {
						return null;
					}
				}
				else {
					return null;
				}
			}
		}
		return grid;
	}

	public void levelUp() {

		this.setLevel(this.getLevel()+1);
	}

	public void showMenu() {
		// TODO Auto-generated method stub
		
	}
	
	public boolean needsEnergy() {
		return false;
	}
	
	public void addEnergy() {
		energia++;
	}
	
	public int getEnergia() {
		return energia;
	}
	
	public void setEnergia(int energia) {
		this.energia = energia;
	}

	public boolean isEnConstruccion() {
		return enConstruccion;
	}

	public void setEnConstruccion(boolean enConstruccion) {
		this.enConstruccion = enConstruccion;
	}

	public LocalDateTime getBuildingBeginTime() {
		return buildingBeginTime;
	}

	public void setBuildingBeginTime(LocalDateTime buildingBeginTime) {
		this.buildingBeginTime = buildingBeginTime;
	}
	
	public void setBuildingBeginTime(Document buildingDate) {

		int year = buildingDate.getInteger("year");
		int month = buildingDate.getInteger("month");
		int day = buildingDate.getInteger("day");
		int hour = buildingDate.getInteger("hour");
		int minute = buildingDate.getInteger("minute");
		this.setBuildingBeginTime(LocalDateTime.of(year, month, day, hour, minute));
	}
	
	public void logInUpdate() {
		
	}
}
