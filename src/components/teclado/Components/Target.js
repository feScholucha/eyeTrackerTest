import CoreComponent from './CoreComponent';

export default class Target extends CoreComponent {
    constructor(context, x, y) {
        super(context, x, y);
        this.width = 50;
        this.height = 50;
    }
    update(x,y) {
        this.x = x;
        this.y = y;
    }
    arcdraw(radius)
    {
        this.context.beginPath();
        this.context.arc(this.x, this.y, radius, 0, Math.PI * 2);
        this.context.fill();
    }
    draw() {
        this.colorOption = this.isSelected? this.isColliding? '#ffffff': '#ffcd00': this.isColliding? '#752e2e' : '#e85c5c';
        this.supportOption = this.isColliding? '#71706b' : this.isSelected? '#71706b': '#fffbeb';
        this.context.fillStyle = this.colorOption;
        this.arcdraw(25);
        this.context.fillStyle = this.supportOption;
        this.arcdraw(15);
        this.context.fillStyle = this.colorOption;
        this.arcdraw(5);
    }
};
