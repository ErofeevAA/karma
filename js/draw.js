let blob = new Image();
blob.src = 'assets/playing_cards/blob.png';

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
        this.context.fillStyle = "rgb(0,0,0,1)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = "rgb(255,172,65,0.5)";
        this.context.fillStyle = "rgb(32,32,32)"
        this.context.beginPath();
        this.context.moveTo(30, 110);
        this.context.lineTo(400, 110);
        this.context.lineTo(400, 400);
        this.context.lineTo(30, 400);
        this.context.closePath();
        this.context.fill();
        this.context.drawImage(blob, 120, 30, 320, 320);
    }

    drawHeader(header) {
        this.context.strokeStyle = "#FFAC41";
        this.context.font = "italic 40pt Arial";
        this.context.strokeText(header.text, 30, 80);
    }

    drawTextButton(button) {
        let x = button.x;
        let y = button.y;
        let text = button.text;
        this.context.strokeStyle = "rgb(255,172,65,0.5)";
        this.context.stroke();
        this.context.font = `italic ${button.pt}pt Arial`;
        button.setSize(this.context.measureText(text).width);
        this.context.fillStyle = "#FF1E56";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(text, x, y);
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