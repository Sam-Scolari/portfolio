import { Block } from "./block";

export class Matrix {
    ctx: any;
    rows: number;
    cols: number;
    blockSize: number;
    matrix: Array<Array<null | Block>>;

    gamma: number;
    baseOffset: number;
    gammaMultiplier: number;
    gammaBounds: {min: number, max: number};
    gammaMap: Map<number, number>;
    // keys: Array<any>;

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

      

        // Every cell should be worth 2deg of gamma
        this.gammaMultiplier = 2;

        // Min and max degree bounds of gamma rotation
        this.gammaBounds = {min: -(this.gammaMultiplier * this.cols / 2), max: this.gammaMultiplier * this.cols / 2};

        let index = 0;
        this.gammaMap = {} as Map<number, number>;
        for (let g = this.gammaBounds.min; g <=  this.gammaBounds.max; g+=this.gammaMultiplier) {
            if (g > 0) {
                this.gammaMap[`${g}`] = index - 1;
            } else {
                this.gammaMap[`${g}`] = index;
            }
            
            index++;
        }
        delete this.gammaMap["0"];

        // console.log(this.gammaMap)

        // Set gamma
        this.gamma = 0;
        // The position of the base block from 0
        this.baseOffset = 0;
        window.addEventListener("deviceorientation", (e)=> {
            if (e.gamma) {
                this.gamma = Math.round(e.gamma);

                // min and max bounds for left and right movement
                if (this.gamma < this.gammaBounds.min) this.gamma = this.gammaBounds.min;
                if (this.gamma > this.gammaBounds.max) this.gamma = this.gammaBounds.max;
            }
        }, true);

        // this.keys = [];
        // document.body.addEventListener("keydown", (e) => this.keys[e.key] = true);
        // document.body.addEventListener("keyup", (e) => this.keys[e.key] = false);



        this.drop();

        // console.log(this.matrix);
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

    getIndexFromGamma(_gamma) {
        if (_gamma < 0) return _gamma / this.gammaMultiplier + 5;
        return _gamma / this.gammaMultiplier + 4;
    }

    getGammaFromIndex(_index) {
        if (_index < 5) return (_index - 5) * this.gammaMultiplier;
        return (_index - 4) * this.gammaMultiplier;
    }

    getDelta(_newIndex) {
        // Iterate over every row
        for (let i = 0; i < this.rows; i++) {
            // Iterate over every column
            for (let j = 0; j < this.cols; j++) {
                // The block is the current active piece
                if (this.matrix[i][j] && this.matrix[i][j].base) {
                    if (_newIndex !== j) {
                        if (_newIndex > j) return _newIndex - j;
                        else return j - _newIndex;
                    } 
                    return 0;
                  
                }
            }
        }
    }

    verify(_direction, _delta) {
        let verified = [];

        // Iterate over every row
        for (let i = 0; i < this.rows; i++) {
            // Iterate over every column
            for (let j = 0; j < this.cols; j++) {
                // The block is the current active piece
                if (this.matrix[i][j] && this.matrix[i][j].active) {
                    switch(_direction) {
                        case "down": {
                            // The block is not on the bottom row
                            if (i < this.rows - 1) {
                                // There is a piece at the new position
                                if (this.matrix[i+_delta][j]) {
                                    // The new position is inside of another active piece
                                    if (this.matrix[i+_delta][j].active) {
                                        verified.push(true);
                                        continue;
                                    }
                                } 
                                // There is no piece at the new position
                                else {
                                    verified.push(true);
                                    continue;
                                }
                            } 
                            verified.push(false);
                            break;
                        }

                        case "left": {
                            // If the block is not on the left most column
                            if (j > 0) {
                                // There is a piece at the new position
                                verified.push(true);
                                break;
                                // if (this.matrix[i][j-_delta]) {
                                //     // The new position is inside of another active piece
                                //     if (this.matrix[i][j-_delta].active) {
                                //         verified.push(true);
                                //         continue;
                                //     }
                                // } 
                                // // There is no piece at the new position
                                // else {
                                //     verified.push(true);
                                //     continue;
                                // }
                            }
                            verified.push(false);
                            break;
                        }

                        // case "right": {
                        //     // If the block is not on the right most column
                        //     if (j < this.cols - 1) {
                        //         // There is a piece at the new position
                        //         if (this.matrix[i][j+_delta]) {
                        //             // The new position is inside of another active piece
                        //             if (this.matrix[i][j+_delta].active) {
                        //                 verified.push(true);
                        //                 continue;
                        //             }
                        //         } 
                        //         // There is no piece at the new position
                        //         else {
                        //             verified.push(true);
                        //             continue;
                        //         }
                        //     }
                        //     verified.push(false);
                        //     break;
                        // }

                    }
                    
                }
            }
        }
        return !verified.includes(false);
    }

