module.exports = function main(matrix) {
    var i = 0, j = 0;
    var nLive = 0;
    var nAliveCnt = 0;
    // var nContinue = 0;
     
    var matrixRow = matrix.length;
    var matrixColumn = matrix[0].length;

    var copyMatrix = new Array();
    for (i = 0; i < matrixRow; i++){
        copyMatrix[i] = new Array();

        for (j = 0; j < matrixColumn; j++){
            if (matrix[i][j] == 1) {
                nLive = nLive+1;
            }
            copyMatrix[i][j] = matrix[i][j];
        }
    }


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
                    copyMatrix[i][j] = 1;
                    nLive++;
                }
            }

    
        }

    }       

    // console.log(copyMatrix);

    
        
        
    for (i = 0; i < matrixRow; i++)
    {
        for (j = 0; j < matrixColumn; j++)
        {
            matrix[i][j] = copyMatrix[i][j];
        }
    }

    
}




