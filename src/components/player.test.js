import { createPlayer } from "./handlePlayer";
import { createGameBoard } from "./handleGameBoard";
import { createShip } from "./handleShip";

describe("createPlayer()", () => {
    test("Return objects should include name, board", () => {
        const name = "Jeff";
        const myBoard = createGameBoard({ size: 10 });

        const actual = createPlayer(name, myBoard);

        const expected = {
            name: "Jeff",
            board: { size: 10 },
        };
        expect(actual).toEqual(expected);
    });
});

describe("addAttackedPos() should input position", () => {
    test("add position", () => {
        const player1 = createPlayer("Jack", createGameBoard({ size: 10 }));

        const position = [5, 6];

        const actual = player1.addAttackedPos(position);

        const expected = [[5, 6]];

        expect(actual).toEqual(expected);
    });

    test("add two position", () => {
        const player1 = createPlayer("Jack", createGameBoard({ size: 10 }));

        const position = [5, 6];
        const position2 = [5, 5];

        player1.addAttackedPos(position);

        const actual = player1.addAttackedPos(position2);

        const expected = [
            [5, 6],
            [5, 5],
        ];

        expect(actual).toEqual(expected);
    });
});

describe("isDuplicateAttack()", () => {
    test("No Duplicate Attack", () => {
        const player1 = createPlayer("Jack", createGameBoard({ size: 10 }));
        const player2 = createPlayer("Brand", createGameBoard({ size: 10 }));

        const ship = createShip({ name: "Patrol Boat" });
        ship.setPos([
            [3, 3],
            [2, 3],
        ]);
        player1.board.addShip(ship);

        const ship2 = createShip({ name: "Patrol Boat" });
        ship2.setPos([
            [3, 3],
            [2, 3],
        ]);
        player2.board.addShip(ship2);

        const actual = player1.isDuplicateAttack([6, 5]);

        const expected = false;

        expect(actual).toEqual(expected);
    });
    test("Duplicate Attack", () => {
        const player1 = createPlayer("Jack", createGameBoard({ size: 10 }));
        const player2 = createPlayer("Brand", createGameBoard({ size: 10 }));

        const ship = createShip({ name: "Patrol Boat" });
        ship.setPos([
            [3, 3],
            [2, 3],
        ]);
        player1.board.addShip(ship);

        const ship2 = createShip({ name: "Patrol Boat" });
        ship2.setPos([
            [3, 3],
            [2, 3],
        ]);
        player2.board.addShip(ship2);

        player1.attack(player2, [6, 5]);

        player1.addAttackedPos([6, 5]);

        const actual = player1.isDuplicateAttack([6, 5]);

        const expected = true;

        expect(actual).toEqual(expected);
    });
});
