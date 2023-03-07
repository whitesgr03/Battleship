import { gameController } from "./handleGameController";
import { common } from "./handleCommon";

const strategyPanel = (() => {
    // catch DOM
    const strategyPanelElement = document.querySelector(".strategyPanel");
    const shipsSource = require.context(
        "../img/strategyPanel/ships",
        false,
        /.\/(?=.+?_panel).+/
    );
    const shipsImage = common.load(shipsSource);
    return {
        shipsImage,
        resetContainer() {
            const container = strategyPanelElement.querySelector(".container");
            container.replaceWith(common.createGrid());
        },
        resetShips() {
            const silhouettes = Array.from(
                strategyPanelElement.querySelectorAll(".silhouette")
            );

            for (let el of silhouettes) {
                if (el.closest(".ships")) {
                    const message = el.querySelector("span");
                    message.textContent = "";
                    message.className = "";
                    el.hidden = false;
                } else {
                    el.remove();
                }
            }
        },
        togglePositionColor(position) {
            for (let [x, y] of position) {
                const grid = strategyPanelElement.querySelector(
                    `[data-x='${x}'][data-y='${y}']`
                );

                grid.classList.toggle("placed");
            }
        },
        cancelSelectedShip() {
            const hasSelectedShip =
                strategyPanelElement.querySelector(".selected") ?? false;
            if (!hasSelectedShip) return;

            hasSelectedShip.classList.remove("selected");
        },
        disableRotateBtn() {
            const rotateBtn =
                strategyPanelElement.querySelector(".rotateBtn") ?? false;
            if (!rotateBtn) return;

            rotateBtn.disabled = true;
        },
        isAllShipsSet() {
            const firstPlayer = gameController.getFirstPlayer();

            const silhouettes = Array.from(
                strategyPanelElement.querySelectorAll(".silhouette")
            );

            let allShipSet = true;

            for (let el of silhouettes) {
                const ship = firstPlayer.board.getShip(el.dataset.name);
                const message = el.querySelector("span");

                if (!ship || !el.closest(".container")) {
                    message.textContent =
                        "This ship has not set a position yet";
                    message.className = "message";
                    allShipSet = false;
                } else {
                    message.textContent = "";
                    message.className = "";
                }
            }

            return allShipSet;
        },
    };
})();

export { strategyPanel };
