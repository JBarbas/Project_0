package es.urjc.practica_2019.ZeroGravity.Clases;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player {

	private final WebSocketSession session;
	
	public Player(WebSocketSession session) {
		this.session = session;
	}

	public WebSocketSession getSession() {
		return session;
	}
}
