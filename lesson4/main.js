var gameBoard = {
    cells : [],
    startCoords: {
        x: 0,
        y: 0,
        direction: "Up",
    },
    monsterStartCoords: {
        x: 0,
        y: 0,
    }
}

var player = {
    coords: {
        x: 0,
        y: 0,
        direction: "Up",
    },
    state: {
        haveKey: false,
        exitFound: false,
        torchesCount: 20,
    }
}

var ghost = {
    coords: {
        x: 0,
        y: 0,
    }
}

var BOARD = ["==========",
             "=      T =",
             "=  K     =",
             "=        =",
             "=        =",
             "=     E  =",
             "=        =",
             "=        =",
             "=      T =",
             "=========="];

var STARTPOSITION = {
    x: 1,
    y: 8,
    direction: "Right"
}

var GHOST_START_POSITION = {
    x: 1,
    y: 1,
}

function initBoard(board, startPosition, ghostStartPosition) {
    gameBoard.cells = [];
    for (var i = 0; i<board.length; i++) {
        gameBoard.cells[i] = [];
        for (var j = 0; j<board[i].length; j++) {
            switch (board[i][j]) {
                case "K" :
                    gameBoard.cells[i][j] = { type: "Key" };
                    break;
                case "E" :
                    gameBoard.cells[i][j] = { type: "Exit" };
                    break;
                case "T" :
                        gameBoard.cells[i][j] = { type: "torchChest" };
                        break;
                case " " :
                    gameBoard.cells[i][j] = { type: "Empty" };
                    break;
                default:
                    gameBoard.cells[i][j] = { type: "Wall" };
            }
        }
    }
    gameBoard.startCoords.x = startPosition.x;
    gameBoard.startCoords.y = startPosition.y;
    gameBoard.startCoords.direction = startPosition.direction;
    gameBoard.monsterStartCoords.x = ghostStartPosition.x;
    gameBoard.monsterStartCoords.y = ghostStartPosition.y;
}

function initPlayer(board) {
    player.coords.x = board.startCoords.x;
    player.coords.y = board.startCoords.y;
    player.coords.direction = board.startCoords.direction;
    player.state.haveKey = false;
    player.state.exitFound = false;
    player.state.torchesCount = 10;
}

function initGhost(board) {
    ghost.coords.x = board.monsterStartCoords.x;
    ghost.coords.y = board.monsterStartCoords.y;
}

function renderBoard(board) {
    for (var i = 0; i<board.cells.length; i++) {
        var line = "";
        for (var j = 0; j<board.cells[i].length; j++) {
            if (i == player.coords.y &&
                j == player.coords.x) {
                line += "@";
            } else {
                switch (board.cells[i][j].type) {
                    case "Key":
                        line += "K";
                        break;
                    case "Exit":
                        line += "E";
                        break;
                    case "Wall":
                        line += "=";
                        break;
                    case "torchChest":
                        line += "T";
                        break;
                    case "Empty":
                        line += " ";
                        break;
                }
            }
        }
        console.log(i + " : " + line);
    }
}

function getNewCoords(player, direction) {
    var result = {
        x: player.coords.x,
        y: player.coords.y,
    }

    switch (direction) {
        case "Up": 
            result.y--;
            break;
        case "Down": 
            result.y++;
            break;
        case "Left": 
            result.x--;
            break;
        case "Right": 
            result.x++;
            break;
    }

    return result;
}

function getNewGhostPosition(ghostObject, board) {
    //Random direction meaning: 0 - up, 1 - right, 2- down, 3 - left
    var direction;
    var directionText;
    var newCoords;

    for (i=0; i<2; i++) {
        direction = (Math.floor(Math.random() * 10)) % 4;
        switch (direction) {
            case 0:
                directionText = 'Up';
                break;
            case 1:
                directionText = 'Right';
                break;
            case 2:
                directionText = 'Down';
                break;
            case 3:
                directionText = 'Left';
                break;
        }

        if (canMove(ghostObject, directionText, board)) {
            newCoords = getNewCoords(ghostObject, directionText);
            ghostObject.coords.x = newCoords.x;
            ghostObject.coords.y = newCoords.y;
        }
    }
}

