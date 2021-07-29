class ModelGame {
    constructor(num_room, block, name) {
        this.name = name;
        this.num_player = 0;
        this.main_block = block;
        this.field = new Field();
        this.ref = firebase.database().ref("rooms/" + num_room);
    }

    initBlocks() {
        for (let i = 0; i < this.field.players.length; ++i) {
            let player = this.field.players[i];
            if (this.name === player.name) {
                continue;
            }
            this.main_block.appendChild(this.createOpponentBlock(player, i));
        }
        this.main_block.appendChild(this.createNotBelongPlayersBlock());
        let player = this.field.players[this.num_player];
        this.main_block.appendChild(this.createPlayerBlock(player));
    }

    createNotBelongPlayersBlock() {
        let block = document.createElement('div');
        block.className = "not-belong-players-block";
        let discard_pile = this.createDiscardPile();
        let card_in_fight = this.createCardsInFight();
        let deck = this.createDeck();
        block.appendChild(discard_pile);
        block.appendChild(card_in_fight);
        block.appendChild(deck);
        return block;
    }

    createDiscardPile() {
        let block = document.createElement('div');
        block.className = "discard-pile-block";
        if (this.field.discard_pile.length > 0) {
            let img = document.createElement('img');
            img.className = "img-card";
            img.alt = "";
            block.appendChild(img);
        }
        return block;
    }

    createCardsInFight() {
        let block = document.createElement('div');
        block.className = "cards-in-fight";
        let top_i = this.field.cards_in_fight.length - 1;
        if (top_i > -1) {
            let img = document.createElement('img');
            img.src = this.field.cards_in_fight[top_i].image_path;
            img.className = "img-card";
            img.alt = "";
            block.appendChild(img);
        }
        return block;
    }

    createDeck() {
        let block = document.createElement('div');
        block.className = "deck-block";
        let img = document.createElement('img');
        img.src = ModelGameEnum.CARD_SHIRT_PATH;
        img.className = "img-card";
        img.alt = "";
        let p = document.createElement('p');
        p.className = "num-deck";
        p.innerText = String(this.field.deck.length);
        block.appendChild(img);
        block.appendChild(p);
        return block;
    }

    createOpponentBlock(player, index) {
        let block = document.createElement('div');
        block.className = "player-block";
        block.id = this.genBlockId(player.name, index);
        let player_name_block = this.createPlayerNameBlock(player.name);
        let in_hand_block = this.createOpponentInHandBlock(player.cards_in_hand.length);
        let on_table_block = this.createCardsOpponentOnTable(player.cards_on_table);
        block.appendChild(player_name_block);
        block.appendChild(in_hand_block);
        block.appendChild(on_table_block);
        return block;
    }

    createPlayerBlock(player) {
        let block = document.createElement('div');
        block.className = "player-block";
        block.id = this.genBlockId(player.name, this.num_player);
        let on_table_block = this.createCardsOnTable(player.cards_on_table);
        let in_hand_block = this.createCardsInHandBlock(player.cards_in_hand);
        let player_name_block = this.createPlayerNameBlock(player.name);
        block.appendChild(on_table_block);
        block.appendChild(in_hand_block);
        block.appendChild(player_name_block);
        return block;
    }

    createOpponentInHandBlock(cards_length) {
        let block = document.createElement("div")
        block.className = "cards-in-hand-opponent-block";
        for (let i = 0; i < cards_length; ++i) {
            let img = document.createElement('img');
            img.className = "img-card-in-hand-opponent";
            img.src = ModelGameEnum.CARD_SHIRT_PATH;
            img.alt = "";
            block.appendChild(img);
        }
        return block;
    }

    createCardsOpponentOnTable(cards) {
        let block = document.createElement("div")
        block.className = "cards-on-table-block";
        for (let i = 0; i < cards.length; ++i) {
            let last = cards[i].length - 1;
            let img = document.createElement('img');
            img.className = "img-card";
            img.src = cards[i][last].image_path;
            img.alt = "";
            block.appendChild(img);
        }
        return block;
    }

    createCardsOnTable(cards) {
        let block = document.createElement("div")
        block.className = "cards-on-table-block";
        for (let i = 0; i < cards.length; ++i) {
            let last = cards[i].length - 1;
            let img = document.createElement('img');
            img.className = "img-card";
            img.src = cards[i][last].image_path;
            img.alt = String(i);
            img.addEventListener('click', function () {
                console.log(img.alt + ' ' + cards[i][last].name);
            })
            block.appendChild(img);
        }
        return block;
    }

    createCardsInHandBlock(cards) {
        let block = document.createElement("div")
        block.className = "cards-in-hand-block";
        for (let i = 0; i < cards.length; ++i) {
            let img = document.createElement('img');
            img.className = "img-card";
            img.src = cards[i].image_path;
            img.alt = String(i);
            img.addEventListener("click", function () {
                console.log(img.alt + ' ' + cards[i].name);
            });
            block.appendChild(img);
        }
        return block;
    }

    createPlayerNameBlock(name) {
        let block = document.createElement('div');
        block.className = "player-name-block";
        let p = document.createElement('p');
        p.className = "player-name-text";
        p.innerText = name;
        block.appendChild(p);
        return block;
    }

    genBlockId(player_name, player_index) {
        return "id" + player_name + player_index;
    }
}

