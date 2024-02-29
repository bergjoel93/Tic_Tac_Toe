// Make a GameBoard object with the actual gameboard inside. GameBoard will be an immedietly invoked Function. 
const GameBoard =(function(){
    // create an array called board filled with empty spaces. 

    let board = Array(9).fill("");

    //Method to clear the board
    const clearBoard = () => {
        board.fill("");
        console.log("GameBoard array cleared.");
    } 

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
    let score = 0;

    const getName = () => name;
    const  getMarker = () => marker;
    const getScore = () => score;

    const updateScore = () => score++;

    const resetScore = () => score = 0;

    return { getName, getMarker, getScore, updateScore, resetScore };
}

const PlayGame = function() {
    let firstPlayer;
    let secondPlayer;
    let currentPlayer;
    

    // This function is called when we're ready to start the game. 
    const startGame = (player1 , player2 ) => {
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
        else{
            // Place the game marker at a particular position. 
            GameBoard.placeMarker(position, currentPlayer.getMarker());
            console.log(currentPlayer.getName() + " placed an " + currentPlayer.getMarker()+ " at index "+ position);
            
            // Check for game over 
            if(checkGameOver()) {
                console.log("Game over condition met.")
                // TODO: update the UI. 
                return; // stop exectuion and don't change players. 
            }

            changeCurrentPlayer();
            // TODO: update the display/UI
        }
        
    }
    //Checks if the move is valid before placing it. 
    const isValidMove = (position) => {
        return GameBoard.board[position] === "";
    }

    const checkGameOver = () => {
        if(isBoardFull()) {
            console.log("Game over: It's a tie!");
            // TODO: update the display for tie. 
            endOfRound("none", true);
            return true;
        }
        if(checkWinCondition()) {
            // Game over, a player has won. 
            return true;
        }
    };

    // Check if the game board is full (no empty spaces)
    const isBoardFull = () => {
        return GameBoard.board.every(space => space !== "");
    }

    const checkWinCondition = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (GameBoard.board[a] !== "" && 
                GameBoard.board[a] === GameBoard.board[b] && 
                GameBoard.board[a] === GameBoard.board[c]) {
                console.log("Game over: " + currentPlayer.getName() + " wins!");
                //update player score. 
                currentPlayer.updateScore();
                // TODO: Update the display/UI for win
                endOfRound(currentPlayer.getName(), false);
                //Update scoreboard display
                renderScores();
                return true;
            }
        }
        return false;

    };

    const playAgain = () => {
        GameBoard.clearBoard();
        InteractiveBoard.clearBoard();
    }

    const resetGame = () => {
        // Clear the game board
        GameBoard.clearBoard();
        
        // reset the scores
        firstPlayer.resetScore();
        secondPlayer.resetScore();

        InteractiveBoard.clearBoard();

    };
    // This function renders the scores on the score board. 
    function renderScores() {
        const player1Score = document.querySelector(".player1");
        const player2Score = document.querySelector(".player2");

        player1Score.textContent = `${firstPlayer.getName()} - Score: ${firstPlayer.getScore()}`;
        player2Score.textContent = `${secondPlayer.getName()} - Score: ${secondPlayer.getScore()}`;
    }

    return {
        startGame,
        getCurrentPlayer,
        placeCurrentPlayerMarker,
        resetGame,
        renderScores,
        playAgain
    };
}();

const DisplayModal = (function() {
    let firstPlayerName;
    let secondPlayerName;

    const player1Input = document.querySelector("#player1");
    const player2Input = document.querySelector("#player2");
    const submitButton = document.querySelector("#submit");
    const dialogBox = document.querySelector(".modal");
    const resets = document.querySelectorAll(".new-game-button");
    const playAgain = document.querySelector("#play-again-button")
    const endRoundDialog = document.querySelector("#end-round-dialog");
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        firstPlayerName = player1Input.value;
        secondPlayerName = player2Input.value;

        PlayGame.startGame(firstPlayerName, secondPlayerName);
        PlayGame.renderScores();
        dialogBox.close();
    });

    resets.forEach(reset =>{
        reset.addEventListener('click', ()=>{
        dialogBox.show();
        player1Input.value = firstPlayerName;
        player2Input.value = secondPlayerName;
        PlayGame.resetGame();
        endRoundDialog.close();
        
        });
    });
    

    //logic for playAgain? button
   playAgain.addEventListener('click', ()=>{
    PlayGame.playAgain();
    endRoundDialog.close();
   });

})();

const InteractiveBoard = (function() {
    cells = document.querySelectorAll(".cell");
    cells.forEach( cell => {
        cell.addEventListener('click', () =>{
            // If a player clicks a cell we need to keep track of who clicked it and then place the corresponding marker there. Then we invoke the placeMarker function so that that space is kept track of. 
            // We need to obtain the value of the cell that was clicked. 
            let cellValue = cell.getAttribute("data-value");
            console.log("Cell #"+cellValue + " chosen");
            // obtain currentPlayer's marker
            let currentPlayerMarker = PlayGame.getCurrentPlayer().getMarker();
            //Add the current player marker to the board. 
            // TODO: we may have an issue with execution and may need to check if there is already a marker there. 
            PlayGame.placeCurrentPlayerMarker(cellValue);
            //add the marker to the cell. 
            if(cell.textContent === ""){
                cell.textContent = currentPlayerMarker;
            }
            
        });
    });

    const isCellFilled = () =>{
        return 
    }

    // logic to render the board and remove all inner html. 
    const clearBoard = () =>{
        cells.forEach(cell =>{
            cell.textContent = "";
        });
    }

    return {clearBoard};
})();
/**
 * 
 * @param {*} player - The name of the player who one or if "no one" wins. 
 * @param {*} isScratch - boolean to check if gameboard is filled and it's a tie. 
 */
const endOfRound =  function(player, isScratch) {
    const endRoundBox = document.querySelector("#end-round-dialog");
    const winMessage = document.querySelector("#winning-message");
    if(isScratch){
        endRoundBox.show();
        winMessage.textContent = `It's a tie. No one wins `;
         
    }
    else{
        endRoundBox.show();
        winMessage.textContent = `${player} won this round!`;
    }
    
    

}

