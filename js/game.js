let canvas;
let model;
let draw;

function init() {
    canvas = document.getElementById("canvas");
    canvas.onclick = onClick;
    menu();
}

function onClick(event) {
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
    model = new ModelMenu(canvas.width);
    model.btn_multiplayer.func_click = multiplayer;
    model.btn_single.func_click = single_play;
    model.btn_train.func_click = train;
    model.btn_about.func_click = about;
    draw = new DrawMenu(canvas);
    draw.drawBackground();
    draw.drawHeader(model.header);
    draw.drawRoundedButton(model.btn_multiplayer);
    draw.drawRoundedButton(model.btn_single);
    draw.drawRoundedButton(model.btn_train);
    draw.drawRoundedButton(model.btn_about);
}

function multiplayer() {
    console.log("multiplayer");
    draw = new DrawListRooms(canvas);
    draw.drawBackground();
    model = new ModelListRooms(canvas.width);
    model.callbackGetRooms = callbackGetRooms;
    model.getRooms();
}

function callbackGetRooms() {
    console.log("callbackGetRooms");
    draw.drawRowText(model.table[0], model.column_width / 2, 10);
    for (let i = 1; i < model.table.length; ++i) {
        draw.drawRow(model.table[i], model.column_width / 2, 25 + i * 10, model.buttons_connect[i - 1]);
    }
}

function single_play() {
    console.log("single play");
}

function train() {
    console.log("train");
}

function about() {
    console.log("about");
}