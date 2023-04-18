class CharacterAnimation {
    constructor(ctx, character, characterWidth, characterHeight) {
      this.ctx = ctx;
      this.character = character;
      this.characterWidth = characterWidth;
      this.characterHeight = characterHeight;
  
      this.frameIndex = 0;
      this.tickCount = 0;
      this.ticksPerFrame = 6;
      this.numberOfFrames = 4;
      this.currentAnimation = "idle";
  
      this.animations = {
        idle: {
          frames: [0, 1, 2, 3],
          ticksPerFrame: 6,
        },
        run: {
          frames: [4, 5, 6, 7, 8, 9],
          ticksPerFrame: 4,
        },
      };
  
      this.currentFrame = this.animations[this.currentAnimation].frames[this.frameIndex];
    }
  
    update() {
      this.tickCount++;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
  
        if (this.frameIndex < this.numberOfFrames - 1) {
          this.frameIndex++;
        } else {
          this.frameIndex = 0;
        }
  
        this.currentFrame = this.animations[this.currentAnimation].frames[this.frameIndex];
      }
    }
  
    draw(x, y) {
      this.ctx.drawImage(
        this.character,
        this.currentFrame * this.characterWidth,
        0,
        this.characterWidth,
        this.characterHeight,
        x - this.characterWidth / 2,
        y,
        this.characterWidth,
        this.characterHeight
      );
    }
  
    playAnimation(animation) {
      if (animation !== this.currentAnimation) {
        this.currentAnimation = animation;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.currentFrame = this.animations[this.currentAnimation].frames[this.frameIndex];
        this.ticksPerFrame = this.animations[this.currentAnimation].ticksPerFrame;
      }
    }
  }
  