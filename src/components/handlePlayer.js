import { createGameBoard } from "./handleGameBoard";

const createPlayer = (name) => {
    return Object.assign(Object.create(setProto()), {
        name,
        board: createGameBoard(),
    });
};

const setProto = () => {
    const attackedPos = new Set();
    const getPos = ([x, y]) => {
        return `(${x}, ${y})`;
    };

    return {
        attack(target, position) {
            const pos = getPos(position);

            if (attackedPos.has(pos)) {
                return {
                    success: false,
                    message: "This position has already been attacked",
                };
            }

            const result = target.board.receiveAttack(position);

            if (result.success) {
                attackedPos.add(pos);
            }

            return result;
        },
    };
};

export { createPlayer };
