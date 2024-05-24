let timerInterval;
const timerElement = document.querySelector('.count-down');

function updateTimerDisplay(time) {
    timerElement.textContent = `Time: ${time}s`;
}

function startTimer(time) {
    timerInterval = setInterval(() => {
        time--;
        updateTimerDisplay(time);
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

function handleTimeUp() {
    clearInterval(timerInterval);
    alert('Time is up!');
    disableDeck = true;
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            if (card.classList.contains('flip')) {
                card.classList.remove('flip');
            }
        });
    }, 4000);
}
