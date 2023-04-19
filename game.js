document.addEventListener("DOMContentLoaded", function() {
  const canvasWidth = 100;
  const canvasHeight = 100;
  let lastPositionUpdateTime = 0;

  const c = document.getElementById("game-canvas"), 
        g = c.getContext("2d"), 
        container = document.getElementById("game-container");
        c.width = canvasWidth;
c.height = canvasHeight;
c.width = container.clientWidth + 1;
  c.height = container.clientHeight;

  let [rX, rY, loaded, toLoad] = [0.1, 105, 0, 5];
  let animFrame = 0; // current frame of animation
  let animCounter = 0; // frame counter for animation timing
  const animDelay = 50; // number of frames between animation updates
  let lastTime = 0;
const animSpeed = 10; // milliseconds between frames
  let isMoving = false; // flag for character movement 
  let isAttacking = false; // flag for atkl movement
  let attackStarted = false; // flag for whether an attack animation has started
  const moveDelay = 5; // number of milliseconds between position updates
let moveIntervalId = null; // interval ID for position updates
  const charImage = new Image();
  function updatePosition(currentTime) {
    // calculate time difference since last frame
    const timeDiff = currentTime - lastPositionUpdateTime;
  
    // update player position if isMoving flag is true
    if (isMoving) {
      rX += 0.0001 * timeDiff; // update position by 0.1 pixels per millisecond
    }
  
    // store current time as last position update time
    lastPositionUpdateTime = currentTime;
  
    // request next animation frame
    requestAnimationFrame(updatePosition);
  }
  
  // call updatePosition for the first time
  requestAnimationFrame(updatePosition);

  
  charImage.onload = function() {
    draw();
  };
  charImage.src = "./imp_walk.png";


  const imgs = [
    ["./mountain_bg.png", "mountain1"],
    ["./mountain_bg2.png", "mountain2"],
    ["./background.png", "bg"],
    ["./foreground.png", "fg"],
    ["./imp_walk.png", "char"],
    ["./imp_attack.png", "charAttack"]
  ];

  imgs.forEach(([src, name]) => {
    window[name] = new Image();
    window[name].onload = () => (++loaded === toLoad) && draw();
    window[name].src = src;
  });

  let lastAnimationFrameTime = 0;
let swapper = true;
function draw() {
 
 let frameWidth;
 if (isAttacking) {
   frameWidth = charAttack.width / 13;
 } else {
   frameWidth = char.width / 12;
 }

 
  const frameHeight = 335;
  //c.width = container.clientWidth + 1;
  //c.height = container.clientHeight;

  const sX = c.width / bg.width,
    sY = c.height / bg.height,
    s = Math.max(sX, sY),
    bgW = bg.width * s,
    bgH = bg.height * s,
    mS = mountain1.naturalWidth * s / mountain1.width;

  const fgW = fg.width * s,
    fgH = fg.height * s,
    fgS = 0.5,
    fgWS = fgW * fgS,
    fgHS = fgH * fgS,
    fgY = c.height - fgHS - (fgHS * 0.4);

  let fgX = -Math.floor(rX * bgW) % fgWS;

  const charS = (char.width * s) / 3 / char.width;
  const charW = frameWidth * charS;
  const charH = frameHeight * charS;
  let charX = (c.width - charW) / 2;
  if (isAttacking) {
    charX += 55 * s;
  }
  const charY = rY * s + (bgH - fgHS - charH);

  g.clearRect(0, 0, c.width, c.height); // clear the canvas

  g.drawImage(bg, 0, 0, bgW, bgH);
  g.drawImage(mountain1, -Math.floor(rX * bgW / 2), c.height - mountain1.height * mS * .75, mountain1.width * mS / 2, mountain1.height * mS / 2);
  g.drawImage(mountain2, -Math.floor(rX * bgW / 4), c.height - mountain2.height * mS * .72, mountain2.width * mS / 2, mountain2.height * mS / 2);

  for (let i = fgX; i < c.width; i += fgWS) {
    g.drawImage(fg, i, fgY, fgWS, fgHS);
  }

  let frameX, frameY;
  const now = performance.now();
  const timeSinceLastFrame = now - lastAnimationFrameTime;
  if (isMoving && timeSinceLastFrame >= animDelay) {
    animCounter++;
    lastAnimationFrameTime = now;
    animFrame++;
    if (animFrame >= 12) {
      animFrame = 0;
    }
  }
  if (isAttacking && timeSinceLastFrame >= animDelay) {
    animCounter++;
    lastAnimationFrameTime = now;
    animFrame++;
  } else if (isAttacking && animFrame >= 13) { // end of attack animation
    
    animFrame = 0; // reset animFrame to loop attack animation
  }
  
  // frameXAttack = Math.floor(animFrame) * frameWidthAttack;
  frameX = Math.floor(animFrame) * frameWidth;
  frameY = 0;

  g.drawImage(charImage, frameX, frameY, frameWidth, frameHeight, charX - charW / 2, charY, charW, charH);
 
  requestAnimationFrame(draw);
}

  
  
  
  
  
  

  window.addEventListener("resize", draw);
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
      isMoving = true;
      startMoving();
      // rX += event.key === "ArrowLeft" ? -0.001 : event.key === "ArrowRight" ? .001 : 0;
      // rY += event.key === "ArrowUp" ? -5 : event.key === "ArrowDown" ? 5 : 0;
      charImage.src = "./imp_walk.png"; // toggle the charImage variable to the walking animation
    } else if (event.keyCode === 32 && !isAttacking) {
      // start attack animation
      isAttacking = true;
      attackStarted = true;
      charImage.src = "./imp_attack.png"; // toggle the charImage variable to the attacking animation
    }
  });
  
  document.addEventListener("keyup", function(event) {
    if (event.key === " ") {
      isAttacking = false;
      frameWidth = char.width / 12;
      charImage.src = "./imp_walk.png";
      animFrame = 0;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
      isMoving = false;
      animFrame = 0;
    }
  });
  
  
  function animate() {
    requestAnimationFrame(animate);
    draw();
  }
  
  animate();
  
});


