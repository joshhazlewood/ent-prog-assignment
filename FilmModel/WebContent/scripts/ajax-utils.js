// Get the browser-specific request object, either for
// Firefox, Safari, Opera, Mozilla, Netscape, or IE 7 (top entry);
// or for Internet Explorer 5 and 6 (bottom entry). 

function getRequestObject() {
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	} else if (window.ActiveXObject) {
		return (new ActiveXObject("Microsoft.XMLHTTP"));
	} else {
		return (null);
	}
}

// Insert the html data into the element
// that has the specified id.

function htmlInsert(id, htmlData) {
	document.getElementById(id).innerHTML = htmlData;
}

function insertData(filmData, resultRegion) {
	$(resultRegion).html(filmData);
}

// Return escaped value of textfield that has given id.
// The builtin "escape" function url-encodes characters.

function getValue(id) {
	return (escape(document.getElementById(id).value));
}

// Generalized version of ajaxResultPost. In this
// version, you pass in a response handler function
// instead of just a result region.

function ajaxPost(address, data, responseHandler) {
	var request = getRequestObject();
	request.onreadystatechange = function() {
		responseHandler(request);
	};
	request.open("POST", address, true);
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	request.send(data);
}

// Given an element, returns the body content.

function getBodyContent(element) {
	element.normalize();
	return (element.childNodes[0].nodeValue);
}

// Given a doc and the name of an XML element, returns an
// array of the values of all elements with that name.
// E.g., for
// <foo><a>one</a><q>two</q><a>three</a></foo>
// getXmlValues(doc, "a") would return
// ["one", "three"].

function getXmlValues(xmlDocument, xmlElementName) {
	var elementArray = xmlDocument.getElementsByTagName(xmlElementName);
	var valueArray = new Array();
	for (var i = 0; i < elementArray.length; i++) {
		valueArray[i] = getBodyContent(elementArray[i]);
	}
	return (valueArray);
}

// Given an element object and an array of sub-element names,
// returns an array of the values of the sub-elements.
// E.g., for <foo><a>one</a><c>two</c><b>three</b></foo>,
// if the element points at foo,
// getElementValues(element, ["a", "b", "c"]) would return
// ["one", "three", "two"]

function getElementValues(element, subElementNames) {
	var values = new Array(subElementNames.length);
	for (var i = 0; i < subElementNames.length; i++) {
		var name = subElementNames[i];
		var subElement = element.getElementsByTagName(name)[0];
		values[i] = getBodyContent(subElement);
	}
	return (values);
}

// Takes as input an array of headings (to go into th elements)
// and an array-of-arrays of rows (to go into td
// elements). Builds an xhtml table from the data.

function getTable(headings, rows) {
	var table = "<table class=\"table table-bordered\">\n"
			+ getTableHeadings(headings) + getTableBody(rows) + "</table>";
	return (table);
}

function getTableHeadings(headings) {
	var firstRow = "  <tr>";
	for (var i = 0; i < headings.length; i++) {
		firstRow += "<th>" + headings[i] + "</th>";
	}
	firstRow += "</tr>\n";
	return (firstRow);
}

function getTableBody(rows) {
	var body = "";
	for (var i = 0; i < rows.length; i++) {
		body += "  <tr>";
		var row = rows[i];
		for (var j = 0; j < row.length; j++) {
			body += "<td>" + row[j] + "</td>";
		}
		body += "</tr>\n";
	}
	return (body);
}

function buildHtmlTableFromJson(films) {
	var headings = new Array("ID", "Title", "Year", "Director", "Stars",
			"Review");
	var rows = new Array(films.length);
	var subElementNames = [ "id", "title", "year", "director", "stars",
			"review" ];

	var table = "<table class=\"table table-bordered\">\n"
	table += getTableHeadings(headings);

	for (film in films) {
		table += "<tr>" + "<td>" + films[film].id + "</td>" + "<td>"
				+ films[film].title + "</td>" + "<td>" + films[film].year
				+ "</td>" + "<td>" + films[film].director + "</td>" + "<td>"
				+ films[film].stars + "</td>" + "<td>" + films[film].review
				+ "</td>" + "</tr>\n";
	}

	table += "</table>";
	return table;
}

function showWorkingGif() {
	$("#result-div").empty();
	$("#working").show();
}

function hideWorkingGif() {
	$("#working").hide();
}
