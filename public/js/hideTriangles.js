$(document).ready(function () {
  var windowWidth = $("body").width();
  //   console.log(windowWidth);
  if (windowWidth > 425) {
    // $("#firstRow").attr(
    //   "style",
    //   "min-height: 768px; height: 100vh;display:none;"
    // );
    // $("#secondRow").attr("style", "height: 100vh;");
    // $("#rulesDescriptionModal").attr("style", "display: none;");
    $("marker").attr("style", "visibility: hidden;");
    // $("#box_jxgBoard1L7").attr("style", "display: none;");
  }
});
