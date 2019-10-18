package es.urjc.practica_2019.ZeroGravity.Robots;

import java.time.LocalDateTime;

import org.bson.Document;

public class Robot {

	private int vida;
	private int id;
	private int carga;
	private int nivel = 1;
	private boolean lleno = false;
	private boolean ausente;
	private LocalDateTime productionBeginTime = LocalDateTime.now();
	
	public Robot() {
		
	}
	
	public void producir() {
		
	}
	
	public void recolectar() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getVida() {
		return vida;
	}

	public void setVida(int vida) {
		this.vida = vida;
	}

	public int getCarga() {
		return carga;
	}

	public void setCarga(int carga) {
		this.carga = carga;
	}

	public int getNivel() {
		return nivel;
	}

	public void setNivel(int nivel) {
		this.nivel = nivel;
	}
	
	public boolean levelUp() {
		if (nivel < 3) {
			nivel++;
			return true;
		}
		else {
			return false;
		}
	}

	public boolean isAusente() {
		return ausente;
	}

	public void setAusente(boolean ausente) {
		this.ausente = ausente;
	}

	public LocalDateTime getProductionBeginTime() {
		return productionBeginTime;
	}

	public void setProductionBeginTime(LocalDateTime productionBeginTime) {
		this.productionBeginTime = productionBeginTime;
	}
	
	public void setProductionBeginTime(Document date) {
		int year = date.getInteger("year");
		int month = date.getInteger("month");
		int day = date.getInteger("day");
		int hour = date.getInteger("hour");
		int minute = date.getInteger("minute");
		this.setProductionBeginTime(LocalDateTime.of(year, month, day, hour, minute));
	}

	public boolean isLleno() {
		return lleno;
	}

	public void setLleno(boolean lleno) {
		this.lleno = lleno;
	}
}
