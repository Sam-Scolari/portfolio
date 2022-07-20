export class Asteroid {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    direction: number;

    constructor(canvas) {
      this.x = Math.floor(Math.random() * canvas.current.width);
      this.y = Math.floor(Math.random() * canvas.current.height);
      this.direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      this.velocityX = 0.5 + Math.random() * 0.75;
      this.velocityY = 0.5 + Math.random() * 0.75;
    }

    draw(ctx, image) {
      ctx.drawImage(image, this.x, this.y);
    }

    update(canvas, image) {
      // If asteroid goes off screen
      if (this.x > canvas.width + image.width) this.x = 0 - image.width;
      if (this.x < -image.width) this.x = canvas.width + image.width;
      if (this.y > canvas.height + image.height) this.y = 0 - image.height;
      if (this.y < -image.height) this.y = canvas.height + image.height;

      this.x += this.velocityX * this.direction;
      this.y += this.velocityY * this.direction;
    }
  }