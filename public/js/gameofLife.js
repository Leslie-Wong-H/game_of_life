/**
 * Backend logic of the Game of Life
 * @author LeslieWong & Caiyijia  https://github.com/Leslie-Wong-H/GameofLIfe
 * Achieve the main logic
 * Animation library：JSXGraph
 * Able to custom initial state with mouse
 * Able to set the initial state in advance
 * Able to take control of the animation rate
 */

var matrix = [];
// var initialPlotMatrix = [];
var copyMatrix = [];
var plotMatrix = [];
var matrixRow, matrixColumn;
var start = document.getElementsByClassName("start")[0];

// var stop = document.getElementsByClassName("stop")[0];
var random = document.getElementById("random");
var glider = document.getElementById("glider");
var smallexploder = document.getElementById("smallexploder");
var exploder = document.getElementById("exploder");

var tencellcolumn = document.getElementById("tencellcolumn");

var lightweightspaceship = document.getElementById("lightweightspaceship");
var tumbler = document.getElementById("tumbler");

var gosperglidergun = document.getElementById("gosperglidergun");

var reset = document.getElementsByClassName("reset")[0];
var rate = document.getElementsByClassName("rate")[0];
var rateLabel = document.getElementsByClassName("rateLabel")[0];
var startBl = true;
var timer;
var timeInterval = 300;
var rateCounter = 1;
var originalNumber = 0;
var nLive = originalNumber;
var evolutionCount = 0;
var nAliveCnt = 0;

var cellSize = window.innerWidth < 1500 ? 6 : 8;

// Bind the click events with start, pause, continue, reset and rate buttons

function bindEvent() {
  start.onclick = function () {
    startbuttonclicked();
  };

  //TO DO（Done): Dynamically switch "start" to "pause"

  // stop.onclick = function() {
  //   startBl = true;

  //   clearInterval(timer);
  // };

  // start of click event of items of pattern button group
  random.onclick = function () {
    randompatternselected();
  };

  glider.onclick = function () {
    gliderpatternselected();
  };
  smallexploder.onclick = function () {
    smallexploderpatternselected();
  };
  exploder.onclick = function () {
    exploderpatternselected();
  };
  tencellcolumn.onclick = function () {
    tencellcolumnpatternselected();
  };
  lightweightspaceship.onclick = function () {
    lightweightspaceshippatternselected();
  };
  tumbler.onclick = function () {
    tumblerpatternselected();
  };
  gosperglidergun.onclick = function () {
    gosperglidergunpatternselected();
  };
  // end of click event of items of pattern button group

  reset.onclick = function () {
    clearBoard();
    // clearBoard(); //  try fix the bug of invalid clcik   ---（wrong fix, now resovle, 2020.04.25)
  };

  rate.onclick = function () {
    ratebuttonclicked();
  };
}

bindEvent();

// Initialize 20*20 board(deprecated)
// Initialize 40*30 board(misunderstood)
// Initialize 41*31 board

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
    needShift: false, // mouse panning needs pressing of the shift key
  },
  zoom: {
    factorX: 1, // horizontal zoom factor (multiplied to JXG.Board#zoomX)
    factorY: 1, // vertical zoom factor (multiplied to JXG.Board#zoomY)
    wheel: false, // allow zooming by mouse wheel or
    // by pinch-to-toom gesture on touch devices
    needShift: true, // mouse wheel zooming needs pressing of the shift key
    min: 1, // minimal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomOut
    max: 1, // maximal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomIn
    pinchHorizontal: false, // Allow pinch-to-zoom to zoom only horizontal axis
    pinchVertical: false, // Allow pinch-to-zoom to zoom only vertical axis
    pinchSensitivity: 0, // Sensitivity (in degrees) for recognizing horizontal or vertical pinch-to-zoom gestures.
  },
});

//Generate random matrix（deprecated)
//Initialize cell matrix

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
  //Generate plot matrix
  plotMatrix = new Array();
  for (i = 0; i <= 30; i++) {
    plotMatrix[i] = new Array();
    for (j = 0; j <= 40; j++) {
      plotMatrix[i][j] = "";
    }
  }

  matrixRow = matrix.length;
  matrixColumn = matrix[0].length;
  // console.log(plotMatrix);
}

