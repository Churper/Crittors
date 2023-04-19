document.addEventListener("DOMContentLoaded", function() {
  const canvasWidth = 800;
  const canvasHeight = 600;
  let lastPositionUpdateTime = 0;
  let timeSinceLastUpdate = 0;

  let frameCount = 0;
  let fps = 0;
  let [charWorldX, charWorldY] = [0.1, 105];
  let prevAnimFrame = 0;
  const charSpeed1 = 3; // adjust this value to control the character speed

  let lastTime1 = performance.now();
  const c = document.getElementById("game-canvas"), 
        g = c.getContext("2d"), 
        container = document.getElementById("game-container");
  c.width = canvasWidth;
  c.height = canvasHeight;
  c.width = container.clientWidth + 2;
  c.height = container.clientHeight;
let setted = 0;
  let [rX, rY, loaded, toLoad] = [0.1, 105, 0, 6];
  let animFrame = 0; // current frame of animation
  let animCounter = 0; // frame counter for animation timing
  let lastTime = 0;
  const animSpeed = 1; // milliseconds between frames

const animDelay = Math.floor(animSpeed  +45); // number of frames between animation updates
  let isMoving = false; // flag for character movement 
  let isAttacking = false; // flag for atkl movement
  const moveDelay = 0; // number of milliseconds between position updates
  let moveIntervalId = null; // interval ID for position updates
  let bgW, bgH, s, mS, fgW, fgH, fgS, fgWS, fgHS, fgY,fgX,charS,charW,charH,charX,charY;
  const charImage = new Image();
  const char = new Image();
  charImage.onload = function() {
  
  char.src = "./imp_walk.png";
 s = Math.max(c.width / bg.width, c.height / bg.height);
  bgW = bg.width * s;
  bgH = bg.height * s;
  mS = mountain1.naturalWidth * s / mountain1.width;
  fgW = fg.width * s;
  fgH = fg.height * s;
  fgS = 0.5;
  fgWS = fgW * fgS;
  fgHS = fgH * fgS;
  
  fgY = c.height - fgHS - (fgHS * 0.4);
  draw();
};
char.onload = function() {
  charS = (char.width * s) / 3 / char.width;
  charW = frameWidth * charS;
  charH = frameHeight * charS;
 if (setted == 0){ 
  charX = (c.width ) / 2 ;
 charY = (c.height)/2;
 setted =1;

}
//rX = charX / bgW;
  fgX = -Math.floor(rX * bgW) % fgWS;
 // draw();
 // frameWidth = char.width / 12;
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

  
  const frameHeight = 335; // adjust this value based on your sprite sheet
  let frameWidth = 251;

  function draw() {
  
    g.clearRect(0, 0, c.width, c.height);

    const playerOffsetX = charX - c.width / 2;
    const playerOffsetY = charY - c.height / 2;

  // Translate the canvas context to the player's position
  g.translate(-playerOffsetX, -playerOffsetY);

    g.drawImage(bg, 0, 0, bgW, bgH);
    g.drawImage(mountain1, -Math.floor(rX * bgW / 2), c.height - mountain1.height * mS * .75, mountain1.width * mS / 2, mountain1.height * mS / 2);
    g.drawImage(mountain2, -Math.floor(rX * bgW / 4), c.height - mountain2.height * mS * .72, mountain2.width * mS / 2, mountain2.height * mS / 2);

let tileCount = 0;
let i = fgX;

g.drawImage(fg, 0, fgY, fgWS, fgHS);


  
    const now = performance.now();
    const timeSinceLastFrame = now - lastAnimationFrameTime;
    const timeSinceLastPositionUpdate = now - lastPositionUpdateTime;

    if (timeSinceLastFrame >= animDelay) {
      animCounter++;
      lastAnimationFrameTime = now;
  
      if (isMoving && timeSinceLastPositionUpdate >= moveDelay) {
        animFrame = (animFrame + 1) % 12;
        charX += charSpeed1;
        lastPositionUpdateTime = now;
    }

    if (isAttacking) {
        animFrame = (animFrame + 1) % 7;
    }
    }
    if (animFrame < prevAnimFrame) {
      // animation has completed a cycle, reset animFrame to 0
      animFrame = 0;
    }
    const sourceX = animFrame * frameWidth;
   

    prevAnimFrame = animFrame;
    if(isAttacking){    g.drawImage(char, sourceX, 0, frameWidth, frameHeight, charX - charW / 2 + 68, charY, charW, charH);
  }
  else{
    g.drawImage(char, sourceX, 0, frameWidth, frameHeight, charX - charW / 2, charY, charW, charH);
  }
  g.translate(playerOffsetX, playerOffsetY);
 
  console.log(charX);
  drawFPS();
  requestAnimationFrameLimited(draw);
  }
  
  function requestAnimationFrameLimited(callback) {
    const fps = 60;
    const interval = 1000 / fps;
    const timeNow = performance.now();
    const delta = timeNow - lastTime;
    if (delta > interval) {
      lastTime = timeNow - (delta % interval);
      callback();
    } else {
      setTimeout(() => requestAnimationFrameLimited(callback), interval - delta);
    }
    //updateFPS();
  }
  
  
  function drawFPS() {
    const now = performance.now();
    const elapsedMs = now - lastTime1;
    if (elapsedMs >= 1000) {
      fps = Math.round((frameCount * 1000) / elapsedMs);
      lastTime1 = now;
      frameCount = 0;
    }
    g.fillStyle = "white";
    g.font = "bold 16px Arial";
    g.fillText(`FPS: ${fps}`, 10, 20);
    frameCount++;
  }
  

  
  
  
  

  window.addEventListener("resize", draw);

  document.addEventListener("keydown", function(event) {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    // Player is moving
    isMoving = true;
    charImage.src = "./imp_walk.png";
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" ) {
      // Change the direction of the character
      charImage.style.transform = `scaleX(${event.key === "ArrowLeft" ? -1 : 1})`;
    }
  } else if (event.code === "Space" && !isAttacking) {
    // Player is attacking
    isAttacking = true;
    char.src = "./imp_attack.png";
    frameWidth = 382;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code === "Space") {
    // Player has stopped attacking
    isAttacking = false;
    frameWidth = charImage.width / 12;
    charImage.src = "./imp_walk.png";
    animFrame = 0;
  } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    // Player has stopped moving
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


