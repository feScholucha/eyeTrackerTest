import CoreComponent from './CoreComponent';

export default class ButtonFrame extends CoreComponent {
    constructor(context, x, offsetX, y, offsetY, w, h, txt, buttonID){
        super(context, x+offsetX, y+offsetY);
        this.width = w;
        this.height = h;
        this.text = txt;
        this.fontsize = 50;
        this.buttonID = buttonID;
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
        this.colorOption = this.isSelected? this.isColliding? '#ffffff': '#ffcd00': this.isColliding? '#59DB8D' : '#d9d9d9';
        this.supportOption = this.isColliding? '#CbCbCb' : this.isSelected? '#91909b': '#f2f2f2';
        this.textColor = this.isColliding? '#111111' : this.isSelected? '#111111': '#111111';
        
        this.context.fillStyle = this.colorOption;
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.beginPath();
        this.context.roundRect(this.x, this.y, this.width, this.height,40);
        this.context.fill()

        this.context.fillStyle = this.supportOption;
        // this.context.fillRect(this.x+25, this.y+25, this.width-50, this.height-50);
        this.context.beginPath();
        this.context.roundRect(this.x+10, this.y+10, this.width-20, this.height-20,30);
        this.context.fill()

        this.context.font = this.fontsize +'px Arial';
        this.context.fillStyle = this.textColor;
        this.context.fillText(this.text,this.x+this.width/2-10-(this.text.length*10),this.y+this.height/2+15);
        
        this.context.fillStyle = '#fffbeb'
        this.context.beginPath();
        this.context.arc(this.x+this.width/2, this.y+this.height/2, 30, 0, Math.PI * 2 * (this.innerbuffer)/100);
        this.context.fill();
    }
}