init();
// Initial mournJohnConway pattern instead of blank board.
// See the bottom for function detail
mournJohnConwaypatterninitialized();

// incubated from code at http://jsxgraph.org/wiki/index.php/Browser_event_and_coordinates
// mouse click event function

var getMouseCoords = function (e, i) {
    var cPos = board.getCoordsTopLeftCorner(e, i),
      absPos = JXG.getPosition(e, i),
      dx = Math.round(absPos[0] - cPos[0]),
      dy = Math.round(absPos[1] - cPos[1]);
    // dx = absPos[0] - cPos[0],
    // dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
  },
  down = function (e) {
    var canCreate = true,
      i,
      coords,
      el;

    if (e[JXG.touchProperty]) {
      // index of the finger that is used to extract the coordinates
      i = 0;
    }

    coords = getMouseCoords(e, i);
    var x = Math.round(coords.usrCoords[1]),
      y = Math.round(coords.usrCoords[2]);
    // console.log(coords);
    for (el in board.objects) {
      if (
        JXG.isPoint(board.objects[el]) &&
        board.objects[el].hasPoint(
          Math.round(coords.scrCoords[1]),
          Math.round(coords.scrCoords[2])
        )
      ) {
        board.removeObject(el);
        plotMatrix[-y][-x] = "";
        matrix[-y][-x] = 0;
        originalNumber--;
        document.getElementById("originalNumber").innerHTML = originalNumber;
        canCreate = false;
        break;
      }
    }

    if (canCreate) {
      if (plotMatrix[-y][-x] == "") {
        plotMatrix[-y][-x] = board.create("point", [x, y], {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        });
        matrix[-y][-x] = 1;
        originalNumber++;
        document.getElementById("originalNumber").innerHTML = originalNumber;
        // console.log(matrix[-y].length);
      }
    }
  };

board.on("down", down);

function main() {
  var i = 0,
    j = 0;
  nLive = originalNumber;
  // var evolutionCount = 0;
  // var nAliveCnt = 0;

  // Display the initial number of live cells
  document.getElementById("originalNumber").innerHTML = originalNumber;
  // Initialize the remaining lives
  document.getElementById("remainLifes").innerHTML = nLive;

  // var numberDisplayStack = [];

  // Clone matrix
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

  //Plot the initial state of the first generation cells(deprecated)
  // board.suspendUpdate();
  // for (i = 0; i < matrixRow; i++) {
  //   for (j = 0; j < matrixColumn; j++) {
  //     if (initialPlotMatrix[i][j] != "") {
  //       board.removeObject(initialPlotMatrix[i][j]);
  //       initialPlotMatrix[i][j] = "";
  //       // after heavy manual labor of work, it seems that one cell left bug is led by cache problem.
  //       // Doubt remains.
  //       // Set no-cache in Network bar of Chrome devtools, still got this bug. Surely this shoulb not
  //       // be led by cache.
  //     }
  //     if (matrix[i][j] == 1) {
  //       plotMatrix[i][j] = board.create("point", [-j, -i], {
  //         size: cellSize,
  //         name: "",
  //         fixed: true
  //       });
  //     }
  //   }
  // }
  // board.unsuspendUpdate();

  // //Display the number of the first generation live cells
  // // var strLiveNumber = str(nLive);
  // numberDisplayStack.push(board.create('text', [-11, -1, 'Live Cells Number:'], {
  //     fontSize: 30
  // }));
  // numberDisplayStack.push(board.create('text', [-18, -1, nLive], {
  //     fontSize: 28
  // }));

  // setInterval(function(){JXG.JSXGraph.freeBoard(board)},2000);

  timer = setInterval(function () {
    nextGeneration();
  }, timeInterval);
}

