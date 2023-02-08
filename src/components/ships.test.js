import { createShip, SHIP_LIST } from "./handleShip";

describe("createShip() Return objects should include name, length, hits sunk", () => {
    test("create 'Patrol Boat'", () => {
        const patrol_boat = SHIP_LIST.find(
            (ship) => ship.name === "Patrol Boat"
        );

        const actual = createShip(patrol_boat);

        const expected = {
            name: "Patrol Boat",
            length: 2,
            hits: 0,
            sunk: false,
        };

        expect(actual).toEqual(expected);
    });
    test("create 'Carrier'", () => {
        const carrier = SHIP_LIST.find((ship) => ship.name === "Carrier");

        const actual = createShip(carrier);

        const expected = {
            name: "Carrier",
            length: 5,
            hits: 0,
            sunk: false,
        };

        expect(actual).toEqual(expected);
    });
    test("No input param", () => {
        const actual = createShip();

        const expected = {
            name: "Patrol Boat",
            length: 2,
            hits: 0,
            sunk: false,
        };

        expect(actual).toEqual(expected);
    });
    test("Input incorrect object (1)", () => {
        const ship = SHIP_LIST.find((ship) => ship.name === "Boat");

        const actual = createShip(ship);

        const expected = {
            name: "Patrol Boat",
            length: 2,
            hits: 0,
            sunk: false,
        };

        expect(actual).toEqual(expected);
    });
    test("Input incorrect object (2)", () => {
        const actual = createShip({
            name: "Boat",
        });

        const expected = {
            name: "Patrol Boat",
            length: 2,
            hits: 0,
            sunk: false,
        };

        expect(actual).toEqual(expected);
    });
});

describe("increaseHit()", () => {
    test("should increase hit", () => {
        const ship = createShip({
            id: 2,
        });

        ship.increaseHit();

        const actual = ship.hits;
        const expected = 1;

        expect(actual).toEqual(expected);
    });
    test("should add two hits", () => {
        const ship = createShip({
            id: 2,
        });

        ship.increaseHit();
        ship.increaseHit();

        const actual = ship.hits;
        const expected = 2;

        expect(actual).toEqual(expected);
    });
});

describe("isSunk()", () => {
    test("should check if length and hit are equal (1)", () => {
        const submarine = SHIP_LIST.find((ship) => ship.name === "Submarine");
        const ship = createShip(submarine);

        const actual = ship.isSunk();
        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("should check if length and hit are equal (2)", () => {
        const submarine = SHIP_LIST.find((ship) => ship.name === "Submarine");
        const ship = createShip(submarine);

        ship.increaseHit();
        ship.increaseHit();
        ship.increaseHit();

        const actual = ship.isSunk();
        const expected = true;

        expect(actual).toEqual(expected);
    });
});
