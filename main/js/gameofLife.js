/**
 * 生命游戏后台逻辑
 * @author LeslieWong & Caiyijia  https://github.com/Leslie-Wong-H/GameofLIfe
 * 实现核心逻辑
 * 动画库：JSXGraph
 * 鼠标点击自定义初始状态
 * 选择预设初始状态
 * 控制动画速度
 */

var matrix = [];
var copyMatrix = [];
var plotMatrix = [];
var matrixRow, matrixColumn;
var start = document.getElementsByClassName("start")[0];
var stop = document.getElementsByClassName("stop")[0];
var reset = document.getElementsByClassName("reset")[0];
var rate = document.getElementsByClassName("rate")[0];
var rateLabel = document.getElementsByClassName("rateLabel")[0];
var startBl = true;
var timer;
var timeInterval = 500;
var rateCounter = 1;
var originalNumber = 0;
var nLive = originalNumber;
var evolutionCount = 0;
var nAliveCnt = 0;

// 绑定开始、停止、重置、速度按钮的点击事件

function bindEvent() {
  start.onclick = function() {
    if (startBl) {
      // clearBoard();
      // matrix = [];
      main();
      startBl = false;
    }
  };

  //TO DO: Dynamically switch "start" to "pause"

  stop.onclick = function() {
    startBl = true;

    clearInterval(timer);
  };

  reset.onclick = function() {
    clearBoard();
  };

  rate.onclick = function() {
    // console.log(rateCounter);
    if (rateCounter == 1) {
      if (document.getElementsByClassName("en")[0]) {
        rateLabel.innerText = "Slow";
      } else {
        rateLabel.innerText = "慢速";
      }
      timeInterval = 1000;
      if (!startBl) {
        clearInterval(timer);
        timer = setInterval(function() {
          nextGeneration();
        }, timeInterval);
      }
      setTimeout(function() {
        rateLabel.innerText = "";
      }, 500);
      rateCounter++;
      // (function () {
      //     var x = "Hello!!";      // 我将调用自己
      // })();
      // timer = setInterval(function () {
      //     nextGeneration()
      // }, timeInterval);
    } else if (rateCounter == 2) {
      if (document.getElementsByClassName("en")[0]) {
        rateLabel.innerText = "Fast";
      } else {
        rateLabel.innerText = "快速";
      }
      timeInterval = 250;
      if (!startBl) {
        clearInterval(timer);
        timer = setInterval(function() {
          nextGeneration();
        }, timeInterval);
      }
      setTimeout(function() {
        rateLabel.innerText = "";
      }, 500);
      rateCounter++;
      // lb.innerText = "Discount offer of 20% on all products";
    } else if (rateCounter == 3) {
      if (document.getElementsByClassName("en")[0]) {
        rateLabel.innerText = "Medium";
      } else {
        rateLabel.innerText = "中速";
      }
      timeInterval = 500;
      if (!startBl) {
        clearInterval(timer);
        timer = setInterval(function() {
          nextGeneration();
        }, timeInterval);
      }
      setTimeout(function() {
        rateLabel.innerText = "";
      }, 500);
      rateCounter = 1;
    }
  };
}

bindEvent();

//生成随机矩阵（deprecated)
//初始化细胞矩阵

function init() {
  for (let i = 0; i <= 30; i++) {
    matrix[i] = [];
    for (let j = 0; j <= 40; j++) {
      // if (Math.random() * 100 <= 20) {
      //   matrix[i][j] = 1;
      //   originalNumber++;
      // } else {
      matrix[i][j] = 0;
      // }
    }
  }
  // console.log(matrix[0].length);
}

init();

// 初始化20*20画板(deprecated)
// 初始化40*30画板(misunderstood)
// 初始化41*31画板

var board = JXG.JSXGraph.initBoard("box", {
  boundingbox: [0, 0, -40, -30],
  keepaspectratio: true,
  axis: true,
  grid: true,
  showCopyright: true,
  shownavigation: false,
  pan: {
    //panning interaction(i.e.moving the origin)
    enabled: false, // disallow panning
    needTwoFingers: false, // panning could not be done with two fingers on touch devices
    needShift: false // mouse panning needs pressing of the shift key
  }
});

// incubated from code at http://jsxgraph.org/wiki/index.php/Browser_event_and_coordinates
// mouse click event function

// user clicked point matrix
var initialPlotMatrix = new Array();
for (i = 0; i < matrix.length; i++) {
  initialPlotMatrix[i] = new Array();
  for (j = 0; j < matrix[0].length; j++) {
    initialPlotMatrix[i][j] = "";
  }
}