function nextGeneration() {
  // board.removeObject(numberDisplayStack[numberDisplayStack.length - 1]);
  // numberDisplayStack.pop();

  // Judge the state of next generation cell
  for (i = 0; i < matrixRow; i++) {
    for (j = 0; j < matrixColumn; j++) {
      //set the number of surrounding cells 0
      nAliveCnt = 0;

      // Judge the state of the eight surrounding cells

      //Judge the state of cell top-left
      if (i - 1 >= 0 && j - 1 >= 0 && matrix[i - 1][j - 1] == 1) {
        nAliveCnt++;
      }

      //Judge the state of cell at the top
      if (i - 1 >= 0 && matrix[i - 1][j] == 1) {
        nAliveCnt++;
      }

      //Judge the state of cell top-right
      if (i - 1 >= 0 && j + 1 < matrixColumn && matrix[i - 1][j + 1] == 1) {
        nAliveCnt++;
      }

      //Judge the state of cell at the left
      if (j - 1 >= 0 && matrix[i][j - 1] == 1) {
        nAliveCnt++;
      }

      // Judge the state of cell at the right

      if (j + 1 < matrixColumn && matrix[i][j + 1] == 1) {
        nAliveCnt++;
      }

      //Judge the state of cell bottom-left
      if (i + 1 < matrixRow && j - 1 >= 0 && matrix[i + 1][j - 1] == 1)
        if (matrix[i + 1][j - 1] == 1) {
          nAliveCnt++;
        }

      // Judge the state of cell at the bottom
      if (i + 1 < matrixRow && matrix[i + 1][j] == 1) {
        nAliveCnt++;
      }

      // Judge the state of cell bottom-right

      if (
        i + 1 < matrixRow &&
        j + 1 < matrixColumn &&
        matrix[i + 1][j + 1] == 1
      ) {
        nAliveCnt++;
      }

      // Judge the state of the next generation cell, dead or alive

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

  //Update back the state of next generation cell from clone matrix to original matrix, and plot
  board.suspendUpdate();
  for (i = 0; i < matrixRow; i++) {
    for (j = 0; j < matrixColumn; j++) {
      matrix[i][j] = copyMatrix[i][j];
      if (matrix[i][j] == 1) {
        if (plotMatrix[i][j] != "") {
          board.removeObject(plotMatrix[i][j]);
        }
        plotMatrix[i][j] = board.create("point", [-j, -i], {
          size: cellSize,
          name: "",
          fixed: true,
        });
      } else {
        board.removeObject(plotMatrix[i][j]);
        plotMatrix[i][j] = "";
      }
    }
  }
  board.unsuspendUpdate();

  // Update remianing lives and evelution times
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
        needShift: false, // mouse panning needs pressing of the shift key
      },
      zoom: {
        factorX: 1, // horizontal zoom factor (multiplied to JXG.Board#zoomX)
        factorY: 1, // vertical zoom factor (multiplied to JXG.Board#zoomY)
        wheel: false, // allow zooming by mouse wheel or
        // by pinch-to-toom gesture on touch devices
        needShift: true, // mouse wheel zooming needs pressing of the shift key
        min: 1, // minimal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomOut
        max: 1, // maximal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomIn
        pinchHorizontal: false, // Allow pinch-to-zoom to zoom only horizontal axis
        pinchVertical: false, // Allow pinch-to-zoom to zoom only vertical axis
        pinchSensitivity: 0, // Sensitivity (in degrees) for recognizing horizontal or vertical pinch-to-zoom gestures.
      },
    });
    originalNumber = 0;
  }
}

// function changeTimeInterval() {

// }

