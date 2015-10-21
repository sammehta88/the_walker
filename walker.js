// Get the walker image:
var walker = document.getElementById('walker');
var movingRight = false;

// Configure motion params:
var leftBorder = 0;
var rightBorder = window.innerWidth - walker.offsetWidth;

// Have the stick figure start at the right border and start walking left
// When he crosses the left border, have him turn around and start walking right (and vice versa)
// Bonus: Make him turn around when you click on him
var rightPos = rightBorder;
walker.style.left = rightPos + 'px';

var intervalTime = 50;
var stepLength = 10;

//speed in pixels per second
var speed = stepLength / (intervalTime / 1000);


var moving = window.setInterval(updatePosition, intervalTime);

function updatePosition() {
  if (!movingRight) {
    rightPos -= stepLength;
  } else {
    rightPos += stepLength;
  }
  walker.style.left = rightPos + 'px';
  checkEdge();
  updateControlPanel();
}

function checkEdge() {
  if (rightPos <= leftBorder) {
    flipWalker();
  } else if (rightPos >= rightBorder) {
    flipWalker();
  }
}

function flipWalker() {
  movingRight = !movingRight;

  if (movingRight) {
    walker.className = 'flip';
  } else {
    walker.className = '';
  }
}

walker.addEventListener('click', function() {
  flipWalker();
});

document.addEventListener('keyup', function(e) {
  var keyPressed = e.keyIdentifier;
  if (keyPressed === 'Left' && movingRight) {
    flipWalker();
  } else if (keyPressed === 'Right' && !movingRight) {
    flipWalker();
  }
});

var debugButton = document.createElement('button');
debugButton.innerHTML = 'debug';
debugButton.style.display = 'inline';
document.body.insertBefore(debugButton, walker);

var controlPanel = document.createElement('div');
controlPanel.style.display = 'none';

var panelTitle = document.createElement('h1');
var speedDisplay = document.createElement('p');
var directionDisplay = document.createElement('p');
var positionDisplay = document.createElement('p');
panelTitle.innerHTML = 'Control Panel';
controlPanel.appendChild(panelTitle);
controlPanel.appendChild(speedDisplay);
controlPanel.appendChild(directionDisplay);
controlPanel.appendChild(positionDisplay);
document.body.insertBefore(controlPanel, walker);

var displayPanel = false;

debugButton.addEventListener('click', function() {
  displayPanel = !displayPanel;
  togglePanelDisplay();
});

function togglePanelDisplay() {
  if (displayPanel) {
    controlPanel.style.display = 'inline';
  } else {
    controlPanel.style.display = 'none';
  }
}

function updateControlPanel() {
  speedDisplay.innerHTML = speed;
  if (movingRight) {
    directionDisplay.innerHTML = 'MOVING RIGHT';
  } else {
    directionDisplay.innerHTML = 'MOVING LEFT';
  }
  positionDisplay.innerHTML = rightPos;
}
