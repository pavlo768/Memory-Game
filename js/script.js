document.addEventListener('DOMContentLoaded', function () {
    let flipsCount = 0;
    let timerSeconds = 60;
    let timerInterval;
    let matched = 0; // Лічильник знайдених пар
    let disableDeck = false; // Флаг, щоб заборонити обирати картки під час анімації

    // Отримую всі карти гри
    const cards = document.querySelectorAll('.card');

    // Отримую елемент відображення таймера
    const timerElement = document.querySelector('.count-down');

    // Функція для оновлення відображення таймера
    function updateTimerDisplay() {
        timerElement.textContent = 'Time: ' + timerSeconds + 's';
    }

    // Функція для запуску таймера
    function startTimer() {
        timerInterval = setInterval(function () {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                //  модальне вікно про завершення гри
                alert('Time is up!');
            }
        }, 1000);
    }
    // Функція для зупинки таймера
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Функція, яка перевертає картку під час кліку на неї
    function flipCard({ target: clickedCard }) {
        // Перевіряю, чи можна обирати картки та чи клікнуто на нову картку
        if (cardOne !== clickedCard && !disableDeck) {
            // Додаю клас flip для перевертання картки
            clickedCard.classList.add('flip');
            // Збільшую лічильник фліпів
            flipsCount++;
            // Оновлюю відображення кількості фліпів
            var flipsCountElement = document.querySelector('.flips-count');
            flipsCountElement.textContent = 'Flips: ' + flipsCount;
            // Якщо таймер ще не запущено, запускаю його
            if (!timerInterval) {
                startTimer();
            }
            // Якщо ще не обрано першу картку, запам'ятовую її
            if (!cardOne) {
                return (cardOne = clickedCard);
            }
            // Якщо обрано одну картку, запам'ятовую іншу
            cardTwo = clickedCard;
            // Відключаю можливість обирати інші картки
            disableDeck = true;
            // Отримую шляхи до зображень на обраних картках
            let cardOneImg = cardOne.querySelector('.back-view img').src,
                cardTwoImg = cardTwo.querySelector('.back-view img').src;
            // Порівнюю картки
            matchCards(cardOneImg, cardTwoImg);
        }
    }

    // Функція, яка порівнює дві обрані картки
    function matchCards(img1, img2) {
        // Якщо картки однакові
        if (img1 === img2) {
            // Збільшую лічильник пар
            matched++;
            // Видаляю обробники подій для знайдених карток
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            // Скидаю обрані картки
            cardOne = cardTwo = '';
            disableDeck = false; // Дозволяю обирати нові картки
            // Якщо всі пари знайдені
            if (matched === 8) {
                // Після короткої затримки перемішую картки
                setTimeout(() => {
                    shuffleCard();
                    matched = 0; // Скидаю лічильник пар
                }, 1000);
            }
            return;
        }
        // Якщо картки неоднакові, викликаю анімацію тремтіння
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);
        // Після закінчення анімації повертаю картки назад
        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            // Скидаю обрані картки
            cardOne = cardTwo = '';
            disableDeck = false; // Дозволяю обирати нові картки
        }, 1200);
    }

    // Функція для перемішування карток
    function shuffleCard() {
        // Скидаю лічильник пар та флаг вибору
        disableDeck = false;
        cardOne = cardTwo = '';
        // Створюю масив з номерами карток
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        // Перемішую картки випадковим чином
        arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
        // Проходжу по всіх картках
        cards.forEach((card, i) => {
            // Перевертаю картки знову
            card.classList.remove('flip');
            // Отримую зображення для кожної картки із перемішаного масиву
            let imgTag = card.querySelector('.back-view img');
            imgTag.src = `images/img-${arr[i]}.png`;
            // Навішую обробник подій для кожної карти
            card.addEventListener('click', flipCard);
        });
    }

    // Функція для обробки натискання кнопки "Refresh"
    function refreshGame() {
        // Зупиняю таймер
        stopTimer();
        // Скидаю лічильник фліпів
        flipsCount = 0;
        let flipsCountElement = document.querySelector('.flips-count');
        flipsCountElement.textContent = 'Flips: 0';
        // Перезапускаю таймер та перемішую картки
        timerSeconds = 60;
        updateTimerDisplay();
        startTimer();
        shuffleCard();
    }

    // Початкове перемішування карток і навішування обробників подій
    shuffleCard();

    // Навішую обробник подій на кожну картку для її перевертання
    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    });

    // Навішую обробник подій на кнопку "Refresh"
    let refreshButton = document.querySelector('.refresh-btn');
    refreshButton.addEventListener('click', refreshGame);
});
