import { createGameBoard } from "./handleGameBoard";

const createPlayer = (name) => {
    return Object.assign(Object.create(setProto()), {
        name,
        board: createGameBoard(),
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
                    message: "attack position has been shot",
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
