document.addEventListener('DOMContentLoaded', () => {
    let flipsCount = parseInt(localStorage.getItem('flipsCount')) || 0;
    let timerSeconds = parseInt(localStorage.getItem('timerSeconds')) || 60;
    let timerInterval;
    let matched = 0;
    let disableDeck = false;
    let cardOne;
    let cardTwo;

    const cards = document.querySelectorAll('.card');
    const timerElement = document.querySelector('.count-down');
    const flipsCountElement = document.querySelector('.flips-count');
    const refreshButton = document.querySelector('.refresh-btn');

    const updateTimerDisplay = () => {
        timerElement.textContent = `Time: ${timerSeconds}s`;
    };

    const startTimer = () => {
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            localStorage.setItem('timerSeconds', timerSeconds);
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
    };

    const flipCard = ({ target: clickedCard }) => {
        const cardIndex = Array.from(cards).indexOf(clickedCard);
        if (cardOne !== clickedCard && !disableDeck) {
            clickedCard.classList.add('flip');
            flipsCount++;
            flipsCountElement.textContent = `Flips: ${flipsCount}`;
            localStorage.setItem('flipsCount', flipsCount);
            if (!timerInterval) {
                startTimer();
            }
            if (!cardOne) {
                return (cardOne = clickedCard);
            }
            cardTwo = clickedCard;
            disableDeck = true;
            const cardOneImg = cardOne.querySelector('.back-view img').src;
            const cardTwoImg = cardTwo.querySelector('.back-view img').src;
            matchCards(cardOneImg, cardTwoImg);
            localStorage.setItem(`cardFlipped_${cardIndex}`, true);
        }
    };
    
    const matchCards = (img1, img2) => {
        if (img1 === img2) {
            matched++;
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            cardOne = cardTwo = '';
            disableDeck = false;
            if (matched === 8) {
                setTimeout(() => {
                    shuffleCard();
                    matched = 0;
                }, 1000);
            }
            return;
        }
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 1200);
    };

    const shuffleCard = () => {
        disableDeck = false;
        cardOne = cardTwo = '';
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
        cards.forEach((card, i) => {
            card.classList.remove('flip');
            const imgTag = card.querySelector('.back-view img');
            imgTag.src = `images/img-${arr[i]}.png`;
            card.addEventListener('click', flipCard);
            localStorage.setItem(`card_${i}`, card.classList);
            if (localStorage.getItem(`cardFlipped_${i}`) === 'true') {
                card.classList.add('flip');
            }
        });
    };

    const refreshGame = () => {
        stopTimer();
        flipsCount = 0;
        flipsCountElement.textContent = 'Flips: 0';
        localStorage.removeItem('flipsCount');
        timerSeconds = 60;
        updateTimerDisplay();
        localStorage.removeItem('timerSeconds');
        cards.forEach((card, i) => {
            localStorage.removeItem(`cardFlipped_${i}`);
        });
        shuffleCard();
        startTimer();
    };

    shuffleCard();

    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    });

    refreshButton.addEventListener('click', refreshGame);
});
