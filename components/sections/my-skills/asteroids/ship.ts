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

    shipImage: HTMLImageElement;
    shipFireImage: HTMLImageElement;

    constructor(ctx, canvas) {
        this.shipImage = new Image();
        this.shipImage.src = "/ship.svg";
        this.shipFireImage = new Image();
        this.shipFireImage.src = "/shipFire.svg";

        
        this.x = canvas.current.width / 2 - this.shipImage.width / 2;
        this.y = canvas.current.height - 250;
        this.direction = 0;

        this.velocityX = 0;
        this.velocityY = 0;

        this.turningLeft = false;
        this.turningRight = false;

        this.blinking = true;

        

        ctx.drawImage(this.shipImage, this.x, this.y);
    }

    update(canvas, ctx, keys) {
      // If ship goes off screen
      if (this.x > canvas.width + this.shipImage.width)
        this.x = 0 - this.shipImage.width;
      if (this.x < -this.shipImage.width)
        this.x = canvas.width + this.shipImage.width;

      if (this.y > canvas.height + this.shipImage.height)
        this.y = 0 - this.shipImage.height;
      if (this.y < -this.shipImage.height)
        this.y = canvas.height + this.shipImage.height;

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
          keys["w"] ? this.shipFireImage : this.shipImage,
          -this.shipImage.width / 2,
          -this.shipImage.height / 2
        );
        ctx.restore();
      }
    }
}