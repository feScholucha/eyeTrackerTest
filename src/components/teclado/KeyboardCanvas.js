import EyeCursor from './Components/EyeCursor';
import ButtonFrame from './Components/ButtonFrame';
import PassiveFrame from './Components/PassiveFrame';
import ButtonManager from './ButtonManager';

export default class KeyboardCanvas {
    constructor(canvas) {
        this.canvas = canvas instanceof HTMLCanvasElement
            ? canvas
            : document.getElementById(canvas);
        this.canvas.style.background = "#4b4444";
        this.context = this.canvas.getContext('2d');
        this.cursor = new EyeCursor(this.context, 0, 0);
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.timer = 0;
        this.timerActivate = false;
        this.activateUse = false;
        this.buttonLayout = 0;
        this.buttonDelay = [0, -2, false]; //Timer 0 a 100, Botão Escolhido, Há botão ativo
        this.debounce = false;
        this.LayoutTeclado = [];
        this.Cluster = [];
        this.clusterSelection = 0;
        this.menuMode = 0;
        this.word = "";
        this.console = new PassiveFrame(this.context, (1 * this.canvasWidth / 6), -250, (1 * this.canvasHeight / 9), -125, 1780, 125);
        this.shiftMode = false;
        this.init();
    }
    init() {
        this.LayoutTeclado[0] = [
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6), - 250, (1 * this.canvasHeight / 4), - 125, 500, 250, "Q/W/A/H/O", 0),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6), - 250, (1 * this.canvasHeight / 4), - 125, 500, 250, "U/Z/N/J/X/F", 1),
            new ButtonFrame(this.context, (5 * this.canvasWidth / 6), - 250, (1 * this.canvasHeight / 4), - 125, 500, 250, "M/I/D/K/Y/V", 2),
            new ButtonFrame(this.context, (1 * this.canvasWidth / 6), - 250, (3 * this.canvasHeight / 4), - 125, 500, 250, "R/S/L/C", 3),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6), - 250, (3 * this.canvasHeight / 4), - 125, 500, 250, "T/P/G/E/B", 4),
            new ButtonFrame(this.context, (3 * this.canvasWidth / 6), - 250, (3 * this.canvasHeight / 6), - 125, 500, 250, "Shift", -1)
        ];
        let btnManager = new ButtonManager();
        this.Cluster = btnManager.clusterize(this.context, 1, this.canvasWidth, this.canvasHeight, -250, -125, 500, 250);

        requestAnimationFrame((timeStamp) => { this.canvasLoop(timeStamp) });
    }
    canvasLoop(timeStamp) {
        this.detectEdgeCollisions();
        this.clearCanvas();
        this.cursor.draw();
        this.console.updateWord(this.word);
        this.console.draw();
        if (this.menuMode === 0) {
            this.detectChoice(this.buttonLayout, this.LayoutTeclado);
            for (let i = this.LayoutTeclado[this.buttonLayout].length - 1; i >= 0; i--) {
                this.LayoutTeclado[this.buttonLayout][i].draw();
            }
            this.buttonTrigger(this.buttonLayout, this.LayoutTeclado);
        }
        else if (this.menuMode === 1) {
            this.detectChoice(this.clusterSelection, this.Cluster);
            for (let i = this.Cluster[this.clusterSelection].length - 1; i >= 0; i--) {
                this.Cluster[this.clusterSelection][i].draw();
            }
            this.buttonTrigger(this.clusterSelection, this.Cluster);
        }

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
    detectChoice(mode, buttonGroup) {
        for (let i = 0; i < buttonGroup[mode].length; i++) {
            let btn = buttonGroup[mode][i];
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
    buttonTrigger(mode, buttonGroup) {
        let collFlag = false;
        for (let i = 0; i < buttonGroup[mode].length; i++) {
            let btn = buttonGroup[mode][i];

            if (btn.isColliding) {
                if (this.buttonDelay[2] === false) {
                    if (btn.isColliding) {
                        this.buttonDelay[1] = i + 1;
                        this.buttonDelay[2] = true;
                    }
                }
                if (this.buttonDelay[1] === i + 1) {
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
            this.buttonDelay[1] = -2;
            this.buttonDelay[2] = false;
            this.debounce = false;
        }
        else {
            if (this.buttonDelay[0] === 100 && this.debounce === false) {
                this.buttonPress(buttonGroup[mode][this.buttonDelay[1] - 1].buttonID);

                this.debounce = true;
            }
            if (buttonGroup[mode][this.buttonDelay[1] - 1] !== undefined) {
                buttonGroup[mode][this.buttonDelay[1] - 1].innerbuffer = this.buttonDelay[0];
            }

        }
    }
    buttonPress(value) {
        switch (this.menuMode) {
            case 0:
                if(value !== -1)
                    {
                        this.menuMode = 1;
                        this.clusterSelection = value;
                }
                else
                {
                    this.shiftMode = !this.shiftMode;
                }
                break;
            case 1:
                if (value === -1) {
                    this.menuMode = 0;
                    this.debounce = true;
                    this.buttonDelay[0] = 0;
                }
                else {
                    if (value !== -2) {
                        if(value === 27)
                        {
                            this.word += " ";
                        }
                        else
                        {
                            if(this.shiftMode)
                            {
                                this.word += String.fromCharCode(96 + value);
                            }
                            else
                            {
                                this.word += String.fromCharCode(64 + value);
                            }
                        }
                    }
                    else {
                        this.word = this.word.slice(0, -1);
                    }
                    console.log("Word is: " + this.word);
                }
                break;

            default:
                break;
        }
    }
};