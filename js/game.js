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
    console.log("player name: " + g_player_name);
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
        btn.addEventListener('click', function () {
            g_num_room = g_model.table[i].num_room;
            console.log("chosen room: ", g_num_room);
            g_model.getRooms(callBackChooseRoom);
        });

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(btn);
        g_block.appendChild(row);
    }
    let create_room = document.createElement('button');
    create_room.className = g_model.btn_create_room.class_name;
    create_room.innerText = g_model.btn_create_room.text;
    create_room.addEventListener('click', function () {
        g_model.getRooms(callbackCreateRoom);
    });
    g_block.appendChild(create_room);
    g_game_div.appendChild(g_block);

    let update = initButton(new TextBlock("Обновить", "text-button"), multiplayer);
    g_block.appendChild(update);
    let back = initButton(new TextBlock("Назад", "text-button"), menu);
    g_block.appendChild(back);
}

function callBackChooseRoom() {
    if (g_model.list_rooms[g_num_room]) {
        g_model.connectToRoom(g_num_room, g_player_name);
        g_model = new ModelGameClient(g_num_room);
        netGame();
        return;
    }
    multiplayer();
}

function callbackCreateRoom() {
    g_num_room = g_model.findFreeNum();
    g_model.createRoom(g_num_room, g_player_name, 2);
    g_model = new ModelGameHost(g_num_room);
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
    let draw_train = new DrawTrain(g_canvas);
    draw_train.drawTrain();
    g_game_div.removeChild(g_block);
    g_block = document.createElement('div');
    g_block.className = "train-block";
    g_model = new ModelTrain();

    let deck = initText(g_model.deck);
    let distribution = initText(g_model.distribution);
    let distribution_text = initText(g_model.distribution_text);
    let game_train = initText(g_model.game_train);
    let game_text1 = initText(g_model.game_text1);
    let game_text2 = initText(g_model.game_text2);
    let end_train = initText(g_model.end_train);
    let end_text = initText(g_model.end_text);
    let karma_cards = initText(g_model.karma_cards);
    let karma_cards_text = initText(g_model.karma_cards_text);
    let give_a_stack_to_a_friend = initText(g_model.give_a_stack_to_a_friend);
    let give_a_stack_to_a_friend_text = initText(g_model.give_a_stack_to_a_friend_text);
    let play_a_card_from_the_table = initText(g_model.play_a_card_from_the_table);
    let play_a_card_from_the_table_text = initText(g_model.play_a_card_from_the_table_text);
    let from_bottom_to_top = initText(g_model.from_bottom_to_top);
    let from_bottom_to_top_text = initText(g_model.from_bottom_to_top_text);
    let five_or_less = initText(g_model.five_or_less);
    let five_or_less_text = initText(g_model.five_or_less_text);

    let b_menu = initButton(g_model.btn_menu, menu);

    let rules_block = document.createElement('div');
    rules_block.className = 'rules-block';

    rules_block.appendChild(deck);
    rules_block.appendChild(distribution);
    rules_block.appendChild(distribution_text);
    rules_block.appendChild(game_train);
    rules_block.appendChild(game_text1);
    rules_block.appendChild(game_text2);
    rules_block.appendChild(end_train);
    rules_block.appendChild(end_text);
    rules_block.appendChild(karma_cards);
    rules_block.appendChild(karma_cards_text);
    rules_block.appendChild(give_a_stack_to_a_friend);
    rules_block.appendChild(give_a_stack_to_a_friend_text);
    rules_block.appendChild(play_a_card_from_the_table);
    rules_block.appendChild(play_a_card_from_the_table_text);
    rules_block.appendChild(from_bottom_to_top);
    rules_block.appendChild(from_bottom_to_top_text);
    rules_block.appendChild(five_or_less);
    rules_block.appendChild(five_or_less_text);

    g_block.appendChild(rules_block);
    g_block.appendChild(b_menu);
    g_game_div.appendChild(g_block);
}

function about() {
    let draw_about = new DrawAbout(g_canvas);
    draw_about.drawAbout();
    g_game_div.removeChild(g_block);
    g_block = document.createElement('div');
    g_block.className = "about-block";
    g_model = new ModelAbout();
    g_game_div.appendChild(g_block);

    let contributors = initText(g_model.contributors);
    let contributor1 = initText(g_model.contributor1);
    let contributor2 = initText(g_model.contributor2);
    let information = initText(g_model.information);

    let b_menu = initButton(g_model.btn_menu, menu);

    g_block.appendChild(contributors);
    g_block.appendChild(contributor1);
    g_block.appendChild(contributor2);
    g_block.appendChild(information);
    g_block.appendChild(b_menu);
}

function initText(text_block) {
    let elem = document.createElement('p');
    elem.className = text_block.class_name;
    elem.innerText = text_block.text;
    return elem;
}

function initButton(block, callback) {
    let button = document.createElement("button");
    button.className = block.class_name;
    button.innerText = block.text;
    button.addEventListener('click', function () {
        callback();
    });
    return button;
}

function create_col(tag, className, text) {
    let col = document.createElement(tag);
    col.className = className;
    col.innerText = text;
    return col;
}