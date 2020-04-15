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
      //
      $("#dropupButton").text("Pattern");
      $("#glider").text("Glider");
      $("#smallexploder").text("Small Exploder");
      $("#exploder").text("Exploder");
      $("#tencellcolumn").text("10 Cell Column");
      $("#lightweightspaceship").text("Lightweight Spaceship");
      $("#tumbler").text("Tumbler");
      $("#gosperglidergun").text("Gosper Glider Gun");
      $("#lifeLexicon").text("Life Lexicon");
      // Mobile warning
      $("#warningword1").text("ooh!");
      $("#warningword2").text("Please use");
      $("#warningword3").text("ipad or desktop");
      $("#warningword4").html("&nbsp;to browse this website!");
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
      //
      $("#dropupButton").text("模式");
      $("#glider").text("滑翔机");
      $("#smallexploder").text("小型炸弹");
      $("#exploder").text("炸弹");
      $("#tencellcolumn").text("十细胞阵列");
      $("#lightweightspaceship").text("轻型飞船");
      $("#tumbler").text("翻筋斗杂技者");
      $("#gosperglidergun").text("高斯帕滑翔机发射器");
      $("#lifeLexicon").text("生命模式大全");
      // Mobile warning
      $("#warningword1").html("噢~");
      $("#warningword2").html("&nbsp;&nbsp;请使用&nbsp;&nbsp;");
      $("#warningword3").html("&nbsp;ipad或者电脑&nbsp;");
      $("#warningword4").html(
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浏览此网站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      );
    }
  });
});
