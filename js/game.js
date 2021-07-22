let canvas;
let model;

function init() {
    canvas = document.getElementById("canvas");
    menu();
}

function onClickMenu(event) {
    let x = subtractMargin(event.x);
    let y = subtractMargin(event.y);
    console.log(x + ' ' + y);
    model.onClick(x, y);
}

function subtractMargin(val) {
    let MARGIN = 8;
    return val - MARGIN;
}

function menu() {
    let draw_menu = new DrawMenu(canvas);
    model = new ModelMenu(canvas.width);
    model.btn_multiplayer.func_click = multiplayer;
    draw_menu.drawBackground();
    draw_menu.drawHeader(model.header);
    draw_menu.drawButton(model.btn_multiplayer);
    draw_menu.drawButton(model.btn_single);
    draw_menu.drawButton(model.btn_train);
    draw_menu.drawButton(model.btn_about);
    canvas.onclick = onClickMenu;
}

function multiplayer() {
    console.log("multiplayer");
}


