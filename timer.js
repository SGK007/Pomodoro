const counterDisplay = document.getElementById('counter');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const breakButton = document.getElementById('breakButton');
const alarmAudio = document.getElementById('alarmAudio');
const clicksound = './mixkit-clear-mouse-clicks-2997.wav' ;
const clickAudio = new Audio(clicksound);

let countdown;
let timer = 0; // Set initial timer to 0 for "00:00"
let isPaused = false;

function updateDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = Math.floor(timer % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    counterDisplay.textContent = minutes + ":" + seconds;
}

function startTimer(duration, callback) {
    timer = duration;
    countdown = setInterval(() => {
        if (!isPaused && timer > 0) {
            timer--;
            updateDisplay();
        }
        if (timer <= 0) {
            clearInterval(countdown);
            alarmAudio.play();
            if (callback) callback();
        }
    }, 1000);
}

pauseButton.addEventListener('mouseover', () => {
    pauseButton.style.background = 'linear-gradient(to right, #b2ef91, #fa9372)';
    pauseButton.style.color = 'white';
});

pauseButton.addEventListener('mouseout', () => {
    pauseButton.style.background = '';
    pauseButton.style.color = '';
});

startButton.addEventListener('mouseover', () => {
    startButton.style.background = 'linear-gradient(90deg, hsla(141, 81%, 87%, 1) 0%, hsla(41, 88%, 75%, 1) 50%, hsla(358, 82%, 71%, 1) 100%)';
    startButton.style.color = 'white';
});

startButton.addEventListener('mouseout', () => {
    startButton.style.background = '';
    startButton.style.color = '';
});

breakButton.addEventListener('mouseover', () => {
    breakButton.style.background = 'linear-gradient(90deg, hsla(141, 81%, 87%, 1) 0%, hsla(41, 88%, 75%, 1) 50%, hsla(358, 82%, 71%, 1) 100%)';
    breakButton.style.color = 'white';
});

breakButton.addEventListener('mouseout', () => {
    breakButton.style.background = '';
    breakButton.style.color = '';
});

startButton.addEventListener('click', function () {
    clickAudio.play();
    startButton.style.background='linear-gradient(90deg, hsla(141, 81%, 87%, 1) 0%, hsla(41, 88%, 75%, 1) 50%, hsla(358, 82%, 71%, 1) 100%)';
    
    clearInterval(countdown); // Reset if clicked again
    
    let userTime = prompt("Enter the time in minutes for the timer:", "60"); // Prompt user for input
    userTime = parseInt(userTime); // Convert the input to an integer
    
    if (isNaN(userTime) || userTime <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    
    timer = userTime * 60; // Convert to seconds

    isPaused = false;
    pauseButton.textContent = 'Pause'; // Reset pause button
    breakButton.style.display = 'none'; // Hide break button if visible
    startTimer(userTime * 60, showBreakButton); // Start timer with user-defined duration
});



pauseButton.addEventListener('click', function () {

    clickAudio.play();


    if (!isPaused) {
        // Pause the timer
        isPaused = true;
        pauseButton.textContent = 'Continue';
    } else {
        // Resume the timer
        isPaused = false;
        pauseButton.textContent = 'Pause';
        clickAudio.play();
    }
});

breakButton.addEventListener('click', function () {
    clickAudio.play();
    if(!alarmAudio.puased){
        alarmAudio.pause();
    }

    clearInterval(countdown); // Reset if clicked again
    timer = 15 * 60; // 15 minutes break
    isPaused = false;
    pauseButton.textContent = 'Pause'; // Reset pause button
    breakButton.style.display = 'none'; // Hide break button after start
    startTimer(15 * 60); // Start 15-minute break timer
});

function showBreakButton() {
    breakButton.style.display = 'block'; // Show the "Start Break" button
}

updateDisplay(); // Call this to show "00:00" initially
