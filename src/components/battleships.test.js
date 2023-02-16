import { createBattleship } from "./handleBattleships";
import { createPlayer } from "./handlePlayer";
import { SHIP_LIST } from "./handleShip";

describe("attackBy() should input player name and position", () => {
    test("input wrong player name", () => {
        const player1 = createPlayer("Jack");
        const player2 = createPlayer("Brand");

        const game = createBattleship(player1, player2);

        const actual = game.attackBy("anonymous", [3, 3]);

        const expected = {
            success: false,
            message: "You sent the wrong player name.",
        };

        expect(actual).toEqual(expected);
    });
    test("continuous attack", () => {
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

        const game = createBattleship(player1, player2);

        game.attackBy("Jack", [3, 3]);

        const actual = game.attackBy("Jack", [4, 3]);

        const expected = {
            success: false,
            message: "Please wait for Brand to attack.",
        };

        expect(actual).toEqual(expected);
    });
    test("All of enemy ships have been sunk", () => {
        const player1 = createPlayer("Jack");
        const player2 = createPlayer("Brand");

        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        player1.board.setShip({
            name: "Submarine",
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });
        player2.board.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        const game = createBattleship(player1, player2);

        game.attackBy("Jack", [3, 3]);

        game.attackBy("Brand", [3, 3]);
        const actual = game.attackBy("Jack", [3, 4]);

        const expected = {
            success: true,
            message: "Jack win, all the enemy ships are sunk.",
        };

        expect(actual).toEqual(expected);
    });
    test("attack after game over ", () => {
        const player1 = createPlayer("Jack");
        const player2 = createPlayer("Brand");

        const shipId = SHIP_LIST.find((item) => "Patrol Boat" === item.name).id;

        player1.board.setShip({
            name: "Submarine",
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });
        player2.board.setShip({
            id: shipId,
            position: [3, 3],
            axis: "vertical",
            direction: "down",
        });

        const game = createBattleship(player1, player2);

        game.attackBy("Jack", [3, 3]);

        game.attackBy("Brand", [3, 3]);

        game.attackBy("Jack", [3, 4]);

        const actual = game.attackBy("Brand", [3, 3]);

        const expected = {
            success: false,
            message: "The game is over, please start the next game.",
        };

        expect(actual).toEqual(expected);
    });
});
