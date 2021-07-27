class ModelGameHost {

    constructor(num_room) {
        //this.num_room = num_room;
        this.field = new Field();
        this.ref = firebase.database().ref("rooms/" + num_room);
        this.wait();
    }

    wait() {
        let cur_class = this;
        let val_changed = this.ref.on('value', function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val().cur_num === snapshot.val().max_num) {
                cur_class.ref.off('value', val_changed);
                console.log("wait users", snapshot.val().users);
                cur_class.play(snapshot.val().users);
            }
        });
    }

    play(names) {
        this.field.init(names);
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
                cards_in_hand: {
                    cards_in_hand
                },
                cards_on_table: {
                    cards_on_table
                }
            });
        }
    }
}

class ModelGameClient {

    constructor(num_room) {
        //this.num_room = num_room;
        this.field = new Field();
        this.ref = firebase.database().ref("rooms/" + num_room);
        this.wait();
    }

    wait() {
        let cur_class = this;
        let val_changed = this.ref.on('value', function (snapshot) {
            //console.log(snapshot.val());
            if (snapshot.val().cur_num === snapshot.val().max_num) {
                cur_class.ref.off('value', val_changed);
                cur_class.field.setPlayers(snapshot.val().users);
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
            }
        });
    }
}