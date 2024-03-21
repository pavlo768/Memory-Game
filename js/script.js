document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');

    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'play_arrow';
      } else {
        playPauseBtn.textContent = 'pause';
      }
      isPlaying = !isPlaying;
    });

    prevBtn.addEventListener('click', () => {
      // Implement logic for previous track
    });

    nextBtn.addEventListener('click', () => {
      // Implement logic for next track
    });

    rewindBtn.addEventListener('click', () => {
      audio.currentTime -= 10; // Rewind by 10 seconds
    });

    forwardBtn.addEventListener('click', () => {
      audio.currentTime += 10; // Forward by 10 seconds
    });

    volumeSlider.addEventListener('input', () => {
      const volume = volumeSlider.value / 100;
      audio.volume = volume;
    });
    const timerElement = document.querySelector('.count-down');
    let timerInterval;

    // Функція для оновлення відображення таймера
    const updateTimerDisplay = (time) => {
        timerElement.textContent = `Time: ${time}s`;
    };

    // Функція для запуску таймера
    const startTimer = (time) => {
        timerInterval = setInterval(() => {
            time--;
            updateTimerDisplay(time);
            if (time <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
            }
        }, 1000);
    };
    
    let flipsCount = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    let matched = 0;


// Функція для відтворення звуку при фліпі картки з меншою гучністю
const playFlipSound = () => {
    const audio = new Audio('music-fone/music-fone-6.wav');
    audio.volume = 0.15; // Задаємо гучність на половину від максимальної
    audio.play();
};
// функція для обертання картки з відтворенням звуку
const flipCard = ({ target: clickedCard }) => {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('flip');
        flipsCount++;
        const flipsCountElement = document.querySelector('.flips-count');
        flipsCountElement.textContent = `Flips: ${flipsCount}`;
        playFlipSound(); // Відтворюємо звук при фліпі карти
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
};



// Оновлена функція для перевірки завершення гри
const checkGameCompletion = () => {
    if (matched == 8) {
        clearInterval(timerInterval);
        const audio = new Audio('music-fone/music-fone-8.wav');
        audio.volume = 0.40;
        audio.play();

        // Виведення алерту "You Win" після відтворення звуку
        setTimeout(() => {
            alert('You Win!');
        }, 500);

        // Закриваємо всі картки через 10 секунд після відтворення музики
        setTimeout(() => {
            shuffleCard();
            matched = 0;
            const cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                card.classList.remove('flip');
            });
        }, 10000);
    }
};

// Оновлена функція для перевірки невідповідності карток
const mismatchCards = () => {
    const audio = new Audio('music-fone/music-fone-9.wav');
    audio.play();
    audio.volume = 0.30;
    setTimeout(() => {
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        cardOne = cardTwo = '';
        disableDeck = false;
    }, 700);
};

// Оновлена функція для перевірки відповідності карток
const matchCards = (img1, img2) => {
    if (img1 === img2) {
        matched++;
        checkGameCompletion(); // Перевірка завершення гри
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;
        
        // Відтворення звуку після вгадування двох карток
        const audio = new Audio('music-fone/music-fone-7.wav');
        audio.volume = 0.40;
        audio.play();
        
        return;
    }
    setTimeout(() => {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);
    mismatchCards(); // Викликаємо функцію для обробки невідповідності карток
};

    // Функція для перемішування карток
    const shuffleCard = () => {
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
    };

    // Функція для скидання гри
    const resetGame = () => {
        flipsCount = 0;
        const flipsCountElement = document.querySelector('.flips-count');
        flipsCountElement.textContent = 'Flips: 0';
        shuffleCard();
        updateTimerDisplay(0);
    };

    // Функція для оновлення гри
    const refreshGame = () => {
        clearInterval(timerInterval);
        resetGame();
    };

    // Навішуємо обробник подій на кнопку "Легкий рівень"
    document.querySelector('.easy_level').addEventListener('click', () => {
        clearInterval(timerInterval);
        resetGame();
        startTimer(81);
    });

    // Навішуємо обробник подій на кнопку "Складний рівень"
    document.querySelector('.hard_level').addEventListener('click', () => {
        clearInterval(timerInterval);
        resetGame();
        startTimer(61);
    });

    // Навішуємо обробник подій на кнопку "Refresh"
    const refreshButton = document.querySelector('.refresh-btn');
    refreshButton.addEventListener('click', refreshGame);
});
