export class Block {
    ctx: any;
    image: any;
    locked: boolean;
    x: number;
    y: number;
    

    constructor(_ctx, _x, _y, _image) {
        this.ctx = _ctx;
        this.x = _x;
        this.y = _y;
        this.image = _image;
        this.locked = false;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }

    update() {
        // Lock the block when it touches the bottom of the canvas
        if (this.y + this.image.height >= this.ctx.canvas.height) this.locked=true;

        if (!this.locked && Math.floor(Date.now() / 400) % 2) {
            this.y += 0.5;
        }
       
    }
}