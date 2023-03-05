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

    return {
        increaseHit() {
            return (hits += 1);
        },
        isSunk() {
            return hits === length;
        },
        setPos(position) {
            pos = position;
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
