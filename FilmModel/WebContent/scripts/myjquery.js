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
//	console.log(isNum);
//	console.log(escapedVal);
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
	
//	var escapedVal = escape($("#filmId").val());
//	var formattedUrl = "getFilmById?format=json&id="
//			+ escape($("#filmId").val());
//
//	var req = $.ajax({
//		url : formattedUrl,
//		dataType : "json"
//	});
//	req.done(function(data) {
//		insertData(data, "#result-div")
//	});
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
	console.log("films is empty =  ");
	console.log(Object.keys(films).toString());
	console.log(Object.keys(films).toString() == "0");
	var filmFound = Object.keys(films).toString() != "0";
	console.log("film found? " + filmFound);
	if( filmFound == true  ) {
		var headings = new Array("ID", "Title", "Year", "Director", "Stars", "Review");
		var rows = new Array(films.length);
		var subElementNames = [ "id", "title", "year", "director", "stars", "review" ];
		
		var table = "<table border='1' class='ajaxTable'>\n"
		table += getTableHeadings(headings);
		
		for ( film in films ) {
			table +=  "<tr>" +
						"<td>" + films[film].id + "</td>" +
						"<td>" + films[film].title + "</td>" +
						"<td>" + films[film].year + "</td>" +
						"<td>" + films[film].director + "</td>" +
						"<td>" + films[film].stars + "</td>" +
						"<td>" + films[film].review + "</td>" +
					"</tr>\n"; 
		}
		
		table += "</table>";
		insertData(table, resultRegion);
	} else {
		alert(errorMessage);
	}
	

//	
//	for (var i = 0; i < films.length; i++) {
//		rows[i] = getValues(films[i], subElementNames[i]);
//	}

	
//	var table = getTable(headings, rows);
//	insertData(table, resultRegion); 	
		
//	console.log(rows.length);
//	console.log(films);
}

//function getValues(element, subElementNames) {
//	var values = new Array(subElementNames.length);
//	
//	for(name in subElementNames) {
//		values[i] = name.id;
//	}
//	
//	for( var i = 0; i < subElementNames.length; i++ ) {
//		var name = subElementNames[i];
//		var subElement = element[i][name];
//		values[i] = subElement;
//	}
//	return (values);
//}