function clearBoard() {
  clearInterval(timer);
  board.off("down", down);
  // board.suspendUpdate();

  for (el in board.objects) {
    if (JXG.isPoint(board.objects[el])) {
      board.removeObject(el);
    }
  }

  for (i = 0; i < matrixRow; i++) {
    for (j = 0; j < matrixColumn; j++) {
      plotMatrix[i][j] = "";
      matrix[i][j] = 0;
    }
  }

  // board.unsuspendUpdate();
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
      needShift: false, // mouse panning needs pressing of the shift key
    },
    zoom: {
      factorX: 1, // horizontal zoom factor (multiplied to JXG.Board#zoomX)
      factorY: 1, // vertical zoom factor (multiplied to JXG.Board#zoomY)
      wheel: false, // allow zooming by mouse wheel or
      // by pinch-to-toom gesture on touch devices
      needShift: true, // mouse wheel zooming needs pressing of the shift key
      min: 1, // minimal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomOut
      max: 1, // maximal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomIn
      pinchHorizontal: false, // Allow pinch-to-zoom to zoom only horizontal axis
      pinchVertical: false, // Allow pinch-to-zoom to zoom only vertical axis
      pinchSensitivity: 0, // Sensitivity (in degrees) for recognizing horizontal or vertical pinch-to-zoom gestures.
    },
  });

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
  board.on("down", down);
  if (document.getElementsByClassName("selector en")[0]) {
    start.value = "Start";
  } else if (document.getElementsByClassName("selector cn")[0]) {
    start.value = "开始";
  }

  // Set original number, remaining lives and evelution times 0
  document.getElementById("originalNumber").innerHTML = 0;
  document.getElementById("remainLifes").innerHTML = 0;
  document.getElementById("evolutionTimes").innerHTML = 0;
  originalNumber = 0;
  nLive = originalNumber;
  evolutionCount = 0;
  nAliveCnt = 0;
}

function startbuttonclicked() {
  // console.log(start.value);
  if (start.value == "Pause" || start.value == "暂停") {
    if (!startBl) {
      clearInterval(timer);
      if (document.getElementsByClassName("selector en")[0]) {
        start.value = "Continue";
      } else if (document.getElementsByClassName("selector cn")[0]) {
        start.value = "继续";
      }
    }
  } else if (start.value == "Start" || start.value == "开始") {
    if (startBl) {
      // clearBoard();
      // matrix = [];
      main();
      board.off("down", down);
      startBl = false;
      if (document.getElementsByClassName("selector en")[0]) {
        start.value = "Pause";
      } else if (document.getElementsByClassName("selector cn")[0]) {
        start.value = "暂停";
      }
    }
  } else if (start.value == "Continue" || start.value == "继续") {
    if (!startBl) {
      clearInterval(timer);
      timer = setInterval(function () {
        nextGeneration();
      }, timeInterval);
      if (document.getElementsByClassName("selector en")[0]) {
        start.value = "Pause";
      } else if (document.getElementsByClassName("selector cn")[0]) {
        start.value = "暂停";
      }
    }
  }
}

// To compare 2d arrays at function randompatternselected， from https://stackoverflow.com/questions/24943200/javascript-2d-array-indexof

/*** deprecated, prefer array.prototype for efficiency ***/
// function isItemInArray(array, item) {
//   for (var i = 0; i < array.length; i++) {
//     // This if statement depends on the format of your array
//     if (array[i][0] == item[0] && array[i][1] == item[1]) {
//       return true; // Found it
//     }
//   }
//   return false; // Not found
// }

Array.prototype.indexOf2d = function (item) {
  // arrCoords is an array with previous coordinates converted to strings in format "x|y"
  arrCoords = JSON.stringify(
    this.map(function (a) {
      return a[0] + "|" + a[1];
    })
  );

  // now use indexOf to find item converted to a string in format "x|y"
  return arrCoords.indexOf(item[0] + "|" + item[1]) !== -1;
};

