const createBattleship = (p1, p2) => {
    return Object.create(setProto(p1, p2));
};

const setProto = (p1, p2) => {
    let gameOver = false;
    let lastAttacker = null;

    const players = {
        [p1.name]: p1,
        [p2.name]: p2,
    };

    const getRandomPosition = (min, max) => {
        const pos = [];

        for (let i = 0; i < 2; i++) {
            const rand = Math.floor(min + Math.random() * (max - min + 1));
            pos.push(rand);
        }

        return pos;
    };

    return {
        attackBy(name, position) {
            if (gameOver) {
                console.log("The game is over, please start the next game.");
                return {
                    success: false,
                    message: "The game is over, please start the next game.",
                };
            }

            if (!players[name]) {
                console.log("You sent the wrong player name.");
                return {
                    success: false,
                    message: "You sent the wrong player name.",
                };
            }

            let attacker = null;
            let opponent = null;

            if (name === p1.name) {
                attacker = p1;
                opponent = p2;
            } else {
                attacker = p2;
                opponent = p1;
            }

            if (attacker.name === lastAttacker) {
                console.log(`Please wait for ${opponent.name} to attack.`);
                return {
                    success: false,
                    message: `Please wait for ${opponent.name} to attack.`,
                };
            }

            const result = attacker.attack(opponent, position);

            console.log(`Attack By ${attacker.name}`);

            if (!result.success) {
                result.message += ", needs to choose a new position.";
            }

            console.log(`${attacker.name} ${result.message}`);

            switch (result.state) {
                case "out":
                case "repeat":
                    lastAttacker = opponent.name;
                    return;
                case "missed":
                case "hit":
                    if (opponent.board.isAllShipsSunk()) {
                        gameOver = true;
                        console.log(
                            `${attacker.name} win, all the enemy ships are sunk.`
                        );
                        return {
                            success: true,
                            message: `${attacker.name} win, all the enemy ships are sunk.`,
                        };
                    }
                    lastAttacker = attacker.name;
                    console.log(`It's ${opponent.name} turn now.`);
                    break;
            }

            if (opponent.name === "com") {
                const attackedPos = opponent.getAttackedPos();

                let [x, y] = getRandomPosition(0, opponent.board.size - 1);

                const pos = `(${x}, ${y})`;

                while (attackedPos.has(pos)) {
                    [x, y] = getRandomPosition(0, opponent.board.size - 1);
                }

                this.attackBy("com", [x, y]);
            }
        },
    };
};

export { createBattleship };
