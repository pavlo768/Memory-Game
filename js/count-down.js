class CountDown {
    constructor() {
        this.countDownDisplay = document.querySelector('.count-down');
        this.timeSecond = 60;
        this.timerId = null;
        this.startCountDown = this.startCountDown.bind(this);
    }

    startCountDown() {
        this.timeSecond--;
        this.countDownDisplay.textContent = 'Time: ' + this.timeSecond + 's';
        if (this.timeSecond === 0) {
            clearInterval(this.timerId);
            this.countDownDisplay.textContent = 'Time: ' + this.timeSecond + 's';
        };
    }
}
new CountDown();