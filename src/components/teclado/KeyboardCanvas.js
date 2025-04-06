import EyeCursor from './Components/EyeCursor';
import ButtonFrame from './Components/ButtonFrame';

export default class KeyboardCanvas {
    constructor(canvas) {
        this.canvas = canvas instanceof HTMLCanvasElement
            ? canvas
            : document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.cursor = new EyeCursor(this.context, 0, 0);
        this.ButtonFrames = [];
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.timer = 0;
        this.timerActivate = false;
        this.activateUse = false;
        this.buttonLayout = 3;
        this.buttonDelay = [0, -1, false];
        this.debounce = false;
        this.init();
    }
    init() {
        this.ButtonFrames[0] = [
            new ButtonFrame(this.context, (1 * this.canvasWidth / 4) - 250, (1 * this.canvasHeight / 4) - 125, 500, 250, "Botão 1", 1),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 4) - 250, (1 * this.canvasHeight / 4) - 125, 500, 250, "Botão 2", 2),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 4) - 250, (3 * this.canvasHeight / 4) - 125, 500, 250, "Botão 3", 3),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 4) - 250, (3 * this.canvasHeight / 4) - 125, 500, 250, "Botão 4", 4)
        ] //2x2
        this.ButtonFrames[1] = [
            new ButtonFrame(this.context, (1 * this.canvasWidth / 4) - 175 - 75, (1 * this.canvasHeight / 4) - 125, 350, 250, "Botão 1", 1),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 4) - 175 + 75, (1 * this.canvasHeight / 4) - 125, 350, 250, "Botão 2", 2),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 4) - 175 - 75, (3 * this.canvasHeight / 4) - 125, 350, 250, "Botão 3", 3),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 4) - 175 + 75, (3 * this.canvasHeight / 4) - 125, 350, 250, "Botão 4", 4),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 2) - 150, (1 * this.canvasHeight / 2) - 200, 300, 400, "Botão 5", 5)
        ] //Cantos, centro
        this.ButtonFrames[2] = [
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6) - 165, (1 * this.canvasHeight / 4) - 125, 330, 250, "Botão 1", 1),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6) - 165, (1 * this.canvasHeight / 4) - 125, 330, 250, "Botão 2", 2),
            new ButtonFrame(this.context, (5 * this.canvasWidth / 6) - 165, (1 * this.canvasHeight / 4) - 125, 330, 250, "Botão 3", 3),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6) - 165, (3 * this.canvasHeight / 4) - 125, 330, 250, "Botão 4", 4),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6) - 165, (3 * this.canvasHeight / 4) - 125, 330, 250, "Botão 5", 5),
            new ButtonFrame(this.context, (5 * this.canvasWidth / 6) - 165, (3 * this.canvasHeight / 4) - 125, 330, 250, "Botão 6", 6)
        ] //2x3
        this.ButtonFrames[3] = [
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6) - 180, (1 * this.canvasHeight / 6) - 90, 360, 180, "Botão 1", 1),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6) - 180, (1 * this.canvasHeight / 6) - 90, 360, 180, "Botão 2", 2),
            new ButtonFrame(this.context, (5 * this.canvasWidth / 6) - 180, (1 * this.canvasHeight / 6) - 90, 360, 180, "Botão 3", 3),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6) - 180, (3 * this.canvasHeight / 6) - 90, 360, 180, "Botão 4", 4),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6) - 180, (3 * this.canvasHeight / 6) - 90, 360, 180, "Botão 5", 5),
            new ButtonFrame(this.context, (5 * this.canvasWidth / 6) - 180, (3 * this.canvasHeight / 6) - 90, 360, 180, "Botão 6", 6),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6) - 180, (5 * this.canvasHeight / 6) - 90, 360, 180, "Botão 7", 7),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6) - 180, (5 * this.canvasHeight / 6) - 90, 360, 180, "Botão 8", 8),
            new ButtonFrame(this.context, (5 * this.canvasWidth / 6) - 180, (5 * this.canvasHeight / 6) - 90, 360, 180, "Botão 9", 9),
        ] //3x3
        requestAnimationFrame((timeStamp) => { this.canvasLoop(timeStamp) });
    }
    canvasLoop(timeStamp) {
        this.detectEdgeCollisions();
        this.clearCanvas();
        this.cursor.draw();
        this.detectChoice(this.buttonLayout);
        for (let i = this.ButtonFrames[this.buttonLayout].length - 1; i >= 0; i--) {
            this.ButtonFrames[this.buttonLayout][i].draw();
        }
        this.buttonTrigger(this.buttonLayout);

        requestAnimationFrame((timeStamp) => this.canvasLoop(timeStamp));
    }
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }
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
    detectChoice(mode) {
        for (let i = 0; i < this.ButtonFrames[mode].length; i++) {
            let btn = this.ButtonFrames[mode][i];
            if (this.rectIntersect(btn.x, btn.y, btn.width, btn.height, this.cursor.x, this.cursor.y, this.cursor.width, this.cursor.height)) {
                this.cursor.isColliding = true;
                btn.isColliding = true;
            }
            else {
                this.cursor.isColliding = false;
                btn.isColliding = false;
            }
        }
    }
    swapLayout(type) {
        this.buttonDelay[0] = 0;
        this.buttonLayout = type;
    }
    buttonTrigger(mode) {
        let collFlag = false;
        for (let i = 0; i < this.ButtonFrames[mode].length; i++) {
            let btn = this.ButtonFrames[mode][i];

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
            this.ButtonFrames[mode][this.buttonDelay[1] - 1].innerbuffer = this.buttonDelay[0];
        }
    }
    buttonPress(value) {
        console.log("Do something with button " + (value+1));
    }
};