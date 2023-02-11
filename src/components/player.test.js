import { createPlayer } from "./handlePlayer";
import { SHIP_LIST } from "./handleShip";

describe("player()", () => {
    test("Return objects should include name, board", () => {
        const name = "Jeff";
        const actual = createPlayer(name);

        const expected = {
            name: "Jeff",
            board: { size: 10 },
        };
        expect(actual).toEqual(expected);
    });
});

describe("attack() should input the player to attack, the position to attack", () => {
    test("input has been attacked position", () => {
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
        player2.attack(player1, [3, 3]);

        const actual = player1.attack(player2, [6, 5]);

        const expected = {
            success: false,
            state: "repeat",
            message:
                "attack position has been attacked",
        };

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
