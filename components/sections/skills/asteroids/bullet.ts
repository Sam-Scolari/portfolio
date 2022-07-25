export class Bullet {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    direction: number;
    speed: number;

    constructor(ship) {
      this.x = ship.x;
      this.y = ship.y;

      this.direction = ship.direction;

      this.velocityX = ship.velocityX;
      this.velocityY = ship.velocityY;

      this.speed = 2;
    }

    draw(ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, 5, 5);
    }

    update() {
      this.velocityX -= Math.sin(this.direction) * 0.1;
      this.velocityY += Math.cos(this.direction) * 0.1;

      this.x -= this.velocityX;
      this.y -= this.velocityY;
    }
  }