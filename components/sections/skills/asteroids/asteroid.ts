enum Size {
  small,
  medium,
  large,
}

export class Asteroid {
    ctx: any;
    x: number;
    y: number;
    image: any;
    velocityX: number;
    velocityY: number;
    direction: number;
    size: Size;

    constructor(_ctx, _image) {
      this.ctx = _ctx;
      this.size = Size.large;
      this.image = _image;
      this.x = Math.floor(Math.random() * _ctx.canvas.width);
      this.y = Math.floor(Math.random() * _ctx.canvas.height);
      this.direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      this.velocityX = 0.5 + Math.random() * 0.75;
      this.velocityY = 0.5 + Math.random() * 0.75;
    }

    draw() {
      this.ctx.drawImage(this.image, this.x, this.y);
    }

    update() {
      // If asteroid goes off screen
      if (this.x > this.ctx.canvas.width + this.image.width) this.x = 0 - this.image.width;
      if (this.x < -this.image.width) this.x = this.ctx.canvas.width + this.image.width;
      if (this.y > this.ctx.canvas.height + this.image.height) this.y = 0 - this.image.height;
      if (this.y < -this.image.height) this.y = this.ctx.canvas.height + this.image.height;

      
      this.x += this.velocityX * this.direction;
      this.y += this.velocityY * this.direction;
    }
  }