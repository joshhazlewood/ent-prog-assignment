package com.democo.jersey.film.resources;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.democo.jersey.film.dao.FilmDao;
import com.democo.jersey.film.model.Film;

@Path("/films")
public class FilmResource {
	
	private FilmDao fdao = new FilmDao();
	
	
	//Application integration 		
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Path("/id/{id}")
	public Film getFilmById(@PathParam("id") int id) {
		Film film = fdao.getFilmByID(id);
		if(film==null)
			throw new RuntimeException("Get: film with id" + id +  " not found");
		return film;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Film> getAllFilms() {
		return fdao.getAllFilms();
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Path("/name/{name}")
	public List<Film> getFilmByName(@PathParam("name") String name) {
		List<Film> film = fdao.getFilmByTitle(name);
		if(film==null)
			throw new RuntimeException("Get: film with name" + name +  " not found");
		return film;
	}
	
	// For the browser
	@GET
	@Produces(MediaType.TEXT_XML)
	@Path("/id/{id}")
	public Film getFilmHTML(@PathParam("id") int id) {
		Film film = fdao.getFilmByID(id);
		if(film==null)
			throw new RuntimeException("Get: film with id" + id +  " not found");
		return film;
	}
	
	@GET
	@Produces(MediaType.TEXT_XML)
	@Path("/name/{name}")
	public List<Film> getFilmByNameHTML(@PathParam("name") String name) {
		List<Film> film = fdao.getFilmByTitle(name);
		if(film==null)
			throw new RuntimeException("Get: film with name" + name +  " not found");
		return film;
	}
	
	@POST
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void newFilm(
			@FormParam("title") String name,
			@FormParam("year") int year,
			@FormParam("director") String director,
			@FormParam("stars") String stars,
			@FormParam("review") String review,
			@Context HttpServletResponse servletResponse
	) throws IOException {
		Film film = new Film(name, year, director, stars, review);
		int inserted = fdao.insertFilm(film);
		if(inserted == 1) {
			servletResponse.sendRedirect("../inserted.html");
		} else {
			servletResponse.sendRedirect("../index.html");			
		}
	}



}
