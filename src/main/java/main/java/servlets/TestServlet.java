package main.java.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Produces;

import com.google.gson.Gson;

import main.java.model.User;

import javax.json.Json;
import javax.json.JsonObject;

/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/Test")
//@Path("/Test")
public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    @Produces("application/json")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Cache-Control", "no-cache");
		
		User user = new User("password","mail");
		Gson gson = new Gson();
		String str = gson.toJson(user);
		response.getWriter().append(str);
		/*
		String str = 
		        "{"
		            + "'Name': 'toto',"
		            + "'FirstName' : 'Bob',"
		            + "'email' : 'totoBob@mail.com',"
		            + "'Roles' : [{"
		                + "'admin' : 'false',"
		                + "'member' : 'false',"
		            + "}]"
		        + "}";
		response.getWriter().write(str);
		*/
		/*
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		//JSONObject json = new JSONObject();
		String str = 
			        "{"
			            + "'Name': 'toto',"
			            + "'FirstName' : 'Bob',"
			            + "'email' : 'totoBob@mail.com',"
			            + "'Roles' : [{"
			                + "'admin' : 'false',"
			                + "'member' : 'false',"
			            + "}]"
			        + "}";
		 //new JSONObject(map);
		response.getWriter().append(str);//append(request.getContextPath());
		*/
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
