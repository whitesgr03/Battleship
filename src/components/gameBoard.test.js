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

describe("addShip()", () => {
    test("should add ship ", () => {
        const myBoard = createGameBoard({ size: 10 });
        const ship = createShip({ name: "Patrol Boat" });

        const actual = myBoard.addShip(ship);
        const expected = [{ name: "Patrol Boat" }];

        expect(actual).toEqual(expected);
    });
    test("add two ship should get two ship", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });
        const ship2 = createShip({ name: "Battleship" });

        myBoard.addShip(ship);

        const actual = myBoard.addShip(ship2);

        const expected = [{ name: "Patrol Boat" }, { name: "Battleship" }];

        expect(actual).toEqual(expected);
    });
});

describe("getShip() should input name", () => {
    test("should get a ship by name ", () => {
        const myBoard = createGameBoard({ size: 10 });
        const ship = createShip({ name: "Patrol Boat" });
        const ship2 = createShip({ name: "Battleship" });

        myBoard.addShip(ship);
        myBoard.addShip(ship2);

        const actual = myBoard.getShip("Patrol Boat");
        const expected = { name: "Patrol Boat" };

        expect(actual).toEqual(expected);
    });
});

describe("getAllShips() should input name", () => {
    test("should get ship ", () => {
        const myBoard = createGameBoard({ size: 10 });
        const ship = createShip({ name: "Patrol Boat" });
        const ship2 = createShip({ name: "Battleship" });

        myBoard.addShip(ship);
        myBoard.addShip(ship2);

        const actual = myBoard.getAllShips();
        const expected = [{ name: "Patrol Boat" }, { name: "Battleship" }];

        expect(actual).toEqual(expected);
    });
});

describe("isOutBounds() should input position", () => {
    test("input position is within bounds ", () => {
        const myBoard = createGameBoard({ size: 10 });

        const position = [[3, 3]];

        const actual = myBoard.isOutBounds(position);

        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("input position is out of bounds ", () => {
        const myBoard = createGameBoard({ size: 10 });

        const position = [[11, 0]];

        const actual = myBoard.isOutBounds(position);

        const expected = true;

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
