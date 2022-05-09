/**
 * Acknowledgment:
 * This code is based on the code from the following link.
 * Backend logic of the Game of Life
 * @author LeslieWong & Caiyijia
 * https://github.com/Leslie-Wong-H/GameofLIfe/blob/master/main/js/gameofLife.js
 * Achieve the main logic
 * Animation library：JSXGraph
 * Able to custom initial state with mouse
 * Able to set the initial state in advance
 * Able to take control of the animation rate
 */

import JXG from "jsxgraph";

import {
  gliderpattern,
  honeyFarmpattern,
  pulsarpattern,
  tencellcolumnpattern,
  lightweightspaceshippattern,
  tumblerpattern,
  gosperglidergunpattern,
  mournJohnConwaypattern,
  __1024cheerspattern,
} from "./GivenPatterns";

// In case of board.off not working, use this instead to keep function address consistent:
let mouseDownActionStore = () => {};

export default class GameOfLife {
  // "send" is from Xstate to dispatch the number-update event
  constructor(send, matrixRow = 31, matrixColumn = 41) {
    this.matrixRow = matrixRow;
    this.matrixColumn = matrixColumn;
    this.matrix = [];
    this.copyMatrix = [];
    this.sparseMatrix = [];
    this.extendedSparseMatrix = [];
    this.plotMatrix = [];

    this.gameState = "";
    this.timer = "";
    this.timeInterval = 300;
    this.rateCounter = 1;
    this.originalNumber = 0;
    this.nLive = 0;
    this.evolutionCount = 0;
    this.nAliveCnt = 0;
    this.cellSize = (window.innerWidth / 300).toFixed(0);
    // Do not show axis when in mobile layout, for beautification
    this.showAxis = window.innerWidth >= 425;
    this.board = "";

    this.isScrolling = "";
    this.scrolling = false;

    this.send = send;
  }

  /**
   * Initialize 41*31 board
   */
  initBoard() {
    this.board = JXG.JSXGraph.initBoard("box", {
      boundingbox: [0, 0, -40, -30],
      keepaspectratio: true,
      axis: this.showAxis,
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
    // hide top-left triangles generated when initialize
    if (window.innerWidth >= 425) {
      document.querySelectorAll("defs > marker")[0].style.visibility = "hidden";
      document.querySelectorAll("defs > marker")[1].style.visibility = "hidden";
    }

    mouseDownActionStore = this.mouseDownAction.bind(this);
    this.board.on("down", mouseDownActionStore);

    this.send("updateOriginalNumber", { originalNumber: 5 });
  }

  /**
   * Initial mournJohnConway pattern instead of blank board.
   * See the bottom for function detail
   * easter egg for 1024
   */
  easterEgg() {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    if (
      window.location.search === "?from=1024" ||
      (month === 10 && day === 24)
    ) {
      this.padPatternToBoard("__1024");
    } else {
      this.padPatternToBoard("mournJohnConway");
    }
  }

  /**
   * Initialize the cell matrix
   */
  initMatrix() {
    this.matrix = [];
    this.sparseMatrix = [];
    this.plotMatrix = [];
    for (let i = 0; i <= this.matrixRow - 1; i++) {
      this.matrix[i] = [];
      this.plotMatrix[i] = [];
      for (let j = 0; j <= this.matrixColumn - 1; j++) {
        this.matrix[i][j] = 0;
        // Generate plot matrix
        this.plotMatrix[i][j] = "";
      }
    }
  }

  mouseDownAction(e) {
    let canCreate = true,
      i,
      el;

    // incubated from code at http://jsxgraph.org/wiki/index.php/Browser_event_and_coordinates
    // mouse click event function
    const getMouseCoords = (e, i) => {
      var cPos = this.board.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = Math.round(absPos[0] - cPos[0]),
        dy = Math.round(absPos[1] - cPos[1]);
      return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], this.board);
    };

    if (e[JXG.touchProperty]) {
      // index of the finger that is used to extract the coordinates
      i = 0;
    }

    let coords = getMouseCoords(e, i);
    const x = Math.round(coords.usrCoords[1]);
    const y = Math.round(coords.usrCoords[2]);
    for (el in this.board.objects) {
      if (
        JXG.isPoint(this.board.objects[el]) &&
        this.board.objects[el].hasPoint(
          Math.round(coords.scrCoords[1]),
          Math.round(coords.scrCoords[2])
        )
      ) {
        this.board.removeObject(el);
        this.plotMatrix[-y][-x] = "";
        this.matrix[-y][-x] = 0;
        this.sparseMatrix = this.sparseMatrix.filter(function (val) {
          return JSON.stringify(val) !== JSON.stringify([-y, -x]);
        });
        this.originalNumber--;
        this.send("updateOriginalNumber", {
          originalNumber: this.originalNumber,
        });
        canCreate = false;
        break;
      }
    }

    if (canCreate) {
      if (this.plotMatrix[-y][-x] === "") {
        this.plotMatrix[-y][-x] = this.board.create("point", [x, y], {
          size: this.cellSize,
          name: "",
          fixed: true,
          showinfobox: false,
          withLabel: false,
        });
        this.matrix[-y][-x] = 1;
        this.sparseMatrix.push([-y, -x]);
        this.originalNumber++;
        this.send("updateOriginalNumber", {
          originalNumber: this.originalNumber,
        });
      }
    }
  }

