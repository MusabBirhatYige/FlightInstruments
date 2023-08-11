const canvas = document.getElementById('horizonCanvas');
const context = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let rollAngle = 0;   // Initial roll angle (in degrees)
let pitchAngle = 0;  // Initial pitch angle (in degrees)
let time = 0;        // Time variable for oscillation
let isMoving = true; // Flag to control movement

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function drawHorizon() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky (upper hemisphere)
    context.beginPath();
    context.arc(centerX, centerY, centerY, 0, Math.PI, false);
    context.fillStyle = '#8B4513';
    context.fill();

    // Draw ground (lower hemisphere)
    context.beginPath();
    context.arc(centerX, centerY, centerY, 0, Math.PI, true);
    context.fillStyle = '#87CEEB';
    context.fill();

    // Draw horizon line
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(canvas.width, centerY);
    context.stroke();

    // Calculate the position of the red indicator's center
    const indicatorCenterY = centerY - pitchAngle * 5;

    // Save the canvas state before applying rotation
    context.save();

    // Translate and rotate the canvas to simulate tilt
    context.translate(centerX, indicatorCenterY);
    context.rotate(rollAngle * (Math.PI / 180));

    // Draw the rotated red indicator (rectangular shape)
    context.fillStyle = '#FF0000';
    context.fillRect(-10, -5, 20, 10);

    // Restore the canvas state
    context.restore();

    // Display pitch and roll values
    context.fillStyle = '#000000';
    context.font = '14px Arial';
    context.fillText(`Pitch: ${pitchAngle.toFixed(1)}°`, 10, 20);
    context.fillText(`Roll: ${rollAngle.toFixed(1)}°`, 10, 40);
}

function updateHorizon() {
    if (isMoving) {
        rollAngle = Math.sin(time) * 20;
        pitchAngle = Math.sin(rollAngle * (Math.PI / 180)) * 20;
        time += 0.02;

        // Update slider positions to reflect automatic movement
        pitchSlider.value = pitchAngle.toFixed(1);
        rollSlider.value = rollAngle.toFixed(1);
        pitchValue.textContent = `${pitchAngle.toFixed(1)}°`;
        rollValue.textContent = `${rollAngle.toFixed(1)}°`;
    }

    drawHorizon();
    requestAnimationFrame(updateHorizon);
}

const pitchSlider = document.getElementById('pitchSlider');
const rollSlider = document.getElementById('rollSlider');
const pitchValue = document.getElementById('pitchValue');
const rollValue = document.getElementById('rollValue');

pitchSlider.addEventListener('input', () => {
    const newPitchValue = parseInt(pitchSlider.value);
    pitchValue.textContent = `${newPitchValue}°`;
    pitchAngle = newPitchValue;
});

rollSlider.addEventListener('input', () => {
    const newRollValue = parseInt(rollSlider.value);
    rollValue.textContent = `${newRollValue}°`;
    rollAngle = newRollValue;
});

const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', () => {
    isMoving = !isMoving; // Toggle the movement flag
});

updateHorizon();