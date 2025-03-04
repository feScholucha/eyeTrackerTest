import Square from './Square';
import Reaper from './Reaper';
import Segment from './Segment';

/*A seção interna principal que gerencia o canvas e a lógica de colisão entre o ponto de previsão e a interface
Ainda está sob construção e precisando de uma refatoração*/

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
        this.primed = 1;
        this.callSqr = new Square(this.context, 10000, 10000, 0, 0, 5);
        this.pointsArray = [];
        this.timer = 0;
        this.timerActivate = false;
        this.activateUse = false;
        this.segments = [[], [], []];
        this.init();
        this.buttonLayout = 3;
        this.buttonDelay = [0, -1, false];
        this.debounce = false;

    }
    buttonPress(value) {
        console.log("Do something with button " + (value+1));
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
        this.segments[0] = [
            new Segment(this.context, (1 * this.canvasWidth / 4)-250, (1 * this.canvasHeight / 4)-125, 500, 250, "Botão 1", 1),
            new Segment(this.context, (3 * this.canvasWidth / 4)-250, (1 * this.canvasHeight / 4)-125, 500, 250, "Botão 2", 2),
            new Segment(this.context, (1 * this.canvasWidth / 4)-250, (3 * this.canvasHeight / 4)-125, 500, 250, "Botão 3", 3),
            new Segment(this.context, (3 * this.canvasWidth / 4)-250, (3 * this.canvasHeight / 4)-125, 500, 250, "Botão 4", 4)
        ] //2x2
        this.segments[1] = [
            new Segment(this.context, (1 * this.canvasWidth / 4)-175-75, (1 * this.canvasHeight / 4)-125, 350, 250, "Botão 1", 1),
            new Segment(this.context, (3 * this.canvasWidth / 4)-175+75, (1 * this.canvasHeight / 4)-125, 350, 250, "Botão 2", 2),
            new Segment(this.context, (1 * this.canvasWidth / 4)-175-75, (3 * this.canvasHeight / 4)-125, 350, 250, "Botão 3", 3),
            new Segment(this.context, (3 * this.canvasWidth / 4)-175+75, (3 * this.canvasHeight / 4)-125, 350, 250, "Botão 4", 4),
            new Segment(this.context, (1 * this.canvasWidth / 2)-150, (1 * this.canvasHeight / 2)-200, 300, 400, "Botão 5", 5)
        ] //Cantos, centro
        this.segments[2] = [
            new Segment(this.context, (1 * this.canvasWidth / 6)-165, (1 * this.canvasHeight / 4)-125, 330, 250, "Botão 1", 1),
            new Segment(this.context, (3 * this.canvasWidth / 6)-165, (1 * this.canvasHeight / 4)-125, 330, 250, "Botão 2", 2),
            new Segment(this.context, (5 * this.canvasWidth / 6)-165, (1 * this.canvasHeight / 4)-125, 330, 250, "Botão 3", 3),
            new Segment(this.context, (1 * this.canvasWidth / 6)-165, (3 * this.canvasHeight / 4)-125, 330, 250, "Botão 4", 4),
            new Segment(this.context, (3 * this.canvasWidth / 6)-165, (3 * this.canvasHeight / 4)-125, 330, 250, "Botão 5", 5),
            new Segment(this.context, (5 * this.canvasWidth / 6)-165, (3 * this.canvasHeight / 4)-125, 330, 250, "Botão 6", 6)
        ] //2x3
        this.segments[3] = [
            new Segment(this.context, (1 * this.canvasWidth / 6)-180, (1 * this.canvasHeight / 6) -90, 360, 180, "Botão 1", 1),
            new Segment(this.context, (3 * this.canvasWidth / 6)-180, (1 * this.canvasHeight / 6) -90, 360, 180, "Botão 2", 2),
            new Segment(this.context, (5 * this.canvasWidth / 6)-180, (1 * this.canvasHeight / 6) -90, 360, 180, "Botão 3", 3),
            new Segment(this.context, (1 * this.canvasWidth / 6)-180, (3 * this.canvasHeight / 6) -90, 360, 180, "Botão 4", 4),
            new Segment(this.context, (3 * this.canvasWidth / 6)-180, (3 * this.canvasHeight / 6) -90, 360, 180, "Botão 5", 5),
            new Segment(this.context, (5 * this.canvasWidth / 6)-180, (3 * this.canvasHeight / 6) -90, 360, 180, "Botão 6", 6),
            new Segment(this.context, (1 * this.canvasWidth / 6)-180, (5 * this.canvasHeight / 6) -90, 360, 180, "Botão 7", 7),
            new Segment(this.context, (3 * this.canvasWidth / 6)-180, (5 * this.canvasHeight / 6) -90, 360, 180, "Botão 8", 8),
            new Segment(this.context, (5 * this.canvasWidth / 6)-180, (5 * this.canvasHeight / 6) -90, 360, 180, "Botão 9", 9),
        ] //3x3
    }
    gameLoop(timeStamp) {
        // console.log(timeStamp)
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
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

        // Update and draw game objects
        this.clearCanvas();
        for (let i = this.gameObjects.length - 1; i > 0; i--) {
            this.gameObjects[i].draw();
        }

        this.gameState();
        this.precisionCheck();
        if (this.activateUse === false) {
            this.callSqr.draw();
        }
        // this.activateUse = true;
        if (this.activateUse) {
            this.detectChoice(this.buttonLayout);
            for (let i = this.segments[this.buttonLayout].length - 1; i >= 0; i--) {
                this.segments[this.buttonLayout][i].draw();
            }
        }
        this.buttonTrigger(this.buttonLayout);
        this.gameObjects[0].draw();

        // Continue game loop
        requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));


    }
    detectEdgeCollisions() {
        let obj;

        for (let i = 0; i < this.gameObjects.length; i++) {
            obj = this.gameObjects[i];
            if (obj.constructor.name === "Reaper") {
                if (obj.x < obj.width) {
                    obj.vx = Math.abs(obj.vx);
                    obj.x = obj.width;
                } else if (obj.x > this.canvasWidth - obj.width) {
                    obj.vx = -Math.abs(obj.vx);
                    obj.x = this.canvasWidth - obj.width;
                }
                if (obj.y < obj.height) {
                    obj.vy = Math.abs(obj.vy);
                    obj.y = obj.height;
                } else if (obj.y > this.canvasHeight - obj.height) {
                    obj.vy = -Math.abs(obj.vy);
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
    detectChoice(mode) {
        let reaper = this.gameObjects[0];
        for (let i = 0; i < this.segments[mode].length; i++) {
            let btn = this.segments[mode][i];
            if (this.rectIntersect(btn.x, btn.y, btn.width, btn.height, reaper.x, reaper.y, reaper.width, reaper.height)) {
                reaper.isColliding = true;
                btn.isColliding = true;
            }
            else {
                reaper.isColliding = false;
                btn.isColliding = false;
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
                    this.context.arc(this.callSqr.x, this.callSqr.y, 30, 0, Math.PI * 2 * (this.timer + 5) / 200);
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
        console.log(this.gameObjects.length);
        console.log("Average Sample: ");
        console.log(average(presArray), average(normalizedArray));
        console.log("Worst Sample: ");
        console.log(...worstDist);
        console.log("Best Sample: ");
        console.log(...bestDist);
    }
    swapLayout(type) {
        this.buttonDelay[0] = 0;
        this.buttonLayout = type;
    }
    buttonTrigger(mode) {
        let collFlag = false;
        for (let i = 0; i < this.segments[mode].length; i++) {
            let btn = this.segments[mode][i];

            if (btn.isColliding) {
                if (this.buttonDelay[2] === false) {
                    if (btn.isColliding) {
                        this.buttonDelay[1] = i + 1;
                        this.buttonDelay[2] = true;
                    }
                }
                if (this.buttonDelay[1] === btn.buttonID) {
                    collFlag = true;
                }
            }
        }
        if (collFlag === true) {
            this.buttonDelay[0] += 2;
        }
        else {
            this.buttonDelay[0] -= 4;
        }
        this.buttonDelay[0] = this.buttonDelay[0] > 100 ? 100 : this.buttonDelay[0];
        if (this.buttonDelay[0] <= 0) {
            this.buttonDelay[0] = 0;
            this.buttonDelay[1] = -1;
            this.buttonDelay[2] = false;
            this.debounce = false;
        }
        else {
            if (this.buttonDelay[0] === 100 && this.debounce === false) {
                this.buttonPress(this.buttonDelay[1] - 1);
                this.debounce = true;
            }
            this.segments[mode][this.buttonDelay[1] - 1].innerbuffer = this.buttonDelay[0];
        }
        // console.log(this.buttonDelay[0]);

    }
}
export default CallWorld;