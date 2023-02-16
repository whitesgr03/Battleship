import { createShip, SHIP_LIST } from "./handleShip";

describe("createShip() Return objects should include name, length, hits sunk", () => {
    test("Input id create 'Patrol Boat'", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const actual = createShip({ id: shipId });

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
    test("No input param", () => {
        const actual = createShip();
        const expected = {
            name: "Patrol Boat",
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

        const ship = createShip({ id: shipId });

        const actual = ship.increaseHit();
        const expected = 1;

        expect(actual).toEqual(expected);
    });
    test("should add two hits", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const ship = createShip({ id: shipId });

        ship.increaseHit();

        const actual = ship.increaseHit();
        const expected = 2;

        expect(actual).toEqual(expected);
    });
});

describe("isSunk()", () => {
    test("should check if length and hit are equal (1)", () => {
        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        const ship = createShip({ id: shipId });

        const actual = ship.isSunk();
        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("should check if length and hit are equal (2)", () => {
        const shipId = SHIP_LIST.find((item) => "Submarine" === item.name).id;

        const ship = createShip({ id: shipId });

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

        ship.setPos([3, 3]);
        ship.setPos([3, 4]);

        const actual = ship.getPos();
        const expected = [
            [3, 3],
            [3, 4],
        ];

        expect(actual).toEqual(expected);
    });
});

describe("getLength()", () => {
    test("should get 'Patrol Boat' length", () => {
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
