let g_canvas;
let g_model;
let g_draw;

function init() {
    g_canvas = document.getElementById("canvas");
    g_canvas.onclick = onClick;
    menu();
}

function onClick(event) {
    let x = subtractMargin(event.x);
    let y = subtractMargin(event.y);
    console.log(x + ' ' + y);
    g_model.onClick(x, y);
}

function subtractMargin(val) {
    let MARGIN = 10;
    return val - MARGIN;
}

function menu() {
    g_model = new ModelMenu(g_canvas.width);
    g_model.btn_multiplayer.func_click = multiplayer;
    g_model.btn_single.func_click = single_play;
    g_model.btn_train.func_click = train;
    g_model.btn_about.func_click = about;
    g_draw = new DrawMenu(g_canvas);
    g_draw.drawBackground();
    g_draw.drawHeader(g_model.header);
    g_draw.drawTextButton(g_model.btn_multiplayer);
    g_draw.drawTextButton(g_model.btn_single);
    g_draw.drawTextButton(g_model.btn_train);
    g_draw.drawTextButton(g_model.btn_about);
}

function multiplayer() {
    console.log("multiplayer");
    g_draw = new DrawListRooms(g_canvas);
    g_draw.drawBackground();
    g_model = new ModelListRooms(g_canvas.width);
    g_model.callbackGetRooms = callbackGetRooms;
    g_model.getRooms();
}

function callbackGetRooms() {
    console.log("callbackGetRooms");
    g_draw.drawRowText(g_model.table[0], g_model.column_width / 2, 10);
    for (let i = 1; i < g_model.table.length; ++i) {
        g_draw.drawRow(g_model.table[i], g_model.column_width / 2, g_model.countRowY(i), g_model.buttons_connect[i - 1]);
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