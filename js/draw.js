let blob = new Image();
blob.src = 'assets/playing_cards/blob.png';

class Draw {
    constructor(game) {
        this.game = game;
    }

    drawBackground() {}
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
    }
}