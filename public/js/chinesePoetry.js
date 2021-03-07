$(document).ready(function () {
  $("#poetry-data-display").click(function () {
    $.ajax({
      url: "https://playgameoflife.live/tang.json",
      type: "get",
    }).done(function (data) {
      var len = data.English.content.length;
      // take even index except the last one
      var startIndex = Math.floor(Math.random() * (len / 2)) * 2;
      // display sentences in responsive language
      var sentenceOne;
      var sentenceTwo;
      if ($("#selector").hasClass("cn")) {
        sentenceOne = data.Chinese.content[startIndex];
        sentenceTwo = data.Chinese.content[startIndex + 1];
      } else {
        sentenceOne = data.English.content[startIndex];
        sentenceTwo = data.English.content[startIndex + 1];
      }
      var detail;
      var pattern = /\w/;
      if (
        sentenceOne
          .slice(sentenceOne.length - 1, sentenceOne.length)
          .match(pattern)
      ) {
        detail = sentenceOne + ";&nbsp;" + sentenceTwo;
      } else {
        detail = sentenceOne + "&nbsp;" + sentenceTwo;
      }
      // display text with animation
      $("#poetry-data-box").attr("style", "display: none;");
      $("#poetry-data-box").html(detail);
      $("#poetry-data-box").fadeIn();
      // store data for languageSwitcher
      var stringifiedData = startIndex + JSON.stringify(data);
      $("#poetry-data-store").text(stringifiedData);
    });
  });
  $("#poetry-data-display").trigger("click");
});
