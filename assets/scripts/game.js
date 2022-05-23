let sequence = [];
let humanSequence = [];
let level = 0;
const heading = document.querySelector('.heading');
const tileContainer = document.querySelector('.square-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  heading.textContent = 'Press Any Key to Start';
  tileContainer.classList.add('unclickable');
}

function humanTurn() {
  tileContainer.classList.remove('unclickable');
}

function activateTile(color) {

  const tile = document.querySelector(`[data-square='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const squares = ['red', 'green', 'blue', 'yellow'];
  const random = squares[Math.floor(Math.random() * squares.length)];

  return random;
}

function nextRound() {

  level += 1;

  tileContainer.classList.add('unclickable');
  heading.textContent = `Level ${level}`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn();
  }, level * 600 + 1000);
}

function handleClick(square) {

  const index = humanSequence.push(square) - 1;
  const sound = document.querySelector(`[data-sound='${square}']`);

  if (humanSequence[index] !== sequence[index]) {
    const failedSound = document.querySelector("[data-sound='wrong']");
    failedSound.play()
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }
  sound.play();
  if (humanSequence.length === sequence.length) {
    humanSequence = [];
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
}

function startGame() {
  nextRound();
}


document.addEventListener('keypress', function(){
  if(level > 0) return

  startGame()
});

tileContainer.addEventListener('click', event => {

  const { square } = event.target.dataset;

  if (square) handleClick(square);
});