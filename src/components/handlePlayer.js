const createPlayer = (name, board) => {
    const obj = {
        name,
        board,
    };

    if (name === "Computer") {
        obj.possiblePos = [];
        obj.previousHitPos = null;
    }

    return Object.assign(Object.create(setProto()), obj);
};

const setProto = () => {
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
