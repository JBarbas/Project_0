package es.urjc.practica_2019.ZeroGravity;

import java.awt.List;
import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;

public class WebsocketGameHandler extends TextWebSocketHandler{
	
	private static final String PLAYER_ATTRIBUTE = "PLAYER";
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;
	private ObjectMapper mapper = new ObjectMapper();
	private AtomicInteger playersId = new AtomicInteger();
	
	private static MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
	private static MongoClient client = new MongoClient(new ServerAddress(), options);

	private static MongoDatabase db = client.getDatabase("POLARIS").withReadPreference(ReadPreference.secondary());
	private static MongoCollection<Document> coll = db.getCollection("Users", Document.class);
	
	public static MongoCollection<Document> getColl() {
		return coll;
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(session, ObjectId.get());
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {		
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
			
			switch (node.get("event").asText()) {
			case "LOG IN":
				player.setUsername(node.get("name").asText());
				player.setPassword(node.get("password").asText());
				Bson filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				Document myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					player.setId(myPlayer.getObjectId("_id"));
					player.updateGrid((Collection<Document>) myPlayer.get("grid"));
					player.setEdificioId(myPlayer.getInteger("edificioId", 0));
					player.updateEdificios((Collection<Document>) myPlayer.get("edificios"));
					/*player.setEnergia(myPlayer.getInteger("energia"));
					player.setMetal(myPlayer.getInteger("metal"));
					player.setCeramica(myPlayer.getInteger("ceramica"));
					player.setCreditos(myPlayer.getInteger("creditos"));
					player.setUnionCoins(myPlayer.getInteger("unionCoins"));*/
					msg.put("event", "LOGGED");
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "REGISTER":
				player.setUsername(node.get("name").asText());
				player.setEmail(node.get("email").asText());
				player.setPassword(node.get("password").asText());
				Document dbPlayer = new Document();
				dbPlayer.append("_id", player.getId());
				dbPlayer.append("name", player.getUsername());			
				dbPlayer.append("email", player.getEmail());		
				dbPlayer.append("password", player.getPassword());		
				coll.insertOne(dbPlayer);				
				msg.put("event", "LOGGED");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "ASK PLAYER INFO":
				updateInfo(player, "PLAYER INFO");
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("energia", player.getMetal());
				msg.put("metal", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "BUILD":		
				// Construimos el edificio, si se puede
				player.build(node.get("x").asInt(), node.get("y").asInt(), node.get("edificio").asText(), node.get("id").asInt());	
				// Pedimos al cliente que refresque el grid con la nueva info
				updateInfo(player, "REFRESH GRID");
				break;	
				
			case "ASK_PLAYER_RESOURCES":
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("energia", player.getMetal());
				msg.put("metal", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("unionCoins", player.getUnionCoins());
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "LEVELUP_BUILDING":
				Edificio edificio = player.getEdificio(node.get("id").asInt());
				switch(edificio.getSprite()) {
				
				case"taller":
					//energia, metal, ceramica, creditos
					Boolean canILevelUp = false;
					
					if(	player.getEnergia() >= Taller.COSTS[edificio.getLevel()-1][0] &&
						player.getMetal() >= Taller.COSTS[edificio.getLevel()-1][1] &&
						player.getCeramica() >= Taller.COSTS[edificio.getLevel()-1][2] &&
						player.getCreditos() >= Taller.COSTS[edificio.getLevel()-1][3] &&
						edificio.getLevel() < 3){
							
						canILevelUp = true;
						player.setEnergia(player.getEnergia() - Taller.COSTS[edificio.getLevel()-1][0]);
						player.setMetal(player.getMetal() - Taller.COSTS[edificio.getLevel()-1][1]);
						player.setCeramica(player.getCeramica() - Taller.COSTS[edificio.getLevel()-1][2]);
						player.setCreditos(player.getCreditos() - Taller.COSTS[edificio.getLevel()-1][3]);
						edificio.levelUp();
						player.saveEdificios();
						player.saveRecursos();
						System.out.println(player.getEdificio(node.get("id").asInt()).getLevel());
					}
					
					msg.put("event", "ANSWER_LEVELUP_BUILDING");
					msg.put("resultado", canILevelUp.toString());
					msg.put("id", node.get("id").asInt());
					player.getSession().sendMessage(new TextMessage(msg.toString()));
					break;
					
				default:
					break;
				}
				break;
				

			case "RECOLECT":
				player.recolect(node.get("id").asInt());
				break;

			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
	
	// Informa al cliente y a la BDD de una actualizacion en la informacion del jugador (Grid y edificios)
	private void updateInfo(Player player, String event) {
		ObjectNode msg = mapper.createObjectNode();
		try {
			msg.put("event", event);
			ArrayNode playerGrid = mapper.createArrayNode(); // JSON para el cliente
			int[][] grid = player.getGrid();
			for (int i = 0; i < grid.length; i++) {
				ArrayNode gridColumn = mapper.createArrayNode();
				for (int j = 0; j < grid[i].length; j++) {						
					gridColumn.add(grid[i][j]);
				}
				playerGrid.addPOJO(gridColumn);
			}
			msg.putPOJO("grid", playerGrid);
			ArrayNode arrayNodeEdificios = mapper.createArrayNode(); // JSON para el cliente
			for (Edificio e : player.getEdificios()) {
				
				ObjectNode jsonEdificio = mapper.createObjectNode();
				jsonEdificio.put("id", e.getId());
				jsonEdificio.put("x", e.getX());
				jsonEdificio.put("y", e.getY());
				if (e instanceof GeneradorRecursos) {
					jsonEdificio.put("lleno", ((GeneradorRecursos) e).isLleno());
				}
				jsonEdificio.put("sprite", e.getSprite());
				jsonEdificio.put("level", e.getLevel());
				arrayNodeEdificios.addPOJO(jsonEdificio);
				
				LinkedList<Document> dbEdificios = new LinkedList<>();// Bson para MongoDB
				Document dbEdificio = new Document();
				dbEdificio.append("id", e.getId());
				dbEdificio.append("x", e.getX());
				dbEdificio.append("y", e.getY());
				dbEdificio.append("sprite", e.getSprite());
				dbEdificio.append("nivel", e.getLevel());
				dbEdificios.add(dbEdificio);

			}
			msg.putPOJO("edificios", arrayNodeEdificios);
			// Enviamos el mensaje al cliente
			player.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		player.saveAll();
	}
}
