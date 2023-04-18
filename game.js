document.addEventListener("DOMContentLoaded", function() {

  
  const c = document.getElementById("game-canvas"), 
        g = c.getContext("2d"), 
        container = document.getElementById("game-container");

  let [rX, rY, loaded, toLoad] = [0.1, 105, 0, 5];
  let animFrame = 0; // current frame of animation
  let animCounter = 0; // frame counter for animation timing
  const animDelay = 2000; // number of frames between animation updates
  let isMoving = false; // flag for character movement
  let isAttacking = false; // flag for atkl movement

  
  const imgs = [    ["./mountain_bg.png", "mountain1"],
    ["./mountain_bg2.png", "mountain2"],
    ["./background.png", "bg"],
    ["./foreground.png", "fg"],
    ["./imp_walk.png", "char"]
  ];

  imgs.forEach(([src, name]) => {
    window[name] = new Image();
    window[name].onload = () => (++loaded === toLoad) && draw();
    window[name].src = src;
  });

  function draw() {
    const frameWidth = char.width / 12;
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
    const charX = (c.width - charW) / 2;
    const charY = rY * s + (bgH - fgHS - charH);
  
    g.drawImage(bg, 0, 0, bgW, bgH);
    g.drawImage(mountain1, -Math.floor(rX * bgW / 2), c.height - mountain1.height * mS * .75, mountain1.width * mS / 2, mountain1.height * mS / 2);
    g.drawImage(mountain2, -Math.floor(rX * bgW / 4), c.height - mountain2.height * mS * .72, mountain2.width * mS / 2, mountain2.height * mS / 2);
  
    while (fgX < c.width) {
      g.drawImage(fg, fgX, fgY, fgWS, fgHS);
      fgX += fgWS;
    }
  
    // update animation state only if the character is moving
    if (isMoving || isAttacking) {
      // calculate current animation frame
      const frameX = Math.floor(animFrame) * frameWidth;
      const frameY = 2 * frameHeight;
    
      // draw character
      g.drawImage(char, frameX, 0, frameWidth, frameHeight, charX - charW / 2, charY, charW, charH);
    
      // update animation state
      animFrame = (animFrame + 1) % 4; // update to next frame
    
    } else {
      // walking animation
      g.drawImage(char, 0, 0, frameWidth, frameHeight, charX - charW / 2, charY, charW, charH);
      animFrame = 0;
      animCounter = 0;
      isAttacking = false; // reset the flag
    }
    requestAnimationFrame(draw);
  }
  

  window.addEventListener("resize", draw);
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 40) {
      isMoving = true;
      rX += event.keyCode === 37 ? -0.001 : event.keyCode === 39 ? .001 : 0;
      rY += event.keyCode === 38 ? -5 : event.keyCode === 40 ? 5 : 0;
    } else if (event.keyCode === 32) { // spacebar
      animFrame = 0; // reset the animation frame
      animCounter = 0; // reset the animation counter
      isMoving = false; // stop character movement
      isAttacking= true; // flag for character movement
      window.char.src = "./imp_attack.png"; // change the character image to the attack animation
    }
  });
  
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 40) {
      isMoving = false;
    } else if (event.keyCode === 32) { // spacebar
      isAttacking= false; // reset the flag
      window.char.src = "./imp_walk.png"; // change the character image back to the walking animation
    }
  });
  function animate() {
    requestAnimationFrame(animate);
    draw();
  }
  
  animate();
  
});


