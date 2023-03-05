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

            if (attackedPos.has(pos)) {
                return {
                    success: false,
                    state: "repeat",
                    message:
                        "attack position has been attacked",
                };
            }

            const result = target.board.receiveAttack(position);

            if (result.success) {
                attackedPos.add(pos);
            }

            return result;
        },
        getAttackedPos() {
            return attackedPos;
        },
    };
};

export { createPlayer };
