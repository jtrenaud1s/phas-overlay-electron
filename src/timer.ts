let progress = document.getElementById("progress") as HTMLDivElement;
let startTime: number;
let timerInterval: NodeJS.Timeout;
let isRunning = false;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);
  isRunning = true;

  setTimeout(() => playAudio("Demon can hunt"), 60000);
  setTimeout(() => playAudio("Standard ghost can hunt"), 90000);
  setTimeout(() => playAudio("Spirit can hunt"), 180000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function getTimerStatus() {
  return isRunning;
}

function updateTimer() {
  let elapsedTime = Date.now() - startTime;
  let percentage = (elapsedTime / 180000) * 100;
  progress.style.width = percentage + "%";

  if (percentage >= 100) {
    clearInterval(timerInterval);
  }
}

function playAudio(message: string) {
  let audio = new Audio();
  audio.src = `audio/${message}.mp3`;
  audio.play();
}
