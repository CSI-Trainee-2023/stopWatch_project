// Initialize variables
let [sec, min, hrs] = [0, 0, 0];
let startTime = 0;
let lapTimes = [];
let lapCounter = 1;

// Get elements
let displayTime = document.getElementById("displayTime");
let lapButton = document.getElementById("lapbutton");
let startButton = document.getElementById("startButton");

// Variable to track the stopwatch state
let stopwatchRunning = false;  // stopwatch is not running.

// Function to display time
function displayCurrentTime() {
    let h = hrs < 10 ? "0" + hrs : hrs;
    let m = min < 10 ? "0" + min : min;
    let s = sec < 10 ? "0" + sec : sec;

    displayTime.innerHTML = h + ":" + m + ":" + s;
}

// Function to start the stopwatch
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        startButton.innerHTML = "Stop";
        startButton.style.background = "red";
        lapButton.disabled = false;  //enables lap button
        if (startTime === 0) {
            //current time  minus total time that  passed in milliseconds
            startTime = Date.now() - (sec * 1000 + min * 60000 + hrs * 3600000);
        }
        //stopwatch running and updating time display every 1000 milliseconds
        timer = setInterval(stopwatchTime, 1000);
    } else {
        stopStopwatch();
    }
}

// Function to stop the stopwatch
function stopStopwatch() {
    if (stopwatchRunning) {
        stopwatchRunning = false;
        clearInterval(timer);
        startButton.innerHTML = "Resume";
        startButton.style.background = "green";
    }
}

// Function to handle lap button click
function handleLapClick() {
    if (stopwatchRunning) {
        const currentTime = Date.now();
        const lapTime = currentTime - startTime;

        // Format the lap time
        const lapHrs = Math.floor(lapTime / 3600000);
        const lapMin = Math.floor((lapTime % 3600000) / 60000);
        const lapSec = Math.floor((lapTime % 60000) / 1000);

        const lapTimeString = `${lapHrs}:${lapMin}:${lapSec}`;

        // Store lap time and lap number in array
        lapTimes.push({ lap: lapCounter++, time: lapTimeString });

        // Display lap time
        const lapList = document.getElementById("lapList");
        const lapItem = document.createElement("li"); //creates new HTML list item represent a single lap time.
        lapItem.textContent = `Lap ${lapTimes.length}: ${lapTimeString}`; // sets  text content of newly created list 
        lapList.appendChild(lapItem); //adds lap time to list of lap  

        // Update start time for the next lap  based on the current time
        startTime = currentTime;
    }
    
}

// Function to reset the stopwatch
function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(timer);
    [sec, min, hrs] = [0, 0, 0];
    displayCurrentTime();
    lapButton.disabled = true;
    startButton.innerHTML = "Start";  //  after resetting  stopwatch button will display Start
    startButton.style.background = "green";
    lapTimes = [];  //removing all previously recorded lap
    lapCounter = 1;  //next lap record will labeled Lap 1
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = "";  //clears content of  lapList element ,resetting it.
}

// Event listeners
startButton.addEventListener("click", startStopwatch);
lapButton.addEventListener("click", handleLapClick);
document.getElementById("resetButton").addEventListener("click", resetStopwatch);

// Function to update stopwatch time
function stopwatchTime() {
    sec++;
    if (sec == 60) {
        sec = 0;
        min++;
        if (min == 60) {
            min = 0;
            hrs++;
        }
    }
    displayCurrentTime();
}

// Initial display
displayCurrentTime();
function handleKeyPress(event) {
      if (event.ctrlKey) {
          if (event.key === 's') {
              startStopwatch();
          } else if (event.key === 'x') {
              stop();
          } 
          else if (event.key === 'r') {
            resetStopwatch();
        } else if (event.key === 'l') {
          handleLapClick();
      } else if (event.key === 'p') {
        resume();
    } 
      }
  }
  //adds an event listener to the entire web page 
  document.addEventListener('keydown', handleKeyPress);