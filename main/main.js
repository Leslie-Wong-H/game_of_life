// module.exports = function
function gameOfLife(matrix) {
    var i = 0, j = 0;
    var k = 0, p = 0;
    var nLive = 0;
    var nAliveCnt = 0;
    // var nContinue = 0;
     
    var matrixRow = matrix.length;
    var matrixColumn = matrix[0].length;

    var copyMatrix = new Array();
    for (k = 0; k < matrixRow; k++){
        copyMatrix[k] = new Array();

        for (p = 0; p < matrixColumn; p++){
            if (matrix[k][p] == 1) {
                nLive = nLive+1;
            }
            copyMatrix[k][p] = matrix[k][p];
        }
    }


    var temp = 0;
    for (i = 0; i < matrixRow; i++)
    {
        for (j = 0; j < matrixColumn; j++)
        {
            nAliveCnt = 0;  //周围细胞数置零

            //判断左上角细胞状态
            if ((i  > 1) && (j  > 1) && (matrix[i - 1][j - 1] = 1))
            {
                nAliveCnt++;
            }

            //判断上方细胞状态                
            if ((i  > 1) && (matrix[i - 1][j] > 0))
            {
                nAliveCnt++;
            }


            //判断右上角细胞状态
            var temp = matrixColumn - 1;
            if ((j < temp) && (i  > 1) && (matrix[i - 1][j + 1] > 0))
            {
                nAliveCnt++;
            }

            //判断左细胞状态
            if ((j > 1) && (matrix[i][j - 1] > 0))
            {
                nAliveCnt++;
            }

            //判断右细胞状态
            temp = matrixColumn - 1;
            if ((j < temp) && (matrix[i][j + 1] > 0))
            {
                nAliveCnt++;
            }

            //判断左下角细胞状态
            temp = matrixRow - 1;
            if ((i < matrixRow -1) && (j > 1) && (matrix[i + 1][j - 1] > 0))
            {
                nAliveCnt++;
            }

            // 判断下方细胞状态
            temp = matrixRow - 1;
            if ((i < temp) && (matrix[i + 1][j - 1] > 0))
            {
                nAliveCnt++;
            }

            // 判断右下角细胞状态
            temp = matrixRow - 1;
            if ((i < temp) && (j > 1) && (matrix[i + 1][j - 1] > 0))
            {
                nAliveCnt++;
            }


            console.log(nAliveCnt);

            // 判断细胞下一代死活情况
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


            if (matrix[i][j] == 0)
            {
                if (nAliveCnt == 3)
                {
                    copyMatrix[i][j] = 1;
                    nLive++;
                }
            }

    
        }

    }       
        
        
    // for (k = 0; k < matrixRow; k++)
    // {
    //     for (p = 0; p < matrixColumn; p++)
    //     {
    //         matrix[k][p] = copyMatrix[k][p];
    //     }
    // }

}

var matrix = [
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]
];

gameOfLife(matrix);



