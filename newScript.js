/**
 * The Gameboard represents the state of the board
 * Each square holds a cell
 * 
 */
function Gameboard() {
    //board is the actual board of the game with size 9. 
    let board = Array(9);

    // creates a gameboard which is a 1D array filled with cells with values of 0. 
    for(let i = 0; i < board.length; i++){
        board[i].push(Cell());
    }

    function getBoard() {
        return board;
    }

    function dropToken(cellSpot, player) {

        // to drop a token onto a cell spot we have to make check to make sure the spot hasn't been taken already. If the cell spot doesn't equal zero, then it's invalid and we stop execution. 
        if(board[cellSpot] != 0) return;

        //otherwise add the player token to the cell spot. 
        board[cellSpot].addPlayerToken(player)
    }

    function printBoard() {
        const boardWithCellValues = board.map((cell) => cell.getValue());
       console.log(boardWithCellValues);

    }
}
/**
 * A cell represents one square on the board. Each cell has a value of:
 * 0: no marker in square
 * 1: player 1's marker in square ('X')
 * 2: player 2's marker in square ('O')
 */
function Cell() {
    let value = 0;

    // add a player to a cell
    const addPlayerToken = (player) => {
        value = player;
    }
    //get the player cell
    function getValue() {
        this.value = value;
        return value;
    }

    return {
        addPlayerToken,
        getValue
    };
}
/**
 * The GameController will be responsible for controlling the flow and state of the game's turns, as well as whether anyone has won the game or not. 
 */
function GameController(
    player1Name = "Player One",
    player2Name = "Player 2"
) {
    const board = Gameboard();
    const players = [
        {
            name: player1Name,
            token: 1
        },
        {
            name: player2Name,
            token: 2
        }
    ];
    // player 1 goes first. 
    let activePlayer = players[0];
    //toggle between player 1 and 2. 
    function switchPlayerTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // getActivePlayer
    const getActivePlayer = () => activePlayer;

    // render the board and print who's turn it is. 
    function newRound() {
    
    }
}

/**
 * Cell objects
 * Properties
 * Space: 1,2,3,4,5,6,7,8, or 9
 * Marker: 'X', 'O', or null
 * 
 */

//player objects
/**
 * properties
 * name: name
 * token: 'X' or 'O'
 */




