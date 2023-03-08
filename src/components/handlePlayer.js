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

export { createPlayer };
