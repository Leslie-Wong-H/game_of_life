const main = require('../main/main');

describe('main()', () => {

    it('Any dead cell with exactly three live neighbours becomes a live cell', () => {
        let actual = main([[1, 1, 1], [0, 0, 0], [0, 0, 0]]);
        expect(actual).toBe(
            [[0, 1, 0], [0, 1, 0], [0, 0, 0]]);
    });

    // it('Any live cell with fewer than two live neighbours dies', () => {
    //     let actual = main([
    //         [1, 0, 0],
    //         [0, 1, 0],
    //         [0, 0, 0]
    //     ]);
    //     expect(actual).toBe(
    //         [
    //             [0, 0, 0],
    //             [0, 0, 0],
    //             [0, 0, 0]
    //         ]);
    // });


    // it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
    //     let actual = main([
    //         [1, 1, 1],
    //         [0, 1, 0],
    //         [0, 0, 0]
    //     ]);
    //     expect(actual).toBe(
    //         [
    //             [1, 1, 1],
    //             [1, 1, 1],
    //             [0, 0, 0]
    //         ]);
    // });

    
    // it('Any live cell with more than three live neighbours dies', () => {
    //     let actual = main([
    //         [1, 1, 1],
    //         [0, 1, 0],
    //         [0, 1, 0]
    //     ] );
    //     expect(actual).toBe(
    //         [
    //             [1, 1, 1],
    //             [0, 0, 0],
    //             [0, 0, 0]
    //         ]);
    // });

});