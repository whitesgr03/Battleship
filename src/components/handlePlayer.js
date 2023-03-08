const createPlayer = (name, board) => {
    const obj = {
        name,
        board,
    };

    if (name === "Computer") {
        obj.previousHitPos = null;
        obj.possiblePos = [];

        const proto = Object.assign(origin(), computer());
        return Object.assign(Object.create(proto), obj);
    }

    return Object.assign(Object.create(origin()), obj);
};

const origin = () => {
    let attackedPos = [];

    return {
        attack(target, position) {
            return target.board.receiveAttack(position);
        },

        addAttackedPos(position) {
            attackedPos = [...attackedPos, position];
            return attackedPos;
        },
        isDuplicateAttack(position) {
            return attackedPos.some(
                ([x, y]) => position[0] === x && position[1] === y
            );
        },
    };
};

const computer = () => {
    let possiblePos = [];
    let previousHitPos = null;

    return {
        setPreviousHitPos(position) {
            previousHitPos = position;

            return this.getPreviousHitPos();
        },
        getPreviousHitPos() {
            if (!previousHitPos) return false;

            return [previousHitPos[0], previousHitPos[1]];
        },
        setPossiblePos(position) {
            possiblePos = position;
            return [...possiblePos];
        },
        getPossiblePos() {
            return [...possiblePos];
        },
        calcPossiblePos(position) {
            const array = [];
            const [x, y] = position;

            if (x + 1 <= 10) {
                array.push([x + 1, y]);
            }

            if (x - 1 >= 1) {
                array.push([x - 1, y]);
            }

            if (y + 1 <= 10) {
                array.push([x, y + 1]);
            }

            if (y - 1 >= 1) {
                array.push([x, y - 1]);
            }

            return array;
        },
        filterPossiblePos(current) {
            const previous = previousHitPos;
            const possible = [...possiblePos];

            let arr = [];

            if (previous[0] === current[0]) {
                arr = possible.filter(([x]) => x === previous[0]);

                if (current[1] > previous[1]) {
                    if (current[1] + 1 <= 10) {
                        arr.push([current[0], current[1] + 1]);
                    }
                } else {
                    if (current[1] - 1 >= 1) {
                        arr.push([current[0], current[1] - 1]);
                    }
                }
            } else {
                arr = possible.filter(([, y]) => y === previous[1]);

                if (current[0] > previous[0]) {
                    if (current[0] + 1 <= 10) {
                        arr.push([current[0] + 1, current[1]]);
                    }
                } else {
                    if (current[0] - 1 >= 1) {
                        arr.push([current[0] - 1, current[1]]);
                    }
                }
            }

            return arr;
        },
    };
};

export { createPlayer };
