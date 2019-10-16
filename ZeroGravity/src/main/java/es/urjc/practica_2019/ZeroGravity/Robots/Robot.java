package es.urjc.practica_2019.ZeroGravity.Robots;

import java.time.LocalDateTime;

public class Robot {

	private int vida;
	private int id;
	private int carga;
	private int nivel = 1;
	private boolean ausente;
	private LocalDateTime productionBeginTime = LocalDateTime.now();
	
	public Robot() {
		
	}
	
	public void subirNivel() {
		
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
}
