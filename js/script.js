document.addEventListener('DOMContentLoaded', () => {
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
            handleTimeUp(); // Викликаю функцію обробки завершення часу
        }
    }, 1000);
};

const handleTimeUp = () => {
    clearInterval(timerInterval);
    alert('Time is up!');
    setTimeout(() => {
        // Закриття всіх відкритих карток
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            if (card.classList.contains('flip')) {
                card.classList.remove('flip');
            }
        });
    }, 4000);
};

    let flipsCount = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    let matched = 0;

  
    // Функція для оновлення графічного інтерфейсу кнопки play/pause
    const updatePlayPauseButton = () => {
        const playPauseButton = document.getElementById('play-pause-btn');
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer.paused) {
            playPauseButton.textContent = 'play_arrow';
        } else {
            playPauseButton.textContent = 'pause';
        }
    };

    // Функція для обробки кліку на кнопку play/pause
    const handlePlayPauseClick = () => {
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        updatePlayPauseButton();
    };

    // Функція для оновлення гучності аудіопрогравача
    const updateVolume = () => {
        const volumeSlider = document.getElementById('volume-slider');
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.volume = volumeSlider.value / 100;
    };

    // Додавання обробників подій для кнопок play/pause та повзунка гучності
    const playPauseButton = document.getElementById('play-pause-btn');
    playPauseButton.addEventListener('click', handlePlayPauseClick);

    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', updateVolume);

    // Додавання обробника подій для карток
   // Обробник подій для карток
const handleCardClick = () => {
    cards.forEach((card) => {
        card.removeEventListener('click', handleCardClick);
    });
};
// Додавання обробника подій для карток
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});

  // Функція для відтворення звуку при фліпі картки з меншою гучністю
  const playFlipSound = () => {
    const audio = new Audio('music-fone/music-fone-6.wav');
    audio.volume = 0.60; // Задаю гучність на половину від максимальної
    audio.play();
};

// функція для обертання картки з відтворенням звуку
const flipCard = ({ target: clickedCard }) => {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('flip');
        flipsCount++;
        const flipsCountElement = document.querySelector('.flips-count');
        flipsCountElement.textContent = `Flips: ${flipsCount}`;
        playFlipSound(); // Відтворюю звук при фліпі карти
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

        // Закриваю всі картки через 10 секунд після відтворення музики
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
    audio.volume = 0.60;
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

    const playMusic = (musicPath) => {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = musicPath;
        audioPlayer.play();
    };
    
//  обробник подій на кнопку "Легкий рівень"
document.querySelector('.easy_level').addEventListener('click', () => {
    clearInterval(timerInterval);
    resetGame();
    startTimer(81);
    playMusic('music-fone/music-fone-1.mp3');
    audioPlayer.volume = 0; 
});

//  обробник подій на кнопку "Складний рівень"
document.querySelector('.hard_level').addEventListener('click', () => {
    clearInterval(timerInterval);
    resetGame();
    startTimer(11);
    playMusic('music-fone/music-fone-1.mp3');
    audioPlayer.volume = 0; 
    });
    // обробник подій на кнопку "Refresh"
    const refreshButton = document.querySelector('.refresh-btn');
    refreshButton.addEventListener('click', refreshGame);
});
