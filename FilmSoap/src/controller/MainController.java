package controller;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import com.google.gson.Gson;

import model.Film;
import model.FilmDAO;

public class MainController {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		FilmDAO fdao = FilmDAO.getInstance();

		ArrayList<Film> films = fdao.getAllFilms();

		for(int i = 0; i < films.size(); i++) {
			Film oneFilm = films.get(i);
//			System.out.println(oneFilm.toString());
		}

		Gson gson = new Gson();
		String allFilmsJson = gson.toJson(films);

		ArrayList<Film> f = fdao.getFilmByID(10013);
		System.out.println(f.toString());
		System.out.println(gson.toJson(f));

	}

}
