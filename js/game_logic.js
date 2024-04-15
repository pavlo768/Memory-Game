document.addEventListener('DOMContentLoaded', () => {

    const timerElement = document.querySelector('.count-down');
    let timerInterval;

 // Function to update the timer display on the page
    function updateTimerDisplay(time) {

    timerElement.textContent = `Time: ${time}s`;
}

// Function to start the game timer
    function startTimer(time) {

    timerInterval = setInterval(() => {
        time--;
        updateTimerDisplay(time);
      // Play music when the time is approaching
        if (time === 3) {
            setTimeout(() => {
                playMusic('music-fone/music-fone-11.wav'); 
            }, 1000); 
        }
        if (time <= 0) {
            handleTimeUp(); 
        }
    }, 1000);
}

// Function for handling the end of the game time
    function handleTimeUp() {
    clearInterval(timerInterval);
    alert('Time is up!');
    disableDeck = true;
    // Затримка перед закриттям всіх відкритих карток
    setTimeout(() => {
        // Closing all open cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            if (card.classList.contains('flip')) {
                card.classList.remove('flip');
            }
        });
    }, 4000);
}
    let flipsCount = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    let matched = 0;

   // Event handler for cards
   function handleCardClick() {
    cards.forEach((card) => {
        card.removeEventListener('click', handleCardClick);
    });
}

// Adding an event handler for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});

  // Function for playing sound when a card is flicked at a lower volume
  function playFlipSound() {
    const audio = new Audio('music-fone/music-fone-6.wav');
    audio.volume = 0.60; 
    audio.play();
}

// function for rotating a card with sound playback
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

// Function for checking the end of the game
function checkGameCompletion() {
    if (matched == 8) {
        clearInterval(timerInterval);
        disableDeck = true;

        const audio = new Audio('music-fone/music-fone-8.wav');
        audio.volume = 0.40;
        audio.oncanplaythrough = () => {
            setTimeout(() => {
                alert('You Win!');
                // Delay before closing cards
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

// function to check for card mismatch
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

// function for checking card compliance
    function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        checkGameCompletion(); // Checking the end of the game
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;

// Play sound after guessing two cards
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

// Function for shuffling cards
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

// Function to reset the game
    function resetGame() {
    flipsCount = 0;
    const flipsCountElement = document.querySelector('.flips-count');
    flipsCountElement.textContent = 'Flips: 0';
    shuffleCard();
        updateTimerDisplay(0);
    }
    
// Function for updating the game
    function refreshGame() {
    clearInterval(timerInterval);
    resetGame();
    disableDeck = true;
}

// Function for playing music
function playMusic(musicPath) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = musicPath;
    audioPlayer.play();
    audioPlayer.volume = 0.6;
}

// event handler for the "Easy level" button
document.querySelector('.easy_level').addEventListener('click', () => {
    clearInterval(timerInterval);
    resetGame();
    startTimer(61);
    playMusic('music-fone/music-fone-10.mp3');
});

// event handler for the "Complex level" button
document.querySelector('.hard_level').addEventListener('click', () => {
    clearInterval(timerInterval);
    resetGame();
    startTimer(81);
    playMusic('music-fone/music-fone-10.mp3');
    });
// event handler for the "Refresh" button
    const refreshButton = document.querySelector('.refresh-btn'); 
    refreshButton.addEventListener('click', refreshGame);
});