$(function() {
	$("#num-button-1").click(popUpNumber)
})

$(function() {
	$("#num-button-2").click(insertNumber)
})

$(function() {
	$("#names-button").click(showNames)
})

$(function() {
	$("#names-button-2").click(showNamesSerialize)
})

$(function() {
	$("#names-button-3").click(showNamesLoad)
})

function popUpNumber() {
	function showNum(num) { alert(num); }	
	$.ajax({ url: "./random-num.jsp", success: function(num, code){
		showNum(num)
	}})
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