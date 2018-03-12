/* CSS animation and ajax */
$(".search").submit(function(event) {
	event.preventDefault();
	var keyword = $("#trigger").val();
	if (keyword !== "") {
		$(".box").css({
			"top": "100px",
			"width": "100%",
			"border-radius": "0px",
			"transition":
				"top 0.5s ease-in-out, width 0.5s 0.5s ease-in-out, border-radius 1s 0.5s ease-in-out"
		});
		$(".display-results").css({
			"left": "0px",
			"transition": "left 1s 1s ease-in-out"
		});
		$(".display-results").html("");
		ajax(keyword);
	}
});

/* https://www.mediawiki.org/wiki/API:Search_and_discovery */
function ajax(keyword) {
	$.ajax({
		url: "https://en.wikipedia.org/w/api.php",
		data: {
			action: "query",
			list: "search",
			srsearch: keyword,
			format: "json",
			formatversion: 2
		},
		dataType: "jsonp",
		success: function(x) {
			console.log(x.query);
			showResults(x);
		}
	});
}

/* Create 10 divs and populate each with an entry. */
function showResults(callback) {
	for (var i = 0; i < 10; i++) {
		$(".display-results").append(
			"<div class='result-box result-" +
				i +
				"'>" +
				"<span class='result-title title-" +
				i +
				"'></span>" +
				"<br>" +
				"<span class='result-snippet snippet-" +
				i +
				"'></span>" +
				"</div>"
		);
		var title = callback.query.search[i].title;
		var url = title.replace(/ /g, "_");
		$(".title-" + i).html(
			"<a href='https://en.wikipedia.org/wiki/" +
				url +
				"' target='_blank'>" +
				callback.query.search[i].title +
				"</a>"
		);
		$(".snippet-" + i).html(callback.query.search[i].snippet);
	}
}
