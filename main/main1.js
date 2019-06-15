var lifes = [];
var life;


beginLife();

function beginLife(X, Y) {
    life = new LifeGame(X, Y);
    life.initRandom(20);

    for (var i = 0; i < 50; i++) {
        lifes[i] = [];
        for (var j = 0; j < 50; j++) {
            lifes[i][j] = 0;
        }
    }

    initRandom();
}

function LifeGame(X, Y) {
    this.X = X;
    this.Y = Y;
    this.grid = [];
    this.remainLifes = 0;
    this.nextRemainLifes = 0;
    this.period = 1;

}

//随机初始化细胞
function initRandom(percent) {
    this.remainLifes = 0;
    this.period = 1;
    for (var i = 0; i < this.X; i++) {
        this.grid[i] = [];
        for (var j = 0; j < this.Y; j++) {
            if (Math.random() * 100 <= percent) {
                this.grid[i][j] = {
                    'state': 1,
                    'nextState': 1
                };
                this.remainLifes++;
                this.nextRemainLifes = this.remainLifes;
            } else {
                this.grid[i][j] = {
                    'state': 0,
                    'nextState': 0
                };
            }
        }
    }
};

//计算单个细胞下一回合状态
function nextState(x, y) {
    var aliveAround = this.aliveAround(x, y);
    if (aliveAround >= 4) {
        return 0;
    } else if (aliveAround === 3) {
        return 1;
    } else if (aliveAround >= 2) {
        return this.grid[x][y].nextState;
    } else {
        return 0;
    }
};

//计算细胞周围的存活细胞数量
function aliveAround(x, y) {
    return this.grid[this.X(x - 1)][this.Y(y - 1)].state +
        this.grid[this.X(x - 1)][y].state +
        this.grid[this.X(x - 1)][this.Y(y + 1)].state +
        this.grid[x][this.Y(y - 1)].state +
        this.grid[x][this.Y(y + 1)].state +
        this.grid[this.X(x + 1)][this.Y(y - 1)].state +
        this.grid[this.X(x + 1)][y].state +
        this.grid[this.X(x + 1)][this.Y(y + 1)].state;
};

