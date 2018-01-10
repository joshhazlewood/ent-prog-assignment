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
	
	$("#insert-film-button").click(insertFilm)
})

var nameErrorMessage = "No films found by that name.";
var idErrorMessage = "No film found by that ID.";
var nameValidationErrorMessage = "No films found by that name.";
var idMissingErrorMessage = "Please enter a number before searching by ID.";
var nameMissingErrorMessage = "Please enter a value before searching by name.";
var serverErrorMessage = "Error retriving data from the server.";

var resultDiv = "#result-div"

function getAllFilmsAsString() {
	var address = "getAllFilms";
	
	showWorkingGif();
	ajaxRequest(address, "", "string");
}

function getFilmByIdAsString() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "id=" + escapedVal.toString();	
	var isNum = /^[0-9]+$/.test(escapedVal);

	if( escapedVal == "" || !isNum ) {
		alert( idMissingErrorMessage );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		ajaxRequest(address, format, "string", idErrorMessage);
	}
}

function getFilmsByNameAsString() {
	var escapedVal = escape($("#filmName").val());
	var address = "getFilmsByName";
	var format = "name=" + escapedVal.toString();	

	if( escapedVal === "" ) {
		alert( nameMissingErrorMessage );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		ajaxRequest(address, format, "string", nameErrorMessage);
	}
}

function getAllFilmsAsJson() {
	var address = "getAllFilms";
	var format = "format=json";
	
	showWorkingGif();
	ajaxRequest(address, format, "json", "", "id");
}

function getFilmByIdAsJson() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "format=json&id=" + escapedVal.toString();	
	var isNum = /^[0-9]+$/.test(escapedVal);

	if( escapedVal == "" || !isNum ) {
		alert( idMissingErrorMessage );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		ajaxRequest(address, format, "json", idErrorMessage, "id");
	}
}

function getFilmsByNameAsJson() {
	var escapedVal = escape($("#filmName").val());
	var address = "getFilmsByName";
	var format = "format=json&name=" + escapedVal.toString();	

	if( escapedVal === "" ) {
		alert( nameMissingErrorMessage );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		ajaxRequest(address, format, "json", nameErrorMessage, "name");
	}
}

function getAllFilmsAsXml() {
	var address = "getAllFilms";
	var format = "format=xml";
	
	showWorkingGif();
	ajaxRequest(address, format, "xml");
}

function getFilmByIdAsXml() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "format=xml&id=" + escapedVal;	
	var isnum = /^[0-9]+$/.test(escapedVal);
	
	if( escapedVal == "" || !isnum ) {
		alert( idMissingErrorMessage );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		ajaxRequest(address, format, "xml", idErrorMessage);
	}
}

function getFilmsByNameAsXml() {
	var escapedVal = escape($("#filmName").val());
	
	if(escapedVal == "") {
		alert( nameMissingErrorMessage );
	} else {
		var address = "getFilmsByName";
		var format = "format=xml&name=" + escapedVal;
		
		showWorkingGif();
		ajaxRequest(address, format, "xml", nameErrorMessage);
	}	
}

function showXmlFilmInfo( data, resultRegion, errorMessage ) {
 	var films = data.getElementsByTagName("film");
 	
 	if( films.length != 0 ) {
 		var headings = new Array("ID", "Title", "Year", "Director", "Stars", "Review");
 		var rows = new Array(films.length);
 		var subElementNames = [ "id", "title", "year", "director", "stars", "review" ];
 		
 		for (var i = 0; i < films.length; i++) {
 			rows[i] = getElementValues(films[i], subElementNames);
 		}
 		
 		var table = getTable(headings, rows);
 		hideWorkingGif();
 		insertData(table, resultRegion); 		
 	} else {
 		hideWorkingGif();
 		alert(errorMessage);
 	}
}

function showJsonFilmInfo( data, resultRegion, errorMessage, apiType ) {
	var films = data;
	var table;
	var filmIsReturned
	
	if(apiType === "id") {
		filmIsReturned = films[0] !== null;
	} else if(apiType === "name") {
		filmIsReturned = films.length !== 0;
	} else {
		filmIsReturned = true;
	}
	
	if( filmIsReturned === true  ) {
		table = buildHtmlTableFromJson(films);
		hideWorkingGif();
		insertData(table, resultRegion);
	} else {
		hideWorkingGif();
		alert(errorMessage);
	}
}

function showStringFilmInfo( data, resultRegion, errorMessage ) {
	var rawData = data;
	var filmIsFound = rawData.toString().indexOf("#") !== -1;
	
	if( filmIsFound ){
		var rowStrings = rawData.split(/[\n\r]+/);
		var headings = new Array("ID", "Title", "Year", "Director", "Stars", "Review");
		var rows = new Array(rowStrings.length-2);
		
		for(var i=0; i<rowStrings.length-1; i++) {
			rows[i] = rowStrings[i].split("#");
		}
		var table = getTable(headings, rows);
		$("#working").hide();
		insertData(table, resultRegion);	
	} else {
		$("#working").hide();
		alert(errorMessage);
	}
}

function insertFilm() {
	var address = "insertFilm";
	
	var formIsValid = checkFormIsValid();
	var filmData = $("#insert-form").serialize();
	
	if(formIsValid) {
		showWorkingGif("insert");
		$.ajax({
			url: address,
			method: "POST",
			data: filmData
		}).then(data => { 
			hideWorkingGif("insert");
			clearInputFields();
			alert("Film was correctly inserted into the database.")
		}, error => {
			hideWorkingGif("insert");
			alert("Error inserting film into the database.");
		});
	} else {
		alert("Form is invalid, number fields must be 1-8 in length and other 1-100.");
	}

}

function ajaxRequest(address, format, dataType, errorMsg, apiType) {
	
	switch(dataType) {
    case "xml":
    	$.ajax({
    		url: address,
    		method: "GET",
    		data: format
    	}).then(data => { 
    		showXmlFilmInfo(data, resultDiv, errorMsg);
    	}, error => {
    		hideWorkingGif();
    		alert( serverErrorMessage );
    	});
        break;
    case "json":
    	$.ajax({
    		url: address,
    		method: "GET",
    		data: format
    	}).then(data => { 
    		showJsonFilmInfo(data, resultDiv, errorMsg, apiType);
    	}, error => {
    		hideWorkingGif();
    		alert( serverErrorMessage );
    	});
        break;
    default:
    	$.ajax({
    		url: address,
    		method: "GET",
    		data: format
    	}).then(data => { 
    		showStringFilmInfo(data, resultDiv, errorMsg);
    	}, error => {
    		hideWorkingGif();
    		alert( serverErrorMessage );
    	});
	}
}

function checkFormIsValid() {
//	var id = escape($("#insertId").val());
	var title = escape($("#insertName").val());
	var year = escape($("#insertYear").val());
	var director = escape($("#insertDirector").val());
	var stars = escape($("#insertStars").val());
	var review = escape($("#insertReview").val());
	
	var numbersValid = isValidNumber(year);
	var stringsValid = isValidString(title) && isValidString(director) && 
		isValidString(stars) && isValidString(review)
		
	if( numbersValid && stringsValid ) {
		return true;
	} else {
		return false;
	}
	
}

function isValidNumber(value) {
	var isValidNum = /^[0-9]{1,8}$/.test(value);
	return isValidNum;
}

function isValidString(value) {
	var isValidString = /^.{1,100}$/.test(value);
	return isValidString;
}











