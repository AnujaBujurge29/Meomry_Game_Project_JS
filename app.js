let hasFlippedCard = false; // original position of card
let lockBoard = false; //if tiles are matched, locked the tiles
let firstCard, secondCard;
let matched = 0;
let totalMoves = 0;
let totalTime = 0;
let milliseconds = 0;
let timer=0;
let dateTimer

const watch = document.querySelector(".watch");
const finaltimeEL = document.querySelector(".finalTime");

//button to start and reset
const buttonStartEl = document.querySelector(".start");
const containerMainEL = document.querySelector(".container_main");
const modalEl = document.querySelector(".modalWin");
//start button click event to start the game.
const cards = document.querySelectorAll(".tiles");
buttonStartEl.addEventListener("click", refreshGame);

function refreshGame() {
  matched = 0
  totalMoves = 0
  totalTime = 0
  if (containerMainEL.style.visibility === "hidden") {
    containerMainEL.style.visibility = "visible";
    buttonStartEl.innerHTML = "RESET";
    modalEl.style.visibility = "hidden";
    // resetBoard()
    resetWatch();
  } else {
    containerMainEL.style.visibility = "hidden";
    modalEl.style.visibility = "hidden";
    buttonStartEl.innerHTML = "Start Game";
    cards.forEach((card) => card.classList.remove("flip"));
    cards.forEach((card) => card.addEventListener("click", flipCard));

  }
  // if (buttonStartEl.innerHTML === "RESET") {
    
  //   // cards.classList.remove("flip");
  // }
}


// cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  //this = element in tiles class, which is clicked
  StartWatch();
  totalMoves++;
  // console.log(totalMoves);
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    // first card click
    hasFlippedCard = true; // card is flipped now
    firstCard = this; // console.log(firstCard);
    return;
  } else {
    secondCard = this; // second card click
    checkForMatch(); //cards match or not???
  }
}

function checkForMatch() {
  //checking match of cards
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
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

// (function shuffle() {
//   cards.forEach((evt) => {
//     let randomPosition = Math.floor(Math.random() * 16);
//     evt.style.order = randomPosition;
//   });
// })();

function hasWon() {
  if (matched === 16) {
    modalEl.style.visibility = "visible";
    pauseWatch()
    // resetWatch()
    return true;
  } else {
    return false;
  }
}

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
  // console.log(dateTimer);
}

function pauseWatch() {
  // console.log(dateTimer);
  finaltimeEL.innerHTML = "";
  finaltimeEL.innerHTML = `Completion time: ${Math.floor(totalTime / 100)}:${
    totalTime % 100
  } seconds</br>Total Moves: ${totalMoves}</br>`;
  clearInterval(timer);
}

function resetWatch() {
  watch.classList.remove("paused");
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML = "00:00:00:00";
}
