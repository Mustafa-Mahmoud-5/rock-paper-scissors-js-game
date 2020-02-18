// this Rock Paper Scissors game built with Es6 and OOP class based

// clas showboard that will be object for the player and computer score

class Showboard{

    constructor(playerScore = 0, computerScore = 0){ // i want the default values to be 0 for both of them
        
        this.playerScore = playerScore;
        this.computerScore = computerScore; 
    }
}
let showboard = new Showboard(); // for now on, this is our showboard object

class Game{ // this class will be concerned with the game logic

    static play(event){

        let playerChoice = event.target.id; // player choice

        let computerChoice = this.computerChoice(); // computer choice

        let winner = this.getWinner(playerChoice, computerChoice); // this will be the core of our program in which this variable may be three random values that we will so the winner and change the game board based on it, three values may be >>> 1- "Draw" 2- "You Win" 3- "You Lose". so when we need to make validation with this variable we will say for instance if winner = "You Lose" then do something...

        this.showWinner(winner ,computerChoice); // show the winner , and the computer choice in the card so we pass them as parameters

        this.gameShowBoard(winner);


    }

    static computerChoice(){

        // in this function i want to make a random computer choice so i will make three different random values from math.random function
        
        let random = Math.random() * 3;

        let approximatedRandom = Math.ceil(random)

        if(approximatedRandom == 1){

            return "rock";
        }

        else if(approximatedRandom == 2){
            return "paper";
        }

        else if(approximatedRandom == 3){
            return "scissors";
        }
    }

    static getWinner(playerChoice, computerChoice){

        // in this function i have computer and player choices so based on the real game rules and their choices, this function will decide who is the winner


        if(playerChoice == computerChoice){
            
            return "Draw";
        }

        else if(playerChoice == "rock"){

            if(computerChoice == "paper"){

                return "You Lose";
            }

            else if (computerChoice == "scissors"){

                return "You Win";
            }
        }

        else if(playerChoice == "paper"){

            if(computerChoice == "rock"){
                return "You Win";
            }

            else if (computerChoice == "scissors"){
                return "You Lose";
            }
        }

        else if (playerChoice == "scissors"){

            if(computerChoice == "rock"){
                return "You Lose";
            }
            else if(computerChoice == "paper"){

                return "You Win"
            }
        }
    }

    static showWinner(winner,computerChoice){ // take the winner and player choice and computer choice and display them in a card

        document.getElementById("popperParent").style.display = "block"


        // let`s change the color of the message based on the game result status
        let message;
        if(winner == "Draw"){

            message = `<h2 class ="text-info my-5 font-weight-bold">${winner}</h2>`
        }
        else if(winner == "You Win"){
            message = `<h2 class ="text-success my-5 font-weight-bold">${winner}</h2>`
        }
        else{
            message = `<h2 class ="text-danger my-5 font-weight-bold">${winner}</h2>`
        }


        let output = // the card ui layout
        `
            ${message}
            <i class="fas fa-hand-${computerChoice} fa-7x mb-5"></i>
            <h3 class="text-dark text-capitalize font-weight-bold">Computer Chose ${computerChoice}<h3/>

        `
        // since that the font awesome icon can be displayed with fas fa-hand-{iconName} then we can get this as a variable from the computer choice

        let resultCard = document.getElementById("popperContent");
        
        resultCard.innerHTML = output;
    }

    static closeCard(event){

        let cardParent = document.getElementById("popperParent");

        if(event.target == cardParent){
            
            cardParent.style.display = "none";
        }
    }


    static gameShowBoard(winner){


        // just make some logic to check if the pc wins then give him a point and if the player win then give him a point but if the result draw then do nothing
        if(winner == "You Win"){

            // showboard is the object i instintiated at the very beginning
            showboard.playerScore +=1; 
        }
        else if(winner == "You Lose"){

            showboard.computerScore +=1;
        }

        // display the new value in the game board
        document.getElementById("playerScore").innerHTML = `Player: ${showboard.playerScore}`;

        document.getElementById("computerScore").innerHTML = `Computer: ${showboard.computerScore}`;

    }

    static restart(){
        // this is the last method and it will restart the game once the user click on the restart button, actually i love to call any function that need an eventlistener at the end of the file


        showboard.playerScore = 0;
        showboard.computerScore = 0;

        document.getElementById("playerScore").innerHTML = `Player: ${showboard.playerScore}`;

        document.getElementById("computerScore").innerHTML = `Computer: ${showboard.computerScore}`;


    }

}

// _________________________call the methods_________________


let icons = document.querySelectorAll(".icon"); // the three choice icons

icons.forEach(icon =>{ 

    // loop through each icon and excute the play method
    icon.addEventListener("click", (e)=>{
        
        Game.play(e)
    })
})

document.getElementById("popperParent").addEventListener("click",(e)=>{

// when click on the shadow(the card outer area), close the card
    Game.closeCard(e);
});


document.getElementById("restart").addEventListener("click", Game.restart)