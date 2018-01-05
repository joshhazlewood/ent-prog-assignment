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
	var address = "getAllFilms";
	
	$.ajax({
		url: address,
		method: "GET",
	}).then(data => { 
		showStringFilmInfo(data, "#result-div");
	}, error => {
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
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showStringFilmInfo( data, "#result-div", "No films found by that ID." );
		}, error => {
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
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showStringFilmInfo( data, "#result-div", "No films found by that name." );
		}, error => {
			alert( "Error retriving data from the server." );
		} );
	}
	
//	var formattedUrl = "getFilmsByName?filmname="
//			+ escape($("#filmName").val());
//
//	var req = $.ajax({
//		url : formattedUrl
//	});
//	req.done(function(data) {
//		insertData(data, "#result-div")
//	});
}

function getAllFilmsAsJson() {
	var address = "getAllFilms";
	var format = "format=json";
	
	$.ajax({
		url: address,
		method: "GET",
		data: format
	}).then(data => { 
		showJsonFilmInfo(data, "#result-div");
	}, error => {
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
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showJsonFilmInfo( data, "#result-div", "No films found by that ID." );
		}, error => {
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
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showJsonFilmInfo( data, "#result-div", "No films found by that name." );
		}, error => {
			alert( "Error retriving data from the server." );
		} );
	}
}

function getAllFilmsAsXml() {
	var address = "getAllFilms";
	var format = "format=xml";
	
	$.ajax({
		url: address,
		method: "GET",
		data: format
	}).then(data => { 
		showXmlFilmInfo(data, "#result-div");
	}, error => {
		alert("Error retriving data from the server.");
	});
}

function getFilmByIdAsXml() {
	var escapedVal = escape($("#filmId").val());
	var address = "getFilmById";
	var format = "format=xml&id=" + escapedVal;	
	var isnum = /^[0-9]$/.test(escapedVal);
	
	if( escapedVal == "" || !isnum ) {
		alert( "Please enter a number before searching by ID." );
		$("#filmId").val("");
	} else {
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showXmlFilmInfo( data, "#result-div", "No films found by that ID." );
		}, error => {
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
		
		$.ajax({
			url: address,
			method: "GET",
			data: format
		}).then( data => {
				showXmlFilmInfo( data, "#result-div", "No films found by that name." );
		}, reason => {
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
 		insertData(table, resultRegion); 		
 	} else {
 		alert(errorMessage);
 	}
}

function showJsonFilmInfo( data, resultRegion, errorMessage ) {
	var films = data;
	var table;
	var filmIsReturned = films[0] !== null;
	
	if( filmIsReturned === true  ) {
		table = buildHtmlTableFromJson(films);
		insertData(table, resultRegion);
	} else {
		alert(errorMessage);
	}
}

function showStringFilmInfo( data, resultRegion, errorMessage ) {
	var rawData = data;
	var filmIsFound = rawData.toString().indexOf("#") !== -1;
	
	if( filmIsFound ){
		var rowStrings = rawData.split(/[\n\r]+/);
		var headings = new Array("ID", "Title", "Year", "Director", "Stars", "Review");
		var rows = new Array(rowStrings.length-1);
		
		for(var i=0; i<rowStrings.length; i++) {
			rows[i] = rowStrings[i].split("#");
		}
		
		var table = getTable(headings, rows);
		insertData(table, resultRegion);	
	} else {
		alert(errorMessage);
	}
}











