let canvas;

function init() {
    canvas = document.getElementById("canvas");
    canvas.onclick = onClick;
    let draw_menu = new DrawMenu(canvas);
    let model = new ModelMenu(canvas.width);
    draw_menu.drawBackground();
    draw_menu.drawHeader(model.header);
    draw_menu.drawButton(model.btn_multiplayer);
    draw_menu.drawButton(model.btn_single);
    draw_menu.drawButton(model.btn_train);
    draw_menu.drawButton(model.btn_about);
}

function onClick(event) {
    let MARGIN = 8;
    let x = event.x - MARGIN;
    let y = event.y - MARGIN;
    console.log(x + ' ' + y);
}
