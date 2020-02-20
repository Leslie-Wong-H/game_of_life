$(document).ready(function() {
  $("#container").click(function() {
    // console.log("click!");
    if ($("#selector").hasClass("cn")) {
      $("#selector").attr("class", "selector en");
      $("#resetButton").attr("value", "Reset");
      $("#startButton").attr("value", "Start");
      $("#stopButton").attr("value", "Stop");
      $("#rateButton").attr("value", "Rate");
      //   console.log($("#originalNumberText").text());
      $("#originalNumberText").text("Original Number: ");
      $("#remainLifesText").text("Remaining Lives: ");
      $("#evolutionTimesText").text("Evolution Times: ");
    } else {
      $("#selector").attr("class", "selector cn");
      $("#resetButton").attr("value", "重置");
      $("#startButton").attr("value", "开始");
      $("#stopButton").attr("value", "停止");
      $("#rateButton").attr("value", "速度");
      $("#originalNumberText").text("初始数量： ");
      $("#remainLifesText").text("剩余生命：");
      $("#evolutionTimesText").text("进化次数：");
    }
  });
});
