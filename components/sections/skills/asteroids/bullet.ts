export class Bullet {
    ctx: any;
    x: number;
    y: number;
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
      // if (_direction > 2 * Math.PI) this.direction = this.direction % (2 * Math.PI);

      this.x = _x - this.width / 2  +  Math.sin(this.direction) * _offset / 2;
      this.y = _y  - Math.cos(this.direction) * _offset / 2;

   

      // this.velocityX = ship.velocityX;
      // this.velocityY = ship.velocityY;

      this.speed = 6;
    }

    draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.x += Math.sin(this.direction) * this.speed;
      this.y -= Math.cos(this.direction) * this.speed;

      // this.x -= this.velocityX;
      // this.y -= this.velocityY;
    }
  }