export default class CoreComponent {
    constructor(context, x, y) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.isColliding = false;
        this.isSelected = false;
    }
};
