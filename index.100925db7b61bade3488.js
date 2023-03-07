(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([[826],{

/***/ 587:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

;// CONCATENATED MODULE: ./src/css/style.css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/handleShip.js
const SHIP_LIST = [{
  name: "Patrol Boat",
  length: 2
}, {
  name: "Submarine",
  length: 3
}, {
  name: "Destroyer",
  length: 3
}, {
  name: "Battleship",
  length: 4
}, {
  name: "Carrier",
  length: 4
}];
const createShip = function () {
  let {
    name
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let ship = SHIP_LIST.find(item => name === item.name);
  if (!ship) return false;
  return Object.assign(Object.create(setProto(ship)), {
    name: ship.name
  });
};
const setProto = ship => {
  const length = ship.length;
  let hits = 0;
  let rotate = false;
  let pos = [];
  let centerPos = [];
  const createShipAllPos = (name, _ref, isShipRotate) => {
    let [x, y] = _ref;
    const shipPos = [[x, y]];
    if (isShipRotate) {
      if (name === "Carrier") {
        shipPos.push([x, y - 2]);
      }
      if (name === "Battleship") {
        shipPos.push([x, y + 2]);
      }
      if (name !== "Patrol Boat") {
        shipPos.push([x, y - 1]);
      }
      shipPos.push([x, y + 1]);
    } else {
      if (name === "Carrier") {
        shipPos.push([x + 2, y]);
      }
      if (name === "Battleship") {
        shipPos.push([x - 2, y]);
      }
      if (name !== "Patrol Boat") {
        shipPos.push([x + 1, y]);
      }
      shipPos.push([x - 1, y]);
    }
    return shipPos;
  };
  return {
    increaseHit() {
      return hits += 1;
    },
    isSunk() {
      return hits === length;
    },
    setPos(position, isShipRotate) {
      if (position.length === 2) {
        pos = createShipAllPos(this.name, position, isShipRotate);
      } else {
        pos = [];
      }
      return [...pos];
    },
    getPos() {
      return [...pos];
    },
    getHealthyPercent() {
      return 100 / length * hits;
    },
    setRotate(value) {
      return rotate = value;
    },
    getRotate() {
      return rotate;
    },
    setCenterPos(position) {
      centerPos = position;
      return [...centerPos];
    },
    getCenterPos() {
      return [...centerPos];
    }
  };
};

;// CONCATENATED MODULE: ./src/components/handleGameBoard.js
const createGameBoard = function () {
  let {
    size = 10
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign(Object.create(handleGameBoard_setProto(size)), {
    size
  });
};
const handleGameBoard_setProto = size => {
  let ships = [];
  const getAdjacentPos = pos => {
    const adjacentPos = [];
    const posX = pos.map(_ref => {
      let [x] = _ref;
      return x;
    });
    const posY = pos.map(_ref2 => {
      let [, y] = _ref2;
      return y;
    });
    const isRotate = posX.every(x => x === posX[0]);
    if (isRotate) {
      const [maxPosY, minPosY] = [Math.max(...posY), Math.min(...posY)];
      for (let y of posY) {
        adjacentPos.push([posX[0] + 1, y]);
        adjacentPos.push([posX[0] - 1, y]);
      }
      adjacentPos.push([posX[0] + 1, maxPosY + 1]);
      adjacentPos.push([posX[0], maxPosY + 1]);
      adjacentPos.push([posX[0] - 1, maxPosY + 1]);
      adjacentPos.push([posX[0] + 1, minPosY - 1]);
      adjacentPos.push([posX[0], minPosY - 1]);
      adjacentPos.push([posX[0] - 1, minPosY - 1]);
    } else {
      const [maxPosX, minPosX] = [Math.max(...posX), Math.min(...posX)];
      for (let x of posX) {
        adjacentPos.push([x, posY[0] + 1]);
        adjacentPos.push([x, posY[0] - 1]);
      }
      adjacentPos.push([maxPosX + 1, posY[0] + 1]);
      adjacentPos.push([maxPosX + 1, posY[0]]);
      adjacentPos.push([maxPosX + 1, posY[0] - 1]);
      adjacentPos.push([minPosX - 1, posY[0] + 1]);
      adjacentPos.push([minPosX - 1, posY[0]]);
      adjacentPos.push([minPosX - 1, posY[0] - 1]);
    }
    return adjacentPos;
  };
  return {
    addShip(ship) {
      ships = [...ships, ship];
      return ships;
    },
    getShip(name) {
      return ships.find(ship => ship.name === name) ?? false;
    },
    getAllShips() {
      return [...ships];
    },
    isOutBounds(positions) {
      for (let [x, y] of positions) {
        if (x < 1 || y < 1 || x > size || y > size) {
          return true;
        }
      }
      return false;
    },
    isOverlapShip(positions, name) {
      for (let ship of ships) {
        if (name !== ship.name) {
          const allShipPos = [...ship.getPos(), ...getAdjacentPos(ship.getPos())];
          const result = allShipPos.some(_ref3 => {
            let [x, y] = _ref3;
            return positions.some(_ref4 => {
              let [x2, y2] = _ref4;
              return x === x2 && y === y2;
            });
          });
          if (result) return true;
        }
      }
      return false;
    },
    receiveAttack(attackedPos) {
      const [x, y] = attackedPos;
      const ship = ships.find(ship => ship.getPos().find(_ref5 => {
        let [shipPosX, shipPosY] = _ref5;
        return shipPosX === x && shipPosY === y;
      })) || false;
      if (ship) {
        ship.increaseHit();
      }
      return ship;
    },
    isAllShipsSunk() {
      return ships.every(ship => ship.isSunk());
    }
  };
};

;// CONCATENATED MODULE: ./src/components/handlePlayer.js
const createPlayer = (name, board) => {
  return Object.assign(Object.create(handlePlayer_setProto()), {
    name,
    board
  });
};
const handlePlayer_setProto = () => {
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
      return attackedPos.some(_ref => {
        let [x, y] = _ref;
        return position[0] === x && position[1] === y;
      });
    }
  };
};

;// CONCATENATED MODULE: ./src/components/handleGameController.js
const gameController = (() => {
  let players = {
    firstPlayer: null,
    secondPlayer: null
  };
  let attacker = null;
  let endGame = false;
  return {
    getFirstPlayer() {
      return players.firstPlayer;
    },
    getSecondPlayer() {
      return players.secondPlayer;
    },
    setFirstPlayerBoard(newPlayer) {
      return players.secondPlayer = newPlayer;
    },
    setSecondPlayer(newPlayer) {
      return players.secondPlayer = newPlayer;
    },
    setPlayers(firstPlayer, secondPlayer) {
      players.firstPlayer = firstPlayer;
      players.secondPlayer = secondPlayer;
      return players;
    },
    setAttacker(player) {
      return attacker = player;
    },
    getAttacker() {
      return attacker;
    },
    toggleGameState() {
      return endGame = !endGame;
    },
    isEndGame() {
      return endGame;
    }
  };
})();

;// CONCATENATED MODULE: ./src/components/handleCommon.js
const common = (() => {
  return {
    createGrid() {
      let column = 1;
      let row = 10;
      const container = document.createElement("div");
      container.className = "container";
      for (let i = 1; i <= 100; i++) {
        const div = document.createElement("div");
        div.dataset.x = column;
        div.dataset.y = row;
        column++;
        if (i % 10 === 0) {
          column = 1;
          row -= 1;
        }
        container.append(div);
      }
      return container;
    },
    load(resolve) {
      let obj = {};
      for (let key of resolve.keys()) {
        const keys = key.match(/(?<=\.\/).+?(?=_panel|\.png$)/g)[0];
        const url = resolve(key);
        obj[keys] = url;
      }
      return obj;
    }
  };
})();

;// CONCATENATED MODULE: ./src/components/handleStrategyPanel.js


const strategyPanel = (() => {
  // catch DOM
  const strategyPanelElement = document.querySelector(".strategyPanel");
  const shipsSource = __webpack_require__(382);
  const shipsImage = common.load(shipsSource);
  return {
    shipsImage,
    resetContainer() {
      const container = strategyPanelElement.querySelector(".container");
      container.replaceWith(common.createGrid());
    },
    resetShips() {
      const silhouettes = Array.from(strategyPanelElement.querySelectorAll(".silhouette"));
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
        const grid = strategyPanelElement.querySelector(`[data-x='${x}'][data-y='${y}']`);
        grid.classList.toggle("placed");
      }
    },
    cancelSelectedShip() {
      const hasSelectedShip = strategyPanelElement.querySelector(".selected") ?? false;
      if (!hasSelectedShip) return;
      hasSelectedShip.classList.remove("selected");
    },
    disableRotateBtn() {
      const rotateBtn = strategyPanelElement.querySelector(".rotateBtn") ?? false;
      if (!rotateBtn) return;
      rotateBtn.disabled = true;
    },
    isAllShipsSet() {
      const firstPlayer = gameController.getFirstPlayer();
      const silhouettes = Array.from(strategyPanelElement.querySelectorAll(".silhouette"));
      let allShipSet = true;
      for (let el of silhouettes) {
        const ship = firstPlayer.board.getShip(el.dataset.name);
        const message = el.querySelector("span");
        if (!ship || ship.getPos().length === 0) {
          message.textContent = "This ship has not set a position yet";
          message.className = "message";
          allShipSet = false;
        } else {
          message.textContent = "";
          message.className = "";
        }
      }
      return allShipSet;
    }
  };
})();

;// CONCATENATED MODULE: ./src/components/handleBattlePanel.js



const battlePanel = (() => {
  // catch DOM
  const battlePanelElement = document.querySelector(".battlePanel");
  const shipsSource = __webpack_require__(314);
  const shipsImg = common.load(shipsSource);
  const randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1));
  };
  return {
    resetContainer() {
      const fields = battlePanelElement.querySelectorAll(".container");
      for (let el of fields) {
        el.replaceWith(common.createGrid());
      }
    },
    resetFleetState() {
      const fleetStateImages = battlePanelElement.querySelectorAll(".fleetState img");
      for (let el of fleetStateImages) {
        el.style = "";
      }
    },
    setFieldName() {
      const players = {
        firstPlayer: gameController.getFirstPlayer(),
        secondPlayer: gameController.getSecondPlayer()
      };
      for (let player in players) {
        const field = battlePanelElement.querySelector(`.field[data-player="${player}"]`);
        field.dataset.owner = players[player].name;
        field.querySelector(".name").textContent = players[player].name;
      }
    },
    resetFieldActiveHover() {
      const attacker = gameController.getAttacker();
      const field = battlePanelElement.querySelectorAll(`.field[data-player]`);
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
        const grid = battlePanelElement.querySelector(`.field[data-owner="${firstPlayer.name}"] div[data-x='${x}'][data-y='${y}']`);
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
        const {
          name
        } = list.splice(shipIndex, 1)[0];
        let ship = secondPlayer.board.getShip(name);
        if (!ship) {
          ship = createShip({
            name: name
          });
          secondPlayer.board.addShip(ship);
        }
        let isShipRotate = null;
        let shipPos = null;
        let position = null;
        do {
          position = this.getComputerPos();
          isShipRotate = randomInteger(0, 1) === 0 ? true : false;
          shipPos = ship.setPos(position, isShipRotate);
        } while (secondPlayer.board.isOutBounds(shipPos) || secondPlayer.board.isOverlapShip(shipPos, name));
        ship.setRotate(isShipRotate);
        ship.setCenterPos(position);
      }
    },
    getComputerPos() {
      return [randomInteger(1, 10), randomInteger(1, 10)];
    }
  };
})();

