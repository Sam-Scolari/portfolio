export class Block {
    image: any;
    baseImage: any;
    active: boolean;
    base: boolean;
   
    constructor(_image, _base=false) {
        this.active = true;
        this.image = _image;
        this.base = _base;
    }
}