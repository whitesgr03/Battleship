const createPlayer = (name, board) => {
    return Object.assign(Object.create(setProto()), {
        name,
        board,
    });
};

const setProto = () => {
    const attackedPos = new Set();

    return {
        attack(target, position) {
            const pos = `(${position[0]}, ${position[1]})`;

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
