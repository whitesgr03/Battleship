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

describe("getAttackedPos()", () => {
    test("should get attacked position", () => {
        const player1 = createPlayer("Jack");
        const player2 = createPlayer("Brand");

        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        player1.board.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        player2.board.setShip({
            name: "Submarine",
            position: [6, 3],
            axis: "vertical",
            direction: "down",
        });

        player1.attack(player2, [6, 5]);

        const actual = player1.getAttackedPos();

        const expected = new Set(["(6, 5)"]);

        expect(actual).toEqual(expected);
    });
});
