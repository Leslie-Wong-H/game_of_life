$(document).ready(function () {
  $("#lgswitcherContainer").click(function () {
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
      $("#random").text("Random");
      $("#glider").text("Glider");
      $("#smallexploder").text("Small Exploder");
      $("#exploder").text("Exploder");
      $("#tencellcolumn").text("10 Cell Column");
      $("#lightweightspaceship").text("Lightweight Spaceship");
      $("#tumbler").text("Tumbler");
      $("#gosperglidergun").text("Gosper Glider Gun");
      $("#lifeLexicon").text("Life Lexicon");
      // Mobile warning
      $("#warningword1").text("Oops!");
      $("#warningword2").text("Please use");
      $("#warningword3").text("ipad or desktop");
      $("#warningword4").html("&nbsp;to browse this website!");
      // Algorithm description modal message
      $("#descriptionModalLabel").text("Game of Life Algorithm Description");
      $("#descriptionContentParagraphOne").text(
        "The Game of Life is a cellular automation devised by the mathematician John Horton Conway from Cambridge University. It came to become well-known for the article published at Scientific American in 1970."
      );
      $("#descriptionContentParagraphTwo").text(
        "Rules of the Game of Life: The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive and dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:"
      );
      $("#descriptionContentParagraphThree").text(
        "For a box with a live cell:"
      );
      $("#descriptionContentParagraphFour").text(
        "There existing fewer than two live neighbors, the cell dies, due to loneliness."
      );
      $("#descriptionContentParagraphFive").text(
        "There existing more than three live neighbors, the cell dies, due to crowding."
      );
      $("#descriptionContentParagraphSix").text(
        "There existing two or three live neighbors, the cell lives on to the next generation."
      );
      $("#descriptionContentParagraphSeven").text(
        "For an empty box or a box with a dead cell:"
      );
      $("#descriptionContentParagraphEight").text(
        "There existing three neighbors, the box generates a new live cell, as if by reproduction."
      );
      $("#modalBtnContent").text("Understood & Close");
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
      $("#random").text("随机");
      $("#glider").text("滑翔机");
      $("#smallexploder").text("小型炸弹");
      $("#exploder").text("炸弹");
      $("#tencellcolumn").text("十细胞阵列");
      $("#lightweightspaceship").text("轻型飞船");
      $("#tumbler").text("翻筋斗杂技者");
      $("#gosperglidergun").text("高斯帕滑翔机发射器");
      $("#lifeLexicon").text("生命模式大全");
      // Mobile warning
      $("#warningword1").html("噢~~");
      $("#warningword2").html("&nbsp;&nbsp;请使用&nbsp;&nbsp;");
      $("#warningword3").html("&nbsp;ipad或者电脑&nbsp;");
      $("#warningword4").html(
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浏览此网站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      );
      // Algorithm description modal message
      $("#descriptionModalLabel").text("生命游戏");
      $("#descriptionContentParagraphOne").text(
        "生命游戏又称细胞自动机，反映了生命演化的规则。它由剑桥大学的数学家约翰·康威所提出，并且借由 1970 年发表在《科学美国人》上的文章而变得出名。"
      );
      $("#descriptionContentParagraphTwo").text(
        "生命游戏原理：生命生活在二维环境中，每个生命生活在一个方格中，每个细胞在下一个时刻的状态取决于周围 8 个细胞的活着或死了的状态。"
      );
      $("#descriptionContentParagraphThree").text("对于一个存在活细胞的方格：");
      $("#descriptionContentParagraphFour").text(
        "周围有 1 个或无活细胞的话，由于孤独，细胞死亡；"
      );
      $("#descriptionContentParagraphFive").text(
        "周围有 4 个以上活细胞的话，由于拥挤， 细胞死亡；"
      );
      $("#descriptionContentParagraphSix").text(
        "周围存在 2 或 3 个活细胞的话，活细胞存活。"
      );
      $("#descriptionContentParagraphSeven").text(
        "对于一个空方格或存在死亡细胞的方格："
      );
      $("#descriptionContentParagraphEight").text(
        "周围有 3 个活细胞的话，方格有活细胞生成。"
      );
      $("#modalBtnContent").text("已知晓");
    }
  });
});
