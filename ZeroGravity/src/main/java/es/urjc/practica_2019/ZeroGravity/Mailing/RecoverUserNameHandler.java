package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.util.HashMap;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.mongodb.client.MongoCollection;

import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

@Controller
public class RecoverUserNameHandler extends MailingHandler{

	
	@Autowired
	private RecoverUserNameHandler(){
		super();
		this.subject = "UserName Recovery";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "UserNameRecover";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates	
	}
	
	public void execute(String to) {
		executor.execute(()->recoverUserName(to));
	}

	private void recoverUserName(String to) {
		//Conseguimos el nombre del usuario a partir del email
		MongoCollection<Document> mongoCollection = WebsocketGameHandler.getColl();
		Bson filterEmail = new Document("email", to);
		Document myPlayerEmail = mongoCollection.find(filterEmail).first();
		String userName = myPlayerEmail.getString("name");
		
		//Añadimos el username al mensaje y lo mandamos
		HashMap<String,String> auxHashmap =  new HashMap<String, String>(fixedContentAtributes);
		auxHashmap.put("username", userName);
		String content = MailContentBuilder.build(auxHashmap,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
	}
}
