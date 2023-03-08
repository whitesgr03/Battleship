"use strict";

import "./css/style.css";

import { createShip } from "./components/handleShip";
import { createGameBoard } from "./components/handleGameBoard";
import { createPlayer } from "./components/handlePlayer";

import { strategyPanel } from "./components/handleStrategyPanel";
import { battlePanel } from "./components/handleBattlePanel";
import { gameController } from "./components/handleGameController";
import { common } from "./components/handleCommon";

const createBattleShip = () => {
    // catch DOM
    const mainElement = document.querySelector("main");

    // Event
    mainElement.addEventListener("pointerdown", startGame);

    function startGame(e) {
        const startBtn = e.target.closest(".startBtn");

        if (!startBtn || mainElement.classList.contains("loading")) return;

        mainElement.classList.add("loading");

        const startScreenElement = mainElement.querySelector(".startScreen");
        const gameBoardELement = mainElement.querySelector(".gameBoard");

        const firstPlayerName =
            startScreenElement.querySelector(".firstPlayerName")?.textContent ??
            "You";
        const secondPlayerName =
            startScreenElement.querySelector(".secondPlayerName")
                ?.textContent ?? "Computer";

        const firstPlayer = createPlayer(firstPlayerName, createGameBoard());
        const secondPlayer = createPlayer(secondPlayerName, createGameBoard());

        gameController.setPlayers(firstPlayer, secondPlayer);
        battlePanel.setFieldName();

        strategyPanel.resetContainer();

        mainElement.addEventListener(
            "transitionend",
            function showStrategyPanel(e) {
                if (e.target !== mainElement) return;

                startScreenElement.hidden = true;
                gameBoardELement.hidden = false;

                const strategyPanelElement =
                    gameBoardELement.querySelector(".strategyPanel");

                strategyPanelElement.addEventListener(
                    "pointerdown",
                    activeStrategyPanel
                );

                mainElement.classList.remove("loading");

                this.removeEventListener("transitionend", showStrategyPanel);
            }
        );

        mainElement.removeEventListener("pointerdown", startGame);
    }

    function activeStrategyPanel(e) {
        const target = e.target;

        if (target.closest(".rotateBtn")) {
            rotateShip(e);
            return;
        }

        strategyPanel.cancelSelectedShip();
        strategyPanel.disableRotateBtn();

        if (target.closest(".silhouette")) {
            selectShip(e);
            return;
        }

        if (target.closest(".resetBtn")) {
            const firstPlayer = gameController.getFirstPlayer();

            firstPlayer.board = createGameBoard();

            strategyPanel.resetContainer();
            strategyPanel.resetShips();
            return;
        }

        if (target.closest(".startBattleBtn")) {
            if (!strategyPanel.isAllShipsSet()) return;

            startBattle();

            this.addEventListener(
                "transitionend",
                function hiddenStrategyPanel(e) {
                    if (e.target !== this) return;

                    this.hidden = true;

                    this.removeEventListener(
                        "transitionend",
                        hiddenStrategyPanel
                    );
                }
            );
            this.removeEventListener("pointerdown", activeStrategyPanel);
            this.classList.remove("blur");
        }
    }

    function selectShip(e) {
        const silhouetteElement = e.target.closest(".silhouette");
        const silhouetteCoord = silhouetteElement.getBoundingClientRect();
        if (
            silhouetteCoord.left < 0 ||
            silhouetteCoord.top < 0 ||
            silhouetteCoord.right > document.documentElement.clientWidth ||
            silhouetteCoord.bottom > document.documentElement.clientHeight
        ) {
            return;
        }

        const panelElement = mainElement.querySelector(".panel");
        const rotateBtn = panelElement.querySelector(".rotateBtn");
        const shipImage = silhouetteElement.querySelector("img");
        const message = silhouetteElement.querySelector("span");

        const pointerdownX = e.clientX;
        const pointerdownY = e.clientY;

        const shiftX = e.clientX - silhouetteCoord.left;
        const shiftY = e.clientY - silhouetteCoord.top;

        const firstPlayer = gameController.getFirstPlayer();
        const isShipRotate =
            shipImage.classList.contains("rotateDown") ?? false;

        const { name } = silhouetteElement.dataset;
        let ship = firstPlayer.board.getShip(name) ?? false;

        const moveAt = (coordX, coordY) => {
            silhouetteElement.style.left = coordX + "px";
            silhouetteElement.style.top = coordY + "px";
        };
        const dragShip = (e) => {
            const panelCoord = panelElement.getBoundingClientRect();
            let moved = null;

            if (ship && ship.getPos().length !== 0) {
                strategyPanel.togglePositionColor(ship.getPos());
                ship.setPos([]);
            }

            if (
                !moved &&
                (e.clientX !== pointerdownX || e.clientY !== pointerdownY)
            ) {
                silhouetteElement.addEventListener("pointerup", placeShip);
                silhouetteElement.removeEventListener("pointerup", stopDrag);
                silhouetteElement.style.zIndex = 1000;
                silhouetteElement.style.position = "absolute";
                silhouetteElement.style.transform = "none";
                panelElement.append(silhouetteElement);
                moved = true;
            }

            let leftEdge = e.clientX - shiftX;
            const rightEdge = panelCoord.right - silhouetteElement.offsetWidth;

            let topEdge = e.clientY - shiftY;
            const bottomEdge =
                panelCoord.bottom - silhouetteElement.offsetHeight;

            if (
                leftEdge < 0 ||
                leftEdge > rightEdge ||
                topEdge < panelCoord.top ||
                topEdge > bottomEdge
            ) {
                stopDrag();
                return;
            }

            moveAt(leftEdge, topEdge);
        };
        const placeShip = (e) => {
            silhouetteElement.hidden = true;

            const droppableBelow = document
                .elementFromPoint(e.clientX, e.clientY)
                .closest(".container > div");

            silhouetteElement.hidden = false;

            if (droppableBelow) {
                const position = [
                    +droppableBelow.dataset.x,
                    +droppableBelow.dataset.y,
                ];

                if (!ship) {
                    ship = createShip({ name: name });
                    firstPlayer.board.addShip(ship);
                }

                const newShipPos = ship.setPos(position, isShipRotate);

                if (
                    firstPlayer.board.isOutBounds(newShipPos) ||
                    firstPlayer.board.isOverlapShip(newShipPos, name)
                ) {
                    message.textContent = "cannot be set at this position";
                    message.className = "message";
                    ship.setPos([]);
                } else {
                    const src = strategyPanel.shipsImage[name.toLowerCase()];

                    if (src) {
                        shipImage.src = src;
                    }

                    silhouetteElement.style = "";
                    droppableBelow.append(silhouetteElement);
                    ship.setRotate(isShipRotate);
                    ship.setCenterPos(position);
                    strategyPanel.togglePositionColor(newShipPos);
                }
            }

            stopDrag();
        };
        const stopDrag = () => {
            panelElement.removeEventListener("pointermove", dragShip);
            silhouetteElement.removeEventListener("pointerup", placeShip);
            silhouetteElement.removeEventListener("pointerup", stopDrag);
        };

        if (silhouetteElement.closest(".ships")) {
            const clone = silhouetteElement.cloneNode(true);
            clone.hidden = true;
            silhouetteElement.insertAdjacentElement("afterend", clone);
        }

        silhouetteElement.classList.add("selected");
        rotateBtn.disabled = false;

        if (isShipRotate) {
            rotateBtn.querySelector("img").className = "";
        } else {
            rotateBtn.querySelector("img").className = "rotateDown";
        }

        message.textContent = "";
        message.className = "";

        silhouetteElement.addEventListener(
            "dragstart",
            (e) => {
                e.preventDefault();
            },
            { once: true }
        );
        silhouetteElement.addEventListener("pointerup", stopDrag);
        panelElement.addEventListener("pointermove", dragShip);
    }

    function rotateShip(e) {
        const selectedShipElement =
            mainElement.querySelector(".selected") ?? false;
        if (!selectedShipElement) return;

        const shipImage = selectedShipElement.querySelector("img");

        const rotateBtnImage = e.target.querySelector("img") ?? e.target;

        const { name } = selectedShipElement.dataset;

        const firstPlayer = gameController.getFirstPlayer();
        const ship = firstPlayer.board.getShip(name);

        if (ship && selectedShipElement.closest(".container")) {
            const isShipRotate = shipImage.classList.contains("rotateDown")
                ? false
                : true;

            const position = [
                +selectedShipElement.parentElement.dataset.x,
                +selectedShipElement.parentElement.dataset.y,
            ];

            const shipPos = ship.getPos();

            strategyPanel.togglePositionColor(shipPos);

            let newShipPos = ship.setPos(position, isShipRotate);

            if (
                firstPlayer.board.isOutBounds(newShipPos) ||
                firstPlayer.board.isOverlapShip(newShipPos, name)
            ) {
                const message = selectedShipElement.querySelector("span");
                message.textContent = "cannot rotate at this position";
                message.className = "message";
                ship.setPos(position, !isShipRotate);
                strategyPanel.togglePositionColor(shipPos);
                return;
            } else {
                ship.setCenterPos(position);
                ship.setRotate(isShipRotate);
                strategyPanel.togglePositionColor(newShipPos);
            }
        }

        shipImage.classList.toggle("rotateDown");
        rotateBtnImage.classList.toggle("rotateDown");
    }

    function startBattle() {
        const firstPlayer = gameController.getFirstPlayer();
        const secondPlayer = gameController.getSecondPlayer();

        gameController.setAttacker(firstPlayer);

        if (gameController.isEndGame()) {
            gameController.toggleGameState();
        }

        battlePanel.resetContainer();
        battlePanel.resetFleetState();
        battlePanel.resetFieldActiveHover();
        battlePanel.setShip();

        if (secondPlayer.name === "Computer") {
            battlePanel.createComputer();
        }

        const battlePanelElement = mainElement.querySelector(".battlePanel");
        battlePanelElement.addEventListener("pointerdown", activeBattlePanel);
    }

    function activeBattlePanel(e) {
        const target = e.target;

        if (
            !gameController.isEndGame() &&
            target.closest(".field .container > div")
        ) {
            const position = [+e.target.dataset.x, +e.target.dataset.y];

            const attacker = gameController.getAttacker();

            if (attacker.isDuplicateAttack(position)) return;

            sendAttack(position);
            return;
        }

        if (target.closest(".settingBtn")) {
            showAlertPanel();
        }
    }

    function sendAttack([x, y]) {
        const attacker = gameController.getAttacker();
        const firstPlayer = gameController.getFirstPlayer();
        const secondPlayer = gameController.getSecondPlayer();

        const battlePanelElement = mainElement.querySelector(".battlePanel");

        let attackedPlayer = null;

        if (attacker.name === firstPlayer.name) {
            attackedPlayer = secondPlayer;
        } else {
            attackedPlayer = firstPlayer;
        }

        const attackerField = battlePanelElement.querySelector(
            `.field[data-owner="${attacker.name}"]`
        );
        const attackedPlayerField = battlePanelElement.querySelector(
            `.field[data-owner="${attackedPlayer.name}"]`
        );

        const grid = attackedPlayerField.querySelector(
            `.container div[data-x="${x}"][data-y="${y}"]`
        );

        const hitShip = attacker.attack(attackedPlayer, [x, y]);

        if (hitShip) {
            grid.classList.add("hit");

            if (attacker.name === "Computer") {
                const ship = battlePanelElement.querySelector(
                    `.ship[data-name="${hitShip.name}"]`
                );

                const shipState = battlePanelElement.querySelector(
                    `.fleetState img[data-name="${hitShip.name}"]`
                );

                shipState.style.setProperty(
                    "--damaged-percent",
                    `${hitShip.getHealthyPercent()}%`
                );

                ship.addEventListener(
                    "animationend",
                    () => {
                        ship.addEventListener(
                            "transitionend",
                            () => {
                                ship.remove();
                            },
                            {
                                once: true,
                            }
                        );

                        if (hitShip.isSunk()) {
                            ship.classList.add("destroyed");
                            attacker.setPreviousHitPos(null);
                            attacker.setPossiblePos([]);
                        } else {
                            const hasPreviousPos = attacker.getPreviousHitPos();

                            if (hasPreviousPos) {
                                const sameAxisPos = attacker.filterPossiblePos([
                                    x,
                                    y,
                                ]);
                                attacker.setPossiblePos(sameAxisPos);
                            } else {
                                const possiblePos = attacker.calcPossiblePos([
                                    x,
                                    y,
                                ]);

                                attacker.setPossiblePos(possiblePos);
                                attacker.setPreviousHitPos([x, y]);
                            }
                        }

                        ship.classList.remove("shake");
                        attackerField.style.pointerEvents = "auto";
                    },
                    { once: true }
                );

                ship.classList.add("shake");
                attackerField.style.pointerEvents = "none";
            }
        } else {
            grid.classList.add("missed");
        }

        if (attackedPlayer.board.isAllShipsSunk()) {
            gameController.toggleGameState();

            attackedPlayerField.classList.remove("activeHover");

            showAlertPanel(attacker.name);
            return;
        }

        attacker.addAttackedPos([x, y]);

        attackedPlayerField.classList.remove("activeHover");
        attackerField.classList.add("activeHover");

        const newAttacker = gameController.setAttacker(attackedPlayer);

        if (newAttacker.name === "Computer") {
            let position = null;

            do {
                const possiblePos = newAttacker.getPossiblePos();

                if (possiblePos.length > 0) {
                    const index = common.randomInteger(
                        0,
                        possiblePos.length - 1
                    );

                    position = possiblePos.splice(index, 1)[0];
                } else {
                    position = [
                        common.randomInteger(1, 10),
                        common.randomInteger(1, 10),
                    ];
                }
            } while (newAttacker.isDuplicateAttack(position));

            sendAttack(position);
        }
    }

    function showAlertPanel(winner = null) {
        const alertPanel = mainElement.querySelector(".alertPanel");

        let alert = null;

        alertPanel.addEventListener(
            "pointerdown",
            function activeAlertPanel(e) {
                const target = e.target;

                if (target.closest(".returnBtn")) {
                    target.addEventListener(
                        "animationend",
                        function closeAlertPanel() {
                            target.classList.remove("clickEffect");
                            alert.classList.remove("show");
                            alertPanel.classList.remove("blur");

                            this.removeEventListener(
                                "animationend",
                                closeAlertPanel
                            );
                        }
                    );

                    target.classList.add("clickEffect");
                    this.removeEventListener("pointerdown", activeAlertPanel);
                    return;
                }
                if (target.closest(".restartBtn")) {
                    const strategyPanelElement =
                        mainElement.querySelector(".strategyPanel");
                    const firstPlayer = gameController.getFirstPlayer();
                    const secondPlayer = gameController.getSecondPlayer();

                    target.addEventListener(
                        "animationend",
                        function restartGame() {
                            strategyPanelElement.addEventListener(
                                "pointerdown",
                                activeStrategyPanel
                            );

                            strategyPanelElement.classList.add("blur");

                            target.classList.remove("clickEffect");
                            alert.classList.remove("show");
                            alertPanel.classList.remove("blur");

                            battlePanel.resetContainer();
                            battlePanel.resetFleetState();

                            this.removeEventListener(
                                "animationend",
                                restartGame
                            );
                        }
                    );

                    target.classList.add("clickEffect");

                    strategyPanel.resetContainer();
                    strategyPanel.resetShips();

                    const newFirstPlayer = createPlayer(
                        firstPlayer.name,
                        createGameBoard()
                    );
                    const newSecondPlayer = createPlayer(
                        secondPlayer.name,
                        createGameBoard()
                    );

                    gameController.setPlayers(newFirstPlayer, newSecondPlayer);

                    strategyPanelElement.hidden = false;

                    this.removeEventListener("pointerdown", activeAlertPanel);
                    return;
                }
                if (!winner && target.closest(".quitBtn")) {
                    target.addEventListener(
                        "animationend",
                        function quitGame() {
                            mainElement.addEventListener(
                                "transitionend",
                                function showMenu(e) {
                                    if (e.target !== mainElement) return;

                                    const startScreenElement =
                                        mainElement.querySelector(
                                            ".startScreen"
                                        );
                                    const gameBoardElement =
                                        mainElement.querySelector(".gameBoard");

                                    const strategyPanelElement =
                                        gameBoardElement.querySelector(
                                            ".strategyPanel"
                                        );

                                    startScreenElement.hidden = false;
                                    gameBoardElement.hidden = true;

                                    mainElement.addEventListener(
                                        "pointerdown",
                                        startGame
                                    );

                                    mainElement.classList.remove("loading");

                                    strategyPanelElement.classList.add("blur");
                                    strategyPanelElement.hidden = false;

                                    battlePanel.resetContainer();
                                    battlePanel.resetFleetState();

                                    strategyPanel.resetShips();

                                    target.classList.remove("clickEffect");
                                    alert.classList.remove("show");
                                    alertPanel.classList.remove("blur");

                                    this.removeEventListener(
                                        "transitionend",
                                        showMenu
                                    );
                                }
                            );
                            mainElement.classList.add("loading");
                            this.removeEventListener("animationend", quitGame);
                        }
                    );

                    target.classList.add("clickEffect");

                    this.removeEventListener("pointerdown", activeAlertPanel);
                }
            }
        );

        if (winner) {
            alert = alertPanel.querySelector(".result");
            alert.querySelector(
                ".winner"
            ).textContent = `${winner.toUpperCase()} WIN`;
        } else {
            alert = alertPanel.querySelector(".alert");
        }

        alert.classList.add("show");
        alertPanel.classList.add("blur");
    }

    function preloadImage() {
        const shipList = ["carrier", "battleship", "patrol boat"];
        for (let ship of shipList) {
            const img = document.createElement("img");

            img.src = strategyPanel.shipsImage[ship];
            img.style.cssText = "opacity: 0";
            mainElement.append(img);
            img.remove();
        }
    }
    preloadImage();
};

createBattleShip();
