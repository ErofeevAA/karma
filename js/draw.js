let blob = new Image();
blob.src = 'assets/playing_cards/blob.png';
let sea = new Image();
sea.src = 'assets/background.jpg';

class Draw {
    constructor(canvas_menu) {
        this.context = canvas_menu.getContext("2d");
    }
    drawBackground() {}
}

class DrawMenu extends Draw {
    constructor(canvas_menu) {
        super(canvas_menu);
    }

    drawBackground() {
        super.drawBackground();
        this.context.globalAlpha = 0.2;
        this.context.drawImage(sea, 0, 0, 1340, 600);
        this.context.globalAlpha = 0.5;
        this.context.drawImage(blob, 620, 340, 120, 120);
    }
}