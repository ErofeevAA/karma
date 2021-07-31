class ModelGame {
    constructor(num_room, block, name, callback) {
        this.callback = callback;
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
        this.waitMove();
    }

    createNotBelongPlayersBlock() {
        let block = document.createElement('div');
        block.className = "not-belong-players-block";
        let discard_pile = this.createDiscardPile();
        let card_in_fight = this.createCardsInFight();
        let karma_in_fight = this.createKarmaCardsInFight();
        let deck = this.createDeck();
        block.appendChild(discard_pile);
        block.appendChild(card_in_fight);
        block.appendChild(karma_in_fight);
        block.appendChild(deck);
        return block;
    }

    createDiscardPile() {
        let block = document.createElement('div');
        block.className = "discard-pile-block";
        block.id = "discard-pile-block";
        return block;
    }

    createCardsInFight() {
        let block = document.createElement('div');
        block.className = "cards-in-fight-block";
        block.id = "cards-in-fight-block";
        return block;
    }

    createKarmaCardsInFight() {
        let block = document.createElement('div');
        block.className = "karma-cards-in-fight-block";
        block.id = "karma-cards-in-fight-block";
        return block;
    }

    createDeck() {
        let block = document.createElement('div');
        block.className = "deck-block";
        block.id = "deck-block";
        let img = document.createElement('img');
        img.src = ModelGameEnum.CARD_SHIRT_PATH;
        img.className = "img-card";
        img.alt = "";
        let p = document.createElement('p');
        p.className = "num-deck";
        p.id = "num-deck";
        p.innerText = String(this.field.deck.length);
        block.appendChild(img);
        block.appendChild(p);
        return block;
    }

    createOpponentBlock(player, index) {
        let block = document.createElement('div');
        block.className = "player-block";
        //block.id = this.genBlockId(player.name, index);
        let player_name_block = this.createPlayerNameBlock(player.name, index);
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
        //block.id = "player-block";
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
        /*let img = document.createElement('img');
        img.className = "img-card-in-hand-opponent";
        img.src = ModelGameEnum.CARD_SHIRT_PATH;
        img.alt = "";
        block.appendChild(img);*/
        let p = document.createElement('p');
        p.className = "num-cards-hand-opponent";
        p.id = "num-cards-hand-opponent";
        p.innerText = "Число карт: " + cards_length;
        block.appendChild(p);
        return block;
    }

    createCardsOpponentOnTable(cards) {
        let block = document.createElement("div")
        block.className = "cards-on-table-block";
        block.id = "cards-on-table-opponent-block";
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
        let cur_class = this;
        let block = document.createElement("div")
        block.className = "cards-on-table-block";
        block.id = "cards-on-table-block";
        for (let i = 0; i < cards.length; ++i) {
            let last = cards[i].length - 1;
            let img = document.createElement('img');
            img.className = "img-card";
            img.src = cards[i][last].image_path;
            img.alt = String(i);
            block.appendChild(img);
        }
        return block;
    }

    createCardsInHandBlock(cards) {
        let block = document.createElement("div")
        block.className = "cards-in-hand-block";
        block.id = "cards-in-hand-block";
        for (let i = 0; i < cards.length; ++i) {
            this.appendImgCardToHand(block, cards[i], i);
        }
        return block;
    }

    createPlayerNameBlock(name, index=this.num_player) {
        let block = document.createElement('div');
        block.className = "player-name-block";
        block.id = "player-name-block" + index;
        if (index === this.field.num_attacker) {
            block.style.borderColor = ModelGameEnum.COLOR_ATTACK;
        }
        if (index === this.num_player) {
            let cur_class = this;
            block.addEventListener('click', function () {
                if (cur_class.field.players[cur_class.num_player].state === PlayerState.ATTACKER &&
                cur_class.field.cards_in_fight.length !== 0) {
                    console.log("Взяяяяять");
                    cur_class.sendMove(ModelGameEnum.ABANDON);
                    cur_class.field.abandonCards(cur_class.num_player);
                    cur_class.updateCardsInFightBlock();
                    cur_class.updateInHand();
                    cur_class.updateDeck();
                    cur_class.updateBordersColor();
                    cur_class.updateKarmaCardsInFightBlock();
                    for (let i = 0; i < cur_class.field.players.length; ++i) {
                        if (cur_class.num_player !== i) {
                            cur_class.updateNumOpponentCards(i);
                        }
                    }
                }
            });
        }
        let p = document.createElement('p');
        p.className = "player-name-text";
        p.innerText = name;
        block.appendChild(p);
        return block;
    }

    appendImgCardToHand(block, card, index) {
        let img = document.createElement('img');
        img.className = "img-card";
        img.src = card.image_path;
        img.alt = String(index);
        let cur_class = this;
        img.addEventListener("click", function () {
            cur_class.eventClickCardInHand(img, card, block);
        });
        block.appendChild(img);
    }

    /*genBlockId(player_name, player_index) {
        return "id" + player_name + player_index;
    }*/

    updateCardsInFightBlock() {
        let block = document.getElementById("cards-in-fight-block");
        if (block.childNodes.length > 0) {
            let img = block.getElementsByClassName("img-card")[0];
            block.removeChild(img);
        }
        let i = this.field.cards_in_fight.length - 1;
        if (i > -1) {
            let img = document.createElement('img');
            img.src = this.field.cards_in_fight[i].image_path;
            img.className = "img-card";
            img.alt = "";
            block.appendChild(img);
        }
    }

    updateKarmaCardsInFightBlock() {
        let block = document.getElementById("karma-cards-in-fight-block");
        if (block.childNodes.length > 0) {
            let img = block.getElementsByClassName("img-card")[0];
            block.removeChild(img);
        }
        if (this.field.karma_in_game !== undefined) {
            let img = document.createElement('img');
            img.className = "img-card";
            img.src = this.field.karma_in_game.image_path;
            img.alt = "";
            block.appendChild(img);
        }
    }

    updateDeck() {
        let num = document.getElementById("num-deck");
        num.innerText = String(this.field.deck.length);
        if (this.field.deck.length === 0) {
            let block = document.getElementById("deck-block");
            let img = block.getElementsByClassName("img-card")[0];
            if (img instanceof Node) {
                block.removeChild(img);
            }
        }
    }

    updateInHand() {
        let block = document.getElementById("cards-in-hand-block");
        let nodes = block.getElementsByClassName("img-card");
        //console.log("nodes cards-in-hands");
        //console.log(nodes);
        for (let i = 0; i < nodes.length; ++i) {
            if (nodes[i].alt !== i) {
                nodes[i].alt = String(i);
            }
        }
        let cards = this.field.players[this.num_player].cards_in_hand;
        for (let i = nodes.length; i < cards.length; ++i) {
            this.appendImgCardToHand(block, cards[i], i);
        }
    }

    updateNumOpponentCards(num) {
        let p = document.getElementById("num-cards-hand-opponent");
        p.innerText = "Число карт: " + this.field.players[num].cards_in_hand.length;
    }

    updateBordersColor() {
        for (let i = 0; i < this.field.players.length; ++i) {
            let block = document.getElementById("player-name-block" + i);
            if (this.field.players[i].state === PlayerState.ATTACKER) {
                block.style.borderColor = ModelGameEnum.COLOR_ATTACK;
                continue;
            }
            block.style.borderColor = ModelGameEnum.COLOR_NOT_ATTACK;
        }
    }

    updateDiscardPile() {
        let block = document.getElementById("discard-pile-block");
        if (this.field.discard_pile && block.getElementsByClassName('img-card')[0] === undefined) {
            let img = document.createElement('img');
            img.className = "img-card";
            img.alt = "";
            block.appendChild(img);
        }
    }

    updateCardFromTable() {
        let block = document.getElementById("cards-on-table-block");
        if (!block.firstChild) {
            return;
        }
        for (let j = 0; j < 2; ++j) {
            if (this.num_player === j && this.field.players[j].cards_on_table.length === 0) {
                for (let i = 0; i < 3; ++i) {
                    let node = block.firstChild;
                    block.removeChild(node);
                }
            }
        }
    }

    updateCardOpponentFromTable() {
        let block = document.getElementById("cards-on-table-opponent-block");
        if (!block.firstChild) {
            return;
        }
        for (let j = 0; j < 2; ++j) {
            if (this.num_player !== j && this.field.players[j].cards_on_table.length === 0) {
                for (let i = 0; i < 3; ++i) {
                    let node = block.firstChild;
                    block.removeChild(node);
                }
            }
        }
    }

    chosenCardFromHand(index) {
        if (this.field.players[this.num_player].state === PlayerState.DEFENDER) {
            return false;
        }
        let card = this.field.players[this.num_player].cards_in_hand[index];
        if (this.field.karma_in_game !== undefined && card.name !== CardsEnum.GIVE_STACK) {
            return false;
        }
        if (card instanceof KarmaCard) {
            this.field.karmaCardsInFight(card, index);
            this.updateKarmaCardsInFightBlock();
            this.updateInHand();
            this.updateCardFromTable();
            return true;
        }
        let last = this.field.cards_in_fight.length - 1;
        if (this.field.cards_in_fight.length === 0 || this.field.cards_in_fight[last].name < card.name) {
            //console.log("less_or_no"+card.name);
            this.field.cardNoLessInFight(card, index);
            //this.updateInHand();
            this.updateDeck();
            this.updateBordersColor();
            for (let i = 0; i < this.field.players.length; ++i) {
                if (i !== this.num_player) {
                    this.updateNumOpponentCards(i);
                }
            }
            this.updateCardsInFightBlock();
            this.updateCardFromTable();
            return true;
        }
        if (this.field.cards_in_fight[last].name === card.name) {
            this.field.cardsEqualsInFight(index, this.num_player);
            this.updateDeck();
            this.updateBordersColor();
            this.updateCardsInFightBlock();
            this.updateCardFromTable();
            for (let i = 0; i < this.field.players.length; ++i) {
                if (i !== this.num_player) {
                    this.updateNumOpponentCards(i);
                }
            }
            //this.updateInHand();
            return true;
        }
        return false;
    }

    eventClickCardInHand(img, card, block) {
        console.log("click on hand" + img.alt + ' ' + card.name);
        if (this.field.karma_in_game !== undefined && this.field.karma_in_game.name === CardsEnum.PLAY_CARD) {
            return;
        }
        let res = this.chosenCardFromHand(img.alt);
        if (res) {
            block.removeChild(img);
            this.updateInHand();
            this.updateDiscardPile();
            this.sendMove(card.name);
        }
    }

    waitMove() {
        let cur_class = this;
        let val_changed = this.ref.child('move').on('value', function (snapshot) {
            let data = snapshot.val();
            if (data !== null && data !== undefined && data.step !== undefined) {
                if (cur_class.checkOnWinner()) {
                    cur_class.ref.child('move').off('value', val_changed);
                }
                if (data.player === cur_class.num_player) {
                    return;
                }
                if (data.step === CardsEnum.PLAY_CARD) {
                    cur_class.field.takeFromTable();
                    cur_class.updateCardOpponentFromTable();
                }
                if (data.step === ModelGameEnum.ABANDON) {
                    cur_class.field.abandonCards(data.player);
                } else {
                    cur_class.field.move(data.step);
                }
                cur_class.updateKarmaCardsInFightBlock();
                cur_class.updateCardsInFightBlock();
                cur_class.updateInHand();
                cur_class.updateBordersColor();
                cur_class.updateDeck();
                cur_class.updateNumOpponentCards(data.player);
                cur_class.updateDiscardPile();
                cur_class.updateCardOpponentFromTable();
            }
        });
    }

    sendMove(m) {
        //let cur_class = this;
        let move = {
            player: this.num_player,
            step: m
        };
        let val_changed = this.ref.update({
            move
        });
    }

    checkOnWinner() {
        if (this.field.deck.length !== 0) {
            return false;
        }
        for (let i = 0; i < this.field.players.length; ++i) {
            let player = this.field.players[i];
            if (player.cards_on_table.length === 0 && player.cards_in_hand.length === 0) {
                this.winner(player.name);
                return true;
            }
        }
        return false;
    }

    winner(name) {
        while (this.main_block.firstChild) {
            this.main_block.removeChild(this.main_block.firstChild);
        }
        //this.main_block = document.createElement('div');
        this.main_block.className = "game-over-block";
        let p = document.createElement('p');
        p.innerText = 'Игрок ' + '"' + name + '"' + ' выиграл!111';
        this.main_block.appendChild(p);
        let b = document.createElement('p');
        b.className = "text-button";
        let cur_class = this;
        b.style.margin = "50px";
        b.innerText = "Назад в меню";
        b.addEventListener('click', function () {
            cur_class.callback();
        });
        this.main_block.appendChild(b);
    }
}

