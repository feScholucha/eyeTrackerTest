import EyeCursor from './Components/EyeCursor';
import Target from './Components/Target';

export default class Callibrator {
    constructor(canvas) {
        this.canvas = canvas instanceof HTMLCanvasElement
            ? canvas
            : document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.cursor = new EyeCursor(this.context, 0, 0);
        this.callSqr = new Target(this.context, 10000, 10000);
        this.Targets = [];
        this.nextTarget = 0;
        this.canvasWidth = 1200;
        this.canvasHeight = 600;
        this.pointsArray = [];
        this.primed = 1;
        this.timer = 0;
        this.timerActivate = false;
        this.activateUse = false;
        this.init();

    }
    init() {
        this.Targets = [
            new Target(this.context, this.canvasWidth / 2, this.canvasHeight / 2),
            new Target(this.context, 50, 50),
            new Target(this.context, 50, this.canvasHeight - 50),
            new Target(this.context, this.canvasWidth - 50, 50),
            new Target(this.context, this.canvasWidth - 50, this.canvasHeight - 50),
            new Target(this.context, this.canvasWidth / 2, this.canvasHeight - 50),
            new Target(this.context, this.canvasWidth / 2, 50),
            new Target(this.context, 50, this.canvasHeight / 2),
            new Target(this.context, this.canvasWidth - 50, this.canvasHeight / 2),
            new Target(this.context, this.canvasWidth / 2, this.canvasHeight / 2),
            new Target(this.context, 50, 50),
            new Target(this.context, 50, this.canvasHeight - 50),
            new Target(this.context, this.canvasWidth - 50, 50),
            new Target(this.context, this.canvasWidth - 50, this.canvasHeight - 50),
            new Target(this.context, this.canvasWidth / 2, this.canvasHeight - 50),
            new Target(this.context, this.canvasWidth / 2, 50),
            new Target(this.context, 50, this.canvasHeight / 2),
            new Target(this.context, this.canvasWidth - 50, this.canvasHeight / 2),
        ];
        this.Targets[0].isSelected = true;
        requestAnimationFrame((timeStamp) => { this.canvasLoop(timeStamp) });
    }
    canvasLoop(timeStamp) {
        this.detectEdgeCollisions();
        this.detectCollisions();
        this.clearCanvas();
        this.cursor.draw();
        for (let i = this.Targets.length-1; i >= 0; i--) {
            this.Targets[i].draw();
        }

        this.calStage();
        this.precisionCheck();
        if (this.activateUse === false) {
            this.callSqr.draw();
        }
        
        requestAnimationFrame((timeStamp) => this.canvasLoop(timeStamp));
    }
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }
    detectCollisions() {
        for (let i = 0; i < this.Targets.length; i++) {
            this.cursor.isColliding = false;
            this.Targets[i].isColliding = false;
            if (this.primed === 1) {
                if (this.rectIntersect(this.cursor.x, this.cursor.y, this.cursor.width, this.cursor.height,
                    this.Targets[i].x, this.Targets[i].y, this.Targets[i].width, this.Targets[i].height)) {
                    if (this.Targets[i].isSelected === true) {
                        this.Targets[i].x = 999999;
                        this.nextTarget += 1;
                        this.primed = 0;
                        this.cursor.isColliding = true;
                        this.Targets[i].isColliding = true;
                    }
                }
            }
        }
    };
    detectEdgeCollisions() {
        if (this.cursor.x < this.cursor.width) {
            this.cursor.x = this.cursor.width;
        } else if (this.cursor.x > this.canvasWidth - this.cursor.width) {
            this.cursor.x = this.canvasWidth - this.cursor.width;
        }
        if (this.cursor.y < this.cursor.height) {
            this.cursor.y = this.cursor.height;
        } else if (this.cursor.y > this.canvasHeight - this.cursor.height) {
            this.cursor.y = this.canvasHeight - this.cursor.height;
        }
    };
    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    calStage()
    {
        if (this.Targets.length > this.nextTarget) {
            this.Targets[this.nextTarget].isSelected = true;
        }
        else {
            this.callSqr.x = this.canvasWidth / 2;
            this.callSqr.y = this.canvasHeight / 2;
            if (this.timer === 0) {
                this.timerActivate = true;
            }
        }
    }
    precisionCheck() {
        if (this.primed === 1) {
            if (this.timer < 200) {
                if (this.timerActivate === true) {

                    this.context.fillStyle = '#fffbeb'
                    this.context.beginPath();
                    this.context.arc(this.callSqr.x, this.callSqr.y, 30, 0, Math.PI * 2 * (this.timer + 5) / 200);
                    this.context.fill();

                    this.callSqr.isSelected = true;
                    this.timer++;
                    if (this.timer % 5 === 0) {
                        this.pointsArray.push([this.cursor.x, this.cursor.y]);
                    }
                }
            }
            else {
                if (this.timerActivate === true) {
                    this.calculatePrecision();
                    this.timerActivate = false;
                    this.activateUse = true;
                    this.callSqr.isSelected = false;
                }
            }
        }
    }
    calculatePrecision() {
        var point = [this.canvasWidth / 2, this.canvasHeight / 2];
        var smallestSide = this.canvasHeight >= this.canvasWidth ? this.canvasWidth / 2 : this.canvasHeight / 2;
        var bestDist = [Infinity, 1], worstDist = [0, 0];

        var presArray = [];
        var normalizedArray = [];


        this.pointsArray.forEach(prediction => {
            let xd = prediction[0] - point[0];
            let yd = prediction[1] - point[1];
            let dist = Math.sqrt((xd * xd) + yd * yd);
            presArray.push(dist);
            let normDist = 1 - (dist / smallestSide);
            if (dist < smallestSide && dist >= 0) {
                normalizedArray.push(normDist);
            }
            else if (dist > smallestSide) {
                normalizedArray.push(0);
            }
            else {
                console.error("ERRO: VALOR NEGATIVO");
                normalizedArray.push(1);
            }
            worstDist = worstDist[0] < dist ? [dist, normDist] : worstDist;
            bestDist = bestDist[0] > dist ? [dist, normDist] : bestDist;
        });
        const average = array => array.reduce((a, b) => a + b) / array.length;
        console.log("Canvas Size:");
        console.log(this.canvasWidth, this.canvasHeight);
        console.log("Number of Calibration Points");
        console.log(this.Targets.length);
        console.log("Average Sample: ");
        console.log(average(presArray), average(normalizedArray));
        console.log("Worst Sample: ");
        console.log(...worstDist);
        console.log("Best Sample: ");
        console.log(...bestDist);
    }
};