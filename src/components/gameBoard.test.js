import { createGameBoard } from "./handleGameBoard";
import { SHIP_LIST } from "./handleShip";

describe("setShip() should input ship, position, direction props", () => {
    test("Set the 'Patrol Boat' to pos (3, 3) vertically down", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const board = createGameBoard();

        const actual = board.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        const expected = {
            success: true,
            name: "Patrol Boat",
            position: [
                [3, 3],
                [3, 4],
            ],
        };
        expect(actual).toEqual(expected);
    });
    test("Set the 'Carrier' to pos (6, 3) vertically down", () => {
        const board = createGameBoard();

        const actual = board.setShip({
            name: "Carrier",
            position: [6, 3],
            axis: "vertical",
            direction: "down",
        });

        const expected = {
            success: true,
            name: "Carrier",
            position: [
                [6, 3],
                [6, 4],
                [6, 5],
                [6, 6],
                [6, 7],
            ],
        };
        expect(actual).toEqual(expected);
    });
    test("input position is out of range of the board", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const board = createGameBoard();

        const actual = board.setShip({
            id: shipId,
            position: [9, 0],
            axis: "vertical",
            direction: "up",
        });

        const expected = {
            success: false,
            message: "Ship is out of range of the board",
        };

        expect(actual).toEqual(expected);
    });
    test("input position is overlaps with other ships", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;
        const shipId2 = SHIP_LIST.find((item) => "Submarine" === item.name).id;

        const board = createGameBoard();

        board.setShip({
            id: shipId,
            position: [3, 4],
            axis: "vertical",
            direction: "up",
        });

        const actual = board.setShip({
            id: shipId2,
            position: [2, 4],
            axis: "horizontal",
            direction: "left",
        });

        const expected = {
            success: false,
            message: "Ship overlaps with other ships",
        };

        expect(actual).toEqual(expected);
    });
});

describe("receiveAttack() should input a position", () => {
    test("The attack hit a ship", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const myBoard = createGameBoard();

        myBoard.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        const enemyAttackPos = [3, 4];

        const actual = myBoard.receiveAttack(enemyAttackPos);

        const expected = {
            success: true,
            message: "The attack hit a ship",
        };

        expect(actual).toEqual(expected);
    });
    test("The attack missed", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const myBoard = createGameBoard();

        myBoard.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        const enemyAttackPos = [5, 5];

        const actual = myBoard.receiveAttack(enemyAttackPos);

        const expected = {
            success: true,
            message: "The attack missed",
        };

        expect(actual).toEqual(expected);
    });
    test("Attack is out of range of the board", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const myBoard = createGameBoard();

        myBoard.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        const enemyAttackPos = [12, 5];

        const actual = myBoard.receiveAttack(enemyAttackPos);

        const expected = {
            success: false,
            message: "Attack is out of range of the board",
        };

        expect(actual).toEqual(expected);
    });
    test("All of enemy ships have been sunk", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const myBoard = createGameBoard();

        myBoard.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        let enemyAttackPos = [3, 3];

        myBoard.receiveAttack(enemyAttackPos);

        enemyAttackPos = [3, 4];

        const actual = myBoard.receiveAttack(enemyAttackPos);

        const expected = {
            success: true,
            message: "You win, all the enemy ships are sunk.",
        };

        expect(actual).toEqual(expected);
    });
});
