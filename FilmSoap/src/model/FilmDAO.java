package model;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.*;

public class FilmDAO {

	Film oneFilm = null;
	Connection conn = null;
	Statement stmt = null;
	
	private static FilmDAO fdao = new FilmDAO();

	private FilmDAO() {
	}
	
	public static FilmDAO getInstance( ) {
	      return fdao;
	}

	private void openConnection() {
		// loading jdbc driver for mysql
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (Exception e) {
			System.out.println(e);
		}

		// connecting to database
		try {
			// connection string for demos database, username demos, password demos
			conn = DriverManager
					.getConnection("jdbc:mysql://mudfoot.doc.stu.mmu.ac.uk:3306/hazlewoj?user=hazlewoj&password=quIsreng4");
//			conn = DriverManager
//					.getConnection("jdbc:mysql://localhost:3306/filmdata?user=root&password=Pa55word!");
//			conn = DriverManager
//					.getConnection("jdbc:mysql://jh-13118866-ent-prog.c3xzfdg8vm4w.eu-west-2.rds.amazonaws.com:3306/film_data?user=joshhaz&password=Pa55word!");
			stmt = conn.createStatement();
		} catch (SQLException se) {
			System.out.println(se);
		}
	}

	private void closeConnection() {
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private Film getNextFilm(ResultSet rs) {
		Film thisFilm = null;
		try {
			thisFilm = new Film(rs.getInt("id"), rs.getString("title"), rs.getInt("year"), rs.getString("director"),
					rs.getString("stars"), rs.getString("review"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return thisFilm;
	}

	public ArrayList<Film> getAllFilms() {

		ArrayList<Film> allFilms = new ArrayList<Film>();
		openConnection();

		// Create select statement and execute it
		try {
			String selectSQL = "select * from films";
			ResultSet rs1 = stmt.executeQuery(selectSQL);
			// Retrieve the results
			while (rs1.next()) {
				oneFilm = getNextFilm(rs1);
				allFilms.add(oneFilm);
			}

			stmt.close();
		} catch (SQLException se) {
			System.out.println(se);
		} finally {
			closeConnection();
		}

		return allFilms;
	}

	public ArrayList<Film> getFilmByID(int id) {

		openConnection();
		oneFilm = null;
		// Create select statement and execute it
		try {
			String selectSQL = "select * from films where id=" + id;
			ResultSet rs1 = stmt.executeQuery(selectSQL);
			// Retrieve the results
			while (rs1.next()) {
				oneFilm = getNextFilm(rs1);
			}

			stmt.close();
		} catch (SQLException se) {
			System.out.println(se);
		} finally {
			closeConnection();
		}
		ArrayList<Film> filmToReturn = new ArrayList<Film>();
		filmToReturn.add(oneFilm);
		return filmToReturn;
	}

	public ArrayList<Film> getFilmByTitle(String filmTitle) {

		ArrayList<Film> possibleFilms = new ArrayList<Film>();
		openConnection();

		// Create select statement and execute it
		try {
			String selectSQL = "select * from films where title LIKE \"%" + filmTitle + "%\"";
			ResultSet rs1 = stmt.executeQuery(selectSQL);
			// Retrieve the results
			while (rs1.next()) {
				oneFilm = getNextFilm(rs1);
				possibleFilms.add(oneFilm);
			}

			stmt.close();
		} catch (SQLException se) {
			System.out.println(se);
		} finally {
			closeConnection();
		}

		return possibleFilms;
	}

	public int insertFilm(Film f) {
		int id = getNextId();
		String title = f.getTitle();
		int year = f.getYear();
		String director = f.getDirector();
		String stars = f.getStars();
		String review = f.getReview();

		try {
			openConnection();
			String insertSQL = "insert into films values (" + "\"" + id + "\"" + "," + "\""
					+ title + "\"" + "," + "\"" + year + "\"" + "," + "\"" + director + "\"" + "," + "\""
					+ stars + "\"" + "," + "\"" + review + "\"" + ")";
			int result = stmt.executeUpdate(insertSQL);
			return result;
		} catch (SQLException se) {
			System.out.println(se);
		} finally {
			closeConnection();
		}
		return 0;
	}
	
	public int getNextId() {
		
		try {
			openConnection();
			String maxIdSQL = "SELECT MAX(id) AS id FROM films;";
			ResultSet rs1 = stmt.executeQuery(maxIdSQL);
			int result = 0;
			while(rs1.next()) {
				result = rs1.getInt("id");				
			}
			return result + 1;
		} catch (SQLException se) {
			System.out.println(se);
		} finally {
			closeConnection();
		}
		return 0;
	}

}
