import javax.enterprise.context.RequestScoped;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;


@RequestScoped
@Path("JAXRS")
@Produces({ "application/xml", "application/json" })
@Consumes({ "application/xml", "application/json" })

//@ApplicationPath("/JAXRS")
//public class JAXRSTest extends Application { }

public class JAXRSTest extends Application {

	@Path("/testjax")
	@GET
	public String testMethod(){

	    return "Hello World";
	}	
	/*
	@GET
	@Produces("application/json")
	public Todo getJSON() {
		Todo todo = new Todo(1,"test","description");
		return todo;
	}
	*/
}