var getMouseCoords = function(e, i) {
    var cPos = board.getCoordsTopLeftCorner(e, i),
      absPos = JXG.getPosition(e, i),
      dx = Math.round(absPos[0] - cPos[0]),
      dy = Math.round(absPos[1] - cPos[1]);

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
  },
  down = function(e) {
    var canCreate = true,
      i,
      coords,
      el;

    // if (e[JXG.touchProperty]) {
    //   // index of the finger that is used to extract the coordinates = [];
    //   coordinates.push();
    //   i = 0;
    // }
    coords = getMouseCoords(e, i);
    // console.log(coords);
    for (el in board.objects) {
      if (
        JXG.isPoint(board.objects[el]) &&
        board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])
      ) {
        canCreate = false;
        break;
      }
    }

    if (canCreate) {
      var x = Math.round(coords.usrCoords[1]),
        y = Math.round(coords.usrCoords[2]);
      initialPlotMatrix[-y][-x] = board.create("point", [x, y], {
        size: 8,
        name: "",
        fixed: true,
        showinfobox: false
      });
      matrix[-y][-x] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
      // console.log(matrix[-y].length);
    }
  };

board.on("down", down);

function main() {
  // init();

  var i = 0,
    j = 0;
  nLive = originalNumber;
  // var evolutionCount = 0;
  // var nAliveCnt = 0;

  // 显示初始活细胞数量
  document.getElementById("originalNumber").innerHTML = originalNumber;
  // 剩余生命初始化
  document.getElementById("remainLifes").innerHTML = nLive;

  matrixRow = matrix.length;
  matrixColumn = matrix[0].length;

  // var numberDisplayStack = [];

  //克隆二维数组
  copyMatrix = new Array();
  for (i = 0; i < matrixRow; i++) {
    copyMatrix[i] = new Array();

    for (j = 0; j < matrixColumn; j++) {
      // if (matrix[i][j] == 1) {
      //     nLive = nLive + 1;
      // }
      copyMatrix[i][j] = matrix[i][j];
    }
  }

  //生成绘图记录二维数组
  plotMatrix = new Array();
  for (i = 0; i < matrixRow; i++) {
    plotMatrix[i] = new Array();

    for (j = 0; j < matrixColumn; j++) {
      plotMatrix[i][j] = "";
    }
  }

  //绘制初代细胞分布情况
  board.suspendUpdate();
  for (i = 0; i < matrixRow; i++) {
    for (j = 0; j < matrixColumn; j++) {
      if (matrix[i][j] == 1) {
        board.removeObject(initialPlotMatrix[i][j]);
        initialPlotMatrix[i][j] = "";
        plotMatrix[i][j] = board.create("point", [-j, -i], {
          size: 8,
          name: "",
          fixed: true
        });
      }
    }
  }
  board.unsuspendUpdate();

  // //显示初始存活细胞数目
  // // var strLiveNumber = str(nLive);
  // numberDisplayStack.push(board.create('text', [-11, -1, 'Live Cells Number:'], {
  //     fontSize: 30
  // }));
  // numberDisplayStack.push(board.create('text', [-18, -1, nLive], {
  //     fontSize: 28
  // }));

  // setInterval(function(){JXG.JSXGraph.freeBoard(board)},2000);

  timer = setInterval(function() {
    nextGeneration();
  }, timeInterval);
}

