// Make a GameBoard object with the actual gameboard inside. GameBoard will be an immedietly invoked Function. 
const GameBoard =(function(){
    // create an array called board filled with empty spaces. 

    let board = Array(9).fill("");

    //Method to clear the board
    const clearBoard = () => board = Array(9).fill("");

    // Method to place a marker (either X or O)
    const placeMarker = (position, marker) => board[position] = marker;

    //TODO add a condition to check the current state of the board, which will be useful for checking game conditions later. 

    return {
        board,
       clearBoard,
       placeMarker 
    }

})();

/**
 * Factory function to create a player object. 
 * @param {string} playerName - The name of the player. 
 * @param {string} playerMarker - The marker assigned to the player ('X' or 'O')
 * @returns {Object} an object representing a player with methods to get the player's name and marker. 
 */
const Player = (playerName, playerMarker) => {
    let name = playerName;
    let marker = playerMarker;

    const getName = () => name;
    const  getMarker = () => marker;

    return { getName, getMarker};
}

const PlayGame = function() {
    let firstPlayer;
    let secondPlayer;
    let currentPlayer;

    // This function is called when we're ready to start the game. 
    const startGame = (player1 = "Player 1", player2 = "Player 2") => {
        firstPlayer = Player(player1, 'X');
        secondPlayer = Player(player2, 'O');
        currentPlayer = firstPlayer;
    };

    //This function is called to change the current player state. 
   const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer == firstPlayer ? secondPlayer : firstPlayer;
   }
   // gets current player
    const getCurrentPlayer = () => currentPlayer;
    // This function is used when we're ready to place a marker for the current player. 
    const placeCurrentPlayerMarker = (position) => {
        //Check if move to position is empty
        if(!isValidMove(position)){
            console.log("Invalid move. Please choose an empty space");
            // TODO : add some logic to make the UI shake or something. 
            return; // stops execution if move is invalid. 
        }
        GameBoard.placeMarker(position, currentPlayer.getMarker());
        console.log(currentPlayer.getName() + "placed an " + currentPlayer.getMarker()+ " at index "+ position);
        
        // Check for game over 
        if(checkGameOver()) {
            console.log("Game over condition met.")
            // TODO: update the UI. 
            return; // stop exectuion and don't change players. 
        }

        changeCurrentPlayer();
        // TODO: update the display/UI
    }
    //Checks if the move is valid before placing it. 
    const isValidMove = (position) => {
        return GameBoard.board[position] === "";
    }

    const checkGameOver = () => {
        if(isBoardFull()) {
            console.log("Game over: It's a tie!");
            // TODO: update the display for tie. 
            return true;
        }
        // Add logic to check for win conditions. Return true if a win conditon is met, otherwise false to continue game. For now return false. 
        return false;
    };
    // Check if the game board is full (no empty spaces)
    const isBoardFull = () => {
        return GameBoard.board.every(space => space !== "");
    }

    return {
        startGame,
        getCurrentPlayer,
        placeCurrentPlayerMarker
    };
}();

