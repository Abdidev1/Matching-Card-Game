const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('mover');
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
        card.classList.add('card');

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-back"></div>
                <div class="card-face card-front">${emoji}</div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card, emoji));
        grid.appendChild(card);
    });
}

function flipCard(cardElement, emoji) {
    if (isLocked || cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;

    cardElement.classList.add('flipped');
    activeCards.push({ cardElement, emoji });

    if (activeCards.length === 2) {
        moves++;
        movesDisplay.textContent = `MOVES: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = activeCards;

    if (card1.emoji === card2.emoji) {
            isLocked = true;
            card1.cardElement.classList.add('matched');
            card2.cardElement.classList.add('matched');
            matchedPairs++;
            foundDisplay.textContent = `FOUND: ${matchedPairs} / 18`;
            setTimeout(() => {
                resetBoard();
                if (matchedPairs === 18) {
                    showEndScreen();
                }
            }, 500);
    } else {
        isLocked = true;
        setTimeout(() => {
            card1.cardElement.classList.remove('flipped');
            card2.cardElement.classList.remove('flipped');
            resetBoard();
        }, 1000)
    }
}

function resetBoard() {
    activeCards = [];
    isLocked = false;
}

function showEndScreen()  {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');
    finalStats.innerHTML = `All 18 pairs found in <b>${moves}</b> moves!`;
}