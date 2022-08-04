import { BoxCollider } from "./colliders";

export class Bullet {
    ctx: any;
    x: number;
    y: number;
    collider: BoxCollider;
    width: number;
    height: number;
    velocityX: number;
    velocityY: number;
    direction: number;
    speed: number;

    constructor(_ctx, _x, _y, _offset, _direction) {
      this.ctx = _ctx;
      this.width = 5;
      this.height = 5;
      this.direction = _direction;
      this.x = _x - this.width / 2  +  Math.sin(this.direction) * _offset / 2;
      this.y = _y  - Math.cos(this.direction) * _offset / 2;
      this.speed = 6;
      this.collider = new BoxCollider(this.ctx, this.x, this.y, this.width, this.height);
    }

    draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.x += Math.sin(this.direction) * this.speed;
      this.y -= Math.cos(this.direction) * this.speed;

      // Update collider
      this.collider.update(this.x, this.y);


    }
  }