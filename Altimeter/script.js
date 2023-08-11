const canvas = document.getElementById("altimeterCanvas");
const context = canvas.getContext("2d");

canvas.width = 200; // Set canvas width
canvas.height = 400; // Set canvas height

const scaleStart = 20;
const scaleEnd = canvas.height - 20;
const scaleStep = 20;
const scaleValueStep = 100;

const slider = document.getElementById("altitudeSlider");
const sliderLabel = document.getElementById("sliderValue");
const startButton = document.getElementById("toggleButton");
let isAutoMoving = true; // Start with automatic movement enabled
let intervalId;

context.font = "12px Arial";
context.textAlign = "right";
context.textBaseline = "middle";

let currentAltitude = 0;

function updateAltimeter() {
    if (isAutoMoving) {
        // Simulate changing altitude randomly
        currentAltitude = Math.floor(Math.random() * 1800);
    }
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw scale
    for (let y = scaleStart; y <= scaleEnd; y += scaleStep) {
        context.beginPath();
        context.moveTo(30, y);
        context.lineTo(40, y);
        context.stroke();

        const value = (scaleEnd - y) / scaleStep * scaleValueStep;
        context.fillText(value.toString(), 25, y);
    }

    // Update indicator
    const indicatorX = 45; // Fixed X position for the indicator
    const indicatorY = scaleEnd; // Bottom position of the indicator
    const indicatorHeight = (currentAltitude / scaleValueStep) * scaleStep;

    context.fillStyle = "#ff0000";
    context.fillRect(indicatorX, indicatorY - indicatorHeight, 15, indicatorHeight);

    // Display current altitude
    context.fillStyle = "#000";
    context.fillText(`Altitude: ${currentAltitude} ft`, canvas.width - 10, canvas.height - 10);
    
    // Update slider label
    sliderLabel.textContent = `Altitude: ${currentAltitude} ft`;
    slider.value = currentAltitude;
}

function toggleAutoMove() {
    isAutoMoving = !isAutoMoving;
    slider.disabled = isAutoMoving; // Disable slider during auto movement
    if (isAutoMoving) {
        intervalId = setInterval(updateAltimeter, 1000);
        startButton.textContent = "Stop automatic movement";
    } else {
        clearInterval(intervalId);
        startButton.textContent = "Start automatic movement";
    }
}

// Attach event listener to the button
startButton.addEventListener("click", toggleAutoMove);

// Attach event listener to the slider
slider.addEventListener("input", function() {
    if (!isAutoMoving) {
        currentAltitude = parseInt(slider.value);
        updateAltimeter();
    }
});

// Initial call to draw the static scale and start automatic movement
updateAltimeter();
