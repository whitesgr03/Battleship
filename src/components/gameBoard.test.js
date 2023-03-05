import { createGameBoard } from "./handleGameBoard";
import { createShip } from "./handleShip";

describe("createGameBoard() ", () => {
    test("Return objects should include board", () => {
        const actual = createGameBoard({ size: 10 });

        const expected = {
            size: 10,
        };
        expect(actual).toEqual(expected);
    });
});

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
            state: "hit",
            message: "hit a ship.",
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
            state: "missed",
            message: "attack misses.",
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
            state: "out",
            message: "attack is out of range of the board",
        };

        expect(actual).toEqual(expected);
    });
});

describe("isAllShipsSunk()", () => {
    test("should get all ship sunk state", () => {
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

        myBoard.receiveAttack(enemyAttackPos);

        const actual = myBoard.isAllShipsSunk();

        const expected = true;

        expect(actual).toEqual(expected);
    });
});
