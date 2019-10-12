package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;

public class GeneradorRecursos extends Edificio {
		
	private int colonos;
	private boolean averiado;
	private boolean lleno = false;	
	private boolean produciendo = false;
	private LocalDateTime productionBeginTime = LocalDateTime.now();

	
	public GeneradorRecursos() {
		
	}

	public int getColonos() {
		return colonos;
	}

	public void setColonos(int colonos) {
		this.colonos = colonos;
	}

	public boolean isAveriado() {
		return averiado;
	}

	public void setAveriado(boolean averiado) {
		this.averiado = averiado;
	}

	public boolean isLleno() {
		return lleno;
	}

	public void setLleno(boolean lleno) {
		this.lleno = lleno;
	}
	
	public boolean isProduciendo() {
		return produciendo;
	}

	public void setProduciendo(boolean produciendo) {
		this.produciendo = produciendo;
	}

	public LocalDateTime getProductionBeginTime() {
		return productionBeginTime;
	}

	public void setProductionBeginTime(LocalDateTime productionBeginTime) {
		this.productionBeginTime = productionBeginTime;
	}

	public void producir() {
		
	}
	
	public void callbackProducir() {
		
	}
	
	public void recolectar() {
		
	}
	
	public void addColono() {
		colonos++;
	}
	
	public void quitarColono() {
		colonos--;
	}
}
