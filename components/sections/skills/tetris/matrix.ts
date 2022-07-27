import { Block } from "./block";

export class Matrix {
    ctx: any;
    rows: number;
    cols: number;
    blockSize: number;
    matrix: Array<Array<null | Block>>;


    constructor(_ctx) {
        this.ctx = _ctx;
        this.cols = 10;

        // Make the block size as big as possible given that there are 10 columns
        this.blockSize = this.ctx.canvas.width / this.cols;
        /* 
            Dynamically determing row count based on the size of a block and the 
            canvas height. If there is room to fill a partial block, add a row
        */
        this.rows =  Math.floor(this.ctx.canvas.height / this.blockSize) + (this.ctx.canvas.height % this.blockSize > 0 ? 1 : 0);

        this.matrix = [];

        for (let i = 0; i < this.rows; i++) {
            let row: Array<null | Block> = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(null);
            }
            this.matrix.push(row);
        }

        this.update();

        console.log(this.matrix);
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.matrix[i][j]) {
                    this.ctx.drawImage(this.matrix[i][j].image, j * this.blockSize, i * this.blockSize + (this.ctx.canvas.height % this.blockSize) - this.blockSize, this.blockSize, this.blockSize);
                }
            }
            
        }

    }

    update() {
        let verified = [];

        // Verify if the active blocks can move down
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // If the block is the current active piece
                if (this.matrix[i][j] && this.matrix[i][j].active) {
                    // If the block is not on the bottom row
                    if (i < this.rows - 1) {
                        if (this.matrix[i+1][j]) {
                            if (this.matrix[i+1][j].active) {
                                verified.push(true);
                                continue;
                            }
                        } else {
                            verified.push(true);
                            continue;
                        }
                    }
                    verified.push(false);
                }
            }
            
        }
        
       
        // If all active blocks can move down then move down
        // if (!verified.includes(false)) {
        //     for (let i = 0; i < this.rows; i++) {
        //         for (let j = 0; j < this.cols; j++) {
        //             if (this.matrix[i][j] && this.matrix[i][j].active) {
        //                 // console.log(this.matrix[i][j], this.matrix[i+1][j])
        //                 if (i < this.rows - 1) {
                          
        //                     this.matrix[i+1][j] = this.matrix[i][j];
        //                     // this.matrix[i][j] = null;
                            
        //                 }
                 
                        
        //             }
        //         }
                
        //     }
        // }
        if (!verified.includes(false)) {
            for (let i = this.rows - 1; i >= 0; i--) {
                for (let j = this.cols - 1; j > 0; j--) {
                    
                    if (this.matrix[i][j] && this.matrix[i][j].active) {
                        console.log(this.matrix);
                        
                        // console.log(this.matrix[i][j], this.matrix[i+1][j])
                    
                          
                        this.matrix[i+1][j] = this.matrix[i][j];
                        this.matrix[i][j] = null;
                            
                    
                 
                        
                    }
                }
    
                
            }
        }

        console.log("new loop")


        
        setTimeout(() => this.update(), 1000);
    }


    addPiece() {
        let image = new Image();
        image.src = "/tetris/orange.svg";
    
        this.matrix[0][0] = new Block(image);
        this.matrix[0][1] = new Block(image);
        this.matrix[1][0] = new Block(image);
        this.matrix[1][1] = new Block(image);
    }


}