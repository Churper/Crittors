console.log('JS file loaded successfully');

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas");
  const container = document.getElementById("game-container");
  canvas.width = container.clientWidth+1;
  canvas.height = container.clientHeight;
  const ctx = canvas.getContext("2d");

  // load images
  const mountainLayer1 = new Image();
  mountainLayer1.src = "./mountain_bg.png";

  const mountainLayer2 = new Image();
  mountainLayer2.src = "./mountain_bg2.png";

  const backgroundImage = new Image();
  backgroundImage.src = "./background.png";

  const foregroundImage = new Image();
  foregroundImage.src = "./foreground.png";

  const mainCharacter = new Image();
  mainCharacter.src = "./puffer.png";

  // set initial position of the main character
  let mainCharacterX = 50;
  let mainCharacterY = 250;

  // define function to draw the main character on the canvas
  const draw = () => {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    // draw the mountain images
    ctx.drawImage(mountainLayer1, 0, 150, mountainLayer1.naturalWidth * 0.75, mountainLayer1.naturalHeight );
    ctx.drawImage(mountainLayer2, 0, 150, mountainLayer2.naturalWidth * 0.75, mountainLayer2.naturalHeight );
    // draw the main character
    ctx.drawImage(foregroundImage, 0, canvas.height - foregroundImage.naturalHeight * 1.41, canvas.width, foregroundImage.naturalHeight);

    ctx.drawImage(mainCharacter, mainCharacterX, mainCharacterY);
  };

  // call the draw function to draw the initial state of the game
  draw();

  // define function to update the position of the main character based on arrow key input
  const updatePosition = (event) => {
    if (event.keyCode === 37) { // left arrow
      mainCharacterX -= 5;
    } else if (event.keyCode === 39) { // right arrow
      mainCharacterX += 5;
    } else if (event.keyCode === 38) { // up arrow
      mainCharacterY -= 5;
    } else if (event.keyCode === 40) { // down arrow
      mainCharacterY += 5;
    }
  };

  // add event listener to update position of main character based on arrow key input
  document.addEventListener("keydown", updatePosition);

  // call the draw function every 10 milliseconds to update the canvas
  setInterval(draw, 10);
});
