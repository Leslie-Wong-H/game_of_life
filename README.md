# Game of Life

- English Document | [中文文档](./README_zh-CN.md)

🎉 JSXGraph Conference 2020 [Slide](https://www.lesliewong.cn/gameoflife/gameoflife.pdf) & [Video](https://www.youtube.com/watch?v=ajKIaTlEuz4) 🎉

🎉 JSXGraph Conference 2022 [Slide](https://www.lesliewong.cn/gameoflife/refactor_gameoflife.pdf) & [Video](https://www.youtube.com/watch?v=05jFXTjMkS4) 🎉

## Algorithm Description

The Game of Life is a cellular automata devised by the mathematician John Horton Conway from Cambridge University. It came to become well-known for the article published at Scientific American in 1970.

Rules of the Game of Life: The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive and dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. For a box with a live cell:
   - There existing fewer than two live neighbors, the cell dies, due to isolation.
   - There existing more than three live neighbors, the cell dies, due to over-crowding.
   - There existing two or three live neighbors, the cell lives on to the next generation.
2. For an empty box or a box with a dead cell:
   - There existing three live neighbors, the box generates a new live cell, as if by reproduction.

## Demand Description

1. Achieve the main logic described above
2. Display the algorithm with a friendly interface
3. Able to set the initial state in advance
4. Able to take control of the animation rate

## Project Architecture

![project architecture](/docs/imgs/project_architecture_en.png)

## Implementation Result

Website：

[Game of Life Online | ©Leslie Wong](http://playgameoflife.live)

## Snapshots

![gif1](/docs/imgs/gameoflife.gif)

---

![gif2](/docs/imgs/gameoflifedemo.gif)

---

![english1.jpg](https://i.loli.net/2020/02/26/ra496MIGvwdgoRL.jpg)

---

![English2.jpg](https://i.loli.net/2020/02/26/fC9l4WgoOpmeAT5.jpg)

---

![English3.jpg](https://i.loli.net/2020/02/26/RzFCfDMW4jZulPd.jpg)
