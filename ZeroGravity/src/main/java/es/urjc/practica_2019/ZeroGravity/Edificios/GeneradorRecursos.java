package es.urjc.practica_2019.ZeroGravity.Edificios;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;

public class GeneradorRecursos extends Edificio {
		
	private int colonos;
	private boolean averiado;
	private boolean lleno = false;	

	
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
	
	public void producir() {
		
	}
	
	public void callbackProducir() {
		
	}
	
	public void recolectar() {
		
	}
	
	public void addColono() {
		
	}
	
	public void quitarColono() {
		
	}
}
