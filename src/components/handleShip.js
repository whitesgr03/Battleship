const SHIP_LIST = [
    { id: 1, name: "Patrol Boat", length: 2 },
    { id: 2, name: "Submarine", length: 3 },
    { id: 3, name: "Destroyer", length: 3 },
    { id: 4, name: "Battleship", length: 4 },
    { id: 5, name: "Carrier", length: 5 },
];

const createShip = ({ id, name } = {}) => {
    let ship = SHIP_LIST.find((item) => id === item.id && name === item.name);

    if (!ship) {
        ship = {
            name: "Patrol Boat",
            length: 2,
        };
    }

    return Object.assign(Object.create(proto), {
        name: ship.name,
        length: ship.length,
        hits: 0,
        sunk: false,
    });
};

const proto = {
    increaseHit() {
        return (this.hits += 1);
    },
    isSunk() {
        return this.hits === this.length;
    },
};

export { createShip, SHIP_LIST };