    move() {
        // let newGamma = this.gamma;
        let delta = this.getDelta(this.getIndexFromGamma(this.gamma));
        // console.log(this.getDelta(this.getIndexFromGamma(newGamma)));

            // Move left
            if (this.gamma < 0) {
                // All active blocks can move left
                if (this.verify("left", delta)) {
                    // Iterate over every row
                    for (let i = 0; i < this.rows; i++) { 
                        // Iterate forwards over each column because we are moving left
                        for (let j = 0; j < this.cols; j++) {
                            // If the block is the current active piece
                            if (this.matrix[i][j] && this.matrix[i][j].active) {
                                this.matrix[i][j - delta] = this.matrix[i][j];
                                this.matrix[i][j] = null;
                            }
                        } 
                    }
                }
            } 
            // Move right
            // else {
            //     // All active blocks can move right
            //     if (this.verify("right", 1)) {
            //         // Iterate over every row
            //         for (let i = 0; i < this.rows; i++) { 
            //             // Iterate backwards over each column because we are moving right
            //             for (let j = this.cols - 1; j >= 0; j--) {
            //                 // If the block is the current active piece
            //                 if (this.matrix[i][j] && this.matrix[i][j].active) {
            //                     this.matrix[i][j + 1] = this.matrix[i][j];
            //                     this.matrix[i][j] = null;
            //                 }
            //             }
            //         }
            //     }
            // }
        
        
    }

    // Handles pieces falling
    drop() {
        // If all active blocks can move down then move down
        if (this.verify("down", 1)) {
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
                this.matrix[1][5] = new Block(image, true);
                // this.baseOffset = 5;
                this.matrix[1][4] = new Block(image);
                this.matrix[1][3] = new Block(image);
                
                break;

            case "BlueRicky": 
                this.matrix[0][3] = new Block(image);
                this.matrix[1][3] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][5] = new Block(image, true);
                // this.baseOffset = 5;
                break;

            case "ClevelandZ":
                this.matrix[0][3] = new Block(image);
                this.matrix[0][4] = new Block(image);
                this.matrix[1][4] = new Block(image);
                this.matrix[1][5] = new Block(image, true);
                // this.baseOffset = 5;
                break;

            case "RhodeIslandZ":
                this.matrix[0][5] = new Block(image);
                this.matrix[0][4] = new Block(image);
                this.matrix[1][4] = new Block(image, true);
                // this.baseOffset = 4;
                this.matrix[1][3] = new Block(image);
                break;

            case "Hero":
                this.matrix[0][3] = new Block(image);
                this.matrix[0][4] = new Block(image);
                this.matrix[0][5] = new Block(image);
                this.matrix[0][6] = new Block(image, true);
                // this.baseOffset = 6;
                break;

            case "Teewee":
                this.matrix[0][4] = new Block(image);
                this.matrix[1][4] = new Block(image, true);
                // this.baseOffset = 4;
                this.matrix[1][3] = new Block(image);
                this.matrix[1][5] = new Block(image);
                break;

            case "Smashboy": 
                this.matrix[0][4] = new Block(image);
                this.matrix[0][5] = new Block(image, true);
                // this.baseOffset = 5;
                this.matrix[1][4] = new Block(image);
                this.matrix[1][5] = new Block(image);
                break;
        }

        
    }


}