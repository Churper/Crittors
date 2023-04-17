document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas"),
        container = document.getElementById("game-container"),
        images = [          ["./mountain_bg.png", "mountainLayer1"],
          ["./mountain_bg2.png", "mountainLayer2"],
          ["./background.png", "backgroundImage"],
          ["./foreground.png", "foregroundImage"],
          ["./puffer.png", "mainCharacter"],
        ];
  let mainCharacterX = 50,
      mainCharacterY = 250,
      ctx = canvas.getContext("2d"),
      assetsLoaded = 0,
      assetsToLoad = images.length;

  images.forEach(([src, name]) => {
    window[name] = new Image();
    window[name].onload = () => {
      assetsLoaded++;
      if (assetsLoaded === assetsToLoad) {
        draw();
      }
    };
    window[name].src = src;
  });

  function draw() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const scaleX = canvas.width / backgroundImage.width,
          scaleY = canvas.height / backgroundImage.height,
          scale = Math.max(scaleX, scaleY),
          bgWidth = backgroundImage.width * scale,
          bgHeight = backgroundImage.height * scale,
          mountainScale = mountainLayer1.naturalWidth * scale / mountainLayer1.width,
          fgWidth = foregroundImage.width * scale,
          fgHeight = foregroundImage.height * scale,
          fgY = canvas.height - fgHeight,
          characterScale = (mainCharacter.width * scale) / 2 / mainCharacter.width,
          characterWidth = mainCharacter.width * characterScale,
          characterHeight = mainCharacter.height * characterScale;

    // center character horizontally
    let fgX = canvas.width / 2 - mainCharacterX * scale;

    // prevent character from moving off right side of screen
    if (fgX < canvas.width - fgWidth - mainCharacterX * scale) {
      fgX = canvas.width - fgWidth - mainCharacterX * scale;
    }

    // prevent character from moving off left side of screen
    if (fgX > -mainCharacterX * scale) {
      fgX = -mainCharacterX * scale;
    }

    const characterX = canvas.width / 2,
          characterY = mainCharacterY * scale;

    ctx.drawImage(backgroundImage, 0, 0, bgWidth, bgHeight);
    ctx.drawImage(mountainLayer1, -mainCharacterX / 20, canvas.height - mountainLayer1.height * mountainScale, mountainLayer1.width * mountainScale, mountainLayer1.height * mountainScale);
    ctx.drawImage(mountainLayer2, -mainCharacterX / 40, canvas.height - mountainLayer2.height * mountainScale, mountainLayer2.width * mountainScale, mountainLayer2.height * mountainScale);
    ctx.drawImage(foregroundImage, fgX, fgY, fgWidth, fgHeight);
    ctx.drawImage(mainCharacter, characterX - characterWidth / 2, characterY, characterWidth, characterHeight);
  }

  window.addEventListener("resize", draw);
  document.addEventListener("keydown", function(event) {
    event.keyCode === 37 ? mainCharacterX -= 5 :
    event.keyCode === 39 ? mainCharacterX += 5 :
    event.keyCode === 38 ? mainCharacterY -= 5 :
    event.keyCode === 40 && (mainCharacterY += 5);
  });
  setInterval(draw, 10);
});
