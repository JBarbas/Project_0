package es.urjc.practica_2019.ZeroGravity.Clases;

import es.urjc.practica_2019.ZeroGravity.Interfaces.EdificioInterface;

public class Edificio  implements EdificioInterface{

	private int id;
	//costes por nivel. 
	private int[][] costs;
	private int x;
	private int y;
	private int height;
	private int width;
	private int level;
	private String sprite;
	private Edificio buildingDependsOn;	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int[][] getCosts() {
		return costs;
	}

	public void setCosts(int[][] costs) {
		this.costs = costs;
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
