import GameObject from './GameObject';

class Segment extends GameObject {
    constructor(context, x, y, w, h, txt, ID){
        super(context, x, y);
        //Set default width and height
        this.width = w;
        this.height = h;
        this.colorOption = this.isColliding? '#ffcd00' : this.isSelected? '#cdff00': 'e85c5c';
        this.supportOption = this.isColliding? '#71706b' : this.isSelected? '#71706b': 'fffbeb';
        this.text = txt;
        this.fontsize = 50;
        this.buttonID = ID;
        this.innerbuffer = 0;
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
        this.colorOption = this.isSelected? this.isColliding? '#ffffff': '#ffcd00': this.isColliding? '#752e2e' : '#6D7273';
        this.supportOption = this.isColliding? '#71706b' : this.isSelected? '#71706b': '#83898A';
        this.textColor = this.isColliding? '#eeeeee' : this.isSelected? '#eeeeee': '#eeeeee';
        
        this.context.fillStyle = this.colorOption;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        this.context.fillStyle = this.supportOption;
        this.context.fillRect(this.x+25, this.y+25, this.width-50, this.height-50);

        this.context.font = this.fontsize +'px Arial';
        this.context.fillStyle = this.textColor;
        this.context.fillText(this.text,this.x+this.width/2-90,this.y+this.height/2+15);
        
        this.context.fillStyle = '#fffbeb'
        this.context.beginPath();
        this.context.arc(this.x+this.width/2, this.y+this.height/2, 30, 0, Math.PI * 2 * (this.innerbuffer)/100);
        this.context.fill();
    }
}

export default Segment;
