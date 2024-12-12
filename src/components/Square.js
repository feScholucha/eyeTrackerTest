import GameObject from './GameObject';

class Square extends GameObject {
    constructor(context, x, y, vx, vy, mass) {
        super(context, x, y, vx, vy, mass);
        //Set default width and height
        this.width = 50;
        this.height = 50;
    }

    update(secondsPassed) {
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }

    draw() {
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Square;