;// CONCATENATED MODULE: ./src/index.js









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
    const firstPlayerName = startScreenElement.querySelector(".firstPlayerName")?.textContent ?? "You";
    const secondPlayerName = startScreenElement.querySelector(".secondPlayerName")?.textContent ?? "Computer";
    const firstPlayer = createPlayer(firstPlayerName, createGameBoard());
    const secondPlayer = createPlayer(secondPlayerName, createGameBoard());
    gameController.setPlayers(firstPlayer, secondPlayer);
    battlePanel.setFieldName();
    strategyPanel.resetContainer();
    mainElement.addEventListener("transitionend", function showStrategyPanel(e) {
      if (e.target !== mainElement) return;
      startScreenElement.hidden = true;
      gameBoardELement.hidden = false;
      const strategyPanelElement = gameBoardELement.querySelector(".strategyPanel");
      strategyPanelElement.addEventListener("pointerdown", activeStrategyPanel);
      mainElement.classList.remove("loading");
      this.removeEventListener("transitionend", showStrategyPanel);
    });
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
      this.addEventListener("transitionend", function hiddenStrategyPanel(e) {
        if (e.target !== this) return;
        this.hidden = true;
        this.removeEventListener("transitionend", hiddenStrategyPanel);
      });
      this.removeEventListener("pointerdown", activeStrategyPanel);
      this.classList.remove("blur");
    }
  }
  function selectShip(e) {
    const silhouetteElement = e.target.closest(".silhouette");
    const silhouetteCoord = silhouetteElement.getBoundingClientRect();
    if (silhouetteCoord.left < 0 || silhouetteCoord.top < 0 || silhouetteCoord.right > document.documentElement.clientWidth || silhouetteCoord.bottom > document.documentElement.clientHeight) {
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
    const isShipRotate = shipImage.classList.contains("rotateDown") ?? false;
    const {
      name
    } = silhouetteElement.dataset;
    let ship = firstPlayer.board.getShip(name) ?? false;
    const moveAt = (coordX, coordY) => {
      silhouetteElement.style.left = coordX + "px";
      silhouetteElement.style.top = coordY + "px";
    };
    const dragShip = e => {
      const panelCoord = panelElement.getBoundingClientRect();
      let moved = null;
      if (ship && ship.getPos().length !== 0) {
        strategyPanel.togglePositionColor(ship.getPos());
        ship.setPos([]);
      }
      if (!moved && (e.clientX !== pointerdownX || e.clientY !== pointerdownY)) {
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
      const bottomEdge = panelCoord.bottom - silhouetteElement.offsetHeight;
      if (leftEdge < 0 || leftEdge > rightEdge || topEdge < panelCoord.top || topEdge > bottomEdge) {
        stopDrag();
        return;
      }
      moveAt(leftEdge, topEdge);
    };
    const placeShip = e => {
      silhouetteElement.hidden = true;
      const droppableBelow = document.elementFromPoint(e.clientX, e.clientY).closest(".container > div");
      silhouetteElement.hidden = false;
      if (droppableBelow) {
        const position = [+droppableBelow.dataset.x, +droppableBelow.dataset.y];
        if (!ship) {
          ship = createShip({
            name: name
          });
          firstPlayer.board.addShip(ship);
        }
        const newShipPos = ship.setPos(position, isShipRotate);
        if (firstPlayer.board.isOutBounds(newShipPos) || firstPlayer.board.isOverlapShip(newShipPos, name)) {
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
    silhouetteElement.addEventListener("dragstart", e => {
      e.preventDefault();
    }, {
      once: true
    });
    silhouetteElement.addEventListener("pointerup", stopDrag);
    panelElement.addEventListener("pointermove", dragShip);
  }
  function rotateShip(e) {
    const selectedShipElement = mainElement.querySelector(".selected") ?? false;
    if (!selectedShipElement) return;
    const shipImage = selectedShipElement.querySelector("img");
    const rotateBtnImage = e.target.querySelector("img") ?? e.target;
    const {
      name
    } = selectedShipElement.dataset;
    const firstPlayer = gameController.getFirstPlayer();
    const ship = firstPlayer.board.getShip(name);
    if (ship && selectedShipElement.closest(".container")) {
      const isShipRotate = shipImage.classList.contains("rotateDown") ? false : true;
      const position = [+selectedShipElement.parentElement.dataset.x, +selectedShipElement.parentElement.dataset.y];
      const shipPos = ship.getPos();
      strategyPanel.togglePositionColor(shipPos);
      let newShipPos = ship.setPos(position, isShipRotate);
      if (firstPlayer.board.isOutBounds(newShipPos) || firstPlayer.board.isOverlapShip(newShipPos, name)) {
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
    if (!gameController.isEndGame() && target.closest(".field .container > div")) {
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
  function sendAttack(_ref) {
    let [x, y] = _ref;
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
    const attackerField = battlePanelElement.querySelector(`.field[data-owner="${attacker.name}"]`);
    const attackedPlayerField = battlePanelElement.querySelector(`.field[data-owner="${attackedPlayer.name}"]`);
    const grid = attackedPlayerField.querySelector(`.container div[data-x="${x}"][data-y="${y}"]`);
    const hitShip = attacker.attack(attackedPlayer, [x, y]);
    if (hitShip) {
      grid.classList.add("hit");
      if (attacker.name === "Computer") {
        const ship = battlePanelElement.querySelector(`.ship[data-name="${hitShip.name}"]`);
        const shipState = battlePanelElement.querySelector(`.fleetState img[data-name="${hitShip.name}"]`);
        ship.addEventListener("animationend", () => {
          ship.addEventListener("transitionend", () => {
            ship.remove();
          }, {
            once: true
          });
          if (hitShip.isSunk()) {
            ship.classList.add("destroyed");
          }
          ship.classList.remove("shake");
        }, {
          once: true
        });
        ship.classList.add("shake");
        shipState.style.setProperty("--damaged-percent", `${hitShip.getHealthyPercent()}%`);
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
        position = battlePanel.getComputerPos();
      } while (newAttacker.isDuplicateAttack(position));
      sendAttack(position);
    }
  }
  function showAlertPanel() {
    let winner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    const alertPanel = mainElement.querySelector(".alertPanel");
    let alert = null;
    alertPanel.addEventListener("pointerdown", function activeAlertPanel(e) {
      const target = e.target;
      if (target.closest(".returnBtn")) {
        target.addEventListener("animationend", function closeAlertPanel() {
          target.classList.remove("clickEffect");
          alert.classList.remove("show");
          alertPanel.classList.remove("blur");
          this.removeEventListener("animationend", closeAlertPanel);
        });
        target.classList.add("clickEffect");
        this.removeEventListener("pointerdown", activeAlertPanel);
        return;
      }
      if (target.closest(".restartBtn")) {
        const strategyPanelElement = mainElement.querySelector(".strategyPanel");
        const firstPlayer = gameController.getFirstPlayer();
        const secondPlayer = gameController.getSecondPlayer();
        target.addEventListener("animationend", function restartGame() {
          strategyPanelElement.addEventListener("pointerdown", activeStrategyPanel);
          strategyPanelElement.classList.add("blur");
          target.classList.remove("clickEffect");
          alert.classList.remove("show");
          alertPanel.classList.remove("blur");
          battlePanel.resetContainer();
          battlePanel.resetFleetState();
          this.removeEventListener("animationend", restartGame);
        });
        target.classList.add("clickEffect");
        strategyPanel.resetContainer();
        strategyPanel.resetShips();
        const newFirstPlayer = createPlayer(firstPlayer.name, createGameBoard());
        const newSecondPlayer = createPlayer(secondPlayer.name, createGameBoard());
        gameController.setPlayers(newFirstPlayer, newSecondPlayer);
        strategyPanelElement.hidden = false;
        this.removeEventListener("pointerdown", activeAlertPanel);
        return;
      }
      if (!winner && target.closest(".quitBtn")) {
        target.addEventListener("animationend", function quitGame() {
          mainElement.addEventListener("transitionend", function showMenu(e) {
            if (e.target !== mainElement) return;
            const startScreenElement = mainElement.querySelector(".startScreen");
            const gameBoardElement = mainElement.querySelector(".gameBoard");
            const strategyPanelElement = gameBoardElement.querySelector(".strategyPanel");
            startScreenElement.hidden = false;
            gameBoardElement.hidden = true;
            mainElement.addEventListener("pointerdown", startGame);
            mainElement.classList.remove("loading");
            strategyPanelElement.classList.add("blur");
            strategyPanelElement.hidden = false;
            battlePanel.resetContainer();
            battlePanel.resetFleetState();
            strategyPanel.resetShips();
            target.classList.remove("clickEffect");
            alert.classList.remove("show");
            alertPanel.classList.remove("blur");
            this.removeEventListener("transitionend", showMenu);
          });
          mainElement.classList.add("loading");
          this.removeEventListener("animationend", quitGame);
        });
        target.classList.add("clickEffect");
        this.removeEventListener("pointerdown", activeAlertPanel);
      }
    });
    if (winner) {
      alert = alertPanel.querySelector(".result");
      alert.querySelector(".winner").textContent = `${winner.toUpperCase()} WIN`;
    } else {
      alert = alertPanel.querySelector(".alert");
    }
    alert.classList.add("show");
    alertPanel.classList.add("blur");
  }
};
createBattleShip();

/***/ }),

/***/ 314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./battleship.png": 225,
	"./carrier.png": 343,
	"./destroyer.png": 772,
	"./patrol boat.png": 423,
	"./patrol boat_state.png": 679,
	"./submarine.png": 788
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 314;

/***/ }),

/***/ 382:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./battleship_panel.png": 163,
	"./carrier_panel.png": 24,
	"./patrol boat_panel.png": 565
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 382;

/***/ }),

/***/ 225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/325d58d23aabd0d98527.png";

/***/ }),

/***/ 343:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/0787b75f23f3cae80165.png";

/***/ }),

/***/ 772:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/bd7af8d4f8b2ea53a750.png";

/***/ }),

/***/ 423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/3aae7d62680cedb6850f.png";

/***/ }),

/***/ 679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/d6d1c6e655bb3e985d46.png";

/***/ }),

/***/ 788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/a1a7f07c6aebe74d1aa2.png";

/***/ }),

/***/ 163:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/b3ed133bd36683a186c5.png";

/***/ }),

/***/ 24:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/1f2df34394936b6d7768.png";

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/7d07dc5b5e62f624d9a4.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(587));
/******/ }
]);
//# sourceMappingURL=index.100925db7b61bade3488.js.map