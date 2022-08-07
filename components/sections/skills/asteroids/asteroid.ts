import { BoxCollider } from "./colliders";

export enum Size {
  small,
  medium,
  large,
}

export class Asteroid {
    ctx: any;
    x: number;
    y: number;
    collider: BoxCollider;
    image: any;
    velocityX: number;
    velocityY: number;
    direction: number;
    size: Size;

    constructor(_ctx, _x, _y, _image, _size) {
      this.ctx = _ctx;
      this.size = _size;
      this.image = _image;
      this.x = _x;
      this.y = _y;
      this.direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      this.velocityX = 0.5 + Math.random() * 0.75;
      this.velocityY = 0.5 + Math.random() * 0.75;

      switch(this.size) {
        case Size.large:
          this.collider = new BoxCollider(this.ctx, this.x, this.y, this.image.width, this.image.height);
          break;
        case Size.medium:
          this.collider = new BoxCollider(this.ctx, this.x, this.y, this.image.width / 1.25, this.image.height /1.25);
          break;
        case Size.small:
          this.collider = new BoxCollider(this.ctx, this.x, this.y, this.image.width / 2, this.image.height /2 );
          break;
      }
    }

    draw() {
      switch(this.size) {
        case Size.large:
          this.ctx.drawImage(this.image, this.x, this.y);
          break;

        case Size.medium:
          this.ctx.drawImage(this.image, this.x, this.y, this.image.width / 1.25, this.image.height / 1.25);
          break;

        case Size.small:
          this.ctx.drawImage(this.image, this.x, this.y, this.image.width / 2, this.image.height / 2);
          break;
      }
      
    }

    update() {
      // If asteroid goes off screen
      if (this.x > this.ctx.canvas.width + this.image.width) this.x = 0 - this.image.width;
      if (this.x < -this.image.width) this.x = this.ctx.canvas.width + this.image.width;
      if (this.y > this.ctx.canvas.height + this.image.height) this.y = 0 - this.image.height;
      if (this.y < -this.image.height) this.y = this.ctx.canvas.height + this.image.height;

      
      this.x += this.velocityX * this.direction;
      this.y += this.velocityY * this.direction;

      // Update collider
      this.collider.update(this.x, this.y);
    }

    break(asteroids) {
      switch(this.size) {
        case Size.large:
          asteroids.push(new Asteroid(this.ctx, this.x, this.y, this.image, Size.medium));
          asteroids.push(new Asteroid(this.ctx, this.x, this.y, this.image, Size.medium));
          asteroids.push(new Asteroid(this.ctx, this.x, this.y, this.image, Size.medium));
          break;
        case Size.medium:
          asteroids.push(new Asteroid(this.ctx, this.x, this.y, this.image, Size.small));
          asteroids.push(new Asteroid(this.ctx, this.x, this.y, this.image, Size.small));
          asteroids.push(new Asteroid(this.ctx, this.x, this.y, this.image, Size.small));
          break;
      }
    }
  }