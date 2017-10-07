/*jslint es6 */

// variable

const eksElem = document.getElementById("eks");
const ouElem = document.getElementById("ou");
const startElem = document.getElementById("start");
const restartElem = document.getElementById("restart");

let playerMark = undefined;
let computerMark = undefined;
let startGame = false;
let endGame = false;
let theWinner = undefined;

const boxElements = document.getElementsByClassName("box");
let boxArray = Array.from(boxElements);

// AI setup

function randomNum(num) {
    "use strict";
    return Math.floor(Math.random() * num);
}

function computerTurn() {
    "use strict";
    let mark = randomNum(9);
    if (!endGame) {
        if (!boxArray[mark].classList.contains("flag")) {
            boxArray[mark].textContent = computerMark;
            boxArray[mark].classList.add("flag");
            checkWinner();
        } else {
            computerTurn();
        }
    }
}

function firstTurn() {
    "use strict";
    let choose = randomNum(2);
    if (choose === 1) {
        // do nothing
    } else {
        computerTurn();
    }
}

// game setup

function chooseEks() {
    "use strict";
    playerMark = "X";
    computerMark = "O";
    startGame = true;
    startElem.style.display = "none";
    firstTurn();
}

function chooseOu() {
    "use strict";
    playerMark = "O";
    computerMark = "X";
    startGame = true;
    startElem.style.display = "none";
    firstTurn();
}

eksElem.addEventListener("click", chooseEks);
ouElem.addEventListener("click", chooseOu);

function click(e) {
    "use strict";
    if (startGame) {
        if (!e.target.classList.contains("flag")) {
            e.target.textContent = playerMark;
            e.target.classList.add("flag");
            checkWinner();
            computerTurn();
        }
    }
}

boxArray.forEach(function (item) {
    "use strict";
    item.addEventListener("click", click);
});

// winning

function getValue(number) {
    "use strict";
    return document.getElementById("box" + number).innerText;

}

function theEnd(a, b, c) {
    "use strict";
    if (getValue(a) === "X" && getValue(b) === "X" && getValue(c) === "X") {
        endGame = true;
        theWinner = "X";
        displayEnd(theWinner);

        boxArray.forEach(function (item) {
            item.removeEventListener("click", click);
        });

    }
    if (getValue(a) === "O" && getValue(b) === "O" && getValue(c) === "O") {
        endGame = true;
        theWinner = "O";
        displayEnd(theWinner);

        boxArray.forEach(function (item) {
            item.removeEventListener("click", click);
        });

    }
    return endGame;
}

function displayEnd(player) {
    "use strict";
    startElem.style.display = "block";
    restartElem.style.display = "block";
    if (player === playerMark) {
        startElem.innerHTML = "<p>Wygrałeś !</p>";
    } else {
        startElem.innerHTML = "<p>Przegrałeś !</p>";
    }
}

function checkWinner() {
    "use strict";
    let i;
    let drawArray = [];

     for (i = 0; i < boxArray.length; i += 1) {
        if (boxArray[i].classList.contains("flag")) {
            drawArray[i] = 1;
        }
    }

    drawArray = drawArray.join("");
    if (drawArray === "111111111") {
        endGame = true;
        boxArray.forEach(function (item) {
            item.removeEventListener("click", click);
        });
        startElem.style.display = "block";
        startElem.innerHTML = "<p>Remis !</p>";
        restartElem.style.display = "block";
    }
    theEnd(1, 2, 3);
    theEnd(4, 5, 6);
    theEnd(7, 8, 9);
    theEnd(1, 4, 7);
    theEnd(2, 5, 8);
    theEnd(3, 6, 9);
    theEnd(1, 5, 9);
    theEnd(3, 5, 7);
}

// restart the game

restartElem.onclick = function () {
    "use strict";
    let i;
    restartElem.style.display = "none";
    startElem.style.display = "block";
    startElem.innerHTML = "<p>Chcesz grać jako ?</p><span id='eks'>X</span><span id='ou'>O</span>";
    for (i = 0; i < boxArray.length; i += 1) {
        boxArray[i].classList.remove("flag");
        boxArray[i].textContent = "";
    }
    playerMark = undefined;
    computerMark = undefined;
    startGame = false;
    endGame = false;
    theWinner = undefined;

    document.getElementById("eks").addEventListener("click", chooseEks);
    document.getElementById("ou").addEventListener("click", chooseOu);

    boxArray.forEach(function (item) {
        item.addEventListener("click", click);
    });
};
