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
    let pos = [];

    return {
        increaseHit() {
            return (hits += 1);
        },
        isSunk() {
            if (hits === length) {
                return true;
            }
            return false;
        },
        setPos(position) {
            pos.push(position);
            return position;
        },
        getPos() {
            return pos;
        },
        getLength() {
            return length;
        },
    };
};

export { createShip, SHIP_LIST };
