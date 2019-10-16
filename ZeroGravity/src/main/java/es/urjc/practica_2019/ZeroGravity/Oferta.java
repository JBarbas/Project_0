package es.urjc.practica_2019.ZeroGravity;

import org.bson.types.ObjectId;

public class Oferta {

	private ObjectId id;
	private ObjectId playerId;
	private String recurso;
	private int cantidad;
	private int creditos;
	
	public Oferta(ObjectId id, ObjectId playerId, String recurso, int cantidad, int creditos) {
		
		this.id = id;
		this.playerId = playerId;
		this.recurso = recurso;
		this.cantidad = cantidad;
		this.creditos = creditos;
	}
	
	public Oferta() {;}

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public ObjectId getPlayerId() {
		return playerId;
	}

	public void setPlayerId(ObjectId playerId) {
		this.playerId = playerId;
	}

	public String getRecurso() {
		return recurso;
	}

	public void setRecurso(String recurso) {
		this.recurso = recurso;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public int getCreditos() {
		return creditos;
	}

	public void setCreditos(int creditos) {
		this.creditos = creditos;
	}
}
