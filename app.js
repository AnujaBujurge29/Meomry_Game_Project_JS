let hasFlippedCard = false; // original position of card
let lockBoard = false; //if tiles are matched, locked the tiles
let firstCard, secondCard; // the pair of 2 cards that are clicked to check
let matched=0; //to check if all cards are open and game end
let totalMoves = 0; // count total moves of player to finish the game
let totalTime = 0; // total time required for player to finish the game
let milliseconds = 0; // timer counter
let timer = 0; //timer counter
let dateTimer; // timer counter
let diffLevelTiles = 16 //For easy Level
let bestTime = 99999999;

const watch = document.querySelector(".watch");
// element for stopwatch on top
const finaltimeEL = document.querySelector(".finalTime");
// element for pop-out total time required to finish the game
const containerMainEL = document.querySelector(".container_main");
//element to pop-up game tiles
const modalEl = document.querySelector(".modalWin");
//start button click event to start the game.
const cards = document.querySelectorAll(".tiles");
//select all cards
const buttonStartEl = document.querySelector(".start");
//button to Game Restart, start and Replay
buttonStartEl.addEventListener("click", refreshGame);
//click event to start and restart the game

function refreshGame() {
  // Start and restart game
  matched = 0;
  totalMoves = 0;
  totalTime = 0;
  // all values initialsed to zero at start of game
  if (containerMainEL.style.visibility === "hidden") {
    containerMainEL.style.visibility = "visible";
    buttonStartEl.innerHTML = "Replay";
    modalEl.style.visibility = "hidden";
    //change the visibilty of game-board
    resetWatch();
  } else {
    containerMainEL.style.visibility = "hidden";
    modalEl.style.visibility = "hidden";
    buttonStartEl.innerHTML = "Start Game";
    cards.forEach((card) => card.classList.remove("flip"));
    cards.forEach((card) => card.addEventListener("click", flipCard));
    // game restared
  }
}
function flipCard() {// function to take input as 2 tiles and flipped it
  //start of game,
  //this = element in tiles class, which is clicked
  StartWatch();
  totalMoves++;
  // console.log(totalMoves);
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");// flip the cards
  if (!hasFlippedCard) {
    // first card click
    hasFlippedCard = true; // card is flipped now
    firstCard = this; //firstcard clicked
    // return;
  } else {
    secondCard = this; // second card click
    checkForMatch(); //cards match or not???
  }
}

function checkForMatch() {// check if 2 cards flipped are same or not
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();// if two cards are same, disable them for flipping to origi
    matched += 2;
    if (hasWon()) {
      // pauseWatch();
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function hasWon() {
  if (matched === diffLevelTiles) {
    modalEl.style.visibility = "visible";
    containerMainEL.style.visibility = "hidden"
    if(bestTime>totalTime) bestTime=totalTime
    pauseWatch();
    return true;
  } else {
    return false;
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// //Shuffling Board to random position of tiles
// (function shuffle() {
//   cards.forEach((evt) => {
//     let randomPosition = Math.floor(Math.random() * diffLevelTiles);
//     evt.style.order = randomPosition;
//   });
// })();



//StopWatch functionalities..
//////////////////////////////////////////////////////
// Start stopWatch when first click on card
function StartWatch() {
  watch.classList.remove("paused");
  clearInterval(timer);
  timer = setInterval(() => {
    milliseconds += 10;
    dateTimer = new Date(milliseconds);
    watch.innerHTML =
      ("0" + dateTimer.getUTCHours()).slice(-2) +
      ":" +
      ("0" + dateTimer.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + dateTimer.getUTCSeconds()).slice(-2) +
      ":" +
      ("0" + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    totalTime++;
  }, 10);
}

// pause/stop stopwatch when game WON
function pauseWatch() {
  finaltimeEL.innerHTML = "";
  finaltimeEL.innerHTML = `Completion time: ${Math.floor(totalTime / 100)}:${totalTime % 100} seconds</br>
  Best Time of player: ${Math.floor(bestTime / 100)}:${bestTime % 100} Seconds<br>
  Total Moves: ${totalMoves}</br>`;
  clearInterval(timer);
  //console.log(bestTime);
}

//Reset stopwatch when click of replay button or refresh screen(restart)
function resetWatch() {
  watch.classList.remove("paused");
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML = "00:00:00:00";
}
