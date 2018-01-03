$(function() {
	$("#all-films-button-string").click(getAllFilmsAsString)
	$("#film-by-id-button-string").click(getFilmByIdAsString)
	$("#film-by-name-button-string").click(getFilmsByNameAsString)

	$("#all-films-button-json").click(getAllFilmsAsJson)
	$("#film-by-id-button-json").click(getFilmByIdAsJson)
	$("#film-by-name-button-json").click(getFilmsByNameAsJson)

	$("#all-films-button-xml").click(getAllFilmsAsXml)
	$("#film-by-id-button-xml").click(getFilmByIdAsXml)
	$("#film-by-name-button-xml").click(getFilmsByNameAsXml)
})

function getAllFilmsAsString() {
	var req = $.ajax({
		url : "getAllFilms"
	});
	req.done(function(data) {
		insertData(data, "#result-div")
	});
}

function getFilmByIdAsString() {
	var formattedUrl = "getFilmById?id=" + escape($("#filmId").val());

	var req = $.ajax({
		url : formattedUrl
	});
	req.done(function(data) {
		insertData(data, "#result-div")
	});
}

function getFilmsByNameAsString() {
	var formattedUrl = "getFilmsByName?filmname="
			+ escape($("#filmName").val());

	var req = $.ajax({
		url : formattedUrl
	});
	req.done(function(data) {
		insertData(data, "#result-div")
	});
}

function getAllFilmsAsJson() {
	var req = $.ajax({
		url : "./getAllFilms?format=json",
		dataType : "json"
	});
	req.done(function(data) {
		insertData(data, "#result-div")
	});
}

function getFilmByIdAsJson() {
	var escapedVal = escape($("#filmId").val());
	var formattedUrl = "getFilmById?format=json&id="
			+ escape($("#filmId").val());

	var req = $.ajax({
		url : formattedUrl,
		dataType : "json"
	});
	req.done(function(data) {
		insertData(data, "#result-div")
	});
}

function getFilmsByNameAsJson() {
	var formattedUrl = "getFilmsByName?format=json&name="
			+ escape($("#filmName").val());

	var req = $.ajax({
		url : formattedUrl,
		dataType : "json"
	});
	req.done(function() {
		insertData(req, "#result-div")
	});
}

function getAllFilmsAsXml() {
	var address = "getAllFilms";
	var format = "format=xml";
	
	$.ajax({
		url: address,
		method: "GET",
		data: format
	}).then(data => showXmlFilmInfo(data, "#result-div"));
}

function getFilmByIdAsXml() {
	var escapedVal = escape($("#filmId").val());
	var formattedUrl = "getFilmById?format=xml&id="
			+ escape($("#filmId").val());

	var req = $.ajax({
		url : formattedUrl,
		dataType : "xml"
	});
	req.done(function(data) {
		insertData(data, "#result-div")
	});
}

function getFilmsByNameAsXml() {
	var formattedUrl = "getFilmsByName?format=xml&name="
			+ escape($("#filmName").val());

	var req = $.ajax({
		url : formattedUrl,
		dataType : "xml"
	});
	req.done(function() {
		showXmlFilmInfo(req, "#result-div")
	});
}

function showXmlFilmInfo(data, resultRegion) {	
 	var films = data.getElementsByTagName("film");
 	var headings = new Array("id", "title", "year", "director", "stars", "review");
	var rows = new Array(films.length);
	var subElementNames = [ "id", "title", "year", "director", "stars", "review" ];
	for (var i = 0; i < films.length; i++) {
		rows[i] = getElementValues(films[i], subElementNames);
	}
	var table = getTable(headings, rows);
	insertData(table, resultRegion);
}