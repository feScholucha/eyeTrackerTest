import GameObject from './GameObject';

class Square extends GameObject {
    constructor(context, x, y, vx, vy, mass) {
        super(context, x, y, vx, vy, mass);
        //Set default width and height
        this.width = 50;
        this.height = 50;
        this.colorOption = this.isColliding? '#ffcd00' : this.isSelected? '#cdff00': 'e85c5c';
        this.supportOption = this.isColliding? '#71706b' : this.isSelected? '#71706b': 'fffbeb';
    }

    update(secondsPassed) {
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
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
}

export default Square;
