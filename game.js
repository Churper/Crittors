const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// load mountain images
const mountainLayer1 = new Image();
mountainLayer1.src = "./mountain_bg.png";
const mountainLayer2 = new Image();
mountainLayer2.src = "./mountain_bg2.png";

// load background image
const backgroundImage = new Image();
backgroundImage.src = "./background.png";

// load foreground image
const foregroundImage = new Image();
foregroundImage.src = "./foreground.png";

// draw images
mountainLayer1.onload = function () {
  ctx.drawImage(mountainLayer1, 0, 0);
  mountainLayer2.onload = function () {
    ctx.drawImage(mountainLayer2, 0, 0);
    backgroundImage.onload = function () {
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;
      ctx.drawImage(backgroundImage, 0, 0);
      foregroundImage.onload = function () {
        ctx.drawImage(foregroundImage, 0, 0);
      }
    }
  }
}
