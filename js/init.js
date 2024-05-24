document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.easy_level').addEventListener('click', () => {
        clearInterval(timerInterval);
        resetGame();
        startTimer(61);
        playMusic('music-fone/music-fone-10.mp3');
    });

    document.querySelector('.hard_level').addEventListener('click', () => {
        clearInterval(timerInterval);
        resetGame();
        startTimer(81);
        playMusic('music-fone/music-fone-10.mp3');
    });

    const refreshButton = document.querySelector('.refresh-btn');
    refreshButton.addEventListener('click', refreshGame);
});
