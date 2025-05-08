import CoreComponent from './CoreComponent';

export default class PassiveFrame extends CoreComponent {
    constructor(context, x, offsetX, y, offsetY, w, h, txt){
        super(context, x+offsetX, y+offsetY);
        this.width = w;
        this.height = h;
        this.text = txt;
        this.fontsize = 50;
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
    updateWord(newString)
    {
        this.text = newString;
    }
    draw() {
        this.colorOption = this.isSelected? this.isColliding? '#ffffff': '#ffcd00': this.isColliding? '#752e2e' : '#d9d9d9';
        this.supportOption = this.isColliding? '#71706b' : this.isSelected? '#71706b': '#f2f2f2';
        this.textColor = this.isColliding? '#ffffff' : this.isSelected? '#ffffff': '#111111';
        
        this.context.fillStyle = this.colorOption;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        this.context.fillStyle = this.supportOption;
        this.context.fillRect(this.x+25, this.y+25, this.width-50, this.height-50);

        this.context.font = this.fontsize +'px Arial';
        this.context.fillStyle = this.textColor;
        this.context.fillText(this.text,this.x+this.width/2-90,this.y+this.height/2+15);
    }
}
