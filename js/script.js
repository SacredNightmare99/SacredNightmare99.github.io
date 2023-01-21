// Create a 2-dimensional array to represent the game board
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let scoreX = 0;
let scoreO = 0;

// Create a variable to keep track of the current player (X or O)
let currentPlayer = "X";

// Create a function to handle a player's move
function handleMove(event) {
    // Get the row and column of the cell that was clicked
    let row = event.target.getAttribute("data-row");
    let col = event.target.getAttribute("data-col");

    // Make sure the cell is empty before making a move
    if (board[row][col] === null) {
        // Update the game board with the current player's move
        board[row][col] = currentPlayer;

        // Update the text of the cell to show the current player's move
        event.target.textContent = currentPlayer;

        // Check if the current player has won
        if (checkForWin()) {
            if(currentPlayer === "X"){
                scoreX++;
                document.getElementById("playerX").innerHTML = scoreX;
            }else{
                scoreO++;
                document.getElementById("playerO").innerHTML = scoreO;
            }
            alert(currentPlayer + " wins!");
            resetBoard();
            return;
        }

        if (checkForWin()) {
            // code for displaying win message
        }else if(checkForDraw()){
            alert("Game Drawn!");
            resetBoard();
        }        

        // Switch to the other player
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
    }
    document.getElementById("current-turn").innerHTML = currentPlayer;
}

// Create a function to check for a win
function checkForWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }

    // Check diagonals
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }

    return false;
}

function reset() {
    scoreX = 0;
    scoreO = 0;
    document.getElementById("playerX").innerHTML = scoreX;
    document.getElementById("playerO").innerHTML = scoreO;
    // Reset the game board and any other necessary variables
    resetBoard()
}

function resetBoard() {
    board = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];
    let cells = document.querySelectorAll("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
    currentPlayer = "X";
    document.getElementById("current-turn").innerHTML = currentPlayer;
}

function checkForDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
                return false;
            }
        }
    }
    return true;
}

// Add event listeners to the cells to handle player moves
window.onload = function(){
    let cells = document.querySelectorAll("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", handleMove);
    }
}