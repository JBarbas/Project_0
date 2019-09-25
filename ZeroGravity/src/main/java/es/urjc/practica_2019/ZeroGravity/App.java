package es.urjc.practica_2019.ZeroGravity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import es.urjc.practica_2019.ZeroGravity.Clases.CentroMando;
import es.urjc.practica_2019.ZeroGravity.Clases.Edificio;
@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
		
		Edificio centroMando = new CentroMando();
		
		int[][] costes = centroMando.getCosts();
		
		for(int i = 0; i < 3; i++) {
			for(int j = 0; j < 4; j++) {
				System.out.println(costes[i][j] + ", ");
			}
		}
		
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
	}
}