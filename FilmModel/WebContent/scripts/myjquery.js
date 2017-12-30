$(function() {
	$("#all-films-button-string").click(getAllFilmsAsString)
	$("#film-by-id-button-string").click(getFilmByIdAsString)
	$("#film-by-name-button-string").click(getFilmsByNameAsString)

	$("#all-films-button-json").click(getAllFilmsAsJson)
	$("#film-by-id-button-json").click(getFilmByIdAsJson)
	$("#film-by-name-button-json").click(getFilmsByNameAsJson)

//	$("#all-films-button-xml").click(getAllFilmsAsXml)
//	$("#film-by-id-button-xml").click(getFilmByIdAsXml)
//	$("#film-by-name-button-xml").click(getFilmsByNameAsXml)
})

function insertData(filmData, resultRegion) {
	console.log("trying to insert");
	$(resultRegion).html(filmData);
}

function getAllFilmsAsString() {
	$.ajax({
		url: "./Controller",
		success: function(data) { insertData(data, "#result-div") }
	});
}

function getFilmByIdAsString() {
	var formattedUrl = "Controller?id=" + escape($("#filmId").val());

	$.ajax({
		url: formattedUrl,
		success: function(data) { insertData(data, "#result-div") }
	});
}

function getFilmsByNameAsString() {
	var formattedUrl = "Controller?filmname=" + escape($("#filmName").val());

	$.ajax({
		url: formattedUrl,
		success: function(data) { insertData(data, "#result-div") }
	});
}

function getAllFilmsAsJson() {
	$.ajax({
		url: "./Controller?format=json",
		success: function(data) { insertData(data, "#result-div") },
		dataType: "json"
	});
}

function getFilmByIdAsJson() {
	var escapedVal = escape($("#filmId").val());
	console.log(escapedVal);
	var formattedUrl = "Controller?format=json&id=" + escape($("#filmId").val());
	console.log(formattedUrl);

	$.ajax({
		url: formattedUrl,
		success: function(data) { insertData(data, "#result-div") },
		dataType: "json"
	});
}

function getFilmsByNameAsJson() {
	var formattedUrl = "Controller?format=json&filmname=" + escape($("#filmName").val());

	$.ajax({
		url: formattedUrl,
		success: function(data) { insertData(data, "#result-div") },
		dataType: "json"
	});
}

function popUpNumber() {
	function showNum(num) { alert(num); }
	$.ajax({ url: "./random-num.jsp", success: function(num, code){
		showNum(num);
	}});
}

function insertNumber() {
	function insertNum(num, resultRegion) {
		$(resultRegion).html(num);
	}
	$.ajax({ url: "./random-num.jsp", success: function(num){
		insertNum(num, "#num-result");
	}});
}

function sendNames() {
	function insertNames(name, resultRegion) {
		$(resultRegion).html(name)
	}
	$.ajax({ url: "./names.jsp", data: "name1=Joe&name2=Jame&name3=John", success: function(name){
		insertNames(name, "#div-1");
	}});
}

function showNames() {
	function insertNames(name, resultRegion) {
		$(resultRegion).html(name)
	}
	var queryString = "name1=" + escape($("#field-1").val())
		+ "&name2=" + escape($("#field-2").val())
		+  "&name3=" + escape($("#field-3").val());
	$.ajax({ url: "./names.jsp", data: queryString, success: function(name) {
		insertNames(name, "#div-1");
	}});
}

function showNamesSerialize() {
	function insertNames(name, resultRegion) {
		$(resultRegion).html(name)
	}
	$.ajax({ url: "./names.jsp", data: $("#names-form").serialize(), success: function(name) {
		insertNames(name, "#div-1");
	}});
}

function showNamesLoad() {
	function insertNames(name, resultRegion) {
		$(resultRegion).html(name)
	}
	$("#div-1").load("names.jsp", $("#names-form").serialize());
}