function nextGeneration() {
  // board.removeObject(numberDisplayStack[numberDisplayStack.length - 1]);
  // numberDisplayStack.pop();

  // 判断下一代细胞分布
  for (i = 0; i < matrixRow; i++) {
    for (j = 0; j < matrixColumn; j++) {
      //周围细胞数置零
      nAliveCnt = 0;

      //判断细胞周围九宫格

      //判断左上角细胞状态
      if (i - 1 >= 0 && j - 1 >= 0 && matrix[i - 1][j - 1] == 1) {
        nAliveCnt++;
      }

      //判断上方细胞状态
      if (i - 1 >= 0 && matrix[i - 1][j] == 1) {
        nAliveCnt++;
      }

      //判断右上角细胞状态
      if (i - 1 >= 0 && j + 1 < matrixColumn && matrix[i - 1][j + 1] == 1) {
        nAliveCnt++;
      }

      //判断左细胞状态
      if (j - 1 >= 0 && matrix[i][j - 1] == 1) {
        nAliveCnt++;
      }

      //判断右细胞状态

      if (j + 1 < matrixColumn && matrix[i][j + 1] == 1) {
        nAliveCnt++;
      }

      //判断左下角细胞状态
      if (i + 1 < matrixRow && j - 1 >= 0 && matrix[i + 1][j - 1] == 1)
        if (matrix[i + 1][j - 1] == 1) {
          nAliveCnt++;
        }

      // 判断下方细胞状态
      if (i + 1 < matrixRow && matrix[i + 1][j] == 1) {
        nAliveCnt++;
      }

      // 判断右下角细胞状态

      if (
        i + 1 < matrixRow &&
        j + 1 < matrixColumn &&
        matrix[i + 1][j + 1] == 1
      ) {
        nAliveCnt++;
      }

      // 判断细胞下一代死活情况

      //Live
      if (matrix[i][j] == 1) {
        if (nAliveCnt == 2 || nAliveCnt == 3) {
          copyMatrix[i][j] = 1;
        } else {
          copyMatrix[i][j] = 0;
          nLive--;
        }
      }

      //Dead
      if (matrix[i][j] == 0) {
        if (nAliveCnt == 3) {
          copyMatrix[i][j] = 1;
          nLive++;
        }
      }
    }
  }

  //将下一代细胞分布情况从克隆二维数组赋值回原始二维数组,并绘图
  board.suspendUpdate();
  for (i = 0; i < matrixRow; i++) {
    for (j = 0; j < matrixColumn; j++) {
      matrix[i][j] = copyMatrix[i][j];
      if (matrix[i][j] == 1) {
        if (plotMatrix[i][j] != "") {
          board.removeObject(plotMatrix[i][j]);
        }
        plotMatrix[i][j] = board.create("point", [-j, -i], {
          size: 8,
          name: "",
          fixed: true
        });
      } else {
        board.removeObject(plotMatrix[i][j]);
        plotMatrix[i][j] = "";
      }
    }
  }
  board.unsuspendUpdate();

  // 更新剩余生命和进化次数
  evolutionCount++;
  document.getElementById("remainLifes").innerHTML = nLive;
  // numberDisplayStack.push(board.create('text', [-18, -1, nLive], {
  //     fontSize: 28
  // }));
  if (nLive != 0) {
    document.getElementById("evolutionTimes").innerHTML = evolutionCount;
  } else {
    // startBl = true;
    clearInterval(timer);
    board = JXG.JSXGraph.initBoard("box", {
      boundingbox: [0, 0, -40, -30],
      keepaspectratio: true,
      axis: true,
      grid: true,
      showCopyright: true,
      shownavigation: false,
      pan: {
        //panning interaction(i.e.moving the origin)
        enabled: false, // disallow panning
        needTwoFingers: false, // panning could not be done with two fingers on touch devices
        needShift: false // mouse panning needs pressing of the shift key
      }
    });
  }
}

// function changeTimeInterval() {

// }

function clearBoard() {
  clearInterval(timer);
  board = JXG.JSXGraph.initBoard("box", {
    boundingbox: [0, 0, -40, -30],
    keepaspectratio: true,
    axis: true,
    grid: true,
    showCopyright: true,
    shownavigation: false,
    pan: {
      //panning interaction(i.e.moving the origin)
      enabled: false, // disallow panning
      needTwoFingers: false, // panning could not be done with two fingers on touch devices
      needShift: false // mouse panning needs pressing of the shift key
    }
  });
  board.suspendUpdate();
  for (let i = 0; i < matrixRow; i++) {
    for (let j = 0; j < matrixColumn; j++) {
      matrix[i][j] = 0;
      if (initialPlotMatrix[i][j] != "") {
        board.removeObject(initialPlotMatrix[i][j]);
        initialPlotMatrix[i][j] = "";
      }
      if (plotMatrix[i][j] != "") {
        board.removeObject(plotMatrix[i][j]);
        plotMatrix[i][j] = "";
      }
    }
  }
  board.unsuspendUpdate();

  // } else {
  //   console.log("yeah");
  //   clearInterval(timer);
  //   board.suspendUpdate();
  //   for (let i = 0; i < matrixRow; i++) {
  //     for (let j = 0; j < matrixColumn; j++) {
  //       matrix[i][j] = 0;
  //       board.removeObject(plotMatrix[i][j]);
  //       plotMatrix[i][j] = "";
  //     }
  //   }
  //   board.unsuspendUpdate();
  // }

  startBl = true;

  // 初始生命、剩余生命、进化次数置零
  document.getElementById("originalNumber").innerHTML = 0;
  document.getElementById("remainLifes").innerHTML = 0;
  document.getElementById("evolutionTimes").innerHTML = 0;
  originalNumber = 0;
  nLive = originalNumber;
  evolutionCount = 0;
  nAliveCnt = 0;
}
