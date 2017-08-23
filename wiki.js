/*$(document).ready(function() {

})

$(#search).on("click", fuction() {
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json")
});*/
var searchData = {
  titles: [],
  snippet: []
};

function Callback() {
  var titleHTML = "<ol class='list'>";
  for (var i = 0; i < 10; i++) {
    titleHTML += "<li><a href='https://en.wikipedia.org/wiki/" + searchData.titles[i] + "'" + ">" + searchData.titles[i] + "</a>: " + searchData.snippet[i] + "</li>";
  }
  titleHTML += "</ol>"
  $("p").html(titleHTML);
}

$(document).ready(function () {
  $(".search").on("click", function() {
    $.ajax({
      dataType: "json",
      url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + document.getElementById("search").value + "&callback=?",
      async: false,
      success: function(json) {
        for (var i = 0; i < 10; i++) {
          searchData.titles.push(json.query.search[i].title);
          searchData.snippet.push(json.query.search[i].snippet);
        };
        return Callback();
    }});

  });
});
