document.addEventListener("DOMContentLoaded", function() {

  
  const c = document.getElementById("game-canvas"), 
        g = c.getContext("2d"), 
        container = document.getElementById("game-container");

  let [rX, rY, loaded, toLoad] = [0.1, 105, 0, 5];
  let animFrame = 0; // current frame of animation
  let animCounter = 0; // frame counter for animation timing
  const animDelay = 50; // number of frames between animation updates
  let lastTime = 0;
const animSpeed = 10; // milliseconds between frames
  let isMoving = false; // flag for character movement 
  let isAttacking = false; // flag for atkl movement
  let attackStarted = false; // flag for whether an attack animation has started
  const charImage = new Image();
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
  c.width = container.clientWidth + 1;
  c.height = container.clientHeight;

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
    charX += 50 * s;
  }
  const charY = rY * s + (bgH - fgHS - charH);

  g.clearRect(0, 0, c.width, c.height); // clear the canvas

  g.drawImage(bg, 0, 0, bgW, bgH);
  g.drawImage(mountain1, -Math.floor(rX * bgW / 2), c.height - mountain1.height * mS * .75, mountain1.width * mS / 2, mountain1.height * mS / 2);
  g.drawImage(mountain2, -Math.floor(rX * bgW / 4), c.height - mountain2.height * mS * .72, mountain2.width * mS / 2, mountain2.height * mS / 2);

  while (fgX < c.width) {
    g.drawImage(fg, fgX, fgY, fgWS, fgHS);
    fgX += fgWS;
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
    if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 40) {
      isMoving = true;
      rX += event.keyCode === 37 ? -0.001 : event.keyCode === 39 ? .001 : 0;
      rY += event.keyCode === 38 ? -5 : event.keyCode === 40 ? 5 : 0;
      charImage.src = "./imp_walk.png"; // toggle the charImage variable to the walking animation
    } else if (event.keyCode === 32 && !isAttacking) {
      // start attack animation
      isAttacking = true;
      attackStarted = true;
      charImage.src = "./imp_attack.png"; // toggle the charImage variable to the attacking animation
    }
  });
  
  
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 32) {
      isAttacking = false;
      frameWidth = char.width / 12;
      charImage.src = "./imp_walk.png"
      animFrame=0;
    }
    if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 40)
    {isMoving=false;
    animFrame=0;}
  });
  function animate() {
    requestAnimationFrame(animate);
    draw();
  }
  
  animate();
  
});


