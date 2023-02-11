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
    test("Player performs the game actions", () => {
        const player1 = createPlayer("Jack");
        const player2 = createPlayer("Brand");

        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;
        const shipId2 = SHIP_LIST.find((item) => "Submarine" === item.name).id;

        player1.board.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        player2.board.setShip({
            id: shipId2,
            position: [6, 3],
            axis: "vertical",
            direction: "down",
        });

        const actual = player1.attack(player2, [6, 5]);

        const expected = {
            success: true,
            message: "The attack hit a ship",
        };

        expect(actual).toEqual(expected);
    });
});
