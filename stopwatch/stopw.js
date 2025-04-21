let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    display.innerHTML = "00:00:00.000";
    lapList.innerHTML = "";
}

function lapTimer() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = ms % 1000;
    
    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

// Event Listeners
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", lapTimer);