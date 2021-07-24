class Draw {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    drawBackground() {}

    drawRound(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius,  0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }

    drawRoundedButton(button) {
        //this.context.strokeStyle = "#000000"
        this.context.fillStyle = "#FFFFFF"
        let x = button.x;
        let y = button.y;
        let radius = button.radius;
        let width = button.width;
        let height = button.height;
        let text = button.text;
        this.drawRound(x, y + radius, radius);
        this.context.fillRect(x, y, width, height);
        this.drawRound(x + width, y + radius, radius);
        this.context.fillStyle = "#000";
        this.context.textAlign = "center";
        this.context.fillText(text, x  + width / 2, y + radius + 3);
    }

    drawRoundButton(button) {
        let radius = button.radius;
        this.context.fillStyle = "#FFF";
        let x = button.x;
        let y = button.y + radius;
        this.drawRound(x, y, radius);
        this.context.fillStyle = "#000";
        this.context.textAlign = "center";
        this.context.fillText(button.text, x, y + 3);
    }
}

class DrawMenu extends Draw {

    constructor(canvas) {
        super(canvas);
    }

    drawBackground() {
        super.drawBackground();
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawHeader(header) {
        this.context.strokeStyle = "#FFF000";
        this.context.textAlign = "center";
        this.context.strokeText(header.text, header.x + header.width / 2, header.y, header.width);
        //this.context.fillText(header.text, header.x, header.y, header.width);
    }
}

class DrawListRooms extends Draw {
    constructor(canvas) {
        super(canvas);
    }

    drawBackground() {
        super.drawBackground();
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRowText(array, x, y) {
        this.context.fillStyle = "#FFF";
        this.context.fillText(array.host, x, y);
        this.context.fillText(array.num_users, x + x, y);
    }

    drawRow(array, x, y, button) {
        this.drawRowText(array, x, y);
        this.drawRoundButton(button);
    }
}