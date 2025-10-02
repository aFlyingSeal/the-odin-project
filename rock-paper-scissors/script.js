const computerLabel = document.querySelector(".computer-choice");
const options = document.querySelectorAll(".option");
const label = document.querySelector(".label");
const computerScoreLabel = document.getElementById("computer-wins");
const playerScoreLabel = document.getElementById("player-wins");
const drawCountLabel = document.getElementById("draw-count");

let humanScore = 0;
let computerScore = 0;
let drawCount = 0;
let round = 1;

function getComputerChoice(){
    const choice = Math.floor(Math.random() * 3) + 1;
    switch (choice){
        case 1:
            computerLabel.textContent = "🪨";
            return "rock";
        case 2:
            computerLabel.textContent = "📄";
            return "paper";
        case 3:
            computerLabel.textContent = "✂️"
            return "scissors";
    }
}

function playRound(humanChoice){
    label.textContent = `You chose ${humanChoice}. `;
    const computerChoice = getComputerChoice();
    if (humanChoice == computerChoice){
        label.textContent += "It's a draw";
        label.style.color = "black";
        drawCount += 1;
    }
    else if ((humanChoice == "rock" && computerChoice == "scissors") ||
             (humanChoice == "paper" && computerChoice == "rock") ||
             (humanChoice == "scissors" && computerChoice == "paper")){
        label.textContent += "Player wins!";
        label.style.color = "green";
        humanScore += 1;
    }
    else{
        label.textContent += "Computer wins!";
        label.style.color = "red";
        computerScore += 1;
    }
    round += 1;
    updateScore();
}

function updateScore(){
    computerScoreLabel.textContent = `Computer wins: ${computerScore}`;
    playerScoreLabel.textContent = `Player wins: ${humanScore}`;
    drawCountLabel.textContent = `Draws: ${drawCount}`;
}