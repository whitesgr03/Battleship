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

describe("isOverlapShip() should input position and itself name", () => {
    test("input position is not overlapping", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });

        const shipPosition = [3, 3];
        const shipRotate = false;

        ship.setPos(shipPosition, shipRotate);

        myBoard.addShip(ship);

        const position = [
            [3, 5],
            [2, 5],
            [4, 5],
        ];

        const actual = myBoard.isOverlapShip(position);

        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("input position is overlapping", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });

        const shipPosition = [3, 3];
        const shipRotate = false;

        ship.setPos(shipPosition, shipRotate);

        myBoard.addShip(ship);

        const position = [
            [3, 3],
            [2, 3],
            [4, 3],
        ];

        const actual = myBoard.isOverlapShip(position);

        const expected = true;

        expect(actual).toEqual(expected);
    });
});

describe("receiveAttack()", () => {
    test("hit a ship", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });

        const shipPosition = [3, 3];
        const shipRotate = false;

        ship.setPos(shipPosition, shipRotate);

        myBoard.addShip(ship);

        let enemyAttackPos = [3, 3];

        const actual = myBoard.receiveAttack(enemyAttackPos);

        const expected = { name: "Patrol Boat" };

        expect(actual).toEqual(expected);
    });
    test("failed to hit a ship", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });

        const shipPosition = [3, 3];
        const shipRotate = false;

        ship.setPos(shipPosition, shipRotate);

        myBoard.addShip(ship);

        let enemyAttackPos = [5, 5];

        const actual = myBoard.receiveAttack(enemyAttackPos);

        const expected = false;

        expect(actual).toEqual(expected);
    });
});

describe("isAllShipsSunk()", () => {
    test("Ship sunk after correct hit", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });

        const shipPosition = [3, 3];
        const shipRotate = false;

        ship.setPos(shipPosition, shipRotate);

        myBoard.addShip(ship);

        let enemyAttackPos = [3, 3];

        myBoard.receiveAttack(enemyAttackPos);

        enemyAttackPos = [2, 3];

        myBoard.receiveAttack(enemyAttackPos);

        const actual = myBoard.isAllShipsSunk();

        const expected = true;

        expect(actual).toEqual(expected);
    });
    test("The ship does not sink when it misses", () => {
        const myBoard = createGameBoard({ size: 10 });

        const ship = createShip({ name: "Patrol Boat" });

        ship.setPos([
            [3, 3],
            [2, 3],
        ]);

        myBoard.addShip(ship);

        let enemyAttackPos = [3, 3];

        myBoard.receiveAttack(enemyAttackPos);

        enemyAttackPos = [4, 3];

        myBoard.receiveAttack(enemyAttackPos);

        const actual = myBoard.isAllShipsSunk();

        const expected = false;

        expect(actual).toEqual(expected);
    });
});
