function gameOfLife(matrix) {
    var i = 0, j = 0;
    var nLive = 0;
    var nAliveCnt = 0;
    var nContinue = 0;
     
    var matrixRow = matrix.length;
    var matrixColumn = matrix[0].length;

    var copyMatrix = new Array();
    for (var k = 0; k < matrixRow; k++){
        copyMatrix[k] = new Array();

        for (var p = 0; p < matrixColumn; p++){
            if (matrix[k][p] == 1) {
                nLive = nLive+1;
            }
            copyMatrix[k][p] = matrix[k][p];
        }
    }

    // console.log(copyMatrix);
    // console.log(nLive);

    while (1)
    {
        for (i = 0; i < matrixRow; i++)
        {
            for (j = 0; j < matrixColumn; j++)
            {
                if ((i - 1 > 0) && (j - 1 > 0) && (matrix[i - 1][j - 1] > 0))
                    {
                    nAliveCnt++;
                }
                if ((i - 1 > 0) && (matrix[i - 1][j] > 0))
                {
                    nAliveCnt++;
                }
                if ((j + 1 < matrixColumn) && (i - 1 > 0) && (matrix[i - 1][j + 1] > 0))
                {
                    nAliveCnt++;
                }
                if ((j - 1 > 0) && (matrix[i][j - 1] > 0))
                {
                    nAliveCnt++;
                }
                if ((j + 1 < matrixColumn) && (matrix[i][j + 1] > 0))
                {
                    nAliveCnt++;
                }
                if ((i + 1 < matrixRow) && (j - 1 > 0) && (matrix[i + 1][j - 1] > 0))
                {
                    nAliveCnt++;
                }
                if ((i + 1 < matrixRow) && (matrix[i + 1][j - 1] > 0))
                {
                    nAliveCnt++;
                }
                if ((i + 1 < matrixRow) && (j + 1 > 0) && (matrix[i + 1][j - 1] > 0))
                {
                    nAliveCnt++;
                }
            }

            if (matrix[i][j] == 1)
            {
                if ((nAliveCnt != 2) || (nAliveCnt != 3))
                {
                    copyMatrix[i][j] = 0;
                }    
            }

            if(matrix[i][j] == 0)
            {
                if (nAliveCnt == 3)
                {
                    copyMatrix[i][j] = 1;
                }
                
            }
            
        }        

        
    }





    // for (i = 0; i < 10; i++)
    // {
        
    //     }

}

var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]; 

gameOfLife(matrix);


