# 生命游戏

- [English Document](https://github.com/Leslie-Wong-H/GameofLife#requirements) | 中文文档

## 算法描述

生命游戏又称细胞自动机。反映了生命演化的规则。它由剑桥大学的数学家约翰·康威所提出，并且借由 1970 年发表在《科学美国人》上的文章而变得出名。
生命游戏原理：生命生活在二维环境中，每个生命生活在一个方格中，每个细胞在下一个时刻的状态取决于周围 8 个细胞的活着或死了的状态。

1. 对于一个存在活细胞的方格：
   - 周围有 1 个或无活细胞的话，由于孤独，细胞死亡；
   - 周围有 4 个以上活细胞的话，由于拥挤， 细胞死亡；
   - 周围存在 2 或 3 个活细胞的话，活细胞存活。
2. 对于一个空方格或存在死亡细胞的方格：
   - 周围有 3 个活细胞的话，方格有活细胞生成。

## 需求描述

1. 实现核心逻辑
2. 用界面展示结果
3. 可以预先指定初始状态
4. 可以控制动画的速度

## 实现效果

---

演示：[Game of Life | ©Leslie Wong](http://lesliewong.cn/gameoflife/)

---

![Chinese1.jpg](https://i.loli.net/2020/02/26/DThZANFmwecMpWG.jpg)

---

![Chinese2.jpg](https://i.loli.net/2020/02/26/HWfchdlrNjMILw7.jpg)

---

![Chinese3.jpg](https://i.loli.net/2020/02/26/vk9gSq7onw1JQHF.jpg)
