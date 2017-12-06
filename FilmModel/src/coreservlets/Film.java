package coreservlets;

import java.util.*;

public class Film {
	private String filmId, filmName, filmCredits, filmReview;
	private int filmYear, filmDuration;
	
	public String getFilmId() {
		return filmId;
	}
	
	public void setFilmId(String filmId) {
		this.filmId = filmId;
	}
	
	public String getFilmName() {
		return filmName;
	}
	
	public void setFilmName(String filmName) {
		this.filmName = filmName;
	}
	
	public String getFilmCredits() {
		return filmCredits;
	}
	
	public void setFilmCredits(String filmCredits) {
		this.filmCredits = filmCredits;
	}
	
	public String getFilmReview() {
		return filmReview;
	}
	
	public void setFilmReview(String filmReview) {
		this.filmReview = filmReview;
	}
	
	public int getFilmYear() {
		return filmYear;
	}
	
	public void setFilmYear(int filmYear) {
		this.filmYear = filmYear;
	}
	
	public int getFilmDuration() {
		return filmDuration;
	}
	
	public void setFilmDuration(int filmDuration) {
		this.filmDuration = filmDuration;
	}

	@Override
	public String toString() {
		return "Film [filmId=" + filmId + ", filmName=" + filmName + ", filmCredits=" + filmCredits + ", filmReview="
				+ filmReview + ", filmYear=" + filmYear + ", filmDuration=" + filmDuration + "]";
	}
}           