  mainOperation() {
    this.nLive = this.originalNumber;

    // Display the initial number of live cells
    this.send("updateOriginalNumber", {
      originalNumber: this.originalNumber,
    });
    // Initialize the remaining lives
    this.send("updateRemainLifes", {
      remainLifes: this.nLive,
    });

    // Clone matrix
    this.copyMatrix = new Array();
    for (let i = 0; i < this.matrixRow; i++) {
      this.copyMatrix[i] = new Array();

      for (let j = 0; j < this.matrixColumn; j++) {
        this.copyMatrix[i][j] = this.matrix[i][j];
      }
    }

    this.timer = setInterval(() => {
      this.nextGeneration();
    }, this.timeInterval);
  }

  nextGeneration() {
    this.extendedSparseMatrix = [];

    for (let i = 0; i < this.sparseMatrix.length; i++) {
      // Add surrounding box coordinates
      if (
        this.sparseMatrix[i][0] - 1 >= 0 &&
        this.sparseMatrix[i][1] - 1 >= 0
      ) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0] - 1,
          this.sparseMatrix[i][1] - 1,
        ]);
      }
      if (this.sparseMatrix[i][0] - 1 >= 0 && this.sparseMatrix[i][1] >= 0) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0] - 1,
          this.sparseMatrix[i][1],
        ]);
      }
      if (
        this.sparseMatrix[i][0] - 1 >= 0 &&
        this.sparseMatrix[i][1] + 1 < this.matrixColumn
      ) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0] - 1,
          this.sparseMatrix[i][1] + 1,
        ]);
      }
      if (this.sparseMatrix[i][0] >= 0 && this.sparseMatrix[i][1] - 1 >= 0) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0],
          this.sparseMatrix[i][1] - 1,
        ]);
      }
      if (this.sparseMatrix[i][0] >= 0 && this.sparseMatrix[i][1] >= 0) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0],
          this.sparseMatrix[i][1],
        ]);
      }
      if (
        this.sparseMatrix[i][0] >= 0 &&
        this.sparseMatrix[i][1] + 1 < this.matrixColumn
      ) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0],
          this.sparseMatrix[i][1] + 1,
        ]);
      }
      if (
        this.sparseMatrix[i][0] + 1 < this.matrixRow &&
        this.sparseMatrix[i][1] - 1 >= 0
      ) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0] + 1,
          this.sparseMatrix[i][1] - 1,
        ]);
      }
      if (
        this.sparseMatrix[i][0] + 1 < this.matrixRow &&
        this.sparseMatrix[i][1] >= 0
      ) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0] + 1,
          this.sparseMatrix[i][1],
        ]);
      }
      if (
        this.sparseMatrix[i][0] + 1 < this.matrixRow &&
        this.sparseMatrix[i][1] + 1 < this.matrixColumn
      ) {
        this.extendedSparseMatrix.push([
          this.sparseMatrix[i][0] + 1,
          this.sparseMatrix[i][1] + 1,
        ]);
      }
    }

    for (let i = 0; i < this.extendedSparseMatrix.length; i++) {
      this.nAliveCnt = 0;

      // Judge the state of the eight surrounding cells

      //Judge the state of cell top-left
      if (
        this.extendedSparseMatrix[i][0] - 1 >= 0 &&
        this.extendedSparseMatrix[i][1] - 1 >= 0 &&
        this.matrix[this.extendedSparseMatrix[i][0] - 1][
          this.extendedSparseMatrix[i][1] - 1
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      //Judge the state of cell at the top
      if (
        this.extendedSparseMatrix[i][0] - 1 >= 0 &&
        this.matrix[this.extendedSparseMatrix[i][0] - 1][
          this.extendedSparseMatrix[i][1]
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      //Judge the state of cell top-right
      if (
        this.extendedSparseMatrix[i][0] - 1 >= 0 &&
        this.extendedSparseMatrix[i][1] + 1 < this.matrixColumn &&
        this.matrix[this.extendedSparseMatrix[i][0] - 1][
          this.extendedSparseMatrix[i][1] + 1
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      //Judge the state of cell at the left
      if (
        this.extendedSparseMatrix[i][1] - 1 >= 0 &&
        this.matrix[this.extendedSparseMatrix[i][0]][
          this.extendedSparseMatrix[i][1] - 1
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      // Judge the state of cell at the right
      if (
        this.extendedSparseMatrix[i][1] + 1 < this.matrixColumn &&
        this.matrix[this.extendedSparseMatrix[i][0]][
          this.extendedSparseMatrix[i][1] + 1
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      //Judge the state of cell bottom-left
      if (
        this.extendedSparseMatrix[i][0] + 1 < this.matrixRow &&
        this.extendedSparseMatrix[i][1] - 1 >= 0 &&
        this.matrix[this.extendedSparseMatrix[i][0] + 1][
          this.extendedSparseMatrix[i][1] - 1
        ] == 1
      )
        if (
          this.matrix[this.extendedSparseMatrix[i][0] + 1][
            this.extendedSparseMatrix[i][1] - 1
          ] == 1
        ) {
          this.nAliveCnt++;
        }

      // Judge the state of cell at the bottom
      if (
        this.extendedSparseMatrix[i][0] + 1 < this.matrixRow &&
        this.matrix[this.extendedSparseMatrix[i][0] + 1][
          this.extendedSparseMatrix[i][1]
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      // Judge the state of cell bottom-right

      if (
        this.extendedSparseMatrix[i][0] + 1 < this.matrixRow &&
        this.extendedSparseMatrix[i][1] + 1 < this.matrixColumn &&
        this.matrix[this.extendedSparseMatrix[i][0] + 1][
          this.extendedSparseMatrix[i][1] + 1
        ] == 1
      ) {
        this.nAliveCnt++;
      }

      // Judge the state of the next generation cell, dead or alive

      //Live
      if (
        this.matrix[this.extendedSparseMatrix[i][0]][
          this.extendedSparseMatrix[i][1]
        ] == 1
      ) {
        if (this.nAliveCnt == 2 || this.nAliveCnt == 3) {
          this.copyMatrix[this.extendedSparseMatrix[i][0]][
            this.extendedSparseMatrix[i][1]
          ] = 1;
        } else {
          this.copyMatrix[this.extendedSparseMatrix[i][0]][
            this.extendedSparseMatrix[i][1]
          ] = 0;
        }
      }

      //Dead
      if (
        this.matrix[this.extendedSparseMatrix[i][0]][
          this.extendedSparseMatrix[i][1]
        ] == 0
      ) {
        if (this.nAliveCnt == 3) {
          this.copyMatrix[this.extendedSparseMatrix[i][0]][
            this.extendedSparseMatrix[i][1]
          ] = 1;
        }
      }
    }

    this.sparseMatrix = [];
    this.nLive = 0;
    //Update back the state of next generation cell from clone matrix to original matrix, and plot
    this.board.suspendUpdate();
    for (let i = 0; i < this.matrixRow; i++) {
      for (let j = 0; j < this.matrixColumn; j++) {
        this.matrix[i][j] = this.copyMatrix[i][j];
        if (this.matrix[i][j] == 1) {
          this.nLive++;
          this.sparseMatrix.push([i, j]);
          if (this.plotMatrix[i][j] != "") {
            this.board.removeObject(this.plotMatrix[i][j]);
          }
          this.plotMatrix[i][j] = this.board.create("point", [-j, -i], {
            size: this.cellSize,
            name: "",
            fixed: true,
            showinfobox: false,
            withLabel: false,
          });
        } else {
          this.board.removeObject(this.plotMatrix[i][j]);
          this.plotMatrix[i][j] = "";
        }
      }
    }
    this.board.unsuspendUpdate();

    // Update remaining lives and evolution times
    this.evolutionCount++;
    this.send("updateRemainLifes", {
      remainLifes: this.nLive,
    });

    if (this.nLive !== 0) {
      this.send("updateEvolutionTimes", {
        evolutionTimes: this.evolutionCount,
      });
    } else {
      clearInterval(this.timer);
      this.board = JXG.JSXGraph.initBoard("box", {
        boundingbox: [0, 0, -40, -30],
        keepaspectratio: true,
        axis: this.showAxis,
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
      this.originalNumber = 0;
      this.send("updateOriginalNumber", {
        originalNumber: this.originalNumber,
      });
    }
  }

  clearBoard() {
    clearInterval(this.timer);
    this.board.off("down", mouseDownActionStore);

    for (let el in this.board.objects) {
      if (JXG.isPoint(this.board.objects[el])) {
        this.board.removeObject(el);
      }
    }

    for (let i = 0; i < this.matrixRow; i++) {
      for (let j = 0; j < this.matrixColumn; j++) {
        this.plotMatrix[i][j] = "";
        this.matrix[i][j] = 0;
      }
    }
    this.sparseMatrix = [];

    this.initBoard();

    this.gameState = "";

    // Set original number, remaining lives and evelution times 0
    this.originalNumber = 0;
    this.send("updateOriginalNumber", {
      originalNumber: this.originalNumber,
    });

    this.nLive = 0;
    this.send("updateRemainLifes", {
      remainLifes: this.nLive,
    });

    this.evolutionCount = 0;
    this.send("updateEvolutionTimes", {
      evolutionTimes: this.evolutionCount,
    });

    this.nAliveCnt = 0;
  }

  startButtonClicked(state) {
    // console.log(start.value);
    if (state === "Pause") {
      (this.gameState === "Start" || this.gameState === "Continue") &&
        clearInterval(this.timer);
      this.gameState = "Pause";
    } else if (state === "Start") {
      if (this.gameState === "") {
        this.board.off("down", mouseDownActionStore);
        this.mainOperation();
        this.gameState = "Start";
      }
    } else if (state === "Continue") {
      if (this.gameState === "Pause") {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.nextGeneration();
        }, this.timeInterval);
        this.gameState = "Continue";
      }
    }
  }

  padPatternToBoard(paddedPatternName, paddedPattern = []) {
    const paddedPatternMap = {
      glider: gliderpattern,
      honeyFarm: honeyFarmpattern,
      pulsar: pulsarpattern,
      tencellcolumn: tencellcolumnpattern,
      lightweightspaceship: lightweightspaceshippattern,
      tumbler: tumblerpattern,
      gosperglidergun: gosperglidergunpattern,
      mournJohnConway: mournJohnConwaypattern,
      __1024: __1024cheerspattern,
    };
    // randomPattern is not in the map
    if (paddedPatternMap[paddedPatternName]) {
      paddedPattern = paddedPatternMap[paddedPatternName];
    }
    this.board.suspendUpdate();
    for (let i = 0; i < paddedPattern.length; i++) {
      if (this.plotMatrix[paddedPattern[i][0]][paddedPattern[i][1]] == "") {
        this.plotMatrix[paddedPattern[i][0]][
          paddedPattern[i][1]
        ] = this.board.create(
          "point",
          [-paddedPattern[i][1], -paddedPattern[i][0]],
          {
            size: this.cellSize,
            name: "",
            fixed: true,
            showinfobox: false,
            withLabel: false,
          }
        );
        this.matrix[paddedPattern[i][0]][paddedPattern[i][1]] = 1;
        this.sparseMatrix.push([paddedPattern[i][0], paddedPattern[i][1]]);
        this.originalNumber++;
        this.send("updateOriginalNumber", {
          originalNumber: this.originalNumber,
        });
      }
    }
    this.board.unsuspendUpdate();
  }

  randomPatternSelected() {
    let randompattern = [];

    let tempcoord = [];
    let url =
      "https://api.playgameoflife.live/v1/random.json?heightmax=30&widthmax=40";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != "") {
          const responseJson = JSON.parse(xhr.responseText);
          var widthOffset = Math.floor((40 - responseJson.width) / 2);
          var heightOffset = Math.floor((30 - responseJson.height) / 2);
          widthOffset = widthOffset > 0 ? widthOffset : 0;
          heightOffset = heightOffset > 0 ? heightOffset : 0;
          for (let i = 0; i < responseJson.height; i++) {
            for (let j = 0; j < responseJson.width; j++) {
              if (responseJson.pattern[i].slice(j, j + 1) === "*") {
                tempcoord = [heightOffset + i, widthOffset + j];
                randompattern.push(tempcoord);
              }
            }
          }
          this.padPatternToBoard("randompattern", randompattern);
        }
      }
    };
    xhr.onerror = () => {
      console.log(new Error(xhr.statusText));
    };
    xhr.onabort = () => {
      console.log(new Error("abort this request"));
    };
    xhr.send();
  }

  rateButtonClicked() {
    const reaction = () => {
      if (this.gameState === "Continue" || this.gameState === "Start") {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.nextGeneration();
        }, this.timeInterval);
      } else if (this.gameState === "" || this.gameState === "Pause") {
        clearInterval(this.timer);
      }
    };

    // Fast
    if (this.rateCounter === 1) {
      this.timeInterval = 30;
      reaction();
      this.rateCounter++;
      // Slow
    } else if (this.rateCounter === 2) {
      this.timeInterval = 1000;
      reaction();
      this.rateCounter++;
      // Medium
    } else if (this.rateCounter === 3) {
      this.timeInterval = 300;
      reaction();
      this.rateCounter = 1;
    }
  }

  /**
   * Resize throttler
   * Detect screen resize event to redraw JSXGraph board, learnt form
   * https://bourne2learn.com/math/jsxgraph/jsxgraph-examples.php
   * and
   * https://bourne2learn.com/math/jsxgraph/cellular-automaton.php
   */
  resizeThrottlerWrapper() {
    var resizeTimeout;

    const actualResizeHandler = () => {
      var box = document.querySelector("#box");

      // Need to unset these so containing DIV can change size
      box.style.width = "";
      box.style.height = "";
      // Get width and height of (changed) containing DIV
      var theWidth = box.getBoundingClientRect().width;
      var theHeight = box.getBoundingClientRect().height;

      this.board.suspendUpdate();
      // Now resize the board
      this.board.resizeContainer(theWidth, theHeight);
      // resize the cell size
      // reference: https://groups.google.com/g/jsxgraph/c/dHT6qU6ICZo
      this.cellSize = (window.innerWidth / 300).toFixed(0);
      for (let el in this.board.objects) {
        if (JXG.isPoint(this.board.objects[el])) {
          this.board.objects[el].setAttribute({ size: this.cellSize });
        }
      }
      this.board.unsuspendUpdate();
    };

    const resizeThrottler = () => {
      if (!this.scrolling) {
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            if (typeof actualResizeHandler == "function") {
              actualResizeHandler();
            }
          }, 500);
        }
      }
    };

    window.addEventListener("resize", resizeThrottler, false);
  }

  /**
   * Scroll handler
   * isScrolling is a timeout for detecting if scrolling is occuring
   * scrolling is used to disable the function that's called on a resize
   * (necessary since phone browsers trigger a "resize" event when the URL bar..
   * and refresh icon appears a the top when the user scrolls up)
   */
  scrollHandler() {
    window.addEventListener(
      "scroll",
      function (event) {
        this.scrolling = true;
        window.clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(function () {
          this.scrolling = false;
        }, 66);
      },
      false
    );
  }
}
