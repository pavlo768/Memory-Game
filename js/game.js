let flipsCount = 0;
let cardOne, cardTwo;
let disableDeck = false;
let matched = 0;

function checkGameCompletion() {
    if (matched == 8) {
        clearInterval(timerInterval);
        disableDeck = true;
        const audio = new Audio('music-fone/music-fone-8.wav');
        audio.volume = 0.40;
        audio.oncanplaythrough = () => {
            setTimeout(() => {
                alert('You Win!');
                setTimeout(() => {
                    shuffleCard();
                    matched = 0;
                    const cards = document.querySelectorAll('.card');
                    cards.forEach((card) => {
                        card.classList.remove('flip');
                    });
                }, 6000);
            }, 500);
        };
        audio.play();
    }
}

function resetGame() {
    flipsCount = 0;
    const flipsCountElement = document.querySelector('.flips-count');
    flipsCountElement.textContent = 'Flips: 0';
    shuffleCard();
    updateTimerDisplay(0);
}

function refreshGame() {
    clearInterval(timerInterval);
    resetGame();
    disableDeck = true;
}