function randompatternselected() {
  var randompattern = [];
  var randomcellnumber = Math.round(Math.random() * 20 * 20);
  var tempcoord = 0;
  for (let i = 0; i < randomcellnumber; i++) {
    tempcoord = [
      Math.floor(Math.random() * 31),
      Math.floor(Math.random() * 41),
    ];
    // while (isItemInArray(randompattern, tempcoord)) {
    while (randompattern.indexOf2d(tempcoord)) {
      tempcoord = [
        Math.floor(Math.random() * 31),
        Math.floor(Math.random() * 41),
      ];
    }
    randompattern.push(tempcoord);
  }
  board.suspendUpdate();
  for (let i = 0; i < randompattern.length; i++) {
    // console.log(randompattern[i][0]);
    if (plotMatrix[randompattern[i][0]][randompattern[i][1]] == "") {
      plotMatrix[randompattern[i][0]][randompattern[i][1]] = board.create(
        "point",
        [-randompattern[i][1], -randompattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[randompattern[i][0]][randompattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function gliderpatternselected() {
  var gliderpattern = [
    [2, 8],
    [3, 9],
    [4, 9],
    [4, 8],
    [4, 7],
  ];
  board.suspendUpdate();
  for (let i = 0; i < gliderpattern.length; i++) {
    // console.log(gliderpattern[i][0]);
    if (plotMatrix[gliderpattern[i][0]][gliderpattern[i][1]] == "") {
      plotMatrix[gliderpattern[i][0]][gliderpattern[i][1]] = board.create(
        "point",
        [-gliderpattern[i][1], -gliderpattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[gliderpattern[i][0]][gliderpattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function smallexploderpatternselected() {
  var smallexploderpattern = [
    [12, 20],
    [13, 19],
    [13, 20],
    [13, 21],
    [14, 19],
    [14, 21],
    [15, 20],
  ];
  board.suspendUpdate();
  for (let i = 0; i < smallexploderpattern.length; i++) {
    if (
      plotMatrix[smallexploderpattern[i][0]][smallexploderpattern[i][1]] == ""
    ) {
      plotMatrix[smallexploderpattern[i][0]][
        smallexploderpattern[i][1]
      ] = board.create(
        "point",
        [-smallexploderpattern[i][1], -smallexploderpattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[smallexploderpattern[i][0]][smallexploderpattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function exploderpatternselected() {
  var exploderpattern = [
    [11, 18],
    [11, 20],
    [11, 22],
    [12, 18],
    [12, 22],
    [13, 18],
    [13, 22],
    [14, 18],
    [14, 22],
    [15, 18],
    [15, 20],
    [15, 22],
  ];
  board.suspendUpdate();
  for (let i = 0; i < exploderpattern.length; i++) {
    if (plotMatrix[exploderpattern[i][0]][exploderpattern[i][1]] == "") {
      plotMatrix[exploderpattern[i][0]][exploderpattern[i][1]] = board.create(
        "point",
        [-exploderpattern[i][1], -exploderpattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[exploderpattern[i][0]][exploderpattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function tencellcolumnpatternselected() {
  var tencellcolumnpattern = [
    [10, 20],
    [11, 20],
    [12, 20],
    [13, 20],
    [14, 20],
    [15, 20],
    [16, 20],
    [17, 20],
    [18, 20],
    [19, 20],
  ];
  board.suspendUpdate();
  for (let i = 0; i < tencellcolumnpattern.length; i++) {
    if (
      plotMatrix[tencellcolumnpattern[i][0]][tencellcolumnpattern[i][1]] == ""
    ) {
      plotMatrix[tencellcolumnpattern[i][0]][
        tencellcolumnpattern[i][1]
      ] = board.create(
        "point",
        [-tencellcolumnpattern[i][1], -tencellcolumnpattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[tencellcolumnpattern[i][0]][tencellcolumnpattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function lightweightspaceshippatternselected() {
  var lightweightspaceshippattern = [
    [12, 6],
    [12, 7],
    [12, 8],
    [12, 9],
    [13, 5],
    [13, 9],
    [14, 9],
    [15, 5],
    [15, 8],
  ];
  board.suspendUpdate();
  for (let i = 0; i < lightweightspaceshippattern.length; i++) {
    if (
      plotMatrix[lightweightspaceshippattern[i][0]][
        lightweightspaceshippattern[i][1]
      ] == ""
    ) {
      plotMatrix[lightweightspaceshippattern[i][0]][
        lightweightspaceshippattern[i][1]
      ] = board.create(
        "point",
        [
          -lightweightspaceshippattern[i][1],
          -lightweightspaceshippattern[i][0],
        ],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[lightweightspaceshippattern[i][0]][
        lightweightspaceshippattern[i][1]
      ] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function tumblerpatternselected() {
  var tumblerpattern = [
    [10, 18],
    [10, 19],
    [10, 21],
    [10, 22],
    [11, 18],
    [11, 19],
    [11, 21],
    [11, 22],
    [12, 19],
    [12, 21],
    [13, 17],
    [13, 19],
    [13, 21],
    [13, 23],
    [14, 17],
    [14, 19],
    [14, 21],
    [14, 23],
    [15, 17],
    [15, 18],
    [15, 22],
    [15, 23],
  ];
  board.suspendUpdate();
  for (let i = 0; i < tumblerpattern.length; i++) {
    if (plotMatrix[tumblerpattern[i][0]][tumblerpattern[i][1]] == "") {
      plotMatrix[tumblerpattern[i][0]][tumblerpattern[i][1]] = board.create(
        "point",
        [-tumblerpattern[i][1], -tumblerpattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[tumblerpattern[i][0]][tumblerpattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function gosperglidergunpatternselected() {
  var gosperglidergunpattern = [
    [7, 1],
    [7, 2],
    [8, 1],
    [8, 2],
    [7, 10],
    [7, 11],
    [8, 9],
    [8, 11],
    [9, 9],
    [9, 10],
    [9, 17],
    [9, 18],
    [10, 17],
    [10, 19],
    [11, 17],
    [5, 24],
    [5, 25],
    [6, 23],
    [6, 25],
    [7, 23],
    [7, 24],
    [5, 35],
    [5, 36],
    [6, 35],
    [6, 36],
    [12, 36],
    [12, 37],
    [13, 36],
    [13, 38],
    [14, 36],
    [17, 25],
    [17, 26],
    [17, 27],
    [18, 25],
    [19, 26],
  ];
  board.suspendUpdate();
  for (let i = 0; i < gosperglidergunpattern.length; i++) {
    if (
      plotMatrix[gosperglidergunpattern[i][0]][gosperglidergunpattern[i][1]] ==
      ""
    ) {
      plotMatrix[gosperglidergunpattern[i][0]][
        gosperglidergunpattern[i][1]
      ] = board.create(
        "point",
        [-gosperglidergunpattern[i][1], -gosperglidergunpattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[gosperglidergunpattern[i][0]][gosperglidergunpattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function mournJohnConwaypatterninitialized() {
  var mournJohnConwaypattern = [
    [10, 19],
    [10, 20],
    [10, 21],
    [11, 19],
    [11, 21],
    [12, 19],
    [12, 21],
    [13, 20],
    [14, 17],
    [14, 19],
    [14, 20],
    [14, 21],
    [15, 18],
    [15, 20],
    [15, 22],
    [16, 20],
    [16, 23],
    [17, 19],
    [17, 21],
    [18, 19],
    [18, 21],
  ];
  board.suspendUpdate();
  for (let i = 0; i < mournJohnConwaypattern.length; i++) {
    // console.log mournJohnConwaypattern[i][0]);
    if (
      plotMatrix[mournJohnConwaypattern[i][0]][mournJohnConwaypattern[i][1]] ==
      ""
    ) {
      plotMatrix[mournJohnConwaypattern[i][0]][
        mournJohnConwaypattern[i][1]
      ] = board.create(
        "point",
        [-mournJohnConwaypattern[i][1], -mournJohnConwaypattern[i][0]],
        {
          size: cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
        }
      );
      matrix[mournJohnConwaypattern[i][0]][mournJohnConwaypattern[i][1]] = 1;
      originalNumber++;
      document.getElementById("originalNumber").innerHTML = originalNumber;
    }
  }
  board.unsuspendUpdate();
}

function ratebuttonclicked() {
  // console.log(rateCounter);
  if (rateCounter == 1) {
    if (document.getElementsByClassName("en")[0]) {
      rateLabel.innerText = "Slow";
    } else {
      rateLabel.innerText = "慢速";
    }
    timeInterval = 1000;
    if (!startBl) {
      if (start.value == "Continue" || start.value == "继续") {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        timer = setInterval(function () {
          nextGeneration();
        }, timeInterval);
      }
    }
    setTimeout(function () {
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
    timeInterval = 30;
    if (!startBl) {
      if (start.value == "Continue" || start.value == "继续") {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        timer = setInterval(function () {
          nextGeneration();
        }, timeInterval);
      }
    }
    setTimeout(function () {
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
    timeInterval = 300;
    if (!startBl) {
      if (start.value == "Continue" || start.value == "继续") {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        timer = setInterval(function () {
          nextGeneration();
        }, timeInterval);
      }
    }
    setTimeout(function () {
      rateLabel.innerText = "";
    }, 500);
    rateCounter = 1;
  }
}
