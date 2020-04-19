package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;

import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;

@Controller
public class ConfirmEmailHandler extends MailingHandler {
	
	@Autowired
	private ConfirmEmailHandler() {
		super();
		this.subject = "Confirm Email";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "ConfirmEmail";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates
		
		fixedContentAtributes.put("check", "check");
		fixedResourcesEmbebed.put("check",new ClassPathResource("mailing/images/check.png"));
	}

	public void execute(String to) {
		executor.execute(()->ConfirmEmail(to));
	}

	private void ConfirmEmail(String to) {
		String content = MailContentBuilder.build(fixedContentAtributes,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
	}
	
	
}
