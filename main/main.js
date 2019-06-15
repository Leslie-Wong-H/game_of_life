<<<<<<< HEAD
var lifeTimer = 0;

=======
// module.exports = function
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f
function gameOfLife(matrix) {
    var i = 0,
        j = 0;
    var nLive = 0;
    var nAliveCnt = 0;
<<<<<<< HEAD
    var nContinue = 0;

=======
    // var nContinue = 0;
     
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f
    var matrixRow = matrix.length;
    var matrixColumn = matrix[0].length;

    var copyMatrix = new Array();
<<<<<<< HEAD
    for (var k = 0; k < matrixRow; k++) {
        copyMatrix[k] = new Array();

        for (var p = 0; p < matrixColumn; p++) {
            if (matrix[k][p] == 1) {
                nLive = nLive + 1;
=======
    for (i = 0; i < matrixRow; i++){
        copyMatrix[i] = new Array();

        for (j = 0; j < matrixColumn; j++){
            if (matrix[i][j] == 1) {
                nLive = nLive+1;
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f
            }
            copyMatrix[i][j] = matrix[i][j];
        }
    }


<<<<<<< HEAD
    while (1) {
        for (i = 0; i < matrixRow; i++) {
            for (j = 0; j < matrixColumn; j++) {
                if ((i - 1 > 0) && (j - 1 > 0) && (matrix[i - 1][j - 1] > 0)) {
                    nAliveCnt++;
                }
                if ((i - 1 > 0) && (matrix[i - 1][j] > 0)) {
                    nAliveCnt++;
                }
                if ((j + 1 < matrixColumn) && (i - 1 > 0) && (matrix[i - 1][j + 1] > 0)) {
                    nAliveCnt++;
                }
                if ((j - 1 > 0) && (matrix[i][j - 1] > 0)) {
                    nAliveCnt++;
                }
                if ((j + 1 < matrixColumn) && (matrix[i][j + 1] > 0)) {
                    nAliveCnt++;
                }
                if ((i + 1 < matrixRow) && (j - 1 > 0) && (matrix[i + 1][j - 1] > 0)) {
                    nAliveCnt++;
                }
                if ((i + 1 < matrixRow) && (matrix[i + 1][j - 1] > 0)) {
                    nAliveCnt++;
                }
                if ((i + 1 < matrixRow) && (j + 1 > 0) && (matrix[i + 1][j - 1] > 0)) {
                    nAliveCnt++;
                }
            }

            if (matrix[i][j] == 1) {
                if ((nAliveCnt != 2) || (nAliveCnt != 3)) {
                    copyMatrix[i][j] = 0;
                }
            }

            if (matrix[i][j] == 0) {
                if (nAliveCnt == 3) {
=======
    var temp = 0;
    var anotherTemp = 0;

    for (i = 0; i < matrixRow; i++)
    {

        // 判断细胞九宫格
        for (j = 0; j < matrixColumn; j++)
        {
            nAliveCnt = 0;  //周围细胞数置零

            //判断左上角细胞状态
            if ((i -1 >= 0) && (j -1 >= 0) && (matrix[i - 1][j - 1] == 1))
            
            {
                nAliveCnt++;
            }

            //判断上方细胞状态                
            if ((i - 1 >= 0) && (matrix[i - 1][j] == 1))
            {
                nAliveCnt++;
            }


            //判断右上角细胞状态
            if ((i - 1 >= 0) && (j + 1 < matrixColumn) && (matrix[i - 1][j + 1] == 1))

            {
                nAliveCnt++;
            }

            //判断左细胞状态
            if ((j - 1 >= 0) && (matrix[i][j - 1] == 1))

            {
                nAliveCnt++;
            }

            //判断右细胞状态
  
            if ((j +1 < matrixColumn) && (matrix[i][j + 1] == 1))
            {
                nAliveCnt++;
            }

            //判断左下角细胞状态
            if ((i + 1 < matrixRow) && (j - 1 >= 0) && (matrix[i + 1][j - 1] == 1))
            if(matrix[i + 1][j - 1 ] ==1)
            {
                nAliveCnt++;
            }

            // 判断下方细胞状态
            if ((i + 1 < matrixRow)  && (matrix[i + 1][j] == 1))
            {
                nAliveCnt++;
            }

            // 判断右下角细胞状态

            if (( i + 1 < matrixRow) && ( j + 1 <matrixColumn) && (matrix[i + 1][j + 1] == 1))
            {
                nAliveCnt++;
            }

            // console.log(nAliveCnt);
            
            // 判断细胞下一代死活情况

            //Live
            if (matrix[i][j] == 1)
            {
                if ((nAliveCnt == 2) || (nAliveCnt == 3))
                {
                    copyMatrix[i][j] = 1;
                }
                else
                {
                    copyMatrix[i][j] = 0;
                    nLive--;
                }
            }

            //Dead
            if (matrix[i][j] == 0)
            {
                if (nAliveCnt == 3)
                {
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f
                    copyMatrix[i][j] = 1;
                    nLive++;
                }
<<<<<<< HEAD

            }

        }

        for (var k = 0; k < matrixRow; k++) {
            for (var p = 0; p < matrixColumn; p++) {

                matrix[k][p] = copyMatrix[k][p];
=======
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f
            }

    
        }

<<<<<<< HEAD
        console.log(matrix);
=======
    }       
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f

    // console.log(copyMatrix);

<<<<<<< HEAD
    }





    // for (i = 0; i < 10; i++)
    // {

    //     }
=======
    
        
        
    for (i = 0; i < matrixRow; i++)
    {
        for (j = 0; j < matrixColumn; j++)
        {
            matrix[i][j] = copyMatrix[i][j];
        }
    }

    // console.log(m
>>>>>>> b252c5bfa7fa3fbe03b1d4b26cc8b54a621c088f

}

var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

gameOfLife(matrix);

// lifeTimer = setInterval(gameOfLife(), 300);



