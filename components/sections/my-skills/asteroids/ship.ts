export class Ship {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    direction: number;

    blinking: boolean;

    turningLeft: boolean;
    turningRight: boolean;

    moving: boolean;

    constructor(ctx, canvas) {
        this.x = canvas.current.width / 2 - 9.5;
        this.y = canvas.current.height - 250;
        this.direction = 0;

        this.velocityX = 0;
        this.velocityY = 0;

        this.turningLeft = false;
        this.turningRight = false;

        this.blinking = true;
    }

    update(canvas, ctx, keys, shipImage, shipFireImage) {
      // If ship goes off screen
      if (this.x > canvas.width + shipImage.width)
        this.x = 0 - shipImage.width;
      if (this.x < -shipImage.width)
        this.x = canvas.width + shipImage.width;

      if (this.y > canvas.height + shipImage.height)
        this.y = 0 - shipImage.height;
      if (this.y < -shipImage.height)
        this.y = canvas.height + shipImage.height;

      // Moving
      if (keys["w"]) {
        if (this.blinking) this.blinking = false;
        this.velocityX -= Math.sin(this.direction) * 0.1;
        this.velocityY += Math.cos(this.direction) * 0.1;
      }

      // Turning
      if (keys["a"]) this.direction = this.direction - Math.PI / 100;
      if (keys["d"]) this.direction = this.direction + Math.PI / 100;

      this.velocityX *= 0.99;
      this.velocityY *= 0.99;

      this.x -= this.velocityX;
      this.y -= this.velocityY;

      if (!this.blinking || Math.floor(Date.now() / 450) % 2) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction);

        ctx.drawImage(
          keys["w"] ? shipFireImage : shipImage,
          -shipImage.width / 2,
          -shipImage.height / 2
        );
        ctx.restore();
      }
    }
}