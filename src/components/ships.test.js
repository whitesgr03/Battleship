import { createShip, SHIP_LIST } from "./handleShip";

describe("createShip() Return objects should include name, length, hits sunk", () => {
    test("create 'Patrol Boat'", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const actual = createShip(shipId);

        const expected = {
            name: "Patrol Boat",
            length: 2,
            hits: 0,
            sunk: false,
        };

        expect(actual).toEqual(expected);
    });
    test("create 'Carrier'", () => {
        const shipId = SHIP_LIST.find((item) => "Carrier" === item.name).id;

        const actual = createShip(shipId);

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
    test("Input incorrect param", () => {
        const shipId = SHIP_LIST.find((item) => "Boat" === item.id);
        const shipId2 = SHIP_LIST.find((item) => 6 === item.id);
        const shipId3 = SHIP_LIST.find((item) => -1 === item.id);

        const actual = createShip(shipId);

        const expected = {
            name: "Patrol Boat",
            length: 2,
            hits: 0,
            sunk: false,
        };

        const second = createShip(shipId2);
        const third = createShip(shipId3);

        expect(actual).toEqual(expected);
        expect(second).toEqual(expected);
        expect(third).toEqual(expected);
    });
});

describe("increaseHit()", () => {
    test("should increase hit", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;
        const ship = createShip(shipId);

        const actual = ship.hits;
        const expected = 1;

        expect(actual).toEqual(expected);
    });
    test("should add two hits", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;
        const ship = createShip(shipId);

        ship.increaseHit();
        ship.increaseHit();

        const actual = ship.hits;
        const expected = 2;

        expect(actual).toEqual(expected);
    });
});

describe("isSunk()", () => {
    test("should check if length and hit are equal (1)", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const ship = createShip(shipId);

        const actual = ship.isSunk();
        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("should check if length and hit are equal (2)", () => {
        const shipId = SHIP_LIST.find((item) => "Submarine" === item.name).id;

        const ship = createShip(shipId);

        ship.increaseHit();
        ship.increaseHit();
        ship.increaseHit();

        const actual = ship.isSunk();
        const expected = true;

        expect(actual).toEqual(expected);
    });
});
