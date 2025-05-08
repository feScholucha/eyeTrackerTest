import CoreComponent from './CoreComponent';

export default class EyeCursor extends CoreComponent {
    constructor(context, x, y) {
        super(context, x, y);
        this.width = 50;
        this.height = 50;
    }
    update(x,y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        this.context.fillStyle = this.isColliding?'#6D426D':'#b028a6';
        this.context.beginPath();
        this.context.arc(this.x, this.y, 25, 0, Math.PI * 2);
        this.context.fill();
    }
};