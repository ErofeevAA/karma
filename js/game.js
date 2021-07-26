let g_canvas;
let g_model;
let g_player_name;
let g_game_div;
let g_block;
let g_num_room;

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
        g_canvas = document.getElementById("canvas_background");
        g_game_div = document.createElement('div');
        g_game_div.id = "game";
        g_body.appendChild(g_game_div);
        menu();
    }
}

function menu() {
    let draw_menu = new DrawMenu(g_canvas);
    draw_menu.drawBackground();
    g_model = new ModelMenu();
    if (g_block !== undefined) {
        g_game_div.removeChild(g_block);
    }
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
    g_model.getRooms(callbackOutputRooms);
}

function callbackOutputRooms() {
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
            g_num_room = g_model.table[i].num_room
            clickChooseRoom();
        });

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(btn);
        g_block.appendChild(row);
    }
    let create_room = document.createElement('button');
    create_room.className = g_model.btn_create_room.class_name;
    create_room.innerText = g_model.btn_create_room.text;
    create_room.addEventListener('click', function (e) {
        g_model.getRooms(callbackCreateRoom);
    });
    g_block.appendChild(create_room);
    g_game_div.appendChild(g_block);

    let update = initButton(new TextBlock("Обновить", "text-button"), multiplayer);
    g_block.appendChild(update);
    let back = initButton(new TextBlock("Назад", "text-button"), menu);
    g_block.appendChild(back);
}

function create_col(tag, className, text) {
    let col = document.createElement(tag);
    col.className = className;
    col.innerText = text;
    return col;
}

function clickChooseRoom() {
    console.log(g_num_room);
    g_model.getRooms(callBackChooseRoom);

}

function callBackChooseRoom() {
    if (g_model.list_rooms[g_num_room]) {
        g_model.connectToRoom(g_num_room, g_player_name);
        netGame();
        return;
    }
    multiplayer();
}

function callbackCreateRoom() {
    g_num_room = g_model.findFreeNum();
    g_model.createRoom(g_num_room, g_player_name, 2);
    netGame();
}

function netGame() {
    g_game_div.removeChild(g_block);
    g_block = document.createElement('div');
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