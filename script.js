const symbols = ['🍎','🍌','🍇','🍒','🥑','🍉','🍋','🍓'];
let cards = [...symbols, ...symbols];
let flipped = [];
let moves = 0;
let matches = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  clearInterval(interval);
  timer = 0;
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);
}

function createBoard() {
  gameBoard.innerHTML = '';
  flipped = [];
  moves = 0;
  matches = 0;
  movesDisplay.textContent = 'Moves: 0';
  timerDisplay.textContent = 'Time: 0s';
  clearInterval(interval);
  startTimer();

  shuffle(cards).forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (card.classList.contains('flipped') || flipped.length === 2) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.symbol;
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flipped;
  if (first.dataset.symbol === second.dataset.symbol) {
    matches++;
    flipped = [];
    if (matches === symbols.length) {
      clearInterval(interval);
      alert(`🎉 You won in ${moves} moves and ${timer}s!`);
    }
  } else {
    setTimeout(() => {
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      first.innerText = '';
      second.innerText = '';
      flipped = [];
    }, 1000);
  }
}