class ModelGameHost extends ModelGame {

    constructor(num_room, block, name) {
        super(num_room, block, name);
        //this.num_room = num_room;
        this.waitUsers();
    }

    waitUsers() {
        let cur_class = this;
        let val_changed = this.ref.on('value', function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val().cur_num === snapshot.val().max_num) {
                cur_class.ref.off('value', val_changed);
                console.log("wait users", snapshot.val().users);
                cur_class.init(snapshot.val().users);
            }
        });
    }

    init(names) {
        this.field.init(names);
        this.initBlocks();
        this.sendDeck();
    }

    sendDeck() {
        //let cur_class = this;
        for (let i = 0; i < this.field.players.length; ++i) {
            let cards_in_hand = [];
            for (let j = 0; j < this.field.players[i].cards_in_hand.length; ++j) {
                cards_in_hand.push(this.field.players[i].cards_in_hand[j].name);
            }
            let cards_on_table = [];
            for (let j = 0; j < this.field.players[i].cards_on_table.length; ++j) {
                let tmp = []
                tmp.push(this.field.players[i].cards_on_table[j][0].name);
                tmp.push(this.field.players[i].cards_on_table[j][1].name);
                cards_on_table.push(tmp);
            }
            this.ref.child("user_cards/" + i).set({
                cards_in_hand,
                cards_on_table
            });
        }
    }
}

class ModelGameClient extends ModelGame {

    constructor(num_room, block, name) {
        super(num_room, block, name);
        //this.num_room = num_room;
        this.field = new Field();
        this.ref = firebase.database().ref("rooms/" + num_room);
        this.waitUsers();
    }

    waitUsers() {
        let cur_class = this;
        let val_changed = this.ref.on('value', function (snapshot) {
            //console.log(snapshot.val());
            if (snapshot.val().cur_num === snapshot.val().max_num) {
                cur_class.ref.off('value', val_changed);
                let users = snapshot.val().users;
                cur_class.field.setPlayers(users);
                for (let i = 0; i < users.length; ++i) {
                    if (cur_class.name === users[i]) {
                        cur_class.num_player = i;
                        break;
                    }
                }
                cur_class.getDeck();
            }
        });
    }

    getDeck() {
        let cur_class = this;
        let val_changed = this.ref.on('value', function (snapshot) {
            //console.log(snapshot.val());
            let data = snapshot.val();
            let l_index = cur_class.field.players.length - 1;
            if (data.user_cards !== undefined && data.user_cards[l_index] !== undefined) {
                console.log("getDeck if");
                cur_class.ref.off('value', val_changed);
                cur_class.field.setPlayersCards(data.user_cards);
                cur_class.initBlocks();
            }
        });
    }
}

const ModelGameEnum = {
    CARD_SHIRT_PATH: "assets/playing_cards/card_shirt.png"
};