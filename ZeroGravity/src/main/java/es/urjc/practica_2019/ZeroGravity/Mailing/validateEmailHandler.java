package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;
import java.util.concurrent.Executors;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;

import com.mongodb.client.MongoCollection;

import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;


@Controller
public class validateEmailHandler extends MailingHandler{
	
	@Autowired
	private validateEmailHandler(){
		super();
		this.subject = "Validate Email";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "ConfirmEmail";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates	
	}
		 
	public void execute(String to) {
		executor.execute(()->validateEmailHandler(to));
	}
	
	private void validateEmailHandler(String to) {
	
		//Añadimos la contraseña al mensaje y lo mandamos
		HashMap<String,String> auxHashmap =  new HashMap<String, String>(fixedContentAtributes);
		
		String content = MailContentBuilder.build(auxHashmap,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
	}
}
