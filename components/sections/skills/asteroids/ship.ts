import { BoxCollider } from "./colliders";

export class Ship {
    ctx: any;
    x: number;
    y: number;
    collider: BoxCollider;
    velocityX: number;
    velocityY: number;
    direction: number;
    image: any;
    fireImage: any;

    blinking: boolean;

    turningLeft: boolean;
    turningRight: boolean;

    moving: boolean;

    constructor(_ctx) {
        this.x = _ctx.canvas.width / 2 - 9.5;
        this.y = _ctx.canvas.height - 250;
        this.direction = 0;

        this.velocityX = 0;
        this.velocityY = 0;

        this.turningLeft = false;
        this.turningRight = false;

        this.blinking = true;

        this.ctx = _ctx;

        this.image = new Image();
        this.image.src = "/ship.svg";

        this.fireImage = new Image();
        this.fireImage.src = "/shipFire.svg";

        this.collider = new BoxCollider(this.ctx, this.x, this.y, this.image.width, this.image.height);
    }

    move() {
      if (this.blinking) this.blinking = false;
      this.velocityX -= Math.sin(this.direction) * 0.1;
      this.velocityY += Math.cos(this.direction) * 0.1;
    }

    turnLeft() {
      this.direction = this.direction - Math.PI / 100;
    }

    turnRight() {
      this.direction = this.direction + Math.PI / 100;
    }

    draw(_fire) {
      // Blink the ship if this.blinking
      if (!this.blinking || Math.floor(Date.now() / 450) % 2) {
        this.ctx.save();

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.direction);

        this.ctx.drawImage(
          _fire ? this.fireImage : this.image,
          -this.image.width / 2,
          -this.image.height / 2
        );

        this.ctx.restore();
      }
    }

    update() {
      // If ship goes off the right of the screen
      if (this.x > this.ctx.canvas.width + this.image.width)
        this.x = 0 - this.image.width;

      // If ship goes off the left of the screen
      if (this.x < -this.image.width)
        this.x = this.ctx.canvas.width + this.image.width;

      // If ship goes off the bottom of the screen
      if (this.y > this.ctx.canvas.height + this.image.height)
        this.y = 0 - this.image.height;

        // If ship goes off the top of the screen
      if (this.y < -this.image.height)
        this.y = this.ctx.canvas.height + this.image.height;

      // Gradually slow the ship down  
      this.velocityX *= 0.99;
      this.velocityY *= 0.99;
      this.x -= this.velocityX;
      this.y -= this.velocityY;

      // Update collider
      this.collider.update(this.x - this.image.width / 2, this.y - this.image.height / 2);
    }

    break() {
      this.x = this.ctx.canvas.width / 2 - 9.5;
      this.y = this.ctx.canvas.height - 250;
      this.direction = 0;

      this.velocityX = 0;
      this.velocityY = 0;

      this.blinking = true;
    }
}