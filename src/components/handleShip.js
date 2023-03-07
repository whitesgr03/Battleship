const SHIP_LIST = [
    { name: "Patrol Boat", length: 2 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 3 },
    { name: "Battleship", length: 4 },
    { name: "Carrier", length: 4 },
];

const createShip = ({ name } = {}) => {
    let ship = SHIP_LIST.find((item) => name === item.name);

    if (!ship) return false;

    return Object.assign(Object.create(setProto(ship)), {
        name: ship.name,
    });
};

const setProto = (ship) => {
    const length = ship.length;
    let hits = 0;
    let rotate = false;
    let pos = [];
    let centerPos = [];

    const createShipAllPos = (name, [x, y], isShipRotate) => {
        const shipPos = [[x, y]];

        if (isShipRotate) {
            if (name === "Carrier") {
                shipPos.push([x, y - 2]);
            }

            if (name === "Battleship") {
                shipPos.push([x, y + 2]);
            }

            if (name !== "Patrol Boat") {
                shipPos.push([x, y - 1]);
            }

            shipPos.push([x, y + 1]);
        } else {
            if (name === "Carrier") {
                shipPos.push([x + 2, y]);
            }

            if (name === "Battleship") {
                shipPos.push([x - 2, y]);
            }

            if (name !== "Patrol Boat") {
                shipPos.push([x + 1, y]);
            }

            shipPos.push([x - 1, y]);
        }

        return shipPos;
    };

    return {
        increaseHit() {
            return (hits += 1);
        },
        isSunk() {
            return hits === length;
        },
        setPos(position, isShipRotate) {
            if (position.length === 2) {
                pos = createShipAllPos(this.name, position, isShipRotate);
            } else {
                pos = [];
            }

            return [...pos];
        },
        getPos() {
            return [...pos];
        },
        getHealthyPercent() {
            return (100 / length) * hits;
        },
        setRotate(value) {
            return (rotate = value);
        },
        getRotate() {
            return rotate;
        },
        setCenterPos(position) {
            centerPos = position;
            return [...centerPos];
        },
        getCenterPos() {
            return [...centerPos];
        },
    };
};

export { createShip, SHIP_LIST };
