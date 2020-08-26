var gameBoard = {
    cells : [],
    boxesToPlace: 0,
    startCoords: {
        x: 0,
        y: 0,
        direction: "Up",
    },
}

var gameBoardInitial = {
    cells : [],
}

var player = {
    coords: {
        x: 0,
        y: 0,
        direction: "Up",
    },
    state: {
        boxesPlaced: 0,
    },
}

var BOARD = ["==========",
             "=   O  X =",
             "=  X     =",
             "=      O =",
             "=        =",
             "= O      =",
             "=        =",
             "=    X   =",
             "=        =",
             "=========="];

var STARTPOSITION = {
    x: 1,
    y: 8,
    direction: "Right"
}

function initBoard(board, startPosition) {
    gameBoard.cells = [];
    gameBoardInitial.cells = [];
    gameBoard.boxesToPlace = 0;
    for (var i = 0; i<board.length; i++) {
        gameBoard.cells[i] = [];
        gameBoardInitial.cells[i] = [];
        for (var j = 0; j<board[i].length; j++) {
            switch (board[i][j]) {
                case "O" :
                    gameBoard.cells[i][j] = { type: "Place" };
                    gameBoardInitial.cells[i][j] = { type: "Place" };
                    gameBoard.boxesToPlace++;
                    break;
                case "X" :
                    gameBoard.cells[i][j] = { type: "Box" };
                    gameBoardInitial.cells[i][j] = { type: "Empty" };
                    break;
                case " " :
                    gameBoard.cells[i][j] = { type: "Empty" };
                    gameBoardInitial.cells[i][j] = { type: "Empty" };
                    break;
                default:
                    gameBoard.cells[i][j] = { type: "Wall" };
                    gameBoardInitial.cells[i][j] = { type: "Wall" };
            }
        }
    }
    gameBoard.startCoords.x = startPosition.x;
    gameBoard.startCoords.y = startPosition.y;
    gameBoard.startCoords.direction = startPosition.direction;
}

function initPlayer(board) {
    player.coords.x = board.startCoords.x;
    player.coords.y = board.startCoords.y;
    player.coords.direction = board.startCoords.direction;
    player.state.boxesPlaced = 0;
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
                    case "Place":
                        line += "O";
                        break;
                    case "Box":
                        line += "X";
                        break;
                    case "Wall":
                        line += "=";
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

function getNewCoords(object, direction) {
    var result = {
        x: object.coords.x,
        y: object.coords.y,
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

function canMove(object, direction, board) {
    var result = true;
    
    switch (direction) {
        case "Up" : if (object.coords.y == 0 ||
                    board.cells[object.coords.y-1][object.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Down" : if (object.coords.y == board.cells.length-1 ||
                     board.cells[object.coords.y+1][object.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Right" : if (object.coords.x == board.cells[object.coords.y].length-1 ||
                    board.cells[object.coords.y][object.coords.x+1].type == "Wall") {
                       result = false;
                   };
               break;
        case "Left" :  if (object.coords.x == 0 ||
            board.cells[object.coords.y][object.coords.x-1].type == "Wall") {
               result = false;
           };
       break;
    }

    return result;
}

function moveObject(object, board, boardInitial) {

    if (canMove(object, object.coords.direction, board)) {
        var newCoords = getNewCoords(object, object.coords.direction);

        if (board.cells[newCoords.y][newCoords.x].type == "Box") {
            var tempBoxObject = {
                coords: {
                    x: newCoords.x,
                    y: newCoords.y,
                },
            }
            if (canMove(tempBoxObject, object.coords.direction, board)) {
                var newBoxCoords = getNewCoords(tempBoxObject, object.coords.direction);
                if (boardInitial.cells[newCoords.y][newCoords.x].type == "Place") {
                    board.cells[newCoords.y][newCoords.x].type = "Place";
                    object.state.boxesPlaced--;
                } else {
                    board.cells[newCoords.y][newCoords.x].type = "Empty";
                }
                board.cells[newBoxCoords.y][newBoxCoords.x].type = "Box";

                object.coords.x = newCoords.x;
                object.coords.y = newCoords.y;

                if (boardInitial.cells[newBoxCoords.y][newBoxCoords.x].type == "Place") {
                    object.state.boxesPlaced++;
                }

            } else {
                alert("Вы не можете двигаться в данном направлении!");
            }            
        } else {
            object.coords.x = newCoords.x;
            object.coords.y = newCoords.y;
        }
    } else {
        alert("Вы не можете двигаться в данном направлении!");
    }
}

initBoard(BOARD, STARTPOSITION);
initPlayer(gameBoard);

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

while (player.state.boxesPlaced != gameBoard.boxesToPlace) {
    renderBoard(gameBoard);
    console.log(JSON.stringify(player));
    var command = prompt("Введите команду (Go/Left/Right/Restart/Exit):").toLowerCase();

    switch (command) {
        case "go": 
            moveObject(player, gameBoard, gameBoardInitial);
            break;
        case "left": 
            player.coords.direction = leftDirection[player.coords.direction]; 
            break;
        case "light":
            player.coords.direction = rightDirection[player.coords.direction]; 
            break;
        case "restart":
            initBoard(BOARD, STARTPOSITION);
            initPlayer(gameBoard);
            break;
        case "exit":
            player.state.boxesPlaced = gameBoard.boxesToPlace;
            break;
        default:
            alert("Неизвестная команда!");
    }
}

alert("Игра окончена");
