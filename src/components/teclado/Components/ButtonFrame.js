import CoreComponent from './CoreComponent';

export default class ButtonFrame extends CoreComponent {
    constructor(context, x, y, w, h, txt, ID){
        super(context, x, y);
        this.width = w;
        this.height = h;
        this.text = txt;
        this.fontsize = 50;
        this.buttonID = ID;
        this.innerbuffer = 0;
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
