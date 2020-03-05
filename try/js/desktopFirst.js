$(document).ready(function() {
  var windowWidth = $("body").width();
  //   console.log(windowWidth);
  if (windowWidth < 768) {
    $("#firstRow").attr(
      "style",
      "min-height: 768px; height: 100vh;display:none;"
    );
    $("#secondRow").attr("style", "height: 100vh;");
  }
});
