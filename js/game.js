//let g_canvas;
let g_model;
let g_player_name;
let g_game_div;
let g_block;

let g_body = document.getElementById("body");


document.getElementById("input-name").addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        start();
    }
});

function start() {
    g_player_name = document.getElementById("name").value.replace(/[^\d^A-Za-z]/g, '');
    console.log(g_player_name);
    if (g_player_name) {
        g_body.removeChild(document.getElementById("input-name"));
        //g_canvas = document.getElementById("canvas_background");
        g_game_div = document.createElement('div');
        g_game_div.id = "game";
        g_body.appendChild(g_game_div);
        menu();
    }

}

function menu() {
    g_model = new ModelMenu();
    g_block = document.createElement('div');
    g_block.className = "menu-block";
    g_game_div.appendChild(g_block);

    let header = document.createElement('p');
    header.className = g_model.header.class_name;
    header.innerText = g_model.header.text;

    let b_multiplayer = initButton(g_model.btn_multiplayer, multiplayer);
    let b_single = initButton(g_model.btn_single, single_play);
    let b_train = initButton(g_model.btn_train, train);
    let b_about = initButton(g_model.btn_about, about);

    g_block.appendChild(header);
    g_block.appendChild(b_multiplayer);
    g_block.appendChild(b_single);
    g_block.appendChild(b_train);
    g_block.appendChild(b_about);
}

function initButton(button_class_param, callback) {
    let button = document.createElement("button");
    button.className = button_class_param.class_name;
    button.innerText = button_class_param.text;
    button.addEventListener('click', function (e) {
        callback();
    });
    return button;
}

function multiplayer() {
    console.log("multiplayer");
    g_game_div.removeChild(g_block);
    g_block = document.createElement('div');
    g_block.className = "list-rooms-block";
    g_model = new ModelListRooms();
    g_model.callbackGetRooms = callbackGetRooms;
    g_model.callbackClickRoom = callbackClickRoom;
    g_model.getRooms();
}

function callbackGetRooms() {
    console.log("callbackGetRooms");

    let row = document.createElement('div');
    row.className = "list-rooms-row";
    let col1 = create_col('p', "col-head", g_model.table[0].host);
    let col2 = create_col('p', "col-head", g_model.table[0].num_users);

    row.appendChild(col1);
    row.appendChild(col2);
    g_block.appendChild(row);

    for (let i = 1; i < g_model.table.length; ++i) {
        let row = document.createElement('div');
        row.className = "list-rooms-row";

        let col1 = create_col('p', "col-row", g_model.table[i].host);
        let col2 = create_col('p', "col-row", g_model.table[i].num_users);

        let btn = create_col('button', "", g_model.table[i].button.text);
        btn.addEventListener('click', function (e) {
            callbackClickRoom(g_model.table[i].num_room);
        });

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(btn);
        g_block.appendChild(row);
    }
    g_game_div.appendChild(g_block);
}

function create_col(tag, className, text) {
    let col = document.createElement(tag);
    col.className = className;
    col.innerText = text;
    return col;
}

function callbackClickRoom(index) {
    console.log(index);
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