class ModelGameHost extends ModelGame {

    constructor(num_room, block, name, callback) {
        super(num_room, block, name, callback);
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

    sendDeck() {
        let deck = [];
        for (let i = 0; i <  this.field.deck.length; ++i) {
            deck.push(this.field.deck[i].name);
        }
        this.ref.update({
            deck
        });
    }

    init(names) {
        this.field.init(names);
        this.initBlocks();
        this.sendUserCards();
        this.sendNumFirstAttacker();
        this.sendDeck();
    }

    sendUserCards() {
        //let cur_class = this;
        for (let i = 0; i < this.field.players.length; ++i) {
            let cards_in_hand = [];
            for (let j = 0; j < this.field.players[i].cards_in_hand.length; ++j) {
                cards_in_hand.push(this.field.players[i].cards_in_hand[j].name);
            }
            let cards_on_table = [];
            for (let j = 0; j < this.field.players[i].cards_on_table.length; ++j) {
                let tmp = [];
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
    sendNumFirstAttacker() {
        this.ref.update({
            num_first_attacker: this.field.num_first_attacker
        });
    }
}

class ModelGameClient extends ModelGame {

    constructor(num_room, block, name, callback) {
        super(num_room, block, name, callback);
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
                cur_class.getUserCards();
                cur_class.getNumFirstAttacker();
            }
        });
    }

    getDeck() {
        let cur_class = this;
        let val_changed = this.ref.child('deck').on('value', function (snapshot) {
            let data = snapshot.val();
            //console.log(data);
            if (data !== null && data !== undefined) {
                cur_class.field.setDeck(data);
                cur_class.ref.child('deck').off('value', val_changed);
                cur_class.initBlocks();
            }
        });
    }

    getUserCards() {
        let cur_class = this;
        let val_changed = this.ref.on('value', function (snapshot) {
            //console.log(snapshot.val());
            let data = snapshot.val();
            let l_index = cur_class.field.players.length - 1;
            if (data.user_cards !== undefined && data.user_cards[l_index] !== undefined) {
                //console.log("getUserCards");
                cur_class.ref.off('value', val_changed);
                cur_class.field.setPlayersCards(data.user_cards);
                cur_class.getDeck();
            }
        });
    }

    getNumFirstAttacker() {
        let curr_class = this;
        let val_changed = this.ref.child('num_first_attacker').on('value', function (snapshot) {
            let data = snapshot.val();
            if (data !== null && data !== undefined) {
                curr_class.ref.child('num_first_attacker').off('value', val_changed);
                curr_class.field.num_attacker = Number(data);
                curr_class.field.num_first_attacker = Number(data);
            }
        });
    }
}

const ModelGameEnum = {
    CARD_SHIRT_PATH: "assets/playing_cards/card_shirt.png",
    ABANDON: "abandon",
    COLOR_ATTACK: "red",
    COLOR_NOT_ATTACK: "#0B0C10",
    GET_ALL_FROM_TABLE: "get_all_from_table"
};