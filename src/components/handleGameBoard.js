const createGameBoard = ({ size } = 10) => {
    return Object.assign(Object.create(setProto(size)), { size });
};

const setProto = (size) => {
    const ships = [];

    const getAdjacentPos = (pos) => {
        const adjacentPos = [];

        const posX = pos.map(([x]) => x);
        const posY = pos.map(([, y]) => y);

        const isRotate = posX.every((x) => x === posX[0]);

        if (isRotate) {
            const [maxPosY, minPosY] = [Math.max(...posY), Math.min(...posY)];

            for (let y of posY) {
                adjacentPos.push([posX[0] + 1, y]);
                adjacentPos.push([posX[0] - 1, y]);
            }

            adjacentPos.push([posX[0] + 1, maxPosY + 1]);
            adjacentPos.push([posX[0], maxPosY + 1]);
            adjacentPos.push([posX[0] - 1, maxPosY + 1]);

            adjacentPos.push([posX[0] + 1, minPosY - 1]);
            adjacentPos.push([posX[0], minPosY - 1]);
            adjacentPos.push([posX[0] - 1, minPosY - 1]);
        } else {
            const [maxPosX, minPosX] = [Math.max(...posX), Math.min(...posX)];

            for (let x of posX) {
                adjacentPos.push([x, posY[0] + 1]);
                adjacentPos.push([x, posY[0] - 1]);
            }

            adjacentPos.push([maxPosX + 1, posY[0] + 1]);
            adjacentPos.push([maxPosX + 1, posY[0]]);
            adjacentPos.push([maxPosX + 1, posY[0] - 1]);

            adjacentPos.push([minPosX - 1, posY[0] + 1]);
            adjacentPos.push([minPosX - 1, posY[0]]);
            adjacentPos.push([minPosX - 1, posY[0] - 1]);
        }

        return adjacentPos;
    };

    return {
        addShip(ship) {
            ships = [...ships, ship];
            return ships;
        },
        getShip(name) {
            return ships.find((ship) => ship.name === name) ?? false;
        },
        getAllShips() {
            return [...ships];
        },
        isOutBounds(positions) {
            for (let [x, y] of positions) {
                if (x < 1 || y < 1 || x > size || y > size) {
                    return true;
                }
            }
            return false;
        },
        isOverlapShip(positions, name) {
            for (let ship of ships) {
                if (name !== ship.name) {
                    const allShipPos = [
                        ...ship.getPos(),
                        ...getAdjacentPos(ship.getPos()),
                    ];
                    const result = allShipPos.some(([x, y]) =>
                        positions.some(([x2, y2]) => x === x2 && y === y2)
                    );

                    if (result) return true;
                }
            }

            return false;
        },

            if (!ship)
                return {
                    success: true,
                    state: "missed",
                    message: "attack misses.",
                };

            ship.increaseHit();

            return {
                success: true,
                state: "hit",
                message: "hit a ship.",
            };
        },
        isAllShipsSunk() {
            return ships.every((ship) => ship.isSunk() === true);
        },
    };
};

export { createGameBoard };
