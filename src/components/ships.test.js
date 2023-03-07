import { createShip } from "./handleShip";

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
        const position = [3, 3];
        const shipRotate = false;

        const actual = ship.setPos(position, shipRotate);
        const expected = [
            [3, 3],
            [2, 3],
        ];

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
describe("setRotate()", () => {
    test("should add rotate", () => {
        const ship = createShip({ name: "Patrol Boat" });

        const actual = ship.setRotate(true);
        const expected = true;

        expect(actual).toEqual(expected);
    });
});
describe("getRotate()", () => {
    test("should get rotate", () => {
        const ship = createShip({ name: "Patrol Boat" });

        ship.setRotate(false);

        const actual = ship.getRotate();
        const expected = false;

        expect(actual).toEqual(expected);
    });
});
describe("setCenterPos()", () => {
    test("should add CenterPos", () => {
        const ship = createShip({ name: "Patrol Boat" });

        const actual = ship.setCenterPos([5, 5]);
        const expected = [5, 5];

        expect(actual).toEqual(expected);
    });
});
describe("getCenterPos()", () => {
    test("should get CenterPos", () => {
        const ship = createShip({ name: "Patrol Boat" });

        ship.setCenterPos([8, 8]);

        const actual = ship.getCenterPos();
        const expected = [8, 8];

        expect(actual).toEqual(expected);
    });
});
