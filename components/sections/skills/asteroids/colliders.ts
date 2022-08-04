export function BoxCollision(r1,r2){
    return !(r1.x>r2.x+r2.w || r1.x+r1.w<r2.x || r1.y>r2.y+r2.h || r1.y+r1.h<r2.y);
}

export class BoxCollider {
    ctx: any;
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(_ctx, _x, _y, _w, _h) {
        this.ctx = _ctx;
        this.x = _x - _w / 2;
        this.y = _y - _h / 2;
        this.w = _w;
        this.h = _h;
       
    }

    update(_x, _y) {
        this.x = _x;
        this.y = _y;
        // this.ctx.beginPath();
        // this.ctx.rect(this.x, this.y, this.w, this.h);
        // this.ctx.stroke();
    }
}