import { expect, test } from "@jest/globals";
import { RLEDecipher } from "../components/JxgContainer/gameOfLife/RLE";

test("Test RLE Decipher Case 1: Gosper glider gun", () => {
  const gosperglidergun = `#N Gosper glider gun
#O Bill Gosper
#C A true period 30 glider gun.
#C The first known gun and the first known finite pattern with unbounded growth.
#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun
x = 36, y = 9, rule = B3/S23
24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b
o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!`;
  const { width, height, result } = RLEDecipher(gosperglidergun);

  expect(width).toEqual(36);
  expect(height).toEqual(9);
  expect(Array.isArray(result)).toEqual(true);
  expect(result?.length).toEqual(36);
  expect(JSON.stringify(result)).toEqual(
    "[[10,26],[11,24],[11,26],[12,14],[12,15],[12,22],[12,23],[12,36],[12,37],[13,13],[13,17],[13,22],[13,23],[13,36],[13,37],[14,2],[14,3],[14,12],[14,18],[14,22],[14,23],[15,2],[15,3],[15,12],[15,16],[15,18],[15,19],[15,24],[15,26],[16,12],[16,18],[16,26],[17,13],[17,17],[18,14],[18,15]]"
  );
});

test("Test RLE Decipher Case 2: loafpull", () => {
  const loadpull = `#N loafpull.rle
#C https://conwaylife.com/wiki/Loaf_pull
#C https://www.conwaylife.com/patterns/loafpull.rle
x = 17, y = 19, rule = B3/S23
bo$obo$o2bo$b2o13$14b3o$14bo$15bo!`;
  const { width, height, result } = RLEDecipher(loadpull);

  expect(width).toEqual(17);
  expect(height).toEqual(19);
  expect(Array.isArray(result)).toEqual(true);
  expect(result?.length).toEqual(12);
  expect(JSON.stringify(result)).toEqual(
    "[[5,12],[6,11],[6,13],[7,11],[7,14],[8,12],[8,13],[21,25],[21,26],[21,27],[22,25],[23,26]]"
  );
});

test("Test RLE Decipher Case 3: 2.2.4", () => {
  const _2_2_4 = `#N 2.2.4.rle
#C https://conwaylife.com/wiki/2.2.4
#C https://www.conwaylife.com/patterns/2.2.4.rle
x = 9, y = 6, rule = B3/S23
3bobo$bo2bo2bo$obobobobo$o3bo3bo$b2obob2o$4bo!`;

  const { width, height, result } = RLEDecipher(_2_2_4);

  expect(width).toEqual(9);
  expect(height).toEqual(6);
  expect(Array.isArray(result)).toEqual(true);
  expect(result?.length).toEqual(19);
  expect(JSON.stringify(result)).toEqual(
    "[[12,18],[12,20],[13,16],[13,19],[13,22],[14,15],[14,17],[14,19],[14,21],[14,23],[15,15],[15,19],[15,23],[16,16],[16,17],[16,19],[16,21],[16,22],[17,19]]"
  );
});

test("Test RLE Decipher Case 4： boats", () => {
  const boats = `#N 4 boats
#C A period 2 oscillator made up of 4 boats.
x = 8, y = 8, rule = B3/S23
3bo4b$2bobo3b$bob2o3b$obo2b2ob$b2o2bobo$3b2obob$3bobo2b$4bo!`;

  const { width, height, result } = RLEDecipher(boats);

  expect(width).toEqual(8);
  expect(height).toEqual(8);
  expect(Array.isArray(result)).toEqual(true);
  expect(result?.length).toEqual(20);
  expect(JSON.stringify(result)).toEqual(
    "[[11,19],[12,18],[12,20],[13,17],[13,19],[13,20],[14,16],[14,18],[14,21],[14,22],[15,17],[15,18],[15,21],[15,23],[16,19],[16,20],[16,22],[17,19],[17,21],[18,20]]"
  );
});

test("Test RLE Decipher Case 5: yeast", () => {
  const yeast = `#N yeast.rle
#C https://conwaylife.com/wiki/Bakery
#C https://www.conwaylife.com/patterns/yeast.rle
x = 5, y = 5, rule = B3/S23
2bo$3bo$bo2bo$3o$bo!`;

  const { width, height, result } = RLEDecipher(yeast);

  expect(width).toEqual(5);
  expect(height).toEqual(5);
  expect(Array.isArray(result)).toEqual(true);
  expect(result?.length).toEqual(8);
  expect(JSON.stringify(result)).toEqual(
    "[[12,19],[13,20],[14,18],[14,21],[15,17],[15,18],[15,19],[16,18]]"
  );
});
