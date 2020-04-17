package es.urjc.practica_2019.ZeroGravity;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {
 
    private static TemplateEngine templateEngine;
    
    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }
    
    public static String build(HashMap<String,String> contentAtributes,String layout) {
        Context context = new Context();
        for(String i:contentAtributes.keySet()) {
        	System.out.println(i+" "+contentAtributes.get(i));
        	context.setVariable(i,contentAtributes.get(i));
        }
        return templateEngine.process(layout, context);
    }
 
}
