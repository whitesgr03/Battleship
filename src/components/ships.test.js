import { createShip, SHIP_LIST } from "./handleShip";

describe("createShip() Return objects should include name, length, hits sunk", () => {
    test("Input id create 'Patrol Boat'", () => {
        const actual = createShip({ name: "Patrol Boat" });

        const expected = {
            name: "Patrol Boat",
        };

        expect(actual).toEqual(expected);
    });
    test("Input name create 'Carrier'", () => {
        const actual = createShip({ name: "Carrier" });

        const expected = {
            name: "Carrier",
        };

        expect(actual).toEqual(expected);
    });

    test("Input incorrect param", () => {
        const actual = createShip();

        const expected = false;

        const second = createShip("Boat");

        expect(actual).toEqual(expected);
        expect(second).toEqual(expected);
    });
});
describe("increaseHit()", () => {
    test("should increase hit", () => {
        const ship = createShip({ name: "Patrol Boat" });

        const actual = ship.increaseHit();
        const expected = 1;

        expect(actual).toEqual(expected);
    });
    test("should add two hits", () => {
        const ship = createShip({ name: "Patrol Boat" });

        ship.increaseHit();

        const actual = ship.increaseHit();
        const expected = 2;

        expect(actual).toEqual(expected);
    });
});
describe("isSunk()", () => {
    test("should check if length and hit are equal (1)", () => {
        const ship = createShip({ name: "Patrol Boat" });

        const actual = ship.isSunk();
        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("should check if length and hit are equal (2)", () => {
        const ship = createShip({ name: "Destroyer" });

        ship.increaseHit();
        ship.increaseHit();
        ship.increaseHit();

        const actual = ship.isSunk();
        const expected = true;

        expect(actual).toEqual(expected);
    });
});
describe("setPos()", () => {
    test("should add position", () => {
        const ship = createShip({ name: "Patrol Boat" });

        const actual = ship.setPos([3, 3]);
        const expected = [3, 3];

        expect(actual).toEqual(expected);
    });
});
describe("getPos()", () => {
    test("should get position", () => {
        const ship = createShip({ name: "Patrol Boat" });

        ship.setPos([
            [3, 3],
            [3, 4],
        ]);

        const actual = ship.getPos();
        const expected = [
            [3, 3],
            [3, 4],
        ];

        expect(actual).toEqual(expected);
    });
});
describe("getHealthyPercent()", () => {
    test("should get 'Patrol Boat' Healthy Percent 50", () => {
        const ship = createShip({ name: "Patrol Boat" });

        ship.increaseHit();

        const actual = ship.getHealthyPercent();
        const expected = 50;

        expect(actual).toEqual(expected);
    });
    test("should get 'Carrier' Healthy Percent 25 ", () => {
        const ship = createShip({ name: "Carrier" });

        ship.increaseHit();

        const actual = ship.getHealthyPercent();
        const expected = 25;

        expect(actual).toEqual(expected);
    });
});
        const ship = createShip({ name: "Patrol Boat" });

        const actual = ship.getLength();
        const expected = 2;

        expect(actual).toEqual(expected);
    });
    test("should get 'Carrier' length", () => {
        const ship = createShip({ name: "Carrier" });

        const actual = ship.getLength();
        const expected = 4;

        expect(actual).toEqual(expected);
    });
});
