let humanScore = 0;
let computerScore = 0;
let drawCount = 0;

function getComputerChoice(){
    const choice = Math.floor(Math.random() * 3) + 1;
    switch (choice){
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
    }
}

function getHumanChoice(){
    let choice = prompt("Enter your choice (rock, paper, scissors): ");
    while (true){
        if (choice != "rock" && choice != "paper" && choice != "scissors"){
            alert("Invalid input, please try again");
            choice = prompt("Enter your choice (rock, paper, scissors): ");
            break;
        }
        else break;
    }
    choice = choice.toLowerCase();
    return choice;
}

function playRound(humanChoice, computerChoice){
    console.log(`You chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);
    if (humanChoice == computerChoice){
        console.log("It's a draw!");
        return 0;
    }
    else if ((humanChoice == "rock" && computerChoice == "scissors") ||
             (humanChoice == "paper" && computerChoice == "rock") ||
             (humanChoice == "scissors" && computerChoice == "paper")){
        console.log("Human wins!");
        return 1;
    }
    else{
        console.log("Computer wins!");
        return -1;
    }
}

let round = 1;

function playGame(){
    while (round <= 5){
        console.log(`Round ${round}`);
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        const result = playRound(humanChoice, computerChoice);
        if (result == 1){
            humanScore += 1;
        }
        else if (result == -1){
            computerScore += 1;
        }
        else{
            drawCount += 1;
        }
        round += 1;
    }
    console.log("After 5 rounds, here are the results");
    console.log(`Human wins: ${humanScore}`);
    console.log(`Computer wins: ${computerScore}`);
    console.log(`Draws: ${drawCount}`);
}

playGame();