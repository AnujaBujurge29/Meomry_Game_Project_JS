
//button to start and reset
const buttonStartEl = document.querySelector(".start")
// main contaniner with 2 players
const containerMainEL = document.querySelector('.container_main')
// const container1El = document.querySelector(".container_1")
// const player1El = document.querySelector(".player_1")
// const player2El = document.querySelector(".player_2")

// contaniner for tiles and game
const container2El = document.querySelector(".container_2")
const cards = document.querySelectorAll(".tiles")

buttonStartEl.addEventListener('click', function(e){
        if (containerMainEL.style.visibility === 'hidden') {
            containerMainEL.style.visibility = 'visible';    
            buttonStartEl.innerHTML  = 'RESET'
          } else {
            containerMainEL.style.visibility = 'hidden';
            buttonStartEl.innerHTML  = 'Start Game'
          }     
})

let hasFlippedCard = false; //
let lockBoard = false; //if tiles are matched, locked the tiles
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(evt => {
    let randomPos = Math.floor(Math.random() * 12);
    evt.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));