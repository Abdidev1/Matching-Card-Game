const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const foundDisplay = document.getElementById('found');
const finalStats = document.getElementById('final-stats');

const uniqueEmojis = [
    '🐰', '🥕', '🌈', '🐣', '🌸', '🎀',
    '🦋', '🍀', '🍓', '🦄', '💖', '🍉',
    '🌷', '🍄', '🧁', '🧸', '👑', '🍭'
]

let deck = [...uniqueEmojis, ...uniqueEmojis];
let activeCards = [];
let matchedPairs = 0;
let moves = 0;
let isLocked = false;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

function startGame() {
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameScreen.classList.add('active');

    grid.innerHTML = '';
    matchedPairs = 0;
    moves = 0;
    movesDisplay.textContent = `MOVES: ${moves}`;
    foundDisplay.textContent = `FOUND: ${matchedPairs} / 18`;
    isLocked = false;
    activeCards = [];

    deck.sort(() => Math.random() - 0.5);

    deck.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card')
    })
}