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

function getAllFilmsAsString() {
	var address = "getAllFilms";
	
	showWorkingGif();
	$.ajax({
		url: address,
		method: "GET",
	}).then(data => { 
		showStringFilmInfo(data, "#result-div");
	}, error => {
		$("#working").hide();
		alert("Error retriving data from the server.");
	});
}

function getFilmByIdAsString() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "id=" + escapedVal.toString();	
	var isNum = /^[0-9]+$/.test(escapedVal);

	if( escapedVal == "" || !isNum ) {
		alert( "Please enter a number before searching by ID." );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showStringFilmInfo( data, "#result-div", "No films found by that ID." );
		}, error => {
			$("#working").hide();
			alert( "Error retriving data from the server." );
		} );
	}
}

function getFilmsByNameAsString() {
	var escapedVal = escape($("#filmName").val());
	var address = "getFilmsByName";
	var format = "name=" + escapedVal.toString();	

	if( escapedVal === "" ) {
		alert( "Please enter a number before searching by ID." );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showStringFilmInfo( data, "#result-div", "No films found by that name." );
		}, error => {
			$("#working").hide();
			alert( "Error retriving data from the server." );
		} );
	}
}

function getAllFilmsAsJson() {
	var address = "getAllFilms";
	var format = "format=json";
	
	showWorkingGif();
	$.ajax({
		url: address,
		method: "GET",
		data: format
	}).then(data => { 
		showJsonFilmInfo(data, "#result-div", "", "id");
	}, error => {
		$("#working").hide();
		alert("Error retriving data from the server.");
	});
}

function getFilmByIdAsJson() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "format=json&id=" + escapedVal.toString();	
	var isNum = /^[0-9]+$/.test(escapedVal);

	if( escapedVal == "" || !isNum ) {
		alert( "Please enter a number before searching by ID." );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showJsonFilmInfo( data, "#result-div", "No films found by that ID.", "id" );
		}, error => {
			$("#working").hide();
			alert( "Error retriving data from the server." );
		} );
	}
}

function getFilmsByNameAsJson() {
	var escapedVal = escape($("#filmName").val());
	var address = "getFilmsByName";
	var format = "format=json&name=" + escapedVal.toString();	

	if( escapedVal === "" ) {
		alert( "Please enter a number before searching by ID." );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showJsonFilmInfo( data, "#result-div", "No films found by that name.", "name" );
		}, error => {
			$("#working").hide();
			alert( "Error retriving data from the server." );
		} );
	}
}

function getAllFilmsAsXml() {
	var address = "getAllFilms";
	var format = "format=xml";
	
	showWorkingGif();
	$.ajax({
		url: address,
		method: "GET",
		data: format
	}).then(data => { 
		showXmlFilmInfo(data, "#result-div");
	}, error => {
		$("#working").hide();
		alert("Error retriving data from the server.");
	});
}

function getFilmByIdAsXml() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "format=xml&id=" + escapedVal;	
	var isnum = /^[0-9]+$/.test(escapedVal);
	
	if( escapedVal == "" || !isnum ) {
		alert( "Please enter a number before searching by ID." );
		$("#filmId").val("");
	} else {
		showWorkingGif();
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showXmlFilmInfo( data, "#result-div", "No films found by that ID." );
		}, error => {
			$("#working").hide();
			alert( "Error retriving data from the server." );
		} );
	}
}

function getFilmsByNameAsXml() {
	var escapedVal = escape($("#filmName").val());
	
	if(escapedVal == "") {
		alert( "Please enter a value before searching by name." );
	} else {
		var address = "getFilmsByName";
		var format = "format=xml&name=" + escapedVal;
		
		showWorkingGif();
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showXmlFilmInfo( data, "#result-div", "No films found by that name." );
		}, reason => {
			$("#working").hide();
			alert( "Error retriving data from the server." );
		} );
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
 		$("#working").hide();
 		insertData(table, resultRegion); 		
 	} else {
 		$("#working").hide();
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
		$("#working").hide();
		insertData(table, resultRegion);
	} else {
		$("#working").hide();
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
		showWorkingGif();
		$.ajax({
			url: address,
			method: "POST",
			data: filmData
		}).then(data => { 
			$("#working").hide();
			alert("Film was correctly inserted into the database.")
		}, error => {
			$("#working").hide();
			alert("Error inserting data from the server.");
		});
	} else {
		alert("Form is invalid, number fields must be 1-8 in length and other 1-100.");
	}

}

function checkFormIsValid() {
	var id = escape($("#insertId").val());
	var title = escape($("#insertName").val());
	var year = escape($("#insertYear").val());
	var director = escape($("#insertDirector").val());
	var stars = escape($("#insertStars").val());
	var review = escape($("#insertReview").val());
	
	var numbersValid = isValidNumber(id) && isValidNumber(year);
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











