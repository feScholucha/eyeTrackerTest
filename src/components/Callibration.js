import Square from './Square';
import Reaper from './Reaper';


class Calibration {
    constructor(canvas) {
        this.canvas = canvas instanceof HTMLCanvasElement
            ? canvas
            : document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.gameObjects = [];
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.resetCounter = 0;
        this.canvasWidth = 1200;
        this.canvasHeight = 600;
        this.restitution = 0.75;

        this.init();
    }

    init() {
        this.createWorld();
        requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) });
    }
    
    createWorld() {
        this.gameObjects = [
            new Reaper(this.context, this.canvasWidth/2, this.canvasHeight/2, 200, 200, 5),
            new Square(this.context, 250, 50, 0, 50, 1),
            new Square(this.context, 250, 300, 0, -50, 1),
            new Square(this.context, 200, 0, 50, 50, 1),
            new Square(this.context, 250, 150, 50, 50, 1),
            new Square(this.context, 300, 75, -50, 50, 1),
            new Square(this.context, 300, 300, 50, -50, 1)
        ];
    }

    gameLoop(timeStamp) {
        // console.log(timeStamp)
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for (let i = 0; i < this.gameObjects.length; i++) {
            if(this.gameObjects[i].constructor.name === "Square")
            {
                this.gameObjects[i].update(this.secondsPassed);
            }
            if(this.gameObjects[i].constructor.name === "Reaper")
            {
                this.gameObjects[i].vx = this.gameObjects[i].vy = 200;
            }
        }
        
        this.detectCollisions();
        this.detectEdgeCollisions();
        this.clearCanvas();



        // Update and draw game objects
        this.gameObjects.forEach(obj => {
            // obj.update();
            obj.draw();
        });

        // Continue game loop
        requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));

    }
    detectEdgeCollisions() {
        let obj;
        // if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {}

        for (let i = 0; i < this.gameObjects.length; i++) {
            obj = this.gameObjects[i];
            // Check for left and right
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

                if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
                    let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
                    let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
                    let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    if (speed < 0) {
                        break;
                    }

                    let impulse = 2 * speed / (obj1.mass + obj2.mass);
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                }
            }
        }
    }
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }

        return true;
    }
    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
export default Calibration;