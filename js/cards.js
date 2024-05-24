const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});

function handleCardClick() {
    cards.forEach((card) => {
        card.removeEventListener('click', handleCardClick);
    });
}

function playFlipSound() {
    const audio = new Audio('music-fone/music-fone-6.wav');
    audio.volume = 0.60;
    audio.play();
}

function flipCard({ target: clickedCard }) {
    if (disableDeck) return;
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('flip');
        flipsCount++;
        const flipsCountElement = document.querySelector('.flips-count');
        flipsCountElement.textContent = `Flips: ${flipsCount}`;
        playFlipSound();
        if (!timerInterval) {
            startTimer(60);
        }
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        const cardOneImg = cardOne.querySelector('.back-view img').src;
        const cardTwoImg = cardTwo.querySelector('.back-view img').src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function mismatchCards() {
    const audio = new Audio('music-fone/music-fone-9.wav');
    audio.play();
    audio.volume = 0.60;
    setTimeout(() => {
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        cardOne = cardTwo = '';
        disableDeck = false;
    }, 700);
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        checkGameCompletion();
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;
        const audio = new Audio('music-fone/music-fone-7.wav');
        audio.volume = 0.40;
        audio.play();
        return;
    }
    setTimeout(() => {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);
    mismatchCards();
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = '';
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
        card.classList.remove('flip');
        const imgTag = card.querySelector('.back-view img');
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener('click', flipCard);
    });
}
