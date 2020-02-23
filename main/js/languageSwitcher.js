$(document).ready(function() {
  $("#lgswitcherContainer").click(function() {
    // console.log("click!");
    if ($("#selector").hasClass("cn")) {
      $("#selector").attr("class", "selector en");
      $("#resetButton").attr("value", "Reset");
      $("#stopButton").attr("value", "Stop");
      $("#rateButton").attr("value", "Rate");
      switch ($("#startButton").val()) {
        case "开始":
          $("#startButton").attr("value", "Start");
          break;
        case "暂停":
          $("#startButton").attr("value", "Pause");
          break;
        case "继续":
          $("#startButton").attr("value", "Continue");
          break;
      }
      //   console.log($("#originalNumberText").text());
      $("#originalNumberText").text("Original Number: ");
      $("#remainLifesText").text("Remaining Lives: ");
      $("#evolutionTimesText").text("Evolution Times: ");
    } else {
      $("#selector").attr("class", "selector cn");
      $("#resetButton").attr("value", "重置");
      $("#stopButton").attr("value", "停止");
      $("#rateButton").attr("value", "速度");
      switch ($("#startButton").val()) {
        case "Start":
          $("#startButton").attr("value", "开始");
          break;
        case "Pause":
          $("#startButton").attr("value", "暂停");
          break;
        case "Continue":
          $("#startButton").attr("value", "继续");
          break;
      }
      $("#originalNumberText").text("初始数量： ");
      $("#remainLifesText").text("剩余生命：");
      $("#evolutionTimesText").text("进化次数：");
    }
  });
});
