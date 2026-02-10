const DOM = (() => {
    const squares = document.querySelectorAll(".square");
    const statusText = document.querySelector(".status");

    function displayTurn(player){
        statusText.textContent = `${player}'s turn`;
    }

    function setStatusText(player, isDraw){
        if (isDraw){
            statusText.textContent = `Draw! (click to play again)`;
            return;
        }
        statusText.textContent = `${player} won! (click to play again)`;
    }

    function statusTextReset(){
        statusText.addEventListener("click", () => {
            if (!logicFlow.isGameOver()) return;

            logicFlow.resetGame();
            gameBoard.resetBoard();
            statusText.textContent = `X's turn`;
        });
    }

    function init(){
        squares.forEach((square, index) => {
            square.addEventListener("click", () => {
                if (logicFlow.isGameOver()) return;
                if (gameBoard.getSquare(index) !== "") return;

                const result = logicFlow.takeTurn(index);
                gameBoard.updateBoard();

                if (!result) return;

                if (result.status === "win"){
                    DOM.setStatusText(result.player, false);
                    return;
                }
                if (result.status === "draw"){
                    DOM.setStatusText("", true);
                    return;
                }
            });
        });
    }

    return{
        squares,
        displayTurn,
        setStatusText,
        statusTextReset,
        init,
    }
})();

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    function getSquare(index){
        return board[index];
    }

    function setSquare(index, currentPlayer){
        board[index] = currentPlayer;
    }

    function checkEmptySquare(){
        return board.some(square => square === "");
    }

    function updateBoard(){
        DOM.squares.forEach((square, index) => {
            square.textContent = `${board[index]}`;
        })
    }

    function resetBoard(){
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return{
        getSquare,
        setSquare,
        checkEmptySquare,
        updateBoard,
        resetBoard
    }
})();

const logicFlow = (() => {
    const WIN_COMBO = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonal
    ];
    let currentPlayer = "X";
    let gameOver = false;

    function isGameOver(){
        return gameOver;
    }

    function makeMove(index){
        if (gameOver)
            return;
        if (gameBoard.getSquare(index) !== "")
            return;
        gameBoard.setSquare(index, currentPlayer);
    }

    function checkWin(){
        for (let i = 0; i < WIN_COMBO.length; i++){
            if (WIN_COMBO[i].every(index => gameBoard.getSquare(index) === currentPlayer))
                return true;
        }
    }

    function checkDraw(){
        return !gameBoard.checkEmptySquare();
    }

    function switchPlayer(){
        if (currentPlayer === "X")
            currentPlayer = "O";
        else
            currentPlayer = "X";
    }

    function getPreviousPlayer(){
        if (currentPlayer === "X")
            return "O";
        else
            return "X";
    }

    function takeTurn(index){
        DOM.displayTurn(getPreviousPlayer());
        makeMove(index);

        if (checkWin()){
            gameOver = true;
            return { status: "win", player: currentPlayer };
        }
        if (checkDraw()){
            gameOver = true;
            return { status: "draw" };
        }

        switchPlayer();
        return { status: "continue", player: currentPlayer };
    }

    function resetGame(){
        gameOver = false;
        currentPlayer = "X";
        gameBoard.resetBoard();
        gameBoard.updateBoard();
    }

    return{
        isGameOver,
        takeTurn,
        resetGame
    }
})();

DOM.init();
DOM.statusTextReset();