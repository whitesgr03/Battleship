import { createShip } from "./handleShip";

const createGameBoard = (size = 10) => {
    return Object.assign(Object.create(setProto(size)), {size});
};

const setProto = (size) => {
    const ships = [];

    const isOutsideBoard = ([x, y]) => {
        return x < 0 || y < 0 || x >= size || y >= size;
    };
    const isAllShipsSunk = (ships) => {
        return ships.every((ship) => ship.isSunk() === true);
    };
    const hasShip = ([x, y]) => {
        for (let i = 0; i < ships.length; i++) {
            const shipPos = ships[i].getPos();

            if (shipPos.find((pos) => pos[0] === x && pos[1] === y)) {
                return ships[i];
            }
        }
        return false;
    };
    const getShipPos = (ship, position, axis, direction) => {
        const pos = [];
        for (let i = 0; i < ship.getLength(); i++) {
            let [x, y] = position;

            if (axis === "horizontal") {
                if (direction === "left") {
                    x += i;
                }
                if (direction === "right") {
                    x -= i;
                }
            }
            if (axis === "vertical") {
                if (direction === "up") {
                    y -= i;
                }
                if (direction === "down") {
                    y += i;
                }
            }

            pos.push([x, y]);
        }
        return pos;
    };

    return {
        setShip({ id, name, position, axis, direction }) {
            const ship = createShip({ id, name });

            const shipPos = getShipPos(ship, position, axis, direction);

            for (let pos of shipPos) {
                if (isOutsideBoard(pos)) {
                    return {
                        success: false,
                        message: "Ship is out of range of the board",
                    };
                }

                if (hasShip(pos)) {
                    return {
                        success: false,
                        message: "Ship overlaps with other ships",
                    };
                }

                ship.setPos(pos);
            }

            ships.push(ship);

            return {
                success: true,
                name: ship.name,
                position: ship.getPos(),
            };
        },
        receiveAttack(position) {
            if (isOutsideBoard(position)) {
                return {
                    success: false,
                    state: 'out',
                    message: "attack is out of range of the board",
                };
            }

            const ship = hasShip(position);

            if (!ship)
                return {
                    success: true,
                    state: "missed",
                    message: "attack missed",
                };

            ship.increaseHit();

            if (isAllShipsSunk(ships)) {
                return {
                    success: true,
                    state: "win",
                    message: "win, all the enemy ships are sunk.",
                };
            }

            return {
                success: true,
                state: "hit",
                message: "attack hit a ship",
            };
        },
    };
};

export { createGameBoard };