function canMove(player, direction, board) {
    var result = true;
    
    switch (direction) {
        case "Up" : if (player.coords.y == 0 ||
                    board.cells[player.coords.y-1][player.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Down" : if (player.coords.y == board.cells.length-1 ||
                     board.cells[player.coords.y+1][player.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Right" : if (player.coords.x == board.cells[player.coords.y].length-1 ||
                    board.cells[player.coords.y][player.coords.x+1].type == "Wall") {
                       result = false;
                   };
               break;
        case "Left" :  if (player.coords.x == 0 ||
            board.cells[player.coords.y][player.coords.x-1].type == "Wall") {
               result = false;
           };
       break;
    }

    return result;
}

function moveObject(player, board) {
    if (canMove(player, player.coords.direction, board)) {
        var newCoords = getNewCoords(player, player.coords.direction);
        
        if (ghost.coords.x == player.coords.x && ghost.coords.y == player.coords.y) {
            if (player.state.torchesCount < 6) {
                alert('На вас напал призрак! К сожалению, вам не хватило факелов, чтобы его отогнать');
                player.state.torchesCount = 0;
            } else {
                alert('На вас напал призрак! На этот раз вы смогли его прогнать, но это стоило вам 5 факелов...');
                player.state.torchesCount = player.state.torchesCount - 5;
            }
        } else if (Math.sqrt(Math.pow(ghost.coords.x - player.coords.x, 2) + Math.pow(ghost.coords.y - player.coords.y, 2)) < 3) {
            alert('Вы чувствуете чьё-то присутствие...');
        }

        switch (board.cells[newCoords.y][newCoords.x].type) {
            case "Key":
                player.state.haveKey = true;
                alert("Вы нашли ключ! Ищите выход!");
                break;
            case "torchChest":
                player.state.torchesCount = 21;
                alert('Вы нашли сундук с факелами! К сожалению, вы не можете взть с собой больше 20...');
                break;
            case "Exit":
                if (player.state.haveKey) {
                    alert("Вы выиграли!");
                    player.state.exitFound = true;
                } else {
                    alert("Вы нашли выход, но у вас нет ключа!");
                }
                break;                
        }

        player.coords.x = newCoords.x;
        player.coords.y = newCoords.y;
        player.state.torchesCount--;
    } else {
        alert("Вы не можете двигаться в данном направлении!");
    }
}

initBoard(BOARD, STARTPOSITION, GHOST_START_POSITION);
initPlayer(gameBoard);
initGhost(gameBoard);

var leftDirection = {
    Up: "Left",
    Down: "Right",
    Left: "Down",
    Right: "Up",
}

var rightDirection = {
    Up: "Right",
    Down: "Left",
    Left: "Up",
    Right: "Down",
}

while (!player.state.exitFound && player.state.torchesCount > 0) {
    renderBoard(gameBoard);
    console.log(JSON.stringify(player));
    console.log(JSON.stringify(ghost));
    var command = prompt("Осталось факелов: " + player.state.torchesCount + ". Введите команду (Go/Left/Right/Exit):");

    switch (command) {
        case "Go": 
            getNewGhostPosition(ghost, gameBoard);
            moveObject(player, gameBoard);
            break;
        case "Left": 
            player.coords.direction = leftDirection[player.coords.direction]; 
            break;
        case "Right":
            player.coords.direction = rightDirection[player.coords.direction]; 
            break;
        case "Exit":
            player.state.exitFound = true;
            break;
        default:
            alert("Неизвестная команда!");
    }
}

if (player.state.torchesCount == 0) {
    alert('У вас закончились факелы! Теперь вы будете блуждать во тьме до конца своих дней...')
}

alert("Игра окончена");
