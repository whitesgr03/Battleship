import { gameController } from "./handleGameController";
import { createShip, SHIP_LIST } from "./handleShip";
import { common } from "./handleCommon";

const battlePanel = (() => {
    // catch DOM
    const battlePanelElement = document.querySelector(".battlePanel");
    const shipsSource = require.context(
        "../img/battlefield/ships",
        false,
        /.\/(?!\w+?_state).+/
    );
    const shipsImg = common.load(shipsSource);

    return {
        resetContainer() {
            const fields = battlePanelElement.querySelectorAll(".container");
            for (let el of fields) {
                el.replaceWith(common.createGrid());
            }
        },
        resetFleetState() {
            const fleetStateImages =
                battlePanelElement.querySelectorAll(".fleetState img");

            for (let el of fleetStateImages) {
                el.style = "";
            }
        },
        setFieldName() {
            const players = {
                firstPlayer: gameController.getFirstPlayer(),
                secondPlayer: gameController.getSecondPlayer(),
            };

            for (let player in players) {
                const field = battlePanelElement.querySelector(
                    `.field[data-player="${player}"]`
                );

                field.dataset.owner = players[player].name;

                field.querySelector(".name").textContent = players[player].name;
            }
        },
        resetFieldActiveHover() {
            const attacker = gameController.getAttacker();

            const field =
                battlePanelElement.querySelectorAll(`.field[data-player]`);

            for (let el of field) {
                if (el.dataset.owner !== attacker.name) {
                    el.classList.add("activeHover");
                }
            }
        },
        setShip() {
            const firstPlayer = gameController.getFirstPlayer();

            for (let ship of firstPlayer.board.getAllShips()) {
                const name = ship.name;
                const isRotate = ship.getRotate();
                const [x, y] = ship.getCenterPos();
                const src = shipsImg[name.toLowerCase()];

                const grid = battlePanelElement.querySelector(
                    `.field[data-owner="${firstPlayer.name}"] div[data-x='${x}'][data-y='${y}']`
                );

                const template = `<div class="ship" data-name="${name}">
                <img class="${isRotate ? "rotateDown" : ""}"
                    src="${src}"
                />
            </div>`;

                grid.innerHTML = template;
            }
        },
        createComputer() {
            const secondPlayer = gameController.getSecondPlayer();
            const list = [...SHIP_LIST];

            while (list.length !== 0) {
                const shipIndex = randomInteger(0, list - 1);

                const { name } = list.splice(shipIndex, 1)[0];

                let ship = secondPlayer.board.getShip(name);

                if (!ship) {
                    ship = createShip({ name: name });
                    secondPlayer.board.addShip(ship);
                }

                let isShipRotate = null;
                let shipPos = null;
                let position = null;

                do {
                    position = this.getComputerPos();

                    isShipRotate = randomInteger(0, 1) === 0 ? true : false;

                    shipPos = ship.setPos(position, isShipRotate);
                } while (
                    secondPlayer.board.isOutBounds(shipPos) ||
                    secondPlayer.board.isOverlapShip(shipPos, name)
                );

                ship.setRotate(isShipRotate);
                ship.setCenterPos(position);
            }
        },
    };
})();

export { battlePanel };
