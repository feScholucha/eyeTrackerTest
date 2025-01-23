import GameObject from './GameObject';

class Reaper extends GameObject {
    constructor(context, x, y, vx, vy, mass) {
        super(context, x, y, vx, vy, mass);
        //Set default width and height
        this.width = 50;
        this.height = 50;
    }

    update(x,y) {
        //Move with set velocity
        this.x = x;
        this.y = y;
        this.vx = 200;
        this.vy = 200;
    }

    draw() {
        this.context.fillStyle = this.isColliding?'#6D426D':'#FF00FF';
        this.context.beginPath();
        this.context.arc(this.x, this.y, 25, 0, Math.PI * 2);
        this.context.fill();
        // this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Reaper;
