class Draw {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    drawBackground() {}
}

class DrawMenu extends Draw {

    constructor(canvas) {
        super(canvas);
    }

    drawBackground() {
        super.drawBackground();
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawHeader(header) {
        this.context.strokeStyle = "#FFF000";
        this.context.textAlign = "center";
        this.context.strokeText(header.text, header.x + header.width / 2, header.y, header.width);
        //this.context.fillText(header.text, header.x, header.y, header.width);
    }

    drawButton(button) {
        //this.context.strokeStyle = "#000000"
        this.context.fillStyle = "#FFFFFF"
        let x = button.x;
        let y = button.y;
        let radius = button.radius;
        let width = button.width;
        let height = button.height;
        let text = button.text;
        this.context.beginPath();
        this.context.arc(x, y + radius, radius,  0, 2 *Math.PI);
        this.context.closePath();
        this.context.fill();
        this.context.fillRect(x, y, width, height);
        this.context.beginPath();
        this.context.arc(x + width, y + radius, radius,  0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
        this.context.fillStyle = "#000";
        this.context.textAlign = "center";
        this.context.fillText(text, x  + width / 2, y + radius + 3);
    }

}