var matrix = [];
var start = document.getElementsByClassName('start')[0];
var stop = document.getElementsByClassName('stop')[0];
var startBl = true;
var timer;

bindEvent();

function bindEvent() {
    start.onclick = function () {
        if (startBl) {
            // clearBoard();
            matrix = [];
            copyMatrix = [];
            plotMatrix = [];
            main();
            startBl = false;
        }
    }

    stop.onclick = function () {
        startBl = true;
        
        clearInterval(timer);
    }
}



function init() {
    for (let i = 0; i < 20; i++) {
        matrix[i] = [];
        for (let j = 0; j < 20; j++) {

            if (Math.random() * 100 <= 20) {
                matrix[i][j] = 1
            } else {
                matrix[i][j] = 0;
            }
        }
    }
}

var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [0, 0, -20, -20],
    axis: true,
    grid: true
});


function main() {
    init();

    var i = 0,
        j = 0;
    var nLive = 0;
    var nAliveCnt = 0;

    var matrixRow = matrix.length;
    var matrixColumn = matrix[0].length;

    var numberDisplayStack = [];


    //克隆二维数组
    var copyMatrix = new Array();
    for (i = 0; i < matrixRow; i++) {
        copyMatrix[i] = new Array();

        for (j = 0; j < matrixColumn; j++) {
            if (matrix[i][j] == 1) {
                nLive = nLive + 1;
            }
            copyMatrix[i][j] = matrix[i][j];
        }
    }

    //生成绘图记录二维数组
    var plotMatrix = new Array();
    for (i = 0; i < matrixRow; i++) {
        plotMatrix[i] = new Array();

        for (j = 0; j < matrixColumn; j++) {
            plotMatrix[i][j] = '';
        }
    }



    //绘制原始细胞分布情况
    for (i = 0; i < matrixRow; i++) {
        for (j = 0; j < matrixColumn; j++) {
            if (matrix[i][j] == 1) {
                plotMatrix[i][j] = board.create('point', [-j, -i], {
                    size: 16
                });
            }

        }
    }

    //显示初始存活细胞数目
    // var strLiveNumber = str(nLive);
    numberDisplayStack.push(board.create('text', [-11, -1, 'Live Cells Number:'], {
        fontSize: 30
    }));
    numberDisplayStack.push(board.create('text', [-18, -1, nLive], {
        fontSize: 28
    }));



    // setInterval(function(){JXG.JSXGraph.freeBoard(board)},2000);   

    nextGeneration = function () {

        board.removeObject(numberDisplayStack[numberDisplayStack.length - 1]);
        numberDisplayStack.pop();





        // 判断下一代细胞分布  
        for (i = 0; i < matrixRow; i++) {

            for (j = 0; j < matrixColumn; j++) {
                //周围细胞数置零
                nAliveCnt = 0;

                //判断细胞周围九宫格

                //判断左上角细胞状态
                if ((i - 1 >= 0) && (j - 1 >= 0) && (matrix[i - 1][j - 1] == 1)) {
                    nAliveCnt++;
                }

                //判断上方细胞状态                
                if ((i - 1 >= 0) && (matrix[i - 1][j] == 1)) {
                    nAliveCnt++;
                }


                //判断右上角细胞状态
                if ((i - 1 >= 0) && (j + 1 < matrixColumn) && (matrix[i - 1][j + 1] == 1)) {
                    nAliveCnt++;
                }

                //判断左细胞状态
                if ((j - 1 >= 0) && (matrix[i][j - 1] == 1)) {
                    nAliveCnt++;
                }

                //判断右细胞状态

                if ((j + 1 < matrixColumn) && (matrix[i][j + 1] == 1)) {
                    nAliveCnt++;
                }

                //判断左下角细胞状态
                if ((i + 1 < matrixRow) && (j - 1 >= 0) && (matrix[i + 1][j - 1] == 1))
                    if (matrix[i + 1][j - 1] == 1) {
                        nAliveCnt++;
                    }

                // 判断下方细胞状态
                if ((i + 1 < matrixRow) && (matrix[i + 1][j] == 1)) {
                    nAliveCnt++;
                }

                // 判断右下角细胞状态

                if ((i + 1 < matrixRow) && (j + 1 < matrixColumn) && (matrix[i + 1][j + 1] == 1)) {
                    nAliveCnt++;
                }


                // 判断细胞下一代死活情况

                //Live
                if (matrix[i][j] == 1) {
                    if ((nAliveCnt == 2) || (nAliveCnt == 3)) {
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
                    if (plotMatrix[i][j] != '') {
                        board.removeObject(plotMatrix[i][j]);
                    }
                    plotMatrix[i][j] = board.create('point', [-j, -i], {
                        size: 16
                    });
                } else {
                    board.removeObject(plotMatrix[i][j]);
                    plotMatrix[i][j] = '';
                }

            }
        }

        numberDisplayStack.push(board.create('text', [-18, -1, nLive], {
            fontSize: 28
        }));

        board.unsuspendUpdate();




    };
    timer = setInterval(function () {
        nextGeneration()
    }, 500);

}

function clearBoard() {
    clearInterval(nextGeneration);
    board.suspendUpdate();
        for (i = 0; i < matrixRow; i++) {
            for (j = 0; j < matrixColumn; j++) {
                matrix[i][j] = copyMatrix[i][j];
                    board.removeObject(plotMatrix[i][j]);
                    plotMatrix[i][j] = '';
                

            }
        }
}