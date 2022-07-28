import { Block } from "./block";

export class Matrix {
    ctx: any;
    rows: number;
    cols: number;
    blockSize: number;
    matrix: Array<Array<null | Block>>;
    gamma: number;

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

        // Build the matrix
        for (let i = 0; i < this.rows; i++) {
            let row: Array<null | Block> = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(null);
            }
            this.matrix.push(row);
        }

        this.gamma = 0;
        window.addEventListener("deviceorientation", (e)=> {
            if (e.gamma) this.gamma = Math.round(e.gamma);
        }, true);

        this.drop();

        console.log(this.matrix);
    }

    draw() {
        // Draw every position in the matrix
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // If the position is a block
                if (this.matrix[i][j]) {
                    this.ctx.drawImage(this.matrix[i][j].image, j * this.blockSize, i * this.blockSize + (this.ctx.canvas.height % this.blockSize) - this.blockSize, this.blockSize, this.blockSize);
                }
            }
            
        }

    }

    move() {
        console.log(this.matrix);
        for (let i = 0; i < this.rows; i++) {
            // The min and max degrees to handle movement
            if (this.gamma >= -5 && this.gamma <= 5) {
                // If the piece is on the left side
                if (this.gamma < 0) {
                    // Iterate forwards over each block in the row because we are shifting right to left
                    for (let j = 0; j < this.cols; j++) {
                        // If the block is the current active piece
                        if (this.matrix[i][j] && this.matrix[i][j].active) {
                            this.matrix[i][this.gamma + 5] = this.matrix[i][j];
                            this.matrix[i][j] = null;
                        }
                    }
                   
                } 
                // If the piece is on the right side
                // else {
                //     // Iterate backwards over each block in the row because we are shifting left to right
                //     for (let j = this.cols - 1; j >= 0; j--) {
                //         // If the block is the current active piece
                //         if (this.matrix[i][j] && this.matrix[i][j].active) {
                //             this.matrix[i][this.gamma + 4] = this.matrix[i][j];
                //             this.matrix[i][j] = null;
                //         }
                //     }
                    
                // }
            }
            
        }
    }

    // Handles pieces falling
    drop() {
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
        if (!verified.includes(false)) {
            for (let i = this.rows - 1; i >= 0; i--) {
                for (let j = this.cols - 1; j >= 0; j--) {
                    if (this.matrix[i][j] && this.matrix[i][j].active) {
                        this.matrix[i+1][j] = this.matrix[i][j];
                        this.matrix[i][j] = null;
                    }
                }   
            }
        }

        else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if (this.matrix[i][j] && this.matrix[i][j].active)
                    this.matrix[i][j].active = false;
                }
            }
            this.buildPiece();
        }

        setTimeout(() => this.drop(), 500);
    }


    buildPiece(_name?) {
        const names = [
            "OrangeRicky",
            "BlueRicky",
            "ClevelandZ",
            "RhodeIslandZ",
            "Hero",
            "Teewee",
            "Smashboy",
        ]
        const SRCs = [
            "/tetris/orange.svg",
            "/tetris/black.svg",
            "/tetris/blue.svg",
            "/tetris/lightblue.svg",
            "/tetris/pink.svg",
            "/tetris/purple.svg",
            "/tetris/darkblue.svg",
            "/tetris/beige.svg",
        ]
        let image = new Image();
        image.src = SRCs[Math.floor(Math.random() * SRCs.length)];
    

        switch(_name || names[Math.floor(Math.random() * names.length)]) {
            case "OrangeRicky": 
                this.matrix[0][5] = new Block(image);
                this.matrix[1][5] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][3] = new Block(image);
                break;

            case "BlueRicky": 
                this.matrix[0][3] = new Block(image);
                this.matrix[1][3] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][5] = new Block(image);
                break;

            case "ClevelandZ":
                this.matrix[0][3] = new Block(image);
                this.matrix[0][4] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][5] = new Block(image);
                break;

            case "RhodeIslandZ":
                this.matrix[0][5] = new Block(image);
                this.matrix[0][4] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][3] = new Block(image);
                break;

            case "Hero":
                this.matrix[0][3] = new Block(image);
                this.matrix[0][4] = new Block(image);
                this.matrix[0][5] = new Block(image);
                this.matrix[0][6] = new Block(image);
                break;

            case "Teewee":
                this.matrix[0][4] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][3] = new Block(image);
                this.matrix[1][5] = new Block(image);
                break;

            case "Smashboy": 
                this.matrix[0][4] = new Block(image);
                this.matrix[0][5] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][5] = new Block(image);
                break;
        }

        
    }


}