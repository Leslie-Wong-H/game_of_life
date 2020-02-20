$(document).ready(function() {
  $("#container").click(function() {
    // console.log("click!");
    if ($("#selector").hasClass("cn")) {
      $("#selector").attr("class", "selector en");
    } else {
      $("#selector").attr("class", "selector cn");
    }
  });
});
