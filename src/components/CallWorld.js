import Square from './Square';
import Reaper from './Reaper';


class CallWorld {
    constructor(canvas) {
        this.canvas = canvas instanceof HTMLCanvasElement
            ? canvas
            : document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.gameObjects = [];
        this.queue = 1;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.resetCounter = 0;
        this.canvasWidth = 1200;
        this.canvasHeight = 600;
        this.restitution = 1;
        this.primed = 1;
        this.callSqr = new Square(this.context, 10000, 10000, 0, 0, 5);
        this.pointsArray = [];
        this.timer = 0;
        this.timerActivate = false;
        this.init();
    }

    init() {
        this.createWorld();
        this.gameObjects[this.queue].isSelected = true;
        requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) });

    }
    createWorld() {
        this.gameObjects = [
            new Reaper(this.context, 151, 151, 0, 0, 5),
            new Square(this.context, this.canvasWidth / 2, this.canvasHeight / 2, 0, 0, 1),
            new Square(this.context, 50, 50, 0, 0, 1),
            new Square(this.context, 50, this.canvasHeight - 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth - 50, 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth - 50, this.canvasHeight - 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth / 2, this.canvasHeight - 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth / 2, 50, 0, 0, 1),
            new Square(this.context, 50, this.canvasHeight / 2, 0, 0, 1),
            new Square(this.context, this.canvasWidth - 50, this.canvasHeight / 2, 0, 0, 1),
            new Square(this.context, this.canvasWidth / 2, this.canvasHeight / 2, 0, 0, 1),
            new Square(this.context, 50, 50, 0, 0, 1),
            new Square(this.context, 50, this.canvasHeight - 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth - 50, 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth - 50, this.canvasHeight - 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth / 2, this.canvasHeight - 50, 0, 0, 1),
            new Square(this.context, this.canvasWidth / 2, 50, 0, 0, 1),
            new Square(this.context, 50, this.canvasHeight / 2, 0, 0, 1),
            new Square(this.context, this.canvasWidth - 50, this.canvasHeight / 2, 0, 0, 1),
        ];
    }

    gameLoop(timeStamp) {
        // console.log(timeStamp)
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;


        // Loop over all game objects to update
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].constructor.name === "Square") {
                this.gameObjects[i].update(this.secondsPassed);
            }
            if (this.gameObjects[i].constructor.name === "Reaper") {
                this.gameObjects[i].vx = this.gameObjects[i].vy = 0;
            }
        }

        this.detectCollisions();
        this.detectEdgeCollisions();
        this.clearCanvas();

        // Update and draw game objects
        this.gameObjects[0].draw();
        for (let i = this.gameObjects.length-1; i > 0; i--) {
            this.gameObjects[i].draw();
        }
        // this.gameObjects.forEach(obj => {
        //     // obj.update();
        //     obj.draw();
        // });
        this.gameState();
        this.precisionCheck();
        this.callSqr.draw();
        // Continue game loop
        requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));

    }
    detectEdgeCollisions() {
        let obj;
        // if (x2 > w1 + x1 || x1 > w   2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {}

        for (let i = 0; i < this.gameObjects.length; i++) {
            obj = this.gameObjects[i];
            // Check for left and right
            if (obj.constructor.name === "Reaper") {

                if (obj.x < obj.width) {
                    obj.vx = Math.abs(obj.vx) * this.restitution;
                    obj.x = obj.width;
                } else if (obj.x > this.canvasWidth - obj.width) {
                    obj.vx = -Math.abs(obj.vx) * this.restitution;
                    obj.x = this.canvasWidth - obj.width;
                }

                // Check for bottom and top
                if (obj.y < obj.height) {
                    obj.vy = Math.abs(obj.vy) * this.restitution;
                    obj.y = obj.height;
                } else if (obj.y > this.canvasHeight - obj.height) {
                    obj.vy = -Math.abs(obj.vy) * this.restitution;
                    obj.y = this.canvasHeight - obj.height;
                }
            }
        }
    }
    detectCollisions() {
        let obj1;
        let obj2;

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }

        for (let i = 0; i < this.gameObjects.length; i++) {
            obj1 = this.gameObjects[i];
            for (let j = i + 1; j < this.gameObjects.length; j++) {
                obj2 = this.gameObjects[j];
                // console.log(this.primed);
                if (this.primed === 1) {
                    if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                        if (obj1.constructor.name === "Reaper" && obj2.isSelected === true) {
                            obj2.x = 999999;
                            this.queue += 1;
                            this.primed = 0;
                            obj1.isColliding = true;
                            obj2.isColliding = true;
                        }
                        else if (obj1.isSelected === true && obj2.constructor.name === "Reaper") {
                            obj1.x = 999999;
                            this.queue += 1;
                            this.primed = 0;
                            obj1.isColliding = true;
                            obj2.isColliding = true;
                        }
                    }
                }
            }
        }
    }
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    gameState() {
        if (this.gameObjects.length > this.queue) {
            this.gameObjects[this.queue].isSelected = true;
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
                    this.context.arc(this.callSqr.x, this.callSqr.y, 30, 0, Math.PI*2 * (this.timer+5)/200);
                    this.context.fill();

                    this.callSqr.isSelected = true;
                    this.timer++;
                    if (this.timer % 5 === 0) {
                        this.pointsArray.push([this.gameObjects[0].x, this.gameObjects[0].y]);
                    }
                }
            }
            else {
                if (this.timerActivate === true) {
                    this.calculatePrecision();
                    this.timerActivate = false;
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
        console.log(this.gameObjects.length);
        console.log("Average Sample: ");
        console.log(average(presArray), average(normalizedArray));
        console.log("Worst Sample: ");
        console.log(...worstDist);
        console.log("Best Sample: ");
        console.log(...bestDist);
    }
}
export default CallWorld;
