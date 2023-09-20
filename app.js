// === Starting with declaring all variables that will be used coding this app ===//

let order = []; // array to keep tracking of the lights and how they're going to flash.
let playerOrder = []; // array collect the times when player press in the flashed light.
let flash;
let turn; // keep tracking what turn the player on (e.g. 1 ,2, 3,....)appears in COUNT div
let good; // boolean whether the player clicked on correct flash or not.
let computerTurn; // boolean whether its the computer turn or player turn
let intervalId; // this line will be used later to clear the interval
let on = false; // boolean if the game is on. set to false since it starts off
let win; // if player won the game or not


// === getting html elements to refrence them in JS ===//
const turnCounter = document.querySelector("#turn"); // the COUNT div in the game
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");
const startButton = document.querySelector(".button");

// === actual code let player intract with the game in orginazed order === //
// 1- intracting with toggle buttons ( power on/off and start button)
onButton.addEventListener('click', (event) => {
  // event.preventDefault();
  if (onButton.checked == true) { // used (.checked) because i am using check boxes in this game
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor(); // function to clear colors when on box unchecked 
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (on || win) { // if ON is true and player WIN is true, then call PLAY function
    play();
  }
});

// 2- define PLAY main function in the game.
// *2-a- inside this function, we have to reset the variables if player keeps playing

function play() {
  win = false; // becuase player just started the game
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1; // the COUNT will start at 1 because player starting first round of the game
  good = true; // player hasn't click anything yet
  
  // *2-b- fill up the arrays in the program with random numbers to indicate the order of the light flashes 
  
  for (let i = 0; i < 10; i++) {
    order.push(Math.floor(Math.random() * 4) + 1); 
    // console.log(order); 
  }
  computerTurn = true; // starts with computer flashing lights 

  intervalId = setInterval(gameTurn, 800); // running gameTurn every 800ms so computer will flash light based on the given time and this will keep repeated till interval set clear.
}

// define the gameTurn 
function gameTurn() {
   on = false; // ON set to false so player can't click while computer is flashing colors

  if (flash == turn) { // computer already did the flashing
    clearInterval(intervalId);
    computerTurn = false;
    clearColor();
    on = true; // player can now click on flashed color 
  }

  if (computerTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

// dfine functions enable the game flashing into deferent colors when its the computer turn
function one() {
 topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  topRight.style.backgroundColor = "tomato";
}

function three() {
   bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  bottomRight.style.backgroundColor = "lightskyblue";
}

// define the functions clearing the color after computer done playing
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

// this function is to make all colors flashing at the same time when player win or clicked wrong section
function flashColor() {  
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

// so player can play on flashed colors, will add event listner to all sections  
topLeft.addEventListener('click', (event) => {
  event.preventDefault();
  if (on) { // player can click only if the game is ON
    playerOrder.push(1);
    check(); // if the player was right 
    one(); // then we call the first function to light up the color 
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300); // make sure the color was clicked will be cleared in 300ms
    }
  }
})

topRight.addEventListener('click', (event) => {
  event.preventDefault();
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  event.preventDefault();
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  event.preventDefault()
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

// declare check function
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false; // player didn't click the correct section

  if (playerOrder.length == 3 && good) { // if player clicked 10 times correctly, then call WINGAME FUNCTION
    winGame();
  }

  if (good == false) { // if player clicked on wrong section, then flash all colors and TURN will notify player that he clickes on wrong section
     flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
    },800);
  noise = false; // Don't play sound 
}

  // conditional if player clicked on correct section but hasn't reach to winning level yet. the (10 correct clicks)
if (turn == playerOrder.length && good && !win) {
    turn++; // then go to next turn
    playerOrder = [];
    computerTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

// lastly define the WIN function
function winGame() {
   flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false; // player can't click anything
  win = true;
  setTimeout(() => {
    turnCounter.innerHTML = "";
    clearColor();
  }, 2000); // Reset the game after 2 second
}
