const Cards = [
  { name: "Pair 1", img: "images\logo_1.png" },
  { name: "Pair 2", img: "images\logo_2.png" },
  { name: "Pair 3", img: "images\logo_3.png" },
  { name: "Pair 4", img: "images\logo_4.jpg" },
  { name: "Pair 5", img: "images\logo_5.png" },
  { name: "Pair 6", img: "images\logo_6.jpg" },
  { name: "Pair 7", img: "images\logo_7.png" },
  { name: "Pair 8", img: "images\logo_8.jpg" },
];

const buttonStartEl = document.querySelector(".start")
const containerMainEL = document.querySelector('.container_main')
const container1El = document.querySelector(".container_1")
const container2El = document.querySelector(".container_2")
const player1El = document.querySelector(".player_1")
const player2El = document.querySelector(".player_2")


buttonStartEl.addEventListener('click', function(e){
        if (containerMainEL.style.visibility === 'hidden') {
            containerMainEL.style.visibility = 'visible';
            buttonStartEl.innerHTML  = 'RESET'
          } else {
            containerMainEL.style.visibility = 'hidden';
            buttonStartEl.innerHTML  = 'Start Game'
          }    
        GameStart()
    
})

function GameStart(){

}


// startBtn.addEventListener('click', function (event) {
//     if (event.target) {
//         startBtn.style.visibility = 'hidden';

//         instructionsEl.textContent = 'Choose your difficulty';
//         instructionsEl.setAttribute('class', 'instructions-design');

//         chooseDifficulty();
//         generateBlocks(); //put this inside an addeventlistener in the choosedifficulty method

//     }
// });