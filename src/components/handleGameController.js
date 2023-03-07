const gameController = (() => {
    let players = {
        firstPlayer: null,
        secondPlayer: null,
    };

    let attacker = null;
    let endGame = false;

    return {
        getFirstPlayer() {
            return players.firstPlayer;
        },
        getSecondPlayer() {
            return players.secondPlayer;
        },
        setFirstPlayerBoard(newPlayer) {
            return (players.secondPlayer = newPlayer);
        },
        setSecondPlayer(newPlayer) {
            return (players.secondPlayer = newPlayer);
        },
        setPlayers(firstPlayer, secondPlayer) {
            players.firstPlayer = firstPlayer;
            players.secondPlayer = secondPlayer;

            return players;
        },
        setAttacker(player) {
            return (attacker = player);
        },
        getAttacker() {
            return attacker;
        },
        toggleGameState() {
            return (endGame = !endGame);
        },
        isEndGame() {
            return endGame;
        },
    };
})();

export { gameController };
