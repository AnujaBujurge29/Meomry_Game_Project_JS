//button to start and reset
const buttonStartEl = document.querySelector(".start");

// main contaniner with 2 players
const containerMainEL = document.querySelector(".container_main");

// const container1El = document.querySelector(".container_1")
// const player1El = document.querySelector(".player_1")
// const player2El = document.querySelector(".player_2")

//start button click event to start the game
buttonStartEl.addEventListener("click", function (e) {
  if (containerMainEL.style.visibility === "hidden") {
    containerMainEL.style.visibility = "visible";
    buttonStartEl.innerHTML = "RESET";
  } else {
    containerMainEL.style.visibility = "hidden";
    buttonStartEl.innerHTML = "Start Game";
  }
});

// contaniner for tiles and game
// const container2El = document.querySelector(".container_2")
const cards = document.querySelectorAll(".tiles");

let hasFlippedCard = false; // original position of card
let lockBoard = false; //if tiles are matched, locked the tiles
let firstCard, secondCard;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  // console.log("card clicked");
  // console.log(this);
  //this = element in tiles class, which is clicked
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first card click
    hasFlippedCard = true; // card is flipped now
    firstCard = this;  // console.log(firstCard);
    return;
  } else {
    secondCard = this; // second card click
    checkForMatch();//cards match or not???
  }
}

function checkForMatch() {
  //checking match of cards
  let count =0
  console.log(firstCard.dataset.name);
  console.log(secondCard.dataset.name);
  if(firstCard.dataset.name === secondCard.dataset.name){
    disableCards()
    count++
    
  }else{
    unflipCards();
  }
  return count
  // let bothMatch = firstCard.dataset.name === secondCard.dataset.name;
  // bothMatch ? disableCards() : unflipCards();
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

(function shuffle() {
  cards.forEach((evt) => {
    let randomPosition = Math.floor(Math.random() * 16);
    evt.style.order = randomPosition;
  });
})();