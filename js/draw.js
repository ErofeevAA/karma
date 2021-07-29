let blob = new Image();
blob.src = 'assets/playing_cards/blob.png';
let sea = new Image();
sea.src = 'assets/background.jpg';
let five_or_less = new Image();
five_or_less.src = 'assets/playing_cards/karma_cards/five_or_less.png';
let from_bottom_to_top = new Image();
from_bottom_to_top.src = 'assets/playing_cards/karma_cards/from_bottom_to_top.png';
let give_a_stack = new Image();
give_a_stack.src = 'assets/playing_cards/karma_cards/give_a_stack.png';
let play_a_card_from_the_table = new Image();
play_a_card_from_the_table.src = 'assets/playing_cards/karma_cards/play_a_card_from_the_table.png';
let card_8 = new Image();
card_8.src = 'assets/playing_cards/number_cards/8.png';
let card_shirt = new Image();
card_shirt.src = 'assets/playing_cards/card_shirt.png';

class Draw {
    constructor(canvas_menu) {
        canvas_menu.setAttribute('height', 600);
        this.context = canvas_menu.getContext("2d");
    }
    drawBackground() {}
    drawAbout() {}
    drawTrain() {}
    drawParameters() {}
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
        this.context.drawImage(blob, 620, 360, 120, 120);
    }
}

class DrawAbout extends Draw {
    constructor(canvas_about) {
        super(canvas_about);
    }

    drawAbout() {
        super.drawAbout();
        this.context.globalAlpha = 0.2;
        this.context.drawImage(sea, 0, 0, 1340, 600);
        this.context.globalAlpha = 0.6;
        this.context.fillStyle = '#0B0C10';
        this.context.fillRect(300, 100, 650, 400);
    }
}

class DrawTrain extends Draw {
    constructor(canvas_train) {
        super(canvas_train);
    }

    drawTrain() {
        super.drawTrain();
        this.context.globalAlpha = 0.2;
        this.context.drawImage(sea, 0, 0, 1340, 600);
        this.context.globalAlpha = 1;
        this.context.drawImage(card_8, 80, 50, 100, 100);
        this.context.drawImage(give_a_stack, 80, 250, 100, 100);
        this.context.drawImage(play_a_card_from_the_table, 80, 450, 100, 100);
        this.context.drawImage(card_shirt, 1180, 50, 100, 100);
        this.context.drawImage(from_bottom_to_top, 1180, 250, 100, 100);
        this.context.drawImage(five_or_less, 1180, 450, 100, 100);
    }
}

class DrawParameters extends Draw {
    constructor(canvas_about) {
        super(canvas_about);
    }

    drawParameters() {
        super.drawAbout();
        this.context.globalAlpha = 0.2;
        this.context.drawImage(sea, 0, 0, 1340, 600);
        this.context.globalAlpha = 0.6;
        this.context.fillStyle = '#0B0C10';
        this.context.fillRect(300, 200, 650, 300);
    }
}