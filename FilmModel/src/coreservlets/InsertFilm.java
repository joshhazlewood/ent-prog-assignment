package coreservlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Film;
import model.FilmDAO;

/**
 * Servlet implementation class InsertFilm
 */
@WebServlet("/insertFilm")
public class InsertFilm extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public InsertFilm() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at: ").append(request.getContextPath());



	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
//		doGet(request, response);
		FilmDAO fdao = new FilmDAO();

		String title = request.getParameter("title");
		String year = request.getParameter("year");
		String director = request.getParameter("director");
		String stars = request.getParameter("stars");
		String review = request.getParameter("review");

		try {
			int yearAsInt = Integer.parseInt(year);

			Film filmToInsert = new Film(title, yearAsInt, director, stars, review);
			int result = fdao.insertFilm(filmToInsert);
			response.setContentType("text/plain");
			
			if(result == 1) {
				response.getWriter().println("Inserted");
				System.out.println("Film was correctly inserted into the database.");
			} else {
				response.getWriter().println("NotInserted");
				System.out.println("Film was not correctly inserted into the database.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
